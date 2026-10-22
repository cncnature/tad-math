/* 생활 속 수학 도면: 파라미터로 그리는 SVG. FIG[id](p) → svg 문자열. 색은 CSS 변수를 써서 다크 모드에도 맞습니다. */
(function(){
  const F = window.FIG = {};
  const S = (w,h,inner)=>`<svg class="fig" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img">${inner}</svg>`;
  const T = (x,y,t,o={})=>`<text x="${x}" y="${y}" font-size="${o.s||12}" fill="${o.c||"var(--ink)"}" text-anchor="${o.a||"start"}" font-weight="${o.w||500}">${t}</text>`;
  const L = (x1,y1,x2,y2,o={})=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${o.c||"var(--ink)"}" stroke-width="${o.w||2}" ${o.d?`stroke-dasharray="${o.d}"`:""} stroke-linecap="round"/>`;
  const P = (pts,o={})=>`<polygon points="${pts}" fill="${o.f||"rgba(47,111,237,.12)"}" stroke="${o.c||"var(--ink)"}" stroke-width="${o.w||2}" stroke-linejoin="round"/>`;
  const R = (x,y,w,h,o={})=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r||0}" fill="${o.f||"rgba(47,111,237,.12)"}" stroke="${o.c||"var(--ink)"}" stroke-width="${o.w||2}"/>`;
  const C = (x,y,r,o={})=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${o.f||"none"}" stroke="${o.c||"var(--ink)"}" stroke-width="${o.w||2}"/>`;
  const RA = (x,y,ux,uy,vx,vy,k=12)=>`<path d="M${x+ux*k},${y+uy*k} L${x+(ux+vx)*k},${y+(uy+vy)*k} L${x+vx*k},${y+vy*k}" fill="none" stroke="var(--bad)" stroke-width="1.5"/>`; // 직각 표시
  const ACC="var(--acc)", ACC2="var(--acc2)", MUT="var(--muted)", OK="var(--ok)";

  // 직각삼각형 (가로 a, 세로 b) + 라벨
  F.rightTri = ({a="a",b="b",c="c",w=320,h=200,ang=null,angLabel="",flip=false})=>{
    const ox=50, oy=170, W=220, H=130;
    return S(w,h, P(`${ox},${oy} ${ox+W},${oy} ${flip?ox:ox+W},${oy-H}`)+RA(flip?ox:ox+W,oy,flip?1:-1,0,0,-1)
      +T(ox+W/2,oy+18,a,{a:"middle"})+T((flip?ox:ox+W)+(flip?-10:12),oy-H/2,b,{a:flip?"end":"start"})+T(ox+W/2+(flip?-14:14),oy-H/2-8,c,{c:ACC,a:"middle",w:700})
      +(ang?`<path d="M${flip?ox+W:ox}${flip?"":""},${oy} ${flip?`A28,28 0 0 0 ${ox+W-28},${oy-14}`:`A28,28 0 0 1 ${ox+26},${oy-12}`}" fill="none" stroke="${ACC2}" stroke-width="2"/>`+T(flip?ox+W-46:ox+34,oy-8,angLabel||ang,{c:ACC2,s:12}):""));
  };
  // TV 화면 16:9 와 대각선
  F.tv = ({diag="55″",wlab="가로 ?",hlab="세로 ?"})=>S(320,200, R(30,25,256,144,{r:6,f:"rgba(20,30,60,.08)"})+L(30,169,286,25,{c:ACC,d:"6 4"})+T(150,90,diag,{c:ACC,a:"middle",w:700,s:14})+T(158,192,wlab,{a:"middle",s:11})+T(140,150,hlab,{a:"middle",s:11,c:ACC2})+R(118,172,80,8,{f:MUT,c:"none"}));
  // 사다리 벽에 기대기
  F.ladder = ({len="4 m",base="1 m",high="≈3.87 m",ang="≈75.5°"})=>S(320,220, R(230,20,10,180,{f:"rgba(20,30,60,.15)",c:"none"})+L(20,200,300,200,{c:MUT})+L(70,200,232,40,{c:ACC2,w:6})+L(70,200,232,200,{c:ACC,d:"5 4"})+L(232,40,232,200,{c:ACC,d:"5 4"})
      +T(150,110,len,{c:ACC2,w:700})+T(150,218,base,{a:"middle"})+T(246,120,high,{s:11})+`<path d="M100,200 A30,30 0 0 0 96,176" fill="none" stroke="${ACC2}" stroke-width="2"/>`+T(106,190,ang,{c:ACC2,s:11})+RA(232,200,-1,0,0,-1));
  // 경사로 (높이/거리 → 기울기 %)
  F.ramp = ({run="100 m",rise="8 m",pct="8%"})=>S(320,160, P("20,130 300,130 300,66",{f:"rgba(255,138,61,.18)"})+L(20,130,300,130,{c:MUT})+T(160,148,run,{a:"middle"})+T(306,100,rise,{s:11})+T(140,88,pct,{c:ACC2,w:700,s:16})+`<path d="M60,130 A40,40 0 0 0 58,121" fill="none" stroke="${ACC2}" stroke-width="2"/>`+T(64,124,"θ",{c:ACC2,s:11})+RA(300,130,-1,0,0,-1));
  // 건물 높이 재기 (tan)
  F.building = ({d="100 m",ang="30°",h="h = ?",eye="눈높이 1.6 m"})=>S(340,220, R(250,40,60,160,{f:"rgba(20,30,60,.12)",r:3})+L(20,200,320,200,{c:MUT})+C(60,170,6,{f:ACC})+L(60,170,250,40,{c:ACC,d:"6 4"})+L(60,170,250,170,{c:ACC2,d:"4 4"})+L(250,40,250,170,{c:ACC2,d:"4 4"})
      +T(155,190,d,{a:"middle",s:11})+T(258,110,h,{s:12,c:ACC2,w:700})+`<path d="M100,170 A40,40 0 0 0 95,147" fill="none" stroke="${ACC}" stroke-width="2"/>`+T(103,160,ang,{c:ACC,s:11})+T(20,165,eye,{s:10,c:MUT})+RA(250,170,-1,0,0,-1));
  // 세 마을과 외심 / 내심 — 좌표에서 정확히 계산
  F.towns = ({mode="circum"})=>{ const A=[70,170],B=[280,150],Cc=[150,40];
    const d=(p,q)=>Math.hypot(p[0]-q[0],p[1]-q[1]);
    // 외심: 수직이등분선의 교점 (공식)
    const [ax,ay]=A,[bx,by]=B,[cx,cy]=Cc; const D=2*(ax*(by-cy)+bx*(cy-ay)+cx*(ay-by));
    const ox=((ax*ax+ay*ay)*(by-cy)+(bx*bx+by*by)*(cy-ay)+(cx*cx+cy*cy)*(ay-by))/D, oy=((ax*ax+ay*ay)*(cx-bx)+(bx*bx+by*by)*(ax-cx)+(cx*cx+cy*cy)*(bx-ax))/D; const R=d([ox,oy],A);
    // 내심: 대변 길이 가중 평균, r = 2S/둘레
    const a=d(B,Cc), b=d(Cc,A), c=d(A,B); const ix=(a*ax+b*bx+c*cx)/(a+b+c), iy=(a*ay+b*by+c*cy)/(a+b+c); const S2=Math.abs((bx-ax)*(cy-ay)-(cx-ax)*(by-ay)); const r=S2/(a+b+c);
    const O=mode==="circum"?[ox,oy]:[ix,iy];
    const aux = mode==="circum"
      ? [[A,B],[B,Cc],[Cc,A]].map(([p,q])=>{ const m=[(p[0]+q[0])/2,(p[1]+q[1])/2]; return L(m[0],m[1],ox,oy,{c:MUT,w:1,d:"4 3"}); }).join("")+C(ox,oy,R,{c:ACC,d:"6 4"})
      : [A,B,Cc].map(p=>L(p[0],p[1],ix,iy,{c:MUT,w:1,d:"4 3"})).join("")+C(ix,iy,r,{c:ACC,d:"6 4"});
    return S(340,210, P(`${A} ${B} ${Cc}`,{f:"rgba(47,111,237,.06)"})+aux+[A,B,Cc].map(p=>C(p[0],p[1],7,{f:ACC2,c:"none"})).join("")+C(O[0],O[1],6,{f:ACC,c:"none"})
      +T(O[0]+10,O[1]-8,mode==="circum"?"외심 = 우물":"내심 = 소방서",{c:ACC,w:700,s:12})+T(O[0]+10,O[1]+8,mode==="circum"?"세 마을까지 같은 거리":"세 도로까지 같은 거리",{c:MUT,s:10})
      +T(55,190,"마을 A",{s:11})+T(265,172,"마을 B",{s:11})+T(135,30,"마을 C",{s:11})); };
  // 격자 36칸 (두 주사위)
  F.grid36 = ({cond=(a,b)=>a+b===7,label="합 = 7"})=>{ let g=""; for(let a=1;a<=6;a++)for(let b=1;b<=6;b++){ const hit=cond(a,b); g+=R(40+(b-1)*36,20+(a-1)*28,34,26,{f:hit?"rgba(255,138,61,.55)":"rgba(47,111,237,.08)",c:"var(--line)",w:1})+T(57+(b-1)*36,38+(a-1)*28,`${a},${b}`,{a:"middle",s:10,c:hit?"var(--ink)":MUT}); }
    let n=0; for(let a=1;a<=6;a++)for(let b=1;b<=6;b++) if(cond(a,b)) n++;
    return S(290,200, g+T(20,33,"1",{s:10})+T(20,173,"6",{s:10})+T(150,195,`${label}: ${n} / 36`,{a:"middle",w:700,c:ACC2})); };
  // 포물선 궤적 (농구)
  F.parabola = ({label="y = −x² + 4x", vertex="최고점 (2, 4)"})=>{ let d=""; for(let x=0;x<=4;x+=0.1){ const y=-x*x+4*x; d+=(x?"L":"M")+(40+x*60)+","+(170-y*32)+" "; }
    return S(320,200, L(30,170,300,170,{c:MUT})+L(40,180,40,20,{c:MUT})+`<path d="${d}" fill="none" stroke="${ACC}" stroke-width="3"/>`+C(160,42,6,{f:ACC2,c:"none"})+T(170,38,vertex,{c:ACC2,s:11,w:700})+T(60,30,label,{s:12})+C(40,170,7,{f:"#e67e22",c:"none"})+R(280,100,8,70,{f:MUT,c:"none"})+T(286,95,"림",{s:10,c:MUT})); };
  // 울타리 텃밭 넓이 (x, 10−x)
  F.garden = ({x=5,per=20})=>{ const y=per/2-x; const sc=14; return S(320,200, R(60,170-y*sc,x*sc,y*sc,{f:"rgba(31,157,85,.25)",c:OK})+T(60+x*sc/2,188,`가로 x = ${x}`,{a:"middle",s:11})+T(60+x*sc+8,170-y*sc/2,`세로 ${per/2}−x = ${y}`,{s:11})+T(60,30,`둘레 ${per} m → 넓이 ${x*y} m²`,{w:700,s:13,c:OK})); };
  // 피자 두 판 비교
  F.pizza = ({r1=25,r2=33})=>{ const k=1.6; return S(340,200, C(80,110,r1*k,{f:"rgba(255,138,61,.35)",c:ACC2})+C(240,110,r2*k,{f:"rgba(255,138,61,.35)",c:ACC2})+T(80,110,`M ${r1}cm`,{a:"middle",s:12,w:700})+T(240,110,`L ${r2}cm`,{a:"middle",s:12,w:700})+T(170,185,`넓이비 ${r1}² : ${r2}² = ${r1*r1} : ${r2*r2} ≈ 1 : ${(r2*r2/(r1*r1)).toFixed(2)}`,{a:"middle",s:11,c:MUT})); };
  // 원 안의 접선 (피자 상자) 와 현(터널)
  F.boxCircle = ()=>S(300,200, R(50,20,160,160,{f:"rgba(20,30,60,.06)"})+C(130,100,80,{f:"rgba(255,138,61,.25)",c:ACC2})+L(130,100,210,100,{c:ACC,d:"4 3"})+T(170,94,"r",{c:ACC,s:12})+RA(210,100,-1,0,0,-1)+T(220,105,"접점",{s:11})+T(225,60,"접선 ⊥ 반지름",{s:11,c:MUT}));
  F.tunnel = ({r=5,d=3,half=4})=>S(320,190, `<path d="M40,160 A120,120 0 0 1 280,160" fill="rgba(47,111,237,.1)" stroke="var(--ink)" stroke-width="2"/>`+L(40,160,280,160,{c:MUT})+C(160,160,5,{f:ACC,c:"none"})+L(160,160,160,88,{c:ACC2,d:"4 3"})+L(88,88,232,88,{c:ACC,w:3})+L(160,160,232,88,{c:ACC,d:"4 3"})+T(166,128,`d = ${d}`,{c:ACC2,s:11})+T(160,80,`현 ${half*2} (절반 ${half})`,{a:"middle",s:11,c:ACC})+T(205,135,`r = ${r}`,{c:ACC,s:11})+RA(160,88,0,1,1,0));
  // 축구 골대와 원주각
  F.goal = ()=>S(320,200, L(110,180,210,180,{c:ACC2,w:6})+C(160,110,86,{c:ACC,d:"6 4"})+[[90,45],[160,24],[230,45],[75,90]].map(p=>C(p[0],p[1],5,{f:ACC,c:"none"})+L(p[0],p[1],110,180,{c:MUT,w:1})+L(p[0],p[1],210,180,{c:MUT,w:1})).join("")+T(160,196,"골대",{a:"middle",s:11,c:ACC2})+T(240,22,"같은 호 → 같은 각",{s:11,c:ACC}));
  // 상자그림
  F.boxplot = ({min=-8,q1=2,med=6,q3=10,max=19,lo=-12,hi=24,lab=["최솟값","Q1","중앙값","Q3","최댓값"]})=>{ const X=v=>30+(v-lo)/(hi-lo)*260, y=70; return S(320,150, L(X(min),y,X(q1),y)+L(X(q3),y,X(max),y)+L(X(min),y-12,X(min),y+12)+L(X(max),y-12,X(max),y+12)+R(X(q1),y-22,X(q3)-X(q1),44,{f:"rgba(47,111,237,.25)",c:ACC})+L(X(med),y-22,X(med),y+22,{c:ACC2,w:3})+[min,q1,med,q3,max].map((v,i)=>T(X(v),y+40+(i%2?12:0),`${lab[i]} ${v}`,{a:"middle",s:10,c:MUT})).join("")+T(30,20,"30년 평년 기온 분포(예시, °C)",{s:11,c:MUT})); };
  // 산점도
  F.scatter = ({pts=[[1,2],[2,3],[3,3.5],[4,5],[5,5.5],[6,7],[7,8]],xl="아이스크림 판매량",yl="익사 사고",corr="양의 상관"})=>S(320,200, L(40,170,300,170,{c:MUT})+L(40,170,40,20,{c:MUT})+pts.map(p=>C(40+p[0]*34,170-p[1]*18,5,{f:ACC,c:"none"})).join("")+T(170,190,xl,{a:"middle",s:11})+T(46,30,yl,{s:11})+T(230,60,corr,{c:ACC2,w:700,s:12})+T(230,76,"(원인은 '여름')",{s:10,c:MUT}));
  // 평행사변형 링크(빨래 건조대)
  F.linkage = ()=>S(320,200, [0,1,2].map(i=>P(`${40+i*80},150 ${90+i*80},150 ${120+i*80},70 ${70+i*80},70`,{f:"rgba(47,111,237,.1)"})).join("")+L(40,150,300,150,{c:ACC2,w:4})+L(70,70,330,70,{c:ACC2,w:4})+T(160,190,"대각선이 서로 이등분 → 항상 평행 유지",{a:"middle",s:11,c:MUT}));
  // 종이접기 이등변삼각형
  F.fold = ()=>S(320,200, R(40,40,240,120,{f:"rgba(20,30,60,.05)"})+P("40,160 280,40 280,160",{f:"rgba(255,138,61,.3)",c:ACC2})+L(40,160,280,40,{c:ACC,d:"6 4"})+T(165,185,"접은 선 = 대각선, 엇각으로 밑각이 같아진다",{a:"middle",s:11,c:MUT}));
  // A4 비율
  F.a4 = ()=>S(320,200, R(40,20,120,170,{f:"rgba(47,111,237,.1)"})+L(40,105,160,105,{c:ACC2,d:"5 4"})+R(200,20,85,120,{f:"rgba(255,138,61,.2)",c:ACC2})+T(100,15,"A4 1 : √2",{a:"middle",s:11,w:700})+T(242,15,"반으로 접으면 A5",{a:"middle",s:11})+T(242,150,"다시 1 : √2",{a:"middle",s:11,c:ACC2})+T(162,110,"접기",{s:10,c:MUT}));
  // 다이빙 낙하 h = 5t²
  F.dive = ({h=10,t="√2 ≈ 1.41초"})=>S(300,200, R(40,30,60,8,{f:MUT,c:"none"})+C(70,50,7,{f:ACC2,c:"none"})+L(70,60,70,170,{c:ACC,d:"6 4"})+`<path d="M20,170 Q40,160 60,170 T100,170 T140,170 T180,170 T220,170 T260,170" fill="none" stroke="${ACC}" stroke-width="2"/>`+T(80,115,`${h} m`,{s:12,w:700})+T(120,60,`h = 5t²  →  t = ${t}`,{s:12,c:ACC2}));
  // 코끼리 vs 생쥐 (닮음 제곱·세제곱)
  F.scaling = ()=>S(320,200, R(40,120,40,60,{f:"rgba(47,111,237,.2)"})+R(140,40,120,140,{f:"rgba(47,111,237,.2)"})+T(60,195,"길이 1",{a:"middle",s:11})+T(200,195,"길이 3",{a:"middle",s:11})+T(200,25,"넓이 9배 · 부피 27배",{a:"middle",s:12,w:700,c:ACC2}));
  // 액자 테두리 (이차방정식)
  F.frame = ({w=30,h=20,x="x"})=>S(320,200, R(30,20,260,160,{f:"rgba(255,138,61,.3)",c:ACC2})+R(60,45,200,110,{f:"var(--card)"})+T(160,105,`${w} × ${h} 사진`,{a:"middle",s:12})+T(45,35,x,{c:ACC2,s:12,w:700})+T(275,35,x,{c:ACC2,s:12,w:700})+T(160,195,"테두리 폭 x — 넓이 조건 → 이차방정식",{a:"middle",s:11,c:MUT}));
  // 가위바위보 세 명 경우의 수 (3×3×3)
  F.rps = ()=>S(320,120, [0,1,2].map(i=>[0,1,2].map(j=>[0,1,2].map(k=>R(20+(i*9+j*3+k)*10.5,40,9,30,{f:(i===j&&j===k)?"rgba(255,138,61,.6)":(i!==j&&j!==k&&i!==k)?"rgba(255,138,61,.6)":"rgba(47,111,237,.12)",c:"none"})).join("")).join("")).join("")+T(160,25,"3×3×3 = 27가지 중 비기는 경우 9가지 (주황)",{a:"middle",s:11,w:700}));
  // 공원 대각선 지름길
  F.shortcut = ({a=300,b=400,c=500})=>S(320,200, R(40,40,240,120,{f:"rgba(31,157,85,.15)",c:OK})+L(40,160,280,40,{c:ACC2,w:3,d:"8 5"})+T(160,178,`${a} m`,{a:"middle",s:11})+T(288,105,`${b} m`,{s:11})+T(150,90,`지름길 ${c} m`,{c:ACC2,w:700,s:12})+T(160,25,`둘러 가면 ${a+b} m, 지름길은 ${a+b-c} m 절약`,{a:"middle",s:11,c:MUT}));
  // 비밀번호 경우의 수
  F.password = ({n=4,base=10})=>S(320,110, Array.from({length:n},(_,i)=>R(40+i*60,20,48,48,{r:8,f:"rgba(47,111,237,.1)"})+T(64+i*60,50,base===10?"0~9":"62",{a:"middle",s:12})).join("")+T(160,95,`${base}^${n} = ${Math.pow(base,n).toLocaleString()} 가지`,{a:"middle",s:12,w:700,c:ACC2}));
  // 평균 같은 두 반 (막대)
  F.twoClasses = ()=>S(320,200, [70,70,70,70].map((v,i)=>R(40+i*22,170-v*1.4,18,v*1.4,{f:ACC,c:"none"})).join("")+[40,60,80,100].map((v,i)=>R(180+i*22,170-v*1.4,18,v*1.4,{f:ACC2,c:"none"})).join("")+L(30,170-70*1.4,300,170-70*1.4,{c:MUT,d:"4 4"})+T(84,190,"A반 σ=0",{a:"middle",s:11})+T(224,190,"B반 σ≈22.4",{a:"middle",s:11})+T(160,60,"평균 70 으로 같다",{a:"middle",s:11,c:MUT}));
  // 그림자로 높이 재기 (닮음)
  F.shadow = ()=>S(340,200, L(20,170,320,170,{c:MUT})+L(60,170,60,120,{c:ACC2,w:5})+L(60,170,110,170,{c:ACC2,w:3})+L(230,170,230,40,{c:ACC,w:8})+L(230,170,320,170,{c:ACC,w:3})+L(60,120,110,170,{c:MUT,d:"4 3"})+L(230,40,320,170,{c:MUT,d:"4 3"})+T(30,145,"막대 1 m",{s:10})+T(85,188,"그림자 1.5 m",{s:10,a:"middle"})+T(240,100,"나무 ? m",{s:11,c:ACC,w:700})+T(275,188,"그림자 9 m",{s:10,a:"middle"})+T(170,30,"같은 시각 → 닮은 삼각형",{a:"middle",s:11,c:MUT}));
  // 계단 경사 (tan)
  F.stairs = ()=>S(320,200, [0,1,2,3,4].map(i=>`<path d="M${40+i*48},${170-i*28} h48 v-28" fill="none" stroke="var(--ink)" stroke-width="2"/>`).join("")+L(40,170,280,30,{c:ACC,d:"6 4"})+T(80,60,"tanθ = 디딤판 28 / 챌면 48 ≈ 0.58 → θ ≈ 30°",{s:11,c:ACC})+T(160,190,"건축법: 계단 경사는 보통 30~35°",{a:"middle",s:10,c:MUT}));
  // 휴대폰 화면 (닮음, 대각선)
  F.phone = ()=>S(320,200, R(100,15,80,170,{r:14,f:"rgba(20,30,60,.08)"})+R(108,30,64,140,{f:"rgba(47,111,237,.15)",c:ACC})+L(108,170,172,30,{c:ACC2,d:"5 4"})+T(200,60,"6.1″ = 15.5 cm (대각선)",{s:11})+T(200,80,"19.5 : 9",{s:11})+T(200,100,"가로 ≈ 6.5 cm, 세로 ≈ 14.1 cm",{s:11,c:ACC2}));
  // 데이터 중앙값 vs 평균 (연봉)
  F.salary = ()=>S(320,200, [3,3.2,3.5,3.6,3.8,4,4.2,4.5,5,30].map((v,i)=>R(30+i*27,170-Math.min(v,20)*7,22,Math.min(v,20)*7,{f:i===9?ACC2:ACC,c:"none"})).join("")+T(270,25,"10억!",{s:11,c:ACC2,w:700})+T(160,190,"중앙값 3.9천만 vs 평균 6.5천만",{a:"middle",s:11,c:MUT}));
})();

