"use strict";
const {fault}=require('./_core.cjs');
function createLedger({databaseUrl,query}={}){
 let execute=query;
 async function run(statement,values){
  if(!execute){const {neon}=require('@neondatabase/serverless');const sql=neon(databaseUrl);execute=(text,params)=>sql.query(text,params,{fetchOptions:{signal:AbortSignal.timeout(5000)}});}
  const rows=await execute(statement,values);let result=rows?.[0]?.result;
  if(typeof result==='string'){try{result=JSON.parse(result);}catch{throw fault('unavailable');}}
  if(result===undefined||result===null)throw fault('unavailable');return result;
 }
 return {
  status:()=>run('SELECT nyrixgpt.status() AS result',[]),
  reserve:async({request,session,ip,reservedMicro,accountingMode})=>{const value=await run('SELECT nyrixgpt.reserve($1,$2,$3,$4,$5) AS result',[request,session,ip,reservedMicro,accountingMode]);if(typeof value.allowed!=='boolean')throw fault('unavailable');return value;},
  settle:({id,verified,actualMicro,inputTokens,outputTokens,outcome})=>run('SELECT nyrixgpt.settle($1,$2,$3,$4,$5,$6) AS result',[id,verified,actualMicro??null,inputTokens??null,outputTokens??null,outcome]),
 };
}
module.exports={createLedger};
