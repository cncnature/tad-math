/* 증명·유도용 도형 (서술형·증명, 공식 유도 공방, 논술 모범답안에서 사용)
   각 함수는 stage 매개변수로 단계별 강조를 지원: FIG.pfPyth({stage:2}) */
(function(){
  const F=window.FIG; if(!F) return;
  const S=(w,h,inner)=>`<svg class="fig" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img">${inner}</svg>`;
  const MT=window.MT||(t=>t);
  const T=(x,y,t,o={})=>`<text x="${x}" y="${y}" font-size="${o.s||12}" fill="${o.c||"var(--ink)"}" text-anchor="${o.a||"middle"}" font-weight="${o.w||500}">${MT(t)}</text>`;
  const L=(x1,y1,x2,y2,o={})=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${o.c||"var(--ink)"}" stroke-width="${o.w||2}" ${o.d?`stroke-dasharray="${o.d}"`:""} stroke-linecap="round"/>`;
  const P=(pts,o={})=>`<polygon points="${pts}" fill="${o.f||"rgba(47,111,237,.12)"}" stroke="${o.c||"var(--ink)"}" stroke-width="${o.w||2}" stroke-linejoin="round"/>`;
  const C=(x,y,r,o={})=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${o.f||"none"}" stroke="${o.c||"var(--ink)"}" stroke-width="${o.w||2}"/>`;
  const D=(x,y,o={})=>`<circle cx="${x}" cy="${y}" r="${o.r||3.5}" fill="${o.c||"var(--ink)"}"/>`;
  const ARC=(cx,cy,r,a1,a2,o={})=>{ const p=a=>[cx+r*Math.cos(a),cy-r*Math.sin(a)]; const [x1,y1]=p(a1),[x2,y2]=p(a2); const big=(a2-a1)%(2*Math.PI)>Math.PI?1:0; return `<path d="M${x1},${y1} A${r},${r} 0 ${big} 0 ${x2},${y2}" fill="none" stroke="${o.c||"var(--acc2)"}" stroke-width="${o.w||2}"/>`; };
  const RA=(x,y,ux,uy,vx,vy,k=11)=>`<path d="M${x+ux*k},${y+uy*k} L${x+(ux+vx)*k},${y+(uy+vy)*k} L${x+vx*k},${y+vy*k}" fill="none" stroke="var(--bad)" stroke-width="1.5"/>`;
  const ACC="var(--acc)",ACC2="var(--acc2)",MUT="var(--muted)",OK="var(--ok)",BAD="var(--bad)";
  const hi=(st,k)=>st==null||st>=k; // 단계 k 이상일 때 표시
  const FILL={a:"rgba(47,111,237,.18)",b:"rgba(31,157,85,.18)",c:"rgba(224,138,0,.22)",d:"rgba(214,69,69,.14)"};

  // 피타고라스: (a+b) 정사각형 안에 직각삼각형 4개, 가운데 c 정사각형
  F.pfPyth=({stage=null,a=60,b=100}={})=>{ const ox=40,oy=30,s=a+b; const tri=[[ox,oy+b, ox+a,oy+s, ox,oy+s],[ox,oy, ox+b,oy+0, ox,oy+b].map(v=>v),[ox+b,oy, ox+s,oy+a, ox+s,oy],[ox+a,oy+s, ox+s,oy+s, ox+s,oy+a]];
    // 네 삼각형 꼭짓점(시계 방향 배치)
    const tris=[`${ox},${oy} ${ox+b},${oy} ${ox},${oy+a}`,`${ox+b},${oy} ${ox+s},${oy} ${ox+s},${oy+b}`,`${ox+s},${oy+b} ${ox+s},${oy+s} ${ox+a},${oy+s}`,`${ox+a},${oy+s} ${ox},${oy+s} ${ox},${oy+a}`];
    const inner=`${ox+b},${oy} ${ox+s},${oy+b} ${ox+a},${oy+s} ${ox},${oy+a}`;
    let g=`<rect x="${ox}" y="${oy}" width="${s}" height="${s}" fill="${hi(stage,3)?FILL.c:"none"}" stroke="var(--ink)" stroke-width="2"/>`;
    if(hi(stage,1)) g+=tris.map(t=>P(t,{f:FILL.a})).join("");
    if(hi(stage,2)) g+=P(inner,{f:FILL.b,c:ACC});
    g+=T(ox+b/2,oy-8,"b")+T(ox+b+a/2,oy-8,"a")+T(ox-10,oy+a/2,"a")+T(ox-10,oy+a+b/2,"b")+T(ox+s+12,oy+b/2,"b")+T(ox+s+12,oy+b+a/2,"a")+T(ox+a/2,oy+s+14,"a")+T(ox+a+b/2,oy+s+14,"b");
    if(hi(stage,2)) g+=T(ox+s/2,oy+s/2+5,"c^2",{c:OK,w:700,s:15})+T(ox+b/2+a/4,oy+a/2+2,"c",{c:ACC,s:11});
    if(hi(stage,3)) g+=T(ox+s+60,oy+40,"(a+b)^2",{c:"#b46a00",w:700,s:13})+T(ox+s+60,oy+62,"= 4·½ab + c^2",{s:12})+T(ox+s+60,oy+84,"= 2ab + c^2",{s:12});
    if(hi(stage,4)) g+=T(ox+s+60,oy+118,"a^2+2ab+b^2",{s:12})+T(ox+s+60,oy+140,"= 2ab + c^2",{s:12})+T(ox+s+60,oy+166,"∴ a^2+b^2=c^2",{c:OK,w:700,s:14});
    return S(360,240,g); };
  // 삼각형 내각의 합: A 를 지나는 평행선과 엇각
  F.pfAngleSum=({stage=null}={})=>{ const A=[170,40],B=[50,180],C=[290,180]; let g=P(`${A} ${B} ${C}`,{f:FILL.a});
    g+=T(A[0],A[1]-10,"A")+T(B[0]-12,B[1]+6,"B")+T(C[0]+12,C[1]+6,"C");
    g+=ARC(B[0],B[1],26,0,Math.atan2(140,120),{c:ACC})+ARC(C[0],C[1],26,Math.PI-Math.atan2(140,120),Math.PI,{c:OK});
    g+=ARC(A[0],A[1],22,Math.PI+Math.atan2(140,-120)+Math.PI*0,-Math.PI/2+0.001,{c:"#b46a00",w:0});
    if(hi(stage,1)){ g+=L(20,40,320,40,{c:MUT,d:"6 4"})+T(330,44,"l",{c:MUT}); }
    if(hi(stage,2)){ g+=ARC(A[0],A[1],24,Math.PI-0.0,Math.PI+Math.atan2(140,120)*0+Math.atan2(140,120)*0+ (Math.PI-Math.atan2(140,120))-Math.PI+0.0001,{c:ACC}); g+=`<path d="M${A[0]-24},${A[1]} A24,24 0 0 0 ${A[0]-24*Math.cos(Math.atan2(140,120))},${A[1]+24*Math.sin(Math.atan2(140,120))}" fill="none" stroke="${ACC}" stroke-width="2"/>`+T(A[0]-34,A[1]+18,"∠B",{c:ACC,s:11}); }
    if(hi(stage,3)){ g+=`<path d="M${A[0]+24},${A[1]} A24,24 0 0 1 ${A[0]+24*Math.cos(Math.atan2(140,120))},${A[1]+24*Math.sin(Math.atan2(140,120))}" fill="none" stroke="${OK}" stroke-width="2"/>`+T(A[0]+34,A[1]+18,"∠C",{c:OK,s:11}); }
    if(hi(stage,4)) g+=T(170,215,"평각 = ∠B + ∠A + ∠C = 180°",{c:"#b46a00",w:700,s:13});
    return S(340,230,g); };
  // 이등변삼각형: 꼭지각 이등분선 AD, 두 삼각형 합동
  F.pfIsosceles=({stage=null}={})=>{ const A=[170,30],B=[70,190],C=[270,190],Dp=[170,190]; let g=P(`${A} ${B} ${Dp}`,{f:hi(stage,2)?FILL.a:"rgba(47,111,237,.08)"})+P(`${A} ${Dp} ${C}`,{f:hi(stage,2)?FILL.b:"rgba(47,111,237,.08)"});
    g+=T(A[0],A[1]-10,"A")+T(B[0]-12,B[1]+6,"B")+T(C[0]+12,C[1]+6,"C");
    g+=L(118,110,124,118,{c:ACC,w:2})+L(216,118,222,110,{c:ACC,w:2}); // 같은 변 표시
    if(hi(stage,1)){ g+=L(A[0],A[1],Dp[0],Dp[1],{c:ACC2})+T(Dp[0],Dp[1]+16,"D")+ARC(A[0],A[1],22,Math.PI/2+0.001,Math.PI/2+Math.atan2(160,100)-Math.PI/2+Math.PI/2- (Math.PI/2-Math.atan2(160,100)),{c:ACC,w:0}); g+=`<path d="M${A[0]-10},${A[1]+20} A22,22 0 0 0 ${A[0]},${A[1]+22}" fill="none" stroke="${ACC}" stroke-width="2"/><path d="M${A[0]},${A[1]+22} A22,22 0 0 0 ${A[0]+10},${A[1]+20}" fill="none" stroke="${OK}" stroke-width="2"/>`; }
    if(hi(stage,3)){ g+=ARC(B[0],B[1],26,0,Math.atan2(160,100),{c:ACC})+ARC(C[0],C[1],26,Math.PI-Math.atan2(160,100),Math.PI,{c:OK})+T(100,170,"∠B",{c:ACC,s:11})+T(240,170,"∠C",{c:OK,s:11}); }
    if(hi(stage,4)) g+=RA(Dp[0],Dp[1],-1,0,0,-1)+T(170,215,"BD = CD, AD ⊥ BC",{c:"#b46a00",w:700,s:12});
    return S(340,230,g); };
  // 외심: 세 변의 수직이등분선
  F.pfCircum=({stage=null}={})=>{ const A=[150,40],B=[50,190],Cc=[290,170]; const O=[168,124]; let g=P(`${A} ${B} ${Cc}`,{f:"rgba(47,111,237,.06)"})+T(A[0],A[1]-10,"A")+T(B[0]-12,B[1]+6,"B")+T(Cc[0]+12,Cc[1]+6,"C");
    const mid=(p,q)=>[(p[0]+q[0])/2,(p[1]+q[1])/2];
    if(hi(stage,1)){ const m=mid(A,B); g+=L(m[0],m[1],O[0],O[1],{c:ACC,d:"5 4"})+L(O[0],O[1],O[0]+(O[0]-m[0])*0.6,O[1]+(O[1]-m[1])*0.6,{c:ACC,d:"5 4"})+D(m[0],m[1],{c:ACC}); }
    if(hi(stage,2)){ const m=mid(B,Cc); g+=L(m[0],m[1],O[0],O[1],{c:OK,d:"5 4"})+D(m[0],m[1],{c:OK}); const m2=mid(A,Cc); g+=L(m2[0],m2[1],O[0],O[1],{c:ACC2,d:"5 4"})+D(m2[0],m2[1],{c:ACC2}); }
    if(hi(stage,3)){ g+=D(O[0],O[1],{c:BAD,r:4})+T(O[0]+12,O[1]+4,"O",{c:BAD})+L(O[0],O[1],A[0],A[1],{c:BAD,w:1.5})+L(O[0],O[1],B[0],B[1],{c:BAD,w:1.5})+L(O[0],O[1],Cc[0],Cc[1],{c:BAD,w:1.5}); }
    if(hi(stage,4)){ const r=Math.hypot(A[0]-O[0],A[1]-O[1]); g+=C(O[0],O[1],r,{c:BAD,w:1.5})+T(170,222,"OA = OB = OC = R",{c:"#b46a00",w:700,s:12}); }
    return S(340,235,g); };
  // 평행사변형 대각선: 두 삼각형 ASA 합동
  F.pfParallelogram=({stage=null}={})=>{ const A=[60,180],B=[220,180],Cq=[290,50],Dq=[130,50],O=[175,115]; let g=P(`${A} ${B} ${Cq} ${Dq}`,{f:"rgba(47,111,237,.06)"})+T(A[0]-12,A[1]+8,"A")+T(B[0]+12,B[1]+8,"B")+T(Cq[0]+12,Cq[1]-4,"C")+T(Dq[0]-12,Dq[1]-4,"D");
    if(hi(stage,1)) g+=L(A[0],A[1],Cq[0],Cq[1],{c:MUT})+L(B[0],B[1],Dq[0],Dq[1],{c:MUT})+D(O[0],O[1])+T(O[0]+10,O[1]-6,"O");
    if(hi(stage,2)) g+=P(`${A} ${B} ${O}`,{f:FILL.a,c:ACC})+P(`${Cq} ${Dq} ${O}`,{f:FILL.b,c:OK});
    if(hi(stage,3)) g+=ARC(A[0],A[1],24,0,Math.atan2(65,115),{c:ACC})+ARC(Cq[0],Cq[1],24,Math.PI,Math.PI+Math.atan2(65,115),{c:ACC})+ARC(B[0],B[1],24,Math.PI-Math.atan2(65,90),Math.PI,{c:OK})+ARC(Dq[0],Dq[1],24,-Math.atan2(65,90),0,{c:OK})+T(175,215,"엇각 2쌍 + AB=DC → ASA 합동",{c:"#b46a00",w:700,s:12});
    if(hi(stage,4)) g+=T(118,152,"AO=CO",{c:ACC,s:11})+T(236,80,"BO=DO",{c:OK,s:11});
    return S(340,230,g); };
  // 중점연결정리 / 무게중심
  F.pfMidseg=({stage=null,centroid=false}={})=>{ const A=[170,30],B=[50,190],C=[290,190]; const M=[(A[0]+B[0])/2,(A[1]+B[1])/2],N=[(A[0]+C[0])/2,(A[1]+C[1])/2]; let g=P(`${A} ${B} ${C}`,{f:"rgba(47,111,237,.06)"})+T(A[0],A[1]-10,"A")+T(B[0]-12,B[1]+6,"B")+T(C[0]+12,C[1]+6,"C");
    if(hi(stage,1)) g+=D(M[0],M[1],{c:ACC})+D(N[0],N[1],{c:ACC})+T(M[0]-14,M[1]+4,"M",{c:ACC})+T(N[0]+14,N[1]+4,"N",{c:ACC})+L(M[0],M[1],N[0],N[1],{c:ACC});
    if(hi(stage,2)) g+=P(`${A} ${M} ${N}`,{f:FILL.b,c:OK})+T(170,95,"△AMN ∽ △ABC (1:2)",{c:OK,s:11});
    if(hi(stage,3)) g+=T(170,215,"MN ∥ BC,  MN = ½BC",{c:"#b46a00",w:700,s:13});
    if(centroid){ const Dp=[(B[0]+C[0])/2,190],E=N; const G=[(A[0]+B[0]+C[0])/3,(A[1]+B[1]+C[1])/3]; g+=L(A[0],A[1],Dp[0],Dp[1],{c:ACC2})+L(B[0],B[1],E[0],E[1],{c:ACC2})+D(G[0],G[1],{c:BAD,r:4})+T(G[0]+12,G[1]+4,"G",{c:BAD})+T(130,110,"2",{c:BAD,s:11})+T(176,168,"1",{c:BAD,s:11}); }
    return S(340,230,g); };
  // 원주각 = 중심각/2 (중심이 각의 변 위)
  F.pfInscribed=({stage=null}={})=>{ const O=[170,120],r=85; const ang=a=>[O[0]+r*Math.cos(a),O[1]-r*Math.sin(a)]; const Pp=ang(Math.PI),A=ang(0),B=ang(Math.PI/3*1.1); let g=C(O[0],O[1],r)+D(O[0],O[1])+T(O[0],O[1]+16,"O");
    g+=L(Pp[0],Pp[1],A[0],A[1],{c:MUT})+L(Pp[0],Pp[1],B[0],B[1],{c:ACC})+T(Pp[0]-12,Pp[1]+4,"P")+T(A[0]+12,A[1]+4,"A")+T(B[0]+10,B[1]-6,"B");
    if(hi(stage,1)) g+=L(O[0],O[1],B[0],B[1],{c:OK})+T(145,70,"OP = OB",{c:OK,s:11})+L(118,108,122,114,{c:OK})+L(199,96,203,102,{c:OK});
    if(hi(stage,2)) g+=ARC(Pp[0],Pp[1],28,-0.0,Math.atan2(B[1]*-1+Pp[1],B[0]-Pp[0]),{c:ACC})+ARC(B[0],B[1],24,Math.PI+Math.atan2(B[1]-Pp[1],B[0]-Pp[0])*0+Math.atan2(Pp[1]-B[1],Pp[0]-B[0])-0.0,Math.atan2(Pp[1]-B[1],Pp[0]-B[0])+0.6,{c:ACC})+T(Pp[0]+34,Pp[1]-10,"x",{c:ACC,s:12,w:700});
    if(hi(stage,3)) g+=ARC(O[0],O[1],22,0,Math.PI/3*1.1,{c:BAD,w:2.5})+T(O[0]+30,O[1]-12,"2x",{c:BAD,s:12,w:700})+T(170,222,"외각 ∠AOB = ∠OPB + ∠OBP = 2x",{c:"#b46a00",w:700,s:12});
    return S(340,235,g); };
  // 두 접선의 길이
  F.pfTangent=({stage=null}={})=>{ const O=[130,120],r=70,Pp=[300,120]; const d=Math.hypot(Pp[0]-O[0],Pp[1]-O[1]); const th=Math.acos(r/d); const A=[O[0]+r*Math.cos(th),O[1]-r*Math.sin(th)],B=[O[0]+r*Math.cos(th),O[1]+r*Math.sin(th)]; let g=C(O[0],O[1],r)+D(O[0],O[1])+T(O[0]-12,O[1]+4,"O")+D(Pp[0],Pp[1])+T(Pp[0]+12,Pp[1]+4,"P");
    g+=L(Pp[0],Pp[1],A[0],A[1],{c:ACC})+L(Pp[0],Pp[1],B[0],B[1],{c:OK})+T(A[0]-6,A[1]-10,"A")+T(B[0]-6,B[1]+16,"B");
    if(hi(stage,1)) g+=L(O[0],O[1],A[0],A[1],{c:MUT})+L(O[0],O[1],B[0],B[1],{c:MUT})+RA(A[0],A[1],(Pp[0]-A[0])/Math.hypot(Pp[0]-A[0],Pp[1]-A[1]),(Pp[1]-A[1])/Math.hypot(Pp[0]-A[0],Pp[1]-A[1]),(O[0]-A[0])/r,(O[1]-A[1])/r)+RA(B[0],B[1],(Pp[0]-B[0])/Math.hypot(Pp[0]-B[0],Pp[1]-B[1]),(Pp[1]-B[1])/Math.hypot(Pp[0]-B[0],Pp[1]-B[1]),(O[0]-B[0])/r,(O[1]-B[1])/r);
    if(hi(stage,2)) g+=L(O[0],O[1],Pp[0],Pp[1],{c:BAD,d:"5 4"})+T(215,112,"OP 공통",{c:BAD,s:11});
    if(hi(stage,3)) g+=T(170,222,"△OAP ≡ △OBP (RHS) → PA = PB",{c:"#b46a00",w:700,s:12});
    return S(340,235,g); };
  // 내접사각형 대각의 합
  F.pfCyclic=({stage=null}={})=>{ const O=[170,118],r=85; const pt=a=>[O[0]+r*Math.cos(a),O[1]-r*Math.sin(a)]; const A=pt(2.4),B=pt(3.7),Cc=pt(5.6),Dd=pt(0.6); let g=C(O[0],O[1],r)+P(`${A} ${B} ${Cc} ${Dd}`,{f:"rgba(47,111,237,.06)"})+T(A[0]-10,A[1]-6,"A")+T(B[0]-12,B[1]+8,"B")+T(Cc[0]+12,Cc[1]+8,"C")+T(Dd[0]+12,Dd[1]-4,"D");
    if(hi(stage,1)) g+=D(O[0],O[1])+L(O[0],O[1],B[0],B[1],{c:MUT})+L(O[0],O[1],Dd[0],Dd[1],{c:MUT});
    if(hi(stage,2)) g+=ARC(O[0],O[1],24,3.7,0.6+2*Math.PI,{c:ACC,w:2.5})+T(O[0]+28,O[1]+28,"2∠A",{c:ACC,s:11})+ARC(O[0],O[1],18,0.6,3.7,{c:OK,w:2.5})+T(O[0]-26,O[1]-20,"2∠C",{c:OK,s:11});
    if(hi(stage,3)) g+=T(170,222,"2∠A + 2∠C = 360° → ∠A + ∠C = 180°",{c:"#b46a00",w:700,s:12});
    return S(340,235,g); };
  // 사다리꼴 2개 → 평행사변형
  F.pfTrapezoid=({stage=null}={})=>{ let g=P("40,170 200,170 160,60 80,60",{f:FILL.a})+T(120,52,"a")+T(120,188,"b")+T(30,118,"h")+L(40,170,40,60,{c:MUT,d:"4 3"});
    if(hi(stage,1)) g+=P("200,170 320,170 280,60 160,60",{f:FILL.b})+T(240,52,"b",{c:OK})+T(260,188,"a",{c:OK});
    if(hi(stage,2)) g+=T(180,215,"밑변 a+b, 높이 h 인 평행사변형",{c:"#b46a00",w:700,s:12});
    if(hi(stage,3)) g+=T(180,118,"S = ½(a+b)h",{c:BAD,w:700,s:15});
    return S(360,230,g); };
  // 합차 공식: ㄱ자 → 직사각형
  F.pfDiffSquares=({stage=null}={})=>{ const a=130,b=55; let g=`<rect x="30" y="30" width="${a}" height="${a}" fill="${FILL.a}" stroke="var(--ink)" stroke-width="2"/>`+T(30+a/2,22,"a")+T(20,30+a/2,"a");
    if(hi(stage,1)) g+=`<rect x="${30+a-b}" y="30" width="${b}" height="${b}" fill="var(--bg)" stroke="var(--ink)" stroke-width="2"/>`+T(30+a-b/2,22,"b",{c:BAD})+T(30+a+10,30+b/2,"b",{c:BAD});
    if(hi(stage,2)) g+=L(30,30+b,30+a-b,30+b,{c:BAD,d:"5 4"})+T(80,125,"a^2−b^2",{c:ACC,w:700,s:13});
    if(hi(stage,3)){ const x=210; g+=`<rect x="${x}" y="60" width="${a+b}" height="${a-b}" fill="${FILL.b}" stroke="var(--ink)" stroke-width="2"/>`+L(x+a,60,x+a,60+a-b,{c:BAD,d:"5 4"})+T(x+(a+b)/2,52,"a+b",{c:OK})+T(x+a+b+16,60+(a-b)/2,"a−b",{c:OK}); }
    if(hi(stage,4)) g+=T(300,200,"= (a+b)(a−b)",{c:"#b46a00",w:700,s:13});
    return S(420,220,g); };
  // 사인 넓이 공식: 높이 h = c·sinB
  F.pfSineArea=({stage=null}={})=>{ const A=[150,40],B=[40,190],C=[300,190]; let g=P(`${A} ${B} ${C}`,{f:"rgba(47,111,237,.06)"})+T(A[0],A[1]-10,"A")+T(B[0]-12,B[1]+6,"B")+T(C[0]+12,C[1]+6,"C")+T(170,205,"a")+T(85,105,"c",{c:ACC});
    if(hi(stage,1)) g+=L(A[0],A[1],A[0],190,{c:ACC2,d:"5 4"})+T(A[0]+10,120,"h",{c:ACC2})+RA(A[0],190,-1,0,0,-1)+ARC(B[0],B[1],26,0,Math.atan2(150,110),{c:ACC})+T(78,178,"B",{c:ACC,s:11});
    if(hi(stage,2)) g+=T(230,100,"sinB = h / c",{c:ACC,s:12})+T(230,120,"→ h = c·sinB",{c:ACC,s:12,w:700});
    if(hi(stage,3)) g+=T(170,225,"S = ½·a·h = ½·a·c·sinB",{c:"#b46a00",w:700,s:13});
    return S(340,235,g); };
  // 현의 길이: 중심에서 수선
  F.pfChord=({stage=null}={})=>{ const O=[170,120],r=85; const d=40; const half=Math.sqrt(r*r-d*d); const A=[O[0]-half,O[1]-d],B=[O[0]+half,O[1]-d],M=[O[0],O[1]-d]; let g=C(O[0],O[1],r)+D(O[0],O[1])+T(O[0],O[1]+16,"O")+L(A[0],A[1],B[0],B[1],{c:ACC})+T(A[0]-10,A[1],"A")+T(B[0]+10,B[1],"B");
    if(hi(stage,1)) g+=L(O[0],O[1],M[0],M[1],{c:ACC2})+T(M[0]+10,M[1]-6,"M")+T(O[0]+12,O[1]-d/2,"d",{c:ACC2})+RA(M[0],M[1],1,0,0,1);
    if(hi(stage,2)) g+=L(O[0],O[1],A[0],A[1],{c:OK})+T((O[0]+A[0])/2-10,(O[1]+A[1])/2+10,"r",{c:OK})+T(100,60,"AM = √(r²−d²)",{c:OK,s:12});
    if(hi(stage,3)) g+=T(170,222,"AB = 2AM = 2√(r²−d²)",{c:"#b46a00",w:700,s:12});
    return S(340,235,g); };
  // 등차수열의 합: 계단 두 개 붙이기
  F.pfArithSum=({stage=null}={})=>{ const n=5,u=22,ox=30,oy=190; let g=""; for(let i=0;i<n;i++){ g+=`<rect x="${ox+i*(u+4)}" y="${oy-(i+1)*u}" width="${u}" height="${(i+1)*u}" fill="${FILL.a}" stroke="var(--ink)" stroke-width="1.5"/>`; }
    g+=T(ox+(n*(u+4))/2,oy+16,"a, a+d, …, l",{s:11});
    if(hi(stage,1)){ for(let i=0;i<n;i++){ g+=`<rect x="${ox+i*(u+4)}" y="${oy-(n+1)*u}" width="${u}" height="${(n-i)*u}" fill="${FILL.b}" stroke="var(--ink)" stroke-width="1.5"/>`; } g+=T(ox+(n*(u+4))/2,oy-(n+1)*u-8,"거꾸로 한 번 더",{c:OK,s:11}); }
    if(hi(stage,2)) g+=T(260,80,"각 기둥 = a + l",{c:ACC,s:12})+T(260,100,"기둥 n 개",{c:ACC,s:12});
    if(hi(stage,3)) g+=T(260,140,"2Sₙ = n(a+l)",{s:12})+T(260,165,"Sₙ = n(a+l)/2",{c:"#b46a00",w:700,s:14});
    return S(360,220,g); };
  // 미분계수: 할선 → 접선
  F.pfSecant=({stage=null}={})=>{ const f=x=>x*x; const X=x=>60+x*55,Y=y=>190-y*18; let path="M"; for(let x=-0.2;x<=2.6;x+=0.05) path+=`${X(x)},${Y(f(x))} `; let g=`<path d="${path}" fill="none" stroke="var(--ink)" stroke-width="2"/>`+L(40,190,320,190,{c:MUT})+L(60,20,60,200,{c:MUT});
    const a=1; g+=D(X(a),Y(f(a)),{c:ACC})+T(X(a),Y(f(a))+16,"(x, x²)",{c:ACC,s:11});
    if(hi(stage,1)){ const h=1.1; g+=D(X(a+h),Y(f(a+h)),{c:OK})+L(X(a)-20,Y(f(a))-(f(a+h)-f(a))/h*18*(-20/55),X(a+h)+20,Y(f(a+h))+(f(a+h)-f(a))/h*18*(20/55),{c:OK})+T(X(a+h)+8,Y(f(a+h))-10,"(x+h, (x+h)²)",{c:OK,s:11})+T(250,160,"할선 기울기 = 2x+h",{c:OK,s:11}); }
    if(hi(stage,2)){ const h=0.5; g+=D(X(a+h),Y(f(a+h)),{c:OK})+L(X(a)-20,Y(f(a))+(2*a+h)*18*(20/55),X(a+h)+20,Y(f(a+h))-(2*a+h)*18*(20/55),{c:OK,d:"4 3"}); }
    if(hi(stage,3)) g+=L(X(a)-40,Y(f(a))+2*a*18*(40/55),X(a)+60,Y(f(a))-2*a*18*(60/55),{c:BAD,w:2.5})+T(250,70,"h → 0: 접선 기울기 2x",{c:BAD,w:700,s:12});
    return S(340,210,g); };
  // 내적: 두 벡터와 삼각형(코사인법칙)
  F.pfDot=({stage=null}={})=>{ const O=[60,180],A=[260,180],B=[150,60]; let g=L(40,180,320,180,{c:MUT})+L(60,200,60,30,{c:MUT});
    g+=`<defs><marker id="pfArr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--ink)"/></marker></defs>`;
    g+=`<line x1="${O[0]}" y1="${O[1]}" x2="${A[0]}" y2="${A[1]}" stroke="${ACC}" stroke-width="2.5" marker-end="url(#pfArr)"/><line x1="${O[0]}" y1="${O[1]}" x2="${B[0]}" y2="${B[1]}" stroke="${OK}" stroke-width="2.5" marker-end="url(#pfArr)"/>`+T(170,196,"a",{c:ACC,w:700})+T(92,112,"b",{c:OK,w:700})+ARC(O[0],O[1],26,0,Math.atan2(120,90),{c:ACC2})+T(100,170,"θ",{c:ACC2,s:12});
    if(hi(stage,1)) g+=L(B[0],B[1],A[0],A[1],{c:BAD,d:"5 4"})+T(220,110,"|a−b|",{c:BAD,s:12});
    if(hi(stage,2)) g+=T(245,30,"|a−b|² = |a|²+|b|²−2|a||b|cosθ",{s:11});
    if(hi(stage,3)) g+=T(260,50,"= (a₁−b₁)²+(a₂−b₂)²",{s:11})+T(220,215,"∴ a·b = a₁b₁+a₂b₂",{c:"#b46a00",w:700,s:13});
    return S(340,225,g); };
  // 포물선 정의
  F.pfParabola=({stage=null}={})=>{ const p=40; const X=x=>80+x,Y=y=>120-y; let path="M"; for(let y=-100;y<=100;y+=5){ const x=y*y/(4*p); path+=`${X(x)},${Y(y)} `; } let g=`<path d="${path}" fill="none" stroke="var(--ink)" stroke-width="2"/>`+L(20,120,320,120,{c:MUT})+L(80,20,80,220,{c:MUT})+D(X(p),Y(0),{c:BAD})+T(X(p),Y(0)+16,"F(p,0)",{c:BAD,s:11})+L(X(-p),20,X(-p),220,{c:ACC,d:"5 4"})+T(X(-p),16,"x=−p",{c:ACC,s:11});
    const y0=70,x0=y0*y0/(4*p); if(hi(stage,1)) g+=D(X(x0),Y(y0),{c:OK})+T(X(x0)+30,Y(y0)-6,"P(x,y)",{c:OK,s:11});
    if(hi(stage,2)) g+=L(X(x0),Y(y0),X(p),Y(0),{c:BAD})+L(X(x0),Y(y0),X(-p),Y(y0),{c:ACC})+T(X(x0)-40,Y(y0)-8,"x+p",{c:ACC,s:11})+T(X(x0)+8,Y(y0/2)+4,"PF",{c:BAD,s:11});
    if(hi(stage,3)) g+=T(230,200,"PF = x+p → y² = 4px",{c:"#b46a00",w:700,s:12});
    return S(340,230,g); };
  // 타원 정의
  F.pfEllipse=({stage=null}={})=>{ const cx=170,cy=120,a=120,b=70,c=Math.sqrt(a*a-b*b); let g=`<ellipse cx="${cx}" cy="${cy}" rx="${a}" ry="${b}" fill="rgba(47,111,237,.06)" stroke="var(--ink)" stroke-width="2"/>`+L(30,cy,310,cy,{c:MUT})+D(cx-c,cy,{c:BAD})+D(cx+c,cy,{c:BAD})+T(cx-c,cy+16,"F′",{c:BAD,s:11})+T(cx+c,cy+16,"F",{c:BAD,s:11});
    const t=1.0; const Px=cx+a*Math.cos(t),Py=cy-b*Math.sin(t); if(hi(stage,1)) g+=D(Px,Py,{c:OK})+T(Px+8,Py-8,"P",{c:OK,s:11})+L(Px,Py,cx-c,cy,{c:ACC})+L(Px,Py,cx+c,cy,{c:ACC})+T(cx-20,70,"PF′ + PF = 2a",{c:ACC,s:12,w:700});
    if(hi(stage,2)) g+=L(cx,cy,cx,cy-b,{c:OK,d:"4 3"})+T(cx+10,cy-b/2,"b",{c:OK,s:11})+L(cx,cy-b,cx+c,cy,{c:OK})+T(cx+c/2+8,cy-b/2-6,"a",{c:OK,s:11})+T(cx+c/2,cy+34,"c",{c:BAD,s:11});
    if(hi(stage,3)) g+=T(170,215,"b² = a² − c²",{c:"#b46a00",w:700,s:13});
    return S(340,230,g); };
  // 회전체 단면
  F.pfRevolve=({stage=null}={})=>{ const f=x=>60+18*Math.sin(x/40)+x*0.25; let top="M",bot=""; for(let x=0;x<=200;x+=5){ top+=`${60+x},${120-f(x)/2} `; bot=`${60+x},${120+f(x)/2} `+bot; } let g=L(40,120,300,120,{c:MUT})+`<path d="${top}L${bot.trim().replace(/ /g," L")}Z" fill="rgba(47,111,237,.08)" stroke="var(--ink)" stroke-width="1.5"/>`+T(150,50,"y = f(x)",{s:11});
    const x0=110; const r=f(x0)/2; if(hi(stage,1)) g+=`<ellipse cx="${60+x0}" cy="120" rx="10" ry="${r}" fill="${FILL.c}" stroke="#b46a00" stroke-width="2"/>`+L(60+x0,120,60+x0,120-r,{c:BAD})+T(60+x0+14,120-r/2,"f(x)",{c:BAD,s:11});
    if(hi(stage,2)) g+=T(230,185,"단면 = π f(x)²",{c:"#b46a00",s:12,w:700});
    if(hi(stage,3)) g+=T(230,207,"V = ∫ π f(x)² dx",{c:"#b46a00",s:12,w:700});
    return S(340,220,g); };
  // 공간 거리: 직육면체 대각선
  F.pfSpaceDist=({stage=null}={})=>{ const o=[70,180],dx=140,dy=-80,dz=[60,-40]; const p=(i,j,k)=>[o[0]+i*dx+k*dz[0],o[1]+j*dy+k*dz[1]]; const A=p(0,0,0),B=p(1,1,1); let g="";
    const edges=[[0,0,0,1,0,0],[0,0,0,0,1,0],[0,0,0,0,0,1],[1,0,0,1,1,0],[1,0,0,1,0,1],[0,1,0,1,1,0],[0,1,0,0,1,1],[0,0,1,1,0,1],[0,0,1,0,1,1],[1,1,0,1,1,1],[1,0,1,1,1,1],[0,1,1,1,1,1]];
    edges.forEach(e=>{ const q=p(e[0],e[1],e[2]),r=p(e[3],e[4],e[5]); g+=L(q[0],q[1],r[0],r[1],{c:MUT,w:1.5}); });
    g+=D(A[0],A[1])+T(A[0]-12,A[1]+6,"A")+D(B[0],B[1])+T(B[0]+12,B[1]-4,"B")+T(o[0]+dx/2,o[1]+16,"|x₂−x₁|",{s:11})+T(o[0]+dx+dz[0]/2+28,o[1]+dz[1]/2+8,"|y₂−y₁|",{s:11})+T(o[0]+dx+dz[0]+14,o[1]+dz[1]+dy/2,"|z₂−z₁|",{s:11});
    if(hi(stage,1)){ const Cq=p(1,0,1); g+=L(A[0],A[1],Cq[0],Cq[1],{c:OK,d:"5 4"})+T(150,150,"밑면 대각선",{c:OK,s:11}); }
    if(hi(stage,2)) g+=L(A[0],A[1],B[0],B[1],{c:BAD,w:2.5})+T(170,215,"AB² = (밑면 대각선)² + 높이²",{c:"#b46a00",w:700,s:12});
    return S(340,230,g); };
  // 삼각함수 항등식: 단위 직각삼각형
  F.pfTrigId=({stage=null}={})=>{ const O=[60,180],a=200,b=120; let g=P(`${O} ${O[0]+a},${O[1]} ${O[0]+a},${O[1]-b}`,{f:"rgba(47,111,237,.08)"})+RA(O[0]+a,O[1],-1,0,0,-1)+T(O[0]+a/2,O[1]+16,"b")+T(O[0]+a+12,O[1]-b/2,"a")+T(O[0]+a/2-10,O[1]-b/2-10,"c",{c:ACC,w:700})+ARC(O[0],O[1],30,0,Math.atan2(b,a),{c:ACC2})+T(O[0]+44,O[1]-10,"A",{c:ACC2});
    if(hi(stage,1)) g+=T(260,40,"sinA = a/c, cosA = b/c",{s:12});
    if(hi(stage,2)) g+=T(260,62,"sin²A+cos²A = (a²+b²)/c²",{s:12});
    if(hi(stage,3)) g+=T(260,90,"a²+b² = c² → 1",{c:"#b46a00",w:700,s:13});
    return S(380,200,g); };
})();
