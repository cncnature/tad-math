// node scripts/send-telegram.js [--dry] [--date YYYY-MM-DD]
// 오늘의 5줄 브리핑을 만들어 텔레그램으로 보낸다. 환경변수 TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID (GitHub Secrets).
// 브리핑 내용은 js/brief.js (사이트 #/today 와 동일 코드) · 시험 일정은 data/daily-config.js
const vm=require("vm"),fs=require("fs"),path=require("path"),https=require("https");
const root=path.join(__dirname,".."); const args=process.argv.slice(2); const dry=args.includes("--dry"); const di=args.indexOf("--date");
const w={DATA:{},WIDGETS:{}}; const ctx=vm.createContext({window:w,document:{createElement:()=>({}),documentElement:{}},getComputedStyle:()=>({getPropertyValue:()=>""})});
for(const f of ["curriculum","curriculum-m1","curriculum-m21","curriculum-h1","curriculum-h23","deepen-m","deepen-h1","deepen-h23","deepen-core","suneung","study-methods","standards","daily-config","subjects/kor","subjects/eng","subjects/sci","subjects/soc","subjects/his"]) vm.runInContext(fs.readFileSync(path.join(root,"data",f+".js"),"utf8"),ctx);
const D=w.DATA; D.curriculum.units=[...D.curriculum.units,...(D.curriculumExtra||[]).flatMap(x=>x.units||x)];
D.curriculum.units.forEach(u=>u.lessons.forEach(l=>{const d=(D.deepen||{})[l.id];if(!d)return;l.pitfalls=[...(l.pitfalls||[]),...(d.pitfalls||[])];l.points=[...(l.points||[]),...(d.points||[])];l.quiz=[...l.quiz,...(d.quiz||[])];}));
const BRIEF=require(path.join(root,"js/brief.js"));
const kst=new Date(Date.now()+9*3600e3); const date=di>=0?args[di+1]:kst.toISOString().slice(0,10);
const cfg=D.dailyConfig||{}; const b=BRIEF.build({D,date,grade:cfg.grade||"g22",name:cfg.name||"",exams:cfg.exams||[],daily:cfg.daily||[]});
if(dry){ console.log(b.text); process.exit(0); }
const token=process.env.TELEGRAM_BOT_TOKEN, chat=process.env.TELEGRAM_CHAT_ID; if(!token||!chat){ console.error("TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID 가 없습니다"); process.exit(1); }
const body=JSON.stringify({chat_id:chat,text:b.html,parse_mode:"HTML",disable_web_page_preview:true});
const req=https.request({hostname:"api.telegram.org",path:`/bot${token}/sendMessage`,method:"POST",headers:{"Content-Type":"application/json","Content-Length":Buffer.byteLength(body)}},res=>{ let s=""; res.on("data",c=>s+=c); res.on("end",()=>{ const ok=res.statusCode===200; console.log(ok?"sent":"failed", s.slice(0,300)); process.exit(ok?0:1); }); });
req.on("error",e=>{ console.error(e); process.exit(1); }); req.write(body); req.end();
