/* TAD 공부방 — 수능 전략 센터 (#/csat)
   대상: 2026년 중2 → 2031학년도 수능. 기준: 2028학년도 이후 통합형 수능. 데이터: data/csat/*.js (docs/CSAT-SCHEMA.md).
   학습 모델:
   - 패턴 = '신호 → 첫 수 → 절차 → 함정'. 신호를 알아보는 능력을 기르는 것이 목표다(전문가-초보자 차이: Chi, Feltovich & Glaser 1981).
   - 인출 연습(Roediger & Karpicke 2006): 해설을 읽기 전에 동형 문제를 먼저 푼다.
   - 간격 반복(Cepeda et al. 2006): 맞히면 1·3·7·14·30일 뒤 다시, 틀리면 다음 날.
   - 섞어 풀기(Rohrer & Taylor 2007): 갈래를 섞어 '어떤 패턴인지 고르는 힘'을 기른다.
   - 확신도 보정(Koriat 2012): 답하기 전에 확신·애매·찍음을 고르고, 확신했는데 틀린 패턴을 우선 복습한다.
   - 추천 점수 = 중요도 × 신유형 가중 × 복습 시점 × (1 − 숙련도) × 학년 준비도. */
window.CSAT_INIT=function(A){
  const {D,store,render,esc,md,typeset,dayDiff,todayKey,profile,setup,earnTok,logQ}=A;
  const C=D.csat||{areas:[],stages:[],policy:[],trends:[],target:{}};
  const P=(D.csatPatterns||[]).slice(); const T=D.csatTree||{};
  const MO=D.csatMotion||{}; P.forEach(p=>{ if(!p.motion&&MO[p.id]) p.motion=MO[p.id]; }); (D.csatHard||[]).forEach(h=>{ if(!h.motion&&MO[h.id]) h.motion=MO[h.id]; });
  const byId=Object.fromEntries(P.map(p=>[p.id,p])); const H=(D.csatHard||[]).slice(); const hById=Object.fromEntries(H.map(h=>[h.id,h])); const hardOf=pid=>H.filter(h=>h.pattern===pid);
  const EBSI="https://www.ebsi.co.kr/";
  const AREA=Object.fromEntries((C.areas||[]).map(a=>[a.id,a]));
  const ORDER=["m2","m3","h1","h2","h3"]; const STAGE_NAME={m2:"중2",m3:"중3",h1:"고1",h2:"고2",h3:"고3"};
  const GAPS=[1,3,7,14,30]; const DAY=864e5;
  const M=s=>md(String(s==null?"":s));

  // ---------- 학습 기록 ----------
  const get=()=>store.get("csat",{p:{}}); const put=v=>store.set("csat",v);
  function rec(id){ return get().p[id]||null; }
  function level(id){ const r=rec(id); return r?Math.min(r.streak||0,GAPS.length):0; }        // 0~5
  function mastery(id){ return Math.round(100*level(id)/GAPS.length); }
  function due(id){ const r=rec(id); return !!(r&&r.next<=Date.now()&&level(id)<GAPS.length); }
  function answer(id,ok,conf){ const S=get(); const r=S.p[id]||{n:0,ok:0,streak:0,ill:0}; r.n++; if(ok){ r.ok++; r.streak=(r.streak||0)+1; } else { r.streak=0; if(conf==="sure") r.ill=(r.ill||0)+1; }
    const gap=ok?GAPS[Math.min(r.streak,GAPS.length)-1]:1; r.next=Date.now()+gap*DAY; r.last=Date.now(); r.conf=conf; S.p[id]=r; put(S);
    logQ("csat:"+id,0,ok,conf==="sure"?2:conf==="maybe"?1:0); if(ok) earnTok(conf==="sure"?3:2,"수능 패턴"); return r; }

  // ---------- 학년 단계 ----------
  function stageNow(){ const p=profile()||{}; const b=window.ROOM&&window.ROOM.bandOf?window.ROOM.bandOf(p.grade):"m2"; const id=b==="m1"?"m2":b; return ORDER.includes(id)?id:"m2"; }
  const ready=p=>ORDER.indexOf(p.start||"m2")<=ORDER.indexOf(stageNow());

  // ---------- 추천 ----------
  function score(p){ const lv=level(p.id); const r=rec(p.id); let s=(p.weight||1)*(p.status==="신유형"?1.25:p.status==="강화"?1.1:1);
    s*=r?(due(p.id)?2.2:0.4):1.3; s*=1-lv/(GAPS.length+1); if(r&&r.ill) s*=1+0.3*Math.min(r.ill,3); s*=ready(p)?1:0.3; return s; }
  function recommend(n,area){ const pool=P.filter(p=>!area||p.area===area).map(p=>({p,s:score(p)})).sort((a,b)=>b.s-a.s); const out=[],used={};
    for(const x of pool){ if(out.length>=n) break; if(!area&&used[x.p.area]) continue; used[x.p.area]=1; out.push(x.p); }
    for(const x of pool){ if(out.length>=n) break; if(!out.includes(x.p)) out.push(x.p); } return out; }

  // ---------- 공통 조각 ----------
  const bar=(v,col)=>`<div class="cbar"><i style="width:${Math.max(0,Math.min(100,v))}%;${col?`background:${col}`:""}"></i></div>`;
  const stars=w=>"★".repeat(w||1)+"☆".repeat(3-(w||1));
  const stTag=s=>`<span class="tag ${s==="신유형"?"warn":s==="강화"?"ok":s==="축소"?"muted":""}">${esc(s||"계속")}</span>`;
  const lvTag=id=>{ const lv=level(id); const r=rec(id); return !r?`<span class="tag">새 패턴</span>`:due(id)?`<span class="tag warn">복습할 때</span>`:lv>=GAPS.length?`<span class="tag ok">완성</span>`:`<span class="tag">숙련 ${lv}/${GAPS.length}</span>`; };
  const areaPct=a=>{ const ls=P.filter(p=>p.area===a); return ls.length?Math.round(ls.reduce((s,p)=>s+mastery(p.id),0)/ls.length):0; };
  const nav=cur=>`<div class="pill-row noprint">${[["","🎯 대시보드"],["tree","🌳 출제 트리"],["hard","🔥 고난도 해부"],["roadmap","🗺 학년별 프로그램"],["drill","🔀 섞어 풀기"],["trend","📈 경향·제도 변화"]].map(([k,t])=>`<a class="pill ${cur===k?"on":""}" href="#/csat${k?"/"+k:""}">${t}</a>`).join("")}</div>`;
  const card=p=>{ const a=AREA[p.area]||{}; return `<a class="card link csat-p ${ready(p)?"":"later"}" href="#/csat/p/${p.id}" style="--c:${a.col||"#888"}"><div class="row" style="justify-content:space-between;gap:6px"><span class="muted small">${a.icon||""} ${esc(a.name||p.area)} · ${esc((T[p.area]||[]).find(t=>t.id===p.strand)?.name||"")}</span><span class="small" title="중요도">${stars(p.weight)}</span></div><h3>${esc(p.name)}</h3><p class="muted small">${esc(p.slot||"")}</p><div class="row" style="gap:4px;flex-wrap:wrap">${stTag(p.status)}${lvTag(p.id)}${ready(p)?"":`<span class="tag">${STAGE_NAME[p.start]}부터</span>`}${(p.refs||[]).length?`<span class="tag">기출 ${p.refs.length}</span>`:""}${hardOf(p.id).length?`<span class="tag warn">🔥 ${hardOf(p.id).length}</span>`:""}</div>${(p.key||[])[0]?`<p class="small" style="margin:6px 0 0">🔑 ${M(p.key[0])}</p>`:""}${bar(mastery(p.id),a.col)}</a>`; };
  const srcHtml=src=>(src||[]).length?`<p class="muted small">출처: ${src.map(s=>Array.isArray(s)?`<a href="${esc(s[1])}" target="_blank" rel="noopener">${esc(s[0])}</a>`:esc(s)).join(" · ")}</p>`:"";

  // ---------- 작은 문제 블록(추가 연습·연습 사다리) ----------
  function mini(q,key,label){ return `<div class="card mini" data-k="${esc(key)}">${label?`<div class="eyebrow">${esc(label)}</div>`:""}<div class="q">${M(q.q)}</div>${q.opts?`<div class="opts">${q.opts.map((o,j)=>`<button data-j="${j}">${"①②③④⑤"[j]} ${M(o)}</button>`).join("")}</div>`:`<div class="row"><input class="sa" placeholder="답 입력" style="max-width:200px"><button class="btn sm sab">제출</button></div>`}<div class="fb"></div></div>`; }
  function bindMini(list){ document.querySelectorAll(".mini").forEach((el,i)=>{ const q=list[i]; if(!q) return; let done=false; const fin=ok=>{ done=true; logQ("csatx:"+el.dataset.k,0,ok); if(ok) earnTok(1,"수능 연습"); el.querySelector(".fb").innerHTML=`<div class="box ${ok?"ok":"warn"}"><b>${ok?"정답":"오답"}</b> · 정답 ${q.opts?"①②③④⑤"[q.a]:M(q.ans)}<br>${M(q.exp)}</div>`; typeset(); };
    el.querySelectorAll(".opts button").forEach(b=>b.onclick=()=>{ if(done) return; const j=+b.dataset.j; el.querySelectorAll(".opts button").forEach(x=>{ const k=+x.dataset.j; if(k===q.a) x.classList.add("ok"); else if(k===j) x.classList.add("bad"); }); fin(j===q.a); });
    const sb=el.querySelector(".sab"); if(sb) sb.onclick=()=>{ if(done) return; const v=el.querySelector(".sa").value.replace(/\s/g,""); fin(v!==""&&v===String(q.ans).replace(/\$|\s/g,"")); }; }); }
  const refsHtml=rs=>(rs||[]).length?`<table class="tbl"><thead><tr><th>시험</th><th>번호</th><th>유형</th><th>보도된 정보</th></tr></thead><tbody>${rs.map(r=>`<tr><td>${esc(r.exam)}</td><td>${esc(r.no)}번</td><td>${esc(r.type)}</td><td class="small">${esc(r.note||"")}${r.src?` <a href="${esc(r.src[1])}" target="_blank" rel="noopener">출처</a>`:""}</td></tr>`).join("")}</tbody></table><p class="muted small">원본 문제는 저작권 때문에 싣지 않습니다. <a href="${EBSI}" target="_blank" rel="noopener">EBSi 기출문제</a>에서 시험·번호로 찾아 직접 풀어 보세요.</p>`:`<p class="muted small">확인된 기출 번호가 아직 없습니다(새 유형이거나 조사 중). 주간 자동 조사가 채웁니다.</p>`;

  // ---------- 1. 대시보드 ----------
  function dash(){ if(!profile()) return setup(); const t=C.target||{}; const dd=t.examDate?dayDiff(t.examDate):null; const st=stageNow(); const S=(C.stages||[]).find(x=>x.id===st)||{};
    const mission=recommend(3); const dueN=P.filter(p=>due(p.id)).length; const done=P.filter(p=>level(p.id)>=GAPS.length).length; const ill=P.filter(p=>(rec(p.id)||{}).ill).length;
    const pol=(C.policy||[]).slice(0,3); const tr=(C.trends||[])[0];
    render(`<div class="lhead"><div class="eyebrow">수능 전략 센터 · 2028 통합형 수능 기준 · 갱신 ${esc(C.updated||"")}</div><h1>🎯 ${t.examYear||2031}학년도 수능까지 D-${dd!=null?dd:"?"}</h1><p class="lead">지금은 <b>${esc(S.name||STAGE_NAME[st])}</b> 단계. ${esc(S.focus||"")}</p><p class="muted small">${esc(t.note||"")}</p></div>
    ${nav("")}
    <div class="stats"><div><b>${P.length}</b>출제 패턴</div><div><b>${done}</b>완성</div><div><b>${dueN}</b>오늘 복습</div><div><b>${ill}</b>확신했는데 틀림</div><div><b>${Object.keys(get().p).length}</b>시작한 패턴</div></div>
    <h2>✅ 오늘의 수능 미션 <span class="muted" style="font-weight:400;font-size:.9rem">— 중요도·복습 시점·숙련도·학년 준비도로 고른 3개</span></h2><div class="grid">${mission.map(card).join("")||'<p class="muted">패턴 데이터를 불러오지 못했습니다.</p>'}</div>
    <h2>📊 영역별 숙련도</h2><div class="grid">${(C.areas||[]).map(a=>{ const n=P.filter(p=>p.area===a.id).length; return `<a class="card link" href="#/csat/tree?a=${a.id}" style="--c:${a.col}"><div class="row" style="justify-content:space-between"><h3>${a.icon} ${esc(a.name)}</h3><b>${areaPct(a.id)}%</b></div>${bar(areaPct(a.id),a.col)}<p class="muted small">${a.items}문항 · ${a.minutes}분 · ${esc(a.grading)}<br>${esc(a.scope.join(" · "))} · 패턴 ${n}개</p></a>`; }).join("")}</div>
    <h2>🧾 2031 수능 체계 (2028 통합형)</h2><div class="card"><table class="tbl"><thead><tr><th>영역</th><th>출제 범위</th><th>문항·시간</th><th>성적</th><th>달라진 점</th></tr></thead><tbody>${(C.areas||[]).map(a=>`<tr><td>${a.icon} ${esc(a.name)}</td><td>${esc(a.scope.join(", "))}</td><td>${a.items}문항 · ${a.minutes}분</td><td>${esc(a.grading)}</td><td class="small">${esc(a.note)}</td></tr>`).join("")}</tbody></table>${srcHtml(((C.policy||[]).find(x=>/점수 체제/.test(x.title))||{}).src?[(C.policy||[]).find(x=>/점수 체제/.test(x.title)).src]:[])}</div>
    <div class="grid wide"><div class="card"><h3>🗺 지금 단계 할 일 · ${esc(S.name||"")}</h3><ul class="bul small">${Object.entries(S.tasks||{}).flatMap(([a,ts])=>ts.map(x=>`<li>${(AREA[a]||{}).icon||""} <a href="${x.h}">${esc(x.t)}</a></li>`)).join("")}</ul><a class="btn sm" href="#/csat/roadmap">중2~고3 전체 프로그램 →</a></div>
      <div class="card"><h3>📡 제도 변화 감시</h3><ul class="bul small">${pol.map(x=>`<li><span class="tag ${x.status==="확정"?"ok":x.status==="논의"?"warn":""}">${esc(x.status)}</span> <b>${esc(x.date)}</b> ${esc(x.title)}</li>`).join("")}</ul><a class="btn sm ghost" href="#/csat/trend">경향·제도 전체 →</a></div>
      <div class="card"><h3>🔥 고난도 해부 ${H.length}문항</h3><p class="small">킬러 시기(~2023학년도)와 준킬러 시기(2024학년도~)의 변별 문항을 원문 없이 해부: 왜 어려웠나 → 필요한 무기 → 풀이 설계 → 3단계 연습.</p><a class="btn sm" href="#/csat/hard">고난도 해부 →</a></div>
      ${tr?`<div class="card"><h3>📈 최근 수능 · ${esc(tr.year)}</h3><p class="small">${esc(tr.summary)}</p><a class="btn sm ghost" href="#/csat/trend">고난도 문항 유형 보기 →</a></div>`:""}</div>
    <div class="box"><b>학습 설계 근거</b> — 패턴의 '신호'를 알아보는 힘이 전문가와 초보자의 차이입니다(Chi 외 1981). 해설보다 문제를 먼저(인출 연습, Roediger·Karpicke 2006), 1·3·7·14·30일 간격 복습(Cepeda 외 2006), 갈래를 섞어 풀기(Rohrer·Taylor 2007), 답하기 전 확신도 표시(Koriat 2012). 수학 2015 개정 기출 도감은 <a href="#/patterns">수능 패턴 도감</a>에 그대로 있습니다.</div>`); }

  // ---------- 2. 출제 트리 ----------
  function tree(qs){ if(!profile()) return setup(); const pr=new URLSearchParams(qs||""); const a=pr.get("a")||((C.areas||[])[0]||{}).id; const ar=AREA[a]||{}; const strands=T[a]||[]; const only=pr.get("f");
    render(`<div class="lhead"><div class="eyebrow">수능 전략 센터 › 출제 트리</div><h1>🌳 ${ar.icon||""} ${esc(ar.name||a)} 출제 트리</h1><p class="lead">${esc((ar.scope||[]).join(" · "))} → 출제 갈래 → 패턴. ★ 중요도, 색 막대는 내 숙련도. 흐린 카드는 아직 배우기 전 학년의 패턴입니다(미리 봐도 됩니다).</p></div>${nav("tree")}
    <div class="pill-row">${(C.areas||[]).map(x=>`<a class="pill ${x.id===a?"on":""}" href="#/csat/tree?a=${x.id}">${x.icon} ${esc(x.name)} <span class="muted">${P.filter(p=>p.area===x.id).length}</span></a>`).join("")}</div>
    <div class="pill-row"><span class="muted small">보기:</span> <a class="pill ${!only?"on":""}" href="#/csat/tree?a=${a}">전체</a><a class="pill ${only==="new"?"on":""}" href="#/csat/tree?a=${a}&f=new">신유형만</a><a class="pill ${only==="due"?"on":""}" href="#/csat/tree?a=${a}&f=due">복습할 때</a><a class="pill ${only==="ready"?"on":""}" href="#/csat/tree?a=${a}&f=ready">지금 학년</a><a class="btn sm" href="#/csat/drill?a=${a}">이 영역 섞어 풀기 →</a></div>
    ${strands.map(s=>{ let ls=P.filter(p=>p.area===a&&p.strand===s.id); if(only==="new") ls=ls.filter(p=>p.status==="신유형"); if(only==="due") ls=ls.filter(p=>due(p.id)); if(only==="ready") ls=ls.filter(ready); if(!ls.length&&only) return ""; const pct=ls.length?Math.round(ls.reduce((x,p)=>x+mastery(p.id),0)/ls.length):0;
      return `<details class="card csat-strand" open><summary><b>${esc(s.name)}</b> <span class="muted small">${esc(s.subject||"")} · 패턴 ${ls.length} · 숙련 ${pct}%</span></summary><p class="muted small">${esc(s.desc||"")}</p><div class="grid">${ls.map(card).join("")||'<p class="muted small">이 갈래의 패턴은 주간 자동 조사가 채웁니다.</p>'}</div></details>`; }).join("")||'<p class="muted">이 영역의 출제 트리를 준비 중입니다.</p>'}`); }

  // ---------- 3. 패턴 페이지 ----------
  function pattern(id){ if(!profile()) return setup(); const p=byId[id]; if(!p) return A.notFound(); const a=AREA[p.area]||{}; const st=stageNow(); const sib=P.filter(x=>x.strand===p.strand); const i=sib.indexOf(p); const r=rec(id);
    const sn=(T[p.area]||[]).find(t=>t.id===p.strand)||{};
    render(`<div class="lhead"><div class="eyebrow"><a href="#/csat">수능 전략</a> › <a href="#/csat/tree?a=${p.area}">${a.icon||""} ${esc(a.name||"")}</a> › ${esc(sn.name||"")}</div><h1>${esc(p.name)}</h1><p class="lead">${esc(p.slot||"")} · 중요도 ${stars(p.weight)} · ${stTag(p.status)} ${lvTag(id)}</p><p class="muted small">${(p.years||[]).length?`대표 출제: ${esc(p.years.map(y=>y==="예시"?"2028 예시문항":y+"학년도").join(", "))}`:""}${r?` · 푼 횟수 ${r.n} · 정답 ${r.ok}`:""}</p></div>${nav("")}
    ${(p.key||[]).length?`<div class="card csat-key"><h3>🔑 키포인트 — 이것만 기억하세요</h3><ol>${p.key.map(x=>`<li>${M(x)}</li>`).join("")}</ol></div>`:""}
    <div class="grid wide"><div class="card"><h3>🔎 이런 신호가 보이면</h3><ul class="bul">${(p.signal||[]).map(x=>`<li>${M(x)}</li>`).join("")}</ul></div><div class="card"><h3>👉 첫 수</h3><p>${M(p.first)}</p></div></div>
    ${p.motion&&window.MOTION?`<h2>🎬 모션으로 이해하기 <span class="muted" style="font-weight:400;font-size:.9rem">— ▶ 재생, 단계 클릭, ←→ 키</span></h2>${window.MOTION.render(p.motion)}`:""}
    <h2>✍️ 먼저 풀어 보기 <span class="muted" style="font-weight:400;font-size:.9rem">— 해설은 답한 뒤에 열립니다</span></h2>
    <div class="card" id="cq"><div class="q">${M(p.q)}</div>
      <div class="row noprint" style="margin:8px 0;gap:6px"><span class="muted small">답하기 전에 확신도:</span>${[["sure","확신"],["maybe","애매"],["guess","찍음"]].map(([k,t])=>`<button class="pill cf" data-c="${k}">${t}</button>`).join("")}</div>
      ${p.opts?`<div class="opts">${p.opts.map((o,j)=>`<button class="opt" data-j="${j}" disabled>${"①②③④⑤"[j]} ${M(o)}</button>`).join("")}</div>`:`<div class="row"><input id="sa" placeholder="답 입력" disabled style="max-width:220px"><button class="btn sm" id="sab" disabled>제출</button></div>`}
      <div id="fb"></div></div>
    <details class="card" id="sol"><summary><b>🧭 풀이 절차 · 함정</b> <span class="muted small">(먼저 풀고 열기)</span></summary><ol>${(p.steps||[]).map(x=>`<li>${M(x)}</li>`).join("")}</ol><div class="box warn"><b>함정</b> — ${M(p.trap)}</div></details>
    ${(p.apply||[]).length?`<h2>🔁 응용 — 이렇게 바뀌어 나오면</h2><div class="card"><table class="tbl"><thead><tr><th>변형</th><th>대응</th></tr></thead><tbody>${p.apply.map(x=>`<tr><td>${M(x.v)}</td><td>${M(x.how)}</td></tr>`).join("")}</tbody></table></div>`:""}
    <h2>📚 기출 근거 <span class="muted" style="font-weight:400;font-size:.9rem">— 몇 년도 무슨 시험 몇 번에 나왔나</span></h2><div class="card">${refsHtml(p.refs)}</div>
    ${hardOf(p.id).length?`<h2>🔥 이 패턴의 고난도 기출</h2><div class="grid">${hardOf(p.id).map(hcard).join("")}</div>`:""}
    ${(p.more||[]).length?`<h2>✍️ 추가 연습 <span class="muted" style="font-weight:400;font-size:.9rem">— 숫자·소재를 바꾼 변형</span></h2>${p.more.map((q,k)=>mini(q,p.id+"#m"+k,"변형 "+(k+1))).join("")}`:""}
    <h2>🗺 학년별 준비</h2><div class="card"><table class="tbl"><tbody>${ORDER.filter(k=>(p.prep||{})[k]).map(k=>`<tr class="${k===st?"hl":""}"><td><b>${STAGE_NAME[k]}</b>${k===st?" ← 지금":""}</td><td>${M(p.prep[k])}</td></tr>`).join("")||`<tr><td class="muted">준비 단계 정보 없음</td></tr>`}</tbody></table></div>
    ${(p.links||[]).length?`<h2>🔗 이 사이트에서 연습</h2><div class="pill-row">${p.links.map(l=>`<a class="pill" href="${esc(l.h)}">${esc(l.t)}</a>`).join("")}</div>`:""}
    ${srcHtml(p.src)}
    <div class="row" style="margin-top:12px">${sib[i-1]?`<a class="btn ghost" href="#/csat/p/${sib[i-1].id}">← ${esc(sib[i-1].name)}</a>`:""}${sib[i+1]?`<a class="btn" href="#/csat/p/${sib[i+1].id}">${esc(sib[i+1].name)} →</a>`:`<a class="btn" href="#/csat/drill?a=${p.area}">이 영역 섞어 풀기 →</a>`}</div>`);
    bindQ(p,()=>{}); bindMini(p.more||[]); if(window.MOTION) window.MOTION.mount(); }
  // 확신도 → 답 → 채점 → 기록. onDone(ok) 콜백.
  function bindQ(p,onDone){ const root=document.getElementById("cq"); if(!root) return; let conf=null; let doneQ=false;
    root.querySelectorAll(".cf").forEach(b=>b.onclick=()=>{ if(doneQ) return; conf=b.dataset.c; root.querySelectorAll(".cf").forEach(x=>x.classList.toggle("on",x===b)); root.querySelectorAll(".opt,#sa,#sab").forEach(x=>x.disabled=false); });
    const finish=ok=>{ doneQ=true; answer(p.id,ok,conf); const fb=root.querySelector("#fb"); fb.innerHTML=`<div class="box ${ok?"ok":"warn"}"><b>${ok?"정답":"오답"}${!ok&&conf==="sure"?" — 확신했는데 틀렸습니다. 이 패턴을 내일 다시 냅니다.":""}</b>${p.opts?` · 정답 ${"①②③④⑤"[p.a]}`:` · 정답 ${M(p.ans)}`}<br>${M(p.exp)}</div>`; const sol=document.getElementById("sol"); if(sol) sol.open=true; typeset(); onDone(ok); };
    root.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{ if(doneQ||!conf) return; const j=+b.dataset.j; root.querySelectorAll(".opt").forEach(x=>{ x.disabled=true; const k=+x.dataset.j; if(k===p.a) x.classList.add("ok"); else if(k===j) x.classList.add("bad"); }); finish(j===p.a); });
    const sab=root.querySelector("#sab"); if(sab) sab.onclick=()=>{ if(doneQ||!conf) return; const v=root.querySelector("#sa").value.replace(/\s/g,""); const ans=String(p.ans).replace(/\$|\s/g,""); finish(v!==""&&v===ans); };
    typeset(); }

  // ---------- 고난도 해부 ----------
  const hcard=h=>{ const a=AREA[h.area]||{}; return `<a class="card link csat-p" href="#/csat/hard/${h.id}" style="--c:${a.col||"#888"}"><div class="row" style="justify-content:space-between"><span class="muted small">${a.icon||""} ${esc(a.name||"")} · ${esc(h.exam)} ${esc(h.no)}번</span><span class="tag ${h.era==="킬러"?"warn":""}">${esc(h.era)}</span></div><h3>${esc(h.title)}</h3><p class="muted small">${esc(h.stats||"")}</p></a>`; };
  function hardList(qs){ if(!profile()) return setup(); const pr=new URLSearchParams(qs||""); const a=pr.get("a")||""; const era=pr.get("e")||""; const ls=H.filter(h=>(!a||h.area===a)&&(!era||h.era===era));
    render(`<div class="lhead"><div class="eyebrow">수능 전략 센터 › 고난도 해부</div><h1>🔥 고난도 해부 ${H.length}문항</h1><p class="lead">2024학년도 수능부터 킬러 문항 배제 방침이 적용되면서 변별은 '아주 어려운 한두 문항'에서 '중상 난도 여러 문항 · 계산량 · 새 조건 해석'으로 옮겨 갔습니다. 과거 킬러의 사고 구조는 지금 준킬러 안에 쪼개져 들어 있으므로 두 시기를 함께 봅니다. 원문은 싣지 않고 구조와 풀이 설계만 해부합니다.</p></div>${nav("hard")}
    <div class="pill-row">${[["","전 영역"],...(C.areas||[]).map(x=>[x.id,x.icon+" "+x.name])].map(([k,t])=>`<a class="pill ${k===a?"on":""}" href="#/csat/hard?a=${k}${era?"&e="+era:""}">${t} <span class="muted">${H.filter(h=>!k||h.area===k).length}</span></a>`).join("")}</div>
    <div class="pill-row">${[["","전체"],["킬러","킬러 시기(~2023)"],["준킬러","준킬러 시기(2024~)"]].map(([k,t])=>`<a class="pill ${k===era?"on":""}" href="#/csat/hard?${a?"a="+a+"&":""}e=${k}">${t}</a>`).join("")}</div>
    <div class="grid">${ls.map(hcard).join("")||'<p class="muted">해당 문항이 아직 없습니다.</p>'}</div>`); }
  function hard(id){ if(!profile()) return setup(); const h=hById[id]; if(!h) return A.notFound(); const a=AREA[h.area]||{}; const p=byId[h.pattern]; const st=stageNow(); const openReal=ORDER.indexOf(st)>=ORDER.indexOf(h.open||"h2");
    render(`<div class="lhead"><div class="eyebrow"><a href="#/csat">수능 전략</a> › <a href="#/csat/hard?a=${h.area}">🔥 고난도 해부</a> › ${a.icon||""} ${esc(a.name||"")}</div><h1>${esc(h.exam)} ${esc(h.no)}번 · ${esc(h.title)}</h1><p class="lead"><span class="tag ${h.era==="킬러"?"warn":""}">${esc(h.era)}</span> ${esc(h.stats||"")}</p>${p?`<p class="muted small">연결 패턴: <a href="#/csat/p/${p.id}">${esc(p.name)}</a></p>`:""}</div>${nav("hard")}
    <div class="grid wide"><div class="card"><h3>🧱 왜 어려웠나</h3><ul class="bul">${(h.why||[]).map(x=>`<li>${M(x)}</li>`).join("")}</ul></div><div class="card"><h3>🧰 필요한 무기</h3><ul class="bul">${(h.tools||[]).map(x=>`<li>${x.h?`<a href="${esc(x.h)}">${M(x.t)}</a>`:M(x.t)}</li>`).join("")}</ul></div></div>
    ${p&&(p.key||[]).length?`<div class="card csat-key"><h3>🔑 키포인트</h3><ol>${p.key.map(x=>`<li>${M(x)}</li>`).join("")}</ol></div>`:""}
    <h2>🧭 풀이 설계</h2><div class="card"><ol class="csat-plan">${(h.plan||[]).map(x=>`<li>${M(x)}</li>`).join("")}</ol><p class="muted small">원본 문제: ${esc(h.view||"EBSi 기출문제에서 시험·번호로 찾기")} — <a href="${esc(h.viewUrl||EBSI)}" target="_blank" rel="noopener">열기</a>. 위 설계를 옆에 두고 원본을 직접 풀어 보세요.</p></div>
    ${h.motion&&window.MOTION?`<h2>🎬 모션 풀이</h2>${window.MOTION.render(h.motion)}`:""}
    <h2>🪜 연습 사다리 <span class="muted" style="font-weight:400;font-size:.9rem">— 기본 → 응용 → 실전(자작)</span></h2>
    ${(h.ladder||[]).map((q,k)=>k===2&&!openReal?`<details class="card"><summary><b>실전 단계</b> <span class="muted small">${STAGE_NAME[h.open||"h2"]}부터 권장 — 눌러서 미리 보기</span></summary>${mini(q,h.id+"#l"+k,"실전")}</details>`:mini(q,h.id+"#l"+k,q.lv||["기본","응용","실전"][k])).join("")}
    ${h.evolve?`<div class="box"><b>출제 진화</b> — ${M(h.evolve)}</div>`:""}
    ${srcHtml(h.src)}`);
    bindMini(h.ladder||[]); typeset(); if(window.MOTION) window.MOTION.mount(); }

  // ---------- 4. 섞어 풀기 ----------
  let DR=null;
  function drill(qs){ if(!profile()) return setup(); const pr=new URLSearchParams(qs||""); const a=pr.get("a")||""; const n=Math.max(3,Math.min(20,+(pr.get("n")||8)));
    if(!DR||DR.key!==qs){ const pool=P.filter(p=>!a||p.area===a); const pick=recommend(Math.min(n,pool.length),a||null); for(let k=pick.length-1;k>0;k--){ const j=Math.floor(Math.random()*(k+1)); [pick[k],pick[j]]=[pick[j],pick[k]]; } DR={key:qs,list:pick,i:0,res:[]}; }
    if(DR.i>=DR.list.length) return drillEnd(a);
    const p=DR.list[DR.i]; const ar=AREA[p.area]||{};
    render(`<div class="lhead"><div class="eyebrow">수능 전략 센터 › 섞어 풀기 ${a?"· "+esc((AREA[a]||{}).name||a):"· 전 영역"}</div><h1>🔀 ${DR.i+1} / ${DR.list.length}</h1><p class="lead">어떤 패턴인지 이름을 가리고 냅니다. 신호를 보고 패턴을 떠올린 뒤 푸세요. 갈래를 섞어 푸는 연습이 실전에서 '무슨 유형인지 고르는 힘'을 길러 줍니다.</p></div>${nav("drill")}
    <div class="pill-row">${[["","전 영역"],...(C.areas||[]).map(x=>[x.id,x.icon+" "+x.name])].map(([k,t])=>`<a class="pill ${k===a?"on":""}" href="#/csat/drill${k?"?a="+k:""}">${t}</a>`).join("")}</div>
    <p class="muted small">${ar.icon||""} ${esc(ar.name||"")} · ${esc(p.slot||"")}</p>
    <div class="card" id="cq"><div class="q">${M(p.q)}</div>
      <div class="row" style="margin:8px 0;gap:6px"><span class="muted small">확신도:</span>${[["sure","확신"],["maybe","애매"],["guess","찍음"]].map(([k,t])=>`<button class="pill cf" data-c="${k}">${t}</button>`).join("")}</div>
      ${p.opts?`<div class="opts">${p.opts.map((o,j)=>`<button class="opt" data-j="${j}" disabled>${"①②③④⑤"[j]} ${M(o)}</button>`).join("")}</div>`:`<div class="row"><input id="sa" placeholder="답 입력" disabled style="max-width:220px"><button class="btn sm" id="sab" disabled>제출</button></div>`}
      <div id="fb"></div><div class="row" id="nx" style="display:none;margin-top:8px"><span class="muted small">이 문제의 패턴: <a href="#/csat/p/${p.id}"><b>${esc(p.name)}</b></a></span><button class="btn" id="next">${DR.i+1<DR.list.length?"다음 →":"결과 보기"}</button></div></div>`);
    bindQ(p,ok=>{ DR.res.push({id:p.id,ok}); document.getElementById("nx").style.display="flex"; document.getElementById("next").onclick=()=>{ DR.i++; drill(qs); }; }); }
  function drillEnd(a){ const ok=DR.res.filter(x=>x.ok).length; const res=DR.res; DR=null;
    render(`<div class="lhead"><div class="eyebrow">수능 전략 센터 › 섞어 풀기 결과</div><h1>🔀 ${ok} / ${res.length}</h1><p class="lead">틀린 패턴은 내일, 맞힌 패턴은 간격을 늘려 다시 나옵니다.</p></div>${nav("drill")}
    <div class="grid">${res.map(x=>{ const p=byId[x.id]; return `<a class="card link" href="#/csat/p/${p.id}"><h3>${x.ok?"⭕":"❌"} ${esc(p.name)}</h3><p class="muted small">${esc((AREA[p.area]||{}).name||"")} · ${esc(p.slot||"")}</p>${lvTag(p.id)}</a>`; }).join("")}</div>
    <div class="row" style="margin-top:12px"><a class="btn" href="#/csat/drill${a?"?a="+a:""}">한 번 더</a><a class="btn ghost" href="#/csat">대시보드</a></div>`); }

  // ---------- 5. 학년별 프로그램 ----------
  function roadmap(){ if(!profile()) return setup(); const st=stageNow();
    render(`<div class="lhead"><div class="eyebrow">수능 전략 센터 › 학년별 프로그램</div><h1>🗺 중2 → 고3 수능 학습 프로그램</h1><p class="lead">2028 체계에서는 <b>통합사회·통합과학이 고1 과목</b>, 국어·수학·영어 출제 과목은 고2 과목입니다. 그래서 고1 내신이 곧 탐구 수능 준비이고, 중학교 때는 읽기·연산·어휘의 바탕과 패턴의 신호를 먼저 익힙니다.</p></div>${nav("roadmap")}
    ${(C.stages||[]).map(s=>{ const startN=P.filter(p=>p.start===s.id).length; return `<div class="card csat-stage ${s.id===st?"now":""}"><div class="row" style="justify-content:space-between"><h3>${esc(s.name)} ${s.id===st?'<span class="tag ok">지금</span>':""}</h3><span class="muted small">${esc(s.from)} ~ ${esc(s.to)}</span></div><p>${esc(s.focus)}</p><div class="grid">${Object.entries(s.tasks||{}).map(([a,ts])=>`<div><b class="small">${(AREA[a]||{}).icon||""} ${esc((AREA[a]||{}).name||a)}</b><ul class="bul small">${ts.map(x=>`<li><a href="${x.h}">${esc(x.t)}</a></li>`).join("")}</ul></div>`).join("")}</div><p class="muted small">이 단계에서 시작하는 수능 패턴 ${startN}개 — ${(C.areas||[]).map(a=>{ const k=P.filter(p=>p.start===s.id&&p.area===a.id).length; return k?`<a href="#/csat/tree?a=${a.id}">${a.icon} ${k}</a>`:""; }).join(" ")}</p></div>`; }).join("")}`); }

  // ---------- 6. 경향·제도 변화 ----------
  function trend(){ if(!profile()) return setup();
    render(`<div class="lhead"><div class="eyebrow">수능 전략 센터 › 경향·제도 변화 · 갱신 ${esc(C.updated||"")}</div><h1>📈 출제 경향과 제도 변화</h1><p class="lead">주간 자동 조사가 평가원·교육부·국가교육위원회 발표와 6월·9월 모의평가, 11월 수능 분석을 확인해 이 페이지와 패턴의 출제 연도·상태를 갱신합니다.</p></div>${nav("trend")}
    <h2>📡 제도 변화 감시</h2><div class="card"><table class="tbl"><thead><tr><th>시점</th><th>상태</th><th>내용</th><th>이 학생에게 미치는 영향</th></tr></thead><tbody>${(C.policy||[]).map(x=>`<tr><td>${esc(x.date)}</td><td><span class="tag ${x.status==="확정"?"ok":x.status==="논의"?"warn":""}">${esc(x.status)}</span></td><td>${esc(x.title)}${x.src?`<br><a class="small" href="${esc(x.src[1])}" target="_blank" rel="noopener">${esc(x.src[0])}</a>`:""}</td><td class="small">${esc(x.impact)}</td></tr>`).join("")}</tbody></table></div>
    <h2>🧪 해마다 달라진 출제</h2>${(C.trends||[]).map(t=>`<div class="card"><h3>${esc(t.year)} <span class="muted small">${esc(t.date||"")}</span></h3><p>${esc(t.summary)}</p><ul class="bul small">${Object.entries(t.byArea||{}).map(([a,x])=>`<li><b>${(AREA[a]||{}).icon||""} ${esc((AREA[a]||{}).name||a)}</b> ${esc(x)}</li>`).join("")}</ul>${(t.hard||[]).length?`<table class="tbl"><thead><tr><th>영역</th><th>번호</th><th>고난도 유형</th></tr></thead><tbody>${t.hard.map(h=>`<tr><td>${esc((AREA[h.area]||{}).name||h.area)}</td><td>${esc(h.no)}</td><td>${esc(h.type)}</td></tr>`).join("")}</tbody></table>`:""}${srcHtml(t.src)}</div>`).join("")}
    <h2>🧩 패턴 상태 요약</h2><div class="card"><table class="tbl"><thead><tr><th>영역</th><th>계속</th><th>강화</th><th>신유형</th><th>축소</th></tr></thead><tbody>${(C.areas||[]).map(a=>{ const c=s=>P.filter(p=>p.area===a.id&&(p.status||"계속")===s).length; return `<tr><td>${a.icon} ${esc(a.name)}</td><td>${c("계속")}</td><td>${c("강화")}</td><td>${c("신유형")}</td><td>${c("축소")}</td></tr>`; }).join("")}</tbody></table></div>`); }

  function route(r,p,qs){ if(r!=="csat") return false; const k=p[1]||"";
    if(k==="") dash(); else if(k==="tree") tree(qs); else if(k==="p"&&p[2]) pattern(p[2]); else if(k==="drill") drill(qs); else if(k==="roadmap") roadmap(); else if(k==="trend") trend(); else if(k==="hard"&&p[2]) hard(p[2]); else if(k==="hard") hardList(qs); else A.notFound(); return true; }
  window.CSAT={route,recommend,mastery,P,stageNow,due};
};
