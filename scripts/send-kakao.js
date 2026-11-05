// node scripts/send-kakao.js [--dry] [--date YYYY-MM-DD]
// 오늘의 5줄을 카카오톡 '나에게 보내기'(나와의 채팅)로 보낸다. 텍스트 템플릿은 200자 제한이라 과목 블록마다 한 통씩 나눠 보낸다.
// 환경변수: KAKAO_REST_KEY, KAKAO_REFRESH_TOKEN (필수) · KAKAO_CLIENT_SECRET (앱에서 켰을 때만) · REPO_PAT + GITHUB_REPOSITORY (리프레시 토큰이 갱신되면 Secrets 에 되쓰기, 선택)
// 설정 절차: docs/KAKAO-SETUP.md
const vm=require("vm"),fs=require("fs"),path=require("path"),https=require("https"),{execSync}=require("child_process");
const root=path.join(__dirname,".."); const args=process.argv.slice(2); const dry=args.includes("--dry"); const di=args.indexOf("--date");
const w={DATA:{},WIDGETS:{}}; const ctx=vm.createContext({window:w,document:{createElement:()=>({}),documentElement:{}},getComputedStyle:()=>({getPropertyValue:()=>""})});
for(const f of ["curriculum","curriculum-m1","curriculum-m21","curriculum-h1","curriculum-h23","deepen-m","deepen-h1","deepen-h23","deepen-core","suneung","study-methods","standards","daily-config","subjects/kor","subjects/eng","subjects/sci","subjects/soc","subjects/his"]) vm.runInContext(fs.readFileSync(path.join(root,"data",f+".js"),"utf8"),ctx);
const D=w.DATA; D.curriculum.units=[...D.curriculum.units,...(D.curriculumExtra||[]).flatMap(x=>x.units||x)];
D.curriculum.units.forEach(u=>u.lessons.forEach(l=>{const d=(D.deepen||{})[l.id];if(!d)return;l.pitfalls=[...(l.pitfalls||[]),...(d.pitfalls||[])];l.points=[...(l.points||[]),...(d.points||[])];l.quiz=[...l.quiz,...(d.quiz||[])];}));
const BRIEF=require(path.join(root,"js/brief.js"));
const kst=new Date(Date.now()+9*3600e3); const date=di>=0?args[di+1]:kst.toISOString().slice(0,10);
const cfg=D.dailyConfig||{}; const b=BRIEF.build({D,date,grade:cfg.grade||"g22",name:cfg.name||"",exams:cfg.exams||[]});
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
  let ok=0; for(const m of msgs){ const r=await post("kapi.kakao.com","/v2/api/talk/memo/default/send",{template_object:JSON.stringify({object_type:"text",text:m,link:{web_url:url,mobile_web_url:url},button_title:"답·풀이 보기"})},{Authorization:"Bearer "+tk.json.access_token}); if(r.status===200&&r.json.result_code===0) ok++; else console.error("전송 실패",r.json); }
  console.log(`카카오 전송 ${ok}/${msgs.length}`); process.exit(ok===msgs.length?0:1);
})();
