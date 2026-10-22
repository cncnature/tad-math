// 고2 대수 · 미적분Ⅰ · 확률과 통계, 고3 미적분Ⅱ · 기하 (2022 개정). 핵심 소단원 압축판 — 추후 확장.
window.DATA = window.DATA || {}; window.DATA.curriculumExtra = window.DATA.curriculumExtra || [];
window.DATA.curriculumExtra.push(
 /* ============ 고2 대수 ============ */
 { id:"h2u1", grade:"h2a", title:"지수함수와 로그함수", desc:"거듭제곱근, 지수의 확장, 로그, 지수·로그함수와 방정식", lessons:[
  { id:"exp-log", node:"h-explog", title:"지수와 로그", formulas:["radical-properties","rational-exponent","log-rules"],
    concept:["거듭제곱근: $\\sqrt[n]{a}$, $(\\sqrt[n]a)^n=a$. 지수의 확장 $a^0=1$, $a^{-n}=\\frac1{a^n}$, $a^{\\frac mn}=\\sqrt[n]{a^m}$.","**로그**: $a^x=b\\iff x=\\log_ab$ (a>0, a≠1, b>0).","$\\log_a xy=\\log_ax+\\log_ay$, $\\log_a\\frac xy=\\log_ax-\\log_ay$, $\\log_ax^n=n\\log_ax$, 밑변환 $\\log_ab=\\frac{\\log_cb}{\\log_ca}$.","상용로그 $\\log x=\\log_{10}x$: 정수 부분 → 자릿수."],
    why:"로그는 '몇 번 곱했나' 를 묻는 수입니다. 곱셈을 덧셈으로 바꿔 주어 지진 규모·소리 크기(dB)·pH 가 전부 로그 눈금. 중2 지수법칙을 거꾸로 읽은 것이 로그의 성질.",
    pitfalls:["$\\log(x+y)=\\log x+\\log y$ (×).","진수 조건 $x>0$ 을 빠뜨리고 방정식을 풂."],
    points:["$\\log2=0.3010$ 으로 $2^{50}$ 의 자릿수 (16자리)","로그방정식 $\\log_2(x-1)+\\log_2(x+1)=3$ (x=3, 진수 조건 확인)"],
    example:{q:"$\\log_2 12-\\log_2 3+\\log_2\\sqrt2$ 를 계산하시오.",sol:["$\\log_2\\frac{12}{3}=\\log_24=2$.","$\\log_2\\sqrt2=\\frac12$ → 합 $\\frac52$."],ans:"5/2"},
    quiz:[{q:"$8^{\\frac23}$ 의 값은?",opts:["2","4","6","16/3"],a:1,exp:"(2³)^(2/3)=2²."},{q:"$\\log_39+\\log_28$ 은?",opts:["4","5","6","12"],a:1,exp:"2+3."},{q:"$\\log_2(x-1)=3$ 의 해는?",opts:["7","8","9","4"],a:2,exp:"x−1=8."}]},
  { id:"exp-log-func", node:"h-explog", title:"지수함수와 로그함수의 그래프", formulas:[],
    concept:["$y=a^x$: 점 (0,1) 통과, 점근선 y=0. a>1 증가, 0<a<1 감소.","$y=\\log_ax$: 점 (1,0) 통과, 점근선 x=0. $y=a^x$ 와 $y=x$ 대칭(역함수).","지수·로그 방정식·부등식: 밑을 통일 → 지수(진수)끼리 비교. **0<a<1 이면 부등호 방향 반대**.","최대·최소: $a^x=t$ 로 치환해 이차함수로."],
    why:"지수함수는 '일정 비율로 변하는 것'(세균 증식·복리·반감기), 로그함수는 그 역. 두 그래프가 y=x 대칭인 것은 서로 역함수이기 때문.",
    pitfalls:["$(\\frac12)^x<(\\frac12)^3$ → $x<3$ (×). 감소함수이므로 $x>3$.","로그부등식의 진수 조건 누락."],
    points:["$y=2^x$ 를 평행이동·대칭이동한 그래프의 식","$4^x-2^{x+1}-8=0$ 치환 풀이 (x=2)"],
    example:{q:"$4^x-3\\cdot2^x-4=0$ 을 푸시오.",sol:["$2^x=t>0$: $t^2-3t-4=0$ → $(t-4)(t+1)=0$ → $t=4$.","$2^x=4$ → $x=2$."],ans:"x = 2"},
    quiz:[{q:"$y=2^x$ 의 그래프가 지나는 점은?",opts:["(1,0)","(0,1)","(2,1)","(0,0)"],a:1,exp:"2⁰=1."},{q:"$\\left(\\frac13\\right)^{x-1}>\\frac19$ 의 해는?",opts:["x>3","x<3","x>1","x<−1"],a:1,exp:"지수 비교 x−1<2, 방향 반대."},{q:"$y=\\log_2x$ 와 $y=x$ 대칭인 함수는?",opts:["y=2^x","y=log₂(−x)","y=−log₂x","y=x²"],a:0,exp:"역함수."}]}
 ]},
 { id:"h2u2", grade:"h2a", title:"삼각함수", desc:"일반각과 호도법, 삼각함수의 정의·그래프, 사인·코사인법칙", lessons:[
  { id:"trig-func", node:"h-trigfunc", title:"삼각함수의 뜻과 그래프", formulas:["radian-sector","trig-identity","trig-period-amplitude","trig-angle-reduction"],
    concept:["호도법: $180°=\\pi$. 부채꼴 $l=r\\theta$, $S=\\frac12r^2\\theta$.","단위원 위 점 (x, y): $\\sin\\theta=y$, $\\cos\\theta=x$, $\\tan\\theta=\\frac yx$. 사분면별 부호 (all-sin-tan-cos).","$y=a\\sin(bx+c)+d$: 진폭 |a|, 주기 $\\frac{2\\pi}{|b|}$. $\\tan$ 의 주기 $\\pi$.","각의 변환: $\\sin(\\pi-\\theta)=\\sin\\theta$, $\\cos(\\pi-\\theta)=-\\cos\\theta$, $\\sin(\\frac\\pi2-\\theta)=\\cos\\theta$."],
    why:"중3 삼각비(0°~90°)를 단위원 위를 도는 점으로 확장한 것. 각이 90° 를 넘어도, 음수여도 '점의 좌표' 로 정의하니 자연스럽게 주기가 생기고, 그것이 파동·소리·관람차의 식입니다.",
    pitfalls:["도(°)와 라디안 혼용. $\\sin\\frac\\pi6=\\frac12$ (30°).","주기를 $\\frac{2\\pi}{b}$ 가 아니라 $2\\pi b$ 로 쓰는 실수."],
    points:["$\\sin\\theta+\\cos\\theta=\\frac12$ 일 때 $\\sin\\theta\\cos\\theta$ (제곱해서 $-\\frac38$)","삼각방정식 $2\\sin x-1=0$ (0≤x<2π) 의 해의 합"],
    example:{q:"$0\\le x<2\\pi$ 에서 $2\\cos x+1=0$ 을 푸시오.",sol:["$\\cos x=-\\frac12$.","$x=\\frac{2\\pi}3,\\ \\frac{4\\pi}3$."],ans:"2π/3, 4π/3"},
    quiz:[{q:"$150°$ 를 호도법으로 나타내면?",opts:["5π/6","2π/3","3π/4","5π/4"],a:0,exp:"150/180·π."},{q:"$y=3\\sin2x$ 의 주기는?",opts:["π","2π","π/2","3π"],a:0,exp:"2π/2."},{q:"$\\cos\\frac{5\\pi}{6}$ 의 값은?",opts:["1/2","−1/2","√3/2","−√3/2"],a:3,exp:"cos(π−π/6)=−cos(π/6)."}]},
  { id:"sine-cosine-law", node:"h-trigfunc", title:"사인법칙과 코사인법칙", formulas:["sine-cosine-law","cosine-law","triangle-area-sine"],
    concept:["**사인법칙** $\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}=2R$ (R 외접원 반지름).","**코사인법칙** $a^2=b^2+c^2-2bc\\cos A$ → $\\cos A=\\frac{b^2+c^2-a^2}{2bc}$.","넓이 $S=\\frac12bc\\sin A=\\frac{abc}{4R}=rs$ (s 는 둘레의 절반).","두 변과 끼인각 → 코사인법칙, 한 변과 두 각 → 사인법칙."],
    why:"코사인법칙은 피타고라스 정리의 일반형입니다($A=90°$ 이면 $\\cos A=0$). 사인법칙은 중3 원주각(같은 호 → 같은 각)과 외접원에서 나옵니다. 중2·중3 도형이 삼각함수로 묶이는 자리.",
    pitfalls:["코사인법칙의 부호 −2bc cos A 를 + 로.","사인법칙에서 $\\sin A$ 로 A 를 구할 때 둔각 해를 놓침."],
    points:["삼각형의 모양 판별 ($a^2>b^2+c^2$ 이면 A 가 둔각)","평행사변형·사각형의 넓이와 대각선 길이"],
    example:{q:"b=3, c=5, A=60° 인 삼각형의 a 와 넓이를 구하시오.",sol:["$a^2=9+25-2\\cdot3\\cdot5\\cdot\\frac12=19$ → $a=\\sqrt{19}$.","$S=\\frac12\\cdot3\\cdot5\\cdot\\frac{\\sqrt3}2=\\frac{15\\sqrt3}4$."],ans:"√19, 15√3/4"},
    quiz:[{q:"A=30°, B=45°, a=2 일 때 b 는?",opts:["√2","2√2","2√3","4"],a:1,exp:"b=a·sinB/sinA=2·(√2/2)/(1/2)."},{q:"세 변이 3, 5, 7 인 삼각형에서 7 의 대각은?",opts:["60°","90°","120°","150°"],a:2,exp:"cos=(9+25−49)/30=−1/2."},{q:"a=4, A=30° 인 삼각형의 외접원의 반지름은?",opts:["2","4","8","2√3"],a:1,exp:"2R=a/sinA=8."}]}
 ]},
 { id:"h2u3", grade:"h2a", title:"수열", desc:"등차·등비수열, 합의 기호 Σ, 수학적 귀납법", lessons:[
  { id:"sequences", node:"h-seq", title:"등차수열과 등비수열", formulas:["sequence-general-term","arithmetic-sum","geometric-general-term","geometric-sum","arithmetic-mean-term","geometric-mean-term"],
    concept:["등차수열 $a_n=a+(n-1)d$, 합 $S_n=\\frac{n(a+l)}2=\\frac{n\\{2a+(n-1)d\\}}2$. 등차중항 $2b=a+c$.","등비수열 $a_n=ar^{n-1}$, 합 $S_n=\\frac{a(r^n-1)}{r-1}$ (r≠1). 등비중항 $b^2=ac$.","$a_n=S_n-S_{n-1}$ (n≥2), $a_1=S_1$.","원리합계: 매년 a 원씩 연이율 r 복리 적립 → 등비수열의 합."],
    why:"등차수열의 합은 가우스의 1+2+…+100 — 앞뒤를 짝지어 (첫항+끝항)×개수÷2. 등비수열의 합은 $S-rS$ 로 가운데가 전부 지워지는 망원 합. 둘 다 외울 것이 아니라 '지우기' 입니다.",
    pitfalls:["등비수열의 합에서 r=1 인 경우(na)를 빠뜨림.","$a_n=S_n-S_{n-1}$ 을 n=1 에도 적용."],
    points:["$S_n=n^2+2n$ 에서 $a_n$ 구하기 ($a_n=2n+1$)","첫째항부터 n 항까지의 합의 최댓값 (부호가 바뀌는 항)"],
    example:{q:"첫째항 3, 공차 4 인 등차수열의 제10항과 첫째항부터 제10항까지의 합은?",sol:["$a_{10}=3+9\\cdot4=39$.","$S_{10}=\\frac{10(3+39)}2=210$."],ans:"39, 210"},
    quiz:[{q:"등차수열 2, 5, 8, … 의 제20항은?",opts:["59","60","62","65"],a:0,exp:"2+19·3."},{q:"등비수열 3, 6, 12, … 의 첫째항부터 제5항까지의 합은?",opts:["48","93","96","189"],a:1,exp:"3(2⁵−1)/(2−1)=93."},{q:"3 과 27 의 등비중항(양수)은?",opts:["9","12","15","81"],a:0,exp:"b²=81."}]},
  { id:"sigma-induction", node:"h-seq", title:"합의 기호 Σ와 수학적 귀납법", formulas:["sigma-formulas","sigma-properties","partial-fraction-sum","sum-to-term"],
    concept:["$\\sum_{k=1}^n k=\\frac{n(n+1)}2$, $\\sum k^2=\\frac{n(n+1)(2n+1)}6$, $\\sum k^3=\\left\\{\\frac{n(n+1)}2\\right\\}^2$.","$\\sum(a_k+b_k)=\\sum a_k+\\sum b_k$, $\\sum ca_k=c\\sum a_k$, $\\sum c=cn$.","부분분수: $\\frac1{k(k+1)}=\\frac1k-\\frac1{k+1}$ → 망원 합.","**수학적 귀납법**: n=1 성립, n=k 성립 가정 → n=k+1 성립 증명."],
    why:"귀납법은 도미노입니다. 첫 번째가 넘어지고(n=1), 하나가 넘어지면 다음도 넘어지면(k→k+1) 전부 넘어집니다. 무한히 많은 명제를 두 단계로 증명하는 방법.",
    pitfalls:["$\\sum_{k=1}^n k^2$ 과 $\\left(\\sum k\\right)^2$ 혼동.","귀납법에서 n=k+1 단계에 가정을 실제로 쓰지 않음."],
    points:["$\\sum_{k=1}^{10}(2k-1)^2$ 전개 계산","계차수열: $a_{n+1}-a_n=2n$ 꼴에서 $a_n$"],
    example:{q:"$\\sum_{k=1}^{10}\\frac{1}{k(k+1)}$ 의 값은?",sol:["$=\\sum\\left(\\frac1k-\\frac1{k+1}\\right)=1-\\frac1{11}$.","$=\\frac{10}{11}$."],ans:"10/11"},
    quiz:[{q:"$\\sum_{k=1}^{5}(2k+1)$ 의 값은?",opts:["30","35","40","45"],a:1,exp:"2·15+5."},{q:"$\\sum_{k=1}^{n}k^2$ 은?",opts:["n(n+1)/2","n(n+1)(2n+1)/6","n²(n+1)²/4","n(2n+1)"],a:1,exp:"제곱의 합 공식."},{q:"$a_1=1$, $a_{n+1}=a_n+2n$ 일 때 $a_5$ 는?",opts:["17","21","25","31"],a:1,exp:"1+2+4+6+8=21."}]}
 ]},
 /* ============ 고2 미적분Ⅰ ============ */
 { id:"h2u4", grade:"h2c", title:"함수의 극한과 연속", desc:"극한값, 극한의 성질, 함수의 연속, 사잇값 정리", lessons:[
  { id:"limits", node:"h-calc", title:"함수의 극한과 연속", formulas:[],
    concept:["$\\lim_{x\\to a}f(x)=L$: x 가 a 에 한없이 가까워질 때 f(x) 가 L 에 가까워짐. 좌극한=우극한일 때 존재.","$\\frac00$ 꼴: 인수분해·유리화로 약분. $\\frac\\infty\\infty$ 꼴: 최고차항으로 나눔.","**연속**: $f(a)$ 존재, $\\lim_{x\\to a}f(x)$ 존재, 둘이 같다.","**사잇값 정리**: $[a,b]$ 에서 연속이고 $f(a)f(b)<0$ 이면 $(a,b)$ 에 $f(c)=0$ 인 c 가 적어도 하나."],
    why:"극한은 '다가가는 값' 을 수학적으로 쓴 것. 미분(순간 변화율)과 적분(무한히 쪼갠 합)이 모두 극한으로 정의되므로 미적분의 문법입니다.",
    pitfalls:["$\\lim_{x\\to a}f(x)=f(a)$ 로 항상 대입하는 실수 (연속일 때만).","$\\frac00$ 에서 약분 없이 '0' 또는 '없음' 이라 답함."],
    points:["$\\lim_{x\\to2}\\frac{x^2-4}{x-2}=4$, $\\lim_{x\\to\\infty}\\frac{2x^2+1}{x^2-x}=2$","미정계수: $\\lim_{x\\to1}\\frac{x^2+ax+b}{x-1}=3$ 에서 a, b"],
    example:{q:"$\\lim_{x\\to3}\\frac{x^2-9}{x-3}$ 을 구하시오.",sol:["$\\frac{(x-3)(x+3)}{x-3}=x+3$.","→ 6."],ans:"6"},
    quiz:[{q:"$\\lim_{x\\to\\infty}\\frac{3x^2-x}{x^2+5}$ 는?",opts:["0","1","3","∞"],a:2,exp:"최고차항 계수 비."},{q:"$\\lim_{x\\to0}\\frac{\\sqrt{x+4}-2}{x}$ 는?",opts:["1/4","1/2","1","4"],a:0,exp:"유리화: 1/(√(x+4)+2)."},{q:"$f(x)=\\begin{cases}x+a & (x<1)\\\\ 3 & (x\\ge1)\\end{cases}$ 가 x=1 에서 연속일 때 a 는?",opts:["1","2","3","4"],a:1,exp:"1+a=3."}]}
 ]},
 { id:"h2u5", grade:"h2c", title:"미분", desc:"미분계수와 도함수, 접선, 증가·감소와 극값, 최대·최소, 속도·가속도", lessons:[
  { id:"derivative", node:"h-calc", title:"미분계수와 도함수", formulas:["derivative-definition","derivative-power","product-rule","tangent-line"],
    concept:["미분계수 $f'(a)=\\lim_{h\\to0}\\frac{f(a+h)-f(a)}{h}$: x=a 에서의 접선의 기울기 = 순간변화율.","$(x^n)'=nx^{n-1}$, $(c)'=0$, $(f\\pm g)'=f'\\pm g'$, $(fg)'=f'g+fg'$.","접선의 방정식: $y-f(a)=f'(a)(x-a)$.","미분가능하면 연속 (역은 거짓: $|x|$ 는 x=0 에서 연속이지만 미분 불가)."],
    why:"중2 일차함수의 기울기는 '평균 변화율' 이었습니다. 구간을 0 으로 보내면 한 점에서의 기울기(접선)가 되고, 그것이 미분. 속도계의 숫자가 바로 미분계수입니다.",
    pitfalls:["$(x^2)'=x$ (×). $2x$.","접선 기울기를 구하고 y 좌표 $f(a)$ 를 빠뜨림."],
    points:["$\\lim_{h\\to0}\\frac{f(2+2h)-f(2)}{h}=2f'(2)$ 꼴","곡선 밖의 점에서 그은 접선 (접점을 t 로)"],
    example:{q:"$f(x)=x^3-3x$ 의 x=2 에서의 접선의 방정식은?",sol:["$f'(x)=3x^2-3$ → $f'(2)=9$, $f(2)=2$.","$y-2=9(x-2)$ → $y=9x-16$."],ans:"y = 9x − 16"},
    quiz:[{q:"$f(x)=x^4-2x^2+1$ 일 때 $f'(1)$ 은?",opts:["0","1","2","4"],a:0,exp:"4−4."},{q:"$y=x^2$ 위의 점 (3, 9) 에서의 접선의 기울기는?",opts:["3","6","9","2"],a:1,exp:"2x."},{q:"$f(x)=(x+1)(x^2-1)$ 일 때 $f'(0)$ 은?",opts:["−1","0","1","2"],a:0,exp:"f'=(x²−1)+(x+1)·2x → −1."}]},
  { id:"derivative-apply", node:"h-calc", title:"도함수의 활용", formulas:["velocity-acceleration","mean-value-theorem"],
    concept:["$f'>0$ 구간에서 증가, $f'<0$ 감소. $f'(a)=0$ 이고 부호가 바뀌면 극값 (+→− 극대, −→+ 극소).","최대·최소: 닫힌구간에서 극값과 양 끝 값 비교.","방정식 $f(x)=k$ 의 실근 개수 = $y=f(x)$ 와 $y=k$ 의 교점 개수.","속도 $v=\\frac{dx}{dt}$, 가속도 $a=\\frac{dv}{dt}$. 평균값 정리: $\\frac{f(b)-f(a)}{b-a}=f'(c)$."],
    why:"그래프의 '오르막·내리막' 을 도함수의 부호로 읽는 것. 극값 판별은 부호 변화표 한 장이면 끝납니다. 상자 최대 부피, 최소 비용 — 중3 이차함수 최댓값의 일반화.",
    pitfalls:["$f'(a)=0$ 이면 무조건 극값이라 판단 ($x^3$ 은 x=0 에서 극값 아님).","최댓값 문제에서 구간 끝 값을 비교하지 않음."],
    points:["삼차함수가 극값을 가질 조건 ($f'=0$ 의 판별식 >0)","한 변 x 를 잘라 접은 상자의 부피 최대"],
    example:{q:"$f(x)=x^3-3x^2+1$ 의 극댓값과 극솟값은?",sol:["$f'=3x^2-6x=3x(x-2)$ → x=0 극대, x=2 극소.","극댓값 $f(0)=1$, 극솟값 $f(2)=-3$."],ans:"극댓값 1, 극솟값 −3"},
    quiz:[{q:"$f(x)=x^3-12x$ 가 극소가 되는 x 는?",opts:["−2","0","2","4"],a:2,exp:"f'=3x²−12, x=2 에서 −→+."},{q:"$x(t)=t^3-6t^2$ 인 점의 t=4 에서의 속도는?",opts:["0","8","16","24"],a:0,exp:"v=3t²−12t → 48−48."},{q:"$x^3-3x-k=0$ 이 서로 다른 세 실근을 가질 k 의 범위는?",opts:["−2<k<2","k>2","k<−2","−1<k<1"],a:0,exp:"극댓값 2, 극솟값 −2 사이."}]}
 ]},
 { id:"h2u6", grade:"h2c", title:"적분", desc:"부정적분과 정적분, 넓이, 속도와 거리", lessons:[
  { id:"integral", node:"h-calc", title:"정적분과 넓이", formulas:["integral-power","fundamental-theorem","definite-integral-properties","area-between-curves","one-sixth-area","distance-from-velocity"],
    concept:["부정적분 $\\int x^ndx=\\frac{x^{n+1}}{n+1}+C$. 미분의 역.","정적분 $\\int_a^bf(x)dx=F(b)-F(a)$ (미적분의 기본정리).","넓이: $\\int_a^b|f(x)|dx$. 두 곡선 사이 $\\int_a^b\\{f(x)-g(x)\\}dx$ (위 − 아래).","속도 → 위치 변화 $\\int v\\,dt$, 이동 거리 $\\int|v|dt$. 정적분으로 정의된 함수의 미분 $\\frac{d}{dx}\\int_a^xf(t)dt=f(x)$."],
    why:"넓이를 얇은 직사각형으로 쪼개 더하면(리만 합) 극한에서 정적분이 됩니다. 놀라운 것은 그 값이 '도함수가 f 인 함수' 의 양 끝값 차이로 나온다는 것(기본정리) — 미분과 적분이 서로 거꾸로라는 뉴턴·라이프니츠의 발견.",
    pitfalls:["x축 아래 부분의 정적분은 음수 — 넓이를 물으면 절댓값.","적분 구간을 교점으로 나누지 않고 한 번에 계산."],
    points:["포물선과 직선 사이 넓이 $\\frac{|a|(\\beta-\\alpha)^3}{6}$","$\\int_{-a}^a$ 에서 우함수·기함수 성질"],
    example:{q:"$y=x^2$ 과 $y=x+2$ 로 둘러싸인 부분의 넓이는?",sol:["교점 $x^2=x+2$ → x=−1, 2.","$\\int_{-1}^2(x+2-x^2)dx=\\frac{(2-(-1))^3}{6}=\\frac{27}6=\\frac92$."],ans:"9/2"},
    quiz:[{q:"$\\int_0^2 3x^2dx$ 의 값은?",opts:["4","6","8","12"],a:2,exp:"[x³]₀²."},{q:"$\\int_{-1}^{1}(x^3+x)dx$ 는?",opts:["0","1","2","1/2"],a:0,exp:"기함수."},{q:"$v(t)=2t-4$ 로 움직이는 점의 t=0 에서 t=3 까지의 이동 거리는?",opts:["3","5","−3","1"],a:1,exp:"∫|2t−4|: 0~2 에서 4, 2~3 에서 1."}]}
 ]},
 /* ============ 고2 확률과 통계 ============ */
 { id:"h2u7", grade:"h2p", title:"경우의 수와 확률", desc:"순열·조합의 확장, 이항정리, 확률의 덧셈·곱셈, 조건부확률, 독립", lessons:[
  { id:"adv-counting", node:"h-prob", title:"여러 가지 순열·조합과 이항정리", formulas:["circular-permutation","repeated-permutation","same-items-permutation","repeated-combination","binomial-theorem","binomial-coefficient-sum"],
    concept:["원순열 $(n-1)!$, 중복순열 ${}_n\\Pi_r=n^r$, 같은 것이 있는 순열 $\\frac{n!}{p!q!}$, 중복조합 ${}_nH_r={}_{n+r-1}C_r$.","**이항정리** $(a+b)^n=\\sum_{k=0}^n{}_nC_ka^{n-k}b^k$. $\\sum{}_nC_k=2^n$.","방정식 $x+y+z=n$ 의 음이 아닌 정수해 ${}_3H_n$.","최단 경로: 같은 것이 있는 순열."],
    why:"고1 순열·조합에 '돌려 앉기·반복 허용·같은 것' 이라는 조건을 하나씩 더한 것. 이항정리의 계수가 조합인 이유: $(a+b)^n$ 전개에서 b 를 k 번 고르는 방법 수.",
    pitfalls:["원순열에서 (n−1)! 대신 n!.","중복조합 ${}_nH_r$ 에서 n 과 r 의 자리 ($n+r-1$ 에서 r 을 고름)."],
    points:["$(x^2+\\frac1x)^6$ 의 상수항 (${}_6C_4=15$)","부정방정식 $x+y+z=10$ 의 자연수 해 ${}_3H_7=36$"],
    example:{q:"$(x+2)^5$ 의 전개식에서 $x^3$ 의 계수는?",sol:["${}_5C_2\\cdot2^2=10\\cdot4$.","$=40$."],ans:"40"},
    quiz:[{q:"5명이 원탁에 앉는 경우의 수는?",opts:["24","60","120","5"],a:0,exp:"4!."},{q:"'banana' 의 문자를 일렬로 나열하는 경우의 수는?",opts:["60","120","360","720"],a:0,exp:"6!/(3!2!)."},{q:"${}_3H_2$ 의 값은?",opts:["3","4","6","10"],a:2,exp:"₄C₂."}]},
  { id:"cond-prob", node:"h-prob", title:"조건부확률과 독립", formulas:["conditional-probability","probability-addition","independent-events","independent-trials"],
    concept:["$P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$.","**조건부확률** $P(B|A)=\\frac{P(A\\cap B)}{P(A)}$, 곱셈정리 $P(A\\cap B)=P(A)P(B|A)$.","**독립**: $P(A\\cap B)=P(A)P(B)$ ⇔ $P(B|A)=P(B)$.","**독립시행**: n 회 중 r 회 성공 ${}_nC_rp^r(1-p)^{n-r}$."],
    why:"조건부확률은 '표본공간을 줄이는 것'. 검사 양성인데 실제 환자일 확률(위양성 문제)이 직관과 크게 다른 이유가 여기 있습니다. 중2 '꺼낸 것을 넣지 않는' 확률이 바로 조건부확률이었습니다.",
    pitfalls:["독립과 배반(동시에 안 일어남) 혼동. 배반이면 $P(A\\cap B)=0$.","$P(A|B)$ 와 $P(B|A)$ 를 바꿔 씀."],
    points:["표로 주어진 자료의 조건부확률","동전 5번 던져 앞면 3번: ${}_5C_3(\\frac12)^5=\\frac{10}{32}$"],
    example:{q:"주사위를 던져 짝수가 나왔을 때 그 수가 4 이상일 확률은?",sol:["A: 짝수 {2,4,6}, B: 4 이상. $A\\cap B=\\{4,6\\}$.","$P(B|A)=\\frac{2/6}{3/6}=\\frac23$."],ans:"2/3"},
    quiz:[{q:"$P(A)=0.5$, $P(B)=0.4$, $P(A\\cap B)=0.2$ 일 때 A, B 는?",opts:["독립","배반","종속","여사건"],a:0,exp:"0.5×0.4=0.2."},{q:"명중률 1/3 로 3발 쏠 때 꼭 1발 명중할 확률은?",opts:["1/9","4/9","1/3","2/9"],a:1,exp:"₃C₁(1/3)(2/3)²=12/27."},{q:"$P(A)=0.6$, $P(B|A)=0.5$ 일 때 $P(A\\cap B)$ 는?",opts:["0.1","0.3","0.5","1.1"],a:1,exp:"곱셈정리."}]}
 ]},
 { id:"h2u8", grade:"h2p", title:"통계", desc:"확률변수와 확률분포, 이항분포·정규분포, 통계적 추정", lessons:[
  { id:"distributions", node:"h-prob", title:"확률분포 — 이항분포와 정규분포", formulas:["rv-mean-variance","rv-linear-transform","binomial-distribution","normal-standardization","binomial-normal-approx"],
    concept:["이산확률변수: $E(X)=\\sum x_ip_i$, $V(X)=E(X^2)-\\{E(X)\\}^2$. $E(aX+b)=aE(X)+b$, $V(aX+b)=a^2V(X)$.","**이항분포** $B(n,p)$: $E=np$, $V=np(1-p)$. n 이 크면 $N(np,npq)$ 로 근사.","**정규분포** $N(m,\\sigma^2)$: 종 모양, $Z=\\frac{X-m}\\sigma\\sim N(0,1)$ 로 표준화 → 표에서 확률.","$P(|Z|\\le1)\\approx0.68$, $P(|Z|\\le2)\\approx0.95$."],
    why:"중3 분산·표준편차를 '확률' 에 적용한 것. 매스랩 갈톤보드처럼 무작위가 모이면 종 모양이 선다 — 이항분포가 정규분포에 가까워지는 모습(드무아브르·라플라스).",
    pitfalls:["$V(aX)=aV(X)$ (×). $a^2V(X)$.","표준화 후 표를 읽을 때 좌우 대칭을 쓰지 않음."],
    points:["$X\\sim B(100,0.2)$ → $E=20$, $\\sigma=4$ → $P(X\\le28)\\approx P(Z\\le2)$","평균 70, 표준편차 10 인 시험에서 상위 16% 컷(80점)"],
    example:{q:"$X\\sim N(60,8^2)$ 일 때 $P(52\\le X\\le76)$ 을 구하시오. ($P(0\\le Z\\le1)=0.34$, $P(0\\le Z\\le2)=0.48$)",sol:["$Z=\\frac{X-60}8$: $-1\\le Z\\le2$.","$0.34+0.48=0.82$."],ans:"0.82"},
    quiz:[{q:"$E(X)=3$, $V(X)=2$ 일 때 $E(2X+1)$, $V(2X+1)$ 은?",opts:["7, 8","7, 4","6, 8","7, 2"],a:0,exp:"2·3+1, 4·2."},{q:"$X\\sim B(20,\\frac12)$ 의 평균과 분산은?",opts:["10, 5","10, 10","20, 5","5, 10"],a:0,exp:"np, npq."},{q:"$N(50,10^2)$ 에서 70 이상일 확률은? ($P(0\\le Z\\le2)=0.48$)",opts:["0.02","0.48","0.5","0.98"],a:0,exp:"0.5−0.48."}]},
  { id:"estimation", node:"h-prob", title:"통계적 추정", formulas:["sample-mean-distribution","confidence-interval","proportion-ci"],
    concept:["모집단 $N(m,\\sigma^2)$ 에서 크기 n 표본의 평균 $\\bar X\\sim N\\left(m,\\frac{\\sigma^2}n\\right)$.","모평균 95% 신뢰구간: $\\bar x-1.96\\frac\\sigma{\\sqrt n}\\le m\\le\\bar x+1.96\\frac\\sigma{\\sqrt n}$ (99%: 2.58).","신뢰구간의 길이 $2\\times1.96\\frac{\\sigma}{\\sqrt n}$ — n 을 4배 하면 길이 절반.","모비율 $\\hat p\\pm1.96\\sqrt{\\frac{\\hat p(1-\\hat p)}n}$."],
    why:"여론조사 '오차범위 ±3.1%p, 신뢰수준 95%' 의 수학. 표본을 1000명만 뽑아도 모집단을 추정할 수 있는 근거가 표본평균의 분포(중심극한정리)입니다.",
    pitfalls:["표본평균의 표준편차는 $\\sigma$ 가 아니라 $\\frac\\sigma{\\sqrt n}$.","신뢰구간을 '모평균이 그 안에 있을 확률 95%' 로 해석(엄밀히는 구간의 95% 가 모평균을 포함)."],
    points:["신뢰구간 길이가 주어질 때 n 구하기","표본평균이 특정 값 이상일 확률 (표준화)"],
    example:{q:"σ=12 인 모집단에서 n=36 표본의 평균이 50 일 때 모평균의 95% 신뢰구간은?",sol:["$\\frac\\sigma{\\sqrt n}=\\frac{12}6=2$.","$50\\pm1.96\\cdot2$ → $46.08\\le m\\le53.92$."],ans:"[46.08, 53.92]"},
    quiz:[{q:"σ=10, n=25 일 때 표본평균의 표준편차는?",opts:["0.4","2","10","50"],a:1,exp:"10/5."},{q:"신뢰구간의 길이를 절반으로 줄이려면 표본 크기를 몇 배?",opts:["2","4","8","1/2"],a:1,exp:"√n 에 반비례."},{q:"99% 신뢰구간이 95% 보다 ( ).",opts:["짧다","길다","같다","비교 불가"],a:1,exp:"2.58 > 1.96."}]}
 ]},
 /* ============ 고3 미적분Ⅱ ============ */
 { id:"h3u1", grade:"h3c", title:"수열의 극한과 급수", desc:"수열의 극한, 등비급수, 급수의 수렴", lessons:[
  { id:"series", node:"h-calc2", title:"수열의 극한과 등비급수", formulas:["geometric-series","series-convergence-test"],
    concept:["$\\lim a_n$: $\\frac\\infty\\infty$ 꼴은 최고차항으로, $\\infty-\\infty$ 꼴은 유리화.","$\\lim r^n$: $|r|<1$ → 0, $r=1$ → 1, 그 외 발산.","**등비급수** $\\sum_{n=1}^\\infty ar^{n-1}=\\frac a{1-r}$ ($|r|<1$).","급수가 수렴하면 $\\lim a_n=0$ (역은 거짓: $\\sum\\frac1n$ 발산)."],
    why:"$0.999…=1$ 이 등비급수입니다: $\\frac{0.9}{1-0.1}=1$. 무한히 더해도 유한한 값이 될 수 있다는 것(제논의 역설 해결)이 급수의 핵심.",
    pitfalls:["$\\lim a_n=0$ 이면 급수가 수렴한다고 판단.","등비급수 공식을 $|r|\\ge1$ 에 적용."],
    points:["순환소수를 등비급수로 분수화","도형의 무한 반복(정사각형 안의 정사각형) 넓이의 합"],
    example:{q:"$\\sum_{n=1}^\\infty\\frac{2}{3^n}$ 의 값은?",sol:["첫째항 $\\frac23$, 공비 $\\frac13$.","$\\frac{2/3}{1-1/3}=1$."],ans:"1"},
    quiz:[{q:"$\\lim\\frac{3n^2+1}{n^2-2n}$ 은?",opts:["0","1","3","∞"],a:2,exp:"최고차 계수."},{q:"$\\sum_{n=1}^\\infty\\left(\\frac12\\right)^{n-1}$ 은?",opts:["1","2","1/2","발산"],a:1,exp:"1/(1−1/2)."},{q:"$\\lim(\\sqrt{n^2+2n}-n)$ 은?",opts:["0","1","2","∞"],a:1,exp:"유리화: 2n/(√(n²+2n)+n)→1."}]}
 ]},
 { id:"h3u2", grade:"h3c", title:"미분법", desc:"지수·로그·삼각함수의 미분, 합성함수·역함수·매개변수·음함수 미분, 도함수의 활용", lessons:[
  { id:"adv-derivative", node:"h-calc2", title:"여러 가지 함수의 미분법", formulas:["e-basic-limit","trig-basic-limit","exp-derivative","log-derivative","trig-derivative","chain-rule","quotient-rule","inverse-derivative","parametric-derivative","implicit-derivative"],
    concept:["$\\lim_{x\\to0}\\frac{\\sin x}x=1$, $\\lim_{x\\to0}\\frac{e^x-1}x=1$, $e=\\lim(1+\\frac1n)^n$.","$(e^x)'=e^x$, $(\\ln x)'=\\frac1x$, $(\\sin x)'=\\cos x$, $(\\cos x)'=-\\sin x$, $(\\tan x)'=\\sec^2x$.","합성함수 $\\{f(g(x))\\}'=f'(g(x))g'(x)$, 몫 $\\left(\\frac fg\\right)'=\\frac{f'g-fg'}{g^2}$.","역함수 $\\frac{dy}{dx}=\\frac1{dx/dy}$, 매개변수 $\\frac{dy}{dx}=\\frac{dy/dt}{dx/dt}$, 음함수: 양변을 x 로 미분."],
    why:"$e$ 는 '미분해도 자기 자신' 인 유일한 밑. 자연계의 성장·붕괴가 $e^x$ 로 쓰이는 이유입니다. 합성함수 미분(연쇄법칙)은 '겉 미분 × 속 미분' — 기어비처럼 변화율이 곱해집니다.",
    pitfalls:["$(\\sin2x)'=\\cos2x$ (×). $2\\cos2x$.","$(\\ln|x|)'=\\frac1x$, 로그의 진수에 절댓값."],
    points:["$y=x^x$ 의 로그미분법","$x^2+y^2=25$ 위의 점 (3,4) 에서의 접선 (음함수)"],
    example:{q:"$y=e^{2x}\\sin x$ 의 도함수는?",sol:["곱의 미분: $(e^{2x})'\\sin x+e^{2x}(\\sin x)'$.","$=2e^{2x}\\sin x+e^{2x}\\cos x=e^{2x}(2\\sin x+\\cos x)$."],ans:"e^{2x}(2sin x + cos x)"},
    quiz:[{q:"$(\\ln(x^2+1))'$ 은?",opts:["1/(x²+1)","2x/(x²+1)","2x","1/2x"],a:1,exp:"연쇄법칙."},{q:"$\\lim_{x\\to0}\\frac{\\sin3x}{x}$ 는?",opts:["0","1","3","1/3"],a:2,exp:"3·(sin3x/3x)."},{q:"$x=t^2$, $y=t^3$ 일 때 $\\frac{dy}{dx}$ 는?",opts:["3t/2","2/3t","3t²/2t²","t"],a:0,exp:"3t²/2t."}]}
 ]},
 { id:"h3u3", grade:"h3c", title:"적분법", desc:"여러 가지 적분법, 치환·부분적분, 정적분의 활용(넓이·부피·길이)", lessons:[
  { id:"adv-integral", node:"h-calc2", title:"여러 가지 적분법과 활용", formulas:["exp-log-integral","trig-integral","substitution-integral","integration-by-parts","riemann-sum","solid-of-revolution","arc-length"],
    concept:["$\\int e^xdx=e^x+C$, $\\int\\frac1xdx=\\ln|x|+C$, $\\int\\sin x=-\\cos x$, $\\int\\cos x=\\sin x$.","**치환적분**: $\\int f(g(x))g'(x)dx=\\int f(t)dt$. $\\int\\frac{f'(x)}{f(x)}dx=\\ln|f(x)|$.","**부분적분**: $\\int uv'=uv-\\int u'v$ (로그·다항·삼각·지수 순으로 u).","급수 → 정적분 $\\lim\\frac1n\\sum f(\\frac kn)=\\int_0^1f(x)dx$. 회전체 부피 $\\pi\\int f^2dx$, 곡선의 길이 $\\int\\sqrt{1+(f')^2}dx$."],
    why:"치환적분은 연쇄법칙을, 부분적분은 곱의 미분을 거꾸로 읽은 것. 회전체의 부피는 얇은 원판 $\\pi r^2\\,dx$ 를 쌓는 것 — 중1 입체도형의 부피가 적분으로 완성됩니다.",
    pitfalls:["치환 후 적분 구간을 바꾸지 않음.","부분적분에서 u, v' 선택을 반대로 해 더 복잡해짐."],
    points:["$\\int_0^1xe^xdx=1$ (부분적분)","$y=\\sqrt x$ (0≤x≤4) 를 x축 둘레로 회전한 부피 $8\\pi$"],
    example:{q:"$\\int_0^{\\pi/2}\\sin x\\cos x\\,dx$ 를 구하시오.",sol:["$\\sin x=t$, $\\cos x\\,dx=dt$, 구간 0→1.","$\\int_0^1t\\,dt=\\frac12$."],ans:"1/2"},
    quiz:[{q:"$\\int\\frac{2x}{x^2+1}dx$ 는?",opts:["ln(x²+1)+C","2ln(x²+1)+C","1/(x²+1)+C","arctan x+C"],a:0,exp:"f'/f 꼴."},{q:"$\\int_1^e\\ln x\\,dx$ 는?",opts:["1","e","e−1","0"],a:0,exp:"[x ln x − x]₁ᵉ = (e−e)−(0−1)=1."},{q:"$\\lim_{n\\to\\infty}\\frac1n\\sum_{k=1}^n\\left(\\frac kn\\right)^2$ 은?",opts:["1/2","1/3","1","2/3"],a:1,exp:"∫₀¹x²dx."}]}
 ]},
 /* ============ 고3 기하 ============ */
 { id:"h3u4", grade:"h3g", title:"이차곡선", desc:"포물선·타원·쌍곡선의 방정식과 접선", lessons:[
  { id:"conics", node:"h-geo", title:"이차곡선", formulas:["parabola-equation","ellipse-equation","hyperbola-equation","conic-tangent"],
    concept:["포물선 $y^2=4px$: 초점 (p, 0), 준선 $x=-p$. 초점까지 거리 = 준선까지 거리.","타원 $\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$ (a>b): 초점 $(\\pm c,0)$, $c^2=a^2-b^2$, 두 초점까지 거리의 합 2a.","쌍곡선 $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$: $c^2=a^2+b^2$, 거리의 차 2a, 점근선 $y=\\pm\\frac bax$.","접선: 포물선 $y_1y=2p(x+x_1)$, 타원 $\\frac{x_1x}{a^2}+\\frac{y_1y}{b^2}=1$."],
    why:"원뿔을 자르는 각도에 따라 원·타원·포물선·쌍곡선이 나옵니다(아폴로니오스). 행성 궤도(타원), 위성 안테나(포물선), 항법(쌍곡선)이 전부 이 곡선. 중3 포물선 $y=ax^2$ 이 '초점-준선' 정의로 다시 태어납니다.",
    pitfalls:["타원 $c^2=a^2-b^2$ 과 쌍곡선 $c^2=a^2+b^2$ 혼동.","긴 축이 y축 방향인 타원에서 초점을 x축에 둠."],
    points:["초점·준선 정의를 이용한 거리 최솟값","이차곡선과 직선의 접할 조건 (판별식)"],
    example:{q:"타원 $\\frac{x^2}{25}+\\frac{y^2}{9}=1$ 의 두 초점 사이의 거리는?",sol:["$c^2=25-9=16$ → $c=4$.","초점 (±4, 0) → 거리 8."],ans:"8"},
    quiz:[{q:"포물선 $y^2=8x$ 의 초점은?",opts:["(2,0)","(4,0)","(0,2)","(8,0)"],a:0,exp:"4p=8."},{q:"쌍곡선 $\\frac{x^2}{9}-\\frac{y^2}{16}=1$ 의 점근선은?",opts:["y=±(4/3)x","y=±(3/4)x","y=±x","y=±(9/16)x"],a:0,exp:"b/a."},{q:"타원 위의 점에서 두 초점까지 거리의 합이 10 이면 장축의 길이는?",opts:["5","10","20","25"],a:1,exp:"2a=10."}]}
 ]},
 { id:"h3u5", grade:"h3g", title:"평면벡터", desc:"벡터의 연산, 내적, 직선과 원의 벡터방정식", lessons:[
  { id:"vectors", node:"h-geo", title:"평면벡터와 내적", formulas:["vector-dot","vector-section-point","line-vector-equation","circle-vector-equation","normal-vector-line"],
    concept:["벡터: 크기와 방향. 덧셈(평행사변형), 실수배. 위치벡터로 점을 표현, 내분점 $\\frac{m\\vec b+n\\vec a}{m+n}$.","**내적** $\\vec a\\cdot\\vec b=|\\vec a||\\vec b|\\cos\\theta=a_1b_1+a_2b_2$. 수직 ⇔ 내적 0.","직선: $\\vec p=\\vec a+t\\vec d$ (방향벡터), 법선벡터 $\\vec n$: $\\vec n\\cdot(\\vec p-\\vec a)=0$.","원: $|\\vec p-\\vec c|=r$. 지름의 양 끝 A, B: $(\\vec p-\\vec a)\\cdot(\\vec p-\\vec b)=0$."],
    why:"힘·속도처럼 '방향이 있는 양' 을 다루려는 도구. 내적은 '같은 방향 성분의 곱' — 일(work)=힘·거리·cosθ 가 그 자체. 중3 삼각비의 cos 이 벡터의 각을 재는 자로 돌아옵니다.",
    pitfalls:["내적을 벡터로 착각 (내적은 **수**).","방향벡터와 법선벡터 혼동."],
    points:["두 벡터가 이루는 각 ($\\cos\\theta=\\frac{\\vec a\\cdot\\vec b}{|\\vec a||\\vec b|}$)","$|\\vec a+\\vec b|^2=|\\vec a|^2+2\\vec a\\cdot\\vec b+|\\vec b|^2$"],
    example:{q:"$\\vec a=(1,2)$, $\\vec b=(3,-1)$ 의 내적과 두 벡터가 이루는 각의 코사인 값은?",sol:["내적 $3-2=1$.","$\\cos\\theta=\\frac1{\\sqrt5\\sqrt{10}}=\\frac1{5\\sqrt2}=\\frac{\\sqrt2}{10}$."],ans:"1, √2/10"},
    quiz:[{q:"$\\vec a=(2,1)$, $\\vec b=(k,-4)$ 가 수직일 때 k 는?",opts:["2","−2","8","−8"],a:0,exp:"2k−4=0."},{q:"$|\\vec a|=2$, $|\\vec b|=3$, 각 60° 일 때 $\\vec a\\cdot\\vec b$ 는?",opts:["3","6","3√3","12"],a:0,exp:"2·3·1/2."},{q:"점 (1,2) 를 지나고 방향벡터 (3,−1) 인 직선의 방정식은?",opts:["(x−1)/3=(y−2)/(−1)","3(x−1)−(y−2)=0","(x−1)/(−1)=(y−2)/3","x+3y=7"],a:0,exp:"매개변수 소거."}]}
 ]},
 { id:"h3u6", grade:"h3g", title:"공간도형과 공간좌표", desc:"직선·평면의 위치 관계, 삼수선 정리, 정사영, 공간좌표와 구", lessons:[
  { id:"space", node:"h-geo", title:"공간도형과 공간좌표", formulas:["projection-area","space-distance","space-section-point","sphere-equation","box-diagonal"],
    concept:["직선과 평면의 수직: 평면 위 두 직선과 수직이면 평면과 수직. **삼수선 정리**.","이면각, 정사영: 넓이 $S'=S\\cos\\theta$.","공간좌표: 거리 $\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2+(z_2-z_1)^2}$, 내분점, 좌표평면 대칭.","구 $(x-a)^2+(y-b)^2+(z-c)^2=r^2$. 평면 $z=k$ 와의 교선은 원."],
    why:"중2 피타고라스를 세 번 쓰면 공간의 거리(중2 직육면체 대각선이 이미 그것). 정사영 $S\\cos\\theta$ 는 태양광 패널 각도·그림자 넓이의 식. 삼수선 정리는 중1 '위치 관계' 가 증명으로 완성된 것.",
    pitfalls:["정사영 넓이에서 각 θ 를 두 평면이 이루는 각이 아닌 다른 각으로 잡음.","구와 평면의 교선 원의 반지름: $\\sqrt{r^2-d^2}$ (중3 현의 길이와 같은 계산)."],
    points:["정육면체에서 두 평면이 이루는 각 (cos = 1/√3 등)","구가 xy평면에 접할 조건 |c|=r"],
    example:{q:"두 점 A(1,2,3), B(4,−2,3) 사이의 거리와, 선분 AB 를 1:2 로 내분하는 점을 구하시오.",sol:["거리 $\\sqrt{9+16+0}=5$.","내분점 $\\left(\\frac{4+2}3,\\frac{-2+4}3,3\\right)=(2,\\frac23,3)$."],ans:"5, (2, 2/3, 3)"},
    quiz:[{q:"구 $x^2+y^2+z^2-2x+4y-4=0$ 의 반지름은?",opts:["2","3","√5","4"],a:1,exp:"(x−1)²+(y+2)²+z²=9."},{q:"넓이 10 인 도형을 30° 기울어진 평면에 정사영한 넓이는?",opts:["5","5√3","10","20"],a:1,exp:"10cos30°."},{q:"점 (2,−3,5) 를 xy평면에 대칭이동한 점은?",opts:["(2,−3,−5)","(−2,3,5)","(2,3,5)","(−2,−3,−5)"],a:0,exp:"z 부호 반대."}]}
 ]}
);
