// node scripts/build.js [출력 폴더] — 배포용 묶음 만들기 (GitHub Actions pages.yml 에서 실행).
// index.html 의 로컬 <script src="data/…|js/…"></script> 150여 개를 순서 그대로 하나로 이어 붙이고(esbuild 가 있으면 파일마다 압축),
// assets/build/app.<해시>.js 로 저장한 뒤 index.html 의 그 태그들을 이 한 줄로 바꾼다. 원본 파일은 그대로 두므로 개발·검사는 지금처럼 개별 파일로 한다.
// 해시 이름이라 서비스워커(sw.js)가 캐시 우선으로 저장해도 새 배포 때 자동으로 새 파일을 받는다.
// 출력 폴더를 주면 사이트 전체를 그 폴더에 복사해서 만든다(로컬 확인용). 주지 않으면 현재 폴더를 고친다(CI 전용 — 커밋하지 말 것).
const fs=require("fs"),path=require("path"),crypto=require("crypto");
const src=path.join(__dirname,".."); const out=process.argv[2]?path.resolve(process.argv[2]):src;
if(out!==src){ fs.rmSync(out,{recursive:true,force:true}); fs.cpSync(src,out,{recursive:true,filter:p=>!/[\\/](\.git|node_modules)([\\/]|$)/.test(p)}); }
let esb=null; try{ esb=require("esbuild"); }catch(e){ console.warn("esbuild 없음 — 압축 없이 이어 붙이기만 합니다"); }
const htmlP=path.join(out,"index.html"); let html=fs.readFileSync(htmlP,"utf8");
const re=/<script src="((?:data|js)\/[^"]+\.js)"><\/script>\n?/g; const files=[...html.matchAll(re)].map(m=>m[1]);
if(files.length<10){ console.error("묶을 스크립트가 너무 적습니다:",files.length); process.exit(1); }
let raw=0; const parts=files.map(f=>{ let code=fs.readFileSync(path.join(out,f),"utf8"); raw+=Buffer.byteLength(code);
  if(esb){ try{ code=esb.transformSync(code,{minify:true,target:"es2020",charset:"utf8",legalComments:"none",loader:"js",sourcefile:f}).code; }catch(e){ console.error("압축 실패 "+f+"\n"+e.message); process.exit(1); } }
  return `/* ${f} */\n${code}\n;`; });
const bundle=parts.join("\n"); const hash=crypto.createHash("sha256").update(bundle).digest("hex").slice(0,10);
const rel=`assets/build/app.${hash}.js`; fs.mkdirSync(path.join(out,"assets/build"),{recursive:true});
for(const f of fs.readdirSync(path.join(out,"assets/build"))) if(/^app\.[0-9a-f]+\.js$/.test(f)) fs.rmSync(path.join(out,"assets/build",f));
fs.writeFileSync(path.join(out,rel),bundle);
let first=true; html=html.replace(re,()=>{ if(first){ first=false; return `<script src="${rel}"></script>\n`; } return ""; });
html=html.replace(/<html([^>]*)>/,`<html$1 data-build="${hash}">`);
fs.writeFileSync(htmlP,html);
const swP=path.join(out,"sw.js"); if(fs.existsSync(swP)) fs.writeFileSync(swP,fs.readFileSync(swP,"utf8").replace(/const CACHE="[^"]*"/,`const CACHE="tad-${hash}"`));  // 배포마다 캐시 이름이 바뀌어 옛 묶음이 정리된다
console.log(`build: ${files.length}개 → ${rel}  ${(raw/1e6).toFixed(2)}MB → ${(Buffer.byteLength(bundle)/1e6).toFixed(2)}MB${esb?" (압축)":""}`);
