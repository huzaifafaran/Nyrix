"use strict";
const {config,cost,fault,groundedOutput,identities,readBody,sameOrigin,selectTier,validate,LIMITS}=require('./nyrixgpt/_core.cjs');
const {createProvider,requestFor}=require('./nyrixgpt/_provider.cjs');
const {createLedger}=require('./nyrixgpt/_ledger.cjs');
const {createPublicAnswerCache}=require('./nyrixgpt/_cache.cjs');
const MESSAGES={disabled:'NyrixGPT is currently unavailable. You can explore the site or contact the team.',unavailable:'NyrixGPT is temporarily unavailable. Please try again later.',invalid_request:'Please shorten your message or check the request and try again.',rate_limited:'Too many requests are in progress. Please wait before trying again.',daily_limit:'NyrixGPT has reached its daily question limit. Please return tomorrow or contact the team.',budget_exhausted:'NyrixGPT has reached its usage limit. Please try again later or contact the team.',duplicate_request:'This request was already received. Start a new request if you want to try again.',provider_error:'NyrixGPT could not complete this response. Please try again later.',timeout:'The response took too long. Please try again later.'};
function headers(res){res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');}
function json(res,status,body){if(res.writableEnded||res.destroyed)return;res.statusCode=status;res.setHeader('Content-Type','application/json; charset=utf-8');res.end(JSON.stringify(body));}
function safeError(error){const code=Object.hasOwn(MESSAGES,error?.code)?error.code:(error?.name==='AbortError'?'timeout':'provider_error');return {ok:false,code,error:MESSAGES[code],...(Number.isInteger(error?.retryAfter)?{retryAfter:Math.min(3600,Math.max(1,error.retryAfter))}:{})};}
function loadKnowledge(){return require('./_nyrixgpt-knowledge.cjs');}
async function abortable(work,signal){
 let abort;
 const interrupted=new Promise((resolve,reject)=>{abort=()=>reject(fault('timeout',504));if(signal.aborted)abort();else signal.addEventListener('abort',abort,{once:true});});
 try{return await Promise.race([work,interrupted]);}finally{signal.removeEventListener('abort',abort);}
}
function createNyrixGptHandler({env=process.env,ledger:injectedLedger,knowledge:injectedKnowledge,provider:injectedProvider,cache:injectedCache,now=()=>new Date(),timeoutMs=LIMITS.timeoutMs}={}){
 const cache=injectedCache||createPublicAnswerCache();
 return async function nyrixgpt(req,res){
  headers(res);
  if(req.method!=='POST'){res.setHeader('Allow','POST');return json(res,405,{ok:false,code:'invalid_request',error:'Use the NyrixGPT chat to send a question.'});}
  if(!sameOrigin(req))return json(res,403,{ok:false,code:'invalid_request',error:'Please use NyrixGPT from this website.'});
  if(!/^application\/json(?:\s*;|$)/i.test(req.headers?.['content-type']||''))return json(res,415,safeError(fault('invalid_request',415)));
  let cfg=config(env);if(!cfg.ready)return json(res,503,safeError(fault('disabled')));
  let input;
  try{input=validate(await readBody(req));}catch(error){return json(res,error.status||422,safeError(fault('invalid_request',error.status||422)));}
  cfg=selectTier(cfg,input);
  let ledger,provider,knowledge,reservation,usage=null,inputTokenUpper=0,reservedMicro=0,streamStarted=false,settlementAttempted=false,outcome='error',phase='prepare';
  const controller=new AbortController();let timedOut=false,disconnected=false;
  const timeout=setTimeout(()=>{timedOut=true;controller.abort();},Math.min(LIMITS.timeoutMs,Math.max(1,timeoutMs)));timeout.unref?.();
  const disconnect=()=>{if(!res.writableEnded){disconnected=true;controller.abort();}};
  req.once?.('aborted',disconnect);res.once?.('close',disconnect);
  const wantsStream=(req.headers?.accept||'').includes('text/event-stream');
  const event=(name,data)=>{if(!disconnected&&!res.writableEnded&&!res.destroyed)res.write(`event: ${name}\ndata: ${JSON.stringify(data)}\n\n`);};
  try{
   ledger=injectedLedger||createLedger({databaseUrl:cfg.databaseUrl});provider=injectedProvider||createProvider();knowledge=injectedKnowledge||loadKnowledge();
   if(!Array.isArray(knowledge.allowedActionIds)||typeof knowledge.resolveAction!=='function'||knowledge.allowedActionIds.some(id=>typeof id!=='string'||id.length>100)||knowledge.allowedActionIds.length>128)throw fault('unavailable');
   const found=await knowledge.retrievePublicContext({query:input.message,maxChars:LIMITS.knowledgeChars});
   if(typeof found?.text!=='string'||found.text.length>LIMITS.knowledgeChars||!Array.isArray(found.sources)||found.sources.length>8)throw fault('unavailable');
   const sources=found.sources.map((source,index)=>{
    if(typeof source.title!=='string'||source.title.length>180||typeof source.path!=='string'||!/^\/(?!\/)[a-zA-Z0-9/_#?%=&.~-]*$/.test(source.path)||source.path.length>180)throw fault('unavailable');
    const id=source.id??`S${index+1}`;
    if(typeof id!=='string'||!/^[-a-zA-Z0-9_]{1,100}$/.test(id))throw fault('unavailable');
    return {id,title:source.title,url:source.path};
   });
   if(new Set(sources.map(source=>source.id)).size!==sources.length)throw fault('unavailable');
   const payload=requestFor({input,context:found.text,sourceList:sources,actionIds:knowledge.allowedActionIds,cfg,stream:wantsStream});
   // Byte-level upper bound plus protocol allowance, not a chars/4 guess.
   inputTokenUpper=Buffer.byteLength(JSON.stringify(payload),'utf8')+4096;
   if(inputTokenUpper>LIMITS.inputTokens)throw fault('invalid_request',422);
   reservedMicro=Math.max(1,cost({inputTokens:inputTokenUpper,outputTokens:LIMITS.outputTokens},cfg));
   const ids=identities(req,input,{...cfg,vercel:env.VERCEL==='1'},now());
   reservation=await ledger.reserve({...ids,reservedMicro,accountingMode:cfg.accountingMode});
   if(!reservation?.allowed){const code=['disabled','budget_exhausted','daily_limit','rate_limited','duplicate_request'].includes(reservation?.code)?reservation.code:'unavailable';throw Object.assign(fault(code,code==='duplicate_request'?409:['budget_exhausted','daily_limit','rate_limited'].includes(code)?429:503),{retryAfter:reservation?.retryAfter});}
   if(typeof reservation.id!=='string')throw fault('unavailable');
   if(controller.signal.aborted||env.NYRIXGPT_KILL_SWITCH==='true')throw fault('disabled');
   const useCache=env.NYRIXGPT_PUBLIC_CACHE_ENABLED!=='false';
   const cached=useCache?cache.get(input,cfg):null;
   res.setHeader('X-NyrixGPT-Cache',cached?'HIT':useCache&&cache.eligible(input,cfg)?'MISS':'BYPASS');
   if(wantsStream){res.statusCode=200;res.setHeader('Content-Type','text/event-stream; charset=utf-8');res.setHeader('X-Accel-Buffering','no');res.flushHeaders?.();streamStarted=true;}
   let emitted='';
   phase='provider';
   const result=cached?{data:cached,usage:{inputTokens:0,outputTokens:0}}:await abortable(provider.complete({payload,cfg,signal:controller.signal,onDelta:delta=>{
    if(controller.signal.aborted)throw fault('timeout',504);
    if(typeof delta!=='string'||emitted.length+delta.length>LIMITS.answerChars)throw fault('provider_error',502);
    emitted+=delta;if(wantsStream)event('delta',{delta});
   }}),controller.signal);
   usage=result.usage;
   if(controller.signal.aborted)throw Object.assign(fault('timeout',504),{name:'AbortError'});
   const output=groundedOutput(result.data,knowledge,sources);
   if(cached&&wantsStream)event('delta',{delta:output.answer});
   if(emitted&&!output.answer.startsWith(emitted))throw fault('provider_error',502);
   const verified=usage&&Number.isSafeInteger(usage.inputTokens)&&usage.inputTokens>=0&&usage.inputTokens<=inputTokenUpper&&Number.isSafeInteger(usage.outputTokens)&&usage.outputTokens>=0&&usage.outputTokens<=LIMITS.outputTokens;
   phase='settle';settlementAttempted=true;
   const settled=await ledger.settle({id:reservation.id,verified:!!verified,actualMicro:verified?cost(usage,cfg):null,inputTokens:verified?usage.inputTokens:null,outputTokens:verified?usage.outputTokens:null,outcome:'success'});
   if(settled===false)throw fault('unavailable');
   if(useCache&&!cached)cache.put(input,cfg,result.data);
   outcome='success';
   const final={ok:true,requestId:input.requestId,...output};
   if(wantsStream){event('final',final);res.end();}else json(res,200,final);
  }catch(error){
   if(!error?.code)error=fault(phase==='provider'?'provider_error':'unavailable',phase==='provider'?502:503);
   outcome=disconnected?'aborted':timedOut?'timeout':'error';
   if(reservation?.allowed&&!settlementAttempted&&ledger){
    const verified=!controller.signal.aborted&&usage&&Number.isSafeInteger(usage.inputTokens)&&usage.inputTokens>=0&&usage.inputTokens<=inputTokenUpper&&Number.isSafeInteger(usage.outputTokens)&&usage.outputTokens>=0&&usage.outputTokens<=LIMITS.outputTokens;
    settlementAttempted=true;try{await ledger.settle({id:reservation.id,verified:!!verified,actualMicro:verified?cost(usage,cfg):null,inputTokens:verified?usage.inputTokens:null,outputTokens:verified?usage.outputTokens:null,outcome});}catch{/* Full durable reservation remains charged; lease reconciliation releases concurrency only. */}
   }
   if(disconnected)return;
   const response=safeError(timedOut?fault('timeout',504):error);
   if(streamStarted){event('error',response);res.end();}else json(res,error.status||503,response);
  }finally{clearTimeout(timeout);req.removeListener?.('aborted',disconnect);res.removeListener?.('close',disconnect);}
 };
}
module.exports=createNyrixGptHandler();module.exports.createNyrixGptHandler=createNyrixGptHandler;
