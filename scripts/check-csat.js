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
const byP=new Set((w.DATA.csatPatterns||[]).map(p=>p.id)); const areas=new Set((C&&C.areas||[]).map(a=>a.id)); const ids=new Set(); const pos={};
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
const qok=(q,t)=>{ if(!q.q||!q.exp) err.push("문제 필드 "+t); if(q.opts){ if(q.opts.length!==5) err.push("opts 5개 아님 "+t); if(!(q.a>=0&&q.a<5)) err.push("정답 a "+t); } else if(q.ans==null||q.ans==="") err.push("단답 ans 없음 "+t); };
P.forEach(p=>{ (p.more||[]).forEach((q,i)=>qok(q,p.id+" more"+i)); (p.refs||[]).forEach((r,i)=>{ if(!r.exam||!r.no||!r.type) err.push("refs 필드 "+p.id+" #"+i); }); if(p.key&&p.key.length!==3) err.push("key 3개 아님 "+p.id); });
const H=w.DATA.csatHard||[]; const hid=new Set();
H.forEach(h=>{ const t=h.id||"(hard id 없음)"; if(hid.has(h.id)) err.push("hard 중복 "+t); hid.add(h.id); if(!byP.has(h.pattern)) err.push("hard pattern "+t+" → "+h.pattern); if(!["킬러","준킬러"].includes(h.era)) err.push("hard era "+t); if(!(h.why||[]).length||!(h.plan||[]).length||!(h.src||[]).length) err.push("hard 필수 "+t); if((h.ladder||[]).length!==3) err.push("hard ladder 3단계 아님 "+t); (h.ladder||[]).forEach((q,i)=>qok(q,t+" ladder"+i)); (h.tools||[]).forEach(x=>{ if(x.h&&!okLink(x.h)) err.push("hard 링크 "+t+" → "+x.h); }); });
// motion(모션 풀이) 검사 — docs/MOTION-SCHEMA.md
const fxCtx=vm.createContext({window:{},CSS:{escape:x=>x}}); vm.runInContext(fs.readFileSync(path.join(root,"js/motion.js"),"utf8"),fxCtx); const FX=fxCtx.window.MOTION.fx;
const KS=new Set(["curve","area","point","line","arrow","vline","hline","poly","circle","label","box","tex","bars","table","text"]);
const motionOk=(m,t)=>{ if(!m) return; const ids=new Set(); (m.els||[]).forEach(e=>{ if(!KS.has(e.k)) err.push("motion k "+t+" → "+e.k); if(ids.has(e.id)) err.push("motion id 중복 "+t+" → "+e.id); ids.add(e.id); (e.parts||[]).forEach(pt=>{ if(pt.id) ids.add(pt.id); }); ["f","g"].forEach(k=>{ if(e[k]!=null&&!FX(e[k])) err.push("motion 식 "+t+" → "+e[k]); }); });
  const n=(m.steps||[]).length; if(n<3||n>10) err.push("motion 단계 수 "+t+" ("+n+")"); (m.steps||[]).forEach((s,i)=>{ if(!s.say) err.push("motion say 없음 "+t+" #"+i); [...(s.show||[]),...(s.hi||[]),...(s.hide||[])].forEach(id=>{ if(!ids.has(id)) err.push("motion 없는 id "+t+" #"+i+" → "+id); }); }); };
const MO=w.DATA.csatMotion||{}; const allIds=new Set([...P.map(p=>p.id),...(w.DATA.csatHard||[]).map(h=>h.id)]); Object.keys(MO).forEach(k=>{ if(!allIds.has(k)) err.push("motion 대상 없음 "+k); }); P.forEach(p=>{ if(!p.motion&&MO[p.id]) p.motion=MO[p.id]; }); (w.DATA.csatHard||[]).forEach(h=>{ if(!h.motion&&MO[h.id]) h.motion=MO[h.id]; });
P.forEach(p=>motionOk(p.motion,p.id)); (w.DATA.csatHard||[]).forEach(h=>motionOk(h.motion,h.id));
(C&&C.stages||[]).forEach(s=>Object.values(s.tasks||{}).flat().forEach(x=>{ if(!okLink(x.h)) err.push("stage 링크 "+s.id+" → "+x.h); }));
if(err.length){ console.error("CSAT 오류\n"+err.join("\n")); process.exit(1); }
console.log("OK csat — 파일",files.length,"패턴",P.length,"모션",P.filter(p=>p.motion).length+(w.DATA.csatHard||[]).filter(h=>h.motion).length,"고난도",(w.DATA.csatHard||[]).length,"갈래",Object.values(T).flat().length,"정답 위치",JSON.stringify(pos));
