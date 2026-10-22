/* TAD 수학 만지기 — 단일 페이지 앱 (해시 라우터). 빌드 도구 없이 GitHub Pages 에서 그대로 동작합니다. */
(function(){
  const D = window.DATA, $ = s=>document.querySelector(s), main = $("#main");
  // 학년 체계 (2022 개정): 중1 ~ 고3. 순서가 곧 학습 순서.
  const G = { m11:"중1-1", m12:"중1-2", m21:"중2-1", g22:"중2-2", g31:"중3-1", g32:"중3-2", h11:"고1 공통수학1", h12:"고1 공통수학2", h2a:"고2 대수", h2c:"고2 미적분Ⅰ", h2p:"고2 확률과 통계", h3c:"고3 미적분Ⅱ", h3g:"고3 기하" };
  const GORDER = Object.keys(G); const gradeRank = g=>GORDER.indexOf(g);
  const BAND = { m11:"중학교", m12:"중학교", m21:"중학교", g22:"중학교", g31:"중학교", g32:"중학교", h11:"고등학교", h12:"고등학교", h2a:"고등학교", h2c:"고등학교", h2p:"고등학교", h3c:"고등학교", h3g:"고등학교" };
  D.curriculum.grades = G;
  D.curriculum.units = [...D.curriculum.units, ...(D.curriculumExtra||[])].sort((a,b)=>gradeRank(a.grade)-gradeRank(b.grade));
  // 시험 문항 그림·보기(data/exam-figs.js): 학교 시험 필수 문제 + 수능 패턴 도감
  (D.schoolExams||[]).forEach(e=>e.items.forEach((it,i)=>{ const x=(D.schoolExamExtra||{})[e.grade+":"+e.term+":"+i]; if(!x) return; Object.assign(it,x); if(it.opts&&it.opts.length===5){ const k=(i*2+e.grade.length+(e.term==="mid"?0:e.term==="final"?3:1))%5; it.opts=it.opts.map((_,j)=>it.opts[(j+k)%5]); it.a=(it.a-k+5)%5; } }));
  (D.suneung?D.suneung.patterns:[]).forEach(x=>{ const f=(D.patternFigs||{})[x.id]; if(f) Object.assign(x,f); });
  // 공식이 태어나는 이야기(data/stories-*.js): 아직 없는 소단원에 붙임
  D.curriculum.units.forEach(u=>u.lessons.forEach(l=>{ if(!l.story&&(D.stories||{})[l.id]) l.story=D.stories[l.id]; }));
  // 2차 심화(data/deepen-*.js): 오개념·출제 포인트·심화 퀴즈를 기존 항목 뒤에 이어 붙임
  D.curriculum.units.forEach(u=>u.lessons.forEach(l=>{ const d=(D.deepen||{})[l.id]; if(!d) return; if(d.pitfalls) l.pitfalls=[...(l.pitfalls||[]),...d.pitfalls]; if(d.points) l.points=[...(l.points||[]),...d.points]; if(d.quiz) l.quiz=[...l.quiz,...d.quiz]; if(d.concept) l.concept=[...l.concept,...d.concept]; }));
  const GCOL = g=>({m11:"m1",m12:"m1",m21:"m21",g22:"g22",g31:"g31",g32:"g32",h11:"h1",h12:"h1",h2a:"h2",h2c:"h2",h2p:"h2",h3c:"h3",h3g:"h3"})[g]||g; // 색상용 열 id
  const lessonsAll = []; D.curriculum.units.forEach(u=>u.lessons.forEach(l=>lessonsAll.push({...l, unit:u.id, grade:u.grade, unitTitle:u.title})));
  const byLesson = id=>lessonsAll.find(l=>l.id===id);
  const byUnit = id=>D.curriculum.units.find(u=>u.id===id);
  const byFormula = id=>D.formulas.find(f=>f.id===id);
  const nodeOf = id=>D.roadmap.nodes.find(n=>n.id===id);
  const lessonsOfNode = id=>lessonsAll.filter(l=>l.node===id);

  // ---------- 저장소 (브라우저 로컬) ----------
  const store = {
    get(k,d){ try{ return JSON.parse(localStorage.getItem("imm:"+k)) ?? d; }catch(e){ return d; } },
    set(k,v){ try{ localStorage.setItem("imm:"+k, JSON.stringify(v)); if(k!=="theme"&&window.SYNC) window.SYNC.onChange(); }catch(e){} }
  };

  // ---------- 유틸 ----------
  const esc = s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const MF = t=>(window.MF||(x=>x))(esc(t));
  const md = s=>esc(s).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>");
  // 긴 공식(세미콜론·쉼표로 나열된 식)은 줄을 나눠 표시 — 좁은 화면 대비
  const texCard = t=>{ t=String(t); let parts=null;
    if(/;/.test(t)) parts=t.split(/\s*;\s*/);
    else if(/,\s*\\q?quad/.test(t)) parts=t.split(/,\s*\\q?quad\s*/).map((x,i,a)=>i<a.length-1?x+",":x);
    else if(t.length>48&&/,\\? /.test(t)){ const sp=t.split(/,\\? (?![^{]*\})/); if(sp.length>=2&&sp.every(x=>x.length<=48)) parts=sp.map((x,i)=>i<sp.length-1?x+",":x); }
    if(!parts&&t.length>36){ // 괄호 밖의 + − 앞에서 45자 안팎으로 나누기
      const toks=[]; let d=0,cur=""; for(const ch of t){ if(ch==="{"||ch==="(") d++; if(ch==="}"||ch===")") d--; if(d===0&&(ch==="+"||ch==="-")&&cur.length>12){ toks.push(cur); cur=""; } cur+=ch; } toks.push(cur);
      if(toks.length>=2){ parts=[]; let line=""; toks.forEach(tk=>{ if(line&&(line+tk).length>32){ parts.push(line); line=tk; } else line+=tk; }); parts.push(line); if(parts.length<2) parts=null; }
    }
    if(!parts||parts.length<2) return esc(t); return esc("\\begin{gathered}"+parts.join("\\\\")+"\\end{gathered}"); };
  const tag = g=>`<span class="tag ${GCOL(g)}">${G[g]||({m1:"중1",m21:"중2-1",h1:"고1",h2:"고2",h3:"고3"})[g]||g}</span>`;
  const ico = (code,cls="ico")=>`<img class="${cls}" src="assets/openmoji/${code}.svg" alt="" loading="lazy">`;
  const UNIT_ICON={u1:"1F53A",u2:"1F7E6",u3:"1F5FA",u4:"1F4D0",u5:"1F3B2",u6:"1F522",u7:"2716",u8:"1F9EE",u9:"1F4C8",u10:"1F3D4",u11:"2B55",u12:"1F4CA",m1u1:"1F9E9",m1u2:"1F321",m1u3:"1F524",m1u4:"2696",m1u5:"1F4CD",m1u6:"1F4CF",m1u7:"1F536",m1u8:"1F9CA",m1u9:"1F4CA",m2u1:"267B",m2u2:"1F522",m2u3:"2696",m2u4:"1F500",m2u5:"1F4C8",h1u1:"1F9EE",h1u2:"1F9EC",h1u3:"1F3B2",h1u4:"1F5C2",h1u5:"1F4CD",h1u6:"1F300",h1u7:"1F517",h2u1:"1F4C8",h2u2:"1F3A1",h2u3:"1F9F1",h2u4:"267E",h2u5:"1F3CE",h2u6:"1F30A",h2u7:"1F3B2",h2u8:"1F4CA",h3u1:"267E",h3u2:"1F680",h3u3:"1F30A",h3u4:"1FA90",h3u5:"27A1",h3u6:"1F9CA"};
  const SEC_ICON={study:"1F4D8",roadmap:"1F5FA",formulas:"1F4D0",bridge:"1F517",mix:"1F500",eco:"1F310",diag:"1F9ED",lab:"1F52C",slides:"1F39E",play:"1F3AE",concepts:"1F4D6",recall:"1F9E0",exam:"1F4DD",life:"1F30D",people:"1F3DB",notes:"1F4D2"};
  function typeset(){ if(window.renderMathInElement) renderMathInElement(main,{delimiters:[{left:"$$",right:"$$",display:true},{left:"$",right:"$",display:false}],throwOnError:false}); fitFormulas(); setTimeout(fitFormulas,250); }
  // 좁은 화면에서 긴 수식이 잘리지 않도록 글자 크기를 자동으로 줄인다 (최소 60%), 그래도 넘치면 가로 스크롤
  function fitFormulas(){ main.querySelectorAll(".formula").forEach(box=>{ const k=box.querySelector(".katex-display")||box.querySelector(".katex"); if(!k) return; box.style.fontSize=""; const cs=getComputedStyle(box); const avail=box.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight); const need=k.scrollWidth||k.getBoundingClientRect().width; if(avail>0&&need>avail){ const r=Math.max(0.68,avail/need*0.96); box.style.fontSize=(parseFloat(cs.fontSize)*r)+"px"; } }); }
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(()=>setTimeout(fitFormulas,50));
  window.addEventListener("resize",()=>{ clearTimeout(window.__fitT); window.__fitT=setTimeout(fitFormulas,150); });
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
      <span class="qn">Q${i+1}${i>=2?' <em>심화</em>':''}${q.tag?` <em>${q.tag}</em>`:''}</span> ${md(q.q)}
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
      <div class="hero-art">${["1F4D0","2B55","1F4C8","1F3B2","1F9EE","1F53A"].map(c=>ico(c,"ico float")).join("")}</div>
      <div class="eyebrow">중1 ~ 고3 · 무료 · 오픈소스 · 로그인으로 기록 이어하기</div>
      <h1>수학, 외우기 전에 먼저 만져 보세요</h1>
      <p class="lead">중1 소인수분해부터 고3 미적분·기하까지 한 장의 개념 지도로 이어집니다. 개념마다 손으로 밀고 당기는 판, 공식이 태어나는 이야기, 오개념과 출제 포인트. 왜 그런지를 본 공식은 잊어도 다시 만들 수 있습니다.</p>
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
    <h2>🔗 개념이 만나는 자리</h2><p class="muted">한 문제에 두세 단원. 풀이 단계마다 어느 개념을 썼는지 보이는 '다리 문제' ${D.bridge.length}편.</p>
    <div class="grid wide">${D.bridge.slice(0,3).map(b=>`<a class="card link ${GCOL(b.grade)}" href="#/bridge/${b.id}">${tag(b.grade)}<h3>${b.title}</h3><div class="chain">${b.nodes.map(n=>`<span class="chip">${nodeOf(n).label}</span>`).join('<span class="arr">+</span>')}</div></a>`).join("")}</div>
    <div class="row" style="margin:10px 0 4px"><a class="btn ghost sm" href="#/bridge">전체 보기 →</a></div>
    <div class="card evidence"><div class="eyebrow">🔬 학습 과학에 근거한 네 가지 장치</div><div class="grid" style="margin-top:8px">
      <div><h4>🔀 섞어 풀기</h4><p class="muted">단원을 섞어 '어느 개념인지' 부터 고르게 합니다. 7학년 787명 무작위 실험에서 한 달 뒤 시험 61% vs 38% (Rohrer 외, 2020).</p><a href="#/mix">오늘의 6문제 →</a></div>
      <div><h4>🧠 간격 반복</h4><p class="muted">공식을 하루·3일·일주일 간격으로 다시 묻습니다. 벼락치기보다 장기 기억에 2배 이상 효과(Dunlosky 외, 2013 '높은 효용').</p><a href="#/recall">암기 카드 →</a></div>
      <div><h4>📖 이야기로 유도</h4><p class="muted">공식이 왜 그 모양인지 역사와 그림으로 먼저 봅니다. 유도를 본 공식은 잊어도 다시 만들 수 있습니다.</p><a href="#/study/u8/quadratic-eq">근의 공식 이야기 →</a></div>
      <div><h4>⚠️ 오개념 먼저</h4><p class="muted">소단원마다 '가장 많이 틀리는 지점' 을 먼저 보여 줍니다. 틀린 문제는 자동으로 오답 노트에.</p><a href="#/notes">오답 노트 →</a></div>
    </div></div>
    <h2>학기별로 바로 가기</h2>
    <div class="pill-row">${GORDER.map(g=>`<a class="pill" href="#/study">${G[g]} ${D.curriculum.units.filter(u=>u.grade===g).length}</a>`).join("")}</div>
    <div class="grid">${D.curriculum.units.filter(u=>["g22","g31","g32"].includes(u.grade)).map(u=>`<a class="card link unit ${GCOL(u.grade)}" href="#/study/${u.id}">${ico(UNIT_ICON[u.id]||"1F4D8","ico big")}<div>${tag(u.grade)}</div><h3>${u.title}</h3><p class="muted">${u.desc}</p></a>`).join("")}</div>
    <p class="muted">중1·중2-1·고1~고3 단원은 <a href="#/study">수학 학습</a>에서. 중2-2~중3-2 가 가장 깊게 구성되어 있고 나머지 학년은 핵심 소단원부터 채워 가는 중입니다.</p>
    <h2>더 둘러보기</h2>
    <div class="grid">
      <a class="card link" href="#/patterns">${ico("1F9ED")}<h3>수능 패턴 도감</h3><p class="muted">10년간 해마다 나온 ${D.suneung.patterns.length}가지 구조 — 신호·첫 수·동형 문제 3단계 풀이, 패턴 알아맞히기.</p></a>
      <a class="card link" href="#/nonsul">${ico("1F393")}<h3>대학별 수리논술</h3><p class="muted">연세·고려·성균관·한양·중앙 등 ${D.nonsul.univs.length}개 대학(군)의 10년 출제 경향 + 동형 서술형 문제 · 모범 답안 · 채점 루브릭 · 답안 쓰기 트레이너.</p></a>
      <a class="card link" href="#/olympiad">${ico("1F3C5")}<h3>올림피아드 퀴즈</h3><p class="muted">KMO·KJMO·AMC 에서 되풀이되는 '생각의 기술' ${D.olympiad.items.length}문제 — 비둘기집·홀짝·색칠·보조선. 힌트 3단계, 메달 수집.</p></a>
      <a class="card link" href="#/schooltest">${ico("1F3EB")}<h3>학교 시험 필수 문제</h3><p class="muted">학년·학기별 중간·기말·학력평가에서 꼭 나오는 ${D.schoolExams.reduce((a,e)=>a+e.items.length,0)}문항과 서술형 풀이.</p></a>
      <a class="card link" href="#/daily">${ico("1F3C6")}<h3>하루 10분 코스</h3><p class="muted">암기 3장 → 섞어 풀기 6문제 → 이야기 1편. 연속 일수 도장.</p></a>
      <a class="card link" href="#/essay">${ico("1F4A1")}<h3>서술형·증명·자기설명</h3><p class="muted">먼저 쓰고, 모범 답안과 비교하고, 채점 기준으로 자기 채점. ${D.essay.length}편.</p></a>
      <a class="card link" href="#/formulas">${ico(SEC_ICON.formulas)}<h3>공식 사전</h3><p class="muted">${D.formulas.length}편 중 정말 외울 것은 ${nCore}편. 나머지는 유도 한 줄.</p></a>
      <a class="card link" href="#/recall">${ico(SEC_ICON.recall)}<h3>공식 암기법</h3><p class="muted">기억 장치 + 간격 반복 카드. 내일 다시 묻습니다.</p></a>
      <a class="card link" href="#/exam">${ico(SEC_ICON.exam)}<h3>중간·기말 전 훑기</h3><p class="muted">시험 범위를 한 줄씩 체크. 6개 시험.</p></a>
      <a class="card link" href="#/slides">${ico(SEC_ICON.slides)}<h3>수업 슬라이드</h3><p class="muted">10분 수업용 ${D.slides.length}편. 교실에서 바로 띄우기.</p></a>
      <a class="card link" href="#/play">${ico(SEC_ICON.play)}<h3>플레이</h3><p class="muted">공식 짝 맞추기, 인수분해 러시, 삼각비 플래시…</p></a>
      <a class="card link" href="#/ecosystem">${ico(SEC_ICON.eco)}<h3>수학의 생태계</h3><p class="muted">개념·공식·인물·쓰임이 한 장으로.</p></a>
      <a class="card link" href="#/life">${ico(SEC_ICON.life)}<h3>생활 속 수학</h3><p class="muted">TV 인치, 피자 L, 로또, 경사로 8%.</p></a>
      <a class="card link" href="#/people">${ico(SEC_ICON.people)}<h3>수학 인물</h3><p class="muted">탈레스부터 튜키까지 ${D.people.length}명.</p></a>
    </div>
    <div class="box"><b>보호자·선생님께</b> — 이 사이트는 문제를 많이 푸는 곳이 아니라 왜 그런지를 손으로 만져 이해하는 곳입니다. 진단은 「중2 부족」이 아니라 「인수분해에서 끊김」처럼 개념 하나를 가리키고, 그 소단원으로 바로 이어집니다. 모든 기능이 무료이며 학습 기록은 이 브라우저에만 저장됩니다.</div>`);
    window.WIDGETS.quadratic.render($("#home-widget"));
  }

  // ---------- 수학 학습 ----------
  function study(){
    const prog=store.get("quiz",{});
    const done=l=>{ const keys=Object.keys(prog).filter(k=>k.startsWith("lesson:"+l.id+"#")); return keys.length? Math.round(100*keys.filter(k=>prog[k]).length/l.quiz.length):0; };
    const bands=[["중학교",GORDER.filter(g=>BAND[g]==="중학교")],["고등학교",GORDER.filter(g=>BAND[g]==="고등학교")]];
    render(`<div class="crumb"><a href="#/">홈</a> › 수학 학습</div><h1>${ico(SEC_ICON.study,"ico")} 수학 학습 <span class="muted" style="font-size:1rem">중1 ~ 고3 · ${D.curriculum.units.length}단원 ${lessonsAll.length}소단원</span></h1><p class="lead">소단원마다 핵심 개념 → 왜 그런지 → (공식이 태어나는 이야기) → 오개념 → 출제 포인트 → 공식 → 예제 → 퀴즈 → 이 개념의 자리 순서로 이어집니다. 중2-2~중3-2 는 가장 깊게, 다른 학년은 핵심 소단원 중심으로 구성되어 있으며 계속 확장됩니다.</p>
    <div class="pill-row">${GORDER.map(g=>`<a class="pill" href="#g-${g}">${G[g]}</a>`).join("")}</div>
    ${bands.map(([bn,gs])=>`<h2 style="margin-top:1.6em">${bn}</h2>`+gs.map(g=>{ const us=D.curriculum.units.filter(u=>u.grade===g); return us.length?`<h3 id="g-${g}">${tag(g)} ${G[g]} <span class="muted" style="font-weight:400;font-size:.9rem">${us.length}단원 · ${us.reduce((a,u)=>a+u.lessons.length,0)}소단원</span></h3><div class="grid wide">${us.map(u=>`<div class="card ${GCOL(u.grade)}">${ico(UNIT_ICON[u.id]||"1F4D8","ico big")}<h3><a href="#/study/${u.id}">${u.title}</a></h3><p class="muted">${u.desc}</p><ol style="padding-left:18px;margin:0">${u.lessons.map(l=>`<li><a href="#/study/${u.id}/${l.id}">${l.title}</a> <span class="muted" style="font-size:.8rem">${done(l)?`퀴즈 ${done(l)}%`:""}</span></li>`).join("")}</ol></div>`).join("")}</div>`:""; }).join("")).join("")}
    <h2>🌿 줄기로 보기</h2><p class="muted">학년은 꼬리표일 뿐입니다. 개념의 선후관계로 한 줄에 세우면 이렇게 됩니다.</p>
    ${[["geo","도형과 측정"],["alg","변화와 관계"],["num","수와 연산"],["stat","자료와 가능성"]].map(([st,n])=>`<div class="box"><b>${n}</b> — ${D.roadmap.nodes.filter(x=>x.strand===st&&x.unit).map(x=>`<a href="#/study/${x.unit}">${x.label}</a>`).join(" → ")}</div>`).join("")}`);
    main.querySelectorAll('a[href^="#g-"]').forEach(a=>a.onclick=e=>{ e.preventDefault(); const t=document.getElementById(a.getAttribute("href").slice(1)); if(t) t.scrollIntoView({behavior:"smooth"}); });
  }
  function unit(id){
    const u=byUnit(id); if(!u) return notFound();
    render(`<div class="lhead ${GCOL(u.grade)}"><div class="crumb"><a href="#/">홈</a> › <a href="#/study">수학 학습</a> › ${G[u.grade]}</div><div class="row">${ico(UNIT_ICON[u.id]||"1F4D8","ico hero")}<div>${tag(u.grade)}<h1>${u.title}</h1><p class="lead">${u.desc}</p></div></div></div>
    <div class="grid wide">${u.lessons.map((l,i)=>`<a class="card link" href="#/study/${u.id}/${l.id}"><div class="eyebrow">소단원 ${i+1}</div><h3>${l.title}</h3><p class="muted">${teaser(l.concept[0],70)}</p><div>${l.formulas.map(f=>byFormula(f)?`<span class="tag">📐 ${byFormula(f).title}</span>`:"").join("")}</div></a>`).join("")}</div>
    <h2>이 단원과 이어진 것</h2><div class="row">${[...new Set(u.lessons.map(l=>l.node))].map(n=>`<a class="btn ghost sm" href="#/roadmap/${n}">🗺 ${nodeOf(n).label} 의 자리</a>`).join("")}${Object.values(window.WIDGETS).some(w=>u.lessons.some(l=>l.node===w.node))?`<a class="btn ghost sm" href="#/lab">🔬 관련 위젯</a>`:""}<a class="btn ghost sm" href="#/exam">📝 시험 전 훑기</a></div>`);
  }
  // 도해: 소단원/공식에 붙는 그림 (data/lesson-figs.js + js/figures.js)
  function figOf(id){ const m=(D.lessonFigs||{})[id]; if(!m||!window.FIG||!window.FIG[m.fig]) return ""; try{ return `<figure class="lfig"><div class="figwrap">${window.FIG[m.fig](m.p||{})}</div>${m.cap?`<figcaption>${md(m.cap)}</figcaption>`:""}</figure>`; }catch(e){ console.warn("fig",id,e); return ""; } }
  // 수식($…$)을 중간에서 자르지 않는 요약문
  function teaser(t,n){ t=String(t).replace(/\*\*/g,""); if(t.length<=n) return md(t); let cut=n; const before=t.slice(0,cut); const dollars=(before.match(/\$/g)||[]).length; if(dollars%2===1) cut=before.lastIndexOf("$"); const sp=t.lastIndexOf(" ",cut); if(sp>n*0.6) cut=sp; return md(t.slice(0,cut).trim())+"…"; }
  function figAny(x,cls="lfig"){ if(!x||!x.fig||!window.FIG||!window.FIG[x.fig]) return ""; try{ return `<figure class="${cls}"><div class="figwrap">${window.FIG[x.fig](x.figp||{})}</div></figure>`; }catch(e){ console.warn("fig",x.fig,e); return ""; } }
  function figOfFormula(f){ if(f.fig&&window.FIG&&window.FIG[f.fig]){ try{ return `<figure class="lfig"><div class="figwrap">${window.FIG[f.fig](f.figp||{})}</div>${f.figcap?`<figcaption>${md(f.figcap)}</figcaption>`:""}</figure>`; }catch(e){} } const l=lessonsAll.find(l=>l.formulas.includes(f.id)&&(D.lessonFigs||{})[l.id]); return l?figOf(l.id):""; }
  function lesson(uid,lid){
    const u=byUnit(uid), l=byLesson(lid); if(!u||!l) return notFound();
    const idx=u.lessons.findIndex(x=>x.id===lid); const prev=u.lessons[idx-1], next=u.lessons[idx+1];
    const node=nodeOf(l.node); const pre=preds(l.node).map(nodeOf), post=succs(l.node).map(nodeOf);
    const widgets=Object.entries(window.WIDGETS).filter(([k,w])=>w.node===l.node);
    const lifeItems=D.life.filter(x=>x.node===l.node).slice(0,3); const ppl=D.people.filter(p=>p.link===l.id||p.node===l.node).slice(0,2);
    render(`<div class="lhead ${GCOL(u.grade)}"><div class="crumb"><a href="#/">홈</a> › <a href="#/study">수학 학습</a> › <a href="#/study/${u.id}">${u.title}</a></div>${tag(u.grade)} <span class="tag">소단원 ${idx+1}/${u.lessons.length}</span><h1>${l.title}</h1><p class="lead">${teaser(l.concept[0],90)}</p></div>
    <div class="pill-row">${[["c","핵심 개념"],["why","왜 그런지"],["story","이야기"],["pit","오개념"],["pt","출제 포인트"],["f","공식"],["ex","예제"],["quiz","퀴즈"],["bridge","개념 연결"],["place","개념의 자리"]].map(([k,n])=>`<button class="pill" data-to="${k}">${n}</button>`).join("")}</div>
    <h2 id="c">핵심 개념</h2><div class="concept-row"><ul>${l.concept.map(c=>`<li>${md(c)}</li>`).join("")}</ul>${figOf(l.id)}</div>
    <h2 id="why">왜 그런지</h2><div class="box">${md(l.why)}</div>
    ${l.story?`<h2 id="story">📖 공식이 태어나는 이야기</h2><p class="muted">외우기 전에 읽는 서너 문단. 어디서 왔고 왜 그 모양인지 알면 공식은 저절로 나옵니다.</p><div class="story">${l.story.map((st,i)=>`<div class="st"><div class="st-n">${i+1}</div><div><h4>${md(st.h)}</h4><p>${md(st.t)}</p></div></div>`).join("")}</div>`:""}
    ${l.pitfalls?`<h2 id="pit">⚠️ 흔한 오개념 · 함정</h2><ul class="pit">${l.pitfalls.map(c=>`<li>${md(c)}</li>`).join("")}</ul>`:""}
    ${l.points?`<h2 id="pt">🎯 출제 포인트</h2><ul class="pt">${l.points.map(c=>`<li>${md(c)}</li>`).join("")}</ul>`:""}
    ${widgets.length?`<h2>만져 보기</h2>${widgets.map(([k,w])=>`<div class="widget" id="w-${k}"><b>${MF(w.title)}</b><p class="muted">${MF(w.desc)}</p></div>`).join("")}`:""}
    ${l.formulas.length?`<h2 id="f">이 단원의 공식</h2><div class="grid">${l.formulas.map(f=>byFormula(f)).filter(Boolean).map(f=>`<a class="card link" href="#/formulas/${f.id}"><h3>${f.title} ${f.core?'<span class="tag">외울 것</span>':'<span class="tag">되살릴 것</span>'}</h3><div class="formula">$${texCard(f.tex)}$</div></a>`).join("")}</div>`:""}
    <h2 id="ex">예제</h2><div class="card"><p><b>문제.</b> ${md(l.example.q)}</p><details class="sol"><summary>풀이 보기</summary><ol class="steps">${l.example.sol.map(s=>`<li>${md(s)}</li>`).join("")}</ol><p><b>답:</b> ${md(l.example.ans)}</p></details></div>
    <h2 id="quiz">확인 퀴즈</h2>${quizHtml(l.quiz,"lesson:"+l.id)}
    ${(()=>{const bs=D.bridge.filter(b=>b.nodes.includes(l.node)); return bs.length?`<h2 id="bridge">🔗 이 개념이 다른 단원과 만나는 문제</h2><div class="grid wide">${bs.map(b=>`<a class="card link ${GCOL(b.grade)}" href="#/bridge/${b.id}">${tag(b.grade)}<h3>${b.title}</h3><div class="chain">${b.nodes.map(n=>`<span class="chip">${nodeOf(n).label}</span>`).join('<span class="arr">+</span>')}</div></a>`).join("")}</div>`:"";})()}
    ${(()=>{const es=D.essay.filter(e=>e.lesson===l.id||e.node===l.node); return es.length?`<h2 id="essay">✍️ 서술형·증명</h2><div class="row">${es.map(e=>`<a class="btn ghost sm" href="#/essay/${e.id}">${e.title}</a>`).join("")}</div>`:"";})()}
    <h2 id="place">이 개념의 자리</h2>
    <div class="card"><p><b>${node.label}</b> 별에 닿는 길: ${pre.length?pre.map(n=>`<a href="#/roadmap/${n.id}">${n.label}</a>`).join(" · "):"(시작점)"} → <b>${node.label}</b> → ${post.length?post.map(n=>`<a href="#/roadmap/${n.id}">${n.label}</a>`).join(" · "):"(끝)"}</p><a class="btn sm ghost" href="#/roadmap/${l.node}">🗺 지도에서 보기</a></div>
    ${lifeItems.length||ppl.length?`<h2>이어서 보기</h2><div class="grid">${lifeItems.map(x=>`<a class="card link" href="#/life"><div class="eyebrow">🌍 생활 속 수학</div><h3>${x.title}</h3></a>`).join("")}${ppl.map(p=>`<a class="card link" href="#/people"><div class="eyebrow">👤 수학 인물</div><h3>${p.name}</h3><p class="muted">${p.years}</p></a>`).join("")}</div>`:""}
    <div class="row" style="margin-top:24px">${prev?`<a class="btn ghost" href="#/study/${u.id}/${prev.id}">← ${prev.title}</a>`:""}${next?`<a class="btn" href="#/study/${u.id}/${next.id}">${next.title} →</a>`:`<a class="btn" href="#/study">다음 단원 고르기 →</a>`}</div>`);
    widgets.forEach(([k,w])=>w.render($("#w-"+k)));
    main.querySelectorAll("[data-to]").forEach(b=>b.onclick=()=>{ const t=document.getElementById(b.dataset.to); if(t) t.scrollIntoView({behavior:"smooth",block:"start"}); });
  }

  // ---------- 개념 지도 ----------
  function roadmap(sel){
    if(sel&&!nodeOf(sel)) sel=null;
    const cols=D.roadmap.columns; const STR=[["num","수와 연산","#2f6fed"],["alg","변화와 관계","#7c3aed"],["geo","도형과 측정","#1f9d55"],["stat","자료와 가능성","#ff8a3d"]];
    const NW=140, NH=44, CW=166, GAP=10, LX=104, TOP=56;
    const wrap=t=>{ if(t.length<=9) return [t]; const seps=[...t.matchAll(/[·,]/g)].map(m=>m.index); let cut=-1; if(seps.length){ cut=seps.reduce((b,i)=>Math.abs(i-t.length/2)<Math.abs(b-t.length/2)?i:b,seps[0]); return [t.slice(0,cut+1).replace(/[·,]$/,"·"),t.slice(cut+1)]; } const m=t.match(/^(.+?[과와의] )(.+)$/); if(m) return [m[1].trim(),m[2]]; return [t.slice(0,Math.ceil(t.length/2)),t.slice(Math.ceil(t.length/2))]; };
    // 각 (열, 영역) 칸에 들어갈 노드 → 영역별 행 높이 = 가장 많이 쌓인 칸 기준
    const cell={}; D.roadmap.nodes.forEach(n=>{ const k=n.col+"|"+n.strand; (cell[k]=cell[k]||[]).push(n); });
    const rowH={}, rowY={}; let y=TOP; STR.forEach(([sid])=>{ const mx=Math.max(1,...cols.map(c=>(cell[c.id+"|"+sid]||[]).length)); rowH[sid]=mx*(NH+GAP)+26; rowY[sid]=y; y+=rowH[sid]; });
    const H=y+16, W=LX+cols.length*CW+24;
    const pos={}; D.roadmap.nodes.forEach(n=>{ const ci=cols.findIndex(c=>c.id===n.col); const list=cell[n.col+"|"+n.strand]; const k=list.indexOf(n); const stackH=list.length*(NH+GAP)-GAP; const y0=rowY[n.strand]+(rowH[n.strand]-stackH)/2; pos[n.id]=[LX+ci*CW+(CW-NW)/2, y0+k*(NH+GAP)]; });
    const up=sel?ancestors(sel):new Set(), down=sel?descendants(sel):new Set();
    const edgeCls=(a,b)=>{ if(!sel) return ""; if((up.has(a)||a===sel)&&(up.has(b)||b===sel)) return "on"; if((down.has(b)||b===sel)&&(down.has(a)||a===sel)) return "next"; return "dim"; };
    const path=(a,b)=>{ const [x1,y1]=pos[a],[x2,y2]=pos[b]; const sx=x1+NW, sy=y1+NH/2, ex=x2, ey=y2+NH/2; if(x2>x1){ const dx=Math.max(40,(ex-sx)/2); return `M${sx},${sy} C${sx+dx},${sy} ${ex-dx},${ey} ${ex},${ey}`; } // 같은 열: 옆으로 돌아 아래로
      const mx=x1+NW+18; return `M${sx},${sy} C${mx},${sy} ${mx},${ey} ${ex+NW},${ey}`; };
    const edges=D.roadmap.edges.map(([a,b])=>`<path class="edge ${edgeCls(a,b)}" data-a="${a}" data-b="${b}" d="${path(a,b)}"${edgeCls(a,b)==="on"||edgeCls(a,b)==="next"?' marker-end="url(#arr-'+edgeCls(a,b)+')"':""}/>`).join("");
    const bands=STR.map(([sid,name,c])=>`<rect class="band" x="0" y="${rowY[sid]}" width="${W}" height="${rowH[sid]}" fill="${c}" opacity="${STR.indexOf(STR.find(x=>x[0]===sid))%2?0.045:0.02}"/><text class="strand-h" x="14" y="${rowY[sid]+rowH[sid]/2+5}" fill="${c}">${name}</text>`).join("");
    const colLines=cols.map((c,i)=>`<line class="col-line" x1="${LX+i*CW}" y1="${TOP-8}" x2="${LX+i*CW}" y2="${H-10}"/>`).join("")+`<line class="col-line" x1="${LX+cols.length*CW}" y1="${TOP-8}" x2="${LX+cols.length*CW}" y2="${H-10}"/>`;
    const heads=cols.map((c,i)=>`<text class="col-h" x="${LX+i*CW+CW/2}" y="${TOP-22}" text-anchor="middle">${c.label}</text>`).join("");
    const nodes=D.roadmap.nodes.map(n=>{ const [x,yy]=pos[n.id]; const st=STR.find(s=>s[0]===n.strand); const state=sel?(n.id===sel?"on":up.has(n.id)?"up":down.has(n.id)?"down":"dim"):""; const nf=D.formulas.filter(f=>f.node===n.id).length; return `<g class="node ${state}" data-id="${n.id}" transform="translate(${x},${yy})" tabindex="0" role="button" aria-label="${n.label}"><rect width="${NW}" height="${NH}" rx="10"/><rect class="bar" x="0" y="6" width="4" height="${NH-12}" rx="2" fill="${st[2]}"/>${(()=>{const L=wrap(n.label); return L.length===1?`<text x="${NW/2+2}" y="${NH/2+4.5}" text-anchor="middle">${L[0]}</text>`:`<text x="${NW/2+2}" y="${NH/2-3}" text-anchor="middle">${L[0]}</text><text x="${NW/2+2}" y="${NH/2+11}" text-anchor="middle">${L[1]}</text>`;})()}${n.unit?`<text class="star" x="${NW-10}" y="${NH/2+4}" text-anchor="middle">★</text>`:""}</g>`; }).join("");
    const n=sel&&nodeOf(sel);
    const panel=n?`<div class="rm-panel"><div class="rm-panel-h">${tag(n.col==="m1"?"m11":n.col==="h2"?"h2a":n.col==="h3"?"h3c":n.col==="h1"?"h11":n.col)} <b>${n.label}</b> <button class="btn sm ghost" id="rm-close" aria-label="닫기">✕</button></div>
      <div class="rm-stats"><span><b class="o">●</b> 앞에 깔린 개념 ${up.size}</span><span><b class="b">●</b> 여기서 열리는 개념 ${down.size}</span>${D.formulas.filter(f=>f.node===sel).length?`<span>📐 공식 ${D.formulas.filter(f=>f.node===sel).length}</span>`:""}</div>
      ${preds(sel).length?`<p class="muted">← 바로 앞: ${preds(sel).map(p=>`<a href="#/roadmap/${p}">${nodeOf(p).label}</a>`).join(" · ")}</p>`:""}${succs(sel).length?`<p class="muted">→ 바로 다음: ${succs(sel).map(p=>`<a href="#/roadmap/${p}">${nodeOf(p).label}</a>`).join(" · ")}</p>`:""}
      <div class="row">${lessonsOfNode(sel).map(l=>`<a class="btn sm" href="#/study/${l.unit}/${l.id}">📘 ${l.title}</a>`).join("")}${n.unit?`<a class="btn sm ghost" href="#/study/${n.unit}">단원으로</a>`:""}${D.formulas.filter(f=>f.node===sel).length?`<a class="btn sm ghost" href="#/formulas?node=${sel}">📐 공식</a>`:""}</div></div>`:
      `<div class="rm-panel hint"><b>별 하나를 눌러 보세요.</b> 그 개념까지 오는 길(<b class="o">주황</b>)과 거기서 열리는 길(<b class="b">파랑</b>)만 남고 나머지는 흐려집니다. 예: <a href="#/roadmap/quadratic-eq">이차방정식</a> · <a href="#/roadmap/h-calc">극한·미분·적분</a> · <a href="#/roadmap/pythagoras">피타고라스</a></div>`;
    render(`<div class="crumb"><a href="#/">홈</a> › 개념 지도</div><h1>🗺 개념 지도</h1><p class="lead">가로는 학년, 세로는 네 영역. 개념 ${D.roadmap.nodes.length}개가 ${D.roadmap.edges.length}개의 길로 이어져 있습니다. ★ 는 바로 학습할 수 있는 개념.</p>
    ${panel}
    <div class="rm-tools"><div class="rm-legend">${STR.map(([sid,name,c])=>`<span><i style="background:${c}"></i>${name}</span>`).join("")}</div><div class="rm-zoom"><button class="btn sm ghost" data-z="-" aria-label="축소">−</button><button class="btn sm ghost" data-z="+" aria-label="확대">+</button><button class="btn sm ghost" data-z="fit">⤢ 전체 보기</button></div></div>
    <div class="map rm" id="rm"><div class="rm-inner" id="rm-inner"><svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" class="rm-svg"><defs><marker id="arr-on" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--acc2)"/></marker><marker id="arr-next" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--acc)"/></marker></defs>${bands}${colLines}${heads}<g class="edges">${edges}</g><g class="nodes">${nodes}</g></svg></div></div>
    <p class="muted" style="font-size:.85rem">드래그로 이동, +/− 로 확대·축소. 휴대폰은 가로로 돌리면 두 배쯤 커집니다.</p>`);
    // 상호작용: 클릭 → 선택, 호버 → 미리 강조
    const svg=main.querySelector(".rm-svg");
    main.querySelectorAll(".node").forEach(g=>{ g.addEventListener("click",()=>location.hash="#/roadmap/"+g.dataset.id); g.addEventListener("keydown",e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); location.hash="#/roadmap/"+g.dataset.id; } });
      g.addEventListener("mouseenter",()=>{ if(sel) return; const id=g.dataset.id; const u=ancestors(id), d=descendants(id); svg.classList.add("hover"); svg.querySelectorAll(".edge").forEach(e=>{ const a=e.dataset.a,b=e.dataset.b; e.classList.toggle("on",(u.has(a)||a===id)&&(u.has(b)||b===id)); e.classList.toggle("next",(d.has(b)||b===id)&&(d.has(a)||a===id)); }); svg.querySelectorAll(".node").forEach(x=>{ const k=x.dataset.id; x.classList.toggle("up",u.has(k)); x.classList.toggle("down",d.has(k)); x.classList.toggle("on",k===id); }); });
      g.addEventListener("mouseleave",()=>{ if(sel) return; svg.classList.remove("hover"); svg.querySelectorAll(".edge.on,.edge.next").forEach(e=>e.classList.remove("on","next")); svg.querySelectorAll(".node.up,.node.down,.node.on").forEach(x=>x.classList.remove("up","down","on")); }); });
    const close=$("#rm-close"); if(close) close.onclick=()=>location.hash="#/roadmap";
    // 확대·축소·이동
    const box=$("#rm"), inner=$("#rm-inner"); let z=1; const fit=()=>{ z=Math.max(0.55,Math.min(1,(box.clientWidth-16)/W)); apply(); }; const apply=()=>{ inner.style.transform=`scale(${z})`; inner.style.width=(W*z)+"px"; inner.style.height=(H*z)+"px"; };
    main.querySelectorAll("[data-z]").forEach(b=>b.onclick=()=>{ if(b.dataset.z==="fit") return fit(); z=Math.max(0.35,Math.min(2.2,z*(b.dataset.z==="+"?1.25:0.8))); apply(); });
    fit(); if(sel&&pos[sel]){ const [x,yy]=pos[sel]; if(z<0.75){ z=0.9; apply(); } box.scrollTo({left:Math.max(0,x*z-box.clientWidth/2+NW/2*z),top:Math.max(0,yy*z-box.clientHeight/2),behavior:"smooth"}); }
    let drag=null; box.addEventListener("pointerdown",e=>{ if(e.target.closest(".node")) return; drag={x:e.clientX,y:e.clientY,l:box.scrollLeft,t:box.scrollTop}; box.classList.add("grab"); }); window.addEventListener("pointermove",e=>{ if(!drag) return; box.scrollLeft=drag.l-(e.clientX-drag.x); box.scrollTop=drag.t-(e.clientY-drag.y); }); window.addEventListener("pointerup",()=>{ drag=null; box.classList.remove("grab"); });
  }

  // ---------- 공식 사전 ----------
  function formulas(q){
    const p=new URLSearchParams(q||""); const node=p.get("node"), grade=p.get("grade"), core=p.get("core");
    let list=D.formulas.slice(); if(node) list=list.filter(f=>f.node===node); if(grade) list=list.filter(f=>f.grade===grade); if(core==="1") list=list.filter(f=>f.core);
    render(`<div class="crumb"><a href="#/">홈</a> › 공식 사전</div><h1>📐 공식 사전</h1><p class="lead">중1 ~ 고3 공식 ${D.formulas.length}편. 그중 정말 외워야 하는 것은 <b>${D.formulas.filter(f=>f.core).length}편</b>, 나머지는 유도 한 줄이면 그 자리에서 되살아납니다.</p>
    <div class="pill-row"><a class="pill ${!grade&&!core?"on":""}" href="#/formulas">전체 ${D.formulas.length}</a><a class="pill ${core?"on":""}" href="#/formulas?core=1">🔑 정말 외울 것 ${D.formulas.filter(f=>f.core).length}</a></div><div class="pill-row">${GORDER.map(g=>`<a class="pill ${grade===g?"on":""}" href="#/formulas?grade=${g}">${G[g]} ${D.formulas.filter(f=>f.grade===g).length}</a>`).join("")}</div>
    <div class="grid wide">${list.map(f=>`<a class="card link" href="#/formulas/${f.id}">${tag(f.grade)} ${f.core?'<span class="tag">🔑 외울 것</span>':'<span class="tag">↻ 되살릴 것</span>'}<h3>${f.title}</h3><div class="formula">$${texCard(f.tex)}$</div></a>`).join("")}</div>`);
  }
  function formula(id){
    const f=byFormula(id); if(!f) return notFound(); const r=D.recall.find(x=>x.f===id); const ls=lessonsAll.filter(l=>l.formulas.includes(id));
    render(`<div class="crumb"><a href="#/">홈</a> › <a href="#/formulas">공식 사전</a></div>${tag(f.grade)} ${f.core?'<span class="tag">🔑 정말 외울 것</span>':'<span class="tag">↻ 유도로 되살릴 것</span>'}<h1>${f.title}</h1>
    <div class="formula" style="font-size:1.6rem">$$${texCard(f.tex)}$$</div>
    ${figOfFormula(f)}
    <h2>유도 (되살리기)</h2><ol class="steps">${f.derive.map(s=>`<li>${md(s)}</li>`).join("")}</ol>
    <div class="box ok"><b>한 줄 요령:</b> ${md(f.tip)}</div>
    ${r?`<h2>기억 장치</h2><div class="card"><p>🧠 ${md(r.mnemonic)}</p><p class="muted">📜 ${md(r.story)}</p><a class="btn sm ghost" href="#/recall">암기 카드로 복습 →</a></div>`:""}
    ${ls.length?`<h2>쓰이는 소단원</h2><div class="row">${ls.map(l=>`<a class="btn sm ghost" href="#/study/${l.unit}/${l.id}">📘 ${l.title}</a>`).join("")}</div>`:""}
    <p style="margin-top:20px"><a href="#/roadmap/${f.node}">🗺 ${nodeOf(f.node).label} 의 자리 보기</a></p>`);
  }

  // ---------- 수학의 생태계 ----------
  function ecosystem(){
    const nodes=D.roadmap.nodes.filter(n=>n.unit); const cx=600, cy=380, R=300; const pos={};
    nodes.forEach((n,i)=>{ const t=-Math.PI/2+i*2*Math.PI/nodes.length; pos[n.id]=[cx+R*Math.cos(t),cy+R*Math.sin(t),t]; });
    let svg="", legend="";
    // 중심 간선
    D.roadmap.edges.filter(([a,b])=>pos[a]&&pos[b]).forEach(([a,b])=>{ svg+=`<line x1="${pos[a][0]}" y1="${pos[a][1]}" x2="${pos[b][0]}" y2="${pos[b][1]}" stroke-width="1"/>`; });
    nodes.forEach(n=>{ const [x,y,t]=pos[n.id]; const sat=[["📐",D.formulas.filter(f=>f.node===n.id).length,"var(--acc)"],["👤",D.people.filter(p=>p.node===n.id).length,"var(--g31)"],["🌍",D.life.filter(l=>l.node===n.id).length,"var(--ok)"],["🔬",Object.values(window.WIDGETS).filter(w=>w.node===n.id).length,"var(--acc2)"]];
      sat.forEach(([ic,cnt,col],k)=>{ if(!cnt)return; const rr=60+k*20; const sx=x+rr*Math.cos(t), sy=y+rr*Math.sin(t); svg+=`<line x1="${x}" y1="${y}" x2="${sx}" y2="${sy}"/><circle cx="${sx}" cy="${sy}" r="${9+cnt}" fill="${col}" opacity=".85"/><text x="${sx}" y="${sy+4}" text-anchor="middle" style="fill:#fff;font-size:10px">${ic}${cnt}</text>`; });
      svg+=`<g class="eco-node" data-id="${n.id}"><circle cx="${x}" cy="${y}" r="26" fill="var(--card)" stroke="var(--${n.col})" stroke-width="3"/><text x="${x}" y="${y+4}" text-anchor="middle" style="font-weight:700">${n.label.length>7?n.label.slice(0,7)+"…":n.label}</text></g>`; });
    render(`<div class="crumb"><a href="#/">홈</a> › 수학의 생태계</div><h1>🌐 수학의 생태계</h1><p class="lead">중2-2 ~ 중3-2 의 개념 ${nodes.length}개를 둥글게 놓고, 각 개념에 걸린 📐공식 · 👤인물 · 🌍쓰임 · 🔬위젯을 위성처럼 붙였습니다. 가운데 선은 개념의 선후관계. 개념을 누르면 지도로 갑니다.</p>
    <div class="eco"><svg viewBox="0 0 1200 760" width="1200" height="760"><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="var(--line)" stroke-dasharray="4 4"/>${svg}</svg></div>
    <div class="grid" style="margin-top:14px">${nodes.map(n=>`<div class="card"><h3><a href="#/roadmap/${n.id}">${n.label}</a> ${tag(n.col)}</h3><p class="muted">📐 ${D.formulas.filter(f=>f.node===n.id).map(f=>`<a href="#/formulas/${f.id}">${f.title}</a>`).join(" · ")||"—"}</p><p class="muted">👤 ${D.people.filter(p=>p.node===n.id).map(p=>p.name).join(", ")||"—"} &nbsp; 🌍 ${D.life.filter(l=>l.node===n.id).length}편</p></div>`).join("")}</div>`);
    main.querySelectorAll(".eco-node").forEach(g=>g.addEventListener("click",()=>location.hash="#/roadmap/"+g.dataset.id));
  }

  // ---------- 진단 ----------
  function diagnostic(level){
    const LV={ M1:{name:"중1·중2-1 진단",desc:"소인수분해·정수·일차방정식·그래프·도형·일차함수 8문항",bands:["M1"]}, A:{name:"중2-2 진단",desc:"선수 개념 3 + 삼각형·사각형·닮음·피타고라스·확률 6 = 9문항",bands:["P","A"]}, B:{name:"중3 진단",desc:"제곱근·곱셈공식·인수분해·이차방정식·이차함수·삼각비·원·통계 9문항",bands:["B"]}, H:{name:"고1 진단",desc:"다항식·복소수·근과 계수·도형의 방정식·집합·함수 6문항",bands:["H"]}, H2:{name:"고2 진단",desc:"지수·로그·삼각함수·수열·극한·미분·적분·확률 11문항",bands:["H2"]}, H3:{name:"고3 진단",desc:"급수·미분법·적분법·이차곡선·벡터·공간좌표 6문항",bands:["H3"]}, MID:{name:"중학교 전체",desc:"중1 ~ 중3 26문항, 약 15분",bands:["M1","P","A","B"]}, HIGH:{name:"고등학교 전체",desc:"고1 ~ 고3 23문항",bands:["H","H2","H3"]}, ALL:{name:"전체 진단",desc:"중1 ~ 고3 49문항, 약 30분",bands:["M1","P","A","B","H","H2","H3"]} };
    if(!level){ return render(`<div class="crumb"><a href="#/">홈</a> › 진단</div><h1>🧭 끊긴 곳부터 진단하기</h1><p class="lead">학년이 아니라 개념으로 짚습니다. 문항은 개념의 선후 순서대로 나오고, 처음 틀린 자리가 「끊긴 고리」입니다. 결과는 「중2 부족」이 아니라 「인수분해에서 끊김」처럼 개념 하나를 가리키고 그 소단원으로 바로 이어집니다.</p>
      <div class="grid">${Object.entries(LV).map(([k,v])=>`<a class="card link" href="#/diagnostic/${k}"><h3>${v.name}</h3><p class="muted">${v.desc}</p></a>`).join("")}</div>
      ${(()=>{const h=store.get("diag",[]); return h.length?`<h2>지난 진단</h2><ul>${h.slice(0,5).map(x=>`<li>${new Date(x.when).toLocaleDateString("ko")} · ${(LV[x.level]||{}).name||x.level} · ${x.score}/${x.total} · 끊긴 고리: <b>${x.broken&&nodeOf(x.broken)?nodeOf(x.broken).label:"없음 🎉"}</b></li>`).join("")}</ul>`:"";})()}`); }
    const bands=(LV[level]||LV.ALL).bands; const items=D.diagnostic.filter(d=>bands.includes(d.band||"A")); let i=0; const ans=[];
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
    if(id&&Wd[id]){ const w=Wd[id]; render(`<div class="crumb"><a href="#/">홈</a> › <a href="#/lab">매스랩</a></div>${tag(w.grade)}<h1>${MF(w.title)}</h1><p class="lead">${MF(w.desc)}</p><div class="widget" id="lab-w"></div><div class="row">${lessonsOfNode(w.node).map(l=>`<a class="btn sm ghost" href="#/study/${l.unit}/${l.id}">📘 ${l.title}</a>`).join("")}<a class="btn sm ghost" href="#/roadmap/${w.node}">🗺 지도</a></div>`); w.render($("#lab-w")); return; }
    render(`<div class="crumb"><a href="#/">홈</a> › 매스랩</div><h1>🔬 매스랩</h1><p class="lead">설명을 읽기 전에 먼저 밀어 보세요. 슬라이더 하나가 공식 한 줄을 설명합니다.</p>${GORDER.filter(g=>Object.values(Wd).some(w=>w.grade===g)).map(g=>`<h2>${G[g]}</h2><div class="grid wide">${Object.entries(Wd).filter(([k,w])=>w.grade===g).map(([k,w])=>`<a class="card link ${GCOL(g)}" href="#/lab/${k}">${tag(w.grade)}<h3>${MF(w.title)}</h3><p class="muted">${MF(w.desc)}</p></a>`).join("")}</div>`).join("")}
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
    "formula-match":{ gen(){ const f=D.formulas[rnd(0,D.formulas.length-1)]; const others=shuffle(D.formulas.filter(x=>x.id!==f.id)).slice(0,3); const opts=shuffle([f,...others]); return {q:`<b>${f.title}</b> 의 식은?`, opts:opts.map(o=>`$${texCard(o.tex)}$`), a:opts.indexOf(f)}; } },
    "trig-flash":{ gen(){ const T={ "sin 30°":"1/2","sin 45°":"√2/2","sin 60°":"√3/2","cos 30°":"√3/2","cos 45°":"√2/2","cos 60°":"1/2","tan 30°":"√3/3","tan 45°":"1","tan 60°":"√3","sin 90°":"1","cos 0°":"1","sin 0°":"0" }; const keys=Object.keys(T); const k=keys[rnd(0,keys.length-1)]; const vals=[...new Set(Object.values(T))]; const opts=shuffle([T[k],...shuffle(vals.filter(v=>v!==T[k])).slice(0,3)]); return {q:`<b>${k}</b> 의 값은?`,opts,a:opts.indexOf(T[k])}; } },
    "angle-quiz":{ gen(){ const kind=rnd(0,2); if(kind===0){ const c=rnd(20,85)*2; return {q:`호 AB 에 대한 중심각이 <b>${c}°</b> 일 때 원주각은?`, opts:shuffle([c/2,c,c/4,180-c/2]).map(String), a:null, ans:String(c/2)}; } if(kind===1){ const a=rnd(50,130); return {q:`원에 내접하는 사각형 ABCD 에서 ∠A = <b>${a}°</b> 일 때 ∠C 는?`, opts:shuffle([180-a,a,360-a,90]).map(String), a:null, ans:String(180-a)}; } const p=rnd(20,80); return {q:`호 AB 에 대한 원주각이 <b>${p}°</b> 일 때 중심각은?`, opts:shuffle([2*p,p,p/2,180-p]).map(String), a:null, ans:String(2*p)}; } },
    "factor-rush":{ input:true, gen(){ let p=rnd(-6,6),q=rnd(-6,6); if(p===0)p=1; if(q===0)q=-2; const b=p+q,c=p*q; return {q:`$x^2 ${b>=0?"+":"−"} ${Math.abs(b)}x ${c>=0?"+":"−"} ${Math.abs(c)} = (x+p)(x+q)$ 의 p, q 는? (예: <code>3,-2</code> 순서 무관)`, check:v=>{ const m=v.split(/[,\s]+/).map(Number); return m.length===2&&((m[0]===p&&m[1]===q)||(m[0]===q&&m[1]===p)); }, ans:`${p}, ${q}`, hint:`곱이 ${c}, 합이 ${b} 인 두 수`}; } },
    "pytha-triple":{ input:true, gen(){ const T=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[6,8,10],[9,12,15],[12,16,20],[20,21,29],[9,40,41]]; const t=T[rnd(0,T.length-1)]; const k=rnd(0,1); if(k){ return {q:`빗변 <b>${t[2]}</b>, 한 변 <b>${t[0]}</b> 인 직각삼각형의 나머지 변은?`, check:v=>Number(v)===t[1], ans:String(t[1]), hint:`${t[2]}² − ${t[0]}² = ${t[2]*t[2]-t[0]*t[0]}`}; } return {q:`두 변이 <b>${t[0]}</b>, <b>${t[1]}</b> 인 직각삼각형의 빗변은?`, check:v=>Number(v)===t[2], ans:String(t[2]), hint:`${t[0]}² + ${t[1]}² = ${t[0]*t[0]+t[1]*t[1]}`}; } },
    "divisor-count":{ input:true, gen(){ const ps=[2,3,5,7]; const n=rnd(2,3); const used=shuffle(ps).slice(0,n); const ex=used.map(()=>rnd(1,4)); const tex=used.map((p,i)=>ex[i]===1?`${p}`:`${p}^{${ex[i]}}`).join("\\cdot"); const ans=ex.reduce((a,e)=>a*(e+1),1); return {q:`$${tex}$ 의 약수의 개수는?`, check:v=>Number(v)===ans, ans:String(ans), hint:`(${ex.map(e=>e+"+1").join(")(")}) = ${ans}`}; } },
    "exponent-flash":{ gen(){ const a=rnd(2,7),b=rnd(2,7); const kind=rnd(0,2); let q,ans; if(kind===0){q=`$a^{${a}}\\times a^{${b}}$`;ans=a+b;} else if(kind===1){q=`$(a^{${a}})^{${b}}$`;ans=a*b;} else {const m=a+b; q=`$a^{${m}}\\div a^{${a}}$`;ans=b;} const opts=shuffle([ans,ans+1,Math.max(1,ans-1),kind===1?a+b:a*b].filter((v,i,arr)=>arr.indexOf(v)===i)); while(opts.length<4) opts.push(ans+opts.length+1); return {q:`${q} $= a^{?}$`,opts:opts.map(String),a:null,ans:String(ans)}; } },
    "slope-hunt":{ input:true, gen(){ const x1=rnd(-4,4),y1=rnd(-5,5); let dx=rnd(1,4), dy=rnd(-6,6); const k=[1,2][rnd(0,1)]; dx*=k; dy*=k; const x2=x1+dx,y2=y1+dy; const g=(a,b)=>b?g(b,a%b):Math.abs(a); const d=g(dy,dx)||1; const num=dy/d, den=dx/d; const ans=den===1?`${num}`:`${num}/${den}`; return {q:`두 점 <b>(${x1}, ${y1})</b>, <b>(${x2}, ${y2})</b> 를 지나는 직선의 기울기는? (분수는 <code>3/2</code> 꼴)`, check:v=>{ v=v.replace(/\s/g,""); const m=v.match(/^(-?\d+)(?:\/(-?\d+))?$/); if(!m) return false; const val=Number(m[1])/(m[2]?Number(m[2]):1); return Math.abs(val-dy/dx)<1e-9; }, ans, hint:`Δy = ${y2}−(${y1}) = ${dy}, Δx = ${x2}−(${x1}) = ${dx}`}; } },
    "log-flash":{ gen(){ const bases=[2,3,5,10]; const b=bases[rnd(0,3)]; const e=rnd(b===10?1:1,b===2?6:b===3?4:3); const neg=rnd(0,3)===0; const N=Math.pow(b,e); const ans=neg?-e:e; const q=neg?`$\\log_{${b}}\\dfrac{1}{${N}}$`:(b===10?`$\\log ${N}$`:`$\\log_{${b}}${N}$`); const opts=shuffle([...new Set([ans,-ans,ans+1,ans-1,e*2].filter(v=>v!==undefined))]).slice(0,4); if(!opts.includes(ans)) opts[0]=ans; return {q:`${q} 의 값은?`,opts:shuffle(opts).map(String),a:null,ans:String(ans)}; } },
    "deriv-rush":{ gen(){ const a=rnd(1,5),n=rnd(2,5),b=rnd(1,9),c=rnd(-9,9); const term=(k,p)=>k===0?"":(k===1&&p>0?"":k===-1&&p>0?"-":k)+(p===0?"":p===1?"x":`x^{${p}}`); const f=`$f(x)=${term(a,n)}${b>0?"+":""}${term(b,1)}${c>=0?"+":""}${c}$`; const right=`$${term(a*n,n-1)}${b>0?"+":""}${b}$`; const wrong=[`$${term(a,n-1)}${b>0?"+":""}${b}$`,`$${term(a*n,n-1)}${b>0?"+":""}${b}${c>=0?"+":""}${c}$`,`$${term(a*n,n)}${b>0?"+":""}${b}$`]; const opts=shuffle([right,...wrong]); return {q:`${f} 의 도함수 $f'(x)$ 는?`,opts,a:opts.indexOf(right)}; } },
    "dot-zero":{ input:true, gen(){ const a=[rnd(-5,5),rnd(-5,5)]; let b; if(rnd(0,2)===0&&(a[0]||a[1])){ const k=rnd(1,2); b=[-a[1]*k,a[0]*k]; } else b=[rnd(-5,5),rnd(-5,5)]; const ans=a[0]*b[0]+a[1]*b[1]; return {q:`$\\vec a=(${a[0]},${a[1]})$, $\\vec b=(${b[0]},${b[1]})$ 의 내적 $\\vec a\\cdot\\vec b$ 는?${ans===0?"":""}`, check:v=>Number(v)===ans, ans:String(ans)+(ans===0?" (수직!)":""), hint:`${a[0]}·${b[0]} + ${a[1]}·${b[1]}`}; } },
    "vertex-hunt":{ input:true, gen(){ const a=[1,-1,2,-2,3][rnd(0,4)], p=rnd(-5,5), q=rnd(-6,6); return {q:`$y = ${a===1?"":a===-1?"-":a}(x ${p>=0?"−":"+"} ${Math.abs(p)})^2 ${q>=0?"+":"−"} ${Math.abs(q)}$ 의 꼭짓점 (p, q) 는? (예: <code>2,-3</code>)`, check:v=>{ const m=v.split(/[,\s]+/).map(Number); return m[0]===p&&m[1]===q; }, ans:`${p}, ${q}`, hint:"x 는 부호 반대로, y 는 그대로"}; } }
  };
  function play(id){
    if(!id) return render(`<div class="crumb"><a href="#/">홈</a> › 플레이</div><h1>🎮 플레이</h1><p class="lead">게임으로 되살리기. 최고 기록은 이 브라우저에 저장됩니다.</p><div class="grid wide">${D.play.map(g=>{const best=store.get("best:"+g.id,0); return `<a class="card link" href="#/play/${g.id}">${g.grade!=="all"?tag(g.grade):'<span class="tag">전체</span>'}<h3>${g.title}</h3><p class="muted">${g.desc}</p>${best?`<p class="score">🏆 최고 ${best}점</p>`:""}</a>`;}).join("")}</div>`);
    const meta=D.play.find(g=>g.id===id), gm=GAMES[id]; if(!meta||!gm) return notFound();
    let score=0, streak=0, left=60, timer=null, cur=null;
    function finish(){ clearInterval(timer); const best=store.get("best:"+id,0); if(score>best) store.set("best:"+id,score); render(`<div class="crumb"><a href="#/play">플레이</a> › ${meta.title}</div><h1>⏱ 끝! ${score}점</h1><p class="lead">최고 기록 ${Math.max(best,score)}점 · 최대 연속 정답 ${streak}</p><div class="row"><a class="btn" href="#/play/${id}" onclick="location.reload()">다시</a><a class="btn ghost" href="#/play">다른 게임</a>${meta.node?`<a class="btn ghost" href="#/roadmap/${meta.node}">🗺 개념 보기</a>`:""}</div>`); }
    function next(){ cur=gm.gen(); render(`<div class="crumb"><a href="#/play">플레이</a> › ${meta.title}</div><div class="row"><span class="score">점수 ${score}</span><span class="muted">남은 시간 <b id="t">${left}</b>초</span></div><div class="progress"><i style="width:${left/60*100}%"></i></div><div class="card game"><div class="big">${cur.q}</div>${gm.input?`<div class="row" style="justify-content:center"><input id="ans" autocomplete="off" autofocus> <button class="btn" id="go">확인</button></div><p class="muted right">Enter 로 제출</p>`:`<div class="quiz" style="border:0"><div class="opts">${cur.opts.map((o,j)=>`<button class="go" data-j="${j}">${esc(o)}</button>`).join("")}</div></div>`}<div id="fb" class="muted"></div></div>`);
      if(gm.input){ const inp=$("#ans"); inp.focus(); const sub=()=>{ const ok=cur.check(inp.value.trim()); if(ok){score+=10;streak++; $("#fb").innerHTML="✅ 정답!"; setTimeout(next,400);} else { streak=0; $("#fb").innerHTML=`❌ 힌트: ${cur.hint} (답 ${cur.ans})`; } }; $("#go").onclick=sub; inp.addEventListener("keydown",e=>{if(e.key==="Enter")sub();}); }
      else main.querySelectorAll(".go").forEach(b=>b.onclick=()=>{ const ok=cur.a!==null?Number(b.dataset.j)===cur.a:cur.opts[Number(b.dataset.j)]===cur.ans; if(ok){score+=10;streak++;b.classList.add("ok");} else {streak=0;b.classList.add("bad"); $("#fb").innerHTML=`정답: ${cur.a!==null?cur.opts[cur.a]:cur.ans}`; typeset();} setTimeout(next,ok?350:900); }); }
    timer=setInterval(()=>{ left--; const t=$("#t"); if(t)t.textContent=left; if(left<=0)finish(); },1000);
    window.addEventListener("hashchange",()=>clearInterval(timer),{once:true});
    next();
  }


  // ---------- 개념 연결·응용 ----------
  function bridge(id){
    if(!id) return render(`<div class="crumb"><a href="#/">홈</a> › 개념 연결·응용</div><h1>🔗 개념 연결·응용</h1><p class="lead">한 문제에서 두세 단원이 만납니다. 풀이의 각 단계에 <b>어느 개념을 썼는지</b> 표시해, 풀이가 곧 개념 지도가 되게 했습니다. 시험의 고난도 문항은 대부분 이런 '다리' 문제입니다.</p>
      <div class="box ok"><b>왜 따로 모았나</b> — 교과서 문제의 약 90% 는 같은 단원 안에서만 묶여 있지만(Rohrer 외, 2020), 실제 시험과 수학적 사고는 단원을 가로지릅니다. 여기서는 '어느 개념을 꺼낼지' 고르는 연습을 합니다.</div>
      ${GORDER.filter(g=>D.bridge.some(b=>b.grade===g)).map(g=>`<h2>${G[g]}</h2><div class="grid wide">${D.bridge.filter(b=>b.grade===g).map(b=>`<a class="card link ${GCOL(g)}" href="#/bridge/${b.id}"><h3>${b.title}</h3><div class="chain">${b.nodes.map(n=>`<span class="chip">${nodeOf(n).label}</span>`).join('<span class="arr">+</span>')}</div><p class="muted">${b.hook}</p></a>`).join("")}</div>`).join("")}`);
    const b=D.bridge.find(x=>x.id===id); if(!b) return notFound();
    render(`<div class="lhead ${GCOL(b.grade)}"><div class="crumb"><a href="#/">홈</a> › <a href="#/bridge">개념 연결·응용</a></div>${tag(b.grade)}<h1>${b.title}</h1><p class="lead">${md(b.hook)}</p><div class="chain big">${b.nodes.map(n=>`<a class="chip" href="#/roadmap/${n}">${nodeOf(n).label}</a>`).join('<span class="arr">+</span>')}</div></div>
    <h2>문제</h2><div class="card"><p style="font-size:1.08rem">${md(b.q)}</p><details class="sol"><summary>먼저 풀어 본 뒤 열기 — 단계별 풀이</summary><ol class="steps bridge-steps">${b.steps.map(st=>`<li><span class="chip sm">${nodeOf(st.node).label}</span> ${md(st.t)}</li>`).join("")}</ol><p><b>답:</b> ${md(b.ans)}</p></details></div>
    <h2>이렇게 이어집니다</h2><div class="box">${md(b.link)}</div>
    <h2>같은 구조, 다른 숫자</h2><div class="card"><p>${md(b.variant.q)}</p><details class="sol"><summary>답 확인</summary><p>${md(b.variant.ans)}</p></details></div>
    <h2>관련 소단원</h2><div class="row">${[...new Set(b.nodes.flatMap(n=>lessonsOfNode(n)))].map(l=>`<a class="btn sm ghost" href="#/study/${l.unit}/${l.id}">📘 ${l.title}</a>`).join("")}</div>
    <div class="row" style="margin-top:20px"><a class="btn ghost" href="#/bridge">← 목록</a><a class="btn" href="#/mix">🔀 섞어 풀기로 확인 →</a></div>`);
  }

  // ---------- 섞어 풀기 (교차 연습 + 인출 연습) ----------
  function mix(qs){
    const band=(new URLSearchParams(qs||"")).get("band")||store.get("mixband","중학교"); store.set("mixband",band);
    const pool=[]; lessonsAll.filter(l=>band==="전체"||BAND[l.grade]===band).forEach(l=>l.quiz.forEach((q,i)=>pool.push({l,q,i})));
    // 서로 다른 단원에서 6문항
    const picked=[]; const usedUnits=new Set(); shuffle(pool).forEach(x=>{ if(picked.length<6 && !usedUnits.has(x.l.unit)){ picked.push(x); usedUnits.add(x.l.unit);} });
    let i=0, score=0, idOk=0; const log=[];
    function step(){ if(i>=picked.length) return done();
      const {l,q}=picked[i]; const units=shuffle([byUnit(l.unit), ...shuffle(D.curriculum.units.filter(u=>u.id!==l.unit)).slice(0,3)]);
      render(`<div class="crumb"><a href="#/">홈</a> › 섞어 풀기 (${band}) › ${i+1}/${picked.length}</div><div class="progress"><i style="width:${i/picked.length*100}%"></i></div>
        <div class="card game"><div class="eyebrow">1단계 · 어느 단원의 문제인가?</div><p style="font-size:1.1rem">${md(q.q)}</p><div class="quiz" style="border:0;padding:0"><div class="opts" id="u-opts">${units.map(u=>`<button data-u="${u.id}">${u.title}</button>`).join("")}</div></div>
        <div id="stage2" hidden><div class="eyebrow" style="margin-top:14px">2단계 · 풀기</div><div class="quiz" style="border:0;padding:0"><div class="opts" id="a-opts">${q.opts.map((o,j)=>`<button data-j="${j}">${["①","②","③","④"][j]} ${md(o)}</button>`).join("")}</div><div class="exp" id="exp" hidden>${md(q.exp||"")}</div></div></div>
        <div class="row" style="margin-top:12px"><button class="btn" id="next" hidden>다음 →</button></div></div>`);
      let unitRight=null;
      main.querySelectorAll("#u-opts button").forEach(b=>b.onclick=()=>{ if(unitRight!==null)return; unitRight=b.dataset.u===l.unit; if(unitRight)idOk++; b.classList.add(unitRight?"ok":"bad"); main.querySelector(`#u-opts button[data-u="${l.unit}"]`).classList.add("ok"); $("#stage2").hidden=false; typeset(); });
      let ans=null;
      main.querySelectorAll("#a-opts button").forEach(b=>b.onclick=()=>{ if(ans!==null)return; ans=Number(b.dataset.j)===q.a; if(ans)score++; b.classList.add(ans?"ok":"bad"); main.querySelector(`#a-opts button[data-j="${q.a}"]`).classList.add("ok"); $("#exp").hidden=false; $("#next").hidden=false; log.push({l,ok:ans,unitRight});
        if(!ans){ const notes=store.get("notes",[]); notes.unshift({key:"lesson:"+l.id,i:picked[i].i,q:q.q.replace(/\*\*/g,""),when:Date.now()}); store.set("notes",notes.slice(0,200)); } });
      $("#next").onclick=()=>{ i++; step(); };
    }
    function done(){ const h=store.get("mix",[]); h.unshift({when:Date.now(),score,idOk,n:picked.length}); store.set("mix",h.slice(0,30));
      render(`<div class="crumb"><a href="#/">홈</a> › 섞어 풀기</div><h1>${score} / ${picked.length} 정답 · 단원 알아맞히기 ${idOk} / ${picked.length}</h1>
      <div class="box ${score===picked.length?"ok":"warn"}">${score===picked.length?"전부 맞혔습니다. 내일 다시 오면 다른 조합이 나옵니다.":"틀린 문제는 오답 노트에 들어갔습니다. '단원 알아맞히기' 가 틀린 문제는 풀이보다 <b>개념 식별</b>이 약한 것이니 그 소단원의 '핵심 개념' 부터 다시 보세요."}</div>
      <table><tr><th>소단원</th><th>단원 식별</th><th>정답</th></tr>${log.map(x=>`<tr><td><a href="#/study/${x.l.unit}/${x.l.id}">${x.l.title}</a></td><td>${x.unitRight?"✅":"❌"}</td><td>${x.ok?"✅":"❌"}</td></tr>`).join("")}</table>
      <div class="row" style="margin-top:14px"><a class="btn" href="#/mix" onclick="setTimeout(()=>location.reload(),0)">다른 6문제</a><a class="btn ghost" href="#/mix?band=중학교" onclick="setTimeout(()=>location.reload(),0)">중학교</a><a class="btn ghost" href="#/mix?band=고등학교" onclick="setTimeout(()=>location.reload(),0)">고등학교</a><a class="btn ghost" href="#/mix?band=전체" onclick="setTimeout(()=>location.reload(),0)">전체</a><a class="btn ghost" href="#/notes">📒 오답 노트</a></div>`); }
    step();
  }


  // ---------- 서술형 · 자기설명 ----------
  function essay(id){
    const st=store.get("essay",{});
    if(!id) return render(`<div class="crumb"><a href="#/">홈</a> › 서술형·증명</div><h1>✍️ 서술형 · 증명 · 자기설명</h1><p class="lead">모범 답안을 보기 전에 <b>자기 말로 먼저 씁니다</b>. 그다음 채점 기준(10점)으로 스스로 점수를 매깁니다. '왜 이 줄이 나오는지'를 말로 설명하는 자기설명은 이해를 가장 깊게 남기는 학습법 중 하나입니다.</p>
      ${GORDER.filter(g=>D.essay.some(e=>e.grade===g)).map(g=>`<h2>${G[g]}</h2><div class="grid wide">${D.essay.filter(e=>e.grade===g).map(e=>{const r=st[e.id]; return `<a class="card link ${GCOL(g)}" href="#/essay/${e.id}">${tag(g)}${r?`<span class="tag">자기채점 ${r.score}/${e.pts}</span>`:""}<h3>${e.title}</h3><p class="muted">${teaser(e.q,80)}</p></a>`;}).join("")}</div>`).join("")}`);
    const e=D.essay.find(x=>x.id===id); if(!e) return notFound(); const r=st[id]||{text:"",score:null,checks:[]}; const l=byLesson(e.lesson);
    render(`<div class="lhead ${GCOL(e.grade)}"><div class="crumb"><a href="#/essay">서술형·증명</a> › ${e.title}</div>${tag(e.grade)}<h1>${e.title}</h1></div>
    <div class="card"><p style="font-size:1.08rem"><b>문제.</b> ${md(e.q)}</p><div class="box warn"><b>생각 열기:</b> ${md(e.prompt)}</div>
    <h3>1단계 · 내 풀이를 쓴다</h3><textarea id="ans" rows="7" placeholder="증명·풀이를 자기 말로 써 보세요. 수식은 글로 풀어 써도 됩니다.">${esc(r.text)}</textarea>
    <div class="row" style="margin-top:8px"><button class="btn" id="reveal">썼다 → 모범 답안 보기</button><span class="muted">쓴 내용은 이 브라우저(로그인 시 계정)에 저장됩니다.</span></div></div>
    <div id="model" ${r.score===null&&!r.text?"hidden":""}><h2>2단계 · 모범 답안과 비교</h2><ol class="steps">${e.model.map(m=>`<li>${md(m)}</li>`).join("")}</ol>
    <h2>3단계 · 채점 기준으로 자기 채점</h2><ul class="check rubric">${e.rubric.map(([t,p],i)=>`<li><input type="checkbox" data-i="${i}" data-p="${p}" ${r.checks&&r.checks[i]?"checked":""}><span>${md(t)}</span><b class="pts">${p}점</b></li>`).join("")}</ul>
    <div class="box ok"><b>내 점수: <span id="score">${r.score??0}</span> / ${e.pts}</b> — 빠진 항목이 바로 다음에 보완할 지점입니다.</div>
    <h2>4단계 · 자기설명</h2><p class="muted">모범 답안에서 <b>가장 이해가 안 되는 한 줄</b>을 골라, 왜 그 줄이 나오는지 자기 말로 써 보세요.</p><textarea id="selfx" rows="3" placeholder="예: 2단계에서 (b/2a)² 을 더하는 이유는 …">${esc(r.selfx||"")}</textarea>
    <div class="row" style="margin-top:10px">${l?`<a class="btn ghost" href="#/study/${l.unit}/${l.id}">📘 ${l.title}</a>`:""}<a class="btn ghost" href="#/essay">목록</a></div></div>`);
    const save=()=>{ const checks=[...main.querySelectorAll(".rubric input")].map(c=>c.checked); const score=[...main.querySelectorAll(".rubric input")].reduce((a,c)=>a+(c.checked?Number(c.dataset.p):0),0); st[id]={text:$("#ans").value,selfx:($("#selfx")||{}).value||"",checks,score:main.querySelector("#model").hidden?null:score}; store.set("essay",st); if($("#score"))$("#score").textContent=score; };
    $("#reveal").onclick=()=>{ $("#model").hidden=false; save(); typeset(); $("#model").scrollIntoView({behavior:"smooth"}); };
    main.addEventListener("change",e=>{ if(e.target.matches(".rubric input")) save(); });
    main.addEventListener("input",e=>{ if(e.target.id==="ans"||e.target.id==="selfx") save(); });
  }

  // ---------- 하루 10분 코스 ----------
  function daily(){
    const today=new Date().toISOString().slice(0,10); const log=store.get("daily",{}); const streak=(()=>{ let n=0; const d=new Date(); for(;;){ const k=d.toISOString().slice(0,10); if(log[k]) { n++; d.setDate(d.getDate()-1); } else break; } return n; })();
    const due=srsDue().slice(0,3); const stories=lessonsAll.filter(l=>l.story); const st=stories[new Date().getDate()%stories.length];
    render(`<div class="crumb"><a href="#/">홈</a> › 하루 10분</div><h1>⏱ 하루 10분 코스</h1><p class="lead">매일 같은 순서: 암기 카드 3장(간격 반복) → 섞어 풀기 6문제(교차·인출) → 이야기 1편(이해). 끝내면 오늘 칸에 도장이 찍힙니다.</p>
    <div class="stats"><div><b>${streak}</b>연속 일수</div><div><b>${Object.keys(log).length}</b>총 완료일</div><div><b>${log[today]?"✅":"—"}</b>오늘</div></div>
    <ol class="steps daily">
      <li><b>① 암기 카드 ${due.length?due.length+"장":"(오늘 복습 없음)"}</b> — ${due.length?due.map(r=>byFormula(r.f).title).join(", "):"내일 다시"} <a class="btn sm" href="#/recall/run">시작</a></li>
      <li><b>② 섞어 풀기 6문제</b> — 서로 다른 단원에서. 단원 식별 → 풀기 <a class="btn sm" href="#/mix">시작</a></li>
      <li><b>③ 오늘의 이야기</b> — <a href="#/study/${st.unit}/${st.id}">${st.title}</a>: ${md(st.story[0].h)} <a class="btn sm ghost" href="#/study/${st.unit}/${st.id}">읽기</a></li>
    </ol>
    <div class="row"><button class="btn" id="done">오늘 코스 완료 도장 ✔</button>${log[today]?'<span class="muted">오늘은 이미 찍혔습니다.</span>':''}</div>
    <h2>최근 2주</h2><div class="heat">${Array.from({length:14},(_,i)=>{const d=new Date();d.setDate(d.getDate()-13+i);const k=d.toISOString().slice(0,10);return `<span class="${log[k]?"on":""}" title="${k}">${d.getDate()}</span>`;}).join("")}</div>`);
    $("#done").onclick=()=>{ log[today]=true; store.set("daily",log); daily(); };
  }

  // ---------- 교사 대시보드 ----------
  function teacher(){
    const code=store.get("class","");
    render(`<div class="crumb"><a href="#/">홈</a> › 교사 대시보드</div><h1>🏫 교사 대시보드</h1><p class="lead">학생이 로그인 후 <b>학급 코드</b>를 입력하면 진단 결과·퀴즈 정답률·섞어 풀기·오답 노트 요약이 이 화면에 모입니다. 학생 기록은 요약만 공유되고, 상세 기록은 본인만 볼 수 있습니다.</p>
    ${window.SYNC&&window.SYNC.enabled?`<div class="card"><label>학급 코드 <input id="cc" value="${esc(code)}" placeholder="예: 3-2"></label> <button class="btn sm" id="load">불러오기</button> <span class="muted">학생은 로그인 → 👤 버튼 → 학급 코드 입력</span></div><div id="dash"></div>`:`<div class="box warn">동기화(Firebase)가 설정되어야 사용할 수 있습니다.</div>`}`);
    if(!(window.SYNC&&window.SYNC.enabled)) return;
    $("#load").onclick=async()=>{ const c=$("#cc").value.trim(); store.set("class",c); $("#dash").innerHTML='<p class="muted">불러오는 중…</p>'; const rows=await window.SYNC.readClass(c); if(!rows){ $("#dash").innerHTML='<div class="box warn">읽을 수 없습니다. 로그인했는지, Firebase 규칙에 classes 항목을 추가했는지 확인하세요.</div>'; return; }
      const arr=Object.values(rows); if(!arr.length){ $("#dash").innerHTML='<p class="muted">아직 이 학급 코드로 공유한 학생이 없습니다.</p>'; return; }
      const broken={}; arr.forEach(r=>{ if(r.broken){ broken[r.broken]=(broken[r.broken]||0)+1; } });
      $("#dash").innerHTML=`<h2>끊긴 고리 분포 (${arr.length}명)</h2><div class="row">${Object.entries(broken).sort((a,b)=>b[1]-a[1]).map(([n,c])=>`<span class="chip">${nodeOf(n)?nodeOf(n).label:n} <b>${c}</b></span>`).join("")||'<span class="muted">진단 기록 없음</span>'}</div>
      <h2>학생별 요약</h2><table><tr><th>아이디</th><th>최근 진단</th><th>끊긴 고리</th><th>퀴즈 정답률</th><th>섞어 풀기</th><th>오답</th><th>10분 코스</th><th>최근 활동</th></tr>${arr.sort((a,b)=>(a.id||"").localeCompare(b.id||"")).map(r=>`<tr><td>${esc(r.id||"")}</td><td>${r.diagScore??"-"}</td><td>${r.broken?(nodeOf(r.broken)?nodeOf(r.broken).label:r.broken):"없음"}</td><td>${r.quizPct!=null?r.quizPct+"% ("+r.quizN+")":"-"}</td><td>${r.mix||"-"}</td><td>${r.notes??"-"}</td><td>${r.dailyDays??0}일</td><td>${r.updated?new Date(r.updated).toLocaleDateString("ko"):"-"}</td></tr>`).join("")}</table>`; };
    if(code) $("#load").click();
  }

  // ---------- 개념 사전 ----------
  function concepts(q){ const p=new URLSearchParams(q||""); const g=p.get("grade"); const list=D.concepts.filter(c=>!g||c.grade===g).sort((a,b)=>a.term.localeCompare(b.term,"ko"));
    render(`<div class="crumb"><a href="#/">홈</a> › 개념 사전</div><h1>📖 개념 사전</h1><p class="lead">용어 ${D.concepts.length}개. 정의 한 줄과 영어 이름, 그리고 그 개념이 있는 자리.</p><div class="pill-row"><a class="pill ${!g?"on":""}" href="#/concepts">전체</a>${GORDER.filter(x=>D.concepts.some(c=>c.grade===x)).map(x=>`<a class="pill ${g===x?"on":""}" href="#/concepts?grade=${x}">${G[x]}</a>`).join("")}</div>
    <div class="grid wide">${list.map(c=>`<div class="card">${tag(c.grade)}<h3>${c.term} <span class="muted" style="font-weight:400;font-size:.85rem">${c.en}</span></h3><p>${md(c.def)}</p><a href="#/roadmap/${c.node}">🗺 ${nodeOf(c.node).label}</a>${lessonsOfNode(c.node).slice(0,1).map(l=>` · <a href="#/study/${l.unit}/${l.id}">📘 ${l.title}</a>`).join("")}</div>`).join("")}</div>`); }

  // ---------- 공식 암기법 (간격 반복) ----------
  function srsAll(){ return store.get("srs",{}); }
  function srsDue(){ const s=srsAll(); const now=Date.now(); return D.recall.filter(r=>!s[r.f]||s[r.f].due<=now); }
  function recall(mode){
    const s=srsAll(); const due=srsDue();
    if(mode!=="run"){ return render(`<div class="crumb"><a href="#/">홈</a> › 공식 암기법</div><h1>🧠 공식 암기법</h1><p class="lead">외울 것과 되살릴 것을 나누고, 외울 것에는 기억 장치를 붙입니다. 카드를 넘기면 <b>간격 반복</b>으로 내일·3일 뒤·일주일 뒤 다시 묻습니다. (기록은 이 브라우저에만)</p>
      <div class="row"><a class="btn" href="#/recall/run">▶ 오늘의 카드 ${due.length}장 시작</a><button class="btn ghost" id="reset">기록 초기화</button></div>
      <h2>외울 것 vs 되살릴 것</h2><div class="grid wide"><div class="card"><h3>🔑 정말 외울 것 (${D.formulas.filter(f=>f.core).length})</h3><ul>${D.formulas.filter(f=>f.core).map(f=>`<li><a href="#/formulas/${f.id}">${f.title}</a></li>`).join("")}</ul></div><div class="card"><h3>↻ 유도 한 줄로 되살릴 것 (${D.formulas.filter(f=>!f.core).length})</h3><p class="muted">${D.formulas.filter(f=>!f.core).map(f=>`<a href="#/formulas/${f.id}">${f.title}</a>`).join(" · ")}</p></div></div>
      <h2>기억 장치 모음</h2><div class="grid wide">${D.recall.map(r=>{const f=byFormula(r.f); const st=s[r.f]; return `<div class="card"><h3><a href="#/formulas/${f.id}">${f.title}</a></h3><div class="formula">$${texCard(f.tex)}$</div><p>🧠 ${md(r.mnemonic)}</p><p class="muted">📜 ${md(r.story)}</p>${st?`<p class="muted" style="font-size:.8rem">다음 복습: ${new Date(st.due).toLocaleDateString("ko")} · 단계 ${st.n}</p>`:""}</div>`;}).join("")}</div>`), $("#reset").onclick=()=>{ if(confirm("암기 기록을 지울까요?")){store.set("srs",{});recall();} }; }
    const queue=shuffle(due); let i=0;
    function card(){ if(i>=queue.length) return render(`<h1>오늘 복습 끝 🎉</h1><p class="lead">${queue.length}장을 넘겼습니다. 내일 다시 오세요.</p><a class="btn" href="#/recall">목록으로</a>`);
      const r=queue[i], f=byFormula(r.f); let flipped=false;
      render(`<div class="crumb"><a href="#/recall">공식 암기법</a> › ${i+1}/${queue.length}</div><div class="progress"><i style="width:${i/queue.length*100}%"></i></div><div class="flash"><div class="face" id="face"><div class="eyebrow">${f.title}</div><p>이 공식을 떠올려 보세요. 되살리는 한 줄: <i>${md(f.tip)}</i></p><button class="btn" id="flip">뒤집기</button></div></div>`);
      $("#flip").onclick=()=>{ flipped=true; $("#face").innerHTML=`<div class="eyebrow">${f.title}</div><div class="formula" style="font-size:1.5rem">$$${texCard(f.tex)}$$</div><p>🧠 ${md(r.mnemonic)}</p><div class="row" style="justify-content:center"><button class="btn ghost" data-g="0">😵 몰랐음</button><button class="btn ghost" data-g="1">🤔 애매</button><button class="btn" data-g="2">😎 바로 떠오름</button></div>`; typeset();
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
  function life(q){
    const pr=new URLSearchParams(q||""); const cat=pr.get("cat")||"전체";
    const list=D.life.filter(x=>cat==="전체"||x.cat===cat);
    const fig=x=>{ if(!x.fig||!window.FIG||!window.FIG[x.fig]) return ""; try{ return `<div class="figwrap">${window.FIG[x.fig](x.figp||{})}</div>`; }catch(e){ return ""; } };
    render(`<div class="crumb"><a href="#/">홈</a> › 생활 속 수학</div><h1>🌍 생활 속 수학</h1><p class="lead">교과서 밖에서 같은 공식이 어떻게 쓰이는지. ${D.life.length}편, 도면과 계산 과정 포함. 영역별로 보되 각 글은 개념 지도의 한 자리에 연결됩니다.</p>
    <div class="pill-row"><a class="pill ${cat==="전체"?"on":""}" href="#/life">전체 ${D.life.length}</a>${D.lifeCats.map(c=>`<a class="pill ${cat===c?"on":""}" href="#/life?cat=${encodeURIComponent(c)}">${c} ${D.life.filter(x=>x.cat===c).length}</a>`).join("")}</div>
    <div class="grid wide">${list.map((x,i)=>`<div class="card life ${nodeOf(x.node).col}">${fig(x)}<div class="row" style="gap:6px"><span class="tag">${x.cat}</span><span class="tag">${x.tag}</span>${tag(nodeOf(x.node).col)}</div><h3>${x.title}</h3><p>${md(x.body)}</p>
      ${x.calc?`<details class="sol"><summary>계산해 보기</summary><ol class="steps">${x.calc.map(c=>`<li>${md(c)}</li>`).join("")}</ol></details>`:""}
      <p class="muted" style="margin:8px 0 0"><a href="#/roadmap/${x.node}">🗺 ${nodeOf(x.node).label}</a>${lessonsOfNode(x.node).slice(0,1).map(l=>` · <a href="#/study/${l.unit}/${l.id}">📘 ${l.title}</a>`).join("")}</p></div>`).join("")}</div>`);
  }
  function people(){ render(`<div class="crumb"><a href="#/">홈</a> › 수학 인물</div><h1>👤 수학 인물</h1><p class="lead">이 범위의 공식 뒤에 있는 사람들. 시대순.</p><div class="grid wide">${D.people.map(p=>{const l=byLesson(p.link); return `<div class="card person"><div class="row">${p.img?`<img class="ico avatar" src="${p.img}" alt="${p.name}" style="object-fit:cover;padding:0">`:ico("1F3DB","ico avatar")}<div><div class="eyebrow">${p.years}</div><h3 style="margin:0">${p.name}</h3></div></div><p>${md(p.body)}</p>${l?`<a href="#/study/${l.unit}/${l.id}">📘 ${l.title}</a>`:""} · <a href="#/roadmap/${p.node}">🗺 ${nodeOf(p.node).label}</a></div>`;}).join("")}</div>`); }


  // ---------- 수능 패턴 도감 ----------
  function patterns(id,qs){
    const SU=D.suneung; const pr=new URLSearchParams(qs||""); const subj=pr.get("s")||"m1"; const seen=store.get("pat",{});
    if(id==="game") return patternGame();
    if(!id){
      const list=SU.patterns.filter(x=>x.subject===subj);
      return render(`<div class="crumb"><a href="#/">홈</a> › 수능 패턴 도감</div><h1>🧭 수능 패턴 도감</h1>
      <p class="lead">최근 10년(2016~2025학년도) 수능·모의평가에서 <b>해마다 다시 나온 ${SU.patterns.length}가지 구조</b>를 패턴으로 정리했습니다. 문제를 '겉모습' 이 아니라 <b>구조</b>로 알아보는 것이 전문가의 눈(Chi 외, 1981). 각 패턴마다 ① 알아보는 신호 ② 첫 수(첫 줄에 쓰는 식) ③ 동형 문제를 힌트 → 첫 수 → 전체 풀이의 3단계로 열어 봅니다.</p>
      <div class="box ok"><b>공부법</b> — 풀이를 외우지 말고 <b>신호 → 첫 수</b>만 외우세요. 그다음 <a href="#/patterns/game">패턴 알아맞히기</a>로 문장만 보고 패턴을 고르는 연습을 하면, 시험장에서 '아, 이건 그 패턴' 이 먼저 떠오릅니다. 풀이를 단계별로 숨기고 여는 방식은 '풀이 예시 흐리기(faded worked example)' 연구(Renkl·Atkinson)에서 효과가 확인된 방법입니다.</div>
      <div class="row" style="margin:10px 0"><a class="btn" href="#/patterns/game">🎮 패턴 알아맞히기</a><span class="muted">익힘 ${Object.keys(seen).length}/${SU.patterns.length}</span></div>
      <div class="pill-row">${SU.subjects.map(x=>`<a class="pill ${x.id===subj?"on":""}" href="#/patterns?s=${x.id}">${x.name} <span class="muted">${SU.patterns.filter(p=>p.subject===x.id).length}</span></a>`).join("")}</div>
      <p class="muted">${SU.subjects.find(x=>x.id===subj).desc}</p>
      <div class="grid wide">${list.map(x=>`<a class="card link pat ${seen[x.id]?"done":""}" href="#/patterns/${x.id}"><div class="pat-h"><span class="pat-emoji">${x.emoji}</span><div><h3>${x.name}</h3><div class="muted" style="font-size:.82rem">${x.slot}</div></div></div><div class="freq" title="10년 중 출제 학년도 수">${"●".repeat(x.freq)}${"○".repeat(10-x.freq)} <span class="muted">${x.freq}/10년</span></div><div class="chain">${x.signal.slice(0,2).map(t=>`<span class="chip sm">${md(t)}</span>`).join("")}</div>${seen[x.id]?'<div class="eyebrow" style="color:var(--ok)">✓ 익힘</div>':""}</a>`).join("")}</div>`);
    }
    const x=SU.patterns.find(p=>p.id===id); if(!x) return notFound(); const subjName=SU.subjects.find(s=>s.id===x.subject).name; const ls=byLesson(x.lesson);
    render(`<div class="lhead ${GCOL(x.subject==="m1"?"h2a":x.subject==="m2"?"h2c":x.subject==="pr"?"h2p":x.subject==="ca"?"h3c":"h3g")}"><div class="crumb"><a href="#/">홈</a> › <a href="#/patterns?s=${x.subject}">수능 패턴 도감</a> › ${subjName}</div><span class="tag">${subjName}</span> <span class="tag">${x.slot}</span><h1>${x.emoji} ${x.name}</h1><p class="lead">출제: ${x.years} · <span class="freq">${"●".repeat(x.freq)}${"○".repeat(10-x.freq)}</span></p></div>
    <div class="grid"><div class="card"><h3>👀 알아보는 신호</h3><ul>${x.signal.map(t=>`<li>${md(t)}</li>`).join("")}</ul></div><div class="card first-move"><h3>♟ 첫 수</h3><p>${md(x.first)}</p></div></div>
    <h2>동형 문제 <span class="muted" style="font-size:.9rem">실제 기출과 같은 구조, 다른 숫자</span></h2>
    <div class="card"><div class="qrow"><p style="font-size:1.08rem">${md(x.q)}</p>${figAny(x,"qfig")}</div>
      <div class="reveal" id="rv"><button class="btn sm ghost" data-step="1">① 힌트 보기</button><button class="btn sm ghost" data-step="2">② 첫 줄만 보기</button><button class="btn sm" data-step="3">③ 전체 풀이</button></div>
      <div class="rv-box" id="rv1" hidden><b>힌트</b> — ${md(x.hint)}</div>
      <div class="rv-box" id="rv2" hidden><b>첫 줄</b> — ${md(x.steps[0])}</div>
      <div class="rv-box" id="rv3" hidden><ol class="steps">${x.steps.map(st=>`<li>${md(st)}</li>`).join("")}</ol><p><b>답:</b> ${md(x.ans)}</p></div></div>
    <div class="grid"><div class="card"><h3>⚠️ 이 패턴의 함정</h3><p>${md(x.trap)}</p></div><div class="card"><h3>🔁 변형(킬러 축소판)</h3><p>${md(x.twist)}</p></div></div>
    <div class="row" style="margin-top:14px"><button class="btn ${seen[id]?"ghost":""}" id="mark">${seen[id]?"✓ 익힘 취소":"✓ 익혔어요"}</button>${ls?`<a class="btn ghost" href="#/study/${ls.unit}/${ls.id}">📘 ${ls.title}</a>`:""}<a class="btn ghost" href="#/roadmap/${x.node}">🗺 개념의 자리</a><a class="btn ghost" href="#/patterns/game">🎮 알아맞히기</a></div>
    <div class="row" style="margin-top:10px">${(()=>{const l=SU.patterns.filter(p=>p.subject===x.subject);const i=l.indexOf(x);return `${l[i-1]?`<a class="btn sm ghost" href="#/patterns/${l[i-1].id}">← ${l[i-1].name}</a>`:""}${l[i+1]?`<a class="btn sm ghost" href="#/patterns/${l[i+1].id}">${l[i+1].name} →</a>`:`<a class="btn sm ghost" href="#/patterns?s=${x.subject}">목록</a>`}`;})()}</div>`);
    main.querySelectorAll("#rv [data-step]").forEach(b=>b.onclick=()=>{ const n=+b.dataset.step; for(let i=1;i<=n;i++){ const el=$("#rv"+i); if(el) el.hidden=false; } typeset(); });
    $("#mark").onclick=()=>{ const sm=store.get("pat",{}); if(sm[id]) delete sm[id]; else sm[id]=Date.now(); store.set("pat",sm); patterns(id,qs); };
  }
  function patternGame(){
    const SU=D.suneung; let score=0, n=0, cur=null; const total=8; const pool=shuffle(SU.patterns.slice());
    function next(){ if(n>=total||!pool.length) return finish(); cur=pool.pop(); n++; const others=shuffle(SU.patterns.filter(p=>p.id!==cur.id&&p.subject===cur.subject)).slice(0,3); const opts=shuffle([cur,...others]);
      render(`<div class="crumb"><a href="#/patterns">수능 패턴 도감</a> › 패턴 알아맞히기</div><div class="row"><span class="score">점수 ${score}</span><span class="muted">${n} / ${total}</span></div><div class="progress"><i style="width:${n/total*100}%"></i></div>
      <div class="card game"><div class="eyebrow">이 문제는 어느 패턴일까요? (풀지 말고 구조만 보세요)</div><div class="qrow"><p style="font-size:1.05rem">${md(cur.q)}</p>${figAny(cur,"qfig")}</div><div class="quiz" style="border:0"><div class="opts">${opts.map((o,j)=>`<button class="go" data-j="${j}">${o.emoji} ${o.name}</button>`).join("")}</div></div><div id="fb" class="muted"></div></div>`);
      main.querySelectorAll(".go").forEach(b=>b.onclick=()=>{ const ok=opts[+b.dataset.j].id===cur.id; if(ok){ score+=10; b.classList.add("ok"); $("#fb").innerHTML=`✅ 신호: ${md(cur.signal[0])} → 첫 수: ${md(cur.first)}`; } else { b.classList.add("bad"); $("#fb").innerHTML=`❌ 정답은 <b>${cur.emoji} ${cur.name}</b> — ${md(cur.signal[0])}`; } typeset(); main.querySelectorAll(".go").forEach(x=>x.disabled=true); setTimeout(next,ok?1400:2600); }); }
    function finish(){ const best=store.get("best:pattern",0); if(score>best) store.set("best:pattern",score); render(`<div class="crumb"><a href="#/patterns">수능 패턴 도감</a></div><h1>🎯 ${score} / ${total*10}</h1><p class="lead">${score>=70?"구조가 보이기 시작했습니다. 이제 각 패턴의 '첫 수' 를 소리 내어 말해 보세요.":"틀린 패턴의 '알아보는 신호' 를 다시 읽고 한 번 더."} 최고 ${Math.max(best,score)}점</p><div class="row"><a class="btn" href="#/patterns/game" onclick="location.reload()">다시</a><a class="btn ghost" href="#/patterns">도감으로</a></div>`); }
    next();
  }


  // ---------- 올림피아드 퀴즈 ----------
  function nonsul(id,qs){
    const N=D.nonsul; const pr=new URLSearchParams(qs||""); const ty=pr.get("t")||""; const rec=store.get("ns",{});
    const typeOf=t=>N.types.find(x=>x.id===t); const cls={think:"h2a",text:"h2b",deep:"h1a",basic:"g32"};
    if(id==="guide"){ return render(`<div class="crumb"><a href="#/">홈</a> › <a href="#/nonsul">대학별 수리논술</a> › 답안 쓰기 트레이너</div><h1>✍️ 논술 답안 쓰기 트레이너</h1>
      <p class="lead">수리논술은 <b>답이 아니라 논리</b>를 채점합니다. 같은 답이라도 "왜" 가 빠지면 반점. 아래 5줄 구조를 몸에 붙이면 어느 대학 문항에도 통합니다.</p>
      <h2>답안의 5줄 구조</h2><ol class="steps">${N.trainer.structure.map(([h,t])=>`<li><b>${h}</b> — ${md(t)}</li>`).join("")}</ol>
      <h2>제출 전 체크리스트</h2><ul class="check">${N.trainer.checklist.map((c,i)=>`<li><label><input type="checkbox" data-c="${i}"> ${md(c)}</label></li>`).join("")}</ul>
      <h2>채점자가 가장 많이 깎는 6가지</h2><div class="grid">${N.trainer.penalties.map(([a,b])=>`<div class="card"><h3>⚠️ ${md(a)}</h3><p>${md(b)}</p></div>`).join("")}</div>
      <div class="row" style="margin-top:14px"><a class="btn" href="#/nonsul">🎓 대학별 문제로</a><a class="btn ghost" href="#/essay">📝 서술형 연습</a></div>`); }
    if(!id){ const list=N.univs.filter(u=>!ty||u.type===ty);
      return render(`<div class="crumb"><a href="#/">홈</a> › 대학별 수리논술</div><h1>🎓 대학별 수리논술</h1>
      <p class="lead">수리논술을 치르는 주요 대학의 <b>최근 10년 출제 경향</b>을 유형·범위·시간별로 정리하고, 대학마다 가장 자주 나온 주제의 <b>동형 서술형 문제</b>와 모범 답안, 채점 기준(루브릭), 감점 포인트를 붙였습니다. 문제는 기출 원문이 아니라 같은 구조의 새 문제이며, 전형 정보는 2025~2026학년도 기준이므로 <b>지원 연도의 모집요강을 반드시 확인</b>하세요.</p>
      <div class="grid"><a class="card link" href="#/nonsul/guide">${ico("270D")}<h3>✍️ 답안 쓰기 트레이너</h3><p class="muted">5줄 구조 · 제출 전 체크리스트 · 채점자가 가장 많이 깎는 6가지</p></a></div>
      <div class="pill-row"><a class="pill ${!ty?"on":""}" href="#/nonsul">전체 ${N.univs.length}</a>${N.types.map(t=>`<a class="pill ${ty===t.id?"on":""}" href="#/nonsul?t=${t.id}">${t.name} ${N.univs.filter(u=>u.type===t.id).length}</a>`).join("")}</div>
      ${ty?`<p class="muted">${typeOf(ty).desc}</p>`:""}
      <div class="grid wide">${list.map(u=>{ const t=typeOf(u.type); const r=rec[u.id]; return `<a class="card link ns ${r?"done":""}" href="#/nonsul/${u.id}"><div class="row" style="justify-content:space-between"><span class="tag">${t.name}</span><span class="tag">난이도 ${u.level}</span></div><h3>${u.name}</h3><p class="muted">${u.time} · ${u.items}<br>${u.range}</p>${r?`<div class="eyebrow" style="color:var(--ok)">✓ 자기채점 ${r.score}/${r.max}</div>`:""}</a>`; }).join("")}</div>
      <p class="muted" style="margin-top:18px">출처: 지역내일 「2025학년도 대학별 수리논술 분석」, 베리타스알파 모의논술 일정, 각 대학 입학처 선행학습영향평가 보고서(2016~2025). 유형 분류는 자료마다 다를 수 있습니다.</p>`); }
    const u=N.univs.find(o=>o.id===id); if(!u) return notFound(); const t=typeOf(u.type); const ls=byLesson(u.lesson); const max=u.rubric.reduce((a,b)=>a+b[1],0);
    let stage=store.get("ns",{})[id]?2:0;
    function draw(){ const cur=store.get("ns",{})[id]; render(`<div class="lhead ${cls[u.type]}"><div class="crumb"><a href="#/">홈</a> › <a href="#/nonsul?t=${u.type}">대학별 수리논술</a> › ${t.name}</div><span class="tag">${t.name}</span> <span class="tag">${u.time}</span> <span class="tag">${u.items}</span> <span class="tag">난이도 ${u.level}</span><h1>${u.name}</h1><p class="lead muted">출제 범위: ${u.range}</p></div>
      <div class="card"><h3>🔍 10년 출제 경향</h3><p>${md(u.note)}</p><ul class="bul">${u.topics.map(x=>`<li>${md(x)}</li>`).join("")}</ul></div>
      <h2>동형 서술형 문제</h2>
      <div class="card ns-q"><div class="qrow"><div class="ns-text">${u.q.split("\n").map(l=>`<p>${md(l)}</p>`).join("")}</div>${figAny(u,"qfig")}</div>
        <div class="ns-write" ${stage>0?"hidden":""}><p class="muted">먼저 종이에 답안을 완성하세요 (권장 ${Math.round(parseInt(u.time)/ (parseInt(u.items)||3))}분). 다 쓴 뒤 모범 답안을 열어 루브릭으로 자기채점합니다.</p><button class="btn" id="ns-open">모범 답안 · 채점 기준 열기</button></div>
        <div id="ns-sol" ${stage>0?"":"hidden"}><h3>모범 답안</h3><ol class="steps">${u.model.map(x=>`<li>${md(x)}</li>`).join("")}</ol>
          <h3>채점 기준 (루브릭) — 내 답안에 있으면 체크</h3><table class="fig-table rubric"><thead><tr><th>채점 요소</th><th>배점</th><th>내 답안</th></tr></thead><tbody>${u.rubric.map(([c,p],i)=>`<tr><td>${md(c)}</td><td>${p}</td><td><input type="checkbox" data-p="${p}" ${cur&&cur.got&&cur.got[i]?"checked":""}></td></tr>`).join("")}</tbody></table>
          <div class="row"><button class="btn" id="ns-score">자기채점 저장</button><span id="ns-res" class="muted">${cur?`저장됨 ${cur.score}/${max}`:""}</span></div>
          <h3>감점 포인트</h3><div class="grid">${u.pitfalls.map(x=>`<div class="box warn">⚠️ ${md(x)}</div>`).join("")}</div></div>
      </div>
      <div class="row" style="margin-top:14px"><a class="btn" href="#/nonsul/guide">✍️ 답안 쓰기 트레이너</a>${ls?`<a class="btn ghost" href="#/study/${ls.unit}/${ls.id}">📘 ${ls.title}</a>`:""}<a class="btn ghost" href="#/roadmap/${u.node}">🗺 개념의 자리</a><a class="btn ghost" href="#/nonsul">목록</a></div>`);
      const ob=$("#ns-open"); if(ob) ob.onclick=()=>{ stage=1; draw(); };
      const sb=$("#ns-score"); if(sb) sb.onclick=()=>{ const boxes=[...main.querySelectorAll(".rubric input")]; const got=boxes.map(b=>b.checked); const score=boxes.reduce((a,b)=>a+(b.checked?+b.dataset.p:0),0); const rr=store.get("ns",{}); rr[id]={score,max,got,when:Date.now()}; store.set("ns",rr); $("#ns-res").textContent=`저장됨 ${score}/${max}`+(score===max?" 🎉 만점!":score>=max*0.7?" 👍 합격권":" — 감점 포인트를 다시 읽어 보세요"); };
      typeset(); }
    draw();
  }
  function olympiad(id,qs){
    const O=D.olympiad; const pr=new URLSearchParams(qs||""); const band=pr.get("b")||"중등"; const theme=pr.get("th")||""; const rec=store.get("oly",{});
    const MEDAL=l=>["","🥉","🥈","🥇"][l]; const LV=["","동 (입문)","은 (도전)","금 (올림피아드)"];
    const medalsOf=()=>{ const m={1:0,2:0,3:0}; O.items.forEach(x=>{ if(rec[x.id]&&rec[x.id].ok) m[x.level]++; }); return m; };
    if(id==="random"){ const pool=O.items.filter(x=>!(rec[x.id]&&rec[x.id].ok)); const pick=(pool.length?pool:O.items)[rnd(0,(pool.length?pool:O.items).length-1)]; location.hash="#/olympiad/"+pick.id; return; }
    if(!id){ const m=medalsOf(); const list=O.items.filter(x=>x.band===band&&(!theme||x.theme===theme));
      return render(`<div class="crumb"><a href="#/">홈</a> › 올림피아드 퀴즈</div><h1>🏅 올림피아드 퀴즈</h1>
      <p class="lead">최근 10년 KMO(한국수학올림피아드)·KJMO·AMC 에서 되풀이되는 <b>'생각의 기술' ${O.items.length}가지</b>를 교과 범위 안의 퀴즈로 다시 만들었습니다. 계산보다 <b>발상</b> — 비둘기집, 홀짝 불변량, 색칠, 보조선, 치환, 짝 짓기. 힌트는 3단계: 안 보고 맞히면 100점, 힌트를 열 때마다 70 → 40 → 20점.</p>
      <div class="oly-board"><span>🥇 ${m[3]}</span><span>🥈 ${m[2]}</span><span>🥉 ${m[1]}</span><span class="muted">해결 ${Object.values(rec).filter(r=>r.ok).length}/${O.items.length}</span><a class="btn" href="#/olympiad/random">🎲 아무 문제나 도전</a></div>
      <div class="pill-row"><a class="pill ${band==="중등"?"on":""}" href="#/olympiad?b=중등${theme?"&th="+theme:""}">중등 ${O.items.filter(x=>x.band==="중등").length}</a><a class="pill ${band==="고등"?"on":""}" href="#/olympiad?b=고등${theme?"&th="+theme:""}">고등 ${O.items.filter(x=>x.band==="고등").length}</a></div>
      <div class="pill-row"><a class="pill ${!theme?"on":""}" href="#/olympiad?b=${band}">전체</a>${O.themes.map(t=>`<a class="pill ${theme===t.id?"on":""}" href="#/olympiad?b=${band}&th=${t.id}">${t.emoji} ${t.name}</a>`).join("")}</div>
      ${theme?`<p class="muted">${O.themes.find(t=>t.id===theme).desc}</p>`:""}
      <div class="grid wide">${list.map(x=>{ const r=rec[x.id]; const th=O.themes.find(t=>t.id===x.theme); return `<a class="card link oly ${r&&r.ok?"done":""}" href="#/olympiad/${x.id}"><div class="row" style="justify-content:space-between"><span class="tag">${th.emoji} ${th.name}</span><span class="tag">${MEDAL(x.level)} ${LV[x.level]}</span></div><h3>${x.title}</h3><p class="muted">${teaser(x.q,70)}</p>${r&&r.ok?`<div class="eyebrow" style="color:var(--ok)">✓ 해결 · ${r.score}점</div>`:""}</a>`; }).join("")}</div>`);
    }
    const x=O.items.find(o=>o.id===id); if(!x) return notFound(); const th=O.themes.find(t=>t.id===x.theme); const ls=byLesson(x.lesson); const r=rec[id]||{};
    let hintsUsed=r.ok?3:0, done=!!r.ok;
    const SC=[100,70,40,20];
    function draw(){ const cur=store.get("oly",{})[id]||{}; render(`<div class="lhead ${x.band==="중등"?"g22":"h2a"}"><div class="crumb"><a href="#/">홈</a> › <a href="#/olympiad?b=${x.band}">올림피아드 퀴즈</a> › ${th.emoji} ${th.name}</div><span class="tag">${x.band}</span> <span class="tag">${MEDAL(x.level)} ${LV[x.level]}</span><h1>${x.title}</h1><p class="lead muted">${x.src}</p></div>
      <div class="card oly-q"><div class="qrow"><p style="font-size:1.12rem">${md(x.q)}</p>${figAny(x,"qfig")}</div>
        <div class="oly-answer" ${done?"hidden":""}><input id="oly-in" placeholder="답 입력" autocomplete="off"><button class="btn" id="oly-go">정답 확인</button><span class="muted">지금 맞히면 <b id="oly-sc">${SC[hintsUsed]}</b>점</span></div>
        <div id="oly-fb" class="oly-fb"></div>
        <div class="oly-hints">${x.hints.map((h,i)=>`<div class="hint ${i<hintsUsed?"open":""}" data-i="${i}"><button class="btn sm ghost" ${i>hintsUsed||done?"disabled":""}>💡 힌트 ${i+1}${i>=hintsUsed&&!done?` (−${SC[i]-SC[i+1]}점)`:""}</button><span class="hint-t">${i<hintsUsed?md(h):""}</span></div>`).join("")}</div>
        <div id="oly-sol" ${done?"":"hidden"}><h3>풀이</h3><ol class="steps">${x.sol.map(t=>`<li>${md(t)}</li>`).join("")}</ol><div class="box ok"><b>💡 아하!</b> ${md(x.aha)}</div><p class="muted">정답: ${md(x.ans)}${done?` · 이 문제 ${cur.score!=null?cur.score:0}점`:""}</p></div>
      </div>
      <div class="row" style="margin-top:14px"><a class="btn" href="#/olympiad/random">🎲 다음 문제</a>${ls?`<a class="btn ghost" href="#/study/${ls.unit}/${ls.id}">📘 ${ls.title}</a>`:""}<a class="btn ghost" href="#/roadmap/${x.node}">🗺 개념의 자리</a><a class="btn ghost" href="#/olympiad?b=${x.band}">목록</a></div>`);
      main.querySelectorAll(".oly-hints .hint button").forEach(b=>b.onclick=()=>{ const i=+b.closest(".hint").dataset.i; if(i!==hintsUsed) return; hintsUsed++; draw(); });
      const inp=$("#oly-in"); if(inp){ inp.focus(); const check=()=>{ const v=inp.value.trim().replace(/\s/g,""); if(!v) return; const norm=t=>String(t).replace(/\s/g,"").replace(/°/g,"").toLowerCase(); let ok=false; const nv=Number(v.replace(/[^0-9.\-\/]/g,"")); const na=Number(String(x.ans).replace(/[^0-9.\-]/g,"")); if(norm(v)===norm(x.ans)) ok=true; else if(/^-?\d+\/\d+$/.test(v)&&/^-?\d+\/\d+$/.test(x.ans)){ const f=t=>t.split("/").map(Number); const [a,b]=f(v),[c,d]=f(x.ans); ok=a*d===b*c; } else if(!isNaN(nv)&&!isNaN(na)&&/^-?[\d.]+$/.test(v)) ok=Math.abs(nv-na)<=(x.tol||1e-9);
        if(ok){ done=true; const sc=SC[hintsUsed]; const rr=store.get("oly",{}); const prev=rr[id]; if(!prev||!prev.ok||prev.score<sc) rr[id]={ok:true,score:sc,when:Date.now()}; store.set("oly",rr); draw(); $("#oly-fb").innerHTML=`<div class="box ok">🎉 정답! <b>${sc}점</b> ${MEDAL(x.level)} — 아래 '아하' 를 꼭 읽어 보세요.</div>`; $("#oly-sol").scrollIntoView({behavior:"smooth",block:"center"}); }
        else { $("#oly-fb").innerHTML=`<div class="box warn">❌ 아직 아니에요. ${hintsUsed<3?"힌트를 하나 열어 볼까요?":"풀이를 보고 싶으면 아래 버튼을."}</div>${hintsUsed>=3?'<button class="btn sm ghost" id="oly-show">풀이 보기 (0점)</button>':""}`; const sb=$("#oly-show"); if(sb) sb.onclick=()=>{ done=true; const rr=store.get("oly",{}); if(!rr[id]||!rr[id].ok) rr[id]={ok:true,score:0,when:Date.now()}; store.set("oly",rr); draw(); }; } };
        $("#oly-go").onclick=check; inp.addEventListener("keydown",e=>{ if(e.key==="Enter") check(); }); }
      typeset(); }
    draw();
  }
  // ---------- 학교 시험 필수 문제 ----------
  function schooltest(qs){
    const SE=D.schoolExams; const pr=new URLSearchParams(qs||""); const grade=pr.get("g")||"m11"; const term=pr.get("t")||"mid"; const done=store.get("st",{});
    const grades=GORDER.filter(g=>SE.some(e=>e.grade===g)); const sets=SE.filter(e=>e.grade===grade); const cur=sets.find(e=>e.term===term)||sets[0];
    const TN={mid:"중간고사",final:"기말고사",mock:"학력평가"};
    render(`<div class="crumb"><a href="#/">홈</a> › 학교 시험 필수 문제</div><h1>🏫 학교 시험 필수 문제</h1>
    <p class="lead">학년·학기별 중간·기말고사(고등은 학력평가 포함)에서 교육과정상 <b>반드시 출제되는 유형</b>을 서술형 풀이와 함께 모았습니다. 각 문제에 '출제 의도' 를 적어 두었으니 <b>왜 이 문제가 나오는지</b>부터 읽으세요. 총 ${SE.reduce((a,e)=>a+e.items.length,0)}문항.</p>
    <div class="box"><b>쓰는 법</b> — ① 풀이를 가리고 직접 푼다 → ② '풀이 보기' 로 단계를 맞춰 본다(틀린 단계가 곧 복습 지점) → ③ 맞혔으면 체크. 시험 1주 전에는 체크 안 된 문제만 다시.</div>
    <div class="pill-row">${grades.map(g=>`<a class="pill ${g===grade?"on":""}" href="#/schooltest?g=${g}">${G[g]}</a>`).join("")}</div>
    <div class="pill-row">${sets.map(e=>`<a class="pill ${e.term===cur.term?"on":""}" href="#/schooltest?g=${grade}&t=${e.term}">${TN[e.term]}</a>`).join("")}</div>
    <h2>${cur.title} <span class="muted" style="font-size:.9rem;font-weight:400">${cur.range}</span></h2>
    <div class="st-list">${cur.items.map((it,i)=>{ const k=cur.grade+":"+cur.term+":"+i; const l=byLesson(it.l); return `<div class="card stq ${done[k]?"done":""}"><div class="st-h"><span class="qn">${i+1}</span>${it.kind?`<span class="tag kind">[${it.kind}]</span>`:""}<span class="tag">${it.pts}점</span><span class="eyebrow">출제 의도 · ${it.intent}</span><label class="st-chk"><input type="checkbox" data-k="${k}" ${done[k]?"checked":""}> 맞힘</label></div><div class="qrow"><p style="font-size:1.05rem">${md(it.q)}</p>${figAny(it,"qfig")}</div>${it.opts?`<div class="choices" data-a="${it.a}">${it.opts.map((o,j)=>`<button class="choice" data-j="${j}"><span class="num">${["①","②","③","④","⑤"][j]}</span> ${md(o)}</button>`).join("")}</div>`:'<p class="muted" style="font-size:.85rem">✍️ 서술형 — 풀이 과정을 쓰고 아래와 비교하세요.</p>'}<details class="sol"><summary>풀이 보기</summary><ol class="steps">${it.steps.map(s=>`<li>${md(s)}</li>`).join("")}</ol><p><b>답:</b> ${md(it.ans)}</p>${l?`<p class="muted">📘 <a href="#/study/${l.unit}/${l.id}">${l.title}</a> 에서 개념 다시 보기</p>`:""}</details></div>`; }).join("")}</div>
    <div class="row" style="margin-top:14px"><a class="btn" href="#/paper?g=${grade}&t=${cur.term}">🖨 시험지로 보기·인쇄</a><a class="btn ghost" href="#/exam">📝 시험 전 훑기(체크리스트)</a><a class="btn ghost" href="#/mix">🔀 섞어 풀기</a>${["h11","h12","h2a","h2c","h2p","h3c","h3g"].includes(grade)?`<a class="btn" href="#/patterns">🧭 수능 패턴 도감</a>`:""}</div>`);
    main.querySelectorAll(".choices").forEach(box=>box.querySelectorAll(".choice").forEach(b=>b.onclick=()=>{ if(box.dataset.done) return; box.dataset.done=1; const ok=+b.dataset.j===+box.dataset.a; b.classList.add(ok?"ok":"bad"); if(!ok) box.querySelector(`.choice[data-j="${box.dataset.a}"]`).classList.add("ok"); const card=box.closest(".card"); if(ok){ const c=card.querySelector(".st-chk input"); if(c&&!c.checked){ c.checked=true; c.dispatchEvent(new Event("change")); } } else card.querySelector("details.sol").open=true; }));
    main.querySelectorAll(".st-chk input").forEach(c=>c.onchange=()=>{ const d=store.get("st",{}); if(c.checked) d[c.dataset.k]=Date.now(); else delete d[c.dataset.k]; store.set("st",d); c.closest(".card").classList.toggle("done",c.checked); });
  }
  // ---------- 시험지 모드 (실제 시험지 형식 + 인쇄) ----------
  function paper(qs){
    const pr=new URLSearchParams(qs||""); const grade=pr.get("g")||"g22", term=pr.get("t")||"final"; const set=D.schoolExams.find(e=>e.grade===grade&&e.term===term)||D.schoolExams[0];
    const TN={mid:"중간고사",final:"기말고사",mock:"학력평가"}; const total=set.items.reduce((a,it)=>a+it.pts,0);
    render(`<div class="crumb noprint"><a href="#/">홈</a> › <a href="#/schooltest?g=${grade}&t=${term}">학교 시험 필수 문제</a> › 시험지</div>
    <div class="row noprint" style="margin-bottom:10px"><button class="btn" id="print">🖨 인쇄 / PDF 저장</button><button class="btn ghost" id="toggle-ans">정답·풀이 숨기기</button><a class="btn ghost" href="#/schooltest?g=${grade}&t=${term}">← 문제 풀기 화면</a></div>
    <div class="paper" id="paper">
      <div class="paper-head"><div class="paper-top"><span>TAD 수학 만지기</span><span>${G[grade]} · ${TN[set.term]}</span></div><h1>${set.title} 대비 필수 문제</h1><div class="paper-sub">[ 수 학 ] · 시험 범위: ${set.range}</div><div class="paper-info"><span>학년 &nbsp; 반 &nbsp; 번호</span><span>이름:</span><span>점수: &nbsp; / ${total}</span></div><ul class="paper-notes"><li>각 문항의 배점은 문제 끝에 표시되어 있습니다.</li><li>선택형은 ①~⑤ 중 하나를 고르고, 서술형은 풀이 과정을 씁니다.</li></ul></div>
      <div class="paper-body">${set.items.map((it,i)=>`<div class="pq"><div class="pq-q"><b>${i+1}.</b> ${it.kind?`<b>[${it.kind}]</b> `:""}${md(it.q)} <b>[${it.pts}점]</b></div>${figAny(it,"pfig")}${it.opts?`<div class="pq-opts">${it.opts.map((o,j)=>`<span>${["①","②","③","④","⑤"][j]} ${md(o)}</span>`).join("")}</div>`:'<div class="pq-blank"></div>'}</div>`).join("")}</div>
      <div class="paper-ans" id="ans"><h2>정답 및 풀이</h2><ol>${set.items.map(it=>`<li>${it.opts?`<b>${["①","②","③","④","⑤"][it.a]}</b> — `:""}${it.steps.map(s=>md(s)).join(" ")} <b>답: ${md(it.ans)}</b></li>`).join("")}</ol></div>
    </div>`);
    $("#print").onclick=()=>window.print(); $("#toggle-ans").onclick=e=>{ const a=$("#ans"); a.hidden=!a.hidden; e.target.textContent=a.hidden?"정답·풀이 보이기":"정답·풀이 숨기기"; };
  }

  // ---------- 오답 노트 ----------
  function notes(){ const n=store.get("notes",[]); const TAGS=["계산 실수","개념 오류","문제 해석","풀이 못함"]; const tags=store.get("notetags",{});
    const key=x=>x.key+"#"+x.i+"#"+x.when; const cnt={}; n.forEach(x=>{const t=tags[key(x)]; if(t) cnt[t]=(cnt[t]||0)+1;}); const byUnitC={}; n.forEach(x=>{const l=byLesson(x.key.replace("lesson:","")); if(l){ byUnitC[l.unitTitle]=(byUnitC[l.unitTitle]||0)+1; }});
    render(`<div class="crumb"><a href="#/">홈</a> › 오답 노트</div><h1>📒 내 오답 노트</h1><p class="lead">퀴즈·섞어 풀기에서 틀린 문제가 자동으로 모입니다. 각 문제에 <b>틀린 이유</b>를 붙이세요 — 어떤 유형의 실수가 반복되는지 아는 것이 점수를 가장 빨리 올립니다.</p>
    ${n.length?`<div class="grid"><div class="card"><h3>틀린 이유 분포</h3>${TAGS.map(t=>`<div class="row" style="justify-content:space-between"><span>${t}</span><b>${cnt[t]||0}</b></div><div class="progress"><i style="width:${n.length?(cnt[t]||0)/n.length*100:0}%"></i></div>`).join("")}<p class="muted" style="font-size:.85rem">미분류 ${n.length-Object.values(cnt).reduce((a,b)=>a+b,0)}</p></div><div class="card"><h3>단원별</h3>${Object.entries(byUnitC).sort((a,b)=>b[1]-a[1]).map(([u,c])=>`<div class="row" style="justify-content:space-between"><span>${u}</span><b>${c}</b></div>`).join("")}</div><div class="card"><h3>처방</h3><p class="muted">계산 실수 → 검산 습관(답을 식에 대입)<br>개념 오류 → 그 소단원 '오개념' 다시 읽기<br>문제 해석 → 문제를 그림·표로 옮기기<br>풀이 못함 → '왜 그런지'와 예제부터</p></div></div>`:""}
    <div class="row" style="margin:12px 0"><button class="btn ghost" id="exp">내보내기</button><button class="btn ghost" id="clr">모두 지우기</button></div>
    ${n.length?`<table><tr><th>날짜</th><th>문제</th><th>소단원</th><th>틀린 이유</th></tr>${n.map(x=>{const l=byLesson(x.key.replace("lesson:","")); const k=key(x); return `<tr><td>${new Date(x.when).toLocaleDateString("ko")}</td><td>${esc(x.q)}</td><td>${l?`<a href="#/study/${l.unit}/${l.id}">${l.title}</a>`:""}</td><td><select data-k="${k}"><option value="">—</option>${TAGS.map(t=>`<option ${tags[k]===t?"selected":""}>${t}</option>`).join("")}</select></td></tr>`;}).join("")}</table>`:`<p class="muted">아직 비어 있습니다. <a href="#/study">소단원 퀴즈</a>나 <a href="#/mix">섞어 풀기</a>를 해 보세요.</p>`}`);
    main.querySelectorAll("select[data-k]").forEach(sel=>sel.onchange=()=>{ tags[sel.dataset.k]=sel.value; store.set("notetags",tags); });
    $("#exp").onclick=()=>{ const blob=new Blob([JSON.stringify({notes:n,notetags:tags,quiz:store.get("quiz",{}),diag:store.get("diag",[]),srs:store.get("srs",{}),exam:store.get("exam",{}),essay:store.get("essay",{}),daily:store.get("daily",{})},null,2)],{type:"application/json"}); const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="my-math-record.json"; a.click(); };
    $("#clr").onclick=()=>{ if(confirm("오답 노트를 비울까요?")){store.set("notes",[]);notes();} }; }

  // ---------- 검색 ----------
  function search(q){ q=(q||"").trim().toLowerCase(); if(!q) return render(`<h1>검색</h1>`);
    const L=lessonsAll.filter(l=>(l.title+l.concept.join(" ")).toLowerCase().includes(q)); const F=D.formulas.filter(f=>(f.title+f.tex).toLowerCase().includes(q)); const Cc=D.concepts.filter(c=>(c.term+c.def+c.en).toLowerCase().includes(q)); const Lf=D.life.filter(x=>(x.title+x.body).toLowerCase().includes(q)); const P=D.people.filter(p=>(p.name+p.body).toLowerCase().includes(q));
    render(`<h1>🔍 "${esc(q)}" 검색 결과</h1>${L.length?`<h2>소단원</h2><ul>${L.map(l=>`<li><a href="#/study/${l.unit}/${l.id}">${l.title}</a> <span class="muted">${l.unitTitle}</span></li>`).join("")}</ul>`:""}${F.length?`<h2>공식</h2><ul>${F.map(f=>`<li><a href="#/formulas/${f.id}">${f.title}</a></li>`).join("")}</ul>`:""}${Cc.length?`<h2>개념</h2><ul>${Cc.map(c=>`<li><b>${c.term}</b> — ${md(c.def)}</li>`).join("")}</ul>`:""}${Lf.length?`<h2>생활 속 수학</h2><ul>${Lf.map(x=>`<li><a href="#/life">${x.title}</a></li>`).join("")}</ul>`:""}${P.length?`<h2>인물</h2><ul>${P.map(p=>`<li><a href="#/people">${p.name}</a></li>`).join("")}</ul>`:""}${!(L.length+F.length+Cc.length+Lf.length+P.length)?`<p class="muted">결과가 없습니다.</p>`:""}`); }
  $("#q").addEventListener("keydown",e=>{ if(e.key==="Enter"){ location.hash="#/search?q="+encodeURIComponent(e.target.value); } });

  function about(){ render(`<h1>사이트 소개</h1><div class="card"><p><b>TAD 수학 만지기</b>는 중1부터 고3까지의 수학(중2-2~중3-2 를 가장 깊게)을 "외우기 전에 먼저 만져 보는" 방식으로 익히는 무료·오픈소스 학습 사이트입니다. 로그인·결제가 없고, 학습 기록은 사용자의 브라우저(localStorage)에만 저장됩니다.</p>
    <h3>단원 체계의 근거</h3><p>교육부 고시 2022 개정 수학과 교육과정(중학교 2·3학년 영역: 수와 연산, 변화와 관계, 도형과 측정, 자료와 가능성)의 성취기준을 따르며, 2015 개정 교육과정과 공통인 범위(이등변삼각형·사각형·닮음·피타고라스·확률 / 제곱근·인수분해·이차방정식·이차함수 / 삼각비·원·통계)를 다룹니다. 상자그림은 2022 개정에서 중3 통계에 추가된 내용입니다. 학교별 진도·범위는 교과서 차례로 확인하세요.</p>
    <h3>기술</h3><p>정적 HTML/CSS/JS, 수식 렌더링은 KaTeX(MIT), 위젯은 순수 Canvas 2D. 빌드 도구 없이 GitHub Pages 에서 그대로 동작합니다. 콘텐츠는 <code>data/*.js</code> 파일을 고치면 바로 반영됩니다.</p>
    <h3>저작권</h3><p>본문·문항·위젯 코드는 이 저장소의 저작자가 작성했으며 MIT 라이선스로 공개합니다. 사이트 구조(개념 지도·공식 되살리기·끊긴 고리 진단 등)는 공개된 수학 학습 사이트들의 접근 방식을 참고하되 텍스트·코드·이미지를 복제하지 않았습니다. 인물 정보는 일반적으로 알려진 수학사 사실에 근거합니다.</p>
    <h3>이미지 출처</h3><p>아이콘·일러스트는 <a href="https://openmoji.org" target="_blank" rel="noopener">OpenMoji</a> (CC BY-SA 4.0) 를 사용했습니다. 원본 파일과 라이선스는 <code>assets/openmoji/</code> 에 있습니다. 수학 인물의 초상은 퍼블릭 도메인 이미지를 <code>scripts/fetch-portraits.md</code> 의 안내대로 추가할 수 있습니다.</p><h3>검증</h3><p>모든 문항의 정답·풀이는 작성 후 재검산했고, 위젯의 기하(원주각 = 중심각의 절반, 무게중심 2:1, 합차 공식의 넓이 보존, 상대도수의 수렴 등)는 수치 판독값으로 확인됩니다. 오류를 발견하면 GitHub 이슈로 알려 주세요.</p><h3>기여</h3><p>오류 제보와 문항·위젯 추가는 GitHub 이슈/PR 로 환영합니다. README 의 "콘텐츠 추가 방법" 을 참고하세요.</p></div>`); }
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
    if(r==="bridge") return bridge(p[1]);
    if(r==="essay") return essay(p[1]);
    if(r==="daily") return daily();
    if(r==="teacher") return teacher();
    if(r==="mix") return mix(qs);
    if(r==="concepts") return concepts(qs);
    if(r==="recall") return recall(p[1]);
    if(r==="exam") return exam(p[1]);
    if(r==="life") return life(qs);
    if(r==="people") return people();
    if(r==="patterns") return patterns(p[1],qs);
    if(r==="olympiad") return olympiad(p[1],qs);
    if(r==="nonsul") return nonsul(p[1],qs);
    if(r==="schooltest") return schooltest(qs);
    if(r==="paper") return paper(qs);
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
  const applyTheme=t=>{ document.documentElement.dataset.theme=t; const b=$("#theme"); if(b){ b.textContent=t==="dark"?"☀️":"🌙"; b.title=t==="dark"?"라이트 모드로":"다크 모드로"; } const mc=document.querySelector('meta[name="theme-color"]'); if(mc) mc.content=t==="dark"?"#0f1420":"#f7f9fc"; };
  const th=store.get("theme",null)||(window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"); applyTheme(th);
  $("#theme").onclick=()=>{ const cur=document.documentElement.dataset.theme==="dark"?"light":"dark"; applyTheme(cur); store.set("theme",cur); };
  // KaTeX 가 늦게 로드될 수 있으므로 로드 후 한 번 더 조판
  window.addEventListener("load",()=>setTimeout(typeset,50));
  route();
})();
