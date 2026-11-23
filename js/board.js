/* 화이트보드 판서 튜터 — 선생님이 손글씨로 쓰고 그리고 지우며 설명하는 판서 플레이어.
   판서 지시 형식은 Whiteboard AI Tutor 프로토콜 v1(write·line·rect·ellipse·path·erase, 1600×900 보드)을 따른다.
   원작: https://github.com/molly554/whiteboard-ai-tutor (MIT License, © 2026 Whiteboard AI Tutor contributors) — 형식과 재생 방식(글자 가림막 걷기·획 그리기·펜 커서)을 참고해 다시 작성.
   TAD 추가: 한국어 음성 설명(브라우저 Web Speech), 교사의 '동그라미 강조', 학생 펜 레이어(내가 써 보기·모범 판서와 겹쳐 보기),
            미리 준비한 질문으로 끼어들기(ask), 모션 풀이(motion) 145개 → 판서 자동 변환(fromMotion).
   학습 근거: Mayer 양식 원리(그림 + 음성 설명), 신호 주기, 생성적 그리기(Fiorella & Mayer 2016), 자기 설명(Chi 1994). */
(function(){
  const BW=1600,BH=900; const S=2.5;   // 모션(640×360) → 보드(1600×900)
  const COL={ink:"#1f2a37",blue:"#2563eb",red:"#dc2626",green:"#15803d",gray:"#6b7280",purple:"#7c3aed",teal:"#0e7490",yellow:"#b45309"};
  const MCOL=["blue","red","green","yellow","purple","teal","gray"];
  const FONT="'Nanum Pen Script','Gaegu','Segoe Print',cursive";
  const NS="http://www.w3.org/2000/svg";
  const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const md=s=>esc(s).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/==(.+?)==/g,"<mark>$1</mark>");
  const mk=(tag,attrs,parent)=>{ const e=document.createElementNS(NS,tag); for(const k in attrs) if(attrs[k]!=null) e.setAttribute(k,attrs[k]); if(parent) parent.appendChild(e); return e; };
  // 판서용 수식 단순화: $…$ 안의 흔한 LaTeX 를 손글씨로 쓸 수 있는 글자로
  const SUP={"0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹","n":"ⁿ","+":"⁺","-":"⁻","(":"⁽",")":"⁾","x":"ˣ"};
  function plain(t){ let s=String(t??"").replace(/\$+([^$]*)\$+/g,(m,x)=>x);
    for(let k=0;k<3;k++) s=s.replace(/\\(?:text|mathrm|mathbf|operatorname)\{([^{}]*)\}/g,"$1");
    s=s.replace(/_\{([^{}]*)\}/g,"$1").replace(/\\(?:d|t)?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g,(m,a,b)=>{ const q=x=>/^[0-9A-Za-z가-힣.′″]+$/.test(x)?x:"("+x+")"; return q(a)+"/"+q(b); }).replace(/\\(?:d|t)?frac\s*([^\s{}\\])\s*([^\s{}\\])/g,"$1/$2")
     .replace(/\\sqrt\{([^{}]*)\}/g,"√($1)").replace(/\\sqrt\s*([^\s{}\\])/g,"√$1")
     .replace(/\^\{([^{}]*)\}/g,(m,x)=>/^[0-9n+\-()x]+$/.test(x)?[...x].map(c=>SUP[c]).join(""):"^("+x+")").replace(/\^([0-9nx])/g,(m,x)=>SUP[x])
     .replace(/_\{([^{}]*)\}/g,"$1").replace(/_([A-Za-z0-9가-힣])/g,"$1")
     .replace(/\\(times|cdot)/g,"×").replace(/\\div/g,"÷").replace(/\\(le|leq)(?![a-zA-Z])/g,"≤").replace(/\\(ge|geq)(?![a-zA-Z])/g,"≥").replace(/\\(ne|neq)(?![a-zA-Z])/g,"≠").replace(/\\(to|rightarrow|longrightarrow|arrow)(?![a-zA-Z])/g,"→").replace(/\\(Rightarrow|implies)(?![a-zA-Z])/g,"⇒").replace(/\\(Leftrightarrow|iff)(?![a-zA-Z])/g,"⇔").replace(/\\leftrightarrow(?![a-zA-Z])/g,"↔").replace(/\\infty/g,"∞").replace(/\\sim(?![a-zA-Z])/g,"~").replace(/\\approx(?![a-zA-Z])/g,"≈").replace(/\\pm(?![a-zA-Z])/g,"±")
     .replace(/\\pi/g,"π").replace(/\\theta/g,"θ").replace(/\\alpha/g,"α").replace(/\\beta/g,"β").replace(/\\sigma/g,"σ").replace(/\\mu/g,"μ").replace(/\\Delta/g,"Δ").replace(/\\lambda/g,"λ").replace(/\\omega/g,"ω").replace(/\\sum/g,"Σ").replace(/\\int/g,"∫").replace(/\\lim/g,"lim").replace(/\\circ/g,"°")
     .replace(/\\(qquad|quad)/g,"   ").replace(/\\(left|right|displaystyle|,|;|!)/g,"").replace(/[{}]/g,"").replace(/\\/g,"").replace(/[ \t]{4,}/g,"   ").trim(); return s; }

  // ---------- 모션 → 판서 변환 ----------
  function fromMotion(sp){ const M=window.MOTION; if(!M||!sp) return null; const F=M.frameOf(sp); const P=p=>[F.X(p[0])*S,F.Y(p[1])*S];
    const col=c=>typeof c==="number"?MCOL[c%MCOL.length]:"ink"; const R=v=>Math.round(v*10)/10; const ops={}; const box={};
    const bb=(id,x0,y0,x1,y1)=>{ box[id]={x:Math.min(x0,x1),y:Math.min(y0,y1),w:Math.abs(x1-x0),h:Math.abs(y1-y0)}; };
    const tw=(t,size)=>[...String(t)].reduce((a,c)=>a+(/[가-힣ㄱ-ㅎ一-鿿]/.test(c)?size*0.95:size*0.5),0);
    (sp.els||[]).forEach(e=>{ const c=col(e.c); const L=[]; const id=e.id;
      const write=(sid,x,y,t,size,anchor,color)=>{ t=plain(t); if(!t) return; L.push({op:"write",id:sid,x:R(x),y:R(y-size*0.8),text:t,size,anchor:anchor==="middle"?"middle":"start",color:color||c}); };
      switch(e.k){
        case "curve":{ const f=M.fx(e.f); if(!f) break; const [a,b]=e.x||[F.x0,F.x1]; const d=M.curvePath(F,f,a,b).replace(/-?\d+(\.\d+)?/g,v=>R(+v*S)); if(!d) break; L.push({op:"path",id,d,color:c,width:e.w?e.w*2:6,dash:!!e.dash,clip:true}); bb(id,F.X(a)*S,F.Y(F.y1)*S,F.X(b)*S,F.Y(F.y0)*S); if(e.t){ const lx=e.lx!=null?e.lx:b, ly=f(lx); if(isFinite(ly)) write(id+"_t",F.X(lx)*S+14,F.Y(ly)*S-12,e.t,34); } break; }
        case "area":{ const f=M.fx(e.f), g=M.fx(e.g||"0"); if(!f||!g) break; const [a,b]=e.x; const n=60; let d=""; for(let i=0;i<=n;i++){ const x=a+(b-a)*i/n; d+=(i?"L":"M")+R(F.X(x)*S)+" "+R(F.Y(f(x))*S); } for(let i=n;i>=0;i--){ const x=a+(b-a)*i/n; d+="L"+R(F.X(x)*S)+" "+R(F.Y(g(x))*S); } L.push({op:"path",id,d:d+"Z",color:c,width:0,fill:c,clip:true}); const xm=(a+b)/2; bb(id,F.X(a)*S,F.Y(f(xm))*S,F.X(b)*S,F.Y(g(xm))*S); if(e.t) write(id+"_t",F.X(xm)*S,F.Y((f(xm)+g(xm))/2)*S+12,e.t,34,"middle"); break; }
        case "point":{ const [x,y]=P(e.at); const r=(e.r||6)*S*0.9; L.push({op:"ellipse",id,cx:R(x),cy:R(y),rx:r,ry:r,color:c,width:5,fill:e.open?null:c}); bb(id,x-r,y-r,x+r,y+r); if(e.t) write(id+"_t",x+(e.dx??9)*S,y+(e.dy??-9)*S,e.t,34,e.anchor); break; }
        case "line": case "arrow":{ const [x1,y1]=P(e.from),[x2,y2]=P(e.to); L.push({op:"line",id,x1:R(x1),y1:R(y1),x2:R(x2),y2:R(y2),color:c,width:(e.w||2.5)*2,arrow:e.k==="arrow",dash:!!e.dash}); bb(id,x1,y1,x2,y2); if(e.t) write(id+"_t",(x1+x2)/2+(e.dx??6)*S,(y1+y2)/2+(e.dy??-8)*S,e.t,32,e.anchor); break; }
        case "vline": case "hline":{ const a=e.k==="vline"?[[e.x,F.graph?F.y0:0],[e.x,F.graph?F.y1:360]]:[[F.graph?F.x0:0,e.y],[F.graph?F.x1:640,e.y]]; const [x1,y1]=P(a[0]),[x2,y2]=P(a[1]); L.push({op:"line",id,x1:R(x1),y1:R(y1),x2:R(x2),y2:R(y2),color:c,width:4,dash:e.dash!==false}); bb(id,x1,y1,x2,y2); if(e.t) write(id+"_t",e.k==="vline"?x1+10:x2-10,e.k==="vline"?Math.min(y1,y2)+60:y1-12,e.t,32,e.k==="vline"?"start":"start"); break; }
        case "poly":{ const pts=e.pts.map(P); L.push({op:"path",id,d:"M "+pts.map(p=>R(p[0])+" "+R(p[1])).join(" L ")+" Z",color:c,width:(e.w||2.5)*2,fill:e.fill?c:null}); const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]); bb(id,Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)); (e.labels||[]).forEach((t,i)=>{ if(t) write(id+"_l"+i,pts[i][0]+(e.ldx||0)*S,pts[i][1]-18,t,34,"middle"); }); break; }
        case "circle":{ const [x,y]=P(e.at); const r=(F.graph?Math.abs(F.X(e.at[0]+e.r)-F.X(e.at[0])):e.r)*S; L.push({op:"ellipse",id,cx:R(x),cy:R(y),rx:R(r),ry:R(r),color:c,width:5,fill:e.fill?c:null}); bb(id,x-r,y-r,x+r,y+r); if(e.t) write(id+"_t",x+r*0.72,y-r*0.72-10,e.t,32); break; }
        case "label": { const [x,y]=P(e.at); const size=e.big?50:36; write(id,x,y,e.t,size,e.anchor||"middle",e.c==null?"ink":c); const w=tw(plain(e.t),size); bb(id,(e.anchor==="start"?x:x-w/2),y-size,(e.anchor==="start"?x+w:x+w/2),y+8); break; }
        case "tex": { const [x,y]=P(e.at); write(id,x,y+14,e.t,40,"middle",e.c==null?"ink":c); const w=tw(plain(e.t),40); bb(id,x-w/2,y-30,x+w/2,y+20); break; }
        case "box":{ const [x,y]=P(e.at); const w=(e.w||150)*S, h=(e.h||46)*S; L.push({op:"rect",id,x:R(x-w/2),y:R(y-h/2),w:R(w),h:R(h),color:c,width:4,fill:e.fill?c:null}); const lines=String(e.t||"").split("\n"); const size=Math.min(38,Math.max(26,h/(lines.length*1.35))); lines.forEach((ln,i)=>write(id+"_t"+i,x,y+size*0.35+(i-(lines.length-1)/2)*size*1.25,ln,size,"middle","ink")); bb(id,x-w/2,y-h/2,x+w/2,y+h/2); break; }
        case "bars":{ const [x0,y0]=P(e.at||[60,320]); const bw=(e.bw||46)*S, gap=(e.gap||22)*S, mx=Math.max(...e.data.map(Math.abs),1), hh=(e.h||220)*S; e.data.forEach((v,i)=>{ const h=hh*Math.abs(v)/mx, x=x0+i*(bw+gap); L.push({op:"rect",id:id+"_b"+i,x:R(x),y:R(y0-h),w:R(bw),h:R(h),color:col(e.cs?e.cs[i]:e.c),width:3,fill:col(e.cs?e.cs[i]:e.c)}); write(id+"_v"+i,x+bw/2,y0-h-12,e.vl?e.vl[i]:v,30,"middle","ink"); if((e.labels||[])[i]) write(id+"_x"+i,x+bw/2,y0+42,e.labels[i],30,"middle","ink"); }); L.push({op:"line",id:id+"_ax",x1:R(x0-20),y1:R(y0),x2:R(x0+e.data.length*(bw+gap)),y2:R(y0),color:"gray",width:4}); bb(id,x0-20,y0-hh-40,x0+e.data.length*(bw+gap),y0+50); break; }
        case "table":{ const [x0,y0]=P(e.at||[40,40]); const cw=(e.cw||110)*S, rh=(e.rh||32)*S; const rows=[e.head||[],...(e.rows||[])]; rows.forEach((r,i)=>r.forEach((t,j)=>{ L.push({op:"rect",id:`${id}_c${i}_${j}`,x:R(x0+j*cw),y:R(y0+i*rh),w:R(cw),h:R(rh),color:i===0?"blue":"gray",width:3,fill:i===0?"blue":null}); write(`${id}_t${i}_${j}`,x0+j*cw+cw/2,y0+i*rh+rh/2+12,t,Math.min(34,rh*0.5),"middle","ink"); })); bb(id,x0,y0,x0+cw*Math.max(...rows.map(r=>r.length)),y0+rh*rows.length); break; }
        case "text":{ const [x0,y0]=P(e.at||[30,60]); const maxW=(e.width||580)*S; let x=x0,y=y0; const lh=(e.lh||40)*S; let minx=x0,maxx=x0,maxy=y0; (e.parts||[]).forEach((pt,k)=>{ const t=plain(pt.t); const w=Math.max(60,tw(t,40)+30); if(x+w>x0+maxW){ x=x0; y+=lh; } const cid=pt.id||(id+"_p"+k); L.push({op:"write",id:cid,x:R(x+w/2),y:R(y-36),text:t,size:40,anchor:"middle",color:pt.c!=null?col(pt.c):"ink"}); box[cid]={x:x,y:y-50,w:w,h:62}; x+=w+10; maxx=Math.max(maxx,x); maxy=y; }); bb(id,minx,y0-50,maxx,maxy+16); break; }
      }
      ops[id]=L; });
    // 좌표축
    const axes=[]; if(F.graph){ const {x0,x1,y0,y1}=F; const ax=Math.min(Math.max(0,x0),x1), ay=Math.min(Math.max(0,y0),y1);
      axes.push({op:"line",id:"_ax",x1:R(F.X(x0)*S),y1:R(F.Y(ay)*S),x2:R(F.X(x1)*S),y2:R(F.Y(ay)*S),color:"gray",width:4,arrow:true},{op:"line",id:"_ay",x1:R(F.X(ax)*S),y1:R(F.Y(y0)*S),x2:R(F.X(ax)*S),y2:R(F.Y(y1)*S),color:"gray",width:4,arrow:true});
      const fr=sp.frame; const st=fr.step||1, sty=fr.ystep||st; const tk=[]; for(let x=Math.ceil(x0/st)*st;x<=x1-1e-9;x+=st){ if(Math.abs(x)<1e-9) continue; tk.push({op:"write",id:"_tx"+tk.length,x:R(F.X(x)*S),y:R(F.Y(ay)*S+8),text:String(+x.toFixed(2)),size:26,anchor:"middle",color:"gray"}); } for(let y=Math.ceil(y0/sty)*sty;y<=y1-1e-9;y+=sty){ if(Math.abs(y)<1e-9) continue; tk.push({op:"write",id:"_ty"+tk.length,x:R(F.X(ax)*S-30),y:R(F.Y(y)*S-14),text:String(+y.toFixed(2)),size:26,anchor:"middle",color:"gray"}); }
      if(fr.ticks!==false) axes.push(...tk); if(fr.xl!=="") axes.push({op:"write",id:"_xl",x:R(F.X(x1)*S-20),y:R(F.Y(ay)*S-50),text:fr.xl||"x",size:32,color:"gray"}); if(fr.yl!=="") axes.push({op:"write",id:"_yl",x:R(F.X(ax)*S+16),y:R(F.Y(y1)*S-6),text:fr.yl||"y",size:32,color:"gray"}); }
    // 단계: show → 그리기, hide → 지우기, hi → 빨간 동그라미(다음 단계에서 지움)
    let prevHi=[]; const steps=(sp.steps||[]).map((s,i)=>{ const o=[]; if(i===0) o.push(...axes);
      if(prevHi.length) o.push({op:"erase",ids:prevHi}); prevHi=[];
      (s.hide||[]).forEach(id=>{ const ids=(ops[id]||[]).map(x=>x.id); if(ids.length) o.push({op:"erase",ids}); else o.push({op:"erase",ids:[id]}); });
      (s.show||[]).forEach(id=>o.push(...(ops[id]||[])));
      (s.hi||[]).forEach((id,k)=>{ const b=box[id]; if(!b) return; const hid=`_hi${i}_${k}`; const pad=14; if(b.h<80&&b.w>40) o.push({op:"path",id:hid,d:`M ${R(b.x)} ${R(b.y+b.h+10)} Q ${R(b.x+b.w/2)} ${R(b.y+b.h+22)} ${R(b.x+b.w)} ${R(b.y+b.h+8)}`,color:"red",width:6}); else o.push({op:"ellipse",id:hid,cx:R(b.x+b.w/2),cy:R(b.y+b.h/2),rx:R(b.w/2+pad*2),ry:R(b.h/2+pad*2),color:"red",width:5,rotate:-3}); prevHi.push(hid); });
      return {title:"", say:s.say, tex:s.tex, ops:o}; });
    const P0=window.MOTION.PAD*S; return {title:sp.title, steps, clip:F.graph?{x:P0,y:P0-15,w:BW-2*P0,h:BH-2*P0+15}:null}; }

  // ---------- 플레이어 ----------
  let SEQ=0;
  function render(lesson,opt){ if(!lesson||!lesson.steps) return ""; const id="wb"+(++SEQ); opt=opt||{};
    return `<figure class="wb" id="${id}" data-lesson="${esc(JSON.stringify(lesson))}" data-ask="${esc(JSON.stringify(opt.ask||[]))}">
      <figcaption>🖊 ${md(lesson.title||"판서 수업")} <span class="muted small">— 선생님 판서</span></figcaption>
      <div class="wb-board"><svg class="wb-svg" viewBox="0 0 ${BW} ${BH}" role="img" aria-label="${esc(lesson.title||"판서")}"><defs>${Object.entries(COL).map(([k,c])=>`<marker id="${id}-ah-${k}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${c}"/></marker>`).join("")}</defs><g class="wb-layer"></g><g class="wb-pen" style="display:none"><circle r="7" fill="#1f2a37"/><rect x="2" y="-56" width="12" height="54" rx="5" transform="rotate(28)" fill="#1f2a37" opacity=".85"/></g></svg>
        <canvas class="wb-ink" width="${BW}" height="${BH}" aria-label="내 판서 칸"></canvas></div>
      <div class="wb-say" aria-live="polite"><b class="wb-n">1</b><span class="wb-text"></span><div class="wb-eq"></div></div>
      <div class="wb-ctl"><button class="btn sm wb-play">▶ 판서 시작</button><button class="btn sm ghost wb-prev" title="이전 단계">◀</button><button class="btn sm ghost wb-next" title="다음 단계">▶</button><span class="wb-chips"></span>
        <select class="wb-speed" aria-label="속도"><option value="0.7">0.7×</option><option value="1" selected>1×</option><option value="1.5">1.5×</option><option value="2">2×</option></select>
        <label class="wb-chk"><input type="checkbox" class="wb-voice"> 🔊 음성</label>
        <button class="btn sm ghost wb-mine" title="보드 위에 직접 써 보기">✏️ 내가 써 보기</button><button class="btn sm ghost wb-ask" title="준비된 질문으로 끼어들기">🙋 질문</button></div>
      <div class="wb-pad" hidden><span class="muted small">펜:</span><button class="pill wb-c on" data-c="#1f2a37">검정</button><button class="pill wb-c" data-c="#2563eb">파랑</button><button class="pill wb-c" data-c="#dc2626">빨강</button><button class="pill wb-c" data-c="erase">지우개</button><button class="pill wb-clear">모두 지우기</button><label class="wb-chk"><input type="checkbox" class="wb-ghost"> 선생님 판서 흐리게</label><span class="muted small">— 설명을 보기 전에 먼저 써 보고, 판서와 겹쳐 비교해 보세요.</span></div>
      <div class="wb-asks" hidden></div></figure>`; }

  function mount(root){ (root||document).querySelectorAll("figure.wb:not([data-on])").forEach(fig=>{ fig.dataset.on="1";
    const L=JSON.parse(fig.dataset.lesson); const ASK=JSON.parse(fig.dataset.ask||"[]"); let steps=L.steps.slice();
    const svg=fig.querySelector(".wb-svg"), layer=fig.querySelector(".wb-layer"), penG=fig.querySelector(".wb-pen"), defs=svg.querySelector("defs"); const fid=fig.id;
    let objs=new Map(), cur=-1, token=0, playing=false, speed=1, clipN=0;
    if(L.clip){ const cp=mk("clipPath",{id:fid+"-frame"},defs); mk("rect",{x:L.clip.x,y:L.clip.y,width:L.clip.w,height:L.clip.h},cp); }
    const reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
    const frame=()=>new Promise(r=>requestAnimationFrame(r));
    async function anim(ms,fn,tok,instant){ if(instant||reduce){ fn(1); return; } let el=0,last=performance.now(); fn(0); while(el<ms){ await frame(); if(tok!==token) throw 0; const n=performance.now(); el+=Math.min(100,n-last)*speed; last=n; fn(Math.min(1,el/ms)); } fn(1); }
    const pen=(x,y,c)=>{ penG.style.display=""; penG.setAttribute("transform",`translate(${x},${y})`); penG.querySelectorAll("circle,rect").forEach(e=>e.setAttribute("fill",c)); };
    const hidePen=()=>{ penG.style.display="none"; };
    function build(op,hide){ const g=mk("g",{"data-id":op.id,"clip-path":op.clip&&L.clip?`url(#${fid}-frame)`:null},layer); const c=COL[op.color]||COL.ink; const o={op,g,texts:[],strokes:[]};
      if(op.op==="write"){ const size=op.size||40; String(op.text).split("\n").forEach((ln,i)=>{ const t=mk("text",{x:op.x,y:op.y+size*0.82+i*size*1.3,"font-size":size,fill:c,"text-anchor":op.anchor==="middle"?"middle":"start","font-family":FONT,style:"white-space:pre"},g); t.textContent=ln; o.texts.push(t); });
        { const mw=Math.max(...o.texts.map(t=>t.getBBox().width)); if(mw>BW-40){ const k=(BW-40)/mw; o.texts.forEach((t,i)=>{ const sz=+t.getAttribute("font-size")*k; t.setAttribute("font-size",sz); t.setAttribute("y",op.y+sz*0.82+i*sz*1.3); }); } }  // 보드보다 넓은 글은 글자 크기를 줄인다
        { let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9; o.texts.forEach(t=>{ const q=t.getBBox(); x0=Math.min(x0,q.x); x1=Math.max(x1,q.x+q.width); y0=Math.min(y0,q.y); y1=Math.max(y1,q.y+q.height); }); const dx=x1>BW-12?BW-12-x1:(x0<12?12-x0:0), dy=y1>BH-8?BH-8-y1:(y0<8?8-y0:0); if(dx||dy) o.texts.forEach(t=>{ t.setAttribute("x",+t.getAttribute("x")+dx); t.setAttribute("y",+t.getAttribute("y")+dy); }); }  // 보드 밖으로 나가는 글자는 안쪽으로 밀어 넣는다
        o.texts.forEach(t=>{ t._bb=t.getBBox(); if(hide){ const cid=`${fid}-c${++clipN}`; const cp=mk("clipPath",{id:cid},defs); t._cp=cp; t._cr=mk("rect",{x:t._bb.x-4,y:t._bb.y-6,width:0,height:t._bb.height+12},cp); t.setAttribute("clip-path",`url(#${cid})`); } }); }
      else { let d; if(op.op==="line") d=`M ${op.x1} ${op.y1} L ${op.x2} ${op.y2}`; else if(op.op==="rect") d=`M ${op.x} ${op.y} L ${op.x+op.w} ${op.y} L ${op.x+op.w} ${op.y+op.h} L ${op.x} ${op.y+op.h} Z`;
        else if(op.op==="ellipse"){ const th=(op.rotate||0)*Math.PI/180, ax=op.rx*Math.cos(th), ay=op.rx*Math.sin(th); const sx=op.cx-ax, sy=op.cy-ay, ex=op.cx+ax, ey=op.cy+ay; d=`M ${sx} ${sy} A ${op.rx} ${op.ry} ${op.rotate||0} 0 1 ${ex} ${ey} A ${op.rx} ${op.ry} ${op.rotate||0} 0 1 ${sx} ${sy}`; } else d=op.d;
        if(op.fill){ const f=mk("path",{d,fill:COL[op.fill]||c,"fill-opacity":.16,stroke:"none"},g); if(hide) f.style.opacity=0; o.fill=f; }
        if(op.width!==0){ const p=mk("path",{d,fill:"none",stroke:c,"stroke-width":op.width||5,"stroke-linecap":"round","stroke-linejoin":"round"},g); if(op.arrow) p.setAttribute("marker-end",`url(#${fid}-ah-${op.color&&COL[op.color]?op.color:"ink"})`); if(op.arrow==="both") p.setAttribute("marker-start",`url(#${fid}-ah-${op.color&&COL[op.color]?op.color:"ink"})`);
          let len=0; try{ len=p.getTotalLength(); }catch(e){} if(op.dash){ p.setAttribute("stroke-dasharray","14 12"); if(hide) p.style.opacity=0; } else if(hide&&len){ p.setAttribute("stroke-dasharray",len+2); p.setAttribute("stroke-dashoffset",len+2); } o.strokes.push({p,len,dash:!!op.dash,c}); } }
      objs.set(op.id,o); return o; }
    async function reveal(o,tok,instant){ for(const t of o.texts){ if(!t._cr) continue; const b=t._bb; const cjk=/[가-힣一-鿿]/.test(t.textContent); await anim(Math.max(240,t.textContent.length*(cjk?95:55)),k=>{ t._cr.setAttribute("width",(b.width+10)*k); if(!instant) pen(b.x+b.width*k,b.y+b.height*0.75,t.getAttribute("fill")); },tok,instant); t.removeAttribute("clip-path"); t._cp.remove(); }
      for(const s of o.strokes){ if(!s.len) { s.p.style.opacity=1; continue; } if(s.dash){ await anim(420,k=>{ s.p.style.opacity=k; if(!instant){ const q=s.p.getPointAtLength(s.len*k); pen(q.x,q.y,s.c); } },tok,instant); } else { await anim(Math.min(2000,Math.max(240,s.len*1.5)),k=>{ s.p.setAttribute("stroke-dashoffset",(s.len+2)*(1-k)); if(!instant){ const q=s.p.getPointAtLength(s.len*k); pen(q.x,q.y,s.c); } },tok,instant); s.p.removeAttribute("stroke-dasharray"); s.p.removeAttribute("stroke-dashoffset"); } }
      if(o.fill) await anim(380,k=>{ o.fill.style.opacity=k; },tok,instant); }
    async function erase(op,tok,instant){ const ids=op.all?[...objs.keys()]:(op.ids||[]); const targets=ids.map(i=>objs.get(i)).filter(Boolean); if(!targets.length) return; await anim(320,k=>targets.forEach(o=>o.g.style.opacity=1-k),tok,instant); targets.forEach(o=>{ o.g.remove(); objs.delete(o.op.id); }); }
    async function runOp(op,tok,instant){ if(op.op==="erase") return erase(op,tok,instant); if(objs.has(op.id)){ objs.get(op.id).g.remove(); objs.delete(op.id); } const o=build(op,true); await reveal(o,tok,instant); }
    const say=fig.querySelector(".wb-text"), eq=fig.querySelector(".wb-eq"), num=fig.querySelector(".wb-n");
    function caption(i){ const s=steps[i]; num.textContent=i+1; say.innerHTML=md(s.say||""); eq.textContent=s.tex||""; if(window.renderMathInElement) renderMathInElement(fig.querySelector(".wb-say"),{delimiters:[{left:"$$",right:"$$",display:true},{left:"$",right:"$",display:false}],throwOnError:false}); chips(); }
    function chips(){ fig.querySelector(".wb-chips").innerHTML=steps.map((_,k)=>`<i class="${k<=cur?"on":""} ${k===cur?"now":""}" data-k="${k}" title="${k+1}단계"></i>`).join(""); fig.querySelectorAll(".wb-chips i").forEach(c=>c.onclick=()=>jump(+c.dataset.k)); fig.querySelector(".wb-prev").disabled=cur<=0; fig.querySelector(".wb-next").disabled=cur>=steps.length-1; }
    // 음성: 한국어 목소리로 단계 설명을 읽고, 다 읽을 때까지 다음 단계로 넘어가지 않는다
    const voiceOn=()=>fig.querySelector(".wb-voice").checked&&"speechSynthesis" in window;
    function speak(text,tok){ return new Promise(res=>{ if(!voiceOn()) return res(); try{ speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(String(text).replace(/\*\*|==|\$|\\[a-z]+/g,"").replace(/\^/g," 의 ").replace(/≤/g," 이하 ")); u.lang="ko-KR"; u.rate=Math.min(1.6,0.95*speed); const v=speechSynthesis.getVoices().find(v=>/ko/i.test(v.lang)); if(v) u.voice=v; let done=false; const fin=()=>{ if(!done){ done=true; res(); } }; u.onend=fin; u.onerror=fin; setTimeout(fin,Math.max(4000,text.length*260/speed)); speechSynthesis.speak(u); }catch(e){ res(); } }); }
    async function playStep(i,tok,instant){ cur=i; caption(i); const talk=instant?Promise.resolve():speak(steps[i].say||"",tok); for(const op of steps[i].ops||[]){ await runOp(op,tok,instant); if(tok!==token) throw 0; } hidePen(); await talk; }
    async function rebuild(upto){ const tok=++token; speechSynthesis&&speechSynthesis.cancel&&speechSynthesis.cancel(); layer.innerHTML=""; objs=new Map(); [...defs.querySelectorAll("clipPath")].filter(c=>c.id!==fid+"-frame").forEach(c=>c.remove()); for(let k=0;k<=upto;k++){ cur=k; for(const op of steps[k].ops||[]) await runOp(op,tok,true); } hidePen(); return tok; }
    async function run(from){ playing=true; btn(); let tok=++token; try{ for(let i=from;i<steps.length;i++){ await playStep(i,tok,false); if(tok!==token) return; if(i<steps.length-1) await anim(700,()=>{},tok,false); } }catch(e){ return; } playing=false; btn(); }
    function btn(){ fig.querySelector(".wb-play").textContent=playing?"⏸ 멈춤":(cur>=steps.length-1?"↺ 다시 판서":(cur<0?"▶ 판서 시작":"▶ 이어서")); }
    async function jump(k){ playing=false; token++; try{ if(k<=0){ await rebuild(-1); } else await rebuild(k-1); const tok=token; await playStep(k,tok,false); }catch(e){} btn(); }
    fig.querySelector(".wb-play").onclick=async()=>{ if(playing){ playing=false; token++; speechSynthesis&&speechSynthesis.cancel&&speechSynthesis.cancel(); hidePen(); btn(); try{ await rebuild(cur); }catch(e){} chips(); return; } if(cur>=steps.length-1){ await rebuild(-1); cur=-1; run(0); } else run(cur+1); };
    fig.querySelector(".wb-next").onclick=()=>{ if(cur<steps.length-1) jump(cur+1); };
    fig.querySelector(".wb-prev").onclick=()=>{ if(cur>0) jump(cur-1); };
    fig.querySelector(".wb-speed").onchange=e=>{ speed=+e.target.value; };
    // 끼어들기: 준비된 질문을 고르면 같은 보드에 이어서 판서(새 단계 추가)
    const askBox=fig.querySelector(".wb-asks");
    const generic=[{q:"이 단계 다시 천천히",act:"slow"},{q:"처음부터 다시",act:"restart"}];
    fig.querySelector(".wb-ask").onclick=()=>{ askBox.hidden=!askBox.hidden; askBox.innerHTML=[...ASK.map((a,k)=>`<button class="pill wb-q" data-k="${k}">🙋 ${esc(a.q)}</button>`),...generic.map(g=>`<button class="pill wb-g" data-a="${g.act}">${esc(g.q)}</button>`)].join("")+`<p class="muted small">준비된 질문을 고르면 선생님이 같은 보드에 이어서 판서합니다. 자유 질문 AI 튜터는 다음 단계에서 연결됩니다.</p>`;
      askBox.querySelectorAll(".wb-q").forEach(b=>b.onclick=async()=>{ const a=ASK[+b.dataset.k]; askBox.hidden=true; playing=false; token++; try{ await rebuild(Math.max(cur,0)); }catch(e){} const add=(a.steps||[]).map(s=>({...s,say:(s.say||"")})); const start=steps.length; steps=steps.concat(add); run(Math.max(cur+1,start)); });
      askBox.querySelectorAll(".wb-g").forEach(b=>b.onclick=async()=>{ askBox.hidden=true; if(b.dataset.a==="restart"){ speed=+fig.querySelector(".wb-speed").value; await rebuild(-1); cur=-1; run(0); } else { const old=speed; speed=0.6; await jump(Math.max(cur,0)); speed=old; } }); };
    // 학생 펜 레이어
    const cv=fig.querySelector(".wb-ink"), ctx=cv.getContext("2d"); let drawing=false, inkCol="#1f2a37";
    const pt=e=>{ const r=cv.getBoundingClientRect(); return [(e.clientX-r.left)*BW/r.width,(e.clientY-r.top)*BH/r.height]; };
    cv.onpointerdown=e=>{ if(!fig.classList.contains("mine")) return; drawing=true; cv.setPointerCapture(e.pointerId); const [x,y]=pt(e); ctx.beginPath(); ctx.moveTo(x,y); };
    cv.onpointermove=e=>{ if(!drawing) return; const [x,y]=pt(e); if(inkCol==="erase"){ ctx.save(); ctx.globalCompositeOperation="destination-out"; ctx.beginPath(); ctx.arc(x,y,26,0,7); ctx.fill(); ctx.restore(); return; } ctx.lineTo(x,y); ctx.strokeStyle=inkCol; ctx.lineWidth=6; ctx.lineCap="round"; ctx.lineJoin="round"; ctx.stroke(); };
    cv.onpointerup=cv.onpointercancel=()=>{ drawing=false; };
    fig.querySelector(".wb-mine").onclick=()=>{ const on=!fig.classList.toggle("mine")?false:true; fig.querySelector(".wb-pad").hidden=!on; fig.querySelector(".wb-mine").classList.toggle("on",on); };
    fig.querySelectorAll(".wb-c").forEach(b=>b.onclick=()=>{ inkCol=b.dataset.c; fig.querySelectorAll(".wb-c").forEach(x=>x.classList.toggle("on",x===b)); });
    fig.querySelector(".wb-clear").onclick=()=>ctx.clearRect(0,0,BW,BH);
    fig.querySelector(".wb-ghost").onchange=e=>fig.classList.toggle("ghost",e.target.checked);
    fig.tabIndex=0; fig.onkeydown=ev=>{ if(ev.target.tagName==="SELECT"||ev.target.tagName==="INPUT") return; if(ev.key==="ArrowRight"){ fig.querySelector(".wb-next").click(); ev.preventDefault(); } if(ev.key==="ArrowLeft"){ fig.querySelector(".wb-prev").click(); ev.preventDefault(); } if(ev.key===" "){ fig.querySelector(".wb-play").click(); ev.preventDefault(); } };
    // 첫 화면: 1단계 설명만 띄우고, 판서는 학생이 ▶ 를 눌렀을 때 시작(먼저 생각할 시간)
    cur=-1; num.textContent="1"; say.innerHTML=md(steps[0].say||""); eq.textContent=steps[0].tex||""; chips(); btn();
    if(document.fonts&&document.fonts.load) document.fonts.load("40px 'Nanum Pen Script'").catch(()=>{});
  }); }
  window.BOARD={render,mount,fromMotion,plain};
})();
