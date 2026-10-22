// 소단원별 도해. key = lesson id, value = { fig, p(파라미터), cap(설명) }. js/figures.js 의 FIG[fig](p) 로 그립니다.
window.DATA = window.DATA || {};
(function(){
const ACC="var(--acc)", ACC2="var(--acc2)", G31="var(--g31)", OK="var(--ok)";
window.DATA.lessonFigs = {
 /* ---- 중1-1 ---- */
 "prime-factor": { fig:"bars", p:{data:[1,2,4,8],labels:["2⁰","2¹","2²","2³"],mean:false,title:"2³·3² 의 약수: 2 를 0~3개(4가지) × 3 을 0~2개(3가지) = 12개"}, cap:"약수의 개수 = (지수+1) 의 곱" },
 "gcd-lcm": { fig:"venn", p:{labels:["12 = 2²·3","18 = 2·3²"],shade:"inter"}, cap:"공통 소인수(교집합) → GCD, 전부(합집합) → LCM" },
 "integers": { fig:"numberline", p:{min:-6,max:6,marks:[{v:-4,label:"|−4| = 4"},{v:3,label:"|3| = 3"},{from:-4,to:3,c:"rgba(47,111,237,.4)"}]}, cap:"절댓값은 0 까지의 거리, 두 수의 거리 = 큰 수 − 작은 수 = 7" },
 "int-ops": { fig:"numberline", p:{min:-8,max:8,marks:[{v:-5,label:"(−5)",c:ACC},{v:3,label:"+3 → −2",c:ACC2},{from:-5,to:-2,c:"rgba(255,138,61,.5)"}]}, cap:"(−5)+3: −5 에서 오른쪽으로 3 칸" },
 "expressions": { fig:"areaModel", p:{a:"a",b:"b",mode:"square"}, cap:"분배법칙은 직사각형 넓이 나누기 — 곱셈 공식(중3)의 뿌리" },
 "linear-eq": { fig:"plot", p:{fns:[{f:x=>3*x-6,c:ACC,label:"y=3x−6"}],xr:[-2,5],yr:[-8,6],pts:[[2,0,"해 x=2"]],title:"3x−6=0 의 해 = 직선이 x축과 만나는 곳"}, cap:"방정식의 해를 그래프로 보면 x절편" },
 "linear-eq-apply": { fig:"plot", p:{fns:[{f:x=>4*x,c:ACC,label:"4km/h",lx:1.5},{f:x=>6*x,c:ACC2,label:"6km/h",lx:1.1}],xr:[0,2],yr:[0,9],lines:[{x1:0,y1:6,x2:1.5,y2:6,c:OK,label:"거리 6km"}],pts:[[1.5,6,"1.5시간"],[1,6,"1시간",ACC2]],title:"같은 거리, 다른 속력 → 시간 차"}, cap:"거리 = 속력 × 시간 을 그래프로" },
 "coord-graph": { fig:"plot", p:{fns:[{f:x=>2*x,c:ACC,label:"y=2x (정비례)",lx:2},{f:x=>6/x,c:ACC2,dom:[0.5,5],label:"y=6/x (반비례)",lx:4},{f:x=>6/x,c:ACC2,dom:[-5,-0.5]}],xr:[-5,5],yr:[-6,6],pts:[[1,2,"(1,2)"],[2,3,"(2,3)",ACC2]],title:"정비례: 원점 직선 / 반비례: 두 곡선"}, cap:"정비례와 반비례 그래프" },
 /* ---- 중1-2 ---- */
 "angles": { fig:"triangle", p:{A:[40,170],B:[300,170],Cc:[200,50],labels:["A","B","C"],marks:[{type:"angle",at:0,label:"a",dx:22,dy:-6},{type:"angle",at:1,label:"b",dx:-30,dy:-6},{type:"angle",at:2,label:"c",dx:14,dy:30}],extra:'<line x1="120" y1="50" x2="300" y2="50" stroke="var(--acc2)" stroke-width="2" stroke-dasharray="6 4"/><text x="40" y="18" font-size="11" fill="var(--acc2)">C 를 지나는 AB 의 평행선 → 엇각 a, b 가 C 옆에 모여 a+b+c = 180°</text><text x="150" y="46" font-size="11" fill="var(--acc2)">a</text><text x="246" y="46" font-size="11" fill="var(--acc2)">b</text>'}, cap:"삼각형 내각의 합이 180° 인 이유" },
 "construction-congruence": { fig:"triangle", p:{A:[40,170],B:[180,170],Cc:[110,60],labels:["A","B","C"],sides:["c","a","b"],marks:[{type:"angle",at:0,label:"∠A",dx:20,dy:-14}],extra:'<polygon points="200,170 320,170 260,60" fill="rgba(255,138,61,.2)" stroke="var(--ink)" stroke-width="2"/><text x="200" y="40" font-size="11" fill="var(--muted)">SAS: 두 변 + 끼인각이 같으면 포개진다</text>'}, cap:"합동 조건 SSS · SAS · ASA" },
 "polygon": { fig:"plot", p:{fns:[],xr:[-3,3],yr:[-3,3],grid:false,pts:[[0,0,"O"]],lines:[{x1:0,y1:0,x2:2.6,y2:0,d:""},{x1:0,y1:0,x2:1.3,y2:2.25,d:""},{x1:0,y1:0,x2:-1.3,y2:2.25,d:""},{x1:0,y1:0,x2:-2.6,y2:0,d:""},{x1:0,y1:0,x2:-1.3,y2:-2.25,d:""},{x1:0,y1:0,x2:1.3,y2:-2.25,d:""},{x1:2.6,y1:0,x2:1.3,y2:2.25,c:ACC,d:""},{x1:1.3,y1:2.25,x2:-1.3,y2:2.25,c:ACC,d:""},{x1:-1.3,y1:2.25,x2:-2.6,y2:0,c:ACC,d:""},{x1:-2.6,y1:0,x2:-1.3,y2:-2.25,c:ACC,d:""},{x1:-1.3,y1:-2.25,x2:1.3,y2:-2.25,c:ACC,d:""},{x1:1.3,y1:-2.25,x2:2.6,y2:0,c:ACC,d:""}],title:"정육각형 = 삼각형 6개 → 내각 합 = 6·180 − 360 = 720°"}, cap:"다각형을 삼각형으로 쪼개 각의 합 구하기" },
 "circle-sector": { fig:"coneNet", p:{}, cap:"부채꼴의 호·넓이는 중심각의 비율 (원뿔 전개도에서 그대로 쓰임)" },
 "solids": { fig:"coneNet", p:{}, cap:"원뿔 겉넓이 = 밑면 πr² + 옆면(부채꼴) πrl" },
 "freq": { fig:"histogram", p:{freq:[2,5,9,7,3],start:40,width:10}, cap:"히스토그램과 도수분포다각형 — 넓이의 합이 같다" },
 /* ---- 중2-1 ---- */
 "repeating": { fig:"numberline", p:{min:0,max:1,marks:[{v:0.333,label:"0.3̇ = 1/3",c:ACC},{v:0.4545,label:"0.4̇5̇ = 5/11",c:ACC2},{v:0.25,label:"0.25 유한",c:OK}]}, cap:"순환소수도 수직선 위의 정확한 한 점(유리수)" },
 "exponent": { fig:"bars", p:{data:[2,4,8,16,32],labels:["2¹","2²","2³","2⁴","2⁵"],mean:false,title:"2³ × 2² = 2⁵: 지수는 '개수' 라 더해진다"}, cap:"지수법칙은 개수 세기" },
 "polynomial-calc": { fig:"areaModel", p:{a:"2x",b:"3",mode:"square"}, cap:"(2x+3)² 의 넓이 모형 — 다항식 곱셈은 분배법칙" },
 "inequality": { fig:"numberline", p:{min:-6,max:6,marks:[{v:-2,open:true,c:ACC},{from:-6,to:-2,c:"rgba(47,111,237,.5)",label:"x < −2"},{v:3,c:ACC2},{from:3,to:6,c:"rgba(255,138,61,.5)",label:"x ≥ 3"}]}, cap:"빈 점은 포함 안 함(<), 찬 점은 포함(≤)" },
 "system": { fig:"plot", p:{fns:[{f:x=>(12-2*x)/3,c:ACC,label:"2x+3y=12"},{f:x=>(3*x-5)/2,c:ACC2,label:"3x−2y=5",lx:4.2}],xr:[-1,6],yr:[-2,6],pts:[[3,2,"해 (3, 2)"]],title:"연립방정식의 해 = 두 직선의 교점"}, cap:"두 식을 동시에 만족하는 점" },
 "linear-func": { fig:"plot", p:{fns:[{f:x=>-2*x+7,c:ACC,label:"y=−2x+7"}],xr:[-1,5],yr:[-2,9],pts:[[0,7,"y절편 7"],[3.5,0,"x절편 7/2",ACC2],[1,5,"(1,5)",OK],[3,1,"",OK]],lines:[{x1:1,y1:5,x2:3,y2:5,c:G31,label:"x +2"},{x1:3,y1:5,x2:3,y2:1,c:G31,label:"y −4 → 기울기 −4/2 = −2"}],title:"기울기 = y 증가량 / x 증가량"}, cap:"기울기·절편 읽기" },
 "linear-func-apply": { fig:"plot", p:{fns:[{f:x=>2*x+1,c:ACC,label:"y=2x+1"},{f:x=>2*x-3,c:ACC2,label:"y=2x−3",lx:3.5},{f:x=>-x+4,c:OK,label:"x+y=4",lx:0.3}],xr:[-2,5],yr:[-4,6],pts:[[1,3,"교점 (1,3)"]],title:"평행(기울기 같음) → 해 없음, 교차 → 해 하나"}, cap:"연립방정식의 해의 개수와 직선의 위치 관계" },
 /* ---- 중2-2 ---- */
 "isosceles": { fig:"triangle", p:{A:[40,170],B:[300,170],Cc:[170,40],labels:["B","C","A"],sides:[null,null,null],marks:[{type:"seg",from:[170,40],to:[170,170],c:ACC2,label:""},{type:"angle",at:0,label:"∠B",dx:22,dy:-8},{type:"angle",at:1,label:"∠C",dx:-36,dy:-8}],extra:'<path d="M170,158 L182,158 L182,170" fill="none" stroke="var(--bad)" stroke-width="1.5"/><text x="166" y="186" font-size="12" font-weight="700">D</text><text x="178" y="100" font-size="11" fill="var(--acc2)">꼭지각 이등분선</text><text x="100" y="150" font-size="10" fill="var(--muted)">AB = AC</text>'}, cap:"이등분선 하나로 △ABD ≡ △ACD (SAS)" },
 "rha-rhs": { fig:"triangle", p:{A:[40,170],B:[200,170],Cc:[40,60],labels:["A","B","C"],sides:["밑변","빗변 H",""],marks:[{type:"right",at:0},{type:"angle",at:1,label:"예각 A",dx:-50,dy:-10}],extra:'<text x="215" y="80" font-size="11" fill="var(--muted)">RHA: 빗변 + 예각</text><text x="215" y="100" font-size="11" fill="var(--muted)">RHS: 빗변 + 한 변</text><text x="215" y="130" font-size="11" fill="var(--acc)">직각은 이미 같으니 두 조건이면 충분</text>'}, cap:"직각삼각형의 합동 조건" },
 "circumcenter": { fig:"towns", p:{mode:"circum"}, cap:"세 변의 수직이등분선의 교점 = 외심, 세 꼭짓점까지 거리 R" },
 "incenter": { fig:"towns", p:{mode:"in"}, cap:"세 각의 이등분선의 교점 = 내심, 세 변까지 거리 r" },
 "parallelogram": { fig:"linkage", p:{}, cap:"대각선이 서로 이등분 → 평행사변형 (빨래 건조대의 원리)" },
 "special-quads": { fig:"plot", p:{fns:[],xr:[0,10],yr:[0,6],grid:false,lines:[{x1:1,y1:1,x2:4,y2:1,d:""},{x1:4,y1:1,x2:5,y2:4,d:""},{x1:5,y1:4,x2:2,y2:4,d:""},{x1:2,y1:4,x2:1,y2:1,d:""},{x1:1,y1:1,x2:5,y2:4,c:ACC},{x1:4,y1:1,x2:2,y2:4,c:ACC},{x1:6,y1:1,x2:9,y2:1,d:""},{x1:9,y1:1,x2:9,y2:4,d:""},{x1:9,y1:4,x2:6,y2:4,d:""},{x1:6,y1:4,x2:6,y2:1,d:""},{x1:6,y1:1,x2:9,y2:4,c:OK},{x1:9,y1:1,x2:6,y2:4,c:OK}],pts:[[3,5.3,"평행사변형: 대각선 서로 이등분"],[7.5,5.3,"직사각형: + 길이 같음",OK]],title:""}, cap:"조건을 더하면 대각선 성질이 켜진다" },
 "similar": { fig:"shadow", p:{}, cap:"같은 각 → 닮은 삼각형 → 변의 비가 같다" },
 "parallel-ratio": { fig:"triangle", p:{A:[170,30],B:[40,180],Cc:[300,180],labels:["A","B","C"],marks:[{type:"seg",from:[105,105],to:[235,105],c:ACC2,label:"DE ∥ BC"}],extra:'<text x="60" y="100" font-size="12" fill="var(--acc2)">D</text><text x="240" y="100" font-size="12" fill="var(--acc2)">E</text><text x="40" y="20" font-size="11" fill="var(--muted)">AD:AB = AE:AC = DE:BC (AA 닮음)</text>'}, cap:"평행선이 만드는 닮음" },
 "midsegment-centroid": { fig:"triangle", p:{A:[40,180],B:[300,180],Cc:[150,30],labels:["A","B","C"],marks:[{type:"seg",from:[95,105],to:[225,105],c:ACC2,label:"MN = ½BC"},{type:"seg",from:[150,30],to:[170,180],c:G31,d:"4 3"},{type:"seg",from:[40,180],to:[225,105],c:G31,d:"4 3"},{type:"seg",from:[300,180],to:[95,105],c:G31,d:"4 3"}],extra:'<circle cx="163" cy="130" r="5" fill="var(--acc)"/><text x="172" y="128" font-size="12" fill="var(--acc)" font-weight="700">G (2:1)</text>'}, cap:"중점연결정리와 무게중심" },
 "similar-apply": { fig:"scaling", p:{}, cap:"길이 k배 → 넓이 k², 부피 k³" },
 "pythagoras": { fig:"rightTri", p:{a:"a",b:"b",c:"c  (a²+b²=c²)"}, cap:"직각의 대변이 빗변" },
 "pythagoras-apply": { fig:"rightTri", p:{a:"a",b:"a",c:"√2 a (정사각형 대각선)"}, cap:"어디서든 직각삼각형 하나 찾기" },
 "counting": { fig:"rps", p:{}, cap:"곱의 법칙: 3×3×3 = 27" },
 "probability": { fig:"grid36", p:{label:"합 = 7"}, cap:"36칸 중 조건을 만족하는 칸 수" },
 "prob-calc": { fig:"tree", p:{p:0.4,label:"비"}, cap:"'그리고' 는 가지를 따라 곱, '또는' 은 가지끼리 합" },
 /* ---- 중3-1 ---- */
 "sqrt-basic": { fig:"plot", p:{fns:[{f:x=>x*x,c:ACC,label:"y=x²"}],xr:[-4,4],yr:[-1,10],pts:[[3,9,"(3,9)"],[-3,9,"(−3,9)",ACC2]],lines:[{x1:-4,y1:9,x2:4,y2:9,c:OK,label:"y=9"}],title:"9 의 제곱근 = x²=9 의 해 = ±3"}, cap:"제곱근은 제곱의 역" },
 "real-numbers": { fig:"numberline", p:{min:-1,max:4,marks:[{v:1.414,label:"√2",c:ACC},{v:1.732,label:"√3",c:ACC},{v:3.1416,label:"π",c:ACC2},{v:0.5,label:"1/2",c:OK},{v:2.236,label:"√5",c:ACC}]}, cap:"무리수도 수직선 위의 한 점 — 실수가 수직선을 빈틈없이 채운다" },
 "radical-calc": { fig:"areaModel", p:{a:"√2",b:"√3",mode:"square"}, cap:"(√2+√3)² = 2 + 2√6 + 3 ≠ 5 — 합은 근호 안으로 안 들어간다" },
 "expansion": { fig:"areaModel", p:{a:"a",b:"b",mode:"square"}, cap:"넓이 네 조각 — 가운데 ab 가 둘" },
 "factoring": { fig:"areaModel", p:{a:"a",b:"b",mode:"diff"}, cap:"합차 공식: ㄱ자를 펴면 직사각형" },
 "quadratic-eq": { fig:"plot", p:{fns:[{f:x=>x*x-x-6,c:ACC,label:"y=x²−x−6"}],xr:[-4,5],yr:[-8,6],pts:[[3,0,"x=3"],[-2,0,"x=−2"],[0.5,-6.25,"꼭짓점",OK]],title:"이차방정식의 해 = x 절편"}, cap:"근은 그래프가 x축을 지나는 곳" },
 "quadratic-apply": { fig:"frame", p:{w:30,h:20}, cap:"넓이 조건 → 이차방정식, 음수 근은 버린다" },
 "quad-func-basic": { fig:"plot", p:{fns:[{f:x=>x*x,c:"var(--muted)",d:"4 3",label:"y=x²",lx:-2.6},{f:x=>(x-2)*(x-2)-3,c:ACC,label:"y=(x−2)²−3"}],xr:[-4,6],yr:[-4,8],pts:[[0,0,"(0,0)","var(--muted)"],[2,-3,"꼭짓점 (2,−3)"]],lines:[{x1:0,y1:0,x2:2,y2:-3,c:ACC2,label:"→2, ↓3"}],title:"평행이동: x→x−2, y→y−3"}, cap:"포물선 한 장을 밀어 보기" },
 "quad-func-general": { fig:"plot", p:{fns:[{f:x=>x*x-4*x+3,c:ACC,label:"y=x²−4x+3"}],xr:[-2,6],yr:[-3,6],pts:[[1,0,"x절편 1"],[3,0,"x절편 3"],[0,3,"y절편 3",OK],[2,-1,"꼭짓점 (2,−1)",G31]],lines:[{x1:2,y1:-3,x2:2,y2:6,c:G31,label:"축 x=2"}],title:"완전제곱식 y=(x−2)²−1"}, cap:"a·b·c 와 꼭짓점·절편" },
 /* ---- 중3-2 ---- */
 "trig-ratio": { fig:"rightTri", p:{a:"밑변 (cos)",b:"높이 (sin)",c:"빗변 1",ang:"A",angLabel:"A"}, cap:"sin = 높이/빗변, cos = 밑변/빗변, tan = 높이/밑변" },
 "special-angles": { fig:"rightTri", p:{a:"√3",b:"1",c:"2",ang:"30°",angLabel:"30°"}, cap:"정삼각형의 절반 1 : 2 : √3 → 30°·60°" },
 "trig-apply": { fig:"building", p:{d:"100 m",ang:"30°",h:"h = 100·tan30°",eye:"눈높이"}, cap:"높이 = 거리 × tanθ" },
 "chord-tangent": { fig:"circleFig", p:{mode:"chord"}, cap:"반지름·거리·현의 절반이 직각삼각형" },
 "inscribed-angle": { fig:"circleFig", p:{mode:"inscribed"}, cap:"원주각은 중심각의 절반" },
 "cyclic-quad": { fig:"circleFig", p:{mode:"cyclic"}, cap:"내접사각형의 대각의 합 180°" },
 "central": { fig:"salary", p:{}, cap:"극단값에 평균은 끌려가고 중앙값은 버틴다" },
 "dispersion": { fig:"twoClasses", p:{}, cap:"평균이 같아도 흩어짐이 다르다" },
 "boxplot-scatter": { fig:"boxplot", p:{}, cap:"최솟값–Q1–중앙값–Q3–최댓값" },
 /* ---- 고1 공통수학1 ---- */
 "poly-ops": { fig:"areaModel", p:{mode:"cube"}, cap:"(a+b)³ 의 계수 1,3,3,1 은 정육면체 조각 수" },
 "remainder": { fig:"plot", p:{fns:[{f:x=>x*x*x-2*x*x-4*x+3,c:ACC,label:"f(x)"}],xr:[-3,4],yr:[-8,8],pts:[[3,0,"f(3)=0 → (x−3) 이 인수"],[1,-2,"f(1)=−2 = x−1 로 나눈 나머지",ACC2]],title:"나머지정리: f(α) 가 곧 나머지"}, cap:"대입 한 번으로 나머지" },
 "complex": { fig:"plot", p:{fns:[],xr:[-3,4],yr:[-3,4],pts:[[3,1,"3+i"],[3,-1,"3−i (켤레)",ACC2],[0,1,"i",OK],[-1,0,"i²=−1",G31],[0,-1,"i³=−i",OK],[1,0,"i⁴=1",G31]],title:"복소평면: i 를 곱하면 90° 회전 (주기 4)",eq:true}, cap:"실수부 x, 허수부 y — 켤레는 x축 대칭" },
 "vieta": { fig:"plot", p:{fns:[{f:x=>x*x-5*x+3,c:ACC,label:"x²−5x+3"}],xr:[-1,6],yr:[-4,6],pts:[[0.697,0,"α"],[4.303,0,"β"],[2.5,-3.25,"축 x=(α+β)/2=5/2",OK]],title:"α+β = 5 (= −b/a), αβ = 3 (= c/a)"}, cap:"근을 구하지 않고 근에 대한 식의 값을" },
 "h-quadfunc": { fig:"plot", p:{fns:[{f:x=>-(x*x)+4*x-3,c:ACC,label:"y=−x²+4x−3"}],xr:[-1,5],yr:[-5,2],shade:{f:x=>-(x*x)+4*x-3,a:1,b:3,c:"rgba(31,157,85,.3)"},pts:[[1,0,"1"],[3,0,"3"]],title:"−x²+4x−3 ≥ 0 의 해 = 그래프가 x축 위인 구간 1≤x≤3"}, cap:"부등식은 그래프 읽기" },
 "various-eq": { fig:"plot", p:{fns:[{f:x=>x*x*x*x-5*x*x+4,c:ACC,label:"x⁴−5x²+4"}],xr:[-3,3],yr:[-3,6],pts:[[1,0,"1"],[-1,0,"−1"],[2,0,"2"],[-2,0,"−2"]],title:"치환 t=x²: (t−1)(t−4)=0 → 실근 4개"}, cap:"고차방정식 = 인수분해·치환" },
 "perm-comb": { fig:"rps", p:{}, cap:"순서 있음(P) vs 없음(C) — C 는 P 를 r! 로 나눈다" },
 "matrix": { fig:"matrixFig", p:{}, cap:"행 × 열" },
 /* ---- 고1 공통수학2 ---- */
 "point-line": { fig:"pointLine", p:{}, cap:"점과 직선 사이의 거리 = 수선의 길이" },
 "circle-eq": { fig:"plot", p:{fns:[{f:x=>Math.sqrt(Math.max(0,9-(x-2)*(x-2)))-1,c:ACC,dom:[-1,5]},{f:x=>-Math.sqrt(Math.max(0,9-(x-2)*(x-2)))-1,c:ACC,dom:[-1,5],label:"(x−2)²+(y+1)²=9",lx:4.6}],xr:[-3,7],yr:[-5,3],pts:[[2,-1,"중심 (2,−1)"],[5,-1,"r=3",ACC2]],lines:[{x1:2,y1:-1,x2:5,y2:-1,c:ACC2,d:""}],title:"x²+y²−4x+2y−4=0 → 완전제곱식",eq:true}, cap:"원의 방정식 = 중심에서 거리 r" },
 "transform": { fig:"plot", p:{fns:[{f:x=>x*x,c:"var(--muted)",d:"4 3",label:"y=x²",lx:-2.5},{f:x=>(x-3)*(x-3)+1,c:ACC,label:"y=(x−3)²+1"},{f:x=>-x*x,c:ACC2,d:"4 3",label:"x축 대칭 y=−x²",lx:2}],xr:[-4,6],yr:[-5,8],title:"평행이동 x→x−3, y→y−1 / 대칭이동 y→−y"}, cap:"식에서 부호가 반대로 보이는 이유" },
 "sets": { fig:"venn", p:{labels:["A","B"],shade:"union"}, cap:"n(A∪B) = n(A)+n(B)−n(A∩B)" },
 "logic": { fig:"plot", p:{fns:[{f:x=>x+9/x,c:ACC,dom:[0.6,8],label:"y=x+9/x"}],xr:[0,8],yr:[0,16],pts:[[3,6,"최솟값 6 (x=3)"]],lines:[{x1:0,y1:6,x2:8,y2:6,c:ACC2,label:"y=6"}],title:"산술·기하평균: x+9/x ≥ 2√9 = 6"}, cap:"등호는 x = 9/x 일 때" },
 "functions": { fig:"plot", p:{fns:[{f:x=>3*x-2,c:ACC,label:"f(x)=3x−2"},{f:x=>(x+2)/3,c:ACC2,label:"f⁻¹(x)=(x+2)/3",lx:4},{f:x=>x,c:"var(--muted)",d:"4 3",label:"y=x",lx:2.3}],xr:[-3,6],yr:[-3,6],pts:[[1,1,"교점은 y=x 위"]],title:"역함수의 그래프는 y=x 대칭"}, cap:"x 와 y 를 바꾸면 역함수" },
 "rational-radical": { fig:"plot", p:{fns:[{f:x=>3+5/(x-2),c:ACC,dom:[-3,1.85],label:"y=(3x−1)/(x−2)",lx:-2.5},{f:x=>3+5/(x-2),c:ACC,dom:[2.15,8]},{f:x=>Math.sqrt(2*x-4)+1,c:ACC2,dom:[2,8],label:"y=√(2x−4)+1",lx:6}],xr:[-3,8],yr:[-4,10],lines:[{x1:2,y1:-4,x2:2,y2:10,c:"var(--muted)",label:"x=2"},{x1:-3,y1:3,x2:8,y2:3,c:"var(--muted)",label:"y=3"}],title:"유리함수: 점근선 / 무리함수: 시작점 (2,1)"}, cap:"반비례·제곱근 그래프를 옮긴 것" },
 /* ---- 고2 대수 ---- */
 "exp-log": { fig:"plot", p:{fns:[{f:x=>Math.pow(2,x),c:ACC,label:"y=2ˣ"},{f:x=>Math.log2(x),c:ACC2,dom:[0.1,8],label:"y=log₂x",lx:6},{f:x=>x,c:"var(--muted)",d:"4 3"}],xr:[-3,8],yr:[-3,8],pts:[[0,1,"(0,1)"],[1,0,"(1,0)",ACC2],[3,8,"2³=8"],[8,3,"log₂8=3",ACC2]],title:"지수와 로그는 서로 역"}, cap:"aˣ=b ⇔ x=logₐb" },
 "exp-log-func": { fig:"plot", p:{fns:[{f:x=>Math.pow(2,x),c:ACC,label:"y=2ˣ (증가)"},{f:x=>Math.pow(0.5,x),c:ACC2,label:"y=(½)ˣ (감소)",lx:-2.5}],xr:[-4,4],yr:[-1,9],pts:[[0,1,"(0,1) 공통"]],title:"밑이 1 보다 크면 증가, 작으면 감소 → 부등호 방향"}, cap:"밑에 따라 부등호 방향이 바뀐다" },
 "trig-func": { fig:"unitCircle", p:{deg:150}, cap:"단위원 위의 점의 좌표가 cos, sin" },
 "sine-cosine-law": { fig:"triangle", p:{A:[40,170],B:[300,170],Cc:[220,50],labels:["A","B","C"],sides:["c","a","b"],marks:[{type:"angle",at:0,label:"A",dx:22,dy:-8}],extra:'<text x="40" y="20" font-size="11" fill="var(--acc)">a² = b² + c² − 2bc·cosA</text><text x="40" y="36" font-size="11" fill="var(--acc2)">a/sinA = b/sinB = c/sinC = 2R</text>'}, cap:"코사인법칙은 피타고라스의 일반형" },
 "sequences": { fig:"seqFig", p:{type:"geom",a:3,d:2,n:6}, cap:"등비수열: 매번 같은 수를 곱한다" },
 "sigma-induction": { fig:"bars", p:{data:[1,3,5,7,9],labels:["1","3","5","7","9"],mean:false,title:"1+3+5+7+9 = 25 = 5²: 홀수의 합은 제곱수 (귀납법으로 증명)"}, cap:"Σ 는 규칙적인 합" },
 /* ---- 고2 미적분Ⅰ ---- */
 "limits": { fig:"plot", p:{fns:[{f:x=>(x*x-9)/(x-3),c:ACC,dom:[-1,2.98],label:"(x²−9)/(x−3)",lx:1},{f:x=>(x*x-9)/(x-3),c:ACC,dom:[3.02,6]}],xr:[-1,6],yr:[0,10],pts:[[3,6,"x→3 일 때 6 (구멍)",ACC2]],title:"정의되지 않아도 극한값은 있다"}, cap:"약분하면 x+3 → 6" },
 "derivative": { fig:"tangentFig", p:{}, cap:"할선의 극한이 접선 — 순간변화율" },
 "derivative-apply": { fig:"plot", p:{fns:[{f:x=>x*x*x-3*x*x+1,c:ACC,label:"f(x)=x³−3x²+1"},{f:x=>3*x*x-6*x,c:ACC2,d:"4 3",label:"f'(x)",lx:3.2}],xr:[-2,4],yr:[-5,5],pts:[[0,1,"극대 (f'=0, +→−)"],[2,-3,"극소 (−→+)",OK]],title:"f' 의 부호가 바뀌는 곳이 극값"}, cap:"증가·감소표 한 장" },
 "integral": { fig:"riemannFig", p:{n:8}, cap:"막대의 합 → 넓이 (정적분)" },
 /* ---- 고2 확률과 통계 ---- */
 "adv-counting": { fig:"bars", p:{data:[1,5,10,10,5,1],labels:["₅C₀","₅C₁","₅C₂","₅C₃","₅C₄","₅C₅"],mean:false,title:"(a+b)⁵ 의 계수 = 파스칼의 삼각형 5행, 합 2⁵=32"}, cap:"이항계수는 조합" },
 "cond-prob": { fig:"tree", p:{p:0.3,label:"양성"}, cap:"조건부확률: 표본공간을 줄인다" },
 "distributions": { fig:"normalFig", p:{}, cap:"표준정규분포와 68–95 규칙" },
 "estimation": { fig:"normalFig", p:{}, cap:"표본평균 분포 N(m, σ²/n) — 신뢰구간 ±1.96σ/√n" },
 /* ---- 고3 미적분Ⅱ ---- */
 "series": { fig:"bars", p:{data:[1,0.5,0.25,0.125,0.0625,0.03125],labels:["1","½","¼","⅛","1/16","1/32"],mean:false,title:"등비급수 1+½+¼+… = 2 (막대를 쌓으면 2 에 수렴)"}, cap:"무한히 더해도 유한" },
 "adv-derivative": { fig:"plot", p:{fns:[{f:x=>Math.exp(x),c:ACC,label:"y=eˣ"},{f:x=>Math.sin(x),c:ACC2,label:"sin x",lx:1.5},{f:x=>Math.cos(x),c:G31,d:"4 3",label:"cos x = (sin x)'",lx:-2.8}],xr:[-3,3],yr:[-2,8],pts:[[0,1,"eˣ: 접선 기울기 = 1 = 함숫값"]],title:"(eˣ)'=eˣ, (sin x)'=cos x"}, cap:"미분해도 자기 자신인 eˣ" },
 "adv-integral": { fig:"plot", p:{fns:[{f:x=>Math.sqrt(Math.max(0,x)),c:ACC,dom:[0,4],label:"y=√x"}],xr:[0,4.5],yr:[-0.5,2.5],shade:{f:x=>Math.sqrt(Math.max(0,x)),a:0,b:4,c:"rgba(255,138,61,.3)"},title:"x축 둘레 회전체 부피 = π∫₀⁴ x dx = 8π"}, cap:"얇은 원판 πr²dx 를 쌓는다" },
 /* ---- 고3 기하 ---- */
 "conics": { fig:"conic", p:{type:"ellipse"}, cap:"타원: 두 초점까지 거리의 합이 일정" },
 "vectors": { fig:"vectors", p:{a:[3,1],b:[1,2],op:"dot"}, cap:"내적 = |a||b|cosθ = a₁b₁+a₂b₂" },
 "space": { fig:"rightTri", p:{a:"밑면 대각선 √(a²+b²)",b:"높이 c",c:"√(a²+b²+c²)"}, cap:"공간 거리 = 피타고라스 두 번" }
};
})();
