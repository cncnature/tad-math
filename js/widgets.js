/* 매스랩 위젯: 순수 Canvas 2D, 외부 의존성 없음.
   각 위젯은 WIDGETS[id] = { title, desc, node, grade, render(container) } */
(function(){
  const W = window.WIDGETS = {};

  // ---------- 공통 도우미 ----------
  function el(tag, attrs={}, html=""){ const e=document.createElement(tag); for(const k in attrs){ if(k==="class") e.className=attrs[k]; else e.setAttribute(k,attrs[k]); } if(html) e.innerHTML=html; return e; }
  function makeCanvas(parent, w=700, h=380){
    const c = el("canvas"); const dpr = Math.min(2, window.devicePixelRatio||1);
    c.width = w*dpr; c.height = h*dpr; c.style.aspectRatio = `${w}/${h}`;
    parent.appendChild(c); const ctx = c.getContext("2d"); ctx.scale(dpr,dpr);
    return {c, ctx, w, h};
  }
  function slider(parent, label, min, max, step, val, onInput){
    const lab = el("label"); const out = el("b");
    lab.innerHTML = `${label} <span></span>`; lab.querySelector("span").appendChild(out);
    const inp = el("input",{type:"range",min,max,step,value:val}); lab.appendChild(inp);
    const upd=()=>{ const v=Number(inp.value); out.textContent = step<1 ? String(Math.round(v*100)/100) : String(Math.round(v)); onInput(Number(inp.value)); };
    inp.addEventListener("input",upd); parent.appendChild(lab); setTimeout(upd,0);
    return inp;
  }
  function css(v){ return getComputedStyle(document.documentElement).getPropertyValue(v).trim(); }
  const C = ()=>({ ink:css("--ink"), muted:css("--muted"), line:css("--line"), acc:css("--acc"), acc2:css("--acc2"), ok:css("--ok"), bad:css("--bad"), g22:css("--g22"), g31:css("--g31"), g32:css("--g32") });
  function axes(ctx,w,h,ox,oy,s,col){
    ctx.strokeStyle=col.line; ctx.lineWidth=1;
    for(let x=ox%s;x<w;x+=s){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}
    for(let y=oy%s;y<h;y+=s){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}
    ctx.strokeStyle=col.muted; ctx.lineWidth=1.5;
    ctx.beginPath();ctx.moveTo(0,oy);ctx.lineTo(w,oy);ctx.moveTo(ox,0);ctx.lineTo(ox,h);ctx.stroke();
  }
  // 캔버스 텍스트: a^{2}, x_{1}, 2^x, log_a 마크업을 위·아래 첨자로 그린다
  function txt(ctx,s,x,y,col,size=13,align="left"){ s=String(s); ctx.fillStyle=col; ctx.textAlign="left"; const F=sz=>`${sz}px system-ui,sans-serif`;
    if(!/[\^_]/.test(s)){ ctx.font=F(size); ctx.textAlign=align; ctx.fillText(s,x,y); return; }
    const parts=[]; let last=0; const re=/(\^|_)(\{[^}]*\}|[^\s{}^_])/g; let m; while((m=re.exec(s))){ if(m.index>last) parts.push({t:s.slice(last,m.index),k:0}); parts.push({t:m[2].replace(/^\{|\}$/g,""),k:m[1]==="^"?1:-1}); last=re.lastIndex; } if(last<s.length) parts.push({t:s.slice(last),k:0});
    const small=Math.round(size*0.72); let w=0; parts.forEach(p=>{ ctx.font=F(p.k?small:size); w+=ctx.measureText(p.t).width; });
    let cx=align==="center"?x-w/2:align==="right"||align==="end"?x-w:x;
    parts.forEach(p=>{ ctx.font=F(p.k?small:size); ctx.fillText(p.t,cx,y+(p.k===1?-size*0.4:p.k===-1?size*0.25:0)); cx+=ctx.measureText(p.t).width; }); }
  // 계수 표기: 1x → x, −1x → −x, 0.5x 그대로
  const cf=(a,v="x")=>a===1?v:a===-1?"−"+v:a===0?"0":`${a}${v}`;
  // HTML 쪽(설명·판독값): 같은 마크업을 <sup>/<sub> 로
  const fmt = t=>String(t).replace(/(\^|_)(\{[^}]*\}|[^\s{}^_<&])/g,(m,k,v)=>{ v=v.replace(/^\{|\}$/g,""); return k==="^"?`<sup>${v}</sup>`:`<sub>${v}</sub>`; });
  window.MF = fmt;

  // ---------- 1. 이차함수 ----------
  W.quadratic = { title:"이차함수 y = ax²+bx+c 밀어 보기", grade:"g31", node:"quadratic-func",
    desc:"a, b, c 를 밀면 포물선과 꼭짓점·판별식·근이 바로 바뀝니다. c 를 올려 두 근이 만나고 사라지는 순간을 보세요.",
    render(root){
      const {ctx,w,h}=makeCanvas(root); const ctl=el("div",{class:"ctrl"}); const out=el("div",{class:"readout"}); root.append(ctl,out);
      let a=1,b=-1,c=-6;
      function draw(){ const col=C(); ctx.clearRect(0,0,w,h); const ox=w/2, oy=h/2, s=30; axes(ctx,w,h,ox,oy,s,col);
        for(let k=-11;k<=11;k++){ if(k===0)continue; txt(ctx,String(k),ox+k*s,oy+14,col.muted,10,"center"); }
        for(let k=-6;k<=6;k++){ if(k===0)continue; txt(ctx,String(k),ox-6,oy-k*s+4,col.muted,10,"right"); }
        txt(ctx,"x",w-10,oy-6,col.muted,12,"right"); txt(ctx,"y",ox+8,14,col.muted,12);
        ctx.strokeStyle=col.acc; ctx.lineWidth=3; ctx.beginPath();
        for(let px=0;px<=w;px++){ const x=(px-ox)/s; const y=a*x*x+b*x+c; const py=oy-y*s; if(px===0)ctx.moveTo(px,py); else ctx.lineTo(px,py);} ctx.stroke();
        const vx=-b/(2*a), vy=c-b*b/(4*a); const D=b*b-4*a*c;
        ctx.strokeStyle=col.acc2; ctx.setLineDash([4,4]); ctx.beginPath(); ctx.moveTo(ox+vx*s,0); ctx.lineTo(ox+vx*s,h); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle=col.acc2; ctx.beginPath(); ctx.arc(ox+vx*s,oy-vy*s,6,0,7); ctx.fill(); txt(ctx,`(${+vx.toFixed(2)}, ${+vy.toFixed(2)})`,ox+vx*s+10,oy-vy*s+(a>0?18:-10),col.acc2,12);
        let roots="없음 (D<0)";
        if(D>=0){ const r1=(-b-Math.sqrt(D))/(2*a), r2=(-b+Math.sqrt(D))/(2*a); roots=D===0?`중근 ${r1.toFixed(2)}`:`${r1.toFixed(2)}, ${r2.toFixed(2)}`;
          ctx.fillStyle=col.ok; [r1,r2].forEach(r=>{ctx.beginPath();ctx.arc(ox+r*s,oy,6,0,7);ctx.fill();}); }
        const fa=a===1?"":a===-1?"−":String(a); const fb=Math.abs(b)===1?"":String(Math.abs(b)); txt(ctx,`y = ${fa}x² ${b===0?"":(b>0?"+ ":"− ")+fb+"x"} ${c>=0?"+":"−"} ${Math.abs(c)}`,12,22,col.ink,15);
        out.innerHTML=`꼭짓점 (−b/2a, c−b²/4a) = (<b>${vx.toFixed(2)}</b>, <b>${vy.toFixed(2)}</b>) · ${a>0?"아래로 볼록":"위로 볼록"}<br>판별식 D = b²−4ac = <b>${D.toFixed(2)}</b> → 근: <b>${roots}</b>`;
      }
      slider(ctl,"a (구부러짐, 0 은 제외)",-3,3,0.25,a,v=>{a=v===0?0.25:v;draw();}); slider(ctl,"b (축의 자리)",-8,8,0.5,b,v=>{b=v;draw();}); slider(ctl,"c (y절편)",-8,8,0.5,c,v=>{c=v;draw();});
      draw();
    }};

  // ---------- 2. 피타고라스: 넓이를 쏟아 붓다 ----------
  W.pythagoras = { title:"넓이를 쏟아 붓다 (피타고라스)", grade:"g22", node:"pythagoras",
    desc:"두 변 위의 정사각형에 담긴 물을 빗변의 정사각형에 쏟으면 넘치지도 모자라지도 않게 꼭 찹니다.",
    render(root){
      const {ctx,w,h}=makeCanvas(root,700,420); const ctl=el("div",{class:"ctrl"}); const out=el("div",{class:"readout"}); root.append(ctl,out);
      let a=3,b=4,pour=0;
      function sq(x,y,ux,uy,len,fill,stroke,fillRatio){ // 정사각형 (x,y)에서 방향(ux,uy) 변 len, 왼쪽 법선으로 확장
        const nx=uy, ny=-ux; const p=[[x,y],[x+ux*len,y+uy*len],[x+ux*len+nx*len,y+uy*len+ny*len],[x+nx*len,y+ny*len]];
        ctx.beginPath(); p.forEach((q,i)=>i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1])); ctx.closePath();
        ctx.fillStyle=fill; ctx.fill(); ctx.strokeStyle=stroke; ctx.lineWidth=2; ctx.stroke();
        if(fillRatio>0){ ctx.save(); ctx.clip(); const r=Math.min(1,fillRatio); // 아래부터 채우기
          const ys=p.map(q=>q[1]); const ymin=Math.min(...ys), ymax=Math.max(...ys); const yl=ymax-(ymax-ymin)*r;
          ctx.fillStyle="rgba(47,111,237,.55)"; ctx.fillRect(0,yl,w,ymax-yl); ctx.restore(); }
      }
      function draw(){ const col=C(); ctx.clearRect(0,0,w,h); const s=26; const c=Math.hypot(a,b);
        const Bx=300,By=300; const Ax=Bx, Ay=By-b*s; const Cx=Bx+a*s, Cy=By; // 직각 B
        ctx.beginPath();ctx.moveTo(Ax,Ay);ctx.lineTo(Bx,By);ctx.lineTo(Cx,Cy);ctx.closePath(); ctx.fillStyle="rgba(255,138,61,.25)"; ctx.fill(); ctx.strokeStyle=col.ink; ctx.lineWidth=2; ctx.stroke();
        // b² (왼쪽), a² (아래), c² (빗변 바깥)
        sq(Bx,By,0,-1,b*s,"rgba(255,138,61,.15)",col.acc2,1-pour);
        sq(Cx,Cy,-1,0,a*s,"rgba(255,138,61,.15)",col.acc2,1-pour);
        const ux=(Cx-Ax)/(c*s), uy=(Cy-Ay)/(c*s); sq(Ax,Ay,ux,uy,c*s,"rgba(47,111,237,.08)",col.acc,pour);
        txt(ctx,`a=${a}`,(Bx+Cx)/2,By+18,col.ink,13,"center"); txt(ctx,`b=${b}`,Bx-18,(Ay+By)/2,col.ink,13,"right"); txt(ctx,`c=√${a*a+b*b}≈${c.toFixed(2)}`,(Ax+Cx)/2+10,(Ay+Cy)/2-8,col.acc,13);
        out.innerHTML=`a² + b² = <b>${a*a}</b> + <b>${b*b}</b> = <b>${a*a+b*b}</b> &nbsp;&nbsp; c² = <b>${(c*c).toFixed(2)}</b> &nbsp;&nbsp; 쏟은 양 <b>${Math.round(pour*100)}%</b>`;
      }
      slider(ctl,"a",1,6,0.5,a,v=>{a=v;draw();}); slider(ctl,"b",1,6,0.5,b,v=>{b=v;draw();}); slider(ctl,"쏟기",0,1,0.01,0,v=>{pour=v;draw();});
      draw();
    }};

  // ---------- 3. 사각형 갈래 ----------
  W.quad = { title:"사각형의 갈래: 조건을 더하면 대각선에 무엇이 켜지나", grade:"g22", node:"quad",
    desc:"평행사변형에서 시작해 '각을 직각으로', '변을 같게' 조건을 더해 보세요. 대각선의 성질이 하나씩 켜집니다.",
    render(root){
      const {ctx,w,h}=makeCanvas(root,700,380); const ctl=el("div",{class:"ctrl"}); const out=el("div",{class:"readout"}); root.append(ctl,out);
      let ang=70, ratio=1.3; // 끼인각, 변의 비
      function draw(){ const col=C(); ctx.clearRect(0,0,w,h); const s=150; const bx=160,by=320; const AB=s*ratio, AD=s;
        const r=ang*Math.PI/180; const A=[bx,by], B=[bx+AB,by], D=[bx+AD*Math.cos(r),by-AD*Math.sin(r)], Cc=[B[0]+D[0]-A[0],B[1]+D[1]-A[1]];
        ctx.beginPath();ctx.moveTo(...A);ctx.lineTo(...B);ctx.lineTo(...Cc);ctx.lineTo(...D);ctx.closePath(); ctx.fillStyle="rgba(47,111,237,.12)"; ctx.fill(); ctx.strokeStyle=col.ink; ctx.lineWidth=2.5; ctx.stroke();
        const d1=Math.hypot(Cc[0]-A[0],Cc[1]-A[1]), d2=Math.hypot(D[0]-B[0],D[1]-B[1]);
        const sameLen=Math.abs(d1-d2)<2.5, perp=Math.abs(ratio-1)<0.015;
        ctx.strokeStyle=sameLen?col.ok:col.muted; ctx.setLineDash([6,4]); ctx.beginPath();ctx.moveTo(...A);ctx.lineTo(...Cc);ctx.moveTo(...B);ctx.lineTo(...D);ctx.stroke(); ctx.setLineDash([]);
        const O=[(A[0]+Cc[0])/2,(A[1]+Cc[1])/2]; ctx.fillStyle=col.acc2; ctx.beginPath();ctx.arc(O[0],O[1],5,0,7);ctx.fill();
        const v1=[Cc[0]-A[0],Cc[1]-A[1]], v2=[D[0]-B[0],D[1]-B[1]]; const cosO=(v1[0]*v2[0]+v1[1]*v2[1])/(d1*d2); const angO=Math.acos(Math.max(-1,Math.min(1,cosO)))*180/Math.PI;
        const name= perp&&sameLen?"정사각형": perp?"마름모": sameLen?"직사각형":"평행사변형";
        txt(ctx,name,w-20,30,col.acc,18,"right"); txt(ctx,`∠A = ${ang}°`,A[0]+8,A[1]-8,col.ink,12); txt(ctx,`AB : AD = ${ratio.toFixed(2)} : 1`,20,30,col.ink,13);
        out.innerHTML=`지금 갈래: <b>${name}</b><br>${sameLen?"🟢":"⚪"} 두 대각선의 길이가 같다 (AC ${d1.toFixed(1)}, BD ${d2.toFixed(1)}) &nbsp; ${Math.abs(angO-90)<1.5?"🟢":"⚪"} 두 대각선이 수직이다 (∠AOB ${angO.toFixed(1)}°) &nbsp; 🟢 서로 다른 것을 이등분한다 (항상)`;
      }
      slider(ctl,"끼인각 ∠A (90° 이면 직사각형)",30,150,1,ang,v=>{ang=v;draw();}); slider(ctl,"변의 비 AB:AD (1 이면 마름모)",0.6,1.6,0.01,ratio,v=>{ratio=v;draw();});
      draw();
    }};

  // ---------- 4. 닮음 ----------
  W.similar = { title:"닮음비 k 를 밀면 넓이는 k², 부피는 k³", grade:"g22", node:"similar",
    desc:"길이를 k 배 하면 넓이는 k² 배, 부피는 k³ 배가 되는 것을 막대로 비교합니다.",
    render(root){
      const {ctx,w,h}=makeCanvas(root,700,360); const ctl=el("div",{class:"ctrl"}); const out=el("div",{class:"readout"}); root.append(ctl,out);
      let k=2;
      function draw(){ const col=C(); ctx.clearRect(0,0,w,h); const base=40;
        // 원 도형(정사각형)과 닮은 도형
        ctx.fillStyle="rgba(255,138,61,.3)"; ctx.strokeStyle=col.acc2; ctx.lineWidth=2; ctx.fillRect(40,300-base,base,base); ctx.strokeRect(40,300-base,base,base);
        ctx.fillStyle="rgba(47,111,237,.25)"; ctx.strokeStyle=col.acc; ctx.fillRect(120,300-base*k,base*k,base*k); ctx.strokeRect(120,300-base*k,base*k,base*k);
        txt(ctx,"1",60,318,col.ink,12,"center"); txt(ctx,`k = ${k}`,120+base*k/2,318,col.ink,12,"center");
        // 막대: 길이 k, 넓이 k², 부피 k³
        const bars=[["길이 k",k],["넓이 k²",k*k],["부피 k³",k*k*k]]; const maxv=Math.max(27,k*k*k); const bx=420;
        bars.forEach((bb,i)=>{ const x=bx+i*85; const hh=bb[1]/maxv*260; ctx.fillStyle=[col.acc2,col.acc,col.g31][i]; ctx.fillRect(x,300-hh,50,hh); txt(ctx,bb[0],x+25,320,col.ink,12,"center"); txt(ctx,bb[1].toFixed(2).replace(/\.?0+$/,""),x+25,295-hh,col.ink,12,"center"); });
        out.innerHTML=`닮음비 1 : <b>${k}</b> → 넓이비 1 : <b>${(k*k).toFixed(2)}</b>, 부피비 1 : <b>${(k*k*k).toFixed(2)}</b>`;
      }
      slider(ctl,"닮음비 k",1,3,0.05,k,v=>{k=v;draw();}); draw();
    }};

  // ---------- 5. 삼각비 (사분원) ----------
  W.trig = { title:"반지름 1 인 사분원에서 sin·cos·tan", grade:"g32", node:"trig",
    desc:"각을 돌리면 높이가 sin, 밑변이 cos, 접선 위 길이가 tan. 30°·45°·60° 에서 값을 확인하세요.",
    render(root){
      const {ctx,w,h}=makeCanvas(root,700,400); const ctl=el("div",{class:"ctrl"}); const out=el("div",{class:"readout"}); root.append(ctl,out);
      let deg=30;
      function draw(){ const col=C(); ctx.clearRect(0,0,w,h); const R=300, ox=80, oy=360; const t=deg*Math.PI/180;
        ctx.strokeStyle=col.muted; ctx.lineWidth=1.5; ctx.beginPath(); ctx.arc(ox,oy,R,-Math.PI/2,0); ctx.stroke(); ctx.beginPath();ctx.moveTo(ox,oy);ctx.lineTo(ox+R,oy);ctx.lineTo(ox+R,oy-R);ctx.stroke(); txt(ctx,"반지름 1",ox+R/2-20,oy-R/2-30,col.muted,11); [["1",ox+R,oy+24],["O",ox-14,oy+16]].forEach(([t,x,y])=>txt(ctx,t,x,y,col.muted,12,"center"));
        const px=ox+R*Math.cos(t), py=oy-R*Math.sin(t);
        ctx.strokeStyle=col.ink; ctx.lineWidth=2.5; ctx.beginPath();ctx.moveTo(ox,oy);ctx.lineTo(px,py);ctx.stroke();
        ctx.strokeStyle=col.acc; ctx.lineWidth=4; ctx.beginPath();ctx.moveTo(px,oy);ctx.lineTo(px,py);ctx.stroke(); // sin
        ctx.strokeStyle=col.acc2; ctx.beginPath();ctx.moveTo(ox,oy+6);ctx.lineTo(px,oy+6);ctx.stroke(); // cos
        const tn=Math.tan(t); if(deg<89){ ctx.strokeStyle=col.g31; ctx.setLineDash([5,4]); ctx.beginPath();ctx.moveTo(ox,oy);ctx.lineTo(ox+R,oy-R*tn);ctx.stroke(); ctx.setLineDash([]); ctx.lineWidth=4; ctx.beginPath();ctx.moveTo(ox+R,oy);ctx.lineTo(ox+R,oy-Math.min(R*tn,R*1.05));ctx.stroke(); }
        ctx.fillStyle=col.acc; ctx.beginPath();ctx.arc(px,py,6,0,7);ctx.fill();
        txt(ctx,`sin ${deg}° = ${Math.sin(t).toFixed(3)}`,px+10,(py+oy)/2,col.acc,13); txt(ctx,`cos ${deg}° = ${Math.cos(t).toFixed(3)}`,(ox+px)/2,oy+24,col.acc2,13,"center"); if(deg<89) txt(ctx,`tan ${deg}° = ${tn.toFixed(3)}`,ox+R+8,oy-Math.min(R*tn,R)/2,col.g31,13);
        txt(ctx,`${deg}°`,ox+34,oy-10,col.ink,13);
        const sp={30:"½, √3/2, √3/3",45:"√2/2, √2/2, 1",60:"√3/2, ½, √3"}[deg]||"";
        out.innerHTML=`sin = <b>${Math.sin(t).toFixed(4)}</b> &nbsp; cos = <b>${Math.cos(t).toFixed(4)}</b> &nbsp; tan = <b>${deg>=90?"정의 안 됨":tn.toFixed(4)}</b>${sp?` &nbsp; ← 특수각: <b>${sp}</b>`:""} &nbsp; | sin²+cos² = <b>${(Math.sin(t)**2+Math.cos(t)**2).toFixed(2)}</b>`;
      }
      slider(ctl,"각 A (도)",0,90,1,deg,v=>{deg=v;draw();}); draw();
    }};

  // ---------- 6. 원주각 ----------
  W.inscribed = { title:"원 위의 점을 움직여도 원주각은 그대로", grade:"g32", node:"circle",
    desc:"P 를 호 위에서 움직여 보세요. ∠APB 는 변하지 않고, 항상 중심각 ∠AOB 의 절반입니다.",
    render(root){
      const {ctx,w,h}=makeCanvas(root,700,400); const ctl=el("div",{class:"ctrl"}); const out=el("div",{class:"readout"}); root.append(ctl,out);
      let pA=200, pB=340, pP=90; // 각도(도)
      const O=[350,210], R=160; const pt=d=>[O[0]+R*Math.cos(d*Math.PI/180),O[1]+R*Math.sin(d*Math.PI/180)];
      function ang(P,A,B){ const v1=[A[0]-P[0],A[1]-P[1]],v2=[B[0]-P[0],B[1]-P[1]]; return Math.acos((v1[0]*v2[0]+v1[1]*v2[1])/(Math.hypot(...v1)*Math.hypot(...v2)))*180/Math.PI; }
      function draw(){ const col=C(); ctx.clearRect(0,0,w,h); const A=pt(pA),B=pt(pB),P=pt(pP);
        ctx.strokeStyle=col.line; ctx.lineWidth=2; ctx.beginPath();ctx.arc(O[0],O[1],R,0,7);ctx.stroke();
        ctx.strokeStyle=col.acc2; ctx.lineWidth=5; ctx.beginPath(); ctx.arc(O[0],O[1],R,pA*Math.PI/180,pB*Math.PI/180); ctx.stroke(); // 호 AB
        ctx.strokeStyle=col.acc2; ctx.lineWidth=2; ctx.beginPath();ctx.moveTo(...O);ctx.lineTo(...A);ctx.lineTo(...B);ctx.lineTo(...O);ctx.stroke();
        ctx.strokeStyle=col.acc; ctx.lineWidth=2.5; ctx.beginPath();ctx.moveTo(...A);ctx.lineTo(...P);ctx.lineTo(...B);ctx.stroke();
        [[A,"A"],[B,"B"],[P,"P"],[O,"O"]].forEach(([q,n])=>{ctx.fillStyle=n==="P"?col.acc:col.ink;ctx.beginPath();ctx.arc(q[0],q[1],5,0,7);ctx.fill();txt(ctx,n,q[0]+8,q[1]-8,col.ink,13);});
        const ia=ang(P,A,B), ca=ang(O,A,B); const cen= (pB-pA+360)%360; const central = cen>180? 360-cen : cen; // 호 AB 에 대한 중심각 (작은 호 기준)
        const onMajor = !(((pP-pA+360)%360) < cen); // P 가 호 AB 의 반대쪽(큰 호 위)에 있을 때 원주각 = 중심각/2
        out.innerHTML=`원주각 ∠APB = <b>${ia.toFixed(1)}°</b> &nbsp; 중심각 ∠AOB = <b>${ca.toFixed(1)}°</b> &nbsp; → 비율 <b>${(ca/ia).toFixed(2)}</b> ${onMajor?"(= 2, 원주각은 중심각의 절반)":"(P 가 호 AB 위에 있어 180° − 원주각 관계: 내접사각형의 대각)"}`;
      }
      slider(ctl,"점 P 의 위치 (도)",0,359,1,pP,v=>{pP=v;draw();}); slider(ctl,"점 B 의 위치 (도)",0,359,1,pB,v=>{pB=v;draw();}); draw();
    }};

  // ---------- 7. 확률 시뮬레이터 ----------
  W.dice = { title:"던질수록 확률에 다가간다 (주사위 상대도수)", grade:"g22", node:"probability",
    desc:"주사위를 던져 '3 이하' 가 나온 비율을 그립니다. 횟수가 커질수록 1/2 에 붙습니다.",
    render(root){
      const {ctx,w,h}=makeCanvas(root,700,300); const ctl=el("div",{class:"row"}); const out=el("div",{class:"readout"}); root.append(ctl,out);
      let n=0, hit=0, hist=[];
      function draw(){ const col=C(); ctx.clearRect(0,0,w,h); const ox=50, oy=260; ctx.strokeStyle=col.muted; ctx.beginPath();ctx.moveTo(ox,20);ctx.lineTo(ox,oy);ctx.lineTo(w-20,oy);ctx.stroke();
        ctx.strokeStyle=col.acc2; ctx.setLineDash([6,4]); ctx.beginPath();ctx.moveTo(ox,oy-120);ctx.lineTo(w-20,oy-120);ctx.stroke(); ctx.setLineDash([]); txt(ctx,"1/2",ox-30,oy-116,col.acc2,12); txt(ctx,"1",ox-18,30,col.muted,11); txt(ctx,"0",ox-18,oy+4,col.muted,11); txt(ctx,"상대도수",ox+6,30,col.muted,11); txt(ctx,"던진 횟수 →",w-24,oy+16,col.muted,11,"right");
        ctx.strokeStyle=col.acc; ctx.lineWidth=2; ctx.beginPath(); const N=hist.length; hist.forEach((p,i)=>{const x=ox+(i/Math.max(1,N-1))*(w-70); const y=oy-p*240; i?ctx.lineTo(x,y):ctx.moveTo(x,y);}); ctx.stroke();
        out.innerHTML=`던진 횟수 <b>${n}</b> · 3 이하 <b>${hit}</b> · 상대도수 <b>${n?(hit/n).toFixed(4):"-"}</b> · 이론 확률 0.5`;
      }
      function roll(k){ for(let i=0;i<k;i++){ n++; if(Math.floor(Math.random()*6)+1<=3)hit++; if(n<=200||n%10===0)hist.push(hit/n);} if(hist.length>600)hist=hist.filter((_,i)=>i%2===0); draw(); }
      [["1번",1],["10번",10],["100번",100],["1000번",1000]].forEach(([l,k])=>{const b=el("button",{class:"btn sm"},l);b.onclick=()=>roll(k);ctl.appendChild(b);});
      const r=el("button",{class:"btn sm ghost"},"다시"); r.onclick=()=>{n=0;hit=0;hist=[];draw();}; ctl.appendChild(r); draw();
    }};

  // ---------- 8. 통계: 막대를 움직여 평균·표준편차 ----------
  W.stats = { title:"막대를 끌어 평균과 표준편차 느끼기", grade:"g32", node:"statistics",
    desc:"막대(변량)를 위아래로 끌어 보세요. 평균선이 움직이고 표준편차(퍼짐)가 바뀝니다. 평균은 같은데 표준편차만 다르게 만들어 보세요.",
    render(root){
      const {c,ctx,w,h}=makeCanvas(root,700,340); const out=el("div",{class:"readout"}); root.append(out);
      let data=[40,60,70,80,100]; let drag=-1; const ox=70, oy=300, bw=60, gap=40;
      function stats(){ const m=data.reduce((a,b)=>a+b,0)/data.length; const v=data.reduce((a,b)=>a+(b-m)**2,0)/data.length; return {m,v,sd:Math.sqrt(v)}; }
      function draw(){ const col=C(); ctx.clearRect(0,0,w,h); const {m,v,sd}=stats();
        ctx.strokeStyle=col.muted; ctx.beginPath();ctx.moveTo(ox-20,oy);ctx.lineTo(w-20,oy);ctx.stroke();
        data.forEach((d,i)=>{ const x=ox+i*(bw+gap); const hh=d*2.5; ctx.fillStyle=i===drag?col.acc2:col.acc; ctx.fillRect(x,oy-hh,bw,hh); txt(ctx,String(d),x+bw/2,oy-hh-6,col.ink,13,"center");
          ctx.strokeStyle=col.bad; ctx.setLineDash([3,3]); ctx.beginPath();ctx.moveTo(x+bw/2,oy-hh);ctx.lineTo(x+bw/2,oy-m*2.5);ctx.stroke(); ctx.setLineDash([]); });
        ctx.strokeStyle=col.acc2; ctx.lineWidth=2.5; ctx.beginPath();ctx.moveTo(ox-20,oy-m*2.5);ctx.lineTo(w-20,oy-m*2.5);ctx.stroke(); txt(ctx,`평균 ${m.toFixed(1)}`,w-24,oy-m*2.5-6,col.acc2,13,"right");
        const sorted=[...data].sort((a,b)=>a-b);
        out.innerHTML=`자료 ${data.join(", ")} · 평균 <b>${m.toFixed(2)}</b> · 중앙값 <b>${sorted[2]}</b> · 편차 ${data.map(d=>(d-m).toFixed(1)).join(", ")} (합 0)<br>분산 = 편차² 의 평균 = <b>${v.toFixed(2)}</b> · 표준편차 = √분산 = <b>${sd.toFixed(2)}</b>`;
      }
      function pos(e){ const r=c.getBoundingClientRect(); const t=e.touches?e.touches[0]:e; return [(t.clientX-r.left)*w/r.width,(t.clientY-r.top)*h/r.height]; }
      const down=e=>{ const [x]=pos(e); data.forEach((d,i)=>{ const bx=ox+i*(bw+gap); if(x>=bx&&x<=bx+bw) drag=i; }); if(drag>=0){move(e);} };
      const move=e=>{ if(drag<0)return; e.preventDefault(); const [,y]=pos(e); data[drag]=Math.max(0,Math.min(110,Math.round((oy-y)/2.5))); draw(); };
      const up=()=>{drag=-1;draw();};
      c.addEventListener("mousedown",down); c.addEventListener("mousemove",move); window.addEventListener("mouseup",up);
      c.addEventListener("touchstart",down,{passive:false}); c.addEventListener("touchmove",move,{passive:false}); c.addEventListener("touchend",up);
      draw();
    }};

  // ---------- 9. 무게중심 ----------
  W.centroid = { title:"무게중심은 중선을 2 : 1 로 나눈다", grade:"g22", node:"similar",
    desc:"꼭짓점 C 를 움직여도 세 중선은 한 점에서 만나고 비는 항상 2:1 입니다.",
    render(root){
      const {ctx,w,h}=makeCanvas(root,700,380); const ctl=el("div",{class:"ctrl"}); const out=el("div",{class:"readout"}); root.append(ctl,out);
      let cx=420, cy=60; const A=[120,320], B=[560,320];
      function draw(){ const col=C(); ctx.clearRect(0,0,w,h); const Cc=[cx,cy];
        const M=[(B[0]+Cc[0])/2,(B[1]+Cc[1])/2], N=[(A[0]+Cc[0])/2,(A[1]+Cc[1])/2], L=[(A[0]+B[0])/2,(A[1]+B[1])/2];
        const G=[(A[0]+B[0]+Cc[0])/3,(A[1]+B[1]+Cc[1])/3];
        ctx.beginPath();ctx.moveTo(...A);ctx.lineTo(...B);ctx.lineTo(...Cc);ctx.closePath(); ctx.fillStyle="rgba(47,111,237,.1)"; ctx.fill(); ctx.strokeStyle=col.ink; ctx.lineWidth=2.5; ctx.stroke();
        ctx.strokeStyle=col.acc2; ctx.lineWidth=1.5; [[A,M],[B,N],[Cc,L]].forEach(([p,q])=>{ctx.beginPath();ctx.moveTo(...p);ctx.lineTo(...q);ctx.stroke();});
        ctx.fillStyle=col.acc; ctx.beginPath();ctx.arc(G[0],G[1],7,0,7);ctx.fill();
        [[A,"A"],[B,"B"],[Cc,"C"],[G,"G"]].forEach(([q,n])=>txt(ctx,n,q[0]+8,q[1]-8,col.ink,13));
        const AG=Math.hypot(G[0]-A[0],G[1]-A[1]), GM=Math.hypot(M[0]-G[0],M[1]-G[1]);
        out.innerHTML=`AG = <b>${AG.toFixed(1)}</b>, GM = <b>${GM.toFixed(1)}</b> → AG : GM = <b>${(AG/GM).toFixed(2)} : 1</b> · △GBC 넓이 = 전체의 1/3 (항상)`;
      }
      slider(ctl,"C 의 x",150,600,1,cx,v=>{cx=v;draw();}); slider(ctl,"C 의 y",30,250,1,cy,v=>{cy=v;draw();}); draw();
    }};

  // ---------- 10. 합차 공식 ----------
  W.diffsq = { title:"(a+b)(a−b) = a²−b²: ㄱ자를 펴기", grade:"g31", node:"expansion",
    desc:"큰 정사각형에서 작은 정사각형을 떼고 남은 ㄱ자를 잘라 옮기면 (a+b)×(a−b) 직사각형이 됩니다.",
    render(root){
      const {ctx,w,h}=makeCanvas(root,700,360); const ctl=el("div",{class:"ctrl"}); const out=el("div",{class:"readout"}); root.append(ctl,out);
      let a=6,b=2,t=0;
      function draw(){ const col=C(); ctx.clearRect(0,0,w,h); const s=30; const x0=40,y0=320;
        // 왼쪽: a² 에서 b² 뗀 ㄱ자
        ctx.fillStyle="rgba(47,111,237,.25)"; ctx.fillRect(x0,y0-a*s,a*s,a*s); ctx.clearRect(x0+(a-b)*s,y0-a*s,b*s,b*s);
        ctx.strokeStyle=col.acc; ctx.lineWidth=2; ctx.strokeRect(x0,y0-a*s,a*s,a*s); ctx.strokeStyle=col.bad; ctx.setLineDash([4,3]); ctx.strokeRect(x0+(a-b)*s,y0-a*s,b*s,b*s); ctx.setLineDash([]);
        txt(ctx,`a = ${a}`,x0+a*s/2,y0+18,col.ink,13,"center"); txt(ctx,`b² 뗀 자리`,x0+(a-b)*s+b*s/2,y0-a*s-6,col.bad,11,"center");
        // 오른쪽: 옮긴 뒤 (a+b)×(a−b)
        const x1=400, y1=320; const H=(a-b)*s;
        ctx.fillStyle="rgba(47,111,237,.25)"; ctx.fillRect(x1,y1-H,a*s,H); // 아래 띠 a×(a−b)
        // 위쪽 조각 (a−b)×b 를 회전시켜 오른쪽에 b×(a−b) 로 붙이는 과정을 선형 보간
        const px=x1+t*a*s, py=(y1-H-b*s)+t*b*s, pw=(a-b)*s+t*(b*s-(a-b)*s), ph=b*s+t*(H-b*s);
        ctx.fillStyle="rgba(255,138,61,.45)"; ctx.fillRect(px,py,pw,ph); ctx.strokeStyle=col.acc2; ctx.strokeRect(px,py,pw,ph);
        ctx.strokeStyle=col.acc; ctx.strokeRect(x1,y1-H,a*s,H);
        txt(ctx,`a + b = ${a+b} (옮기면)`,x1+(a+b)*s/2,y1+18,col.ink,13,"center"); txt(ctx,`a − b = ${a-b}`,x1-8,y1-H/2,col.ink,13,"right");
        out.innerHTML=`a² − b² = <b>${a*a}</b> − <b>${b*b}</b> = <b>${a*a-b*b}</b> &nbsp; (a+b)(a−b) = <b>${a+b}</b> × <b>${a-b}</b> = <b>${(a+b)*(a-b)}</b> · 옮긴 정도 ${Math.round(t*100)}%`;
      }
      slider(ctl,"a",3,8,1,a,v=>{a=v;if(b>=a)b=a-1;draw();}); slider(ctl,"b",1,5,1,b,v=>{b=Math.min(v,a-1);draw();}); slider(ctl,"조각 옮기기",0,1,0.01,0,v=>{t=v;draw();}); draw();
    }};

  // ---------- 11. 평행선과 선분의 비 ----------
  W.parallel = { title:"DE ∥ BC 를 밀면 AD:AB = AE:AC = DE:BC", grade:"g22", node:"similar",
    desc:"점 D 를 AB 위에서 밀어 보세요. BC 와 평행한 DE 가 따라 움직이며 세 비가 항상 같게 유지됩니다 (AA 닮음).",
    render(root){
      const {ctx,w,h}=makeCanvas(root,700,380); const ctl=el("div",{class:"ctrl"}); const out=el("div",{class:"readout"}); root.append(ctl,out);
      let t=0.5; const A=[150,50], B=[60,330], Cc=[620,330];
      function draw(){ const col=C(); ctx.clearRect(0,0,w,h);
        const Dp=[A[0]+(B[0]-A[0])*t, A[1]+(B[1]-A[1])*t], E=[A[0]+(Cc[0]-A[0])*t, A[1]+(Cc[1]-A[1])*t];
        ctx.beginPath();ctx.moveTo(...A);ctx.lineTo(...B);ctx.lineTo(...Cc);ctx.closePath(); ctx.fillStyle="rgba(47,111,237,.08)"; ctx.fill(); ctx.strokeStyle=col.ink; ctx.lineWidth=2.5; ctx.stroke();
        ctx.beginPath();ctx.moveTo(...A);ctx.lineTo(...Dp);ctx.lineTo(...E);ctx.closePath(); ctx.fillStyle="rgba(255,138,61,.25)"; ctx.fill();
        ctx.strokeStyle=col.acc2; ctx.lineWidth=3; ctx.beginPath();ctx.moveTo(...Dp);ctx.lineTo(...E);ctx.stroke();
        [[A,"A"],[B,"B"],[Cc,"C"],[Dp,"D"],[E,"E"]].forEach(([q,n])=>{ctx.fillStyle=n==="D"||n==="E"?col.acc2:col.ink;ctx.beginPath();ctx.arc(q[0],q[1],5,0,7);ctx.fill();txt(ctx,n,q[0]+(n==="B"||n==="D"?-18:8),q[1]-8,col.ink,14);});
        const d=(p,q)=>Math.hypot(p[0]-q[0],p[1]-q[1]); const AD=d(A,Dp),AB=d(A,B),AE=d(A,E),AC=d(A,Cc),DE=d(Dp,E),BC=d(B,Cc);
        out.innerHTML=`AD : AB = <b>${(AD/AB).toFixed(3)}</b> &nbsp; AE : AC = <b>${(AE/AC).toFixed(3)}</b> &nbsp; DE : BC = <b>${(DE/BC).toFixed(3)}</b> &nbsp;→ 세 비가 같다<br>AD : DB = <b>${(AD/(AB-AD)).toFixed(2)}</b> : 1 &nbsp; AE : EC = <b>${(AE/(AC-AE)).toFixed(2)}</b> : 1`;
      }
      slider(ctl,"D 의 위치 (AD / AB)",0.1,0.9,0.01,t,v=>{t=v;draw();}); draw();
    }};

  // ---------- 12. 원과 접선 ----------
  W.tangent = { title:"원 밖의 점에서 그은 두 접선의 길이는 같다", grade:"g32", node:"circle",
    desc:"점 P 를 멀리·가까이 움직여 보세요. PA = PB 가 항상 성립하고, OA ⊥ PA 이므로 PA = √(OP² − r²) 입니다.",
    render(root){
      const {ctx,w,h}=makeCanvas(root,700,380); const ctl=el("div",{class:"ctrl"}); const out=el("div",{class:"readout"}); root.append(ctl,out);
      const O=[240,190], r=110; let dist=300, ang=0;
      function draw(){ const col=C(); ctx.clearRect(0,0,w,h); const th=ang*Math.PI/180; const P=[O[0]+dist*Math.cos(th),O[1]+dist*Math.sin(th)];
        const L=Math.sqrt(dist*dist-r*r); const al=Math.acos(r/dist); // 접점 각
        const A=[O[0]+r*Math.cos(th+al),O[1]+r*Math.sin(th+al)], B=[O[0]+r*Math.cos(th-al),O[1]+r*Math.sin(th-al)];
        ctx.strokeStyle=col.muted; ctx.lineWidth=2; ctx.beginPath();ctx.arc(O[0],O[1],r,0,7);ctx.stroke();
        ctx.strokeStyle=col.acc; ctx.lineWidth=2.5; ctx.beginPath();ctx.moveTo(...P);ctx.lineTo(...A);ctx.moveTo(...P);ctx.lineTo(...B);ctx.stroke();
        ctx.strokeStyle=col.acc2; ctx.lineWidth=1.5; ctx.setLineDash([5,4]); ctx.beginPath();ctx.moveTo(...O);ctx.lineTo(...A);ctx.moveTo(...O);ctx.lineTo(...B);ctx.moveTo(...O);ctx.lineTo(...P);ctx.stroke(); ctx.setLineDash([]);
        // 직각 표시
        const mark=(V,U1,U2)=>{ const n1=[(U1[0]-V[0])/Math.hypot(U1[0]-V[0],U1[1]-V[1]),(U1[1]-V[1])/Math.hypot(U1[0]-V[0],U1[1]-V[1])], n2=[(U2[0]-V[0])/Math.hypot(U2[0]-V[0],U2[1]-V[1]),(U2[1]-V[1])/Math.hypot(U2[0]-V[0],U2[1]-V[1])]; const k=10; ctx.strokeStyle=col.bad; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(V[0]+n1[0]*k,V[1]+n1[1]*k); ctx.lineTo(V[0]+(n1[0]+n2[0])*k,V[1]+(n1[1]+n2[1])*k); ctx.lineTo(V[0]+n2[0]*k,V[1]+n2[1]*k); ctx.stroke(); };
        mark(A,O,P); mark(B,O,P);
        [[O,"O"],[P,"P"],[A,"A"],[B,"B"]].forEach(([q,n])=>{ctx.fillStyle=col.ink;ctx.beginPath();ctx.arc(q[0],q[1],5,0,7);ctx.fill();txt(ctx,n,q[0]+8,q[1]-8,col.ink,14);});
        txt(ctx,`r = ${r}`,O[0]-8,O[1]-r/2,col.acc2,12,"right");
        out.innerHTML=`OP = <b>${dist.toFixed(0)}</b>, r = <b>${r}</b> → PA = PB = √(OP² − r²) = <b>${L.toFixed(1)}</b> &nbsp; (△OPA ≡ △OPB, RHS 합동) &nbsp; ∠APB = <b>${(2*(90-al*180/Math.PI)).toFixed(1)}°</b>`;
      }
      slider(ctl,"OP 의 길이",130,420,1,dist,v=>{dist=v;draw();}); slider(ctl,"P 의 방향 (도)",-60,60,1,ang,v=>{ang=v;draw();}); draw();
    }};

  // ---------- 13. 상자그림 ----------
  W.boxplot = { title:"자료를 바꾸면 상자그림이 어떻게 변하나", grade:"g32", node:"statistics",
    desc:"자료 10개 중 하나(가장 큰 값)를 밀어 보세요. 최댓값과 평균은 움직이지만 중앙값·사분위수는 잘 움직이지 않습니다 — 극단값에 강한 대푯값.",
    render(root){
      const {ctx,w,h}=makeCanvas(root,700,300); const ctl=el("div",{class:"ctrl"}); const out=el("div",{class:"readout"}); root.append(ctl,out);
      let base=[12,15,18,20,22,25,27,30,34], big=40;
      function med(a){ const n=a.length; return n%2?a[(n-1)/2]:(a[n/2-1]+a[n/2])/2; }
      function draw(){ const col=C(); ctx.clearRect(0,0,w,h); const data=[...base,big].sort((x,y)=>x-y); const n=data.length;
        const Q2=med(data), lo=data.slice(0,n/2), hi=data.slice(n/2), Q1=med(lo), Q3=med(hi); const min=data[0], max=data[n-1]; const mean=data.reduce((a,b)=>a+b,0)/n;
        const X=v=>60+(v-0)/100*(w-100); const y=130;
        ctx.strokeStyle=col.muted; ctx.beginPath();ctx.moveTo(60,230);ctx.lineTo(w-40,230);ctx.stroke(); for(let v=0;v<=100;v+=10){ ctx.beginPath();ctx.moveTo(X(v),226);ctx.lineTo(X(v),234);ctx.stroke(); txt(ctx,String(v),X(v),250,col.muted,11,"center"); }
        ctx.strokeStyle=col.ink; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(X(min),y);ctx.lineTo(X(Q1),y); ctx.moveTo(X(Q3),y);ctx.lineTo(X(max),y); ctx.moveTo(X(min),y-15);ctx.lineTo(X(min),y+15); ctx.moveTo(X(max),y-15);ctx.lineTo(X(max),y+15); ctx.stroke();
        ctx.fillStyle="rgba(47,111,237,.25)"; ctx.fillRect(X(Q1),y-30,X(Q3)-X(Q1),60); ctx.strokeStyle=col.acc; ctx.strokeRect(X(Q1),y-30,X(Q3)-X(Q1),60);
        ctx.strokeStyle=col.acc2; ctx.lineWidth=3; ctx.beginPath();ctx.moveTo(X(Q2),y-30);ctx.lineTo(X(Q2),y+30);ctx.stroke();
        ctx.fillStyle=col.ink; data.forEach(v=>{ctx.beginPath();ctx.arc(X(v),200,4,0,7);ctx.fill();});
        ctx.fillStyle=col.bad; ctx.beginPath();ctx.arc(X(mean),200,5,0,7);ctx.fill(); txt(ctx,"평균",X(mean),188,col.bad,11,"center");
        [["최솟값",min],["Q1",Q1],["중앙값",Q2],["Q3",Q3],["최댓값",max]].forEach(([n,v],i)=>txt(ctx,`${n} ${v}`,X(v),y-40-(i%2?14:0),col.ink,11,"center"));
        out.innerHTML=`자료: ${data.join(", ")}<br>Q1 = <b>${Q1}</b>, 중앙값 = <b>${Q2}</b>, Q3 = <b>${Q3}</b>, 사분위수 범위 = <b>${Q3-Q1}</b> · 범위 = <b>${max-min}</b> · 평균 = <b>${mean.toFixed(1)}</b>`;
      }
      slider(ctl,"가장 큰 자료의 값",35,100,1,big,v=>{big=v;draw();}); draw();
    }};

  // ---------- 14. 넓이 모형 (CRA: 구체→그림→추상) x(x+k)=N ----------
  W.areamodel = { title:"넓이 모형으로 이차방정식 풀기 x(x+k) = N", grade:"g31", node:"quadratic-eq",
    desc:"'연속하는 두 수의 곱' '가로가 세로보다 k 긴 직사각형' 문제는 전부 이 그림입니다. x 를 밀어 넓이가 N 이 되는 순간을 찾으세요 — 그다음에 식을 세우면 식이 그림으로 보입니다.",
    render(root){
      const {ctx,w,h}=makeCanvas(root,700,340); const ctl=el("div",{class:"ctrl"}); const out=el("div",{class:"readout"}); root.append(ctl,out);
      let x=5,k=3,N=40;
      function draw(){ const col=C(); ctx.clearRect(0,0,w,h); const s=18; const x0=60,y0=300; const A=x*(x+k);
        ctx.fillStyle=A===N?"rgba(31,157,85,.3)":"rgba(47,111,237,.18)"; ctx.fillRect(x0,y0-x*s,x*s,x*s); ctx.strokeStyle=col.acc; ctx.lineWidth=2; ctx.strokeRect(x0,y0-x*s,x*s,x*s);
        ctx.fillStyle="rgba(255,138,61,.35)"; ctx.fillRect(x0+x*s,y0-x*s,k*s,x*s); ctx.strokeStyle=col.acc2; ctx.strokeRect(x0+x*s,y0-x*s,k*s,x*s);
        txt(ctx,`x = ${x}`,x0+x*s/2,y0+18,col.ink,13,"center"); txt(ctx,`k = ${k}`,x0+x*s+k*s/2,y0+18,col.acc2,13,"center"); txt(ctx,`x`,x0-12,y0-x*s/2,col.ink,13,"right");
        txt(ctx,`x²`,x0+x*s/2,y0-x*s/2,col.acc,16,"center"); txt(ctx,`kx`,x0+x*s+k*s/2,y0-x*s/2,col.acc2,14,"center");
        txt(ctx,`넓이 x(x+k) = x² + kx = ${A}`,420,60,col.ink,15); txt(ctx,`목표 N = ${N}`,420,88,col.muted,13);
        txt(ctx,A===N?"✓ 넓이가 N 과 같다 → 이 x 가 해":A<N?"아직 작다 → x 를 키우세요":"너무 크다 → x 를 줄이세요",420,118,A===N?col.ok:col.bad,13);
        out.innerHTML=`식: x(x+${k}) = ${N} → x² + ${k}x − ${N} = 0 → (x + ${(k+Math.sqrt(k*k+4*N))/2|0})(x − ${((-k+Math.sqrt(k*k+4*N))/2)}) = 0 → <b>x = ${((-k+Math.sqrt(k*k+4*N))/2)}</b> (음수 근은 길이가 아니므로 버림)`;
      }
      slider(ctl,"x (세로)",1,12,1,x,v=>{x=v;draw();}); slider(ctl,"k (가로가 더 긴 만큼)",0,6,1,k,v=>{k=v;N=pick();draw();});
      function pick(){ const r=rnd(3,9); return r*(r+k); } function rnd(a,b){return a+Math.floor(Math.random()*(b-a+1));}
      const b=el("button",{class:"btn sm ghost"},"목표 N 바꾸기"); b.onclick=()=>{N=pick();draw();}; ctl.appendChild(b); draw();
    }};

  // ---------- 15. 두 주사위 격자 (확률의 '그림' 단계) ----------
  W.dicegrid = { title:"두 주사위 36칸 격자 — 조건을 고르면 칸이 켜진다", grade:"g22", node:"probability",
    desc:"확률 문제를 세기 전에 36칸 표로 봅니다. 조건을 바꿔 가며 '합이 7' 이 왜 가장 많은지, '곱이 홀수' 가 왜 1/4 인지 눈으로 확인하세요.",
    render(root){
      const {c,ctx,w,h}=makeCanvas(root,700,330); const ctl=el("div",{class:"pill-row"}); const out=el("div",{class:"readout"}); root.append(ctl,out);
      const conds=[["합 = 7",(a,b)=>a+b===7],["합 ≤ 4",(a,b)=>a+b<=4],["합이 소수",(a,b)=>[2,3,5,7,11].includes(a+b)],["곱이 홀수",(a,b)=>(a*b)%2===1],["두 눈이 같다",(a,b)=>a===b],["차가 2",(a,b)=>Math.abs(a-b)===2],["적어도 하나 6",(a,b)=>a===6||b===6]];
      let ci=0;
      function draw(){ const col=C(); ctx.clearRect(0,0,w,h); const f=conds[ci][1]; let n=0; const x0=90,y0=40,cw=44,ch=42;
        for(let a=1;a<=6;a++){ txt(ctx,`${a}`,x0-16,y0+(a-1)*ch+26,col.muted,13,"right"); txt(ctx,`${a}`,x0+(a-1)*cw+cw/2,y0-10,col.muted,13,"center");
          for(let b=1;b<=6;b++){ const hit=f(a,b); if(hit)n++; ctx.fillStyle=hit?"rgba(255,138,61,.6)":"rgba(47,111,237,.08)"; ctx.fillRect(x0+(b-1)*cw,y0+(a-1)*ch,cw-3,ch-3); txt(ctx,`(${a},${b})`,x0+(b-1)*cw+cw/2-1,y0+(a-1)*ch+26,hit?col.ink:col.muted,11,"center"); } }
        txt(ctx,"첫 번째 주사위 ↓ / 두 번째 주사위 →",x0,y0+6*ch+20,col.muted,12);
        txt(ctx,conds[ci][0],420,80,col.ink,18); txt(ctx,`${n} / 36`,420,120,col.acc2,28); txt(ctx,`= ${(n/36).toFixed(3)}`,420,150,col.muted,14);
        out.innerHTML=`확률 = (조건을 만족하는 칸 수) ÷ 36 = <b>${n}/36</b>${n%2===0&&n>0?` = ${n/2}/18`:""}${n%6===0&&n>0?` = ${n/6}/6`:""}`;
      }
      conds.forEach((cd,i)=>{ const b=el("button",{class:"pill"+(i===0?" on":"")},cd[0]); b.onclick=()=>{ci=i;ctl.querySelectorAll(".pill").forEach(p=>p.classList.remove("on"));b.classList.add("on");draw();}; ctl.appendChild(b); });
      draw();
    }};

  // ---------- 공통: 함수 그래프 보드 ----------
  function board(ctx,w,h,ox,oy,s,col,xl=null,yl=null){ axes(ctx,w,h,ox,oy,s,col); for(let k=-30;k<=30;k++){ if(k===0)continue; const px=ox+k*s, py=oy-k*s; if(px>0&&px<w) txt(ctx,String(k),px,oy+14,col.muted,10,"center"); if(py>0&&py<h) txt(ctx,String(k),ox-6,py+4,col.muted,10,"right"); } txt(ctx,xl||"x",w-10,oy-6,col.muted,12,"right"); txt(ctx,yl||"y",ox+8,14,col.muted,12); }
  function curve(ctx,w,ox,oy,s,f,color,width=3,dash=null,dom=null){ ctx.strokeStyle=color; ctx.lineWidth=width; ctx.setLineDash(dash||[]); ctx.beginPath(); let pen=false; for(let px=0;px<=w;px++){ const x=(px-ox)/s; if(dom&&(x<dom[0]||x>dom[1])){pen=false;continue;} const y=f(x); if(!isFinite(y)||Math.abs(y)>1e4){pen=false;continue;} const py=oy-y*s; if(!pen)ctx.moveTo(px,py); else ctx.lineTo(px,py); pen=true; } ctx.stroke(); ctx.setLineDash([]); }
  function dot(ctx,x,y,color,r=6){ ctx.fillStyle=color; ctx.beginPath(); ctx.arc(x,y,r,0,7); ctx.fill(); }

  // ---------- 16. 정비례·반비례 (중1) ----------
  W.proportion = { title:"y = ax 와 y = a/x: a 를 밀어 보기", grade:"m11", node:"proportion",
    desc:"a 를 밀면 정비례 직선의 기울기와 반비례 곡선의 모양이 바뀝니다. a 가 음수가 되는 순간 어느 사분면으로 가는지 보세요.",
    render(root){ const {ctx,w,h}=makeCanvas(root); const ctl=el("div",{class:"ctrl"}); const out=el("div",{class:"readout"}); root.append(ctl,out); let a=2, x0=2;
      function draw(){ const col=C(); ctx.clearRect(0,0,w,h); const ox=w/2,oy=h/2,s=32; board(ctx,w,h,ox,oy,s,col);
        curve(ctx,w,ox,oy,s,x=>a*x,col.acc); curve(ctx,w,ox,oy,s,x=>a/x,col.acc2,3,null,[-20,-0.05]); curve(ctx,w,ox,oy,s,x=>a/x,col.acc2,3,null,[0.05,20]);
        dot(ctx,ox+x0*s,oy-a*x0*s,col.acc); dot(ctx,ox+x0*s,oy-(a/x0)*s,col.acc2);
        txt(ctx,`y = ${cf(a)}`,12,22,col.acc,15); txt(ctx,`y = ${a}/x`,12,44,col.acc2,15);
        out.innerHTML=`x = <b>${x0}</b> 일 때 정비례 y = ${a}·${x0} = <b>${+(a*x0).toFixed(2)}</b>, 반비례 y = ${a}/${x0} = <b>${+(a/x0).toFixed(2)}</b><br>정비례: x 가 2배면 y 도 2배 · 반비례: x 가 2배면 y 는 절반 (xy = ${a} 로 일정)`; }
      slider(ctl,"a",-4,4,0.5,a,v=>{a=v===0?0.5:v;draw();}); slider(ctl,"x 의 값",0.5,5,0.5,x0,v=>{x0=v;draw();}); draw(); }};

  // ---------- 17. 일차함수 (중2-1) ----------
  W.linear = { title:"y = ax + b: 기울기와 절편을 따로 밀기", grade:"m21", node:"linear-func",
    desc:"a 는 기울기(1 칸 갈 때 오르는 높이), b 는 y절편(출발 높이). 둘째 직선과 평행해지는 순간 교점이 사라지는 것을 보세요.",
    render(root){ const {ctx,w,h}=makeCanvas(root); const ctl=el("div",{class:"ctrl"}); const out=el("div",{class:"readout"}); root.append(ctl,out); let a=1,b=2, a2=-0.5,b2=4;
      function draw(){ const col=C(); ctx.clearRect(0,0,w,h); const ox=w/2,oy=h/2,s=32; board(ctx,w,h,ox,oy,s,col);
        curve(ctx,w,ox,oy,s,x=>a2*x+b2,col.muted,2,[6,4]); curve(ctx,w,ox,oy,s,x=>a*x+b,col.acc);
        // 기울기 계단
        ctx.strokeStyle=col.acc2; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(ox+1*s,oy-(a+b)*s); ctx.lineTo(ox+2*s,oy-(a+b)*s); ctx.lineTo(ox+2*s,oy-(2*a+b)*s); ctx.stroke();
        txt(ctx,"1",ox+1.5*s,oy-(a+b)*s+(a>=0?14:-6),col.acc2,11,"center"); txt(ctx,String(+a.toFixed(2)),ox+2*s+6,oy-(1.5*a+b)*s+4,col.acc2,11);
        dot(ctx,ox,oy-b*s,col.ok); txt(ctx,`(0, ${b})`,ox+8,oy-b*s-8,col.ok,11); if(a!==0){ dot(ctx,ox-b/a*s,oy,col.ok); txt(ctx,`(${+(-b/a).toFixed(2)}, 0)`,ox-b/a*s+8,oy+18,col.ok,11); }
        let cross="평행 — 만나지 않음 (연립방정식 해 없음)"; if(a!==a2){ const x=(b2-b)/(a-a2), y=a*x+b; dot(ctx,ox+x*s,oy-y*s,col.bad,7); cross=`교점 (<b>${+x.toFixed(2)}</b>, <b>${+y.toFixed(2)}</b>) = 연립방정식의 해`; } else if(b===b2) cross="일치 — 해가 무수히 많음";
        txt(ctx,`y = ${cf(a)} ${b>=0?"+":"−"} ${Math.abs(b)}`,12,22,col.acc,15); txt(ctx,`y = ${cf(a2)} ${b2>=0?"+":"−"} ${Math.abs(b2)} (비교용)`,12,44,col.muted,13);
        out.innerHTML=`기울기 a = <b>${a}</b> (${a>0?"증가":a<0?"감소":"상수"}) · y절편 <b>${b}</b> · x절편 <b>${a?+(-b/a).toFixed(2):"없음"}</b><br>${cross}`; }
      slider(ctl,"a (기울기)",-3,3,0.25,a,v=>{a=v;draw();}); slider(ctl,"b (y절편)",-5,5,0.5,b,v=>{b=v;draw();}); slider(ctl,"비교 직선의 기울기",-3,3,0.25,a2,v=>{a2=v;draw();}); draw(); }};

  // ---------- 18. 원과 직선 (고1) ----------
  W.circleline = { title:"원과 직선: 중심까지의 거리 d 와 반지름 r", grade:"h12", node:"h-coord",
    desc:"직선을 밀어 d 가 r 보다 작을 때(두 점), 같을 때(접함), 클 때(안 만남)를 눈으로 확인합니다. 판별식 없이 거리 하나로.",
    render(root){ const {ctx,w,h}=makeCanvas(root); const ctl=el("div",{class:"ctrl"}); const out=el("div",{class:"readout"}); root.append(ctl,out); let m=1,k=1,r=3; const cx=1,cy=0;
      function draw(){ const col=C(); ctx.clearRect(0,0,w,h); const ox=w/2,oy=h/2,s=34; board(ctx,w,h,ox,oy,s,col);
        ctx.strokeStyle=col.acc; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(ox+cx*s,oy-cy*s,r*s,0,7); ctx.stroke(); dot(ctx,ox+cx*s,oy-cy*s,col.acc,5);
        curve(ctx,w,ox,oy,s,x=>m*x+k,col.acc2);
        const d=Math.abs(m*cx-cy+k)/Math.hypot(m,1); const hx=(cx+m*(cy-k))/(1+m*m), hy=m*hx+k;
        ctx.strokeStyle=col.ok; ctx.lineWidth=2; ctx.setLineDash([5,4]); ctx.beginPath(); ctx.moveTo(ox+cx*s,oy-cy*s); ctx.lineTo(ox+hx*s,oy-hy*s); ctx.stroke(); ctx.setLineDash([]);
        const A=1+m*m, B=2*(m*(k-cy)-cx), Cc=cx*cx+(k-cy)*(k-cy)-r*r, D=B*B-4*A*Cc; let rel;
        if(D>1e-9){ const x1=(-B-Math.sqrt(D))/(2*A), x2=(-B+Math.sqrt(D))/(2*A); [x1,x2].forEach(x=>dot(ctx,ox+x*s,oy-(m*x+k)*s,col.bad)); rel="두 점에서 만남 (d < r)"; } else if(Math.abs(D)<=1e-9||Math.abs(d-r)<0.02){ dot(ctx,ox+hx*s,oy-hy*s,col.bad); rel="접함 (d = r)"; } else rel="만나지 않음 (d > r)";
        txt(ctx,`(x−${cx})² + y² = ${r}²`,12,22,col.acc,14); txt(ctx,`y = ${cf(m)} ${k>=0?"+":"−"} ${Math.abs(k)}`,12,44,col.acc2,14);
        out.innerHTML=`중심 (${cx}, ${cy}) 에서 직선까지 거리 d = |${m}·${cx} − 0 + ${k}| / √(${m}²+1) = <b>${d.toFixed(2)}</b>, r = <b>${r}</b> → <b>${rel}</b><br>판별식으로 풀면 D = ${D.toFixed(2)} (부호가 같은 판정)`; }
      slider(ctl,"직선의 기울기 m",-3,3,0.25,m,v=>{m=v;draw();}); slider(ctl,"직선의 y절편 k",-6,6,0.25,k,v=>{k=v;draw();}); slider(ctl,"반지름 r",1,5,0.5,r,v=>{r=v;draw();}); draw(); }};

  // ---------- 19. 지수함수·로그함수 (고2) ----------
  W.explog = { title:"y = a^x 와 y = log_a x: 밑 a 를 밀면 둘이 함께 뒤집힌다", grade:"h2a", node:"h-explog",
    desc:"밑 a 가 1 보다 클 때와 작을 때 증가·감소가 바뀌고, 두 그래프는 항상 y = x 에 대칭입니다. (0,1) 과 (1,0) 은 a 와 상관없이 지납니다.",
    render(root){ const {ctx,w,h}=makeCanvas(root); const ctl=el("div",{class:"ctrl"}); const out=el("div",{class:"readout"}); root.append(ctl,out); let a=2, x0=3;
      function draw(){ const col=C(); ctx.clearRect(0,0,w,h); const ox=w/2,oy=h/2,s=34; board(ctx,w,h,ox,oy,s,col);
        curve(ctx,w,ox,oy,s,x=>x,col.line,1.5,[4,4]); curve(ctx,w,ox,oy,s,x=>Math.pow(a,x),col.acc); curve(ctx,w,ox,oy,s,x=>Math.log(x)/Math.log(a),col.acc2,3,null,[0.001,30]);
        dot(ctx,ox,oy-s,col.acc); dot(ctx,ox+s,oy,col.acc2); const y0=Math.pow(a,x0); if(Math.abs(y0)<30){ dot(ctx,ox+x0*s,oy-y0*s,col.ok); dot(ctx,ox+y0*s,oy-x0*s,col.ok); }
        txt(ctx,`y = ${a}^{x}`,12,22,col.acc,15); txt(ctx,`y = log_{${a}} x`,12,44,col.acc2,15);
        out.innerHTML=`a = <b>${a}</b>: ${a>1?"둘 다 증가":"둘 다 감소"} · 점근선: 지수함수 y=0, 로그함수 x=0<br>${a}<sup>${x0}</sup> = <b>${+y0.toFixed(3)}</b> ⇔ log<sub>${a}</sub>(${+y0.toFixed(3)}) = <b>${x0}</b> — 같은 사실을 x, y 만 바꿔 읽은 것`; }
      slider(ctl,"밑 a (1 제외)",0.25,4,0.25,a,v=>{a=v===1?1.25:v;draw();}); slider(ctl,"x 의 값",-3,3,0.5,x0,v=>{x0=v;draw();}); draw(); }};

  // ---------- 20. 할선 → 접선 (고2 미분) ----------
  W.secant = { title:"h 를 0 으로 밀면 할선이 접선이 된다", grade:"h2c", node:"h-calc",
    desc:"평균변화율 {f(a+h)−f(a)}/h 의 h 를 줄여 보세요. 할선의 기울기가 f′(a) = 2a 로 다가갑니다 (f(x) = x²).",
    render(root){ const {ctx,w,h}=makeCanvas(root); const ctl=el("div",{class:"ctrl"}); const out=el("div",{class:"readout"}); root.append(ctl,out); let a=1, hh=2; const f=x=>x*x/2;
      function draw(){ const col=C(); ctx.clearRect(0,0,w,h); const ox=w/2-80,oy=h-60,s=34; board(ctx,w,h,ox,oy,s,col);
        curve(ctx,w,ox,oy,s,f,col.acc); const m=(f(a+hh)-f(a))/hh, t=a;
        curve(ctx,w,ox,oy,s,x=>f(a)+t*(x-a),col.ok,2,[6,4]); curve(ctx,w,ox,oy,s,x=>f(a)+m*(x-a),col.acc2,2.5);
        dot(ctx,ox+a*s,oy-f(a)*s,col.acc2); dot(ctx,ox+(a+hh)*s,oy-f(a+hh)*s,col.acc2); txt(ctx,`(a, f(a))`,ox+a*s+8,oy-f(a)*s+16,col.acc2,11); txt(ctx,`(a+h, f(a+h))`,ox+(a+hh)*s+8,oy-f(a+hh)*s-8,col.acc2,11);
        txt(ctx,"f(x) = x²/2",12,22,col.acc,15); txt(ctx,`할선 기울기 ${m.toFixed(3)}`,12,44,col.acc2,13); txt(ctx,`접선 기울기 f′(a) = a = ${a}`,12,64,col.ok,13);
        out.innerHTML=`평균변화율 = {f(${a}+${hh}) − f(${a})}/${hh} = <b>${m.toFixed(3)}</b> → h → 0 이면 <b>${a}</b> = f′(${a})<br>식으로: {(a+h)²−a²}/(2h) = a + h/2 → h 가 0 으로 가면 a`; }
      slider(ctl,"a (접점)",-2,4,0.5,a,v=>{a=v;draw();}); slider(ctl,"h (간격)",0.05,3,0.05,hh,v=>{hh=v;draw();}); draw(); }};

  // ---------- 21. 정규분포 (고2 확통) ----------
  W.normal = { title:"정규분포 N(m, σ²): 평균과 표준편차를 밀기", grade:"h2p", node:"h-prob",
    desc:"m 은 종의 위치, σ 는 폭. 어떤 m, σ 라도 m±σ 안은 68%, m±2σ 안은 95% — 표준화 Z = (X−m)/σ 가 가능한 이유입니다.",
    render(root){ const {ctx,w,h}=makeCanvas(root); const ctl=el("div",{class:"ctrl"}); const out=el("div",{class:"readout"}); root.append(ctl,out); let m=0, sd=1, kk=1;
      function draw(){ const col=C(); ctx.clearRect(0,0,w,h); const ox=w/2,oy=h-50,s=50; axes(ctx,w,h,ox,oy,s,col); for(let k=-6;k<=6;k++) txt(ctx,String(k),ox+k*s,oy+14,col.muted,10,"center");
        const f=x=>Math.exp(-(x-m)*(x-m)/(2*sd*sd))/(sd*Math.sqrt(2*Math.PI))*250;
        ctx.fillStyle="rgba(255,138,61,.35)"; ctx.beginPath(); ctx.moveTo(ox+(m-kk*sd)*s,oy); for(let x=m-kk*sd;x<=m+kk*sd;x+=0.02) ctx.lineTo(ox+x*s,oy-f(x)); ctx.lineTo(ox+(m+kk*sd)*s,oy); ctx.closePath(); ctx.fill();
        curve(ctx,w,ox,oy,s,x=>f(x)/s,col.acc); ctx.strokeStyle=col.acc2; ctx.setLineDash([4,4]); ctx.beginPath(); ctx.moveTo(ox+m*s,oy); ctx.lineTo(ox+m*s,oy-f(m)); ctx.stroke(); ctx.setLineDash([]);
        const P={1:68.27,2:95.45,3:99.73}[kk]||0; const P196=95;
        txt(ctx,`N(${m}, ${sd}²)`,12,22,col.acc,15); txt(ctx,`m ± ${kk}σ 안: ${P}%`,12,44,col.acc2,13);
        out.innerHTML=`평균 m = <b>${m}</b>, 표준편차 σ = <b>${sd}</b> → 구간 [${+(m-kk*sd).toFixed(2)}, ${+(m+kk*sd).toFixed(2)}] 의 확률 <b>${P}%</b><br>m, σ 를 아무리 바꿔도 비율은 그대로 — 그래서 표준정규분포표 한 장이면 충분`; }
      slider(ctl,"평균 m",-3,3,0.5,m,v=>{m=v;draw();}); slider(ctl,"표준편차 σ",0.5,2,0.25,sd,v=>{sd=v;draw();}); slider(ctl,"k (m ± kσ)",1,3,1,kk,v=>{kk=v;draw();}); draw(); }};

  // ---------- 22. 벡터의 내적 (고3 기하) ----------
  W.dotprod = { title:"두 벡터의 각을 돌리면 내적이 어떻게 변하나", grade:"h3g", node:"h-geo",
    desc:"b 의 각도를 밀어 보세요. 내적 = |a||b|cosθ = a₁b₁+a₂b₂ 두 계산이 항상 같고, 90° 에서 0 이 됩니다. 정사영(초록)이 내적의 정체.",
    render(root){ const {ctx,w,h}=makeCanvas(root); const ctl=el("div",{class:"ctrl"}); const out=el("div",{class:"readout"}); root.append(ctl,out); let th=40, lb=3; const a=[4,1];
      function arrow(x1,y1,x2,y2,color){ ctx.strokeStyle=color; ctx.fillStyle=color; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke(); const an=Math.atan2(y2-y1,x2-x1); ctx.beginPath(); ctx.moveTo(x2,y2); ctx.lineTo(x2-12*Math.cos(an-0.4),y2-12*Math.sin(an-0.4)); ctx.lineTo(x2-12*Math.cos(an+0.4),y2-12*Math.sin(an+0.4)); ctx.closePath(); ctx.fill(); }
      function draw(){ const col=C(); ctx.clearRect(0,0,w,h); const ox=w/2-60,oy=h/2+40,s=34; board(ctx,w,h,ox,oy,s,col);
        const t=th*Math.PI/180; const b=[lb*Math.cos(t+Math.atan2(a[1],a[0])),lb*Math.sin(t+Math.atan2(a[1],a[0]))];
        const la=Math.hypot(...a), dotv=a[0]*b[0]+a[1]*b[1]; const proj=dotv/la; const pu=[a[0]/la*proj,a[1]/la*proj];
        ctx.strokeStyle=col.ok; ctx.lineWidth=2; ctx.setLineDash([4,4]); ctx.beginPath(); ctx.moveTo(ox+b[0]*s,oy-b[1]*s); ctx.lineTo(ox+pu[0]*s,oy-pu[1]*s); ctx.stroke(); ctx.setLineDash([]);
        ctx.strokeStyle=col.ok; ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(ox,oy); ctx.lineTo(ox+pu[0]*s,oy-pu[1]*s); ctx.stroke();
        arrow(ox,oy,ox+a[0]*s,oy-a[1]*s,col.acc); arrow(ox,oy,ox+b[0]*s,oy-b[1]*s,col.acc2);
        txt(ctx,`a = (${a[0]}, ${a[1]})`,ox+a[0]*s+8,oy-a[1]*s,col.acc,12); txt(ctx,`b = (${b[0].toFixed(2)}, ${b[1].toFixed(2)})`,ox+b[0]*s+8,oy-b[1]*s-6,col.acc2,12);
        txt(ctx,`θ = ${th}°`,12,22,col.ink,15); txt(ctx,`a·b = ${dotv.toFixed(2)}`,12,44,col.ok,14);
        out.innerHTML=`|a||b|cosθ = ${la.toFixed(2)} × ${lb} × cos${th}° = <b>${(la*lb*Math.cos(t)).toFixed(2)}</b><br>a₁b₁ + a₂b₂ = ${a[0]}·${b[0].toFixed(2)} + ${a[1]}·${b[1].toFixed(2)} = <b>${dotv.toFixed(2)}</b> ${Math.abs(dotv)<0.05?"→ <b>수직!</b>":dotv<0?"(둔각 → 음수)":""}<br>초록 막대 = b 의 a 방향 정사영 길이 ${proj.toFixed(2)} — 내적 = |a| × 정사영`; }
      slider(ctl,"θ (a 에서 b 까지의 각)",0,180,5,th,v=>{th=v;draw();}); slider(ctl,"|b|",1,5,0.5,lb,v=>{lb=v;draw();}); draw(); }};
})();
