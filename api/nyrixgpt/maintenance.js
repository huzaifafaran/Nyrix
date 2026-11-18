"use strict";
const {createHash,timingSafeEqual}=require('node:crypto');
const {createOperations}=require('./_operations.cjs');
const RECIPIENT='hello@nyrix.co';
function authenticated(req,secret){const header=req.headers?.authorization;if(typeof secret!=='string'||secret.length<32||secret.length>256||/\s/.test(secret)||typeof header!=='string'||header.length>300)return false;const hash=value=>createHash('sha256').update(value).digest();return timingSafeEqual(hash(header),hash('Bearer '+secret));}
function deliveryConfig(env){const key=env.RESEND_API_KEY,from=env.CONTACT_FROM_EMAIL;return env.NYRIXGPT_ALERTS_ENABLED==='true'&&typeof key==='string'&&key.length>0&&!/\s/.test(key)&&typeof from==='string'&&from.length<200&&!/[\r\n]/.test(from)&&/^[^<>\r\n]*<[^\s<>@]+@[^\s<>@]+\.[a-z]{2,}>$|^[^\s<>@]+@[^\s<>@]+\.[a-z]{2,}$/i.test(from);}
function alertRecord(value){
 if(!value||typeof value!=='object'||!['budget_day','budget_month','requests_day'].includes(value.kind)||typeof value.period!=='string'||!/^\d{4}-\d{2}(?:-\d{2})?$/.test(value.period)||value.id!==value.kind+':'+value.period||typeof value.lease!=='string'||value.lease.length<1||value.lease.length>100||!['paid_micro_usd','free_token_units'].includes(value.accountingMode)||![value.observed,value.ceiling].every(n=>Number.isSafeInteger(n)&&n>=0)||value.ceiling<=0)throw new Error('invalid_alert');
 return value;
}
async function providerReceipt(response){
 if(!response.ok)throw new Error('delivery_failed');let body;
 if(response.body?.getReader){const reader=response.body.getReader();let bytes=0;const chunks=[];try{while(true){const part=await reader.read();if(part.done)break;bytes+=part.value.byteLength;if(bytes>4096)throw new Error('delivery_failed');chunks.push(Buffer.from(part.value));}body=JSON.parse(Buffer.concat(chunks).toString('utf8'));}finally{await reader.cancel().catch(()=>{});reader.releaseLock();}}
 else body=await response.json();
 if(typeof body?.id!=='string'||!/^[-a-zA-Z0-9_]{1,128}$/.test(body.id))throw new Error('delivery_failed');return body.id;
}
function createMaintenanceHandler({env=process.env,ops:injectedOps,fetchImpl=globalThis.fetch}={}){
 return async function maintenance(req,res){
  res.setHeader('Cache-Control','no-store');res.setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('X-Content-Type-Options','nosniff');
  const reply=(status,body)=>{res.statusCode=status;res.end(JSON.stringify(body));};
  if(req.method!=='GET'){res.setHeader('Allow','GET');return reply(405,{ok:false,code:'method_not_allowed'});}
  if(env.NYRIXGPT_MAINTENANCE_ENABLED!=='true'||typeof env.CRON_SECRET!=='string'||env.CRON_SECRET.length<32)return reply(503,{ok:false,code:'maintenance_disabled'});
  if(!authenticated(req,env.CRON_SECRET))return reply(401,{ok:false,code:'unauthorized'});
  const signal=AbortSignal.timeout(25000);let sent=0,failed=0;const configured=deliveryConfig(env);
  try{
   const ops=injectedOps||createOperations({databaseUrl:env.NYRIXGPT_MAINTENANCE_DATABASE_URL,signal});const status=await ops.maintain();
   if(!status||typeof status.retentionEnabled!=='boolean'||typeof status.alertsEnabled!=='boolean')throw new Error('maintenance_failed');
   if(configured&&status.alertsEnabled){
    for(let i=0;i<3;i++){
     const value=await ops.claim();if(value===null)break;const alert=alertRecord(value);let accepted=false,id=null;
     try{
      const unit=alert.kind==='requests_day'?'admitted requests':alert.accountingMode==='free_token_units'?'token quota units':'micro-USD reserved or used';
      const body={from:env.CONTACT_FROM_EMAIL,to:[RECIPIENT],subject:'NyrixGPT usage threshold: '+alert.kind+' '+alert.period,text:`NyrixGPT reached the configured 80% review threshold.\nWindow: ${alert.period}\nScope: ${alert.kind}\nSnapshot: ${alert.observed} / ${alert.ceiling} ${unit}.\nThis is a conservative reservation/quota signal, not a billing receipt. Review the private ledger and hard caps. No visitor messages or identifiers are included.`};
      const response=await fetchImpl('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+env.RESEND_API_KEY,'Content-Type':'application/json','Idempotency-Key':'nyrixgpt-alert/'+alert.id},body:JSON.stringify(body),signal:AbortSignal.any([signal,AbortSignal.timeout(5000)])});
      id=await providerReceipt(response);accepted=true;
     }catch{failed++;}
     const settled=await ops.finish(alert.id,alert.lease,accepted,id);if(settled!==true)throw new Error('maintenance_failed');if(accepted)sent++;if(!accepted)break;
    }
   }
   return reply(failed?503:200,{ok:failed===0,retentionEnabled:status.retentionEnabled,deliveryConfigured:configured,alertsSent:sent,alertsFailed:failed});
  }catch{return reply(503,{ok:false,code:'maintenance_unavailable',alertsSent:sent,alertsFailed:failed});}
 };
}
module.exports=createMaintenanceHandler();module.exports.createMaintenanceHandler=createMaintenanceHandler;
