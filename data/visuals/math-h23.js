// 수학 고2(대수·미적분Ⅰ·확률과 통계)·고3(미적분Ⅱ·기하) 시각 자료 — 차시 데이터 data/curriculum-h23.js 의 사실만 사용. 렌더러 js/visual.js, 스키마 docs/VISUAL-SCHEMA.md
window.DATA = window.DATA || {}; (window.DATA.visualsAdd = window.DATA.visualsAdd || []).push({

 /* ===== 고2 대수 ===== */
 "exp-log": [
  {type:"table", title:"지수와 로그 요약", head:["항목","공식","조건·주의"], rows:[
   ["거듭제곱근","$(\\sqrt[n]a)^n=a$","$a^{\\frac mn}=\\sqrt[n]{a^m}$"],
   ["지수의 확장","$a^0=1$, $a^{-n}=\\frac1{a^n}$","밑이 양수일 때"],
   ["로그의 정의","$a^x=b\\iff x=\\log_ab$","a>0, a≠1, b>0"],
   ["밑변환","$\\log_ab=\\frac{\\log_cb}{\\log_ca}$","밑을 통일할 때"],
   ["상용로그","$\\log x=\\log_{10}x$","정수 부분 → 자릿수"],
   ["금지","$\\log(x+y)=\\log x+\\log y$","(×) 곱만 합으로"]
  ], note:"진수 조건 x>0 을 먼저 쓰고 방정식을 푼다."},
  {type:"formula", title:"로그의 성질", tex:"\\log_a xy=\\log_ax+\\log_ay,\\quad \\log_a\\frac xy=\\log_ax-\\log_ay,\\quad \\log_ax^n=n\\log_ax", where:["a>0, a≠1","x>0, y>0","밑변환 $\\log_ab=\\frac{\\log_cb}{\\log_ca}$"]},
  {type:"flow", title:"로그방정식 푸는 순서", steps:[{t:"진수 조건",d:"x−1>0, x+1>0"},{t:"로그 합치기",d:"log₂(x−1)(x+1)=3",hi:true},{t:"지수로 바꾸기",d:"x²−1=2³"},{t:"해 구하기",d:"x=±3"},{t:"조건 확인",d:"x=3 만 채택",hi:true}]}
 ],
 "exp-log-func": [
  {type:"table", title:"지수함수 · 로그함수 그래프 비교", head:["구분","$y=a^x$","$y=\\log_ax$"], rows:[
   ["지나는 점","(0, 1)","(1, 0)"],
   ["점근선","y=0 (x축)","x=0 (y축)"],
   ["a>1","증가","증가"],
   ["0<a<1","감소","감소"],
   ["두 그래프 관계","y=x 대칭 (역함수)","y=x 대칭 (역함수)"],
   ["부등식 주의","0<a<1 → 부등호 반대","진수 조건 x>0"]
  ]},
  {type:"chart", kind:"line", title:"$y=2^x$ 과 $y=(\\frac12)^x$ — 둘 다 (0, 1) 을 지난다", x:["−2","−1","0","1","2"], series:[{name:"y=2^x",data:[0.25,0.5,1,2,4]},{name:"y=(1/2)^x",data:[4,2,1,0.5,0.25]}], xlabel:"x", ylabel:"y", ymin:0, note:"밑 a>1 이면 증가, 0<a<1 이면 감소. 두 그래프는 y축 대칭."},
  {type:"flow", title:"지수방정식 치환 풀이 ($4^x-3\\cdot2^x-4=0$)", steps:[{t:"2ˣ=t 치환",d:"단, t>0",hi:true},{t:"이차방정식",d:"t²−3t−4=0"},{t:"인수분해",d:"(t−4)(t+1)=0"},{t:"t=4 채택",d:"t=−1 은 버림",hi:true},{t:"x 구하기",d:"2ˣ=4 → x=2"}]}
 ],
 "trig-func": [
  {type:"table", title:"삼각함수 요약", head:["항목","공식","주의"], rows:[
   ["호도법","$180°=\\pi$","도·라디안 혼용 금지"],
   ["부채꼴","$l=r\\theta$, $S=\\frac12r^2\\theta$","θ 는 라디안"],
   ["정의(단위원)","$\\sin\\theta=y$, $\\cos\\theta=x$","$\\tan\\theta=\\frac yx$"],
   ["주기·진폭","$y=a\\sin(bx+c)+d$","주기 $\\frac{2\\pi}{|b|}$, 진폭 |a|"],
   ["tan 의 주기","$\\pi$","sin·cos 는 2π"],
   ["각의 변환","$\\sin(\\pi-\\theta)=\\sin\\theta$","$\\cos(\\pi-\\theta)=-\\cos\\theta$"]
  ], note:"$\\sin(\\frac\\pi2-\\theta)=\\cos\\theta$. 사분면 부호: all → sin → tan → cos."},
  {type:"svg", title:"단위원 위의 점으로 정의한 삼각함수", svg:"<svg viewBox='0 0 300 250' role='img' aria-label='단위원'><line x1='30' y1='130' x2='270' y2='130' stroke='var(--line)' stroke-width='1.5'/><line x1='150' y1='20' x2='150' y2='240' stroke='var(--line)' stroke-width='1.5'/><circle cx='150' cy='130' r='90' fill='none' stroke='var(--ink)' stroke-width='1.8'/><line x1='150' y1='130' x2='219' y2='72' stroke='var(--acc)' stroke-width='2'/><line x1='219' y1='72' x2='219' y2='130' stroke='var(--acc)' stroke-width='1.5' stroke-dasharray='4 3'/><line x1='150' y1='130' x2='219' y2='130' stroke='var(--acc)' stroke-width='3'/><path d='M174 130 A24 24 0 0 0 168 115' fill='none' stroke='var(--ink)' stroke-width='1.2'/><circle cx='219' cy='72' r='4' fill='var(--acc)'/><text x='226' y='66' font-size='13' fill='var(--ink)' font-weight='700'>(x, y)</text><text x='177' y='124' font-size='13' fill='var(--ink)'>θ</text><text x='224' y='106' font-size='12' fill='var(--acc)'>sin θ = y</text><text x='160' y='146' font-size='12' fill='var(--acc)'>cos θ = x</text><text x='238' y='140' font-size='12' fill='var(--ink)'>1</text><text x='60' y='50' font-size='12' fill='var(--ink)'>sin +</text><text x='216' y='40' font-size='12' fill='var(--ink)'>all +</text><text x='60' y='222' font-size='12' fill='var(--ink)'>tan +</text><text x='216' y='222' font-size='12' fill='var(--ink)'>cos +</text></svg>", note:"반지름 1 인 원 위 점의 좌표가 (cos θ, sin θ). 각이 90° 를 넘어도 정의된다."},
  {type:"chart", kind:"line", title:"$y=\\sin x$, $y=\\cos x$ 의 값 (주기 2π, 진폭 1)", x:["0","π/4","π/2","3π/4","π","5π/4","3π/2","7π/4","2π"], series:[{name:"sin x",data:[0,0.71,1,0.71,0,-0.71,-1,-0.71,0]},{name:"cos x",data:[1,0.71,0,-0.71,-1,-0.71,0,0.71,1]}], xlabel:"x", ylabel:"y", ymin:-1, ymax:1, note:"$y=3\\sin2x$ 는 진폭 3, 주기 $\\frac{2\\pi}2=\\pi$."}
 ],
 "sine-cosine-law": [
  {type:"table", title:"사인법칙 · 코사인법칙 요약", head:["항목","공식","언제·주의"], rows:[
   ["사인법칙","$\\frac a{\\sin A}=2R$","한 변과 두 각"],
   ["코사인법칙","$a^2=b^2+c^2-2bc\\cos A$","두 변과 끼인각"],
   ["각 구하기","$\\cos A=\\frac{b^2+c^2-a^2}{2bc}$","세 변 → 각"],
   ["넓이","$S=\\frac12bc\\sin A$","A 는 끼인각"],
   ["넓이(다른 꼴)","$S=\\frac{abc}{4R}=rs$","s 는 둘레의 절반"],
   ["모양 판별","$a^2>b^2+c^2$","→ A 가 둔각"]
  ], note:"부호는 **−**2bc cos A. 사인법칙으로 각을 구하면 둔각 해도 확인."},
  {type:"formula", title:"코사인법칙 — 피타고라스 정리의 일반형", tex:"a^2=b^2+c^2-2bc\\cos A\\quad\\Longrightarrow\\quad \\cos A=\\frac{b^2+c^2-a^2}{2bc}", where:["A=90° 이면 cos A=0 → 피타고라스","R 외접원 반지름","r 내접원 반지름"]},
  {type:"compare", title:"어느 법칙을 쓸까", items:[{name:"사인법칙",points:["한 변과 두 각이 주어짐","외접원 반지름 R 구할 때","sin A 로 A 구하면 **둔각 해** 확인"]},{name:"코사인법칙",points:["두 변과 끼인각이 주어짐","세 변 → 각의 코사인","부호 **−2bc cos A**"]}]}
 ],
 "sequences": [
  {type:"table", title:"등차수열 · 등비수열 비교", head:["구분","등차수열","등비수열"], rows:[
   ["일반항","$a_n=a+(n-1)d$","$a_n=ar^{n-1}$"],
   ["합 $S_n$","$\\frac{n\\{2a+(n-1)d\\}}2$","$\\frac{a(r^n-1)}{r-1}$ (r≠1)"],
   ["중항","$2b=a+c$","$b^2=ac$"],
   ["주의","$a_1=S_1$ 따로 확인","r=1 이면 $S_n=na$"],
   ["$S_n$ → $a_n$","$a_n=S_n-S_{n-1}$ (n≥2)","n=1 에는 적용 금지"]
  ], note:"원리합계(매년 a 원, 연이율 r 복리)는 등비수열의 합."},
  {type:"formula", title:"등차·등비수열의 합", tex:"S_n=\\frac{n(a+l)}2=\\frac{n\\{2a+(n-1)d\\}}2,\\qquad S_n=\\frac{a(r^n-1)}{r-1}\\ (r\\ne1)", where:["l 끝항","d 공차","r 공비","$S-rS$ 로 가운데가 지워지는 망원 합"]},
  {type:"chart", kind:"line", title:"등차수열 2, 5, 8, … 과 등비수열 3, 6, 12, …", x:["1","2","3","4","5"], series:[{name:"등차(d=3)",data:[2,5,8,11,14]},{name:"등비(r=2)",data:[3,6,12,24,48]}], xlabel:"n", ylabel:"aₙ", ymin:0, note:"등차는 일정하게 더해 직선처럼, 등비는 일정하게 곱해 급히 커진다."}
 ],
 "sigma-induction": [
  {type:"table", title:"Σ 공식 요약", head:["합","공식","주의"], rows:[
   ["$\\sum_{k=1}^n k$","$\\frac{n(n+1)}2$",""],
   ["$\\sum k^2$","$\\frac{n(n+1)(2n+1)}6$","$(\\sum k)^2$ 과 다름"],
   ["$\\sum k^3$","$\\{\\frac{n(n+1)}2\\}^2$",""],
   ["$\\sum c$","$cn$","상수는 n 번 더함"],
   ["선형성","$\\sum(a_k+b_k)=\\sum a_k+\\sum b_k$","$\\sum ca_k=c\\sum a_k$"],
   ["부분분수","$\\frac1{k(k+1)}=\\frac1k-\\frac1{k+1}$","망원 합"]
  ]},
  {type:"flow", title:"수학적 귀납법 — 도미노 증명", steps:[{t:"n=1 성립",d:"첫 도미노"},{t:"n=k 가정",d:"k 번째 넘어짐"},{t:"가정을 이용",d:"반드시 사용",hi:true},{t:"n=k+1 증명",d:"다음도 넘어짐"},{t:"모든 자연수",d:"전부 넘어짐",hi:true}]},
  {type:"formula", title:"부분분수로 망원 합", tex:"\\sum_{k=1}^{n}\\frac1{k(k+1)}=\\sum_{k=1}^{n}\\left(\\frac1k-\\frac1{k+1}\\right)=1-\\frac1{n+1}", where:["n=10 이면 $1-\\frac1{11}=\\frac{10}{11}$","가운데 항이 서로 지워진다"]}
 ],

 /* ===== 고2 미적분Ⅰ ===== */
 "limits": [
  {type:"table", title:"극한과 연속 요약", head:["상황","처리·조건","주의"], rows:[
   ["극한 존재","좌극한 = 우극한",""],
   ["$\\frac00$ 꼴","인수분해·유리화로 약분","'0'·'없음' 이라 답하지 않기"],
   ["$\\frac\\infty\\infty$ 꼴","최고차항으로 나눔","최고차항 계수의 비"],
   ["연속","$f(a)$, $\\lim$ 존재, 둘이 같다","연속일 때만 대입"],
   ["사잇값 정리","$f(a)f(b)<0$ → $f(c)=0$","$[a,b]$ 에서 연속"]
  ]},
  {type:"flow", title:"x=a 에서 연속인지 판정하기", steps:[{t:"f(a) 존재?",d:"함숫값"},{t:"극한 존재?",d:"좌극한 = 우극한"},{t:"둘이 같은가?",d:"lim f(x) = f(a)",hi:true},{t:"연속",d:"하나라도 아니면 불연속"}]},
  {type:"formula", title:"사잇값 정리", tex:"f \\text{ 가 } [a,b] \\text{ 에서 연속},\\ f(a)f(b)<0 \\ \\Longrightarrow\\ f(c)=0 \\text{ 인 } c\\in(a,b) \\text{ 가 적어도 하나}", where:["방정식 $f(x)=0$ 의 실근 존재 구간 판단에 사용"]}
 ],
 "derivative": [
  {type:"table", title:"미분계수와 도함수 요약", head:["항목","공식","주의"], rows:[
   ["미분계수","$f'(a)=\\lim_{h\\to0}\\frac{f(a+h)-f(a)}h$","접선의 기울기"],
   ["거듭제곱","$(x^n)'=nx^{n-1}$","$(x^2)'=2x$"],
   ["상수·합","$(c)'=0$, $(f\\pm g)'=f'\\pm g'$",""],
   ["곱","$(fg)'=f'g+fg'$",""],
   ["접선","$y-f(a)=f'(a)(x-a)$","$f(a)$ 빠뜨리지 않기"],
   ["미분가능→연속","역은 거짓","$|x|$ 는 x=0 미분 불가"]
  ], note:"$\\lim_{h\\to0}\\frac{f(2+2h)-f(2)}h=2f'(2)$ — 분모를 2h 로 맞춘다."},
  {type:"formula", title:"미분 공식", tex:"(x^n)'=nx^{n-1},\\quad (c)'=0,\\quad (f\\pm g)'=f'\\pm g',\\quad (fg)'=f'g+fg'", where:["순간변화율 = 접선의 기울기","$f'(a)$ 는 속도계의 숫자"]},
  {type:"flow", title:"접선의 방정식 구하기 ($f(x)=x^3-3x$, x=2)", steps:[{t:"f′(x) 구하기",d:"3x²−3"},{t:"기울기 f′(2)",d:"=9"},{t:"접점 (2, f(2))",d:"f(2)=2",hi:true},{t:"식 세우기",d:"y−2=9(x−2)"},{t:"정리",d:"y=9x−16"}]}
 ],
 "derivative-apply": [
  {type:"table", title:"도함수의 활용 요약", head:["상황","판정","주의"], rows:[
   ["증가·감소","$f'>0$ 증가, $f'<0$ 감소",""],
   ["극대","$f'(a)=0$, 부호 + → −","부호 안 바뀌면 극값 아님"],
   ["극소","$f'(a)=0$, 부호 − → +","$x^3$ 은 x=0 극값 아님"],
   ["최대·최소","극값과 양 끝 값 비교","닫힌구간"],
   ["실근 개수","$y=f(x)$ 와 $y=k$ 교점 수","극값 사이에 k"],
   ["속도·가속도","$v=\\frac{dx}{dt}$, $a=\\frac{dv}{dt}$","위치를 한 번·두 번 미분"]
  ], note:"평균값 정리: $\\frac{f(b)-f(a)}{b-a}=f'(c)$ 인 c 가 (a, b) 에 존재."},
  {type:"flow", title:"극값 판정 절차", steps:[{t:"f′(x) 구하기"},{t:"f′(x)=0 풀기",d:"후보 x"},{t:"증감표 작성",d:"f′ 의 부호",hi:true},{t:"부호 변화 확인",d:"+→− 극대, −→+ 극소"},{t:"극값 계산",d:"f(x) 값"}]},
  {type:"table", title:"증감표 예 — $f(x)=x^3-3x^2+1$, $f'=3x(x-2)$", head:["x","…","0","…","2","…"], rows:[
   ["$f'(x)$","+","0","−","0","+"],
   ["$f(x)$","↗","1 (극대)","↘","−3 (극소)","↗"]
  ], note:"극댓값 1, 극솟값 −3. 방정식 $f(x)=k$ 가 세 실근을 가지려면 −3<k<1."}
 ],
 "integral": [
  {type:"table", title:"정적분과 넓이 요약", head:["항목","공식","주의"], rows:[
   ["부정적분","$\\int x^ndx=\\frac{x^{n+1}}{n+1}+C$","미분의 역"],
   ["정적분","$\\int_a^bf(x)dx=F(b)-F(a)$","미적분의 기본정리"],
   ["넓이","$\\int_a^b|f(x)|dx$","x축 아래는 음수 → 절댓값"],
   ["두 곡선 사이","$\\int_a^b\\{f(x)-g(x)\\}dx$","위 − 아래, 교점으로 나눔"],
   ["속도·거리","위치 변화 $\\int v\\,dt$","이동 거리 $\\int|v|dt$"],
   ["적분으로 정의","$\\frac d{dx}\\int_a^xf(t)dt=f(x)$",""]
  ], note:"$\\int_{-a}^a$: 기함수는 0, 우함수는 $2\\int_0^a$."},
  {type:"formula", title:"기본정리와 포물선·직선 사이 넓이", tex:"\\int_a^b f(x)\\,dx=F(b)-F(a),\\qquad S=\\frac{|a|(\\beta-\\alpha)^3}{6}", where:["F 는 f 의 부정적분","α, β 는 교점의 x 좌표","a 는 이차항 계수"]},
  {type:"svg", title:"$y=x^2$ 과 $y=x+2$ 사이의 넓이 (교점 x=−1, 2)", svg:"<svg viewBox='0 0 300 220' role='img' aria-label='두 곡선 사이 넓이'><line x1='20' y1='180' x2='285' y2='180' stroke='var(--line)' stroke-width='1.5'/><line x1='126' y1='15' x2='126' y2='205' stroke='var(--line)' stroke-width='1.5'/><path d='M78 150 L222 60 Q150 240 78 150 Z' fill='var(--acc)' opacity='0.25' stroke='none'/><path d='M20 35 Q126 325 232 35' fill='none' stroke='var(--ink)' stroke-width='2'/><line x1='30' y1='180' x2='270' y2='30' stroke='var(--acc)' stroke-width='2'/><line x1='78' y1='150' x2='78' y2='180' stroke='var(--ink)' stroke-dasharray='3 3'/><line x1='222' y1='60' x2='222' y2='180' stroke='var(--ink)' stroke-dasharray='3 3'/><text x='70' y='197' font-size='13' fill='var(--ink)'>−1</text><text x='217' y='197' font-size='13' fill='var(--ink)'>2</text><text x='236' y='40' font-size='13' fill='var(--ink)' font-weight='700'>y=x²</text><text x='236' y='74' font-size='13' fill='var(--acc)' font-weight='700'>y=x+2</text><text x='118' y='120' font-size='13' fill='var(--ink)'>위−아래</text></svg>", note:"$\\int_{-1}^{2}(x+2-x^2)dx=\\frac{(2-(-1))^3}6=\\frac92$."}
 ],

 /* ===== 고2 확률과 통계 ===== */
 "adv-counting": [
  {type:"table", title:"여러 가지 순열·조합 요약", head:["종류","공식","보기·주의"], rows:[
   ["원순열","$(n-1)!$","5명 원탁 4!=24"],
   ["중복순열","${}_n\\Pi_r=n^r$",""],
   ["같은 것 순열","$\\frac{n!}{p!q!}$","banana $\\frac{6!}{3!2!}$"],
   ["중복조합","${}_nH_r={}_{n+r-1}C_r$","n 종류, r 개"],
   ["정수해","$x+y+z=n$ → ${}_3H_n$","음이 아닌 정수해"],
   ["최단 경로","같은 것이 있는 순열",""]
  ]},
  {type:"formula", title:"이항정리", tex:"(a+b)^n=\\sum_{k=0}^{n}{}_nC_k\\,a^{n-k}b^k,\\qquad \\sum_{k=0}^{n}{}_nC_k=2^n", where:["계수 ${}_nC_k$: b 를 k 번 고르는 방법 수","$(x+2)^5$ 의 $x^3$ 계수 ${}_5C_2\\cdot2^2=40$"]},
  {type:"tree", title:"경우의 수 — 고1 순열·조합에 조건 하나씩", root:{t:"순열·조합의 확장", children:[{t:"순열",children:["원순열 (n−1)!","중복순열 nʳ","같은 것 n!/p!q!"]},{t:"조합",children:["중복조합 ₙHᵣ","정수해 ₃Hₙ"]},{t:"이항정리",children:["계수 ₙCₖ","ΣₙCₖ=2ⁿ"]}]}}
 ],
 "cond-prob": [
  {type:"table", title:"조건부확률과 독립 요약", head:["항목","공식","주의"], rows:[
   ["덧셈정리","$P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$",""],
   ["조건부확률","$P(B|A)=\\frac{P(A\\cap B)}{P(A)}$","$P(A|B)$ 와 다름"],
   ["곱셈정리","$P(A\\cap B)=P(A)P(B|A)$",""],
   ["독립","$P(A\\cap B)=P(A)P(B)$","⇔ $P(B|A)=P(B)$"],
   ["배반","$P(A\\cap B)=0$","독립과 혼동 금지"],
   ["독립시행","${}_nC_rp^r(1-p)^{n-r}$","n 회 중 r 회 성공"]
  ]},
  {type:"flow", title:"조건부확률 계산 순서 (짝수가 나왔을 때 4 이상)", steps:[{t:"조건 사건 A",d:"짝수 {2,4,6}"},{t:"표본공간 축소",d:"A 안에서만 봄",hi:true},{t:"A∩B 세기",d:"{4, 6}"},{t:"P(A∩B)/P(A)",d:"(2/6)/(3/6)"},{t:"답",d:"2/3",hi:true}]},
  {type:"compare", title:"독립 vs 배반", items:[{name:"독립",points:["$P(A\\cap B)=P(A)P(B)$","$P(B|A)=P(B)$","한 사건이 다른 사건에 영향 없음"]},{name:"배반",points:["동시에 일어나지 않음","$P(A\\cap B)=0$","배반이라고 독립은 **아님**"]}]}
 ],
 "distributions": [
  {type:"table", title:"확률분포 요약", head:["항목","공식","주의"], rows:[
   ["평균·분산","$E(X)=\\sum x_ip_i$","$V(X)=E(X^2)-\\{E(X)\\}^2$"],
   ["일차변환","$E(aX+b)=aE(X)+b$","$V(aX+b)=a^2V(X)$"],
   ["이항분포 $B(n,p)$","$E=np$, $V=np(1-p)$","$\\sigma=\\sqrt{npq}$"],
   ["정규분포 $N(m,\\sigma^2)$","종 모양, 좌우 대칭","표준화 후 표 읽기"],
   ["표준화","$Z=\\frac{X-m}\\sigma\\sim N(0,1)$",""],
   ["이항→정규","n 크면 $N(np,npq)$","근사"]
  ], note:"$P(|Z|\\le1)\\approx0.68$, $P(|Z|\\le2)\\approx0.95$."},
  {type:"formula", title:"정규분포의 표준화", tex:"X\\sim N(m,\\sigma^2)\\ \\Longrightarrow\\ Z=\\frac{X-m}{\\sigma}\\sim N(0,1)", where:["$N(60,8^2)$, $52\\le X\\le76$ → $-1\\le Z\\le2$","$0.34+0.48=0.82$"]},
  {type:"chart", kind:"line", title:"정규분포의 종 모양 (상대 높이 근사)", x:["m−3σ","m−2σ","m−σ","m","m+σ","m+2σ","m+3σ"], series:[{name:"N(m, σ²)",data:[1,5,24,40,24,5,1]}], xlabel:"X", ylabel:"상대 높이", ymin:0, note:"평균 m 을 중심으로 좌우 대칭. ±σ 안에 약 68%, ±2σ 안에 약 95%."}
 ],
 "estimation": [
  {type:"table", title:"통계적 추정 요약", head:["항목","공식","주의"], rows:[
   ["표본평균의 분포","$\\bar X\\sim N(m,\\frac{\\sigma^2}n)$","표준편차 $\\frac\\sigma{\\sqrt n}$"],
   ["95% 신뢰구간","$\\bar x\\pm1.96\\frac\\sigma{\\sqrt n}$",""],
   ["99% 신뢰구간","$\\bar x\\pm2.58\\frac\\sigma{\\sqrt n}$","95% 보다 길다"],
   ["구간의 길이","$2\\times1.96\\frac\\sigma{\\sqrt n}$","n 을 4배 → 길이 절반"],
   ["모비율","$\\hat p\\pm1.96\\sqrt{\\frac{\\hat p(1-\\hat p)}n}$",""],
   ["해석","구간의 95% 가 모평균 포함","'확률 95%' 아님"]
  ]},
  {type:"formula", title:"모평균의 95% 신뢰구간", tex:"\\bar x-1.96\\frac{\\sigma}{\\sqrt n}\\ \\le\\ m\\ \\le\\ \\bar x+1.96\\frac{\\sigma}{\\sqrt n}", where:["99% 는 1.96 대신 2.58","길이 $2\\times1.96\\frac\\sigma{\\sqrt n}$ 은 $\\sqrt n$ 에 반비례"]},
  {type:"flow", title:"신뢰구간 구하는 순서 (σ=12, n=36, x̄=50)", steps:[{t:"σ, n, x̄ 확인"},{t:"σ/√n 계산",d:"12/6=2",hi:true},{t:"신뢰도 상수",d:"95% → 1.96"},{t:"x̄ ± 1.96·σ/√n",d:"50 ± 3.92"},{t:"구간",d:"46.08 ≤ m ≤ 53.92",hi:true}]}
 ],

 /* ===== 고3 미적분Ⅱ ===== */
 "series": [
  {type:"table", title:"수열의 극한과 급수 요약", head:["항목","결과","조건·주의"], rows:[
   ["$\\frac\\infty\\infty$ 꼴","최고차항으로 나눔","계수의 비"],
   ["$\\infty-\\infty$ 꼴","유리화",""],
   ["$\\lim r^n$","|r|<1 → 0, r=1 → 1","그 외 발산"],
   ["등비급수","$\\sum ar^{n-1}=\\frac a{1-r}$","|r|<1 일 때만"],
   ["수렴 → $\\lim a_n=0$","역은 거짓","$\\sum\\frac1n$ 발산"],
   ["순환소수","등비급수로 분수화","$0.999…=1$"]
  ]},
  {type:"formula", title:"등비급수의 합", tex:"\\sum_{n=1}^{\\infty}ar^{n-1}=\\frac{a}{1-r}\\quad(|r|<1)", where:["$0.999…=\\frac{0.9}{1-0.1}=1$","$|r|\\ge1$ 이면 발산 — 공식 적용 금지"]},
  {type:"chart", kind:"line", title:"$\\sum\\frac2{3^n}$ 의 부분합 $S_n$ 이 1 에 다가간다", x:["1","2","3","4","5","6"], series:[{name:"Sₙ",data:[0.67,0.89,0.96,0.99,1.0,1.0]}], xlabel:"n", ylabel:"Sₙ", ymin:0, ymax:1.2, note:"첫째항 $\\frac23$, 공비 $\\frac13$ → 합 $\\frac{2/3}{1-1/3}=1$."}
 ],
 "adv-derivative": [
  {type:"table", title:"여러 가지 함수의 미분법 요약", head:["함수","도함수","주의"], rows:[
   ["$e^x$, $\\ln x$","$e^x$, $\\frac1x$","$(\\ln|x|)'=\\frac1x$"],
   ["$\\sin x$, $\\cos x$","$\\cos x$, $-\\sin x$","$(\\tan x)'=\\sec^2x$"],
   ["합성 $f(g(x))$","$f'(g(x))g'(x)$","$(\\sin2x)'=2\\cos2x$"],
   ["몫 $\\frac fg$","$\\frac{f'g-fg'}{g^2}$","분자 순서 주의"],
   ["역함수","$\\frac{dy}{dx}=\\frac1{dx/dy}$",""],
   ["매개변수","$\\frac{dy}{dx}=\\frac{dy/dt}{dx/dt}$","음함수: 양변을 x 로 미분"]
  ]},
  {type:"formula", title:"미분의 기본 극한", tex:"\\lim_{x\\to0}\\frac{\\sin x}{x}=1,\\qquad \\lim_{x\\to0}\\frac{e^x-1}{x}=1,\\qquad e=\\lim_{n\\to\\infty}\\left(1+\\frac1n\\right)^n", where:["$\\lim\\frac{\\sin3x}x=3$","e 는 미분해도 자기 자신인 유일한 밑"]},
  {type:"compare", title:"역함수 · 매개변수 · 음함수 미분", items:[{name:"역함수",points:["$\\frac{dy}{dx}=\\frac1{dx/dy}$","x 를 y 로 미분해 뒤집기"]},{name:"매개변수",points:["$\\frac{dy}{dx}=\\frac{dy/dt}{dx/dt}$","$x=t^2$, $y=t^3$ → $\\frac{3t}2$"]},{name:"음함수",points:["양변을 x 로 미분","y 항은 $y'$ 를 곱함","$x^2+y^2=25$ 의 접선"]}]}
 ],
 "adv-integral": [
  {type:"table", title:"여러 가지 적분법 요약", head:["항목","공식","주의"], rows:[
   ["기본","$\\int e^x=e^x$, $\\int\\frac1x=\\ln|x|$","절댓값, +C"],
   ["삼각","$\\int\\sin x=-\\cos x$","$\\int\\cos x=\\sin x$"],
   ["치환적분","$\\int f(g)g'dx=\\int f(t)dt$","정적분은 구간도 바꿈"],
   ["$f'/f$ 꼴","$\\int\\frac{f'}{f}dx=\\ln|f|$",""],
   ["부분적분","$\\int uv'=uv-\\int u'v$","u: 로·다·삼·지 순"],
   ["급수→정적분","$\\lim\\frac1n\\sum f(\\frac kn)=\\int_0^1f$",""]
  ]},
  {type:"formula", title:"정적분의 활용", tex:"V=\\pi\\int_a^b\\{f(x)\\}^2dx,\\qquad L=\\int_a^b\\sqrt{1+\\{f'(x)\\}^2}\\,dx", where:["V 회전체 부피 (얇은 원판 쌓기)","L 곡선의 길이","$y=\\sqrt x$ (0≤x≤4) 회전 → $8\\pi$"]},
  {type:"flow", title:"부분적분 순서 ($\\int_0^1xe^xdx$)", steps:[{t:"u, v′ 고르기",d:"u=x, v′=eˣ",hi:true},{t:"v 구하기",d:"v=eˣ"},{t:"uv − ∫u′v",d:"xeˣ − ∫eˣ dx"},{t:"남은 적분",d:"xeˣ − eˣ"},{t:"값 계산",d:"[0, 1] → 1",hi:true}]}
 ],

 /* ===== 고3 기하 ===== */
 "conics": [
  {type:"table", title:"이차곡선 요약", head:["곡선","표준형","초점","핵심 성질"], rows:[
   ["포물선","$y^2=4px$","(p, 0), 준선 x=−p","초점거리 = 준선거리"],
   ["타원","$\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$","$(\\pm c,0)$, $c^2=a^2-b^2$","거리의 합 2a"],
   ["쌍곡선","$\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$","$c^2=a^2+b^2$","거리의 차 2a"],
   ["쌍곡선 점근선","$y=\\pm\\frac bax$","",""],
   ["주의","타원 −, 쌍곡선 +","긴 축이 y축이면 초점도 y축","접선: 판별식"]
  ]},
  {type:"svg", title:"포물선(초점·준선)과 타원(두 초점) 개략", svg:"<svg viewBox='0 0 400 180' role='img' aria-label='포물선과 타원'><line x1='70' y1='20' x2='70' y2='160' stroke='var(--line)' stroke-width='1.5' stroke-dasharray='5 3'/><path d='M150 20 Q30 90 150 160' fill='none' stroke='var(--ink)' stroke-width='2'/><circle cx='110' cy='90' r='4' fill='var(--acc)'/><circle cx='121' cy='40' r='3.5' fill='var(--ink)'/><line x1='121' y1='40' x2='110' y2='90' stroke='var(--acc)' stroke-width='1.5'/><line x1='121' y1='40' x2='70' y2='40' stroke='var(--acc)' stroke-width='1.5'/><text x='116' y='104' font-size='13' fill='var(--acc)' font-weight='700'>F</text><text x='126' y='37' font-size='13' fill='var(--ink)'>P</text><text x='52' y='36' font-size='13' fill='var(--ink)'>H</text><text x='22' y='172' font-size='12' fill='var(--ink)'>준선 x=−p</text><text x='100' y='170' font-size='12' fill='var(--acc)'>PF = PH</text><ellipse cx='300' cy='90' rx='80' ry='50' fill='none' stroke='var(--ink)' stroke-width='2'/><circle cx='238' cy='90' r='4' fill='var(--acc)'/><circle cx='362' cy='90' r='4' fill='var(--acc)'/><circle cx='300' cy='40' r='3.5' fill='var(--ink)'/><line x1='300' y1='40' x2='238' y2='90' stroke='var(--acc)' stroke-width='1.5'/><line x1='300' y1='40' x2='362' y2='90' stroke='var(--acc)' stroke-width='1.5'/><text x='226' y='108' font-size='13' fill='var(--acc)' font-weight='700'>F′</text><text x='356' y='108' font-size='13' fill='var(--acc)' font-weight='700'>F</text><text x='305' y='36' font-size='13' fill='var(--ink)'>P</text><text x='252' y='170' font-size='12' fill='var(--acc)'>PF + PF′ = 2a</text></svg>", note:"포물선: 초점까지 거리 = 준선까지 거리. 타원: 두 초점까지 거리의 합 2a (쌍곡선은 차 2a)."},
  {type:"formula", title:"이차곡선 위의 점 $(x_1,y_1)$ 에서의 접선", tex:"y_1y=2p(x+x_1)\\ \\text{(포물선)},\\qquad \\frac{x_1x}{a^2}+\\frac{y_1y}{b^2}=1\\ \\text{(타원)}", where:["직선과 접할 조건은 판별식 D=0","초점·준선 정의로 거리 최솟값"]}
 ],
 "vectors": [
  {type:"table", title:"평면벡터와 내적 요약", head:["항목","공식","주의"], rows:[
   ["내적","$\\vec a\\cdot\\vec b=|\\vec a||\\vec b|\\cos\\theta$","결과는 **수**"],
   ["성분 계산","$a_1b_1+a_2b_2$",""],
   ["수직","$\\vec a\\cdot\\vec b=0$","⇔"],
   ["내분점","$\\frac{m\\vec b+n\\vec a}{m+n}$","위치벡터"],
   ["직선","$\\vec p=\\vec a+t\\vec d$","$\\vec d$ 방향벡터"],
   ["법선·원","$\\vec n\\cdot(\\vec p-\\vec a)=0$","원 $|\\vec p-\\vec c|=r$"]
  ], note:"지름의 양 끝 A, B: $(\\vec p-\\vec a)\\cdot(\\vec p-\\vec b)=0$."},
  {type:"formula", title:"내적으로 각과 크기 구하기", tex:"\\cos\\theta=\\frac{\\vec a\\cdot\\vec b}{|\\vec a||\\vec b|},\\qquad |\\vec a+\\vec b|^2=|\\vec a|^2+2\\,\\vec a\\cdot\\vec b+|\\vec b|^2", where:["$\\vec a=(1,2)$, $\\vec b=(3,-1)$ → 내적 1","$\\cos\\theta=\\frac{\\sqrt2}{10}$"]},
  {type:"svg", title:"내적 = 같은 방향 성분의 곱", svg:"<svg viewBox='0 0 300 190' role='img' aria-label='벡터의 내적'><defs><marker id='vh23' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='7' markerHeight='7' orient='auto'><path d='M0 0L10 5L0 10z' fill='var(--ink)'/></marker></defs><line x1='40' y1='150' x2='250' y2='150' stroke='var(--ink)' stroke-width='2.2' marker-end='url(#vh23)'/><line x1='40' y1='150' x2='170' y2='50' stroke='var(--acc)' stroke-width='2.2' marker-end='url(#vh23)'/><line x1='170' y1='50' x2='170' y2='150' stroke='var(--acc)' stroke-width='1.5' stroke-dasharray='4 3'/><line x1='40' y1='150' x2='170' y2='150' stroke='var(--acc)' stroke-width='4' opacity='0.5'/><path d='M70 150 A30 30 0 0 0 64 132' fill='none' stroke='var(--ink)' stroke-width='1.2'/><text x='74' y='142' font-size='13' fill='var(--ink)'>θ</text><text x='244' y='172' font-size='14' fill='var(--ink)' font-weight='700'>a</text><text x='172' y='44' font-size='14' fill='var(--acc)' font-weight='700'>b</text><text x='92' y='172' font-size='12' fill='var(--acc)'>|b| cos θ</text><text x='30' y='164' font-size='13' fill='var(--ink)'>O</text><text x='150' y='24' font-size='13' fill='var(--ink)' font-weight='700'>a·b = |a||b| cos θ</text></svg>", note:"θ=90° 이면 cos θ=0 → 내적 0 → 수직. 일(work)=힘·거리·cos θ 가 바로 내적."}
 ],
 "space": [
  {type:"table", title:"공간도형과 공간좌표 요약", head:["항목","공식·내용","주의"], rows:[
   ["직선⊥평면","평면 위 두 직선과 수직","삼수선 정리"],
   ["정사영","$S'=S\\cos\\theta$","θ 는 두 평면이 이루는 각"],
   ["두 점 사이 거리","좌표 차 제곱합의 제곱근","피타고라스 두 번"],
   ["구","$(x-a)^2+(y-b)^2+(z-c)^2=r^2$","완전제곱으로 r"],
   ["구∩평면 $z=k$","원, 반지름 $\\sqrt{r^2-d^2}$","d 중심~평면 거리"],
   ["대칭·접함","xy평면 대칭 → z 부호 반대","xy평면 접함 ⇔ |c|=r"]
  ]},
  {type:"formula", title:"공간의 거리와 정사영", tex:"\\overline{AB}=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2+(z_2-z_1)^2},\\qquad S'=S\\cos\\theta", where:["A(1,2,3), B(4,−2,3) → $\\sqrt{9+16+0}=5$","넓이 10 을 30° 기울이면 $10\\cos30°=5\\sqrt3$"]},
  {type:"flow", title:"구와 평면의 교선(원) 구하기", steps:[{t:"구의 표준형",d:"완전제곱"},{t:"중심·반지름 r",d:"(a,b,c), r"},{t:"중심~평면 거리 d",d:"평면 z=k 면 |c−k|",hi:true},{t:"원의 반지름",d:"√(r²−d²)"},{t:"d=r 이면 접함",d:"xy평면: |c|=r",hi:true}]}
 ]
});