/* ===== 범용 수학 도해 (소단원·공식 설명용) ===== */
(function(){
  const F=window.FIG; const ACC="var(--acc)",ACC2="var(--acc2)",MUT="var(--muted)",OK="var(--ok)",BAD="var(--bad)",INK="var(--ink)",G31="var(--g31)";
  const S=(w,h,inner)=>`<svg class="fig" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img">${inner}</svg>`;
  const T=(x,y,t,o={})=>`<text x="${x}" y="${y}" font-size="${o.s||12}" fill="${o.c||INK}" text-anchor="${o.a||"start"}" font-weight="${o.w||500}" ${o.i?'font-style="italic"':''}>${t}</text>`;
  const L=(x1,y1,x2,y2,o={})=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${o.c||INK}" stroke-width="${o.w||2}" ${o.d?`stroke-dasharray="${o.d}"`:""} stroke-linecap="round"/>`;
  const C=(x,y,r,o={})=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${o.f||"none"}" stroke="${o.c||INK}" stroke-width="${o.w||2}" ${o.d?`stroke-dasharray="${o.d}"`:""}/>`;
  const P=(pts,o={})=>`<polygon points="${pts}" fill="${o.f||"rgba(47,111,237,.12)"}" stroke="${o.c||INK}" stroke-width="${o.w||2}" stroke-linejoin="round"/>`;
  const R=(x,y,w,h,o={})=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r||0}" fill="${o.f||"rgba(47,111,237,.12)"}" stroke="${o.c||INK}" stroke-width="${o.w||2}"/>`;
  const ARR=(x1,y1,x2,y2,o={})=>{ const a=Math.atan2(y2-y1,x2-x1),k=9; return L(x1,y1,x2,y2,o)+`<path d="M${x2},${y2} L${x2-k*Math.cos(a-.4)},${y2-k*Math.sin(a-.4)} L${x2-k*Math.cos(a+.4)},${y2-k*Math.sin(a+.4)} Z" fill="${o.c||INK}"/>`; };

  // 함수 그래프 플로터: fns=[{f:x=>..., c, label, dom:[a,b]}], xr=[xmin,xmax], yr, pts=[[x,y,label]], shade={f,g,a,b}
  F.plot=({fns=[],xr=[-5,5],yr=[-5,5],pts=[],lines=[],shade=null,w=340,h=240,title="",grid=true,eq=false})=>{
    const px=30,py=16; const W=w-px-14,H=h-py-24; let sx=W/(xr[1]-xr[0]), sy=H/(yr[1]-yr[0]); if(eq){ const k=Math.min(sx,sy); sx=sy=k; }
    const ox=px+(W-sx*(xr[1]-xr[0]))/2, oy=py+(H-sy*(yr[1]-yr[0]))/2; const X=x=>ox+(x-xr[0])*sx, Y=y=>oy+(yr[1]-y)*sy;
    let s=""; if(grid){ for(let x=Math.ceil(xr[0]);x<=xr[1];x++) s+=L(X(x),py,X(x),py+H,{c:"var(--line)",w:1}); for(let y=Math.ceil(yr[0]);y<=yr[1];y++) s+=L(px,Y(y),px+W,Y(y),{c:"var(--line)",w:1}); }
    if(yr[0]<=0&&0<=yr[1]) s+=L(px,Y(0),px+W,Y(0),{c:MUT,w:1.5}); if(xr[0]<=0&&0<=xr[1]) s+=L(X(0),py,X(0),py+H,{c:MUT,w:1.5});
    for(let x=Math.ceil(xr[0]);x<=xr[1];x++) if(x&&x%Math.max(1,Math.round((xr[1]-xr[0])/10))===0) s+=T(X(x),Y(Math.max(yr[0],Math.min(0,yr[1])))+12,x,{s:9,c:MUT,a:"middle"});
    for(let y=Math.ceil(yr[0]);y<=yr[1];y++) if(y&&y%Math.max(1,Math.round((yr[1]-yr[0])/8))===0) s+=T(X(Math.max(xr[0],Math.min(0,xr[1])))-4,Y(y)+4,y,{s:9,c:MUT,a:"end"});
    if(shade){ const [a,b]=[shade.a,shade.b]; let d=""; const n=60; for(let i=0;i<=n;i++){const x=a+(b-a)*i/n; d+=(i?"L":"M")+X(x)+","+Y(shade.f(x))+" ";} for(let i=n;i>=0;i--){const x=a+(b-a)*i/n; d+="L"+X(x)+","+Y(shade.g?shade.g(x):0)+" ";} s+=`<path d="${d}Z" fill="${shade.c||"rgba(31,157,85,.25)"}" stroke="none"/>`; }
    fns.forEach(fn=>{ const [a,b]=fn.dom||xr; let d="",pen=false; const n=240; for(let i=0;i<=n;i++){ const x=a+(b-a)*i/n; let y; try{y=fn.f(x);}catch(e){y=NaN;} if(!isFinite(y)||y<yr[0]-50||y>yr[1]+50){pen=false;continue;} d+=(pen?"L":"M")+X(x).toFixed(1)+","+Y(y).toFixed(1)+" "; pen=true; } s+=`<path d="${d}" fill="none" stroke="${fn.c||ACC}" stroke-width="${fn.w||2.5}" ${fn.d?`stroke-dasharray="${fn.d}"`:""}/>`; if(fn.label){ const lx=fn.lx!=null?fn.lx:b-0.3; let ly; try{ly=fn.f(lx);}catch(e){ly=0;} const right=X(lx)>px+W*0.62; s+=T(X(lx)+(right?-4:4),Y(ly)-6,fn.label,{c:fn.c||ACC,s:11,w:700,a:right?"end":"start"}); } });
    lines.forEach(ln=>{ s+=L(X(ln.x1),Y(ln.y1),X(ln.x2),Y(ln.y2),{c:ln.c||ACC2,w:ln.w||1.5,d:ln.d!=null?ln.d:"4 3"}); if(ln.label) s+=T(X(ln.x2)+4,Y(ln.y2)-4,ln.label,{c:ln.c||ACC2,s:10}); });
    pts.forEach(p=>{ s+=C(X(p[0]),Y(p[1]),4.5,{f:p[3]||ACC2,c:"none"}); if(p[2]) s+=T(X(p[0])+7,Y(p[1])-7,p[2],{s:10,c:p[3]||ACC2,w:700}); });
    if(title) s+=T(px,12,title,{s:11,c:MUT});
    return S(w,h,s); };

  // 수직선
  F.numberline=({min=-6,max=6,marks=[],w=340})=>{ const X=v=>20+(v-min)/(max-min)*(w-40); let s=L(10,40,w-10,40,{c:INK})+`<path d="M${w-10},40 l-8,-4 l0,8 Z" fill="${INK}"/>`; for(let v=Math.ceil(min);v<=max;v++) s+=L(X(v),36,X(v),44,{c:MUT,w:1})+T(X(v),60,v,{s:10,c:MUT,a:"middle"}); marks.forEach(m=>{ if(m.from!=null) s+=L(X(m.from),40,X(m.to),40,{c:m.c||ACC2,w:6}); else s+=C(X(m.v),40,6,{f:m.open?"var(--card)":(m.c||ACC2),c:m.c||ACC2,w:2}); if(m.label) s+=T(X(m.v!=null?m.v:(m.from+m.to)/2),24,m.label,{s:11,c:m.c||ACC2,a:"middle",w:700}); }); return S(w,70,s); };

  // 라벨 달린 삼각형 (좌표 세 점)
  F.triangle=({A=[40,170],B=[300,170],Cc=[180,40],labels=["A","B","C"],sides=[],marks=[],extra="",w=340,h=200})=>{ let s=P(`${A} ${B} ${Cc}`); [[A,0],[B,1],[Cc,2]].forEach(([p,i])=>s+=T(p[0]+(i===0?-14:i===1?8:4),p[1]+(i===2?-8:14),labels[i],{s:13,w:700})); const mid=(p,q)=>[(p[0]+q[0])/2,(p[1]+q[1])/2]; const sd=[[A,B],[B,Cc],[Cc,A]]; sides.forEach((t,i)=>{ if(!t)return; const m=mid(...sd[i]); const off=[[0,16],[12,-2],[-12,-2]][i]; s+=T(m[0]+off[0],m[1]+off[1],t,{s:11,c:ACC,a:"middle"}); }); marks.forEach(m=>{ if(m.type==="right"){ const V=[A,B,Cc][m.at]; const o=[A,B,Cc].filter((_,i)=>i!==m.at); const u=[o[0][0]-V[0],o[0][1]-V[1]],v=[o[1][0]-V[0],o[1][1]-V[1]]; const nu=Math.hypot(...u),nv=Math.hypot(...v); const k=12; s+=`<path d="M${V[0]+u[0]/nu*k},${V[1]+u[1]/nu*k} L${V[0]+u[0]/nu*k+v[0]/nv*k},${V[1]+u[1]/nu*k+v[1]/nv*k} L${V[0]+v[0]/nv*k},${V[1]+v[1]/nv*k}" fill="none" stroke="${BAD}" stroke-width="1.5"/>`; } if(m.type==="angle"){ const V=[A,B,Cc][m.at]; s+=C(V[0],V[1],18,{c:ACC2,w:2,d:"2 2"})+T(V[0]+(m.dx||22),V[1]+(m.dy||-10),m.label||"",{s:11,c:ACC2}); } if(m.type==="seg"){ s+=L(...m.from,...m.to,{c:m.c||ACC2,w:2,d:m.d||""}); if(m.label) s+=T(m.to[0]+4,m.to[1]-4,m.label,{s:11,c:m.c||ACC2}); } }); return S(w,h,s+extra); };

  // 원 + 원주각/중심각/현/접선
  F.circleFig=({mode="inscribed",w=340,h=230})=>{ const O=[170,120],r=85; const pt=d=>[O[0]+r*Math.cos(d*Math.PI/180),O[1]+r*Math.sin(d*Math.PI/180)]; let s=C(O[0],O[1],r,{c:MUT})+C(O[0],O[1],3,{f:INK,c:"none"})+T(O[0]+6,O[1]+14,"O",{s:12});
    if(mode==="inscribed"){ const A=pt(200),B=pt(340),Pp=pt(90); s+=P(`${A} ${B} ${O}`,{f:"rgba(255,138,61,.2)",c:ACC2})+L(...A,...Pp,{c:ACC})+L(...B,...Pp,{c:ACC})+T(A[0]-16,A[1]-6,"A",{s:12})+T(B[0]+6,B[1]-6,"B",{s:12})+T(Pp[0]-4,Pp[1]+18,"P",{s:12})+T(O[0]-10,O[1]-14,"2θ",{s:11,c:ACC2,w:700})+T(Pp[0]-4,Pp[1]-14,"θ",{s:11,c:ACC,w:700})+T(20,20,"원주각 θ = ½ × 중심각 2θ",{s:11,c:MUT}); }
    if(mode==="thales"){ const A=pt(180),B=pt(0),Pp=pt(230); s+=L(...A,...B,{c:ACC2,w:2.5})+L(...A,...Pp,{c:ACC})+L(...B,...Pp,{c:ACC})+T(A[0]-16,A[1]+4,"A",{s:12})+T(B[0]+6,B[1]+4,"B",{s:12})+T(Pp[0]-8,Pp[1]-10,"P",{s:12})+T(Pp[0]+10,Pp[1]+16,"90°",{s:11,c:BAD,w:700})+T(20,20,"지름 AB → ∠APB = 90° (탈레스)",{s:11,c:MUT}); }
    if(mode==="chord"){ const A=pt(210),B=pt(330); const M=[(A[0]+B[0])/2,(A[1]+B[1])/2]; s+=L(...A,...B,{c:ACC,w:2.5})+L(...O,...M,{c:ACC2,d:"4 3"})+L(...O,...A,{c:MUT,d:"3 3"})+T(M[0]+6,M[1]-6,"M",{s:11})+T((O[0]+M[0])/2+8,(O[1]+M[1])/2,"d",{s:11,c:ACC2})+T((O[0]+A[0])/2-14,(O[1]+A[1])/2,"r",{s:11,c:MUT})+T(20,20,"중심에서 현에 내린 수선은 현을 이등분: (ℓ/2)² = r² − d²",{s:11,c:MUT}); }
    if(mode==="tangent"){ const Pp=[310,120]; const d=Math.hypot(Pp[0]-O[0],Pp[1]-O[1]); const al=Math.acos(r/d); const A=[O[0]+r*Math.cos(al),O[1]-r*Math.sin(al)],B=[O[0]+r*Math.cos(al),O[1]+r*Math.sin(al)]; s+=L(...Pp,...A,{c:ACC})+L(...Pp,...B,{c:ACC})+L(...O,...A,{c:ACC2,d:"4 3"})+L(...O,...B,{c:ACC2,d:"4 3"})+T(Pp[0]+6,Pp[1]+4,"P",{s:12})+T(A[0]-2,A[1]-8,"A",{s:12})+T(B[0]-2,B[1]+16,"B",{s:12})+T(20,20,"PA = PB, OA ⊥ PA",{s:11,c:MUT}); }
    if(mode==="cyclic"){ const A=pt(200),B=pt(300),Cc=pt(20),D=pt(120); s+=P(`${A} ${B} ${Cc} ${D}`,{f:"rgba(47,111,237,.1)"})+T(A[0]-16,A[1],"A",{s:12})+T(B[0]+4,B[1]+12,"B",{s:12})+T(Cc[0]+6,Cc[1],"C",{s:12})+T(D[0]-4,D[1]-8,"D",{s:12})+T(20,20,"∠A + ∠C = 180°, ∠B + ∠D = 180°",{s:11,c:MUT}); }
    return S(w,h,s); };

  // 단위원 (삼각함수)
  F.unitCircle=({deg=150,w=340,h=230})=>{ const O=[120,120],r=90; const t=deg*Math.PI/180; const Pp=[O[0]+r*Math.cos(t),O[1]-r*Math.sin(t)]; let s=C(O[0],O[1],r,{c:MUT})+L(O[0]-105,O[1],O[0]+105,O[1],{c:MUT,w:1})+L(O[0],O[1]-105,O[0],O[1]+105,{c:MUT,w:1})+L(...O,...Pp,{c:INK,w:2.5})+L(Pp[0],O[1],Pp[0],Pp[1],{c:ACC,w:3})+L(O[0],O[1]+5,Pp[0],O[1]+5,{c:ACC2,w:3})+C(Pp[0],Pp[1],5,{f:ACC,c:"none"})+`<path d="M${O[0]+25},${O[1]} A25,25 0 ${deg>180?1:0} 0 ${O[0]+25*Math.cos(t)},${O[1]-25*Math.sin(t)}" fill="none" stroke="${ACC2}" stroke-width="2"/>`+T(O[0]+30,O[1]-10,deg+"°",{s:11,c:ACC2})+T(240,60,`sin ${deg}° = y = ${Math.sin(t).toFixed(2)}`,{s:12,c:ACC})+T(240,84,`cos ${deg}° = x = ${Math.cos(t).toFixed(2)}`,{s:12,c:ACC2})+T(240,108,`tan = y/x = ${Math.abs(Math.cos(t))<1e-6?"없음":Math.tan(t).toFixed(2)}`,{s:12,c:G31})+T(240,140,"반지름 1 인 원 위의 점 (x, y)",{s:10,c:MUT}); return S(w,h,s); };

  // 벤 다이어그램
  F.venn=({labels=["A","B"],shade="inter",w=340,h=200})=>{ const a=[135,100],b=[205,100],r=65; const id="v"+Math.random().toString(36).slice(2,7); let s=`<defs><clipPath id="${id}a"><circle cx="${a[0]}" cy="${a[1]}" r="${r}"/></clipPath><clipPath id="${id}b"><circle cx="${b[0]}" cy="${b[1]}" r="${r}"/></clipPath></defs>`+R(30,25,280,150,{f:"none",c:MUT});
    const fill="rgba(255,138,61,.45)";
    if(shade==="inter") s+=`<circle cx="${a[0]}" cy="${a[1]}" r="${r}" fill="${fill}" clip-path="url(#${id}b)"/>`;
    if(shade==="union") s+=C(a[0],a[1],r,{f:fill,c:"none"})+C(b[0],b[1],r,{f:fill,c:"none"});
    if(shade==="diff") s+=C(a[0],a[1],r,{f:fill,c:"none"})+`<circle cx="${b[0]}" cy="${b[1]}" r="${r}" fill="var(--card)" clip-path="url(#${id}a)"/>`;
    if(shade==="comp") s+=R(30,25,280,150,{f:fill,c:"none"})+C(a[0],a[1],r,{f:"var(--card)",c:"none"})+C(b[0],b[1],r,{f:"var(--card)",c:"none"});
    s+=C(a[0],a[1],r,{c:INK})+C(b[0],b[1],r,{c:INK})+T(a[0]-40,a[1]-45,labels[0],{s:13,w:700})+T(b[0]+30,b[1]-45,labels[1],{s:13,w:700})+T(36,40,"U",{s:12,c:MUT})+T(170,195,{inter:"A ∩ B",union:"A ∪ B",diff:"A − B",comp:"(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ"}[shade],{s:12,c:ACC2,a:"middle",w:700}); return S(w,h,s); };

  // 넓이 모형 (곱셈공식)
  F.areaModel=({a="a",b="b",mode="square",w=300,h=220})=>{ const x0=50,y0=190,A=100,B=50; let s="";
    if(mode==="square"){ s+=R(x0,y0-A,A,A,{f:"rgba(47,111,237,.2)"})+R(x0+A,y0-A,B,A,{f:"rgba(255,138,61,.3)"})+R(x0,y0-A-B,A,B,{f:"rgba(255,138,61,.3)"})+R(x0+A,y0-A-B,B,B,{f:"rgba(31,157,85,.3)"})+T(x0+A/2,y0-A/2,a+"²",{s:16,a:"middle",w:700})+T(x0+A+B/2,y0-A/2,a+b,{s:13,a:"middle"})+T(x0+A/2,y0-A-B/2+4,a+b,{s:13,a:"middle"})+T(x0+A+B/2,y0-A-B/2+4,b+"²",{s:13,a:"middle",w:700})+T(x0+A/2,y0+16,a,{s:12,a:"middle"})+T(x0+A+B/2,y0+16,b,{s:12,a:"middle"})+T(230,100,`(${a}+${b})² = ${a}² + 2${a}${b} + ${b}²`,{s:12,c:ACC,w:700}); }
    if(mode==="diff"){ s+=R(x0,y0-A,A,A,{f:"rgba(47,111,237,.2)"})+R(x0+A-B,y0-A,B,B,{f:"var(--card)",c:BAD})+T(x0+A-B/2,y0-A+B/2+4,b+"²",{s:11,a:"middle",c:BAD})+T(x0+A/2,y0+16,a,{s:12,a:"middle"})+L(x0+A-B,y0-A+B,x0+A,y0-A+B,{c:MUT,d:"3 3"})+L(x0+A-B,y0-A+B,x0+A-B,y0,{c:MUT,d:"3 3"})+T(230,90,`${a}² − ${b}²`,{s:13,c:ACC,w:700})+T(230,112,`= (${a}+${b})(${a}−${b})`,{s:12,c:ACC2,w:700})+T(230,134,"ㄱ자를 잘라 붙이면",{s:10,c:MUT})+T(230,150,`가로 ${a}+${b}, 세로 ${a}−${b}`,{s:10,c:MUT}); }
    if(mode==="cube"){ s+=T(150,110,"(a+b)³ = a³ + 3a²b + 3ab² + b³",{s:13,a:"middle",c:ACC,w:700})+T(150,135,"정육면체 조각: 1 + 3 + 3 + 1 개",{s:11,a:"middle",c:MUT}); const cube=(x,y,sz,f)=>`<path d="M${x},${y} l${sz},0 l0,${sz} l-${sz},0 Z" fill="${f}" stroke="${INK}"/><path d="M${x},${y} l${sz*.4},-${sz*.4} l${sz},0 l-${sz*.4},${sz*.4} Z" fill="${f}" stroke="${INK}" opacity=".8"/><path d="M${x+sz},${y} l${sz*.4},-${sz*.4} l0,${sz} l-${sz*.4},${sz*.4} Z" fill="${f}" stroke="${INK}" opacity=".6"/>`; s+=cube(40,60,30,"rgba(47,111,237,.4)")+cube(110,70,18,"rgba(255,138,61,.5)")+cube(150,70,18,"rgba(255,138,61,.5)")+cube(190,70,18,"rgba(255,138,61,.5)")+cube(240,75,10,"rgba(31,157,85,.5)"); }
    return S(w,h,s); };

  // 막대/점 자료 (통계)
  F.bars=({data=[3,5,7,4,6],labels=null,mean=true,w=340,h=200,title=""})=>{ const n=data.length,mx=Math.max(...data)*1.15; const bw=(w-60)/n; let s=L(30,170,w-20,170,{c:MUT}); data.forEach((v,i)=>{ const hh=v/mx*140; s+=R(35+i*bw,170-hh,bw*.7,hh,{f:"rgba(47,111,237,.45)",c:"none"})+T(35+i*bw+bw*.35,170-hh-5,v,{s:10,a:"middle"})+T(35+i*bw+bw*.35,185,labels?labels[i]:i+1,{s:10,a:"middle",c:MUT}); }); if(mean){ const m=data.reduce((a,b)=>a+b,0)/n; s+=L(30,170-m/mx*140,w-20,170-m/mx*140,{c:ACC2,d:"5 4"})+T(w-22,170-m/mx*140-5,"평균 "+(+m.toFixed(2)),{s:10,c:ACC2,a:"end"}); } if(title) s+=T(30,14,title,{s:11,c:MUT}); return S(w,h,s); };

  // 벡터
  F.vectors=({a=[3,1],b=[1,2],op="add",w=340,h=230})=>{ const O=[120,170],sc=35; const X=p=>[O[0]+p[0]*sc,O[1]-p[1]*sc]; let s=""; for(let i=-2;i<=5;i++){ s+=L(O[0]+i*sc,30,O[0]+i*sc,200,{c:"var(--line)",w:1}); } for(let j=-1;j<=4;j++) s+=L(40,O[1]-j*sc,300,O[1]-j*sc,{c:"var(--line)",w:1}); s+=L(40,O[1],300,O[1],{c:MUT,w:1})+L(O[0],30,O[0],200,{c:MUT,w:1});
    const A=X(a),B=X(b); s+=ARR(...O,...A,{c:ACC,w:3})+T(A[0]+6,A[1],"a",{c:ACC,s:13,w:700,i:1})+ARR(...O,...B,{c:ACC2,w:3})+T(B[0]+6,B[1]-4,"b",{c:ACC2,s:13,w:700,i:1});
    if(op==="add"){ const Sm=X([a[0]+b[0],a[1]+b[1]]); s+=L(...A,...Sm,{c:ACC2,d:"4 3",w:1.5})+L(...B,...Sm,{c:ACC,d:"4 3",w:1.5})+ARR(...O,...Sm,{c:OK,w:3})+T(Sm[0]+6,Sm[1]-4,"a+b",{c:OK,s:13,w:700,i:1})+T(200,40,"평행사변형의 대각선",{s:11,c:MUT}); }
    if(op==="dot"){ const na=Math.hypot(...a),nb=Math.hypot(...b); const cos=(a[0]*b[0]+a[1]*b[1])/(na*nb); const pr=[a[0]*(a[0]*b[0]+a[1]*b[1])/(na*na),a[1]*(a[0]*b[0]+a[1]*b[1])/(na*na)]; const Pr=X(pr); s+=L(...B,...Pr,{c:MUT,d:"3 3"})+L(...O,...Pr,{c:G31,w:5})+T(200,40,`a·b = |a||b|cosθ = ${a[0]*b[0]+a[1]*b[1]}`,{s:11,c:G31,w:700})+T(200,58,`= a₁b₁ + a₂b₂ = ${a[0]}·${b[0]} + ${a[1]}·${b[1]}`,{s:10,c:MUT})+T(200,76,`cosθ = ${cos.toFixed(3)}`,{s:10,c:MUT}); }
    return S(w,h,s); };

  // 이차곡선
  F.conic=({type="parabola",w=340,h=230})=>{ const xr=type==="parabola"?[-2,8]:[-6,6], yr=[-4,4]; const fns=[]; const pts=[]; const lines=[]; let title="";
    if(type==="parabola"){ fns.push({f:x=>Math.sqrt(4*x),dom:[0,8],c:ACC},{f:x=>-Math.sqrt(4*x),dom:[0,8],c:ACC}); pts.push([1,0,"초점 F(1,0)"]); lines.push({x1:-1,y1:-4,x2:-1,y2:4,c:ACC2,label:"준선 x=−1"}); title="y² = 4x: 초점까지 = 준선까지"; }
    if(type==="ellipse"){ fns.push({f:x=>3*Math.sqrt(Math.max(0,1-x*x/25)),dom:[-5,5],c:ACC},{f:x=>-3*Math.sqrt(Math.max(0,1-x*x/25)),dom:[-5,5],c:ACC}); pts.push([4,0,"F"],[-4,0,"F'"]); title="x²/25 + y²/9 = 1: 두 초점까지 거리의 합 = 10"; }
    if(type==="hyperbola"){ fns.push({f:x=>1.5*Math.sqrt(Math.max(0,x*x/4-1)),dom:[2,6],c:ACC},{f:x=>-1.5*Math.sqrt(Math.max(0,x*x/4-1)),dom:[2,6],c:ACC},{f:x=>1.5*Math.sqrt(Math.max(0,x*x/4-1)),dom:[-6,-2],c:ACC},{f:x=>-1.5*Math.sqrt(Math.max(0,x*x/4-1)),dom:[-6,-2],c:ACC},{f:x=>0.75*x,c:MUT,d:"4 3",w:1.5},{f:x=>-0.75*x,c:MUT,d:"4 3",w:1.5}); pts.push([2.5,0,"F"],[-2.5,0,"F'"]); title="x²/4 − y²/2.25 = 1, 점근선 y=±0.75x"; }
    return F.plot({fns,xr,yr,pts,lines,w,h,title,eq:true}); };

  // 도수분포 히스토그램 + 다각형
  F.histogram=({freq=[2,5,9,7,3],start=40,width=10,w=340,h=200})=>{ const n=freq.length,mx=Math.max(...freq)*1.2; const bw=(w-70)/n; let s=L(40,170,w-15,170,{c:MUT})+L(40,20,40,170,{c:MUT}); let pts=[]; freq.forEach((f,i)=>{ const hh=f/mx*140; s+=R(40+i*bw,170-hh,bw,hh,{f:"rgba(47,111,237,.35)"})+T(40+i*bw,184,start+i*width,{s:9,c:MUT,a:"middle"}); pts.push([40+i*bw+bw/2,170-hh]); }); s+=T(40+n*bw,184,start+n*width,{s:9,c:MUT,a:"middle"}); s+=`<polyline points="${[[40-bw/2,170],...pts,[40+n*bw+bw/2,170]].map(p=>p.join(",")).join(" ")}" fill="none" stroke="${ACC2}" stroke-width="2"/>`+T(50,16,"히스토그램(막대) + 도수분포다각형(선)",{s:10,c:MUT}); return S(w,h,s); };

  // 미분: 접선과 할선
  F.tangentFig=({w=340,h=240})=>F.plot({fns:[{f:x=>0.25*x*x,c:ACC,label:"y=f(x)"},{f:x=>1*(x-2)+1,c:ACC2,d:"",label:"접선 f'(2)=1",lx:-0.7},{f:x=>((0.25*16-1)/2)*(x-2)+1,c:G31,d:"5 3",label:"할선 (기울기 1.5)",lx:5.1}],xr:[-1,6],yr:[-2,6],pts:[[2,1,"(2, f(2))"],[4,4,"(2+h, f(2+h))",G31]],w,h,title:"h→0: 할선 → 접선 (순간변화율)"});
  // 적분: 넓이와 리만 합
  F.riemannFig=({n=8,w=340,h=240})=>{ const f=x=>0.5*x*x+1; const xr=[0,4],yr=[0,10]; let rects=""; const px=30,py=16,W=w-px-14,H=h-py-24; const X=x=>px+(x-xr[0])/(xr[1]-xr[0])*W,Y=y=>py+(yr[1]-y)/(yr[1]-yr[0])*H; for(let i=0;i<n;i++){ const a=1+2*i/n,b=1+2*(i+1)/n; rects+=`<rect x="${X(a)}" y="${Y(f(a))}" width="${X(b)-X(a)}" height="${Y(0)-Y(f(a))}" fill="rgba(255,138,61,.35)" stroke="${ACC2}" stroke-width="1"/>`; } return F.plot({fns:[{f,c:ACC,label:"y=f(x)"}],xr,yr,shade:{f,a:1,b:3,c:"rgba(31,157,85,.15)"},w,h,title:`∫₁³ f(x)dx ≈ 막대 ${n}개의 합 (n→∞ 이면 같아진다)`}).replace("</svg>",rects+"</svg>"); };

  // 수열 막대
  F.seqFig=({type="arith",a=2,d=3,n=6,w=340,h=200})=>{ const vals=Array.from({length:n},(_,i)=>type==="arith"?a+i*d:a*Math.pow(d,i)); return F.bars({data:vals,labels:vals.map((_,i)=>"a"+(i+1)),mean:false,w,h,title:type==="arith"?`등차수열: 매번 +${d}`:`등비수열: 매번 ×${d}`}); };

  // 행렬 곱
  F.matrixFig=({w=340,h=150})=>{ const cell=(x,y,t,o={})=>R(x,y,28,24,{f:o.f||"var(--card)",c:MUT,w:1})+T(x+14,y+16,t,{s:11,a:"middle",c:o.c||INK}); let s=""; [[1,2],[3,4]].forEach((r,i)=>r.forEach((v,j)=>s+=cell(30+j*30,40+i*26,v,{f:i===0?"rgba(255,138,61,.3)":"var(--card)"}))); [[5,6],[7,8]].forEach((r,i)=>r.forEach((v,j)=>s+=cell(120+j*30,40+i*26,v,{f:j===1?"rgba(47,111,237,.25)":"var(--card)"}))); s+=T(100,58,"×",{s:14,a:"middle"})+T(190,58,"=",{s:14,a:"middle"}); [[19,22],[43,50]].forEach((r,i)=>r.forEach((v,j)=>s+=cell(210+j*30,40+i*26,v,{f:(i===0&&j===1)?"rgba(31,157,85,.3)":"var(--card)"}))); s+=T(30,120,"(1행)·(2열) = 1·6 + 2·8 = 22",{s:11,c:OK,w:700})+T(30,138,"행 × 열: 앞의 행과 뒤의 열을 짝지어 곱해 더한다",{s:10,c:MUT}); return S(w,h,s); };

  // 확률 나무
  F.tree=({p=0.4,label="비",w=340,h=200})=>{ const q=+(1-p).toFixed(2); let s=L(40,100,140,50,{c:ACC})+L(40,100,140,150,{c:MUT})+L(140,50,240,25,{c:ACC})+L(140,50,240,75,{c:MUT})+L(140,150,240,125,{c:ACC})+L(140,150,240,175,{c:MUT}); s+=T(80,66,p,{s:10,c:ACC})+T(80,140,q,{s:10,c:MUT})+T(180,30,p,{s:10,c:ACC})+T(180,70,q,{s:10,c:MUT})+T(180,130,p,{s:10,c:ACC})+T(180,170,q,{s:10,c:MUT}); s+=T(250,29,`${label}${label}: ${(p*p).toFixed(2)}`,{s:11,c:ACC,w:700})+T(250,79,`${label}×: ${(p*q).toFixed(2)}`,{s:11})+T(250,129,`×${label}: ${(p*q).toFixed(2)}`,{s:11})+T(250,179,`××: ${(q*q).toFixed(2)}`,{s:11,c:MUT})+T(20,20,"가지를 따라 곱하고, 가지끼리 더한다",{s:10,c:MUT}); return S(w,h,s); };

  // 정규분포 종 곡선
  F.normalFig=({w=340,h=200})=>{ const f=x=>4*Math.exp(-x*x/2); let s=F.plot({fns:[{f,c:ACC}],xr:[-3.5,3.5],yr:[0,4.5],shade:{f,a:-1,b:1,c:"rgba(255,138,61,.35)"},w,h,title:"N(0,1): −1≤Z≤1 구간 ≈ 68%, −2≤Z≤2 ≈ 95%",grid:false}); return s; };

  // 좌표 도형: 점과 직선 거리
  F.pointLine=({w=340,h=230})=>F.plot({fns:[{f:x=>0.75*x+0.5,c:ACC,label:"3x−4y+2=0"}],xr:[-1,6],yr:[-1,5],pts:[[3,-1,"P(3,−1)"],[2.04,2.03,"H",OK]],lines:[{x1:3,y1:-1,x2:2.04,y2:2.03,c:OK,d:"",label:"d = 3"}],w,h,title:"d = |ax₁+by₁+c| / √(a²+b²)"});

  // 입체: 원뿔 전개도 (부채꼴)
  F.coneNet=({w=340,h=200})=>{ let s=`<path d="M60,160 A110,110 0 0 1 280,160 L170,60 Z" fill="rgba(47,111,237,.15)" stroke="${INK}" stroke-width="2"/>`+C(170,175,20,{f:"rgba(255,138,61,.3)",c:ACC2})+T(170,52,"모선 l",{s:11,a:"middle"})+T(170,130,"중심각 = 360° × r/l",{s:11,a:"middle",c:ACC})+T(170,180,"r",{s:10,a:"middle",c:ACC2})+T(300,100,"옆넓이 = ½·l·(2πr) = πrl",{s:11,c:MUT,a:"end"}); return S(w,h,s); };
})();
