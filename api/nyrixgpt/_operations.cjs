"use strict";
const {fault}=require('./_core.cjs');
function createOperations({databaseUrl,query,signal}={}){
 if(!query){
  let valid=false;try{const url=new URL(databaseUrl);valid=['postgres:','postgresql:'].includes(url.protocol)&&url.hostname.endsWith('.neon.tech')&&url.searchParams.get('sslmode')==='require'&&!!url.username&&!!url.password&&databaseUrl===databaseUrl.trim();}catch{}
  if(!valid)throw fault('unavailable');
  const {neon}=require('@neondatabase/serverless');const sql=neon(databaseUrl);
  query=(text,values)=>sql.query(text,values,{fetchOptions:{signal:signal?AbortSignal.any([signal,AbortSignal.timeout(5000)]):AbortSignal.timeout(5000)}});
 }
 async function call(text,values=[]){const rows=await query(text,values);let value=rows?.[0]?.result;if(typeof value==='string'){try{value=JSON.parse(value);}catch{throw fault('unavailable');}}if(value===undefined)throw fault('unavailable');return value;}
 return {maintain:()=>call('SELECT nyrixgpt.maintain() AS result'),claim:()=>call('SELECT nyrixgpt.claim_alert() AS result'),finish:(id,lease,accepted,providerId)=>call('SELECT nyrixgpt.finish_alert($1,$2,$3,$4) AS result',[id,lease,accepted,providerId])};
}
module.exports={createOperations};
