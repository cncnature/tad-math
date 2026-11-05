// node scripts/audit.js [--json]
// 콘텐츠 자가 진단 — 주간 자동 조사(스케줄 작업)가 '무엇을 먼저 채우고 무엇을 다시 확인할지' 를 이 결과로 정한다.
// 출력: docs/AUDIT.md (사람용) + data/audit.json (작업용). 검사 항목:
//  1) 학년×과목 차시 수 vs 목표(docs/BACKLOG.md 의 목표와 같음)  2) '추정' 표시가 남은 파일·단원  3) 지난 시험 일정  4) 필드 빈 차시(pattern/memo/why)
//  5) 성취기준 코드 없는 차시  6) 같은 제목 중복  7) 오버라이드 적용 건수
const vm=require("vm"),fs=require("fs"),path=require("path"); const root=path.join(__dirname,"..");
const w={DATA:{},WIDGETS:{}}; const ctx=vm.createContext({window:w,document:{createElement:()=>({}),documentElement:{}},getComputedStyle:()=>({getPropertyValue:()=>""})});
const subFiles=fs.readdirSync(path.join(root,"data/subjects")).filter(f=>f.endsWith(".js")).map(f=>"subjects/"+f.replace(/\.js$/,""));
for(const f of ["curriculum","curriculum-m1","curriculum-m21","curriculum-h1","curriculum-h23","standards","daily-config","overrides",...subFiles]) vm.runInContext(fs.readFileSync(path.join(root,"data",f+".js"),"utf8"),ctx);
const D=w.DATA; require(path.join(root,"js/merge.js")).apply(D);
const TARGET={ // 학년별 과목별 목표 차시 (채워질수록 올린다)
 kor:{g22:10,g31:8,g32:8,h1:12,h2:15}, eng:{g22:10,g31:8,g32:8,h1:12,h2:12}, sci:{g22:14,g31:10,g32:10,h1:16}, soc:{g22:12,g31:8,g32:8,h1:16}, his:{g22:12,g31:8,g32:8,h1:14} };
const today=new Date(Date.now()+9*3600e3).toISOString().slice(0,10);
const out={date:today,coverage:[],gaps:[],assumptions:[],pastExams:[],thin:[],noStd:[],dupTitles:[],overrides:{lessons:Object.keys((D.overrides||{}).lessons||{}).length,units:Object.keys((D.overrides||{}).units||{}).length,hide:((D.overrides||{}).hide||[]).length}};
const titles={};
Object.values(D.subjects||{}).forEach(s=>{ const by={}; s.units.forEach(u=>{ const g=u.grade||s.grade; by[g]=(by[g]||0)+u.lessons.length; u.lessons.forEach(l=>{ const miss=["pattern","memo","why"].filter(k=>!l[k]||(Array.isArray(l[k])&&!l[k].length)); if(miss.length) out.thin.push({id:l.id,miss}); if(!(l.std&&l.std.length)) out.noStd.push(l.id); const t=s.name+"|"+l.title; (titles[t]=titles[t]||[]).push(l.id); }); });
  Object.entries(TARGET[s.id]||{}).forEach(([g,t])=>{ const n=by[g]||0; out.coverage.push({subject:s.name,sid:s.id,grade:g,lessons:n,target:t}); if(n<t) out.gaps.push({sid:s.id,subject:s.name,grade:g,need:t-n}); }); });
Object.entries(titles).forEach(([t,ids])=>{ if(ids.length>1) out.dupTitles.push({title:t,ids}); });
// 추정 표시: 파일 머리말(첫 12줄)에 '추정' 이 있으면 재검증 대상
subFiles.forEach(f=>{ const head=fs.readFileSync(path.join(root,"data",f+".js"),"utf8").split("\n").slice(0,12).join("\n"); if(/추정/.test(head)) out.assumptions.push(f.replace("subjects/","")+".js"); });
((D.dailyConfig||{}).exams||[]).forEach(e=>{ if(e.date<today) out.pastExams.push(e); });
out.gaps.sort((a,b)=>b.need-a.need);
fs.writeFileSync(path.join(root,"data/audit.json"),JSON.stringify(out,null,1));
const md=[`# 콘텐츠 자가 진단 (${today})`,"",`주간 자동 조사는 이 문서의 **부족분(gaps)** 상위부터 채우고, **추정** 파일은 공개 자료로 다시 확인해 \`data/overrides.js\` 로 정정한다. (\`node scripts/audit.js\` 가 생성)`,"",
 "## 학년 × 과목 차시 (현재 / 목표)","","| 과목 | "+[...new Set(out.coverage.map(c=>c.grade))].join(" | ")+" |","|---|"+[...new Set(out.coverage.map(c=>c.grade))].map(()=>"---").join("|")+"|",
 ...Object.values(D.subjects||{}).map(s=>`| ${s.name} | `+[...new Set(out.coverage.map(c=>c.grade))].map(g=>{ const c=out.coverage.find(x=>x.sid===s.id&&x.grade===g); return c?`${c.lessons}/${c.target}${c.lessons<c.target?" ⚠️":""}`:"—"; }).join(" | ")+" |"),"",
 "## 다음에 채울 것 (부족 순)","",...(out.gaps.length?out.gaps.map(g=>`- [ ] ${g.subject} ${g.grade}: ${g.need}차시 더`):["- 없음"]),"",
 "## 재검증 필요 (파일 머리말에 '추정')","",...(out.assumptions.length?out.assumptions.map(f=>`- [ ] data/subjects/${f}`):["- 없음"]),"",
 "## 지난 시험 일정 (data/daily-config.js 에서 지울 것)","",...(out.pastExams.length?out.pastExams.map(e=>`- [ ] ${e.name} ${e.date}`):["- 없음"]),"",
 "## 빈 필드 차시","",...(out.thin.length?out.thin.map(x=>`- ${x.id}: ${x.miss.join(", ")}`):["- 없음"]),"",
 "## 성취기준 코드 없는 차시","",...(out.noStd.length?out.noStd.map(x=>"- "+x):["- 없음"]),"",
 "## 제목 중복","",...(out.dupTitles.length?out.dupTitles.map(x=>`- ${x.title}: ${x.ids.join(", ")}`):["- 없음"]),"",
 `오버라이드 적용: 차시 ${out.overrides.lessons} · 단원 ${out.overrides.units} · 숨김 ${out.overrides.hide}`];
fs.writeFileSync(path.join(root,"docs/AUDIT.md"),md.join("\n")+"\n");
if(process.argv.includes("--json")) console.log(JSON.stringify(out,null,1)); else console.log(md.join("\n"));
