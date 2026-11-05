// node scripts/auto-update.js
// 규칙으로 안전하게 고칠 수 있는 것만 자동 수정한다(LLM 불필요). 매일 GitHub Actions 가 실행.
//  1) 지난 시험 일정 제거(data/daily-config.js)  2) 동기화 결과의 미확인 성취기준 코드 → overrides.log 경고 기록
//  3) 학년 자동 전환: daily-config.grade 를 진급 시점(3월 1일)에 올림(g22→g31→g32→h1…)  4) 변경 요약을 data/auto-report.json 에 남김
const fs=require("fs"),path=require("path"),vm=require("vm"); const root=path.join(__dirname,".."); const today=new Date(Date.now()+9*3600e3).toISOString().slice(0,10);
const report={date:today,changes:[]};
// 1) + 3) daily-config
{ const p=path.join(root,"data/daily-config.js"); const w={DATA:{}}; vm.runInContext(fs.readFileSync(p,"utf8"),vm.createContext({window:w})); const c=w.DATA.dailyConfig; let dirty=false;
  const keep=(c.exams||[]).filter(e=>e.date>=today.slice(0,10)); const removed=(c.exams||[]).filter(e=>e.date<today); if(removed.length){ c.exams=keep; dirty=true; removed.forEach(e=>report.changes.push(`지난 시험 제거: ${e.name} ${e.date}`)); }
  // 학년 전환: gradeSince(그 학년이 시작된 날) 이후 다음 전환일이 오면 올린다. g22→g31(3/1)→g32(9/1)→h1(3/1)→h2(3/1)→h3(3/1). gradeSince 가 없으면 전환하지 않는다(사람이 한 번 적어 둔다).
  const NEXT={g22:["g31","03-01"],g31:["g32","09-01"],g32:["h1","03-01"],h1:["h2","03-01"],h2:["h3","03-01"]};
  if(c.grade&&NEXT[c.grade]&&/^\d{4}-\d{2}-\d{2}$/.test(c.gradeSince||"")){ const [ng,when]=NEXT[c.grade]; let y=+c.gradeSince.slice(0,4); let next=`${y}-${when}`; if(next<=c.gradeSince) next=`${y+1}-${when}`; if(today>=next){ report.changes.push(`학년 전환: ${c.grade} → ${ng} (${next})`); c.grade=ng; c.gradeSince=next; dirty=true; } }
  if(dirty){ const src=`// 매일 브리핑(텔레그램·카카오) 설정 — 서버(GitHub Actions)는 브라우저 기록을 볼 수 없으므로 시험 일정을 여기에 적는다.\n// type: mid(중간) | final(기말) | mock(학력평가·모의고사) | csat(수능). subjects: 브리핑에 돌아가며 나올 과목. 지난 시험은 scripts/auto-update.js 가 자동으로 지운다. grade 는 매년 3/1·9/1 에 자동 전환(gradeSince).\nwindow.DATA = window.DATA || {};\nwindow.DATA.dailyConfig = ${JSON.stringify(c,null,1)};\n`; fs.writeFileSync(p,src); } }
// 2) 동기화 미확인 코드 → overrides.log 경고(한 번만)
{ const rp=path.join(root,"data/sync-report.json"); if(fs.existsSync(rp)){ const r=JSON.parse(fs.readFileSync(rp,"utf8")); if(r.unknown&&r.unknown.length){ const op=path.join(root,"data/overrides.js"); const w={DATA:{}}; vm.runInContext(fs.readFileSync(op,"utf8"),vm.createContext({window:w})); const O=w.DATA.overrides; const msg=`성취기준 미확인 코드 ${r.unknown.map(u=>u.code).join(", ")} — 고시 원문 데이터셋에 없음(오타·개정 가능). 재검증 필요`; if(!(O.log||[]).some(x=>x.what===msg)){ O.log=O.log||[]; O.log.push({date:today,what:msg,why:"scripts/sync-standards.js 자동 대조",src:"https://www.npmjs.com/package/korean-secondary-learning-map-mcp"}); fs.writeFileSync(op,fs.readFileSync(op,"utf8").replace(/window\.DATA\.overrides = \{[\s\S]*\};\s*$/,`window.DATA.overrides = ${JSON.stringify(O,null,1)};\n`)); report.changes.push("미확인 성취기준 코드 경고 기록"); } }
  (r.changed||[]).forEach(ch=>report.changes.push(`성취기준 문장 갱신: ${ch.code}`)); } }
fs.writeFileSync(path.join(root,"data/auto-report.json"),JSON.stringify(report,null,1));
console.log(report.changes.length?report.changes.map(x=>"· "+x).join("\n"):"자동 수정 없음");
