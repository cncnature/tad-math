// node scripts/sync-standards.js [--offline <standard-texts.json>]
// 교육부·국교위 고시 원문(별책 PDF)에서 추출된 공개 데이터셋(npm: korean-secondary-learning-map-mcp, 고시 원문은 저작권법 제7조로 보호 대상 아님)을
// 최신 버전으로 받아, 이 사이트가 쓰는 모든 성취기준 코드의 '공식 문장' 을 data/standards-all.js 로 동기화한다.
// 고시가 개정되어 데이터셋이 갱신되면 사이트의 성취기준 문장이 자동으로 바뀌고, 코드가 사라지거나 없는 코드는 보고서에 남는다(사람·주간 조사가 정정).
const fs=require("fs"),path=require("path"),os=require("os"),{execSync}=require("child_process"),vm=require("vm");
const root=path.join(__dirname,".."); const PKG="korean-secondary-learning-map-mcp";
const norm=c=>c.replace(/Ⅰ/g,"I").replace(/Ⅱ/g,"II").replace(/Ⅲ/g,"III");
async function getTexts(){
  const oi=process.argv.indexOf("--offline"); if(oi>=0) return {version:"offline",texts:JSON.parse(fs.readFileSync(process.argv[oi+1],"utf8")).texts};
  const meta=await (await fetch(`https://registry.npmjs.org/${PKG}`)).json(); const ver=meta["dist-tags"].latest; const url=meta.versions[ver].dist.tarball;
  const tmp=fs.mkdtempSync(path.join(os.tmpdir(),"std-")); const tgz=path.join(tmp,"p.tgz"); fs.writeFileSync(tgz,Buffer.from(await (await fetch(url)).arrayBuffer()));
  execSync(`tar xzf "${tgz}" -C "${tmp}"`); const j=JSON.parse(fs.readFileSync(path.join(tmp,"package/data/kr/standard-texts.json"),"utf8")); return {version:ver,texts:j.texts,sourceNote:j.sourceNote};
}
(async()=>{
  const {version,texts,sourceNote}=await getTexts(); const official={}; texts.forEach(x=>{ official[norm(x.code.replace(/^\[|\]$/g,""))]=x.text; });
  // 이 사이트가 쓰는 코드 모으기
  const w={DATA:{},WIDGETS:{}}; const ctx=vm.createContext({window:w,document:{createElement:()=>({}),documentElement:{}},getComputedStyle:()=>({getPropertyValue:()=>""})});
  const subFiles=fs.readdirSync(path.join(root,"data/subjects")).filter(f=>f.endsWith(".js")).map(f=>"subjects/"+f.replace(/\.js$/,""));
  for(const f of ["curriculum","curriculum-m1","curriculum-m21","curriculum-h1","curriculum-h23","standards","overrides",...subFiles]) vm.runInContext(fs.readFileSync(path.join(root,"data",f+".js"),"utf8"),ctx);
  const D=w.DATA; require(path.join(root,"js/merge.js")).apply(D);
  const used=new Map(); const add=(c,where)=>{ if(!used.has(c)) used.set(c,[]); used.get(c).push(where); };
  Object.values(D.subjects||{}).forEach(s=>s.units.forEach(u=>{ (u.std||[]).forEach(c=>add(c,u.id)); u.lessons.forEach(l=>(l.std||[]).forEach(c=>add(c,l.id))); }));
  Object.entries((D.standards||{}).lessons||{}).forEach(([l,cs])=>cs.forEach(c=>add(c,l)));
  const out={},unknown=[]; for(const [c,where] of used){ const t=official[norm(c)]; if(t) out[c]=t; else unknown.push({code:c,where}); }
  const prev=fs.existsSync(path.join(root,"data/standards-all.js"))?fs.readFileSync(path.join(root,"data/standards-all.js"),"utf8"):"";
  const changed=[]; { const m=/window\.DATA\.standardsAll\s*=\s*(\{[\s\S]*\});\s*$/.exec(prev); if(m){ try{ const old=JSON.parse(m[1]); Object.keys(out).forEach(c=>{ if(old.texts&&old.texts[c]&&old.texts[c]!==out[c]) changed.push({code:c,old:old.texts[c],new:out[c]}); }); }catch(e){} } }
  const synced=new Date(Date.now()+9*3600e3).toISOString().slice(0,10);
  const body={version,synced,source:`교육부·국가교육위원회 고시 별책 원문(공개 데이터셋 ${PKG}@${version}). ${sourceNote||""}`.trim(),count:Object.keys(out).length,unknown:unknown.map(u=>u.code),texts:out};
  fs.writeFileSync(path.join(root,"data/standards-all.js"),`// 자동 동기화 — 사이트가 쓰는 성취기준 코드의 고시 원문 문장. scripts/sync-standards.js 가 생성(수정 금지). 동기화 ${synced}, 데이터셋 ${PKG}@${version}\nwindow.DATA = window.DATA || {};\nwindow.DATA.standardsAll = ${JSON.stringify(body,null,0)};\n`);
  const rep={synced,version,used:used.size,matched:Object.keys(out).length,unknown,changed}; fs.writeFileSync(path.join(root,"data/sync-report.json"),JSON.stringify(rep,null,1));
  console.log(`성취기준 동기화: ${PKG}@${version} · 사용 코드 ${used.size} · 공식 문장 확인 ${Object.keys(out).length} · 미확인 ${unknown.length} · 문장 변경 ${changed.length}`);
  unknown.forEach(u=>console.log("  미확인 코드",u.code,"←",u.where.join(",")));
  changed.forEach(c=>console.log("  문장 변경",c.code));
})().catch(e=>{ console.error("동기화 실패:",e.message); process.exit(2); });
