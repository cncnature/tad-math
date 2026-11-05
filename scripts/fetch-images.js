// node scripts/fetch-images.js [--limit N] [--only <lesson id>] [--force]
// data/image-queries.json 의 차시별 검색어로 위키백과(대표 이미지)·위키미디어 공용을 찾아, 자유 라이선스(퍼블릭 도메인·CC0·CC BY·CC BY-SA)만
// assets/img/ 에 640px 썸네일로 저장하고 data/visuals/images.js 에 img 시각 자료(출처·저자·라이선스·링크)를 쓴다. 재실행하면 이미 받은 것은 건너뛴다(data/images-manifest.json).
// 네트워크는 GitHub Actions(workflows/images.yml)에서 돈다. 위키미디어 API 정책에 따라 User-Agent 를 밝히고 요청 간격을 둔다.
const fs=require("fs"),path=require("path"); const root=path.join(__dirname,".."); const args=process.argv.slice(2);
const LIMIT=args.includes("--limit")?+args[args.indexOf("--limit")+1]:999; const ONLY=args.includes("--only")?args[args.indexOf("--only")+1]:null; const FORCE=args.includes("--force");
const UA="TAD-study-site/1.0 (https://cncnature.github.io/tad-math/; cncnature@gmail.com) node-fetch"; const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const OK_LIC=/^(public domain|pd|cc0|cc by(-sa)?( ?\d(\.\d)?)?( [a-z]{2,3})?|cc-by(-sa)?-\d\.\d|gfdl)/i; const BAD=/non-free|fair use|all rights reserved|copyright/i;
const qp=path.join(root,"data/image-queries.json"), mp=path.join(root,"data/images-manifest.json"), outDir=path.join(root,"assets/img"); fs.mkdirSync(outDir,{recursive:true});
const queries=JSON.parse(fs.readFileSync(qp,"utf8")).filter(q=>q.want>0&&(!ONLY||q.id===ONLY)); const manifest=fs.existsSync(mp)?JSON.parse(fs.readFileSync(mp,"utf8")):{};
const exP=path.join(root,"data/image-exclude.json"); const EX=new Set(fs.existsSync(exP)?JSON.parse(fs.readFileSync(exP,"utf8")):[]); // 사람이 '관련 없음' 으로 표시한 파일명 — 다시 받지 않는다
Object.keys(manifest).forEach(id=>{ const before=manifest[id].length; manifest[id]=manifest[id].filter(x=>{ const bad=EX.has(x.file); if(bad){ try{ fs.unlinkSync(path.join(root,x.src)); }catch(e){} } return !bad; }); });
const tokens=s=>String(s).toLowerCase().replace(/[^a-z0-9가-힣 ]/g," ").split(/\s+/).filter(w=>w.length>=4&&!["with","from","file","image","photo","diagram","map","view","korea","korean","south"].includes(w));
async function api(url){ const r=await fetch(url,{headers:{"User-Agent":UA,"Accept":"application/json"}}); if(!r.ok) throw new Error("HTTP "+r.status+" "+url.slice(0,80)); return r.json(); }
const strip=h=>String(h||"").replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();
async function info(file){ // Commons imageinfo + license
  const j=await api(`https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent("File:"+file.replace(/^File:/,""))}&prop=imageinfo&iiprop=url|extmetadata|size|mime&iiurlwidth=640&redirects=1`);
  const p=Object.values(j.query.pages||{})[0]; const ii=p&&p.imageinfo&&p.imageinfo[0]; if(!ii) return null; const m=ii.extmetadata||{}; const lic=strip(m.LicenseShortName&&m.LicenseShortName.value); const artist=strip(m.Artist&&m.Artist.value).slice(0,80); const credit=strip(m.Credit&&m.Credit.value).slice(0,80);
  if(!lic||BAD.test(lic)||!OK_LIC.test(lic)) return null; if(!/^image\/(jpeg|png|gif|svg)/.test(ii.mime||"")) return null; if((ii.width||0)<320) return null;
  return {file:p.title.replace(/^File:/,""),thumb:ii.thumburl||ii.url,page:ii.descriptionurl,lic,artist:artist||credit||"Wikimedia Commons 기여자",width:ii.width,height:ii.height,mime:ii.mime}; }
