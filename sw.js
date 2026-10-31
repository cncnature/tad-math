/* TAD 수학 만지기 — 오프라인 캐시. 앱 셸·데이터는 네트워크 우선(최신 배포 반영), 폰트·아이콘·KaTeX 는 캐시 우선 */
const CACHE="tad-v1";
const SHELL=["./","./index.html","./css/style.css","./manifest.webmanifest"];
self.addEventListener("install",e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())); });
self.addEventListener("activate",e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener("fetch",e=>{ const u=new URL(e.request.url); if(e.request.method!=="GET"||u.origin!==location.origin) return;
  const staticAsset=/\/(vendor|assets)\//.test(u.pathname);
  if(staticAsset){ e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{ const cp=res.clone(); caches.open(CACHE).then(c=>c.put(e.request,cp)); return res; }))); return; }
  e.respondWith(fetch(e.request).then(res=>{ const cp=res.clone(); caches.open(CACHE).then(c=>c.put(e.request,cp)); return res; }).catch(()=>caches.match(e.request).then(r=>r||(u.pathname.endsWith("/")||u.pathname.endsWith(".html")?caches.match("./index.html"):undefined)))); });
