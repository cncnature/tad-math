/* 중등수학 만지기 — 단일 페이지 앱 (해시 라우터). 빌드 도구 없이 GitHub Pages 에서 그대로 동작합니다. */
(function(){
  const D = window.DATA, $ = s=>document.querySelector(s), main = $("#main");
  const G = D.curriculum.grades;
  const lessonsAll = []; D.curriculum.units.forEach(u=>u.lessons.forEach(l=>lessonsAll.push({...l, unit:u.id, grade:u.grade, unitTitle:u.title})));
  const byLesson = id=>lessonsAll.find(l=>l.id===id);
  const byUnit = id=>D.curriculum.units.find(u=>u.id===id);
  const byFormula = id=>D.formulas.find(f=>f.id===id);
  const nodeOf = id=>D.roadmap.nodes.find(n=>n.id===id);
  const lessonsOfNode = id=>lessonsAll.filter(l=>l.node===id);

  // ---------- 저장소 (브라우저 로컬) ----------
  const store = {
    get(k,d){ try{ return JSON.parse(localStorage.getItem("imm:"+k)) ?? d; }catch(e){ return d; } },
    set(k,v){ try{ localStorage.setItem("imm:"+k, JSON.stringify(v)); }catch(e){} }
  };

  // ---------- 유틸 ----------
  const esc = s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const md = s=>esc(s).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>");
  const tag = g=>`<span class="tag ${g}">${G[g]||g}</span>`;
  function typeset(){ if(window.renderMathInElement) renderMathInElement(main,{delimiters:[{left:"$$",right:"$$",display:true},{left:"$",right:"$",display:false}],throwOnError:false}); }
  function render(html){ main.innerHTML = html; window.scrollTo(0,0); typeset(); document.querySelectorAll("details.more[open]").forEach(d=>d.removeAttribute("open")); }
  const shuffle = a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(v=>v[1]);
  const rnd = (a,b)=>a+Math.floor(Math.random()*(b-a+1));

  // 개념 지도 그래프 유틸
  const preds = id=>D.roadmap.edges.filter(e=>e[1]===id).map(e=>e[0]);
  const succs = id=>D.roadmap.edges.filter(e=>e[0]===id).map(e=>e[1]);
  function ancestors(id,set=new Set()){ preds(id).forEach(p=>{ if(!set.has(p)){ set.add(p); ancestors(p,set);} }); return set; }
  function descendants(id,set=new Set()){ succs(id).forEach(p=>{ if(!set.has(p)){ set.add(p); descendants(p,set);} }); return set; }

  // ---------- 퀴즈 공통 ----------
  function quizHtml(items, key){
    return items.map((q,i)=>`<div class="quiz" data-key="${key}" data-i="${i}" data-a="${q.a}" data-q="${esc(q.q.replace(/\*\*/g,""))}">
      <span class="qn">Q${i+1}${i===2?' <em>심화</em>':''}</span> ${md(q.q)}
      <div class="opts">${q.opts.map((o,j)=>`<button data-j="${j}">${["①","②","③","④"][j]} ${md(o)}</button>`).join("")}</div>
      <div class="exp" hidden>${md(q.exp||"")}</div></div>`).join("");
  }
  main.addEventListener("click", e=>{
    const b = e.target.closest(".quiz .opts button"); if(!b) return;
    const q = b.closest(".quiz"); if(q.dataset.a===undefined||q.dataset.done) return; q.dataset.done=1;
    const ok = Number(b.dataset.j)===Number(q.dataset.a);
    b.classList.add(ok?"ok":"bad"); q.querySelector(`.opts button[data-j="${q.dataset.a}"]`).classList.add("ok");
    q.querySelector(".exp").hidden=false;
    const prog = store.get("quiz",{}); prog[q.dataset.key+"#"+q.dataset.i]=ok; store.set("quiz",prog);
    if(!ok){ const notes=store.get("notes",[]); const text=q.dataset.q; notes.unshift({key:q.dataset.key,i:q.dataset.i,q:text,when:Date.now()}); store.set("notes",notes.slice(0,200)); }
  });

  // ---------- 홈 ----------
  function home(){
    const nCore=D.formulas.filter(f=>f.core).length;
    const due = srsDue().length;
    render(`
    <section class="hero">
      <div class="eyebrow">중2-2 · 중3-1 · 중3-2 전용 · 로그인 없음 · 무료</div>
      <h1>중등수학, 외우기 전에 먼저 만져 보세요</h1>
      <p class="lead">피타고라스부터 삼각비·원주각·통계까지, 개념마다 손으로 밀고 당기는 판이 붙어 있습니다. 왜 그런지를 본 공식은 잊어도 다시 만들 수 있습니다.</p>
      <div class="row"><a class="btn" href="#/diagnostic">🧭 끊긴 곳부터 진단하기</a><a class="btn ghost" href="#/lab">🔬 그냥 만져 보기</a><a class="btn ghost" href="#/study">📚 학기 고르기</a>${due?`<a class="btn ghost" href="#/recall">🧠 오늘 복습할 공식 ${due}개</a>`:""}</div>
      <div class="stats">
        <div><b>${lessonsAll.length}</b>소단원</div><div><b>${D.formulas.length}</b>공식</div><div><b>${nCore}</b>정말 외울 것</div><div><b>${D.roadmap.nodes.length}</b>개념 노드</div><div><b>${Object.keys(window.WIDGETS).length}</b>만지는 위젯</div><div><b>${D.life.length}</b>생활 속 수학</div>
      </div>
    </section>
    <h2>이 아래는 $x^2-x-6=0$ 한 문제가 풀리기까지의 이야기입니다</h2>
    <p class="muted">근의 공식은 외웠는데 왜 그렇게 푸는지는 본 적이 없는 학생을 위해. 같은 문제를 네 번, 다르게 봅니다 — 곡선으로, 식으로, 사슬로, 길로.</p>
    <div class="card"><div class="eyebrow">① 곡선으로 보기</div><p>이 식을 그래프로 그리면 $y=x^2-x-6$. 답은 곡선이 x 축을 지나는 두 점에 있습니다. 설명을 읽기 전에 먼저 c 를 밀어 보세요 — 두 근이 다가오다 사라집니다.</p><div class="widget" id="home-widget"></div></div>
    <div class="grid wide">
      <div class="card"><h3>② 식으로 되살리기</h3><p>$x^2-x-6=(x-3)(x+2)$. 인수분해는 곱셈 공식을 거꾸로 읽는 것이고, 곱셈 공식은 넓이 그림입니다.</p><a href="#/formulas/difference-of-squares">📐 합차 공식 →</a> · <a href="#/lab/diffsq">🔬 ㄱ자 펴기 →</a></div>
      <div class="card"><h3>③ 사슬로 보기</h3><p>이 문제가 안 풀리면 이유는 문제 안에 없습니다. 식의 계산 → 곱셈 공식 → 인수분해 → 이차방정식. 끊긴 고리를 찾습니다.</p><a href="#/diagnostic">🧭 18문항으로 끊긴 곳 찾기 →</a></div>
      <div class="card"><h3>④ 길로 보기</h3><p>이차방정식 별 하나 아래에는 중1 식의 계산부터 선수 개념이, 위로는 고1 복소수·도형의 방정식이 이어집니다.</p><a href="#/roadmap">🗺 개념 지도 열기 →</a></div>
    </div>
    <h2>학기별로 바로 가기</h2>
    <div class="grid">${D.curriculum.units.map(u=>`<a class="card link ${u.grade}" href="#/study/${u.id}"><div>${tag(u.grade)}</div><h3>${u.title}</h3><p class="muted">${u.desc}</p></a>`).join("")}</div>
    <h2>더 둘러보기</h2>
    <div class="grid">
      <a class="card link" href="#/formulas"><h3>📐 공식 사전</h3><p class="muted">${D.formulas.length}편 중 정말 외울 것은 ${nCore}편. 나머지는 유도 한 줄.</p></a>
      <a class="card link" href="#/recall"><h3>🧠 공식 암기법</h3><p class="muted">기억 장치 + 간격 반복 카드. 내일 다시 묻습니다.</p></a>
      <a class="card link" href="#/exam"><h3>📝 중간·기말 전 훑기</h3><p class="muted">시험 범위를 한 줄씩 체크. 6개 시험.</p></a>
      <a class="card link" href="#/slides"><h3>🎞 수업 슬라이드</h3><p class="muted">10분 수업용 ${D.slides.length}편. 교실에서 바로 띄우기.</p></a>
      <a class="card link" href="#/play"><h3>🎮 플레이</h3><p class="muted">공식 짝 맞추기, 인수분해 러시, 삼각비 플래시…</p></a>
      <a class="card link" href="#/ecosystem"><h3>🌐 수학의 생태계</h3><p class="muted">개념·공식·인물·쓰임이 한 장으로.</p></a>
      <a class="card link" href="#/life"><h3>🌍 생활 속 수학</h3><p class="muted">TV 인치, 피자 L, 로또, 경사로 8%.</p></a>
      <a class="card link" href="#/people"><h3>👤 수학 인물</h3><p class="muted">탈레스부터 튜키까지 ${D.people.length}명.</p></a>
    </div>
    <div class="box"><b>보호자·선생님께</b> — 이 사이트는 문제를 많이 푸는 곳이 아니라 왜 그런지를 손으로 만져 이해하는 곳입니다. 진단은 「중2 부족」이 아니라 「인수분해에서 끊김」처럼 개념 하나를 가리키고, 그 소단원으로 바로 이어집니다. 모든 기능이 무료이며 학습 기록은 이 브라우저에만 저장됩니다.</div>`);
    window.WIDGETS.quadratic.render($("#home-widget"));
  }

  // ---------- 수학 학습 ----------
  function study(){
    const prog=store.get("quiz",{});
    const done=l=>{ const keys=Object.keys(prog).filter(k=>k.startsWith("lesson:"+l.id+"#")); return keys.length? Math.round(100*keys.filter(k=>prog[k]).length/l.quiz.length):0; };
    render(`<div class="crumb"><a href="#/">홈</a> › 수학 학습</div><h1>🧮 수학 학습</h1><p class="lead">소단원마다 개요 → 핵심 개념 → 왜 그런지 → 공식 → 예제 → 퀴즈 → 이 개념의 자리 순서로 이어집니다.</p>
    ${Object.keys(G).map(g=>`<h2>${G[g]}</h2><div class="grid wide">${D.curriculum.units.filter(u=>u.grade===g).map(u=>`<div class="card ${u.grade}"><h3><a href="#/study/${u.id}">${u.title}</a></h3><p class="muted">${u.desc}</p><ol style="padding-left:18px;margin:0">${u.lessons.map(l=>`<li><a href="#/study/${u.id}/${l.id}">${l.title}</a> <span class="muted" style="font-size:.8rem">${done(l)?`퀴즈 ${done(l)}%`:""}</span></li>`).join("")}</ol></div>`).join("")}</div>`).join("")}
    <h2>🌿 줄기로 보기</h2><p class="muted">학년은 꼬리표일 뿐입니다. 개념의 선후관계로 한 줄에 세우면 이렇게 됩니다.</p>
    ${[["geo","도형과 측정"],["alg","변화와 관계"],["num","수와 연산"],["stat","자료와 가능성"]].map(([s,n])=>`<div class="box"><b>${n}</b> — ${D.roadmap.nodes.filter(x=>x.strand===s&&x.unit).map(x=>`<a href="#/study/${x.unit}">${x.label}</a>`).join(" → ")}</div>`).join("")}`);
  }
  function unit(id){
    const u=byUnit(id); if(!u) return notFound();
    render(`<div class="crumb"><a href="#/">홈</a> › <a href="#/study">수학 학습</a> › ${G[u.grade]}</div>${tag(u.grade)}<h1>${u.title}</h1><p class="lead">${u.desc}</p>
    <div class="grid wide">${u.lessons.map((l,i)=>`<a class="card link" href="#/study/${u.id}/${l.id}"><div class="eyebrow">소단원 ${i+1}</div><h3>${l.title}</h3><p class="muted">${l.concept[0].replace(/\*\*/g,"").slice(0,70)}…</p><div>${l.formulas.map(f=>byFormula(f)?`<span class="tag">📐 ${byFormula(f).title}</span>`:"").join("")}</div></a>`).join("")}</div>
    <h2>이 단원과 이어진 것</h2><div class="row">${[...new Set(u.lessons.map(l=>l.node))].map(n=>`<a class="btn ghost sm" href="#/roadmap/${n}">🗺 ${nodeOf(n).label} 의 자리</a>`).join("")}${Object.values(window.WIDGETS).some(w=>u.lessons.some(l=>l.node===w.node))?`<a class="btn ghost sm" href="#/lab">🔬 관련 위젯</a>`:""}<a class="btn ghost sm" href="#/exam">📝 시험 전 훑기</a></div>`);
  }
  function lesson(uid,lid){
    const u=byUnit(uid), l=byLesson(lid); if(!u||!l) return notFound();
    const idx=u.lessons.findIndex(x=>x.id===lid); const prev=u.lessons[idx-1], next=u.lessons[idx+1];
    const node=nodeOf(l.node); const pre=preds(l.node).map(nodeOf), post=succs(l.node).map(nodeOf);
    const widgets=Object.entries(window.WIDGETS).filter(([k,w])=>w.node===l.node);
    const lifeItems=D.life.filter(x=>x.node===l.node).slice(0,3); const ppl=D.people.filter(p=>p.link===l.id||p.node===l.node).slice(0,2);
    render(`<div class="crumb"><a href="#/">홈</a> › <a href="#/study">수학 학습</a> › <a href="#/study/${u.id}">${u.title}</a></div>${tag(u.grade)}<h1>${l.title}</h1>
    <div class="pill-row">${[["c","핵심 개념"],["why","왜 그런지"],["pit","오개념"],["pt","출제 포인트"],["f","공식"],["ex","예제"],["quiz","퀴즈"],["place","개념의 자리"]].map(([k,n])=>`<button class="pill" data-to="${k}">${n}</button>`).join("")}</div>
    <h2 id="c">핵심 개념</h2><ul>${l.concept.map(c=>`<li>${md(c)}</li>`).join("")}</ul>
    <h2 id="why">왜 그런지</h2><div class="box">${md(l.why)}</div>
    ${l.pitfalls?`<h2 id="pit">⚠️ 흔한 오개념 · 함정</h2><ul class="pit">${l.pitfalls.map(c=>`<li>${md(c)}</li>`).join("")}</ul>`:""}
    ${l.points?`<h2 id="pt">🎯 출제 포인트</h2><ul class="pt">${l.points.map(c=>`<li>${md(c)}</li>`).join("")}</ul>`:""}
    ${widgets.length?`<h2>만져 보기</h2>${widgets.map(([k,w])=>`<div class="widget" id="w-${k}"><b>${w.title}</b><p class="muted">${w.desc}</p></div>`).join("")}`:""}
    ${l.formulas.length?`<h2 id="f">이 단원의 공식</h2><div class="grid">${l.formulas.map(f=>byFormula(f)).filter(Boolean).map(f=>`<a class="card link" href="#/formulas/${f.id}"><h3>${f.title} ${f.core?'<span class="tag">외울 것</span>':'<span class="tag">되살릴 것</span>'}</h3><div class="formula">$${f.tex}$</div></a>`).join("")}</div>`:""}
    <h2 id="ex">예제</h2><div class="card"><p><b>문제.</b> ${md(l.example.q)}</p><details class="sol"><summary>풀이 보기</summary><ol class="steps">${l.example.sol.map(s=>`<li>${md(s)}</li>`).join("")}</ol><p><b>답:</b> ${md(l.example.ans)}</p></details></div>
    <h2 id="quiz">확인 퀴즈</h2>${quizHtml(l.quiz,"lesson:"+l.id)}
    <h2 id="place">이 개념의 자리</h2>
    <div class="card"><p><b>${node.label}</b> 별에 닿는 길: ${pre.length?pre.map(n=>`<a href="#/roadmap/${n.id}">${n.label}</a>`).join(" · "):"(시작점)"} → <b>${node.label}</b> → ${post.length?post.map(n=>`<a href="#/roadmap/${n.id}">${n.label}</a>`).join(" · "):"(끝)"}</p><a class="btn sm ghost" href="#/roadmap/${l.node}">🗺 지도에서 보기</a></div>
    ${lifeItems.length||ppl.length?`<h2>이어서 보기</h2><div class="grid">${lifeItems.map(x=>`<a class="card link" href="#/life"><div class="eyebrow">🌍 생활 속 수학</div><h3>${x.title}</h3></a>`).join("")}${ppl.map(p=>`<a class="card link" href="#/people"><div class="eyebrow">👤 수학 인물</div><h3>${p.name}</h3><p class="muted">${p.years}</p></a>`).join("")}</div>`:""}
    <div class="row" style="margin-top:24px">${prev?`<a class="btn ghost" href="#/study/${u.id}/${prev.id}">← ${prev.title}</a>`:""}${next?`<a class="btn" href="#/study/${u.id}/${next.id}">${next.title} →</a>`:`<a class="btn" href="#/study">다음 단원 고르기 →</a>`}</div>`);
    widgets.forEach(([k,w])=>w.render($("#w-"+k)));
    main.querySelectorAll("[data-to]").forEach(b=>b.onclick=()=>{ const t=document.getElementById(b.dataset.to); if(t) t.scrollIntoView({behavior:"smooth",block:"start"}); });
  }

  // ---------- 개념 지도 ----------
  function roadmap(sel){
    const cols=D.roadmap.columns; const colX={}; cols.forEach((c,i)=>colX[c.id]=120+i*200);
    const pos={}; cols.forEach(c=>{ const ns=D.roadmap.nodes.filter(n=>n.col===c.id); ns.forEach((n,i)=>pos[n.id]=[colX[c.id],70+i*52]); });
    const H=70+52*Math.max(...cols.map(c=>D.roadmap.nodes.filter(n=>n.col===c.id).length))+20;
    const up=sel?ancestors(sel):new Set(), down=sel?descendants(sel):new Set();
    const edges=D.roadmap.edges.map(([a,b])=>{ const [x1,y1]=pos[a],[x2,y2]=pos[b]; const cls=sel&&((up.has(a)||a===sel)&&(up.has(b)||b===sel))?"on":sel&&((down.has(b)||b===sel)&&(down.has(a)||a===sel))?"next":""; return `<path class="edge ${cls}" d="M${x1+70},${y1} C${x1+120},${y1} ${x2-120},${y2} ${x2-70},${y2}"/>`; }).join("");
    const nodes=D.roadmap.nodes.map(n=>{ const [x,y]=pos[n.id]; const nf=D.formulas.filter(f=>f.node===n.id).length; const cls=`node ${n.col} ${n.id===sel?"on":""}`; return `<g class="${cls}" data-id="${n.id}" transform="translate(${x-70},${y-18})"><rect width="140" height="36"/><text x="70" y="23" text-anchor="middle">${n.label}</text>${nf?`<text x="134" y="12" text-anchor="end" style="font-size:9px;fill:var(--acc)">📐${nf}</text>`:""}</g>`; }).join("");
    const heads=cols.map(c=>`<text class="col-h" x="${colX[c.id]}" y="30" text-anchor="middle">${c.label}</text>`).join("");
    const n=sel&&nodeOf(sel);
    render(`<div class="crumb"><a href="#/">홈</a> › 개념 지도</div><h1>🗺 개념 지도</h1><p class="lead">별 하나를 누르면 그 개념까지 오는 길(주황)과 거기서 열리는 길(파랑)에 불이 켜집니다. 개념 ${D.roadmap.nodes.length}개 · 이어진 길 ${D.roadmap.edges.length}개.</p>
    ${n?`<div class="box"><b>${n.label}</b> — 앞에 깔린 개념 <b>${up.size}</b>개, 여기서 열리는 개념 <b>${down.size}</b>개. ${n.unit?`<a href="#/study/${n.unit}">📘 ${byUnit(n.unit).title} 단원으로 →</a>`:"(이 사이트 범위 밖)"} ${D.formulas.filter(f=>f.node===sel).length?` · <a href="#/formulas?node=${sel}">📐 공식 ${D.formulas.filter(f=>f.node===sel).length}편</a>`:""}${lessonsOfNode(sel).length?` · 소단원: ${lessonsOfNode(sel).map(l=>`<a href="#/study/${l.unit}/${l.id}">${l.title}</a>`).join(", ")}`:""}</div>`:`<div class="box warn">별을 하나 골라 보세요. 예: <a href="#/roadmap/quadratic-eq">이차방정식</a></div>`}
    <div class="map"><svg viewBox="0 0 1100 ${H}" width="1100" height="${H}">${heads}${edges}${nodes}</svg></div>
    <p class="muted">화면이 좁으면 지도를 좌우로 밀어 보세요. 줄기별 색: 중2-2 파랑, 중3-1 보라, 중3-2 분홍.</p>`);
    main.querySelectorAll(".node").forEach(g=>g.addEventListener("click",()=>location.hash="#/roadmap/"+g.dataset.id));
  }

  // ---------- 공식 사전 ----------
  function formulas(q){
    const p=new URLSearchParams(q||""); const node=p.get("node"), grade=p.get("grade"), core=p.get("core");
    let list=D.formulas.slice(); if(node) list=list.filter(f=>f.node===node); if(grade) list=list.filter(f=>f.grade===grade); if(core==="1") list=list.filter(f=>f.core);
    render(`<div class="crumb"><a href="#/">홈</a> › 공식 사전</div><h1>📐 공식 사전</h1><p class="lead">공식 ${D.formulas.length}편 가운데 정말 외워야 하는 것은 <b>${D.formulas.filter(f=>f.core).length}편</b>입니다. 나머지는 유도 한 줄이면 그 자리에서 되살아납니다.</p>
    <div class="pill-row"><a class="pill ${!grade&&!core?"on":""}" href="#/formulas">전체</a>${Object.keys(G).map(g=>`<a class="pill ${grade===g?"on":""}" href="#/formulas?grade=${g}">${G[g]}</a>`).join("")}<a class="pill ${core?"on":""}" href="#/formulas?core=1">🔑 정말 외울 것</a></div>
    <div class="grid wide">${list.map(f=>`<a class="card link" href="#/formulas/${f.id}">${tag(f.grade)} ${f.core?'<span class="tag">🔑 외울 것</span>':'<span class="tag">↻ 되살릴 것</span>'}<h3>${f.title}</h3><div class="formula">$${f.tex}$</div></a>`).join("")}</div>`);
  }
  function formula(id){
    const f=byFormula(id); if(!f) return notFound(); const r=D.recall.find(x=>x.f===id); const ls=lessonsAll.filter(l=>l.formulas.includes(id));
    render(`<div class="crumb"><a href="#/">홈</a> › <a href="#/formulas">공식 사전</a></div>${tag(f.grade)} ${f.core?'<span class="tag">🔑 정말 외울 것</span>':'<span class="tag">↻ 유도로 되살릴 것</span>'}<h1>${f.title}</h1>
    <div class="formula" style="font-size:1.6rem">$$${f.tex}$$</div>
    <h2>유도 (되살리기)</h2><ol class="steps">${f.derive.map(s=>`<li>${md(s)}</li>`).join("")}</ol>
    <div class="box ok"><b>한 줄 요령:</b> ${md(f.tip)}</div>
    ${r?`<h2>기억 장치</h2><div class="card"><p>🧠 ${md(r.mnemonic)}</p><p class="muted">📜 ${md(r.story)}</p><a class="btn sm ghost" href="#/recall">암기 카드로 복습 →</a></div>`:""}
    ${ls.length?`<h2>쓰이는 소단원</h2><div class="row">${ls.map(l=>`<a class="btn sm ghost" href="#/study/${l.unit}/${l.id}">📘 ${l.title}</a>`).join("")}</div>`:""}
    <p style="margin-top:20px"><a href="#/roadmap/${f.node}">🗺 ${nodeOf(f.node).label} 의 자리 보기</a></p>`);
  }

  // ---------- 수학의 생태계 ----------
  function ecosystem(){
    const nodes=D.roadmap.nodes.filter(n=>n.unit); const cx=550, cy=330, R=230; const pos={};
    nodes.forEach((n,i)=>{ const t=-Math.PI/2+i*2*Math.PI/nodes.length; pos[n.id]=[cx+R*Math.cos(t),cy+R*Math.sin(t),t]; });
    let svg="", legend="";
    // 중심 간선
    D.roadmap.edges.filter(([a,b])=>pos[a]&&pos[b]).forEach(([a,b])=>{ svg+=`<line x1="${pos[a][0]}" y1="${pos[a][1]}" x2="${pos[b][0]}" y2="${pos[b][1]}" stroke-width="1"/>`; });
    nodes.forEach(n=>{ const [x,y,t]=pos[n.id]; const sat=[["📐",D.formulas.filter(f=>f.node===n.id).length,"var(--acc)"],["👤",D.people.filter(p=>p.node===n.id).length,"var(--g31)"],["🌍",D.life.filter(l=>l.node===n.id).length,"var(--ok)"],["🔬",Object.values(window.WIDGETS).filter(w=>w.node===n.id).length,"var(--acc2)"]];
      sat.forEach(([ic,cnt,col],k)=>{ if(!cnt)return; const rr=70+k*22; const sx=x+rr*Math.cos(t), sy=y+rr*Math.sin(t); svg+=`<line x1="${x}" y1="${y}" x2="${sx}" y2="${sy}"/><circle cx="${sx}" cy="${sy}" r="${9+cnt}" fill="${col}" opacity=".85"/><text x="${sx}" y="${sy+4}" text-anchor="middle" style="fill:#fff;font-size:10px">${ic}${cnt}</text>`; });
      svg+=`<g class="eco-node" data-id="${n.id}"><circle cx="${x}" cy="${y}" r="26" fill="var(--card)" stroke="var(--${n.col})" stroke-width="3"/><text x="${x}" y="${y+4}" text-anchor="middle" style="font-weight:700">${n.label.length>7?n.label.slice(0,7)+"…":n.label}</text></g>`; });
    render(`<div class="crumb"><a href="#/">홈</a> › 수학의 생태계</div><h1>🌐 수학의 생태계</h1><p class="lead">중2-2 ~ 중3-2 의 개념 ${nodes.length}개를 둥글게 놓고, 각 개념에 걸린 📐공식 · 👤인물 · 🌍쓰임 · 🔬위젯을 위성처럼 붙였습니다. 가운데 선은 개념의 선후관계. 개념을 누르면 지도로 갑니다.</p>
    <div class="eco"><svg viewBox="0 0 1100 660" width="1100" height="660"><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="var(--line)" stroke-dasharray="4 4"/>${svg}</svg></div>
    <div class="grid" style="margin-top:14px">${nodes.map(n=>`<div class="card"><h3><a href="#/roadmap/${n.id}">${n.label}</a> ${tag(n.col)}</h3><p class="muted">📐 ${D.formulas.filter(f=>f.node===n.id).map(f=>`<a href="#/formulas/${f.id}">${f.title}</a>`).join(" · ")||"—"}</p><p class="muted">👤 ${D.people.filter(p=>p.node===n.id).map(p=>p.name).join(", ")||"—"} &nbsp; 🌍 ${D.life.filter(l=>l.node===n.id).length}편</p></div>`).join("")}</div>`);
    main.querySelectorAll(".eco-node").forEach(g=>g.addEventListener("click",()=>location.hash="#/roadmap/"+g.dataset.id));
  }

  // ---------- 진단 ----------
  function diagnostic(level){
    const sets={A:[0,9],B:[9,18],ALL:[0,18]}; 
    if(!level){ return render(`<div class="crumb"><a href="#/">홈</a> › 진단</div><h1>🧭 끊긴 곳부터 진단하기</h1><p class="lead">학년이 아니라 개념으로 짚습니다. 문항은 개념의 선후 순서대로 나오고, 처음 틀린 자리가 「끊긴 고리」입니다. 결과는 「중2 부족」이 아니라 「인수분해에서 끊김」처럼 개념 하나를 가리키고 그 소단원으로 바로 이어집니다.</p>
      <div class="grid"><a class="card link" href="#/diagnostic/A"><h3>중2-2 진단</h3><p class="muted">선수 개념 3 + 삼각형·사각형·닮음·피타고라스·확률 6 = 9문항</p></a><a class="card link" href="#/diagnostic/B"><h3>중3 진단</h3><p class="muted">제곱근·곱셈공식·인수분해·이차방정식·이차함수·삼각비·원·통계 9문항</p></a><a class="card link" href="#/diagnostic/ALL"><h3>전체 진단</h3><p class="muted">중2-2 ~ 중3-2 18문항, 약 10분</p></a></div>
      ${(()=>{const h=store.get("diag",[]); return h.length?`<h2>지난 진단</h2><ul>${h.slice(0,5).map(x=>`<li>${new Date(x.when).toLocaleDateString("ko")} · ${x.level} · ${x.score}/${x.total} · 끊긴 고리: <b>${x.broken?nodeOf(x.broken).label:"없음 🎉"}</b></li>`).join("")}</ul>`:"";})()}`); }
    const [s,e]=sets[level]||sets.ALL; const items=D.diagnostic.slice(s,e); let i=0; const ans=[];
    function step(){ if(i>=items.length) return result();
      const q=items[i]; render(`<div class="crumb"><a href="#/diagnostic">진단</a> › 문항 ${i+1}/${items.length}</div><div class="progress"><i style="width:${i/items.length*100}%"></i></div><p class="eyebrow">${q.label}</p><div class="quiz" style="border:0;padding:0"><h2 style="margin-top:0">${md(q.q)}</h2><div class="opts">${q.opts.map((o,j)=>`<button data-j="${j}" class="dq">${["①","②","③","④"][j]} ${md(o)}</button>`).join("")}</div></div>`);
      main.querySelectorAll(".dq").forEach(b=>b.addEventListener("click",()=>{ ans.push(Number(b.dataset.j)===q.a); i++; step(); },{once:true})); }
    function result(){ const firstWrong=ans.findIndex(x=>!x); const broken=firstWrong>=0?items[firstWrong].node:null; const score=ans.filter(Boolean).length;
      const h=store.get("diag",[]); h.unshift({when:Date.now(),level,score,total:items.length,broken}); store.set("diag",h.slice(0,20));
      const wrongNodes=[...new Set(items.filter((q,k)=>!ans[k]).map(q=>q.node))];
      const path=broken?[broken,...[...descendants(broken)].filter(n=>nodeOf(n).unit)]:[];
      render(`<div class="crumb"><a href="#/diagnostic">진단</a> › 결과</div><h1>${score} / ${items.length}</h1>
      ${broken?`<div class="box warn"><b>끊긴 고리: ${nodeOf(broken).label}</b> — 여기서 처음 막혔습니다. 앞의 ${firstWrong}개 고리는 이어져 있으므로 처음부터 다시 할 필요가 없습니다. ${nodeOf(broken).unit?`<a class="btn sm" href="#/study/${nodeOf(broken).unit}">📘 ${byUnit(nodeOf(broken).unit).title} 단원으로 →</a>`:`<span class="muted">(중1~중2-1 선수 개념입니다. 해당 학년 교과서의 '${nodeOf(broken).label}' 을 먼저 복습하세요.)</span>`}</div>
      <h2>되돌아갈 길</h2><p>끊긴 고리부터 이어진 길만 따라가면 됩니다:</p><ol class="steps">${path.map(n=>`<li><a href="#/roadmap/${n}">${nodeOf(n).label}</a>${wrongNodes.includes(n)?' <span class="tag">틀림</span>':""}${nodeOf(n).unit?` — <a href="#/study/${nodeOf(n).unit}">${byUnit(nodeOf(n).unit).title}</a>`:""}</li>`).join("")}</ol>`:`<div class="box ok"><b>끊긴 고리가 없습니다 🎉</b> 다음 단계는 <a href="#/exam">시험 전 훑기</a>나 <a href="#/recall">공식 되살리기</a>로.</div>`}
      <h2>문항별 결과</h2><table><tr><th>#</th><th>개념</th><th>결과</th><th>풀이</th></tr>${items.map((q,k)=>`<tr><td>${k+1}</td><td><a href="#/roadmap/${q.node}">${q.label}</a></td><td>${ans[k]?"✅":"❌"}</td><td>${md(q.exp)}</td></tr>`).join("")}</table>
      <div class="row" style="margin-top:16px"><a class="btn ghost" href="#/diagnostic">다시 진단</a><a class="btn" href="#/roadmap${broken?"/"+broken:""}">🗺 지도에서 보기</a></div>`); }
    step();
  }

  // ---------- 매스랩 ----------
  function lab(id){
    const Wd=window.WIDGETS;
    if(id&&Wd[id]){ const w=Wd[id]; render(`<div class="crumb"><a href="#/">홈</a> › <a href="#/lab">매스랩</a></div>${tag(w.grade)}<h1>${w.title}</h1><p class="lead">${w.desc}</p><div class="widget" id="lab-w"></div><div class="row">${lessonsOfNode(w.node).map(l=>`<a class="btn sm ghost" href="#/study/${l.unit}/${l.id}">📘 ${l.title}</a>`).join("")}<a class="btn sm ghost" href="#/roadmap/${w.node}">🗺 지도</a></div>`); w.render($("#lab-w")); return; }
    render(`<div class="crumb"><a href="#/">홈</a> › 매스랩</div><h1>🔬 매스랩</h1><p class="lead">설명을 읽기 전에 먼저 밀어 보세요. 슬라이더 하나가 공식 한 줄을 설명합니다.</p>${Object.keys(G).map(g=>`<h2>${G[g]}</h2><div class="grid wide">${Object.entries(Wd).filter(([k,w])=>w.grade===g).map(([k,w])=>`<a class="card link ${g}" href="#/lab/${k}">${tag(w.grade)}<h3>${w.title}</h3><p class="muted">${w.desc}</p></a>`).join("")}</div>`).join("")}
    <div class="box"><b>위젯 추가하기</b> — <code>js/widgets.js</code> 에 <code>WIDGETS.id = {title, desc, node, grade, render(container)}</code> 하나를 더하면 목록·소단원·생태계에 자동으로 연결됩니다.</div>`);
  }

  // ---------- 슬라이드 ----------
  function slides(id){
    if(!id) return render(`<div class="crumb"><a href="#/">홈</a> › 슬라이드</div><h1>🎞 수업 슬라이드</h1><p class="lead">10분 수업용. 교실 화면에 띄우고 <span class="kbd">→</span> <span class="kbd">←</span> 로 넘깁니다. 위젯이 들어간 장은 그 자리에서 바로 만질 수 있습니다.</p><div class="grid wide">${D.slides.map(s=>`<a class="card link" href="#/slides/${s.id}">${tag(s.grade)}<h3>${s.title}</h3><p class="muted">${s.slides.length}장 · <span>${byLesson(s.lesson)?byLesson(s.lesson).title:""}</span></p></a>`).join("")}</div>`);
    const deck=D.slides.find(s=>s.id===id); if(!deck) return notFound(); let i=0;
    function show(){ const s=deck.slides[i]; render(`<div class="crumb"><a href="#/slides">슬라이드</a> › ${deck.title}</div><div class="slides"><div class="eyebrow">${i+1} / ${deck.slides.length}</div><h2>${s.h}</h2>${s.body.map(b=>`<p style="font-size:1.25rem">${md(b)}</p>`).join("")}${s.widget?`<div class="widget" id="sw" style="background:#fff;color:#1a2233"></div>`:""}<div class="nav2"><button id="pv">← 이전</button><button id="nx">다음 →</button><a href="#/study/${byLesson(deck.lesson)?byLesson(deck.lesson).unit:""}/${deck.lesson}" style="color:#fbbf24">📘 소단원</a></div></div><p class="muted">키보드 ← → 로도 넘길 수 있습니다. <span class="kbd">F11</span> 전체화면.</p>`);
      if(s.widget&&window.WIDGETS[s.widget]) window.WIDGETS[s.widget].render($("#sw"));
      $("#pv").onclick=()=>{i=Math.max(0,i-1);show();}; $("#nx").onclick=()=>{i=Math.min(deck.slides.length-1,i+1);show();}; }
    window.__slideKey=e=>{ if(e.key==="ArrowRight"){i=Math.min(deck.slides.length-1,i+1);show();} if(e.key==="ArrowLeft"){i=Math.max(0,i-1);show();} };
    show();
  }
  document.addEventListener("keydown",e=>{ if(location.hash.startsWith("#/slides/")&&window.__slideKey) window.__slideKey(e); });

  // ---------- 플레이 ----------
  const GAMES = {
    "formula-match":{ gen(){ const f=D.formulas[rnd(0,D.formulas.length-1)]; const others=shuffle(D.formulas.filter(x=>x.id!==f.id)).slice(0,3); const opts=shuffle([f,...others]); return {q:`<b>${f.title}</b> 의 식은?`, opts:opts.map(o=>`$${o.tex}$`), a:opts.indexOf(f)}; } },
    "trig-flash":{ gen(){ const T={ "sin 30°":"1/2","sin 45°":"√2/2","sin 60°":"√3/2","cos 30°":"√3/2","cos 45°":"√2/2","cos 60°":"1/2","tan 30°":"√3/3","tan 45°":"1","tan 60°":"√3","sin 90°":"1","cos 0°":"1","sin 0°":"0" }; const keys=Object.keys(T); const k=keys[rnd(0,keys.length-1)]; const vals=[...new Set(Object.values(T))]; const opts=shuffle([T[k],...shuffle(vals.filter(v=>v!==T[k])).slice(0,3)]); return {q:`<b>${k}</b> 의 값은?`,opts,a:opts.indexOf(T[k])}; } },
    "angle-quiz":{ gen(){ const kind=rnd(0,2); if(kind===0){ const c=rnd(20,85)*2; return {q:`호 AB 에 대한 중심각이 <b>${c}°</b> 일 때 원주각은?`, opts:shuffle([c/2,c,c/4,180-c/2]).map(String), a:null, ans:String(c/2)}; } if(kind===1){ const a=rnd(50,130); return {q:`원에 내접하는 사각형 ABCD 에서 ∠A = <b>${a}°</b> 일 때 ∠C 는?`, opts:shuffle([180-a,a,360-a,90]).map(String), a:null, ans:String(180-a)}; } const p=rnd(20,80); return {q:`호 AB 에 대한 원주각이 <b>${p}°</b> 일 때 중심각은?`, opts:shuffle([2*p,p,p/2,180-p]).map(String), a:null, ans:String(2*p)}; } },
    "factor-rush":{ input:true, gen(){ let p=rnd(-6,6),q=rnd(-6,6); if(p===0)p=1; if(q===0)q=-2; const b=p+q,c=p*q; return {q:`$x^2 ${b>=0?"+":"−"} ${Math.abs(b)}x ${c>=0?"+":"−"} ${Math.abs(c)} = (x+p)(x+q)$ 의 p, q 는? (예: <code>3,-2</code> 순서 무관)`, check:v=>{ const m=v.split(/[,\s]+/).map(Number); return m.length===2&&((m[0]===p&&m[1]===q)||(m[0]===q&&m[1]===p)); }, ans:`${p}, ${q}`, hint:`곱이 ${c}, 합이 ${b} 인 두 수`}; } },
    "pytha-triple":{ input:true, gen(){ const T=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[6,8,10],[9,12,15],[12,16,20],[20,21,29],[9,40,41]]; const t=T[rnd(0,T.length-1)]; const k=rnd(0,1); if(k){ return {q:`빗변 <b>${t[2]}</b>, 한 변 <b>${t[0]}</b> 인 직각삼각형의 나머지 변은?`, check:v=>Number(v)===t[1], ans:String(t[1]), hint:`${t[2]}² − ${t[0]}² = ${t[2]*t[2]-t[0]*t[0]}`}; } return {q:`두 변이 <b>${t[0]}</b>, <b>${t[1]}</b> 인 직각삼각형의 빗변은?`, check:v=>Number(v)===t[2], ans:String(t[2]), hint:`${t[0]}² + ${t[1]}² = ${t[0]*t[0]+t[1]*t[1]}`}; } },
    "vertex-hunt":{ input:true, gen(){ const a=[1,-1,2,-2,3][rnd(0,4)], p=rnd(-5,5), q=rnd(-6,6); return {q:`$y = ${a===1?"":a===-1?"-":a}(x ${p>=0?"−":"+"} ${Math.abs(p)})^2 ${q>=0?"+":"−"} ${Math.abs(q)}$ 의 꼭짓점 (p, q) 는? (예: <code>2,-3</code>)`, check:v=>{ const m=v.split(/[,\s]+/).map(Number); return m[0]===p&&m[1]===q; }, ans:`${p}, ${q}`, hint:"x 는 부호 반대로, y 는 그대로"}; } }
  };
  function play(id){
    if(!id) return render(`<div class="crumb"><a href="#/">홈</a> › 플레이</div><h1>🎮 플레이</h1><p class="lead">게임으로 되살리기. 최고 기록은 이 브라우저에 저장됩니다.</p><div class="grid wide">${D.play.map(g=>{const best=store.get("best:"+g.id,0); return `<a class="card link" href="#/play/${g.id}">${g.grade!=="all"?tag(g.grade):'<span class="tag">전체</span>'}<h3>${g.title}</h3><p class="muted">${g.desc}</p>${best?`<p class="score">🏆 최고 ${best}점</p>`:""}</a>`;}).join("")}</div>`);
    const meta=D.play.find(g=>g.id===id), gm=GAMES[id]; if(!meta||!gm) return notFound();
    let score=0, streak=0, left=60, timer=null, cur=null;
    function finish(){ clearInterval(timer); const best=store.get("best:"+id,0); if(score>best) store.set("best:"+id,score); render(`<div class="crumb"><a href="#/play">플레이</a> › ${meta.title}</div><h1>⏱ 끝! ${score}점</h1><p class="lead">최고 기록 ${Math.max(best,score)}점 · 최대 연속 정답 ${streak}</p><div class="row"><a class="btn" href="#/play/${id}" onclick="location.reload()">다시</a><a class="btn ghost" href="#/play">다른 게임</a>${meta.node?`<a class="btn ghost" href="#/roadmap/${meta.node}">🗺 개념 보기</a>`:""}</div>`); }
    function next(){ cur=gm.gen(); render(`<div class="crumb"><a href="#/play">플레이</a> › ${meta.title}</div><div class="row"><span class="score">점수 ${score}</span><span class="muted">남은 시간 <b id="t">${left}</b>초</span></div><div class="progress"><i style="width:${left/60*100}%"></i></div><div class="card game"><div class="big">${cur.q}</div>${gm.input?`<div class="row" style="justify-content:center"><input id="ans" autocomplete="off" autofocus> <button class="btn" id="go">확인</button></div><p class="muted right">Enter 로 제출</p>`:`<div class="quiz" style="border:0"><div class="opts">${cur.opts.map((o,j)=>`<button class="go" data-j="${j}">${o}</button>`).join("")}</div></div>`}<div id="fb" class="muted"></div></div>`);
      if(gm.input){ const inp=$("#ans"); inp.focus(); const sub=()=>{ const ok=cur.check(inp.value.trim()); if(ok){score+=10;streak++; $("#fb").innerHTML="✅ 정답!"; setTimeout(next,400);} else { streak=0; $("#fb").innerHTML=`❌ 힌트: ${cur.hint} (답 ${cur.ans})`; } }; $("#go").onclick=sub; inp.addEventListener("keydown",e=>{if(e.key==="Enter")sub();}); }
      else main.querySelectorAll(".go").forEach(b=>b.onclick=()=>{ const ok=cur.a!==null?Number(b.dataset.j)===cur.a:cur.opts[Number(b.dataset.j)]===cur.ans; if(ok){score+=10;streak++;b.classList.add("ok");} else {streak=0;b.classList.add("bad"); $("#fb").innerHTML=`정답: ${cur.a!==null?cur.opts[cur.a]:cur.ans}`; typeset();} setTimeout(next,ok?350:900); }); }
    timer=setInterval(()=>{ left--; const t=$("#t"); if(t)t.textContent=left; if(left<=0)finish(); },1000);
    window.addEventListener("hashchange",()=>clearInterval(timer),{once:true});
    next();
  }

  // ---------- 개념 사전 ----------
  function concepts(q){ const p=new URLSearchParams(q||""); const g=p.get("grade"); const list=D.concepts.filter(c=>!g||c.grade===g).sort((a,b)=>a.term.localeCompare(b.term,"ko"));
    render(`<div class="crumb"><a href="#/">홈</a> › 개념 사전</div><h1>📖 개념 사전</h1><p class="lead">용어 ${D.concepts.length}개. 정의 한 줄과 영어 이름, 그리고 그 개념이 있는 자리.</p><div class="pill-row"><a class="pill ${!g?"on":""}" href="#/concepts">전체</a>${Object.keys(G).map(x=>`<a class="pill ${g===x?"on":""}" href="#/concepts?grade=${x}">${G[x]}</a>`).join("")}</div>
    <div class="grid wide">${list.map(c=>`<div class="card">${tag(c.grade)}<h3>${c.term} <span class="muted" style="font-weight:400;font-size:.85rem">${c.en}</span></h3><p>${md(c.def)}</p><a href="#/roadmap/${c.node}">🗺 ${nodeOf(c.node).label}</a>${lessonsOfNode(c.node).slice(0,1).map(l=>` · <a href="#/study/${l.unit}/${l.id}">📘 ${l.title}</a>`).join("")}</div>`).join("")}</div>`); }

  // ---------- 공식 암기법 (간격 반복) ----------
  function srsAll(){ return store.get("srs",{}); }
  function srsDue(){ const s=srsAll(); const now=Date.now(); return D.recall.filter(r=>!s[r.f]||s[r.f].due<=now); }
  function recall(mode){
    const s=srsAll(); const due=srsDue();
    if(mode!=="run"){ return render(`<div class="crumb"><a href="#/">홈</a> › 공식 암기법</div><h1>🧠 공식 암기법</h1><p class="lead">외울 것과 되살릴 것을 나누고, 외울 것에는 기억 장치를 붙입니다. 카드를 넘기면 <b>간격 반복</b>으로 내일·3일 뒤·일주일 뒤 다시 묻습니다. (기록은 이 브라우저에만)</p>
      <div class="row"><a class="btn" href="#/recall/run">▶ 오늘의 카드 ${due.length}장 시작</a><button class="btn ghost" id="reset">기록 초기화</button></div>
      <h2>외울 것 vs 되살릴 것</h2><div class="grid wide"><div class="card"><h3>🔑 정말 외울 것 (${D.formulas.filter(f=>f.core).length})</h3><ul>${D.formulas.filter(f=>f.core).map(f=>`<li><a href="#/formulas/${f.id}">${f.title}</a></li>`).join("")}</ul></div><div class="card"><h3>↻ 유도 한 줄로 되살릴 것 (${D.formulas.filter(f=>!f.core).length})</h3><p class="muted">${D.formulas.filter(f=>!f.core).map(f=>`<a href="#/formulas/${f.id}">${f.title}</a>`).join(" · ")}</p></div></div>
      <h2>기억 장치 모음</h2><div class="grid wide">${D.recall.map(r=>{const f=byFormula(r.f); const st=s[r.f]; return `<div class="card"><h3><a href="#/formulas/${f.id}">${f.title}</a></h3><div class="formula">$${f.tex}$</div><p>🧠 ${md(r.mnemonic)}</p><p class="muted">📜 ${md(r.story)}</p>${st?`<p class="muted" style="font-size:.8rem">다음 복습: ${new Date(st.due).toLocaleDateString("ko")} · 단계 ${st.n}</p>`:""}</div>`;}).join("")}</div>`), $("#reset").onclick=()=>{ if(confirm("암기 기록을 지울까요?")){store.set("srs",{});recall();} }; }
    const queue=shuffle(due); let i=0;
    function card(){ if(i>=queue.length) return render(`<h1>오늘 복습 끝 🎉</h1><p class="lead">${queue.length}장을 넘겼습니다. 내일 다시 오세요.</p><a class="btn" href="#/recall">목록으로</a>`);
      const r=queue[i], f=byFormula(r.f); let flipped=false;
      render(`<div class="crumb"><a href="#/recall">공식 암기법</a> › ${i+1}/${queue.length}</div><div class="progress"><i style="width:${i/queue.length*100}%"></i></div><div class="flash"><div class="face" id="face"><div class="eyebrow">${f.title}</div><p>이 공식을 떠올려 보세요. 되살리는 한 줄: <i>${md(f.tip)}</i></p><button class="btn" id="flip">뒤집기</button></div></div>`);
      $("#flip").onclick=()=>{ flipped=true; $("#face").innerHTML=`<div class="eyebrow">${f.title}</div><div class="formula" style="font-size:1.5rem">$$${f.tex}$$</div><p>🧠 ${md(r.mnemonic)}</p><div class="row" style="justify-content:center"><button class="btn ghost" data-g="0">😵 몰랐음</button><button class="btn ghost" data-g="1">🤔 애매</button><button class="btn" data-g="2">😎 바로 떠오름</button></div>`; typeset();
        main.querySelectorAll("[data-g]").forEach(b=>b.onclick=()=>{ const g=Number(b.dataset.g); const st=s[r.f]||{n:0}; const days=g===0?0.5:g===1?Math.max(1,st.n*1.5):[1,3,7,14,30,60][Math.min(5,st.n)]; s[r.f]={n:g===0?0:st.n+1,due:Date.now()+days*864e5}; store.set("srs",s); i++; card(); }); }; }
    card();
  }

  // ---------- 시험 전 훑기 ----------
  function exam(id){
    const chk=store.get("exam",{});
    if(!id) return render(`<div class="crumb"><a href="#/">홈</a> › 중간·기말 전 훑기</div><h1>📝 중간·기말고사 전 훑기</h1><p class="lead">시험 범위의 핵심을 한 줄씩 체크합니다. 막히는 줄은 소단원으로 바로 이어집니다. 학교마다 범위가 다르니 단원으로 맞춰 보세요.</p><div class="grid wide">${D.exam.map(e=>{const d=(chk[e.id]||[]).filter(Boolean).length; return `<a class="card link" href="#/exam/${e.id}">${tag(e.grade)}<h3>${e.title}</h3><p class="muted">${e.range}</p><div class="progress"><i style="width:${d/e.items.length*100}%"></i></div><p class="muted">${d}/${e.items.length} 확인</p></a>`;}).join("")}</div>`);
    const e=D.exam.find(x=>x.id===id); if(!e) return notFound(); const st=chk[id]||[];
    render(`<div class="crumb"><a href="#/exam">시험 전 훑기</a> › ${e.title}</div>${tag(e.grade)}<h1>${e.title}</h1><p class="lead">${e.range}</p><div class="progress"><i id="pb" style="width:${st.filter(Boolean).length/e.items.length*100}%"></i></div>
    <ul class="check">${e.items.map((it,i)=>{const l=byLesson(it.l); return `<li class="${st[i]?"done":""}"><input type="checkbox" data-i="${i}" ${st[i]?"checked":""}><span>${md(it.t)}</span> ${l?`<a href="#/study/${l.unit}/${l.id}" style="white-space:nowrap">📘 ${l.title}</a>`:""}</li>`;}).join("")}</ul>
    <div class="box">전부 체크했다면 <a href="#/diagnostic">진단</a>으로 실제로 풀리는지 확인하고, 틀린 것은 <a href="#/notes">오답 노트</a>에 모입니다.</div>`);
    main.querySelectorAll(".check input").forEach(c=>c.addEventListener("change",()=>{ st[Number(c.dataset.i)]=c.checked; chk[id]=st; store.set("exam",chk); c.closest("li").classList.toggle("done",c.checked); $("#pb").style.width=st.filter(Boolean).length/e.items.length*100+"%"; }));
  }

  // ---------- 생활 속 수학 / 인물 ----------
  function life(){ render(`<div class="crumb"><a href="#/">홈</a> › 생활 속 수학</div><h1>🌍 생활 속 수학</h1><p class="lead">교과서 밖에서 같은 공식이 어떻게 쓰이는지. ${D.life.length}편.</p><div class="grid wide">${D.life.map(x=>`<div class="card"><span class="tag">${x.tag}</span> <a class="tag" href="#/roadmap/${x.node}">🗺 ${nodeOf(x.node).label}</a><h3>${x.title}</h3><p>${md(x.body)}</p></div>`).join("")}</div>`); }
  function people(){ render(`<div class="crumb"><a href="#/">홈</a> › 수학 인물</div><h1>👤 수학 인물</h1><p class="lead">이 범위의 공식 뒤에 있는 사람들. 시대순.</p><div class="grid wide">${D.people.map(p=>{const l=byLesson(p.link); return `<div class="card"><div class="eyebrow">${p.years}</div><h3>${p.name}</h3><p>${md(p.body)}</p>${l?`<a href="#/study/${l.unit}/${l.id}">📘 ${l.title}</a>`:""} · <a href="#/roadmap/${p.node}">🗺 ${nodeOf(p.node).label}</a></div>`;}).join("")}</div>`); }

  // ---------- 오답 노트 ----------
  function notes(){ const n=store.get("notes",[]); render(`<div class="crumb"><a href="#/">홈</a> › 오답 노트</div><h1>📒 내 오답 노트</h1><p class="lead">소단원 퀴즈에서 틀린 문제가 자동으로 모입니다. 이 브라우저에만 저장되며, 아래에서 내보내기(JSON)·지우기를 할 수 있습니다.</p>
    <div class="row"><button class="btn ghost" id="exp">내보내기</button><button class="btn ghost" id="clr">모두 지우기</button></div>
    ${n.length?`<table><tr><th>날짜</th><th>문제</th><th>소단원</th></tr>${n.map(x=>{const l=byLesson(x.key.replace("lesson:","")); return `<tr><td>${new Date(x.when).toLocaleDateString("ko")}</td><td>${esc(x.q)}</td><td>${l?`<a href="#/study/${l.unit}/${l.id}">${l.title}</a>`:""}</td></tr>`;}).join("")}</table>`:`<p class="muted">아직 비어 있습니다. <a href="#/study">소단원 퀴즈</a>를 풀어 보세요.</p>`}`);
    $("#exp").onclick=()=>{ const blob=new Blob([JSON.stringify({notes:n,quiz:store.get("quiz",{}),diag:store.get("diag",[]),srs:store.get("srs",{}),exam:store.get("exam",{})},null,2)],{type:"application/json"}); const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="my-math-record.json"; a.click(); };
    $("#clr").onclick=()=>{ if(confirm("오답 노트를 비울까요?")){store.set("notes",[]);notes();} }; }

  // ---------- 검색 ----------
  function search(q){ q=(q||"").trim().toLowerCase(); if(!q) return render(`<h1>검색</h1>`);
    const L=lessonsAll.filter(l=>(l.title+l.concept.join(" ")).toLowerCase().includes(q)); const F=D.formulas.filter(f=>(f.title+f.tex).toLowerCase().includes(q)); const Cc=D.concepts.filter(c=>(c.term+c.def+c.en).toLowerCase().includes(q)); const Lf=D.life.filter(x=>(x.title+x.body).toLowerCase().includes(q)); const P=D.people.filter(p=>(p.name+p.body).toLowerCase().includes(q));
    render(`<h1>🔍 "${esc(q)}" 검색 결과</h1>${L.length?`<h2>소단원</h2><ul>${L.map(l=>`<li><a href="#/study/${l.unit}/${l.id}">${l.title}</a> <span class="muted">${l.unitTitle}</span></li>`).join("")}</ul>`:""}${F.length?`<h2>공식</h2><ul>${F.map(f=>`<li><a href="#/formulas/${f.id}">${f.title}</a></li>`).join("")}</ul>`:""}${Cc.length?`<h2>개념</h2><ul>${Cc.map(c=>`<li><b>${c.term}</b> — ${md(c.def)}</li>`).join("")}</ul>`:""}${Lf.length?`<h2>생활 속 수학</h2><ul>${Lf.map(x=>`<li><a href="#/life">${x.title}</a></li>`).join("")}</ul>`:""}${P.length?`<h2>인물</h2><ul>${P.map(p=>`<li><a href="#/people">${p.name}</a></li>`).join("")}</ul>`:""}${!(L.length+F.length+Cc.length+Lf.length+P.length)?`<p class="muted">결과가 없습니다.</p>`:""}`); }
  $("#q").addEventListener("keydown",e=>{ if(e.key==="Enter"){ location.hash="#/search?q="+encodeURIComponent(e.target.value); } });

  function about(){ render(`<h1>사이트 소개</h1><div class="card"><p><b>중등수학 만지기</b>는 중학교 2학년 2학기부터 3학년까지의 수학을 "외우기 전에 먼저 만져 보는" 방식으로 익히는 무료·오픈소스 학습 사이트입니다. 로그인·결제가 없고, 학습 기록은 사용자의 브라우저(localStorage)에만 저장됩니다.</p>
    <h3>단원 체계의 근거</h3><p>교육부 고시 2022 개정 수학과 교육과정(중학교 2·3학년 영역: 수와 연산, 변화와 관계, 도형과 측정, 자료와 가능성)의 성취기준을 따르며, 2015 개정 교육과정과 공통인 범위(이등변삼각형·사각형·닮음·피타고라스·확률 / 제곱근·인수분해·이차방정식·이차함수 / 삼각비·원·통계)를 다룹니다. 상자그림은 2022 개정에서 중3 통계에 추가된 내용입니다. 학교별 진도·범위는 교과서 차례로 확인하세요.</p>
    <h3>기술</h3><p>정적 HTML/CSS/JS, 수식 렌더링은 KaTeX(MIT), 위젯은 순수 Canvas 2D. 빌드 도구 없이 GitHub Pages 에서 그대로 동작합니다. 콘텐츠는 <code>data/*.js</code> 파일을 고치면 바로 반영됩니다.</p>
    <h3>저작권</h3><p>본문·문항·위젯 코드는 이 저장소의 저작자가 작성했으며 MIT 라이선스로 공개합니다. 사이트 구조(개념 지도·공식 되살리기·끊긴 고리 진단 등)는 공개된 수학 학습 사이트들의 접근 방식을 참고하되 텍스트·코드·이미지를 복제하지 않았습니다. 인물 정보는 일반적으로 알려진 수학사 사실에 근거합니다.</p>
    <h3>검증</h3><p>모든 문항의 정답·풀이는 작성 후 재검산했고, 위젯의 기하(원주각 = 중심각의 절반, 무게중심 2:1, 합차 공식의 넓이 보존, 상대도수의 수렴 등)는 수치 판독값으로 확인됩니다. 오류를 발견하면 GitHub 이슈로 알려 주세요.</p><h3>기여</h3><p>오류 제보와 문항·위젯 추가는 GitHub 이슈/PR 로 환영합니다. README 의 "콘텐츠 추가 방법" 을 참고하세요.</p></div>`); }
  function notFound(){ render(`<h1>페이지를 찾을 수 없습니다</h1><a href="#/">홈으로</a>`); }

  // ---------- 라우터 ----------
  function route(){
    const h=location.hash.replace(/^#\/?/,""); const [path,qs]=h.split("?"); const p=path.split("/").filter(Boolean);
    const r=p[0]||"";
    if(r==="") return home();
    if(r==="study") return p[2]?lesson(p[1],p[2]):p[1]?unit(p[1]):study();
    if(r==="roadmap") return roadmap(p[1]);
    if(r==="formulas") return p[1]?formula(p[1]):formulas(qs);
    if(r==="ecosystem") return ecosystem();
    if(r==="diagnostic") return diagnostic(p[1]);
    if(r==="lab") return lab(p[1]);
    if(r==="slides") return slides(p[1]);
    if(r==="play") return play(p[1]);
    if(r==="concepts") return concepts(qs);
    if(r==="recall") return recall(p[1]);
    if(r==="exam") return exam(p[1]);
    if(r==="life") return life();
    if(r==="people") return people();
    if(r==="notes") return notes();
    if(r==="search") return search(decodeURIComponent((new URLSearchParams(qs||"")).get("q")||""));
    if(r==="about") return about();
    notFound();
  }
  window.addEventListener("hashchange",route);
  // 모바일 메뉴
  $("#navtoggle").onclick=()=>$("#nav").classList.toggle("open");
  window.addEventListener("hashchange",()=>$("#nav").classList.remove("open"));
  // 테마
  const th=store.get("theme",null); if(th) document.documentElement.dataset.theme=th;
  $("#theme").onclick=()=>{ const cur=document.documentElement.dataset.theme==="dark"?"light":"dark"; document.documentElement.dataset.theme=cur; store.set("theme",cur); };
  // KaTeX 가 늦게 로드될 수 있으므로 로드 후 한 번 더 조판
  window.addEventListener("load",()=>setTimeout(typeset,50));
  route();
})();
