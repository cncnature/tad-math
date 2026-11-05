// node scripts/llm-revise.js   (선택 — ANTHROPIC_API_KEY 가 있을 때만 동작, 없으면 조용히 종료)
// 감시(watch)로 새로 감지된 공지·자료가 있으면 그 페이지 본문을 읽고, 영향을 받는 데이터(일정·입시·성취기준·차시)를
// Claude 가 '덧씌우기 패치(JSON)' 로 제안 → 스키마 검증 → data/overrides.js 와 data/advisory.js 에 적용한다. 콘텐츠 원본 파일은 건드리지 않는다.
// 모델은 환경변수 LLM_MODEL (기본 claude-sonnet-4-5). 한 번에 최대 5건, 패치는 검증을 통과해야만 저장.
const fs=require("fs"),path=require("path"),vm=require("vm"); const root=path.join(__dirname,"..");
const KEY=process.env.ANTHROPIC_API_KEY; if(!KEY){ console.log("ANTHROPIC_API_KEY 없음 — LLM 정정 단계 건너뜀(주간 Claude 작업이 대신 처리)"); process.exit(0); }
const MODEL=process.env.LLM_MODEL||"claude-sonnet-4-5"; const today=new Date(Date.now()+9*3600e3).toISOString().slice(0,10);
const rep=JSON.parse(fs.readFileSync(path.join(root,"data/watch-report.json"),"utf8")); const changes=(rep.changes||[]).slice(0,5);
if(!changes.length){ console.log("감지된 변경 없음"); process.exit(0); }
const strip=h=>h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi,"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
const load=f=>{ const w={DATA:{}}; vm.runInContext(fs.readFileSync(path.join(root,"data",f),"utf8"),vm.createContext({window:w})); return w.DATA; };
(async()=>{
  const ctxData={eduTimeline:load("edu-timeline.js").eduTimeline,dailyConfig:load("daily-config.js").dailyConfig,admissionsBulletins:(load("admissions.js").admissions.bulletins||[]).slice(0,5).map(b=>b.title),advisoryTitles:(load("advisory.js").advisory||[]).slice(0,8).map(a=>a.title)};
  const pages=[]; for(const c of changes){ try{ const ac=new AbortController(); const t=setTimeout(()=>ac.abort(),20000); const r=await fetch(c.href,{signal:ac.signal,headers:{"User-Agent":"Mozilla/5.0 (tad-math)"}}); clearTimeout(t); pages.push({...c,text:strip(await r.text()).slice(0,6000)}); }catch(e){ pages.push({...c,text:"(본문 열기 실패)"}); } }
  const system=`너는 한국 중·고등 학습 사이트 'TAD 공부방'의 데이터 관리자다. 새로 감지된 공지 본문을 읽고, 사이트 데이터에 반영할 '사실'만 JSON 패치로 제안한다. 추측·소문은 넣지 않는다. 출력은 JSON 하나만:
{"advisory":[{"date":"YYYY-MM-DD","grade":["all"],"tag":"일정|입시 체제|내신|교육과정|수능","title":"...","body":"3~5문장, 학생이 무엇을 할지 포함","src":[["제목","URL"]]}],
 "overrides":{"lessons":{"<차시 id>":{"필드":"값"}},"units":{},"hide":[],"log":[{"date":"...","what":"...","why":"...","src":"URL"}]},
 "dailyConfigExams":[{"name":"...","date":"YYYY-MM-DD","type":"mid|final|mock|csat","subjects":["수학"]}],
 "notes":"반영하지 않은 이유나 사람이 확인할 것"}
규칙: 확실한 날짜·제도 변경만. advisory 는 이미 있는 제목과 겹치면 넣지 않는다. 차시 내용 수정은 성취기준 코드·학기 배치·수치 정정처럼 근거가 본문에 있을 때만. 모르면 빈 배열.`;
  const user=`오늘 ${today}. 현재 데이터 요약: ${JSON.stringify(ctxData).slice(0,4000)}\n\n감지된 자료:\n${pages.map((p,i)=>`[${i+1}] ${p.source} — ${p.title}\n${p.href}\n영향: ${(p.affects||[]).join(", ")}\n본문: ${p.text}`).join("\n\n")}`;
  const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":KEY,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:MODEL,max_tokens:4000,system,messages:[{role:"user",content:user}]})});
  const j=await r.json(); if(!r.ok){ console.error("LLM 호출 실패",JSON.stringify(j).slice(0,300)); process.exit(0); }
  const txt=(j.content||[]).map(c=>c.text||"").join(""); const m=/\{[\s\S]*\}/.exec(txt); if(!m){ console.log("패치 없음"); process.exit(0); }
  let patch; try{ patch=JSON.parse(m[0]); }catch(e){ console.error("패치 JSON 파싱 실패"); process.exit(0); }
  let applied=[];
  // advisory
  if(Array.isArray(patch.advisory)&&patch.advisory.length){ const p=path.join(root,"data/advisory.js"); let s=fs.readFileSync(p,"utf8"); const ok=patch.advisory.filter(a=>a.title&&a.body&&Array.isArray(a.src)&&a.src.length&&/^\d{4}-\d{2}-\d{2}$/.test(a.date||"")&&!s.includes(a.title));
    if(ok.length){ const ins=ok.map(a=>" "+JSON.stringify({date:a.date,grade:a.grade||["all"],tag:a.tag||"일정",title:a.title,body:a.body,src:a.src})+",\n").join(""); s=s.replace("window.DATA.advisory = [\n","window.DATA.advisory = [\n"+ins); fs.writeFileSync(p,s); applied.push(`advisory ${ok.length}건`); } }
  // overrides
  if(patch.overrides&&typeof patch.overrides==="object"){ const op=path.join(root,"data/overrides.js"); const O=load("overrides.js").overrides; const po=patch.overrides; let n=0;
    Object.entries(po.lessons||{}).forEach(([id,f])=>{ if(id&&f&&typeof f==="object"){ O.lessons[id]={...(O.lessons[id]||{}),...f}; n++; } }); Object.entries(po.units||{}).forEach(([id,f])=>{ if(id&&f&&typeof f==="object"){ O.units[id]={...(O.units[id]||{}),...f}; n++; } }); (po.hide||[]).forEach(id=>{ if(typeof id==="string"&&!O.hide.includes(id)){ O.hide.push(id); n++; } }); (po.log||[]).forEach(l=>{ if(l&&l.what) O.log.push({date:l.date||today,what:l.what,why:l.why||"",src:l.src||""}); });
    if(n){ fs.writeFileSync(op,fs.readFileSync(op,"utf8").replace(/window\.DATA\.overrides = \{[\s\S]*\};\s*$/,`window.DATA.overrides = ${JSON.stringify(O,null,1)};\n`)); applied.push(`overrides ${n}건`); } }
  // exams
  if(Array.isArray(patch.dailyConfigExams)&&patch.dailyConfigExams.length){ const p=path.join(root,"data/daily-config.js"); const c=load("daily-config.js").dailyConfig; const ok=patch.dailyConfigExams.filter(e=>e.name&&/^\d{4}-\d{2}-\d{2}$/.test(e.date||"")&&["mid","final","mock","csat"].includes(e.type)&&!c.exams.some(x=>x.name===e.name&&x.date===e.date));
    if(ok.length){ c.exams.push(...ok.map(e=>({name:e.name,date:e.date,type:e.type,subjects:e.subjects||["수학","국어","영어"]}))); c.exams.sort((a,b)=>a.date.localeCompare(b.date)); fs.writeFileSync(p,fs.readFileSync(p,"utf8").replace(/window\.DATA\.dailyConfig = \{[\s\S]*\};\s*$/,`window.DATA.dailyConfig = ${JSON.stringify(c,null,1)};\n`)); applied.push(`시험 일정 ${ok.length}건`); } }
  fs.writeFileSync(path.join(root,"data/llm-report.json"),JSON.stringify({date:today,model:MODEL,applied,notes:patch.notes||""},null,1));
  console.log(applied.length?"LLM 정정 적용: "+applied.join(", "):"LLM 제안 없음", patch.notes?"\n메모: "+patch.notes:"");
})().catch(e=>{ console.error("llm-revise 오류",e.message); process.exit(0); });
