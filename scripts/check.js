// node scripts/check.js — 데이터 파일 간 id 참조 무결성 검사
const vm=require("vm"),fs=require("fs"),path=require("path");const root=path.join(__dirname,"..");
const w={DATA:{},WIDGETS:{}};const ctx=vm.createContext({window:w,document:{createElement:()=>({}),documentElement:{}},getComputedStyle:()=>({getPropertyValue:()=>""})});
for(const f of ["curriculum","formulas","concepts","roadmap","diagnostic","recall","exam","life","people","slides","play","bridge"]) vm.runInContext(fs.readFileSync(path.join(root,"data",f+".js"),"utf8"),ctx);
vm.runInContext(fs.readFileSync(path.join(root,"js/widgets.js"),"utf8"),ctx);
const D=w.DATA,W=w.WIDGETS;const nodes=new Set(D.roadmap.nodes.map(n=>n.id)),fids=new Set(D.formulas.map(f=>f.id));const lessons=[];D.curriculum.units.forEach(u=>u.lessons.forEach(l=>lessons.push(l)));const lids=new Set(lessons.map(l=>l.id));const err=[];
lessons.forEach(l=>{if(!nodes.has(l.node))err.push("lesson node "+l.id+":"+l.node);l.formulas.forEach(f=>{if(!fids.has(f))err.push("lesson formula "+l.id+":"+f)});l.quiz.forEach((q,i)=>{if(q.a<0||q.a>=q.opts.length)err.push("quiz idx "+l.id+i)})});
D.formulas.forEach(f=>{if(!nodes.has(f.node))err.push("formula node "+f.id)});
D.concepts.forEach(c=>{if(!nodes.has(c.node))err.push("concept node "+c.term)});
D.diagnostic.forEach((d,i)=>{if(!nodes.has(d.node))err.push("diag node "+i)});
D.recall.forEach(r=>{if(!fids.has(r.f))err.push("recall f "+r.f)});
D.exam.forEach(e=>e.items.forEach(it=>{if(!lids.has(it.l))err.push("exam lesson "+it.l)}));
D.life.forEach(x=>{if(!nodes.has(x.node))err.push("life node "+x.title)});
D.people.forEach(p=>{if(!nodes.has(p.node))err.push("people node "+p.name);if(!lids.has(p.link))err.push("people link "+p.link)});
D.slides.forEach(s=>{if(!lids.has(s.lesson))err.push("slide lesson "+s.lesson);s.slides.forEach(x=>{if(x.widget&&!W[x.widget])err.push("slide widget "+x.widget)})});
D.roadmap.edges.forEach(([a,b])=>{if(!nodes.has(a)||!nodes.has(b))err.push("edge "+a+"-"+b)});
Object.values(W).forEach(x=>{if(!nodes.has(x.node))err.push("widget node "+x.title)});
(D.bridge||[]).forEach(b=>{b.nodes.forEach(n=>{if(!nodes.has(n))err.push("bridge node "+b.id+":"+n)});b.steps.forEach(st=>{if(!nodes.has(st.node))err.push("bridge step node "+b.id)})});
const dup=new Set();lessons.forEach(l=>{if(dup.has(l.id))err.push("dup lesson "+l.id);dup.add(l.id)});
if(err.length){console.error(err.join("\n"));process.exit(1);}
console.log("OK — lessons",lessons.length,"formulas",D.formulas.length,"nodes",nodes.size,"edges",D.roadmap.edges.length,"widgets",Object.keys(W).length);
