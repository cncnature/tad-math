// node scripts/send-telegram.js [--dry] [--date YYYY-MM-DD]
// 오늘의 5줄 브리핑을 만들어 텔레그램으로 보낸다. 환경변수 TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID (GitHub Secrets).
// 브리핑 내용은 js/brief.js (사이트 #/today 와 동일 코드) · 시험 일정은 data/daily-config.js
const vm=require("vm"),fs=require("fs"),path=require("path"),https=require("https");
const root=path.join(__dirname,".."); const args=process.argv.slice(2); const dry=args.includes("--dry"); const di=args.indexOf("--date");
const w={DATA:{},WIDGETS:{}}; const ctx=vm.createContext({window:w,document:{createElement:()=>({}),documentElement:{}},getComputedStyle:()=>({getPropertyValue:()=>""})});
for(const f of ["curriculum","curriculum-m1","curriculum-m21","curriculum-h1","curriculum-h23","deepen-m","deepen-h1","deepen-h23","deepen-core","suneung","study-methods","standards","daily-config","overrides","subjects/kor","subjects/eng","subjects/sci","subjects/soc","subjects/his",...fs.readdirSync(path.join(root,"data/subjects")).filter(f=>/-(g22-[a-z]+|g1|g2|g3|h1|h2|h3)\.js$/.test(f)).map(f=>"subjects/"+f.replace(/\.js$/,""))]) vm.runInContext(fs.readFileSync(path.join(root,"data",f+".js"),"utf8"),ctx);
const D=w.DATA; require(path.join(root,"js/merge.js")).apply(D);
D.curriculum.units.forEach(u=>u.lessons.forEach(l=>{const d=(D.deepen||{})[l.id];if(!d)return;l.pitfalls=[...(l.pitfalls||[]),...(d.pitfalls||[])];l.points=[...(l.points||[]),...(d.points||[])];l.quiz=[...l.quiz,...(d.quiz||[])];}));
const BRIEF=require(path.join(root,"js/brief.js"));
const kst=new Date(Date.now()+9*3600e3); const date=di>=0?args[di+1]:kst.toISOString().slice(0,10);
const cfg=D.dailyConfig||{}; const b=BRIEF.build({D,date,grade:cfg.grade||"g22",name:cfg.name||"",exams:cfg.exams||[],daily:cfg.daily||[]});
if(dry){ console.log(b.text); process.exit(0); }
const token=process.env.TELEGRAM_BOT_TOKEN, chat=process.env.TELEGRAM_CHAT_ID; if(!token||!chat){ console.error("TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID 가 없습니다"); process.exit(1); }
const body=JSON.stringify({chat_id:chat,text:b.html,parse_mode:"HTML",disable_web_page_preview:true});
// 일시 오류(429·5xx·네트워크)는 5·15·30초 뒤 재시도, 그 밖의 오류(토큰·형식 등)는 바로 실패
const WAIT=[5000,15000,30000];
function send(n){ const retry=why=>{ if(n<WAIT.length){ console.error(`재시도 ${n+1}/${WAIT.length}: ${why}`); setTimeout(()=>send(n+1),WAIT[n]); } else { console.error("failed",why); process.exit(1); } };
  const req=https.request({hostname:"api.telegram.org",path:`/bot${token}/sendMessage`,method:"POST",timeout:30000,headers:{"Content-Type":"application/json","Content-Length":Buffer.byteLength(body)}},res=>{ let s=""; res.on("data",c=>s+=c); res.on("end",()=>{ if(res.statusCode===200){ console.log("sent",s.slice(0,300)); process.exit(0); } if(res.statusCode===429||res.statusCode>=500) return retry(`HTTP ${res.statusCode}`); console.error("failed",s.slice(0,300)); process.exit(1); }); });
  req.on("timeout",()=>req.destroy(new Error("timeout"))); req.on("error",e=>retry(e.message)); req.write(body); req.end(); }
send(0);
