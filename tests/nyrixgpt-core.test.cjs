const test=require('node:test');const assert=require('node:assert/strict');const {Readable}=require('node:stream');
const {config,cost,identities,readBody,validate,groundedOutput}=require('../api/nyrixgpt/_core.cjs');
const {createLedger}=require('../api/nyrixgpt/_ledger.cjs');const {createConfigHandler}=require('../api/nyrixgpt/config.js');
test('automatic actions must be returned allowlisted navigation and cannot book or prepare forms',()=>{
 const entries={team:{id:'team',type:'navigate',path:'/company/team'},booking:{id:'booking',type:'booking',requiresConfirmation:true,path:'/contact'},prepare_inquiry:{id:'prepare_inquiry',type:'prepare_inquiry',path:'/contact'}};
 const knowledge={allowedActionIds:Object.keys(entries),resolveAction:id=>entries[id]};
 const base={answer:'Here is the team.',citationIds:[],actionIds:['team'],blueprint:null};
 assert.equal(groundedOutput({...base,autoActionId:'team'},knowledge,[]).autoActionId,'team');
 for(const id of ['booking','prepare_inquiry','https://evil.example']) assert.throws(()=>groundedOutput({...base,actionIds:[id],autoActionId:id},knowledge,[]),/provider_error/);
 assert.throws(()=>groundedOutput({...base,autoActionId:'booking'},knowledge,[]),/provider_error/);
});
const input={sessionId:'0b826af5-a678-42dc-8cc6-dea042c2ec70',requestId:'47a6dbb3-c9b5-4fb1-9f4b-de847b0af510'};
test('identity hashing never trusts unverified proxy headers and rotates daily without raw addresses',()=>{
 const request={headers:{'x-forwarded-for':'attacker','x-real-ip':'192.0.2.1'},socket:{remoteAddress:'127.0.0.1'}},cfg={hashSecret:'test-secret-at-least32characters-long',vercel:false};
 const first=identities(request,input,cfg,new Date('2026-11-18T12:00:00Z'));const next=identities(request,input,cfg,new Date('2026-11-19T12:00:00Z'));assert.notEqual(first.ip,next.ip);assert.doesNotMatch(JSON.stringify(first),/127\.0\.0\.1|192\.0\.2\.1/);assert.match(first.ip,/^[a-f0-9]{64}$/);
 assert.throws(()=>identities({headers:{'x-forwarded-for':'192.0.2.1'}},input,{...cfg,vercel:true}),/unavailable/);
});
test('unparsed request stream size limit is enforced while reading, before JSON validation',async()=>{
 const request=Readable.from([Buffer.alloc(32769,'x')]);request.headers={};await assert.rejects(()=>readBody(request),error=>error.status===413);
});
test('durable adapter only submits parameterized functions and rejects malformed DB responses',async()=>{
 const calls=[];const ledger=createLedger({query:async(statement,values)=>{calls.push({statement,values});return[{result:{allowed:true,id:'safe'}}];}});
 await ledger.reserve({request:'r',session:'s',ip:'i',reservedMicro:42,accountingMode:'free_token_units'});assert.deepEqual(calls[0].values,['r','s','i',42,'free_token_units']);assert.match(calls[0].statement,/reserve\(\$1,\$2,\$3,\$4,\$5\)/);assert.doesNotMatch(calls[0].statement,/free_token_units/);
 await assert.rejects(()=>createLedger({query:async()=>[]}).status(),/unavailable/);
});
test('config endpoint exposes only public flags and fails closed on DB errors or mode mismatch',async()=>{
 const env={NYRIXGPT_ENABLED:'true',OPENAI_API_KEY:'not-public-secret',NYRIXGPT_MODEL:'test',NYRIXGPT_DATABASE_URL:'postgresql://test:secret@ep-test.neon.tech/db?sslmode=require',NYRIXGPT_HASH_SECRET:'a'.repeat(32),NYRIXGPT_INPUT_MICRO_USD_PER_MILLION:'1',NYRIXGPT_OUTPUT_MICRO_USD_PER_MILLION:'2'};
 for(const status of [async()=>{throw new Error('private-db-detail');},async()=>({enabled:true,accountingMode:'free_token_units'})]){let output;const response={setHeader(){},end(body){output=JSON.parse(body);}};await createConfigHandler({env,ledger:{status}})({method:'GET'},response);assert.equal(output.enabled,false);assert.doesNotMatch(JSON.stringify(output),/secret|private-db|postgres|test/);}
 assert.equal(config({...env,NYRIXGPT_INPUT_MICRO_USD_PER_MILLION:'0'}).ready,false);
});
test('client-side knowledge and unsafe blueprint fields cannot enter trusted output',()=>{
 assert.throws(()=>validate({message:'question',...input,history:[],context:{path:'//attacker.invalid'}}),/invalid_request/);
 const knowledge={allowedActionIds:['home'],resolveAction:()=>({id:'home',type:'navigate',path:'/'})};assert.throws(()=>groundedOutput({answer:'answer',citationIds:['invented'],actionIds:[],blueprint:null},knowledge,[]),/provider_error/);
 assert.throws(()=>groundedOutput({answer:'answer',citationIds:[],actionIds:[],blueprint:{problem:'only-one-field'}},knowledge,[]),/provider_error/);
});
