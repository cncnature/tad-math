// node scripts/check-csat.js — 수능 전략 센터 데이터(data/csat/*.js) 검사. check.js 끝에서 함께 실행된다.
// 형식: docs/CSAT-SCHEMA.md. 링크(#/sub/<과목>/<차시>, #/patterns/<id>, #/study/<단원>/<소단원>)가 실제로 있는지도 확인한다.
const vm=require("vm"),fs=require("fs"),path=require("path");const root=path.join(__dirname,"..");
const w={DATA:{}};const ctx=vm.createContext({window:w});
const run=f=>vm.runInContext(fs.readFileSync(path.join(root,f),"utf8"),ctx,{filename:f});
const html=fs.readFileSync(path.join(root,"index.html"),"utf8");
const files=[...html.matchAll(/<script src="(data\/csat\/[^"]+\.js)"><\/script>/g)].map(m=>m[1]);
files.forEach(run);
const C=w.DATA.csat,P=w.DATA.csatPatterns||[],T=w.DATA.csatTree||{};const err=[];
if(!C) err.push("data/csat/system.js 없음");
// 링크 대상 수집
const subs=new Set(),units=new Set(),pats=new Set(),study=new Set();
for(const f of fs.readdirSync(path.join(root,"data/subjects"))){ const s=fs.readFileSync(path.join(root,"data/subjects",f),"utf8"); for(const m of s.matchAll(/\bid:\s*"([a-z0-9-]+)"/g)) subs.add(m[1]); }
try{ run("data/suneung.js"); (w.DATA.suneung.patterns||[]).forEach(p=>pats.add(p.id)); }catch(e){}
for(const f of fs.readdirSync(path.join(root,"data")).filter(f=>/^curriculum.*\.js$/.test(f))){ const s=fs.readFileSync(path.join(root,"data",f),"utf8"); for(const m of s.matchAll(/\bid:\s*"([a-zA-Z0-9-]+)"/g)) study.add(m[1]); }
const okLink=h=>{ let m; if((m=h.match(/^#\/sub\/(kor|eng|sci|soc|his|math)\/([a-z0-9-]+)$/))) return subs.has(m[2]); if((m=h.match(/^#\/patterns\/([a-z0-9-]+)$/))) return pats.has(m[1]); if((m=h.match(/^#\/study\/([a-zA-Z0-9-]+)\/([a-zA-Z0-9-]+)$/))) return study.has(m[1])&&study.has(m[2]); if((m=h.match(/^#\/s\/(kor|eng|sci|soc|his|math)(\/[a-z0-9-]+)?(\?b=[a-z0-9]+)?$/))) return !m[2]||subs.has(m[2].slice(1)); return /^#\/(csat|mix|mathme|rq|exam-prep|patterns)(\/|\?|$)/.test(h); };
const areas=new Set((C&&C.areas||[]).map(a=>a.id)); const ids=new Set(); const pos={};
P.forEach(p=>{ const t=p.id||"(id 없음)";
  if(ids.has(p.id)) err.push("중복 id "+t); ids.add(p.id);
  if(!areas.has(p.area)) err.push("area "+t);
  if(!(T[p.area]||[]).some(s=>s.id===p.strand)) err.push("strand "+t+" → "+p.strand);
  if(!["계속","강화","신유형","축소"].includes(p.status||"계속")) err.push("status "+t);
  if(!["m2","m3","h1","h2","h3"].includes(p.start||"m2")) err.push("start "+t);
  if(!(p.signal||[]).length||!p.first||!(p.steps||[]).length||!p.trap||!p.q||!p.exp) err.push("필수 필드 "+t);
  if(p.opts){ if(p.opts.length!==5) err.push("opts 5개 아님 "+t); if(!(p.a>=0&&p.a<5)) err.push("정답 a "+t); pos[p.a]=(pos[p.a]||0)+1; } else if(p.ans==null||p.ans==="") err.push("단답 ans 없음 "+t);
  if(!(p.src||[]).length) err.push("출처 없음 "+t);
  (p.links||[]).forEach(l=>{ if(!okLink(l.h)) err.push("깨진 링크 "+t+" → "+l.h); });
});
(C&&C.stages||[]).forEach(s=>Object.values(s.tasks||{}).flat().forEach(x=>{ if(!okLink(x.h)) err.push("stage 링크 "+s.id+" → "+x.h); }));
if(err.length){ console.error("CSAT 오류\n"+err.join("\n")); process.exit(1); }
console.log("OK csat — 파일",files.length,"패턴",P.length,"갈래",Object.values(T).flat().length,"정답 위치",JSON.stringify(pos));
