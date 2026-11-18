"use strict";
const {createHash}=require('node:crypto');const{readFileSync}=require('node:fs');
const QUESTIONS=Object.freeze(['what does nyrix do?','what is kinlu?','what does kinlu do?','what is kinlu voice?','what industries does nyrix work with?','how can i contact nyrix?','where can i see nyrix case studies?','who is on the nyrix team?']);
function versionFromBytes(knowledge,actions){return createHash('sha256').update('nyrix-public-faq-v1\0').update(knowledge).update('\0').update(actions).digest('hex');}
function publicVersion(){const knowledge=readFileSync(require.resolve('../_nyrixgpt-knowledge.json'));const actions=readFileSync(require.resolve('../../src/content/nyrixGptActions.json'));if(knowledge.length>1048576||actions.length>1048576)return null;return versionFromBytes(knowledge,actions);}
function eligible(input,cfg){return input&&typeof input.message==='string'&&QUESTIONS.includes(input.message.toLowerCase())&&Array.isArray(input.history)&&input.history.length===0&&input.context?.path==='/'&&Object.keys(input.context).length===1&&cfg?.tier!=='blueprint';}
function createPublicAnswerCache({now=Date.now,ttlMs=300000,maxEntries=8,maxBytes=65536,versionProvider=publicVersion}={}){
 const entries=new Map();let bytes=0,version=null;
 if(![ttlMs,maxEntries,maxBytes].every(n=>Number.isSafeInteger(n)&&n>0)||ttlMs>300000||maxEntries>8||maxBytes>65536)throw new Error('invalid_cache_bounds');
 const remove=key=>{const old=entries.get(key);if(old){bytes-=old.bytes;entries.delete(key);}};
 function keyFor(input,cfg){
  if(!eligible(input,cfg))return null;let current;try{current=versionProvider();}catch{return null;}
  if(typeof current!=='string'||current.length<1||current.length>128)return null;
  if(current!==version){entries.clear();bytes=0;version=current;}
  for(const[key,value]of entries)if(value.until<=now())remove(key);
  return createHash('sha256').update(JSON.stringify([current,cfg.provider,cfg.model,QUESTIONS.indexOf(input.message.toLowerCase())])).digest('hex');
 }
 return {eligible,get(input,cfg){const key=keyFor(input,cfg);if(!key)return null;const entry=entries.get(key);if(!entry)return null;entries.delete(key);entries.set(key,entry);return JSON.parse(entry.serialized);},put(input,cfg,data){
  const key=keyFor(input,cfg);if(!key||!data||typeof data!=='object'||Object.keys(data).length!==4||data.blueprint!==null||typeof data.answer!=='string'||data.answer.length<1||data.answer.length>6000||!Array.isArray(data.citationIds)||data.citationIds.length>8||!Array.isArray(data.actionIds)||data.actionIds.length>4||[...data.citationIds,...data.actionIds].some(id=>typeof id!=='string'||!/^[-a-zA-Z0-9_]{1,100}$/.test(id)))return false;
  const serialized=JSON.stringify({answer:data.answer,citationIds:data.citationIds,actionIds:data.actionIds,blueprint:null});const size=Buffer.byteLength(serialized)+Buffer.byteLength(key);
  if(size>12288||size>maxBytes)return false;remove(key);
  while(entries.size>=maxEntries||bytes+size>maxBytes)remove(entries.keys().next().value);
  entries.set(key,{serialized,bytes:size,until:now()+ttlMs});bytes+=size;return true;
 }};
}
module.exports={createPublicAnswerCache,versionFromBytes};
