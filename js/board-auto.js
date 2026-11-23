/* 차시 자동 판서 — 차시의 핵심 개념·시각 자료(표·흐름·비교·분류·연표·공식·그래프·순환)·한 문장 정리를
   화이트보드 판서(js/board.js 형식, 1600×900)로 자동 변환한다. 질문 끼어들기: 오개념·출제 포인트·왜·풀이 순서.
   쓰는 곳: 과목 차시 페이지(#/sub/과목/차시) '🖊 판서로 보기'. 단계별 풀이 판서(data/lesson-motion)가 있으면 그것을 먼저 보여 준다. */
(function(){
  const BW=1600,BH=900,X0=70,XW=1460,TOP=150,BOT=860;
  const strip=t=>{ const p=window.BOARD?window.BOARD.plain:(x=>x); return p(String(t??"").replace(/\*\*|==|!!/g,"")); };
  const cw=(c,size)=>/[가-힣ㄱ-ㅎ一-鿿]/.test(c)?size*0.95:(/[A-Z0-9]/.test(c)?size*0.58:size*0.5);
  const width=(t,size)=>[...String(t)].reduce((a,c)=>a+cw(c,size),0);
  function wrap(t,size,maxW){ const out=[]; String(t).split("\n").forEach(par=>{ let line=""; for(const w of par.split(/(\s+)/)){ if(!w) continue; const cand=line+w; if(width(cand,size)>maxW&&line.trim()){ out.push(line.trim()); line=w.trimStart(); while(width(line,size)>maxW){ let k=line.length; while(k>1&&width(line.slice(0,k),size)>maxW) k--; out.push(line.slice(0,k)); line=line.slice(k); } } else line=cand; } if(line.trim()) out.push(line.trim()); }); return out; }
  const R=v=>Math.round(v);
  function fromLesson(l){ if(!l) return null; let n=0; const id=p=>p+(++n); const steps=[];
    const tt=strip(l.title); const tsz=Math.max(34,Math.min(54,Math.floor(54*XW/Math.max(1,width(tt,54))))); const title={op:"write",id:"_title",x:X0,y:34+(54-tsz)/2,text:width(tt,tsz)>XW?tt.slice(0,Math.floor(tt.length*XW/width(tt,tsz))-1)+"…":tt,size:tsz,color:"blue",underline:true};
    const clear={op:"erase",ids:[]}; let live=[]; // 제목을 뺀 현재 보드 객체
    const wipe=()=>{ const e={op:"erase",ids:live.slice()}; live=[]; return e.ids.length?[e]:[]; };
    const put=(o)=>{ live.push(o.id); return o; };
    const W=(x,y,t,size,color,anchor)=>put({op:"write",id:id("w"),x:R(x),y:R(y),text:t,size,color:color||"ink",anchor:anchor||"start"});
    const box=(x,y,w,h,color,fill)=>put({op:"rect",id:id("r"),x:R(x),y:R(y),w:R(w),h:R(h),color:color||"ink",width:4,fill:fill?color:null});
    const line=(x1,y1,x2,y2,color,arrow,dash)=>put({op:"line",id:id("l"),x1:R(x1),y1:R(y1),x2:R(x2),y2:R(y2),color:color||"gray",width:4,arrow:!!arrow,dash:!!dash});
    const block=(x,y,t,size,maxW,color,lh)=>{ const ls=wrap(strip(t),size,maxW); const ops=ls.length?[W(x,y,ls.join("\n"),size,color)]:[]; return {ops,h:ls.length*size*(lh||1.3)}; };
    // 1. 핵심 개념(넘치면 여러 장)
    const concepts=(l.concept||[]).map(strip).filter(Boolean);
    if(concepts.length){ let y=TOP, ops=[title]; let first=concepts[0]; const pushStep=(say)=>{ steps.push({title:"핵심 개념",say:say+": "+first.slice(0,80),ops}); };
      concepts.forEach((c,i)=>{ const ls=wrap(c,40,XW-60); const h=ls.length*52+18; if(y+h>BOT&&ops.length>1){ pushStep(steps.length?"핵심 개념 이어서":"핵심 개념"); ops=[...wipe()]; y=TOP; first=c; } ops.push(W(X0,y,"•",40,"red")); ops.push(W(X0+40,y,ls.join("\n"),40,"ink")); y+=h; });
      pushStep(steps.length?"핵심 개념 이어서":"핵심 개념"); }
    else steps.push({title:"",say:strip(l.title),ops:[title]});
    // 2. 시각 자료 한 장씩
    (l.visuals||[]).forEach(v=>{ const f=visOf(v.type); if(!f) return; let ops; try{ ops=f(v); }catch(e){ return; } if(!ops||!ops.length) return; const head=W(X0,TOP-12,strip(v.title||""),42,"green");
      const note=v.note?block(X0,BOT-70,v.note,28,XW,"gray"):null; const all=[...wipe(),head,...ops]; if(note&&note.h<=80) all.push(...note.ops);
      steps.push({title:strip(v.title||""),say:strip(v.title||"")+(v.note?" — "+strip(v.note).slice(0,90):""),ops:all}); });
    // 3. 한 문장 정리
    if(l.memo){ const ops=[...wipe(),W(X0,TOP+40,"한 문장 정리",44,"blue")]; const b=block(X0+20,TOP+130,l.memo,52,XW-40,"red",1.35); ops.push(...b.ops); ops.push(put({op:"path",id:id("u"),d:`M ${X0} ${R(TOP+150+b.h)} Q ${X0+700} ${R(TOP+170+b.h)} ${X0+1400} ${R(TOP+146+b.h)}`,color:"red",width:6})); steps.push({title:"한 문장 정리",say:"한 문장으로 정리하면: "+strip(l.memo),ops}); }
    return steps.length?{title:strip(l.title),steps}:null;

    // ---------- 시각 자료 종류별 판서 ----------
    function tableOps(v){ const head=v.head||[], rows=v.rows||[]; const nc=Math.max(head.length,...rows.map(r=>r.length)); if(!nc) return [];
      const lens=Array.from({length:nc},(_,j)=>Math.max(4,...[head,...rows].map(r=>width(strip(r[j]??""),30)))); const tot=lens.reduce((a,b)=>a+b,0); const ws=lens.map(x=>Math.max(150,XW*x/tot)); const sc=XW/ws.reduce((a,b)=>a+b,0); for(let j=0;j<nc;j++) ws[j]*=sc;
      let size=rows.length>6?28:32; const out=[]; let y=TOP+50;
      [head,...rows].forEach((r,i)=>{ const cells=Array.from({length:nc},(_,j)=>wrap(strip(r[j]??""),size,ws[j]-24)); const h=Math.max(1,...cells.map(c=>c.length))*size*1.25+22; if(y+h>BOT-80) return; let x=X0; cells.forEach((c,j)=>{ out.push(box(x,y,ws[j],h,i===0?"blue":"gray",i===0)); if(c.length) out.push(W(x+12,y+12,c.join("\n"),size,i===0?"blue":"ink")); x+=ws[j]; }); y+=h; }); return out; }
    function flowOps(v){ const st=v.steps||[]; if(!st.length) return []; const perRow=st.length<=5?st.length:Math.ceil(st.length/2); const rows=Math.ceil(st.length/perRow); const gap=60, bw=(XW-gap*(perRow-1))/perRow, bh=rows>1?250:300; const out=[];
      st.forEach((s,i)=>{ const r=Math.floor(i/perRow), c=i%perRow; const x=X0+c*(bw+gap), y=TOP+80+r*(bh+90); out.push(box(x,y,bw,bh,s.hi?"red":"blue",!!s.hi)); const t=wrap(strip(s.t),36,bw-24); out.push(W(x+bw/2,y+18,t.join("\n"),36,s.hi?"red":"blue","middle")); if(s.d){ const d=wrap(strip(s.d),28,bw-24).slice(0,5); out.push(W(x+bw/2,y+30+t.length*46,d.join("\n"),28,"ink","middle")); }
        if(i<st.length-1){ if(c<perRow-1) out.push(line(x+bw+6,y+bh/2,x+bw+gap-6,y+bh/2,"gray",true)); else out.push(line(x+bw/2,y+bh+8,x+bw/2,y+bh+80,"gray",true)); } }); return out; }
    function compareOps(v){ const it=v.items||[]; if(!it.length) return []; const gap=40, w=(XW-gap*(it.length-1))/it.length; const out=[]; const cols=["blue","red","green","purple"];
      it.forEach((c,i)=>{ const x=X0+i*(w+gap); out.push(box(x,TOP+60,w,80,cols[i%4],true)); out.push(W(x+w/2,TOP+76,wrap(strip(c.name),38,w-20)[0]||"",38,cols[i%4],"middle")); let y=TOP+170; (c.points||[]).forEach(pt=>{ const ls=wrap(strip(pt),30,w-40); if(y+ls.length*40>BOT-60) return; out.push(W(x+8,y,"•",30,cols[i%4])); out.push(W(x+36,y,ls.join("\n"),30,"ink")); y+=ls.length*40+14; }); }); return out; }
    function treeOps(v){ const root=v.root; if(!root) return []; const out=[]; const ch=root.children||[]; const rw=Math.min(700,width(strip(root.t),40)+80); out.push(box(BW/2-rw/2,TOP+50,rw,84,"blue",true)); out.push(W(BW/2,TOP+68,strip(root.t),40,"blue","middle"));
      const k=Math.max(1,ch.length), gap=30, w=(XW-gap*(k-1))/k; ch.forEach((c,i)=>{ const x=X0+i*(w+gap), name=typeof c==="string"?c:c.t; out.push(line(BW/2,TOP+136,x+w/2,TOP+230,"gray")); out.push(box(x,TOP+232,w,76,"green")); out.push(W(x+w/2,TOP+246,wrap(strip(name),32,w-16)[0]||"",32,"green","middle")); let y=TOP+340; (typeof c==="string"?[]:(c.children||[])).forEach(g=>{ const ls=wrap(strip(typeof g==="string"?g:g.t),28,w-30); if(y+ls.length*38>BOT-60) return; out.push(W(x+10,y,"- "+ls.join("\n  "),28,"ink")); y+=ls.length*38+10; }); }); return out; }
    function timelineOps(v){ const ev=v.events||[]; if(!ev.length) return []; const out=[]; const y0=TOP+330; out.push(line(X0,y0,X0+XW,y0,"gray",true)); const step=XW/(ev.length+0.2);
      ev.forEach((e,i)=>{ const x=X0+step*(i+0.6); out.push(put({op:"ellipse",id:id("e"),cx:R(x),cy:y0,rx:12,ry:12,color:e.hi?"red":"blue",width:5,fill:e.hi?"red":"blue"})); out.push(W(x,y0-70,strip(e.y),34,e.hi?"red":"blue","middle")); const ls=wrap(strip(e.t),28,Math.min(360,step*1.6)).slice(0,4); out.push(W(x,i%2?y0+130:y0+40,ls.join("\n"),28,"ink","middle")); if(i%2) out.push(line(x,y0+16,x,y0+120,"gray",false,true)); }); return out; }
    function formulaOps(v){ const parts=strip(v.tex).split(/ {3,}|,\s{2,}/).map(x=>x.trim()).filter(Boolean); const out=[]; let y=TOP+90; parts.forEach(pt=>{ const sz=Math.max(36,Math.min(64,Math.floor(64*(XW-40)/Math.max(1,width(pt,64))))); out.push(W(BW/2,y,pt,sz,"blue","middle")); y+=sz*1.5; }); y+=30; (v.where||[]).forEach(w=>{ out.push(W(X0+200,y,"• "+strip(w),36,"ink")); y+=54; }); return out; }
    function chartOps(v){ const xs=v.x||[], ser=v.series||[]; if(!xs.length||!ser.length) return []; const all=ser.flatMap(s=>s.data||[]).filter(isFinite); const ymin=Math.min(v.ymin??Infinity,0,...all), ymax=Math.max(...all,ymin+1); const L0=X0+120, R0=X0+XW-60, T0=TOP+60, B0=BOT-140; const X=v.kind==="bar"?(i=>L0+(R0-L0)*(i+0.5)/xs.length):(i=>L0+(R0-L0)*(xs.length===1?0.5:i/(xs.length-1))), Y=y=>B0-(B0-T0)*(y-ymin)/(ymax-ymin); const out=[line(L0,B0,R0+20,B0,"gray",true),line(L0,B0,L0,T0-20,"gray",true)]; const cols=["blue","red","green","purple"];
      if(v.xlabel) out.push(W(R0-40,B0+44,strip(v.xlabel),28,"gray","middle")); if(v.ylabel) out.push(W(L0+10,T0-50,strip(v.ylabel),28,"gray"));
      xs.forEach((t,i)=>out.push(W(X(i),B0+10,strip(t),26,"gray","middle"))); [ymin,(ymin+ymax)/2,ymax].forEach(y=>out.push(W(L0-16,Y(y)-16,String(+y.toFixed(2)),26,"gray","middle")));
      ser.forEach((s,k)=>{ const d=s.data||[]; if(v.kind==="bar"){ const bw=(R0-L0)/xs.length/(ser.length+1); d.forEach((y,i)=>{ const x=X(i)-bw*ser.length/2+k*bw; out.push(box(x,Y(y),bw*0.9,B0-Y(y),cols[k%4],true)); }); } else { out.push(put({op:"path",id:id("p"),d:d.map((y,i)=>(i?"L ":"M ")+R(X(i))+" "+R(Y(y))).join(" "),color:cols[k%4],width:6})); d.forEach((y,i)=>out.push(put({op:"ellipse",id:id("e"),cx:R(X(i)),cy:R(Y(y)),rx:8,ry:8,color:cols[k%4],width:4,fill:cols[k%4]}))); } if(ser.length>1||s.name) out.push(W(R0-300,T0+k*40,"— "+strip(s.name||""),28,cols[k%4])); }); return out; }
    function cycleOps(v){ const nd=v.nodes||[]; if(!nd.length) return []; const cx=BW/2, cy=TOP+340, rx=520, ry=250; const out=[]; if(v.center) out.push(W(cx,cy-24,strip(v.center),42,"blue","middle")); const pts=nd.map((_,i)=>{ const a=-Math.PI/2+2*Math.PI*i/nd.length; return [cx+rx*Math.cos(a),cy+ry*Math.sin(a)]; });
      nd.forEach((n,i)=>{ const [x,y]=pts[i]; const w=360,h=110; out.push(box(x-w/2,y-h/2,w,h,"green")); out.push(W(x,y-h/2+12,wrap(strip(n.t),32,w-20)[0]||"",32,"green","middle")); if(n.d) out.push(W(x,y-h/2+58,wrap(strip(n.d),24,w-20)[0]||"",24,"ink","middle")); const [x2,y2]=pts[(i+1)%nd.length]; const mx=(x+x2)/2, my=(y+y2)/2; out.push(put({op:"path",id:id("c"),d:`M ${R(x+(x2-x)*0.28)} ${R(y+(y2-y)*0.28)} Q ${R(mx+(mx-cx)*0.25)} ${R(my+(my-cy)*0.25)} ${R(x+(x2-x)*0.72)} ${R(y+(y2-y)*0.72)}`,color:"gray",width:4,arrow:true})); }); return out; }
    function visOf(t){ return {table:tableOps,flow:flowOps,compare:compareOps,tree:treeOps,timeline:timelineOps,formula:formulaOps,chart:chartOps,cycle:cycleOps}[t]; }
  }
  // 질문 끼어들기: 차시의 오개념·출제 포인트·왜·풀이 순서로 만든다(보드를 지우고 새로 쓴다)
  function asksOf(l){ const card=(q,lines,col)=>{ const ops=[{op:"erase",all:true},{op:"write",id:"_q",x:X0,y:50,text:"🙋 "+q,size:52,color:"blue"},{op:"line",id:"_qu",x1:X0,y1:130,x2:X0+XW,y2:130,color:"blue",width:4}]; let y=170; lines.forEach((t,i)=>{ const ls=wrap(strip(t),38,XW-60); if(y+ls.length*50>BOT) return; ops.push({op:"write",id:"_a"+i,x:X0+40,y,text:ls.join("\n"),size:38,color:col||"ink"}); ops.push({op:"write",id:"_b"+i,x:X0,y,text:"•",size:38,color:"red"}); y+=ls.length*50+18; }); return ops; };
    const out=[]; if((l.pitfalls||[]).length) out.push({q:"자주 하는 오개념은?",steps:[{say:"자주 하는 오개념: "+strip(l.pitfalls[0]),ops:card("자주 하는 오개념",l.pitfalls,"red")}]});
    if((l.points||[]).length) out.push({q:"시험에 이렇게 나와요?",steps:[{say:"출제 포인트: "+strip(l.points[0]),ops:card("시험에 이렇게 나온다",l.points)}]});
    if(l.why) out.push({q:"왜 그래요?",steps:[{say:strip(l.why).slice(0,160),ops:card("왜 그럴까",[l.why])}]});
    if((l.pattern||[]).length) out.push({q:"풀이 순서는?",steps:[{say:"풀이 순서: "+strip(l.pattern[0]),ops:card("풀이 순서",l.pattern,"blue")}]});
    return out; }
  window.BOARD_AUTO={fromLesson,asksOf,wrap};
})();
