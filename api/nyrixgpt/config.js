"use strict";
const {config,LIMITS}=require('./_core.cjs');
const {createLedger}=require('./_ledger.cjs');
function createConfigHandler({env=process.env,ledger}={}){
 return async function(req,res){
  res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Content-Type','application/json; charset=utf-8');
  if(req.method!=='GET'){res.statusCode=405;res.setHeader('Allow','GET');res.end(JSON.stringify({ok:false,code:'invalid_request',error:'Use GET.'}));return;}
  const cfg=config(env);let enabled=false;
  if(cfg.ready){try{const status=await(ledger||createLedger({databaseUrl:cfg.databaseUrl})).status();enabled=status?.enabled===true&&status.accountingMode===cfg.accountingMode;}catch{enabled=false;}}
  res.statusCode=200;res.end(JSON.stringify({ok:true,enabled,streaming:true,limits:{messageChars:LIMITS.messageChars,historyMessages:LIMITS.historyMessages,historyChars:LIMITS.historyChars},privacy:{serverConversationStorage:false,providerProcessing:enabled}}));
 };
}
module.exports=createConfigHandler();module.exports.createConfigHandler=createConfigHandler;
