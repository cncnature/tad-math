/* 모션 풀이 엔진 — 단계별로 그려지고 강조되는 SVG 설명 애니메이션 (외부 라이브러리 없음).
   스펙: docs/MOTION-SCHEMA.md. 쓰는 곳: 수능 전략 패턴·고난도 해부(motion 필드).
   근거: Mayer 멀티미디어 학습 원리 — 신호 주기(signaling: 지금 볼 곳을 강조), 분절(segmenting: 학습자가 속도를 조절하는 단계 나눔),
         시간 근접(temporal contiguity: 설명과 그림을 같은 순간에), 이중 부호화(Paivio).
   window.MOTION.render(spec) → HTML 문자열, window.MOTION.mount(root) → 재생 연결. */
(function(){
  const W=640,H=360,PAD=36;
  const PAL=["#3b6ef5","#e0533d","#1f9d55","#d9a400","#8e5bd6","#0e9aa7","#6b7280"];
  const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const md=s=>esc(s).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/==(.+?)==/g,"<mark>$1</mark>");
  const col=c=>typeof c==="number"?PAL[c%PAL.length]:(c||PAL[0]);
  // 안전한 수식 → 함수: 숫자, x, + - * / ^ ( ) , 와 허용 함수만
  // 수식 → 함수: 작은 재귀 하강 파서(숫자, x, + - * / ^, 괄호, 곱셈 생략, 허용 함수·상수만). eval 을 쓰지 않는다.
  const FN1={sin:Math.sin,cos:Math.cos,tan:Math.tan,exp:Math.exp,ln:Math.log,log:Math.log10,log2:Math.log2,sqrt:Math.sqrt,abs:Math.abs,floor:Math.floor,min:Math.min,max:Math.max};
  function fx(input){ const src=String(input).replace(/\s+/g,""); const T=src.match(/\d+\.?\d*|\.\d+|[a-z][a-z0-9]*|[-+*/^(),]/g)||[]; if(T.join("")!==src) return null; let i=0;
    const peek=()=>T[i], next=()=>T[i++];
    const startsPrimary=t=>t!=null&&(/^[\d.]/.test(t)||/^[a-z]/.test(t)||t==="(");
    function pexpr(){ let a=term(); while(peek()==="+"||peek()==="-"){ const op=next(), b=term(), l=a; a=op==="+"?x=>l(x)+b(x):x=>l(x)-b(x); } return a; }
    function term(){ let a=unary(); for(;;){ const t=peek(); if(t==="*"||t==="/"){ next(); const b=unary(), l=a; a=t==="*"?x=>l(x)*b(x):x=>l(x)/b(x); } else if(startsPrimary(t)){ const b=power(), l=a; a=x=>l(x)*b(x); } else break; } return a; }
    function unary(){ if(peek()==="-"){ next(); const a=unary(); return x=>-a(x); } if(peek()==="+"){ next(); return unary(); } return power(); }
    function power(){ const a=primary(); if(peek()==="^"){ next(); const b=unary(); return x=>Math.pow(a(x),b(x)); } return a; }
    function primary(){ const t=next(); if(t==null) throw 0; if(/^[\d.]/.test(t)){ const v=parseFloat(t); return ()=>v; }
      if(t==="("){ const a=pexpr(); if(next()!==")") throw 0; return a; }
      if(t==="x") return x=>x; if(t==="pi") return ()=>Math.PI; if(t==="e") return ()=>Math.E;
      if(FN1[t]){ if(next()!=="(") throw 0; const args=[pexpr()]; while(peek()===","){ next(); args.push(pexpr()); } if(next()!==")") throw 0; const f=FN1[t]; return x=>f(...args.map(g=>g(x))); }
      throw 0; }
    try{ const f=pexpr(); if(i!==T.length) return null; f(1); return f; }catch(e){ return null; } }
  function frameOf(sp){ const fr=sp.frame; if(!fr) return {X:x=>x,Y:y=>y,graph:false};
    const [x0,x1]=fr.x||[-5,5],[y0,y1]=fr.y||[-5,5]; const sx=(W-2*PAD)/(x1-x0), sy=(H-2*PAD)/(y1-y0);
    return {X:x=>PAD+(x-x0)*sx, Y:y=>H-PAD-(y-y0)*sy, graph:true, fr, x0,x1,y0,y1}; }
  const P=(F,p)=>[F.X(p[0]),F.Y(p[1])];
  function axes(F){ const {fr,x0,x1,y0,y1}=F; let g="";
    if(fr.grid!==false){ const st=fr.step||1; for(let x=Math.ceil(x0/st)*st;x<=x1+1e-9;x+=st) g+=`<line x1="${F.X(x)}" x2="${F.X(x)}" y1="${F.Y(y0)}" y2="${F.Y(y1)}" class="mo-grid"/>`; const sty=fr.ystep||st; for(let y=Math.ceil(y0/sty)*sty;y<=y1+1e-9;y+=sty) g+=`<line y1="${F.Y(y)}" y2="${F.Y(y)}" x1="${F.X(x0)}" x2="${F.X(x1)}" class="mo-grid"/>`; }
    const ax=Math.min(Math.max(0,x0),x1), ay=Math.min(Math.max(0,y0),y1);
    g+=`<line x1="${F.X(x0)}" x2="${F.X(x1)}" y1="${F.Y(ay)}" y2="${F.Y(ay)}" class="mo-axis" marker-end="url(#mo-ar)"/><line y1="${F.Y(y0)}" y2="${F.Y(y1)}" x1="${F.X(ax)}" x2="${F.X(ax)}" class="mo-axis" marker-end="url(#mo-ar)"/>`;
    g+=`<text x="${F.X(x1)-4}" y="${F.Y(ay)-8}" class="mo-axl" text-anchor="end">${esc(fr.xl!=null?fr.xl:"x")}</text><text x="${F.X(ax)+8}" y="${F.Y(y1)+12}" class="mo-axl">${esc(fr.yl!=null?fr.yl:"y")}</text>`;
    if(fr.ticks!==false){ const st=fr.step||1; for(let x=Math.ceil(x0/st)*st;x<=x1-1e-9;x+=st){ if(Math.abs(x)<1e-9) continue; g+=`<text x="${F.X(x)}" y="${F.Y(ay)+14}" class="mo-tick" text-anchor="middle">${+x.toFixed(2)}</text>`; } const sty=fr.ystep||st; for(let y=Math.ceil(y0/sty)*sty;y<=y1-1e-9;y+=sty){ if(Math.abs(y)<1e-9) continue; g+=`<text x="${F.X(ax)-6}" y="${F.Y(y)+4}" class="mo-tick" text-anchor="end">${+y.toFixed(2)}</text>`; } if(x0<=0&&x1>=0&&y0<=0&&y1>=0) g+=`<text x="${F.X(ax)-6}" y="${F.Y(ay)+14}" class="mo-tick" text-anchor="end">O</text>`; }
    return g; }
  function curvePath(F,f,a,b){ const n=160; let d=""; let pen=false; for(let i=0;i<=n;i++){ const x=a+(b-a)*i/n; const y=f(x); if(!isFinite(y)||y<F.y0-(F.y1-F.y0)||y>F.y1+(F.y1-F.y0)){ pen=false; continue; } d+=(pen?"L":"M")+F.X(x).toFixed(1)+" "+F.Y(y).toFixed(1); pen=true; } return d; }
  function el(F,e){ const c=col(e.c); const id=`data-id="${esc(e.id)}"`; const lab=(x,y,t,anchor)=>t?`<text x="${x}" y="${y}" class="mo-lab" text-anchor="${anchor||"start"}" fill="${c}">${esc(t)}</text>`:"";
    switch(e.k){
      case "curve":{ const f=fx(e.f); if(!f) return `<!-- bad f ${esc(e.f)} -->`; const [a,b]=e.x||[F.x0,F.x1]; const d=curvePath(F,f,a,b); const lx=e.lx!=null?e.lx:b; const ly=f(lx);
        return `<g class="mo-el" ${id} data-draw="1" ${F.clip||""}><path d="${d}" fill="none" stroke="${c}" stroke-width="${e.w||3}" ${e.dash?'stroke-dasharray="7 6"':""}/>${e.t&&isFinite(ly)?lab(F.X(lx)+6,F.Y(ly)-6,e.t):""}</g>`; }
      case "area":{ const f=fx(e.f), g=fx(e.g||"0"); if(!f||!g) return ""; const [a,b]=e.x; const n=80; let d=""; for(let i=0;i<=n;i++){ const x=a+(b-a)*i/n; d+=(i?"L":"M")+F.X(x).toFixed(1)+" "+F.Y(f(x)).toFixed(1); } for(let i=n;i>=0;i--){ const x=a+(b-a)*i/n; d+="L"+F.X(x).toFixed(1)+" "+F.Y(g(x)).toFixed(1); }
        return `<g class="mo-el" ${id} ${F.clip||""}><path d="${d}Z" fill="${c}" fill-opacity="${e.op||.22}" stroke="none"/>${e.t?lab(F.X((a+b)/2),F.Y((f((a+b)/2)+g((a+b)/2))/2)+4,e.t,"middle"):""}</g>`; }
      case "point":{ const [x,y]=P(F,e.at); return `<g class="mo-el mo-pop" ${id} style="transform-origin:${x}px ${y}px"><circle cx="${x}" cy="${y}" r="${e.r||6}" fill="${e.open?"var(--card,#fff)":c}" stroke="${c}" stroke-width="2.5"/>${lab(x+(e.dx??9),y+(e.dy??-9),e.t,e.anchor)}</g>`; }
      case "line": case "arrow":{ const [x1,y1]=P(F,e.from),[x2,y2]=P(F,e.to); return `<g class="mo-el" ${id} data-draw="1"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${e.w||2.5}" ${e.dash?'stroke-dasharray="6 5"':""} ${e.k==="arrow"?`marker-end="url(#mo-ah${PAL.indexOf(c)>=0?PAL.indexOf(c):0})"`:""}/>${lab((x1+x2)/2+(e.dx??6),(y1+y2)/2+(e.dy??-8),e.t,e.anchor)}</g>`; }
      case "vline": case "hline":{ const a=e.k==="vline"?[[e.x,F.graph?F.y0:0],[e.x,F.graph?F.y1:H]]:[[F.graph?F.x0:0,e.y],[F.graph?F.x1:W,e.y]]; return el(F,{...e,k:"line",from:a[0],to:a[1],dash:e.dash!==false}); }
      case "poly":{ const pts=e.pts.map(p=>P(F,p).join(",")).join(" "); return `<g class="mo-el" ${id} data-draw="1"><polygon points="${pts}" fill="${e.fill?c:"none"}" fill-opacity="${e.fill?(e.op||.15):0}" stroke="${c}" stroke-width="${e.w||2.5}"/>${(e.labels||[]).map((t,i)=>{ const [x,y]=P(F,e.pts[i]); return t?`<text x="${x+(e.ldx||0)}" y="${y-8}" class="mo-lab" text-anchor="middle" fill="${c}">${esc(t)}</text>`:""; }).join("")}</g>`; }
      case "circle":{ const [x,y]=P(F,e.at); const r=F.graph?Math.abs(F.X(e.at[0]+e.r)-x):e.r; return `<g class="mo-el" ${id} data-draw="1"><circle cx="${x}" cy="${y}" r="${r}" fill="${e.fill?c:"none"}" fill-opacity="${e.fill?.15:0}" stroke="${c}" stroke-width="${e.w||2.5}"/>${lab(x+r*0.72,y-r*0.72-4,e.t)}</g>`; }
      case "label":{ const [x,y]=P(F,e.at); return `<g class="mo-el mo-fade" ${id}><text x="${x}" y="${y}" class="mo-lab ${e.big?"big":""}" text-anchor="${e.anchor||"middle"}" fill="${e.c==null?"var(--ink)":c}">${esc(e.t)}</text></g>`; }
      case "box":{ const [x,y]=P(F,e.at); const w=e.w||150,h=e.h||46; const lines=String(e.t||"").split("\n"); return `<g class="mo-el mo-fade" ${id}><rect x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="10" fill="${e.fill?c:"var(--card,#fff)"}" fill-opacity="${e.fill?.14:1}" stroke="${c}" stroke-width="2"/>${lines.map((l,i)=>`<text x="${x}" y="${y+5+(i-(lines.length-1)/2)*17}" class="mo-box" text-anchor="middle">${esc(l)}</text>`).join("")}</g>`; }
      case "tex":{ const [x,y]=P(F,e.at); const w=e.w||220,h=e.h||40; return `<g class="mo-el mo-fade" ${id}><foreignObject x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}"><div xmlns="http://www.w3.org/1999/xhtml" class="mo-tex" style="color:${e.c==null?"inherit":c}">${esc(e.t)}</div></foreignObject></g>`; }
      case "bars":{ const [x0,y0]=P(F,e.at||[60,320]); const bw=e.bw||46, gap=e.gap||22, mx=Math.max(...e.data.map(Math.abs),1), hh=e.h||220; return `<g class="mo-el mo-grow" ${id}>${e.data.map((v,i)=>{ const h=hh*Math.abs(v)/mx; const x=x0+i*(bw+gap); return `<rect x="${x}" y="${y0-h}" width="${bw}" height="${h}" rx="4" fill="${col(e.cs?e.cs[i]:e.c)}" style="transform-origin:${x}px ${y0}px"/><text x="${x+bw/2}" y="${y0-h-6}" class="mo-tick" text-anchor="middle">${esc(e.vl?e.vl[i]:v)}</text><text x="${x+bw/2}" y="${y0+16}" class="mo-tick" text-anchor="middle">${esc((e.labels||[])[i]||"")}</text>`; }).join("")}<line x1="${x0-8}" x2="${x0+e.data.length*(bw+gap)}" y1="${y0}" y2="${y0}" class="mo-axis"/></g>`; }
      case "table":{ const [x0,y0]=P(F,e.at||[40,40]); const cw=e.cw||110, rh=e.rh||32; const rows=[e.head||[],...(e.rows||[])]; return `<g class="mo-el mo-rows" ${id}>${rows.map((r,i)=>`<g class="mo-row" data-row="${i}" style="--d:${i*120}ms">${r.map((t,j)=>`<rect x="${x0+j*cw}" y="${y0+i*rh}" width="${cw}" height="${rh}" fill="${i===0?"var(--line,#e5e7eb)":"var(--card,#fff)"}" stroke="var(--line,#d1d5db)"/><text x="${x0+j*cw+cw/2}" y="${y0+i*rh+rh/2+5}" class="mo-box ${i===0?"th":""}" text-anchor="middle">${esc(t)}</text>`).join("")}</g>`).join("")}</g>`; }
      case "text":{ // 문장 구조: 단어 칩을 줄 바꿈하며 배치, hi 로 칩 강조(id = 칩 id 목록은 parts[].id)
        const [x0,y0]=P(F,e.at||[30,60]); const maxW=e.width||W-60; let x=x0,y=y0; const lh=e.lh||40; return `<g class="mo-el mo-fade" ${id}>${(e.parts||[]).map(pt=>{ const t=String(pt.t); const w=Math.max(28,t.length*(/[가-힣]/.test(t)?15:8.4)+18); if(x+w>x0+maxW){ x=x0; y+=lh; } const r=`<g class="mo-chip" data-id="${esc(pt.id||"")}"><rect x="${x}" y="${y-22}" width="${w}" height="30" rx="8" fill="${pt.c!=null?col(pt.c):"var(--card,#fff)"}" fill-opacity="${pt.c!=null?.16:1}" stroke="${pt.c!=null?col(pt.c):"var(--line,#d1d5db)"}"/><text x="${x+w/2}" y="${y-2}" class="mo-box" text-anchor="middle">${esc(t)}</text></g>`; x+=w+6; return r; }).join("")}</g>`; }
      default: return "";
    } }
  let SEQ=0;
  function render(sp){ if(!sp||!sp.steps) return ""; const F=frameOf(sp); const cid="mo-clip"+(++SEQ); F.clip=F.graph?`clip-path="url(#${cid})"`:""; const defs=`<defs><marker id="mo-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--muted,#888)"/></marker>${PAL.map((c,i)=>`<marker id="mo-ah${i}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="${c}"/></marker>`).join("")}${F.graph?`<clipPath id="${cid}"><rect x="${PAD}" y="${PAD-6}" width="${W-2*PAD}" height="${H-2*PAD+6}"/></clipPath>`:""}</defs>`;
    const body=(F.graph?axes(F):"")+(sp.els||[]).map(e=>el(F,e)).join("");
    const data=esc(JSON.stringify(sp.steps.map(s=>({show:s.show||[],hi:s.hi||[],hide:s.hide||[]}))));
    return `<figure class="motion" data-steps="${data}"><figcaption>🎬 ${md(sp.title||"모션 풀이")}</figcaption><div class="mo-stage"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(sp.title||"모션 풀이")}">${defs}${body}</svg></div>
      <div class="mo-say" aria-live="polite">${sp.steps.map((s,i)=>`<div class="mo-line" data-i="${i}"><b class="mo-n">${i+1}</b><span>${md(s.say)}</span>${s.tex?`<div class="mo-eq">${esc(s.tex)}</div>`:""}</div>`).join("")}</div>
      <div class="mo-ctl"><button class="btn sm ghost mo-prev" aria-label="이전 단계">◀</button><button class="btn sm mo-play" aria-label="재생">▶ 재생</button><button class="btn sm ghost mo-next" aria-label="다음 단계">▶</button><span class="mo-dots">${sp.steps.map((_,i)=>`<i data-i="${i}"></i>`).join("")}</span><button class="btn sm ghost mo-reset">처음부터</button></div></figure>`; }
  const reduce=()=>window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  function mount(root){ (root||document).querySelectorAll("figure.motion:not([data-on])").forEach(fig=>{ fig.dataset.on="1"; const steps=JSON.parse(fig.dataset.steps||"[]"); let i=-1, timer=null;
    const els=id=>fig.querySelectorAll(`.mo-el[data-id="${CSS.escape(id)}"], .mo-chip[data-id="${CSS.escape(id)}"]`);
    // 선 그리기 준비
    fig.querySelectorAll('.mo-el[data-draw] path, .mo-el[data-draw] line, .mo-el[data-draw] polygon, .mo-el[data-draw] circle').forEach(p=>{ try{ const L=p.getTotalLength(); p.style.setProperty("--len",L); p.style.strokeDasharray=p.getAttribute("stroke-dasharray")?p.getAttribute("stroke-dasharray"):L; if(!p.getAttribute("stroke-dasharray")) p.style.strokeDashoffset=L; }catch(e){} });
    const state=k=>{ const vis=new Set(); let hi=new Set(); for(let s=0;s<=k;s++){ (steps[s].show||[]).forEach(x=>vis.add(x)); (steps[s].hide||[]).forEach(x=>vis.delete(x)); } if(k>=0) hi=new Set(steps[k].hi||[]); return {vis,hi}; };
    function go(k,animate){ k=Math.max(-1,Math.min(steps.length-1,k)); const prev=i; i=k; const {vis,hi}=state(k); const fresh=new Set(k>=0?(steps[k].show||[]):[]);
      fig.querySelectorAll(".mo-el").forEach(e=>{ const on=vis.has(e.dataset.id); e.classList.toggle("on",on); e.classList.toggle("hi",hi.has(e.dataset.id)); const draw=e.hasAttribute("data-draw");
        if(draw) e.querySelectorAll("path,line,polygon,circle").forEach(p=>{ if(p.style.strokeDashoffset===""&&!p.style.getPropertyValue("--len")) return; const L=p.style.getPropertyValue("--len"); if(!L) return; const dashed=p.getAttribute("stroke-dasharray"); if(dashed){ p.style.strokeDashoffset=0; return; } p.style.transition=(animate&&fresh.has(e.dataset.id)&&!reduce())?"stroke-dashoffset 1.1s ease":"none"; p.style.strokeDashoffset=on?0:L; }); });
      fig.querySelectorAll(".mo-chip").forEach(c=>c.classList.toggle("hi",hi.has(c.dataset.id)));
      fig.querySelectorAll(".mo-line").forEach(l=>{ const n=+l.dataset.i; l.classList.toggle("on",n===k); l.classList.toggle("past",n<k); });
      fig.querySelectorAll(".mo-dots i").forEach(d=>d.classList.toggle("on",+d.dataset.i<=k));
      const cur=fig.querySelector(`.mo-line[data-i="${k}"]`); if(cur&&animate&&prev!==k){ const box=fig.querySelector(".mo-say"); box.scrollTop=cur.offsetTop-box.offsetTop-8; }
      fig.querySelector(".mo-prev").disabled=k<=0; fig.querySelector(".mo-next").disabled=k>=steps.length-1; }
    const stop=()=>{ clearTimeout(timer); timer=null; fig.querySelector(".mo-play").textContent="▶ 재생"; };
    const dwell=k=>{ const t=(fig.querySelector(`.mo-line[data-i="${k}"]`)||{}).textContent||""; return Math.min(9000,Math.max(2600,t.length*75)); };
    const tick=()=>{ if(i>=steps.length-1){ stop(); return; } go(i+1,true); timer=setTimeout(tick,dwell(i)); };
    fig.querySelector(".mo-play").onclick=()=>{ if(timer){ stop(); return; } if(i>=steps.length-1) go(-1,false); fig.querySelector(".mo-play").textContent="⏸ 일시정지"; tick(); };
    fig.querySelector(".mo-next").onclick=()=>{ stop(); go(i+1,true); };
    fig.querySelector(".mo-prev").onclick=()=>{ stop(); go(i-1,false); };
    fig.querySelector(".mo-reset").onclick=()=>{ stop(); go(0,true); };
    fig.querySelectorAll(".mo-dots i").forEach(d=>d.onclick=()=>{ stop(); go(+d.dataset.i,true); });
    fig.querySelectorAll(".mo-line").forEach(l=>l.onclick=()=>{ stop(); go(+l.dataset.i,true); });
    fig.tabIndex=0; fig.onkeydown=ev=>{ if(ev.key==="ArrowRight"){ stop(); go(i+1,true); ev.preventDefault(); } if(ev.key==="ArrowLeft"){ stop(); go(i-1,false); ev.preventDefault(); } if(ev.key===" "){ fig.querySelector(".mo-play").click(); ev.preventDefault(); } };
    go(0,true);
    if(window.renderMathInElement) renderMathInElement(fig,{delimiters:[{left:"$$",right:"$$",display:true},{left:"$",right:"$",display:false}],throwOnError:false});
  }); }
  window.MOTION={render,mount,fx};
})();
