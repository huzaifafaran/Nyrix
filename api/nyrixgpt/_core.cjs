"use strict";
const {createHmac}=require("node:crypto");
const {isIP}=require("node:net");
const LIMITS=Object.freeze({messageChars:2000,historyMessages:6,historyChars:6000,knowledgeChars:8000,bodyBytes:32768,inputTokens:32000,outputTokens:2000,answerChars:6000,providerBytes:131072,providerWireBytes:1048576,timeoutMs:45000});
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function fault(code,status=503){return Object.assign(new Error(code),{code,status});}
function config(env){
 const provider=env.NYRIXGPT_PROVIDER||'openai';const key=provider==='groq'?env.GROQ_API_KEY:env.OPENAI_API_KEY;
 const inputRate=Number(env.NYRIXGPT_INPUT_MICRO_USD_PER_MILLION),outputRate=Number(env.NYRIXGPT_OUTPUT_MICRO_USD_PER_MILLION);
 const tierRouting=env.NYRIXGPT_TIER_ROUTING==='true';
 const blueprint={model:env.NYRIXGPT_BLUEPRINT_MODEL,inputRate:Number(env.NYRIXGPT_BLUEPRINT_INPUT_MICRO_USD_PER_MILLION),outputRate:Number(env.NYRIXGPT_BLUEPRINT_OUTPUT_MICRO_USD_PER_MILLION)};
 const blueprintValid=!tierRouting||(provider==='openai'&&/^[a-zA-Z0-9._:/-]{1,100}$/.test(blueprint.model||'')&&[blueprint.inputRate,blueprint.outputRate].every(rate=>Number.isSafeInteger(rate)&&rate>0&&rate<=1000000000));
 const freeTier=provider==='groq'&&env.NYRIXGPT_FREE_TIER==='true'&&inputRate===0&&outputRate===0;
 let databaseValid=false;
 try{const url=new URL(env.NYRIXGPT_DATABASE_URL);databaseValid=['postgres:','postgresql:'].includes(url.protocol)&&url.hostname.endsWith('.neon.tech')&&url.searchParams.get('sslmode')==='require'&&!!url.username&&!!url.password;}catch{}
 const ready=blueprintValid&&['openai','groq'].includes(provider)&&env.NYRIXGPT_ENABLED==='true'&&env.NYRIXGPT_KILL_SWITCH!=='true'&&typeof key==='string'&&key.length>0&&!/\s/.test(key)&&/^[a-zA-Z0-9._:/-]{1,100}$/.test(env.NYRIXGPT_MODEL||'')&&databaseValid&&env.NYRIXGPT_DATABASE_URL===env.NYRIXGPT_DATABASE_URL.trim()&&typeof env.NYRIXGPT_HASH_SECRET==='string'&&env.NYRIXGPT_HASH_SECRET.length>=32&&env.NYRIXGPT_HASH_SECRET===env.NYRIXGPT_HASH_SECRET.trim()&&(freeTier||[inputRate,outputRate].every(rate=>Number.isSafeInteger(rate)&&rate>0&&rate<=1000000000));
 return {ready,provider,freeTier,tierRouting,blueprint,accountingMode:freeTier?'free_token_units':'paid_micro_usd',model:env.NYRIXGPT_MODEL,key,databaseUrl:env.NYRIXGPT_DATABASE_URL,hashSecret:env.NYRIXGPT_HASH_SECRET,inputRate,outputRate,limits:LIMITS};
}
function selectTier(cfg,input){
 // User text can request a blueprint, but cannot select arbitrary models/prices.
 const scope=[input.message,...input.history.filter(item=>item.role==='user').map(item=>item.content)].join('\n');
 const blueprint=cfg.tierRouting&&/\b(blueprint|pilot|implementation plan|project brief|(?:show me )?what (?:would you|you would) build|solution architecture|design (?:an? |the )?(?:ai )?workflow|design (?:an? |the )?solution)\b/i.test(scope);
 return blueprint?{...cfg,...cfg.blueprint,tier:'blueprint'}:{...cfg,tier:'routine'};
}
function ipBucket(ip){
 if(isIP(ip)===4)return ip;
 let value=ip.toLowerCase();
 if(value.includes('.')){const tail=value.slice(value.lastIndexOf(':')+1).split('.').map(Number);value=value.slice(0,value.lastIndexOf(':')+1)+((tail[0]<<8)|tail[1]).toString(16)+':'+((tail[2]<<8)|tail[3]).toString(16);}
 const halves=value.split('::'),left=halves[0]?halves[0].split(':'):[],right=halves.length>1&&halves[1]?halves[1].split(':'):[];
 const parts=(halves.length===2?[...left,...Array(8-left.length-right.length).fill('0'),...right]:left).map(part=>parseInt(part,16));
 if(parts.length!==8||parts.some(part=>!Number.isInteger(part)))throw fault('unavailable');
 if(parts.slice(0,5).every(part=>part===0)&&parts[5]===65535)return [parts[6]>>8,parts[6]&255,parts[7]>>8,parts[7]&255].join('.');
 return parts.slice(0,4).map(part=>part.toString(16).padStart(4,'0')).join(':')+'::/64';
}
function sameOrigin(req){
 const host=req.headers?.host,origin=req.headers?.origin;
 if(typeof host!=='string'||typeof origin!=='string'||/[\s/@\\]/.test(host))return false;
 try{const url=new URL('http://'+host);const local=['localhost','127.0.0.1','[::1]'].includes(url.hostname);return origin===`${local?'http':'https'}://${host}`;}catch{return false;}
}
function object(value){return value&&typeof value==='object'&&!Array.isArray(value);}
function exactKeys(value,keys){return object(value)&&Object.keys(value).every(key=>keys.includes(key));}
function text(value,max){return typeof value==='string'&&value.trim().length>0&&value.length<=max&&!/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value);}
function validate(body){
 if(!exactKeys(body,['message','history','context','sessionId','requestId'])||!text(body.message,LIMITS.messageChars)||!UUID.test(body.sessionId||'')||!UUID.test(body.requestId||''))throw fault('invalid_request',422);
 const history=body.history??[];
 if(!Array.isArray(history)||history.length>LIMITS.historyMessages||history.some(item=>!exactKeys(item,['role','content'])||!['user','assistant'].includes(item.role)||!text(item.content,LIMITS.historyChars))||history.reduce((sum,item)=>sum+item.content.length,0)>LIMITS.historyChars)throw fault('invalid_request',422);
 const context=body.context??{path:'/'};
 if(!exactKeys(context,['path'])||typeof context.path!=='string'||context.path.length>160||!/^\/[a-zA-Z0-9/_#?%=&.~-]*$/.test(context.path)||context.path.startsWith('//'))throw fault('invalid_request',422);
 return {message:body.message.trim(),history:history.map(item=>({role:item.role,content:item.content})),context:{path:context.path},sessionId:body.sessionId,requestId:body.requestId};
}
async function readBody(req){
 const declared=req.headers?.['content-length'];
 if(declared&&(!/^\d+$/.test(declared)||Number(declared)>LIMITS.bodyBytes))throw fault('invalid_request',413);
 let raw;
 if(req.body!==undefined){try{raw=typeof req.body==='string'||Buffer.isBuffer(req.body)?Buffer.from(req.body):Buffer.from(JSON.stringify(req.body));}catch{throw fault('invalid_request',400);}}
 else{
  raw=await new Promise((resolve,reject)=>{
   const chunks=[];let bytes=0,finished=false;
   const done=(error)=>{if(finished)return;finished=true;clearTimeout(timer);req.removeListener('data',onData);req.removeListener('end',onEnd);req.removeListener('error',onError);req.removeListener('aborted',onError);if(error){req.resume?.();reject(error);}else resolve(Buffer.concat(chunks));};
   const onData=chunk=>{bytes+=Buffer.byteLength(chunk);if(bytes>LIMITS.bodyBytes)done(fault('invalid_request',413));else chunks.push(Buffer.from(chunk));};
   const onEnd=()=>done();const onError=()=>done(fault('invalid_request',400));
   const timer=setTimeout(()=>done(fault('invalid_request',408)),5000);timer.unref?.();req.on('data',onData);req.once('end',onEnd);req.once('error',onError);req.once('aborted',onError);
  });
 }
 if(raw.length>LIMITS.bodyBytes)throw fault('invalid_request',413);
 try{return JSON.parse(raw.toString('utf8'));}catch{throw fault('invalid_request',400);}
}
function identities(req,input,cfg,date=new Date()){
 // Vercel's documented x-real-ip is platform-set. Never trust arbitrary proxy
 // headers outside Vercel; elsewhere the direct socket address is authoritative.
 const forwarded=cfg.vercel?req.headers?.['x-real-ip']:null;
 const ip=cfg.vercel?forwarded:req.socket?.remoteAddress;
 if(typeof ip!=='string'||!isIP(ip))throw fault('unavailable');
 const day=date.toISOString().slice(0,10);const hash=(tag,value)=>createHmac('sha256',cfg.hashSecret).update(tag+'\0'+day+'\0'+value).digest('hex');
 return {session:hash('session',input.sessionId),ip:hash('ip',ipBucket(ip)),request:hash('request',input.requestId),day};
}
function cost(usage,cfg){return cfg.freeTier?usage.inputTokens+usage.outputTokens:Math.ceil((usage.inputTokens*cfg.inputRate+usage.outputTokens*cfg.outputRate)/1000000);}
const stringArray={type:'array',items:{type:'string'}};
const blueprintFields={problem:{type:'string'},industry:{type:'string'},workflow:{type:'string'},bottleneck:{type:'string'},outcome:{type:'string'},proposedAiWorkflow:stringArray,relevantCapabilities:stringArray,dataAndIntegrations:stringArray,pilot:{type:'object',additionalProperties:false,properties:{scope:{type:'string'},steps:stringArray,humanReview:{type:'string'}},required:['scope','steps','humanReview']},measures:stringArray,assumptions:stringArray,questions:stringArray,guardrails:stringArray};
const OUTPUT_SCHEMA={type:'object',additionalProperties:false,properties:{answer:{type:'string'},citationIds:stringArray,actionIds:stringArray,autoActionId:{type:['string','null']},blueprint:{anyOf:[{type:'null'},{type:'object',additionalProperties:false,properties:blueprintFields,required:Object.keys(blueprintFields)}]}},required:['answer','citationIds','actionIds','autoActionId','blueprint']};
function validateBlueprint(value){
 if(value===null)return null;
 if(!exactKeys(value,Object.keys(blueprintFields))||Object.keys(value).length!==Object.keys(blueprintFields).length)throw fault('provider_error',502);
 const arrayKeys=['proposedAiWorkflow','relevantCapabilities','dataAndIntegrations','measures','assumptions','questions','guardrails'];
 for(const key of ['problem','industry','workflow','bottleneck','outcome'])if(!text(value[key],500))throw fault('provider_error',502);
 for(const key of arrayKeys)if(!Array.isArray(value[key])||value[key].length>6||value[key].some(item=>!text(item,400)))throw fault('provider_error',502);
 if(!exactKeys(value.pilot,['scope','steps','humanReview'])||!text(value.pilot.scope,500)||!text(value.pilot.humanReview,500)||!Array.isArray(value.pilot.steps)||value.pilot.steps.length>6||value.pilot.steps.some(item=>!text(item,400)))throw fault('provider_error',502);
 return value;
}
function groundedOutput(data,knowledge,sources){
 if(!exactKeys(data,['answer','citationIds','actionIds','autoActionId','blueprint'])||!text(data.answer,LIMITS.answerChars)||!Array.isArray(data.citationIds)||data.citationIds.length>8||!Array.isArray(data.actionIds)||data.actionIds.length>4)throw fault('provider_error',502);
 const citations=[...new Set(data.citationIds)].map(id=>{const source=sources.find(item=>item.id===id);if(!source)throw fault('provider_error',502);return source;});
 const actions=[...new Set(data.actionIds)].map(id=>{if(typeof id!=='string'||!knowledge.allowedActionIds.includes(id))throw fault('provider_error',502);const resolved=knowledge.resolveAction(id);if(!resolved||resolved.id!==id)throw fault('provider_error',502);return resolved;});
 const autoActionId=data.autoActionId??null;
 if(autoActionId!==null&&(typeof autoActionId!=='string'||!actions.some(action=>action.id===autoActionId&&action.type==='navigate'&&!action.requiresConfirmation)))throw fault('provider_error',502);
 return {answer:data.answer,citations,actions,autoActionId,blueprint:validateBlueprint(data.blueprint)};
}
module.exports={LIMITS,OUTPUT_SCHEMA,config,cost,fault,groundedOutput,identities,readBody,sameOrigin,selectTier,validate};
