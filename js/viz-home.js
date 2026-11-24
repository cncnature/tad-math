/* TAD 공부방 — 내 공부방 학습 현황 시각화 (js/viz-home.js)
   ① 학습 잔디(최근 18주, 하루 푼 문제 수 → 한 색의 진하기) ② 최근 14일 정답·오답 막대(쌓기, 축 하나)
   ③ 다가오는 시험 타임라인. 색: 정답 = 파랑, 오답 = 주황 — 색약 시뮬레이션 ΔE≥27·대비 3:1 이상 검증(밝은/어두운 화면 각각).
   글자는 잉크색, 색은 표시에만. 모든 칸·막대는 마우스를 올리면(터치하면) 값이 뜬다. */
(function(){
  const esc=t=>String(t??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const key=d=>{ const z=new Date(d.getTime()-d.getTimezoneOffset()*6e4); return z.toISOString().slice(0,10); };
  const DOW="일월화수목금토";
  const md=d=>`${d.getMonth()+1}/${d.getDate()}`;
  function counts(qlog,daily){ const c={},ok={},no={}; (qlog||[]).forEach(x=>{ const k=key(new Date(x.t)); c[k]=(c[k]||0)+1; if(x.ok) ok[k]=(ok[k]||0)+1; else no[k]=(no[k]||0)+1; }); Object.keys(daily||{}).forEach(k=>{ c[k]=(c[k]||0)+0; if(!c[k]) c[k]=1; }); return {c,ok,no}; }
  const lvl=n=>n<=0?0:n<=2?1:n<=5?2:n<=10?3:4;

  function heat(C){ const W=18, cs=13, g=3, L=28, T=18; const today=new Date(); today.setHours(0,0,0,0); const start=new Date(today); start.setDate(today.getDate()-today.getDay()-(W-1)*7);
    let cells="", months="", last=-1, lastW=-9, days=0, tot=0;
    for(let w=0;w<W;w++) for(let r=0;r<7;r++){ const d=new Date(start); d.setDate(start.getDate()+w*7+r); if(d>today) continue; const k=key(d), n=C.c[k]||0; if(n){ days++; tot+=n; }
      const x=L+w*(cs+g), y=T+r*(cs+g), isT=d.getTime()===today.getTime();
      cells+=`<rect class="vh-c l${lvl(n)}${isT?" now":""}" x="${x}" y="${y}" width="${cs}" height="${cs}" rx="3" data-tip="${md(d)}(${DOW[r]}) · ${n?n+"문제":"기록 없음"}${C.ok[k]!=null||C.no[k]!=null?` · 정답 ${C.ok[k]||0}`:""}"/>`;
      if(r===0&&d.getMonth()!==last&&w-lastW>=3){ last=d.getMonth(); lastW=w; months+=`<text x="${x}" y="11" class="vh-t">${d.getMonth()+1}월</text>`; } }
    const lab=[1,3,5].map(r=>`<text x="0" y="${T+r*(cs+g)+10}" class="vh-t">${DOW[r]}</text>`).join("");
    const vw=L+W*(cs+g), vh=T+7*(cs+g);
    const legend=`<span class="vh-leg">적음 ${[0,1,2,3,4].map(i=>`<i class="vh-sw l${i}"></i>`).join("")} 많음</span>`;
    return `<div class="card vh-card"><div class="vh-h"><h3>🌱 학습 잔디 <span class="muted small">최근 18주</span></h3><div class="vh-big"><b>${days}</b>일 · <b>${tot}</b>문제</div></div>
      <svg class="vh-svg" viewBox="0 0 ${vw} ${vh}" role="img" aria-label="최근 18주 학습 기록: ${days}일, ${tot}문제">${months}${lab}${cells}</svg>
      <div class="vh-foot">${days?`<span class="muted small">칸에 손가락이나 마우스를 올리면 그날 푼 문제 수가 보입니다.</span>`:`<span class="muted small">오늘 첫 문제를 풀면 테두리 칸이 채워집니다. 하루 10분이 18주면 잔디밭이 됩니다.</span>`}${legend}</div></div>`; }

  function bars(C){ const N=14, today=new Date(); today.setHours(0,0,0,0); const rows=[];
    for(let i=N-1;i>=0;i--){ const d=new Date(today); d.setDate(today.getDate()-i); const k=key(d); rows.push({d,ok:C.ok[k]||0,no:C.no[k]||0}); }
    const mx=Math.max(4,...rows.map(r=>r.ok+r.no)); const step=mx<=8?2:mx<=20?5:mx<=50?10:25; const top=Math.ceil(mx/step)*step;
    const W=560, H=180, L=30, R=8, T=12, B=26, pw=(W-L-R)/N, bw=Math.min(22,pw-8), Y=v=>T+(H-T-B)*(1-v/top);
    let grid=""; for(let v=0;v<=top;v+=step) grid+=`<line x1="${L}" x2="${W-R}" y1="${Y(v)}" y2="${Y(v)}" class="vh-grid"/><text x="${L-6}" y="${Y(v)+4}" text-anchor="end" class="vh-t">${v}</text>`;
    let marks=""; rows.forEach((r,i)=>{ const x=L+i*pw+(pw-bw)/2, y0=Y(0); const okH=y0-Y(r.ok), noH=y0-Y(r.no); const tip=`${md(r.d)}(${DOW[r.d.getDay()]}) · 정답 ${r.ok} · 오답 ${r.no}${r.ok+r.no?` · 정답률 ${Math.round(100*r.ok/(r.ok+r.no))}%`:""}`;
      marks+=`<g class="vh-bar" data-tip="${tip}"><rect x="${L+i*pw}" y="${T}" width="${pw}" height="${H-T-B}" fill="transparent"/>`;
      if(r.ok) marks+=`<rect x="${x}" y="${y0-okH}" width="${bw}" height="${okH}" rx="${r.no?1:4}" class="vh-ok"/>`;
      if(r.no) marks+=`<rect x="${x}" y="${y0-okH-noH-(r.ok?2:0)}" width="${bw}" height="${noH}" rx="4" class="vh-no"/>`;
      marks+=`</g>`; if(i%2===(N-1)%2) marks+=`<text x="${x+bw/2}" y="${H-8}" text-anchor="middle" class="vh-t">${md(r.d)}</text>`; });
    const ok=rows.reduce((a,r)=>a+r.ok,0), no=rows.reduce((a,r)=>a+r.no,0), acc=ok+no?Math.round(100*ok/(ok+no)):null;
    const tbl=`<details class="vh-tbl"><summary class="small">표로 보기</summary><table class="mtable small"><tr><th>날짜</th><th>정답</th><th>오답</th></tr>${rows.filter(r=>r.ok+r.no).map(r=>`<tr><td>${md(r.d)}</td><td>${r.ok}</td><td>${r.no}</td></tr>`).join("")||`<tr><td colspan="3">기록 없음</td></tr>`}</table></details>`;
    return `<div class="card vh-card"><div class="vh-h"><h3>📊 최근 14일 문제 풀이</h3><div class="vh-big">${acc!=null?`정답률 <b>${acc}%</b> · `:""}<b>${ok+no}</b>문제</div></div>
      <div class="vh-legend small"><span><i class="vh-sw ok"></i>정답 ${ok}</span><span><i class="vh-sw no"></i>오답 ${no}</span></div>
      <svg class="vh-svg vh-bars" viewBox="0 0 ${W} ${H}" role="img" aria-label="최근 14일 정답 ${ok}, 오답 ${no}">${grid}${marks}<line x1="${L}" x2="${W-R}" y1="${Y(0)}" y2="${Y(0)}" class="vh-axis"/></svg>
      ${ok+no?"":`<p class="muted small vh-empty">아직 기록이 없습니다. 차시 퀴즈나 복습 큐를 풀면 막대가 쌓입니다.</p>`}${tbl}</div>`; }

  function timeline(exams,csat){ const today=new Date(); today.setHours(0,0,0,0); const span=120; const list=(exams||[]).map(e=>({...e,dd:Math.round((new Date(e.date+"T00:00:00")-today)/864e5)})).filter(e=>e.dd>=0&&e.dd<=span).sort((a,b)=>a.dd-b.dd).slice(0,6);
    const P=d=>(100*d/span).toFixed(2);
    let ticks=""; for(let d=0;d<=span;d+=30){ const t=new Date(today); t.setDate(today.getDate()+d); ticks+=`<span class="vt-tick" style="left:${P(d)}%"><i></i><em>${d===0?"오늘":md(t)}</em></span>`; }
    const pts=list.map((e,i)=>`<span class="vt-pt ${i%2?"dn":"up"}${e.dd<=21?" hot":""}${e.dd>span*0.75?" r":e.dd<span*0.2?" l":""}" style="left:${P(e.dd)}%" data-tip="${esc(e.name)} · ${esc(e.date)} · D-${e.dd}"><i></i><b>${esc(e.name)} <span>D-${e.dd}</span></b></span>`).join("");
    const cs=csat?Math.round((new Date(csat+"T00:00:00")-today)/864e5):null;
    return `<div class="card vh-card vh-tl"><div class="vh-h"><h3>🗓 다가오는 시험 <span class="muted small">120일</span></h3>${cs!=null?`<div class="vh-big"><a href="#/csat">수능 <b>D-${cs}</b></a></div>`:""}</div>
      ${list.length?`<div class="vt" role="img" aria-label="다가오는 시험 ${esc(list.map(e=>e.name+" D-"+e.dd).join(", "))}"><div class="vt-line"></div>${ticks}${pts}</div>`:`<p class="muted small">120일 안에 등록된 시험이 없습니다. <a href="#/setup">시험일 등록</a></p>`}
      <p class="muted small">빨간 점 = 3주 이내(유형·실전 단계). <a href="#/exam-prep">범위·체크리스트 →</a></p></div>`; }

  function html(o){ const C=counts(o.qlog,o.daily); return `<div class="vh-grid2">${heat(C)}${bars(C)}</div>${timeline(o.exams,o.csat)}`; }

  // 공용 툴팁: [data-tip] 위에 올리거나 누르면 값 표시
  let tip; function show(e){ const t=e.target.closest&&e.target.closest("[data-tip]"); if(!t||!t.closest(".vh-svg,.vt")){ if(tip) tip.hidden=true; return; } if(!tip){ tip=document.createElement("div"); tip.className="vh-tip"; document.body.appendChild(tip); }
    tip.textContent=t.dataset.tip; tip.hidden=false; const p=e.touches?e.touches[0]:e; const w=tip.offsetWidth; tip.style.left=Math.max(8,Math.min(innerWidth-w-8,p.clientX-w/2))+"px"; tip.style.top=(p.clientY-44)+"px"; }
  if(typeof document!=="undefined"){ document.addEventListener("pointermove",show,{passive:true}); document.addEventListener("pointerdown",show,{passive:true}); document.addEventListener("scroll",()=>{ if(tip) tip.hidden=true; },{passive:true}); }
  window.VIZH={html};
})();
