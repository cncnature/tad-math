/* 오늘의 5줄 브리핑 생성기 — 브라우저(#/today)와 Node(scripts/send-telegram.js)가 같은 코드를 쓴다.
   입력: {date:"YYYY-MM-DD", D:window.DATA, exams:[{name,date,type,subjects[]}], grade:"g22", name?}
   출력: {head, exam, blocks:[{subject,title,href,need,trap,pattern,quiz:{q,opts}}], todo:[...], text(플레인), html(텔레그램 HTML)}
   근거: 시험 D-day 단계(개념 21일 전/유형 8~21일/실전 7일 이내/복기) 는 data/study-methods.js 와 동일. */
(function(root){
  const SUBJ_ID={"국어":"kor","영어":"eng","과학":"sci","사회":"soc","역사":"his","한국사":"his","세계사":"his"};
  const strip=s=>String(s||"").replace(/\*\*/g,"").replace(/\$([^$]+)\$/g,"$1").replace(/\\(frac|sqrt|times|cdot|pm|le|ge|ne)\b/g,"$1").replace(/\s+/g," ").trim();
  const cut=(s,n)=>{ s=strip(s); return s.length>n?s.slice(0,n-1)+"…":s; };
  const dayDiff=(d,from)=>Math.round((new Date(d+"T00:00:00")-new Date(from+"T00:00:00"))/864e5);
  const phaseOf=dd=>dd<0?(dd>=-3?"after":null):dd<=7?"final":dd<=21?"pattern":"concept";
  const PHASE={concept:"개념 완성기",pattern:"유형·내신 집중기",final:"실전기(새 개념 금지)",after:"복기(48시간 안에 오답 분류)",csat:"수능 트랙"};
  const dayIndex=date=>Math.floor(new Date(date+"T00:00:00").getTime()/864e5);
  const WD=["일","월","화","수","목","금","토"];

  function mathLessons(D,grade){ const out=[]; const push=u=>{ if(u.grade===grade) (u.lessons||[]).forEach(l=>out.push({u,l})); }; (D.curriculum.units||[]).forEach(push); (D.curriculumExtra||[]).flat().forEach(push); return out; }
  // 단원에 grade 가 있으면 학생 학년과 같은 단원만, 없으면 과목 기본 grade 로 본다. 해당 학년 단원이 하나도 없으면 전체에서 고른다.
  const gk=g=>/^h1/.test(g||"")?"h1":/^h2/.test(g||"")?"h2":/^h3/.test(g||"")?"h3":(g||"");
  function subjLessons(D,sid,grade){ const s=D.subjects&&D.subjects[sid]; if(!s) return []; const all=[]; s.units.forEach(u=>u.lessons.forEach(l=>all.push({s,u,l,g:u.grade||s.grade}))); if(!grade) return all; const exact=all.filter(x=>gk(x.g)===gk(grade)); if(exact.length) return exact; const band=all.filter(x=>gk(x.g).slice(0,2)===gk(grade).slice(0,2)); return band.length?band:all; }

  function build(opt){
    const D=opt.D, date=opt.date, grade=opt.grade||"g22", di=dayIndex(date); const wd=new Date(date+"T00:00:00").getDay();
    const ups=(opt.exams||[]).map(e=>({e,dd:dayDiff(e.date,date)})).filter(x=>x.dd>=-3).sort((a,b)=>a.dd-b.dd);
    const naesin=ups.find(x=>(x.e.type==="mid"||x.e.type==="final")&&x.dd<=21); const act=naesin||ups.find(x=>x.dd>=0)||null;
    const phase=act?(act.e.type==="csat"||act.e.type==="mock"?(act.dd<=7?"final":"csat"):phaseOf(act.dd)):"csat";
    const examSubjects=act&&act.e.subjects&&act.e.subjects.length?act.e.subjects:["수학","국어","영어","과학","사회","역사"];
    const others=examSubjects.filter(s=>s!=="수학"&&SUBJ_ID[s]&&D.subjects&&D.subjects[SUBJ_ID[s]]);
    // 매일 나올 과목: opt.daily(예: ["수학","국어","과학"])가 있으면 그 순서대로 고정, 없으면 날짜 순환 1과목(실전기 2과목)
    const fixed=(opt.daily||[]).filter(s=>s!=="수학"&&SUBJ_ID[s]&&D.subjects&&D.subjects[SUBJ_ID[s]]);
    const nOther=phase==="final"?2:1; const pick=fixed.length?fixed:[]; if(!fixed.length) for(let k=0;k<nOther&&others.length;k++) pick.push(others[(di+k)%others.length]);
    const blocks=[];
    // 수학: 학년 소단원을 날짜로 순환 (약점 정보는 브라우저에서만 있으므로 여기선 순환)
    const ml=mathLessons(D,grade); if(ml.length&&(examSubjects.includes("수학")||(opt.daily||[]).includes("수학"))){ const {u,l}=ml[di%ml.length]; const pat=(D.suneung&&D.suneung.patterns||[])[di%Math.max(1,(D.suneung&&D.suneung.patterns||[]).length)];
      blocks.push({subject:"수학",title:l.title,href:`#/study/${u.id}/${l.id}`,need:cut(l.concept[0],110),trap:cut((l.pitfalls||[])[0]||"",110),pattern:cut((l.points||[])[0]||(pat?pat.name+": "+(pat.first||pat.desc||""):""),110),quiz:l.quiz&&l.quiz[0]?{q:cut(l.quiz[0].q,120),opts:l.quiz[0].opts.map(o=>cut(o,28))}:null,std:(D.standards&&D.standards.lessons[l.id])||[]}); }
    pick.forEach(sn=>{ const sl=subjLessons(D,SUBJ_ID[sn],grade); if(!sl.length) return; const {s,u,l}=sl[di%sl.length];
      blocks.push({subject:s.name,title:l.title,href:`#/sub/${s.id}/${l.id}`,need:cut(l.memo||l.concept[0],110),trap:cut((l.pitfalls||[])[0]||"",110),pattern:cut((l.pattern||[])[0]||(l.points||[])[0]||"",110),quiz:l.quiz&&l.quiz[0]?{q:cut(l.quiz[0].q,120),opts:l.quiz[0].opts.map(o=>cut(o,28))}:null,std:l.std||[]}); });
    // 오늘 할 일: 과목별 공부법(단계별) 첫 과제
    const SM=D.studyMethods; const todo=[]; ["수학",...pick].forEach(sn=>{ if(sn==="수학"){ const b=blocks[0]; if(b) todo.push(`수학 ${b.title} ${phase==="final"?"주간 테스트 10문항 15분":phase==="pattern"?"학교 시험 필수 문제 4개 + 생성 5문제":"개념→왜→퀴즈 30분"}`); return; } const sm=SM&&SM.subjects[sn==="역사"?"한국사":sn]; const list=sm&&(sm[phase]||sm.csat||sm.concept); if(list&&list[0]) todo.push(`${sn} ${strip(list[0].t)} ${list[0].m}분`); });
    const head=`📘 TAD 공부방 오늘의 5줄 · ${+date.slice(5,7)}/${+date.slice(8,10)}(${WD[wd]})${opt.name?" · "+opt.name:""}`;
    const exam=act?`${act.e.name||act.e.type} ${act.dd>=0?"D-"+act.dd:"D+"+(-act.dd)} · ${PHASE[phase]||phase}`:"등록된 시험 없음 · 수능 트랙";
    const L=["①","②","③","④"];
    const text=[head,exam,"",...blocks.flatMap(b=>[`[${b.subject} · ${b.title}]`,`✅ 꼭: ${b.need}`,b.trap?`⚠️ 함정: ${b.trap}`:null,b.pattern?`🎯 출제·풀이: ${b.pattern}`:null,b.quiz?`❓ ${b.quiz.q} ${b.quiz.opts.map((o,i)=>L[i]+" "+o).join(" ")}`:null,""].filter(x=>x!==null)),`📌 오늘 할 일: ${todo.join(" / ")}`,`🔗 답·풀이: https://cncnature.github.io/tad-math/#/today?d=${date}`].join("\n");
    const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    const html=[`<b>${esc(head)}</b>`,esc(exam),"",...blocks.flatMap(b=>[`<b>[${esc(b.subject)} · ${esc(b.title)}]</b>`,`✅ 꼭: ${esc(b.need)}`,b.trap?`⚠️ 함정: ${esc(b.trap)}`:null,b.pattern?`🎯 출제·풀이: ${esc(b.pattern)}`:null,b.quiz?`❓ ${esc(b.quiz.q)}\n${b.quiz.opts.map((o,i)=>L[i]+" "+esc(o)).join("  ")}`:null,""].filter(x=>x!==null)),`📌 오늘 할 일: ${esc(todo.join(" / "))}`,`🔗 답·풀이: https://cncnature.github.io/tad-math/#/today?d=${date}`].join("\n");
    return {head,exam,phase,act:act?act.e:null,dd:act?act.dd:null,blocks,todo,text,html};
  }
  const api={build,SUBJ_ID,phaseOf,PHASE};
  if(typeof module!=="undefined"&&module.exports) module.exports=api; else root.BRIEF=api;
})(typeof window!=="undefined"?window:globalThis);
