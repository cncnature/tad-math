// node scripts/watch.js
// 공개 공지 페이지(data/watch.json)를 열어 새 글 제목을 찾고, 이전 상태(data/watch-state.json)와 비교해 '변경 감지' 를 만든다.
// 결과: data/watch-report.json, docs/WATCH.md, docs/BACKLOG.md 의 '## 자동 감지' 단락(중복 URL 제외). 페이지가 안 열려도 멈추지 않는다.
const fs=require("fs"),path=require("path"); const root=path.join(__dirname,"..");
const cfg=JSON.parse(fs.readFileSync(path.join(root,"data/watch.json"),"utf8")); const stP=path.join(root,"data/watch-state.json");
const state=fs.existsSync(stP)?JSON.parse(fs.readFileSync(stP,"utf8")):{}; const today=new Date(Date.now()+9*3600e3).toISOString().slice(0,10);
const strip=h=>h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi,"").replace(/<[^>]+>/g," ").replace(/&nbsp;|&amp;|&lt;|&gt;|&quot;/g,m=>({"&nbsp;":" ","&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"'}[m])).replace(/\s+/g," ").trim();
async function get(url){ const ac=new AbortController(); const t=setTimeout(()=>ac.abort(),20000); try{ const r=await fetch(url,{signal:ac.signal,headers:{"User-Agent":"Mozilla/5.0 (tad-math watch; +https://cncnature.github.io/tad-math/)","Accept-Language":"ko"}}); if(!r.ok) throw new Error("HTTP "+r.status); return await r.text(); } finally{ clearTimeout(t); } }
function links(html,base){ const out=[]; const re=/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi; let m; while((m=re.exec(html))){ const title=strip(m[2]); if(title.length<6||title.length>120) continue; let href=m[1]; try{ href=new URL(href,base).href; }catch(e){ continue; } out.push({title,href}); } return out; }
(async()=>{
  const report={date:today,sources:[],changes:[]};
  for(const s of cfg.sources){ const prev=state[s.id]||{}; const rec={id:s.id,name:s.name,ok:false};
    try{ if(s.type==="npm"){ const j=JSON.parse(await get(s.url)); const v=j["dist-tags"].latest; rec.ok=true; rec.version=v; if(prev.version&&prev.version!==v) report.changes.push({source:s.name,title:`성취기준 데이터셋 ${prev.version} → ${v}`,href:"https://www.npmjs.com/package/korean-secondary-learning-map-mcp",affects:s.affects}); state[s.id]={version:v,seen:today}; }
      else { const html=await get(s.url); const ls=links(html,s.url).filter(l=>(s.keywords||[]).some(k=>l.title.includes(k))); const seen=new Set(prev.titles||[]); const fresh=ls.filter(l=>!seen.has(l.title)); rec.ok=true; rec.found=ls.length; rec.fresh=fresh.length; if(prev.titles) fresh.slice(0,10).forEach(l=>report.changes.push({source:s.name,title:l.title,href:l.href,affects:s.affects})); state[s.id]={titles:[...new Set([...ls.map(l=>l.title),...(prev.titles||[])])].slice(0,300),seen:today}; } }
    catch(e){ rec.error=String(e.message).slice(0,120); }
    report.sources.push(rec); }
  fs.writeFileSync(stP,JSON.stringify(state,null,1)); fs.writeFileSync(path.join(root,"data/watch-report.json"),JSON.stringify(report,null,1));
  // BACKLOG 에 자동 감지 항목 추가(중복 제외)
  const bp=path.join(root,"docs/BACKLOG.md"); let b=fs.readFileSync(bp,"utf8"); if(!/## 자동 감지/.test(b)) b+="\n## 자동 감지 (scripts/watch.js — 주간 조사가 내용을 읽고 반영한 뒤 [x])\n";
  let added=0; for(const c of report.changes){ if(b.includes(c.href)) continue; b=b.replace(/(## 자동 감지[^\n]*\n)/,`$1- [ ] ${today} ${c.source}: ${c.title} — ${c.href} (영향: ${(c.affects||[]).join(", ")})\n`); added++; }
  fs.writeFileSync(bp,b);
  const md=[`# 공개 자료 감시 (${today})`,"",`감시 대상 ${cfg.sources.length}곳 · 새 글 ${report.changes.length}건 · 백로그 추가 ${added}건`,"","| 출처 | 상태 | 비고 |","|---|---|---|",...report.sources.map(r=>`| ${r.name} | ${r.ok?"열림":"실패"} | ${r.error||(r.version?`v${r.version}`:`관련 글 ${r.found||0}건, 새 글 ${r.fresh||0}건`)} |`),"","## 새로 감지된 글",...(report.changes.length?report.changes.map(c=>`- ${c.source}: [${c.title}](${c.href})`):["- 없음"]),"",`처음 실행한 출처는 기준선만 저장하고 변경으로 세지 않습니다.`];
  fs.writeFileSync(path.join(root,"docs/WATCH.md"),md.join("\n")+"\n"); console.log(md.join("\n"));
})();
