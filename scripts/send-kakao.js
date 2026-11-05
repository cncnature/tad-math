// node scripts/send-kakao.js [--dry] [--date YYYY-MM-DD]
// 오늘의 5줄을 카카오톡 '나에게 보내기'(나와의 채팅)로 보낸다. 기본은 리스트 템플릿 한 통(카드 3개 + 전체 보기 버튼), KAKAO_FORMAT=text 면 200자 텍스트 4통.
// 환경변수: KAKAO_REST_KEY, KAKAO_REFRESH_TOKEN (필수) · KAKAO_CLIENT_SECRET (앱에서 켰을 때만) · REPO_PAT + GITHUB_REPOSITORY (리프레시 토큰이 갱신되면 Secrets 에 되쓰기, 선택)
// 설정 절차: docs/KAKAO-SETUP.md
const vm=require("vm"),fs=require("fs"),path=require("path"),https=require("https"),{execSync}=require("child_process");
const root=path.join(__dirname,".."); const args=process.argv.slice(2); const dry=args.includes("--dry"); const di=args.indexOf("--date");
const w={DATA:{},WIDGETS:{}}; const ctx=vm.createContext({window:w,document:{createElement:()=>({}),documentElement:{}},getComputedStyle:()=>({getPropertyValue:()=>""})});
for(const f of ["curriculum","curriculum-m1","curriculum-m21","curriculum-h1","curriculum-h23","deepen-m","deepen-h1","deepen-h23","deepen-core","suneung","study-methods","standards","daily-config","overrides","subjects/kor","subjects/eng","subjects/sci","subjects/soc","subjects/his",...fs.readdirSync(path.join(root,"data/subjects")).filter(f=>/-(g3|h1|h2|h3)\.js$/.test(f)).map(f=>"subjects/"+f.replace(/\.js$/,""))]) vm.runInContext(fs.readFileSync(path.join(root,"data",f+".js"),"utf8"),ctx);
const D=w.DATA; require(path.join(root,"js/merge.js")).apply(D);
D.curriculum.units.forEach(u=>u.lessons.forEach(l=>{const d=(D.deepen||{})[l.id];if(!d)return;l.pitfalls=[...(l.pitfalls||[]),...(d.pitfalls||[])];l.points=[...(l.points||[]),...(d.points||[])];l.quiz=[...l.quiz,...(d.quiz||[])];}));
const BRIEF=require(path.join(root,"js/brief.js"));
const kst=new Date(Date.now()+9*3600e3); const date=di>=0?args[di+1]:kst.toISOString().slice(0,10);
const cfg=D.dailyConfig||{}; const b=BRIEF.build({D,date,grade:cfg.grade||"g22",name:cfg.name||"",exams:cfg.exams||[],daily:cfg.daily||[]});
const url=`https://cncnature.github.io/tad-math/#/today?d=${date}`; const L=["①","②","③","④"];
const cut=(s,n)=>s.length>n?s.slice(0,n-1)+"…":s;
// 200자 이하 메시지 묶음
const msgs=[cut(`${b.head}\n${b.exam}`,200)];
b.blocks.forEach(x=>{ const quiz=x.quiz?`\n❓ ${x.quiz.q} ${x.quiz.opts.map((o,i)=>L[i]+o).join(" ")}`:""; let t=`[${x.subject}·${x.title}]\n✅ ${x.need}\n⚠️ ${x.trap}\n🎯 ${x.pattern}${quiz}`; if(t.length>200) t=`[${x.subject}·${x.title}]\n✅ ${cut(x.need,80)}\n⚠️ ${cut(x.trap,70)}${quiz?"\n❓ "+cut(x.quiz.q,45)+"…":""}`; msgs.push(cut(t,200)); });
msgs.push(cut(`📌 오늘 할 일: ${b.todo.join(" / ")}\n🔗 답·풀이 ${url}`,200));
if(dry){ msgs.forEach((m,i)=>console.log(`--- ${i+1} (${m.length}자)\n${m}`)); process.exit(0); }
const KEY=process.env.KAKAO_REST_KEY, RT=process.env.KAKAO_REFRESH_TOKEN, SEC=process.env.KAKAO_CLIENT_SECRET||"";
if(!KEY||!RT){ console.log("KAKAO_REST_KEY / KAKAO_REFRESH_TOKEN 없음 — 카카오 전송 건너뜀"); process.exit(0); }
function post(host,p,body,headers){ return new Promise((res,rej)=>{ const data=typeof body==="string"?body:new URLSearchParams(body).toString(); const req=https.request({hostname:host,path:p,method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded;charset=utf-8","Content-Length":Buffer.byteLength(data),...headers}},r=>{ let s=""; r.on("data",c=>s+=c); r.on("end",()=>{ try{ res({status:r.statusCode,json:JSON.parse(s)}); }catch(e){ res({status:r.statusCode,json:{raw:s}}); } }); }); req.on("error",rej); req.write(data); req.end(); }); }
(async()=>{
  const tk=await post("kauth.kakao.com","/oauth/token",{grant_type:"refresh_token",client_id:KEY,refresh_token:RT,...(SEC?{client_secret:SEC}:{})});
  if(tk.status!==200||!tk.json.access_token){ console.error("토큰 갱신 실패",tk.json); process.exit(1); }
  if(tk.json.refresh_token&&process.env.REPO_PAT&&process.env.GITHUB_REPOSITORY){ try{ execSync(`gh secret set KAKAO_REFRESH_TOKEN --repo ${process.env.GITHUB_REPOSITORY} --body "${tk.json.refresh_token}"`,{env:{...process.env,GH_TOKEN:process.env.REPO_PAT},stdio:"inherit"}); console.log("리프레시 토큰 갱신·저장"); }catch(e){ console.error("리프레시 토큰 저장 실패(수동 갱신 필요)"); } }
  else if(tk.json.refresh_token) console.log("⚠️ 새 리프레시 토큰이 발급됐지만 REPO_PAT 이 없어 저장하지 못함 — Secrets 의 KAKAO_REFRESH_TOKEN 을 수동으로 바꿔야 2달 뒤에도 동작합니다.");
  const auth={Authorization:"Bearer "+tk.json.access_token};
  // 기본: 리스트 템플릿 한 통(머리말 + 과목 카드 2 + 오늘 할 일, 버튼 '답·풀이 전체 보기'). 각 카드는 4줄까지만 보이므로 짧게 줄이고 전체는 링크로.
  if((process.env.KAKAO_FORMAT||"list")==="list"){
    const site="https://cncnature.github.io/tad-math/"; const lk=h=>({web_url:site+h,mobile_web_url:site+h});
    const card=x=>({title:cut(`${x.subject} · ${x.title}`,40),description:cut(`✅ ${cut(x.need,58)}\n⚠️ ${cut(x.trap,58)}${x.quiz?"\n❓ "+cut(x.quiz.q,50):""}`,200),link:lk(x.href)});
    // 카드는 한 통에 최대 3장 → 과목 3개씩 묶어 여러 통(6과목 = 2통). 마지막 통 머리말에 오늘 할 일. 과목이 2개 이하면 오늘 할 일을 카드로.
    const todoCard={title:"📌 오늘 할 일",description:cut(b.todo.map(t=>"· "+t).join("\n"),200),link:lk(`#/today?d=${date}`)};
    const groups=[]; for(let i=0;i<b.blocks.length;i+=3) groups.push(b.blocks.slice(i,i+3)); if(!groups.length) groups.push([]);
    const base=`${b.head.replace("📘 ","")} · ${b.exam}`; let sentN=0;
    for(let gi=0;gi<groups.length;gi++){ const g=groups[gi]; const last=gi===groups.length-1; const contents=g.map(card); if(last&&contents.length<3) contents.push(todoCard); if(contents.length<2) contents.push(todoCard);
      const header=cut(groups.length>1?`${base} (${gi+1}/${groups.length})`+(last&&contents.length>=3&&!contents.includes(todoCard)?`\n📌 ${b.todo.map(t=>t.replace(/\s*\d+분$/,"")).join(" / ")}`:""):(contents.includes(todoCard)?base:`${base}\n📌 ${b.todo.map(t=>t.replace(/\s*\d+분$/,"")).join(" / ")}`),200);
      const tpl={object_type:"list",header_title:header,header_link:lk(`#/today?d=${date}`),contents:contents.slice(0,3),buttons:[{title:"답·풀이 전체 보기",link:lk(`#/today?d=${date}`)}]};
      const r=await post("kapi.kakao.com","/v2/api/talk/memo/default/send",{template_object:JSON.stringify(tpl)},auth);
      if(r.status===200&&r.json.result_code===0) sentN++; else console.error("리스트 템플릿 실패",r.json); }
    if(sentN===groups.length){ console.log(`카카오 전송 ${sentN}/${groups.length} (리스트 템플릿)`); process.exit(0); }
    console.error("리스트 템플릿 일부 실패 → 텍스트 분할로 재시도");
  }
  let ok=0; for(const m of msgs){ const r=await post("kapi.kakao.com","/v2/api/talk/memo/default/send",{template_object:JSON.stringify({object_type:"text",text:m,link:{web_url:url,mobile_web_url:url},button_title:"답·풀이 보기"})},auth); if(r.status===200&&r.json.result_code===0) ok++; else console.error("전송 실패",r.json); }
  console.log(`카카오 전송 ${ok}/${msgs.length}`); process.exit(ok===msgs.length?0:1);
})();