async function fromWiki(t){ const m=/^(en|ko|ja|de|fr):(.+)$/.exec(t); const lang=m?m[1]:"en", title=m?m[2]:t;
  const j=await api(`https://${lang}.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=name&titles=${encodeURIComponent(title)}&redirects=1`); const p=Object.values(j.query.pages||{})[0]; if(!p||!p.pageimage) return null; return info(p.pageimage); }
async function fromCommons(q){ const j=await api(`https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srnamespace=6&srlimit=8&srsearch=${encodeURIComponent(q+" filetype:bitmap")}`); const hits=(j.query&&j.query.search||[]).map(s=>s.title.replace(/^File:/,"")).filter(f=>/\.(jpe?g|png)$/i.test(f));
  const want=tokens(q); const ranked=hits.map(f=>({f,score:tokens(f).filter(w=>want.some(x=>x.startsWith(w.slice(0,5))||w.startsWith(x.slice(0,5)))).length})).sort((a,b)=>b.score-a.score);
  for(const {f,score} of ranked){ if(score===0&&ranked.length>1) continue; if(EX.has(f)) continue; const i=await info(f); await sleep(150); if(i) return i; } return null; }
async function download(url,dest){ const r=await fetch(url,{headers:{"User-Agent":UA}}); if(!r.ok) throw new Error("download "+r.status); fs.writeFileSync(dest,Buffer.from(await r.arrayBuffer())); }
(async()=>{ let done=0, got=0, fail=[];
  for(const q of queries){ if(done>=LIMIT) break; if(!FORCE&&manifest[q.id]&&manifest[q.id].length>=q.want){ continue; } done++; const found=[]; const seen=new Set((manifest[q.id]||[]).map(x=>x.file));
    try{ for(const t of (q.wiki||[])){ if(found.length>=q.want) break; const i=await fromWiki(t).catch(()=>null); await sleep(250); if(i&&!EX.has(i.file)&&!seen.has(i.file)&&!found.some(x=>x.file===i.file)) found.push(i); }
      for(const c of (q.commons||[])){ if(found.length>=q.want) break; const i=await fromCommons(c).catch(()=>null); await sleep(250); if(i&&!seen.has(i.file)&&!found.some(x=>x.file===i.file)) found.push(i); }
      const saved=manifest[q.id]||[]; for(const i of found){ const ext=/png/.test(i.mime)?"png":/gif/.test(i.mime)?"gif":"jpg"; const name=`${q.id}-${saved.length+1}.${ext}`; await download(i.thumb,path.join(outDir,name)); saved.push({file:i.file,src:"assets/img/"+name,page:i.page,lic:i.lic,artist:i.artist,alt:q.alt||q.id}); got++; await sleep(200); }
      manifest[q.id]=saved; if(!found.length) fail.push(q.id); }
    catch(e){ fail.push(q.id+" ("+String(e.message).slice(0,60)+")"); }
    fs.writeFileSync(mp,JSON.stringify(manifest,null,1)); }
  // visuals 파일 생성 (manifest 전체에서)
  const V={}; Object.entries(manifest).forEach(([id,list])=>{ if(list.length) V[id]=list.map(x=>({type:"img",title:x.alt,src:x.src,alt:x.alt,credit:`${x.artist} · ${x.lic} · Wikimedia Commons`,link:x.page})); });
  fs.writeFileSync(path.join(root,"data/visuals/images.js"),`// 자동 수집 이미지(scripts/fetch-images.js) — 위키백과·위키미디어 공용의 자유 라이선스 이미지만. 출처·저자·라이선스는 각 항목 credit/link. 수정 금지(재실행 시 덮어씀)\nwindow.DATA = window.DATA || {}; window.DATA.visuals = Object.assign(window.DATA.visuals || {}, ${JSON.stringify(V,null,1)});\n`);
  console.log(`처리 ${done}개 차시 · 새 이미지 ${got}장 · 누적 ${Object.values(manifest).reduce((a,l)=>a+l.length,0)}장 · 실패 ${fail.length}`); if(fail.length) console.log("실패:",fail.join(", "));
})().catch(e=>{ console.error(e); process.exit(1); });
