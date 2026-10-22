// 중1·중2-1·고1·고2·고3 — 개념 사전 / 암기 카드 / 시험 훑기 / 인물 / 공식이 태어나는 이야기.
// 기존 배열에 push 합니다 (index.html 에서 data/*.js 다음, js/app.js 이전에 로드).
(function(){
const D = window.DATA;

/* ---------------- 개념 사전 ---------------- */
D.concepts.push(
 // 중1-1
 {term:"소수(素數)",grade:"m11",node:"primefactor",def:"1 과 자기 자신만을 약수로 가지는 2 이상의 자연수. 2 는 유일한 짝수 소수. 1 은 소수가 아니다.",en:"prime number"},
 {term:"소인수분해",grade:"m11",node:"primefactor",def:"자연수를 소수의 곱으로 나타내는 것. 순서를 무시하면 방법은 오직 하나(산술의 기본정리).",en:"prime factorization"},
 {term:"최대공약수·최소공배수",grade:"m11",node:"primefactor",def:"공통 소인수의 작은 지수를 모으면 GCD, 모든 소인수의 큰 지수를 모으면 LCM. GCD × LCM = 두 수의 곱.",en:"GCD / LCM"},
 {term:"절댓값",grade:"m11",node:"integers",def:"수직선에서 0 까지의 거리. $|{-3}|=3$. 항상 0 이상이며 $|a|=|{-a}|$.",en:"absolute value"},
 {term:"유리수",grade:"m11",node:"integers",def:"두 정수의 비 $\\tfrac{a}{b}\\,(b\\neq0)$ 로 나타낼 수 있는 수. 정수·유한소수·순환소수가 모두 유리수.",en:"rational number"},
 {term:"항·계수·차수",grade:"m11",node:"polynomial",def:"$3x^2-5x+1$ 에서 항은 $3x^2,-5x,1$, $x^2$ 의 계수는 3, 차수는 2. 동류항은 문자와 차수가 같은 항.",en:"term / coefficient / degree"},
 {term:"방정식의 해",grade:"m11",node:"linear-eq",def:"방정식을 참이 되게 하는 미지수의 값. 등식의 성질(양변에 같은 수를 더하고 빼고 곱하고 0 아닌 수로 나누기)로 구한다.",en:"solution of an equation"},
 {term:"이항",grade:"m11",node:"linear-eq",def:"등식의 한 변의 항을 부호를 바꾸어 다른 변으로 옮기는 것. '양변에 같은 수를 더한다'의 줄임.",en:"transposition"},
 {term:"정비례·반비례",grade:"m11",node:"proportion",def:"$y=ax$ 이면 정비례(원점 지나는 직선), $y=\\tfrac{a}{x}$ 이면 반비례(두 개의 곡선, 축에 닿지 않음).",en:"direct / inverse proportion"},
 {term:"좌표평면",grade:"m11",node:"proportion",def:"두 수직선(x축, y축)을 원점에서 직교시킨 평면. 점은 순서쌍 (x, y) 로, 사분면은 반시계로 1~4.",en:"coordinate plane"},
 // 중1-2
 {term:"맞꼭지각",grade:"m12",node:"angles",def:"두 직선이 만날 때 마주 보는 각. 항상 크기가 같다 (둘 다 같은 각과 합이 180°).",en:"vertical angles"},
 {term:"동위각·엇각",grade:"m12",node:"angles",def:"평행선과 한 직선이 만날 때 같은 위치의 각이 동위각, 엇갈린 위치의 각이 엇각. 평행 ⇔ 동위각(엇각) 같음.",en:"corresponding / alternate angles"},
 {term:"작도",grade:"m12",node:"congruence",def:"눈금 없는 자와 컴퍼스만으로 도형을 그리는 것. 길이 옮기기·각 옮기기·수직이등분선이 기본.",en:"construction"},
 {term:"합동 조건",grade:"m12",node:"congruence",def:"삼각형은 SSS, SAS, ASA 중 하나면 합동. SSA·AAA 는 합동 조건이 아니다.",en:"congruence conditions"},
 {term:"다각형의 내각·외각",grade:"m12",node:"polygon",def:"n각형 내각의 합 $180°(n-2)$, 외각의 합은 항상 360°. 정n각형 한 외각 $=360°/n$.",en:"interior / exterior angles"},
 {term:"부채꼴",grade:"m12",node:"polygon",def:"두 반지름과 호로 둘러싸인 도형. 호의 길이와 넓이는 중심각에 정비례: $l=2\\pi r\\tfrac{x}{360}$, $S=\\pi r^2\\tfrac{x}{360}=\\tfrac12 rl$.",en:"sector"},
 {term:"다면체·회전체",grade:"m12",node:"solids",def:"다각형 면으로만 둘러싸인 입체가 다면체(각기둥·각뿔), 평면도형을 축 둘레로 돌린 입체가 회전체(원기둥·원뿔·구).",en:"polyhedron / solid of revolution"},
 {term:"오일러 공식(다면체)",grade:"m12",node:"solids",def:"꼭짓점 v, 모서리 e, 면 f 에 대해 $v-e+f=2$. 정다면체는 5가지뿐.",en:"Euler's formula"},
 {term:"도수분포표",grade:"m12",node:"freq",def:"자료를 계급으로 나누고 각 계급의 도수를 적은 표. 계급값은 계급의 중앙값, 상대도수 = 도수/전체.",en:"frequency table"},
 {term:"히스토그램",grade:"m12",node:"freq",def:"계급을 가로, 도수를 세로로 하는 붙은 막대그래프. 각 직사각형 윗변 중점을 이으면 도수분포다각형.",en:"histogram"},
 // 중2-1
 {term:"순환소수",grade:"m21",node:"rational",def:"소수점 아래 어떤 자리부터 같은 숫자 배열이 반복되는 무한소수. 모두 유리수. 분모의 소인수가 2,5 뿐이면 유한소수.",en:"repeating decimal"},
 {term:"지수법칙",grade:"m21",node:"polynomial",def:"$a^ma^n=a^{m+n}$, $(a^m)^n=a^{mn}$, $(ab)^n=a^nb^n$, $a^m\\div a^n=a^{m-n}$. 밑이 같아야 지수를 더한다.",en:"laws of exponents"},
 {term:"다항식의 곱셈·나눗셈",grade:"m21",node:"polynomial",def:"단항식 × 다항식은 분배법칙, 다항식 ÷ 단항식은 각 항을 나눈다. 계수끼리·문자끼리 따로 계산.",en:"polynomial multiplication"},
 {term:"부등식의 성질",grade:"m21",node:"linear-eq",def:"양변에 같은 수를 더하거나 빼도, 양수를 곱하거나 나눠도 부등호 그대로. 음수를 곱하거나 나누면 부등호 방향이 바뀐다.",en:"properties of inequalities"},
 {term:"연립방정식",grade:"m21",node:"linear-eq",def:"두 개 이상의 방정식을 동시에 만족하는 해. 가감법(더하거나 빼서 소거)·대입법으로 미지수 하나를 없앤다.",en:"system of equations"},
 {term:"일차함수의 기울기",grade:"m21",node:"linear-func",def:"$y=ax+b$ 에서 a. x 가 1 커질 때 y 의 변화량 = (y 변화량)/(x 변화량). 두 점이면 기울기가 정해진다.",en:"slope"},
 {term:"x절편·y절편",grade:"m21",node:"linear-func",def:"그래프가 x축과 만나는 점의 x좌표(y=0 대입), y축과 만나는 점의 y좌표(x=0 대입).",en:"x-intercept / y-intercept"},
 {term:"일차함수와 연립방정식",grade:"m21",node:"linear-func",def:"연립일차방정식의 해 = 두 직선의 교점. 기울기 다르면 해 1개, 평행이면 해 없음, 일치하면 무수히 많다.",en:"lines and systems"},
 // 고1 공통수학1
 {term:"조립제법",grade:"h11",node:"h-poly",def:"다항식을 $x-\\alpha$ 로 나눌 때 계수만 적어 몫과 나머지를 빠르게 구하는 방법. 마지막 칸이 나머지 $f(\\alpha)$.",en:"synthetic division"},
 {term:"나머지정리·인수정리",grade:"h11",node:"h-poly",def:"$f(x)$ 를 $x-\\alpha$ 로 나눈 나머지는 $f(\\alpha)$. $f(\\alpha)=0$ ⇔ $x-\\alpha$ 는 $f(x)$ 의 인수.",en:"remainder / factor theorem"},
 {term:"허수단위 i",grade:"h11",node:"h-complex",def:"$i^2=-1$ 인 수. 복소수 $a+bi$ (a 실수부, b 허수부). 켤레복소수 $a-bi$ 와의 곱은 $a^2+b^2$.",en:"imaginary unit"},
 {term:"판별식",grade:"h11",node:"h-complex",def:"$ax^2+bx+c=0$ 의 $D=b^2-4ac$. $D>0$ 서로 다른 두 실근, $D=0$ 중근, $D<0$ 서로 다른 두 허근.",en:"discriminant"},
 {term:"근과 계수의 관계",grade:"h11",node:"h-complex",def:"$ax^2+bx+c=0$ 의 두 근 α, β 에 대해 $\\alpha+\\beta=-\\tfrac{b}{a}$, $\\alpha\\beta=\\tfrac{c}{a}$. 근을 구하지 않고 대칭식의 값을 구한다.",en:"Vieta's formulas"},
 {term:"이차함수의 최대·최소",grade:"h11",node:"h-quadfunc",def:"꼭짓점에서 결정. 정의역이 제한되면 꼭짓점이 구간 안에 있는지 먼저 확인하고 양 끝값과 비교.",en:"max / min of quadratics"},
 {term:"순열 nPr",grade:"h11",node:"h-count",def:"서로 다른 n 개에서 r 개를 골라 순서 있게 나열: $_nP_r=\\tfrac{n!}{(n-r)!}$.",en:"permutation"},
 {term:"조합 nCr",grade:"h11",node:"h-count",def:"순서 없이 r 개 고르기: $_nC_r=\\tfrac{_nP_r}{r!}=\\tfrac{n!}{r!(n-r)!}$. $_nC_r={}_nC_{n-r}$.",en:"combination"},
 {term:"행렬",grade:"h11",node:"h-matrix",def:"수를 직사각형으로 배열한 것. 같은 꼴끼리 더하고, 곱은 (앞의 행)·(뒤의 열). 일반적으로 $AB\\neq BA$.",en:"matrix"},
 // 고1 공통수학2
 {term:"내분점",grade:"h12",node:"h-coord",def:"선분 AB 를 m:n 으로 나누는 점 $\\left(\\tfrac{mx_2+nx_1}{m+n},\\tfrac{my_2+ny_1}{m+n}\\right)$. 가까운 쪽에 큰 가중치.",en:"internal division point"},
 {term:"점과 직선 사이의 거리",grade:"h12",node:"h-coord",def:"점 $(x_1,y_1)$ 과 직선 $ax+by+c=0$ 의 거리 $\\tfrac{|ax_1+by_1+c|}{\\sqrt{a^2+b^2}}$. 원과 직선의 위치 관계에 쓴다.",en:"distance from point to line"},
 {term:"원의 방정식",grade:"h12",node:"h-coord",def:"중심 (a,b), 반지름 r: $(x-a)^2+(y-b)^2=r^2$. 일반형은 완전제곱으로 고쳐 중심·반지름을 읽는다.",en:"equation of a circle"},
 {term:"평행이동·대칭이동",grade:"h12",node:"h-coord",def:"x축으로 a, y축으로 b 평행이동은 $x\\to x-a,\\ y\\to y-b$. x축 대칭 $y\\to-y$, y축 대칭 $x\\to-x$, 원점 대칭 둘 다, $y=x$ 대칭은 x,y 교환.",en:"translation / reflection"},
 {term:"집합의 연산",grade:"h12",node:"h-set",def:"합집합 ∪, 교집합 ∩, 여집합 $A^c$, 차집합 $A-B=A\\cap B^c$. 드모르간: $(A\\cup B)^c=A^c\\cap B^c$.",en:"set operations"},
 {term:"명제·역·대우",grade:"h12",node:"h-set",def:"'p 이면 q' 의 역은 'q 이면 p', 대우는 '~q 이면 ~p'. 명제와 대우는 참·거짓이 같다.",en:"converse / contrapositive"},
 {term:"충분조건·필요조건",grade:"h12",node:"h-set",def:"p ⇒ q 이면 p 는 q 이기 위한 충분조건, q 는 p 이기 위한 필요조건. 양쪽 다면 필요충분조건.",en:"sufficient / necessary condition"},
 {term:"절대부등식",grade:"h12",node:"h-set",def:"문자가 어떤 실수여도 항상 성립하는 부등식. $a^2+b^2\\ge2ab$, $\\tfrac{a+b}{2}\\ge\\sqrt{ab}\\ (a,b>0)$, 등호는 $a=b$.",en:"absolute inequality"},
 {term:"합성함수·역함수",grade:"h12",node:"h-func",def:"$(g\\circ f)(x)=g(f(x))$: 안쪽부터. 역함수 $f^{-1}$ 는 일대일대응일 때만 존재, 그래프는 $y=x$ 대칭.",en:"composite / inverse function"},
 {term:"유리함수",grade:"h12",node:"h-func",def:"$y=\\tfrac{k}{x-p}+q$: 점근선 $x=p,\\ y=q$. 분수식은 (분자)÷(분모) 로 나누어 이 꼴로 만든다.",en:"rational function"},
 {term:"무리함수",grade:"h12",node:"h-func",def:"$y=\\sqrt{a(x-p)}+q$: 시작점 (p,q), a>0 이면 오른쪽으로. 정의역은 근호 안 ≥ 0.",en:"radical function"},
 // 고2 대수
 {term:"거듭제곱근",grade:"h2a",node:"h-explog",def:"n제곱해서 a 가 되는 수. $a>0$ 이면 $\\sqrt[n]{a}=a^{1/n}$ 로 지수를 유리수·실수까지 넓힌다.",en:"n-th root"},
 {term:"로그",grade:"h2a",node:"h-explog",def:"$a^x=N\\ \\Leftrightarrow\\ x=\\log_aN$ (a>0, a≠1, N>0). 지수의 역. $\\log_a(MN)=\\log_aM+\\log_aN$.",en:"logarithm"},
 {term:"상용로그",grade:"h2a",node:"h-explog",def:"밑이 10 인 로그. 정수부분(지표)은 자릿수를, 소수부분(가수)은 숫자 배열을 알려 준다.",en:"common logarithm"},
 {term:"호도법",grade:"h2a",node:"h-trigfunc",def:"호의 길이 / 반지름 으로 각을 재는 법. $180°=\\pi$ rad. 부채꼴 $l=r\\theta$, $S=\\tfrac12r^2\\theta$.",en:"radian measure"},
 {term:"삼각함수의 주기",grade:"h2a",node:"h-trigfunc",def:"$y=a\\sin(bx+c)+d$: 진폭 |a|, 주기 $2\\pi/|b|$, 최댓값 d+|a|. $\\tan$ 의 주기는 $\\pi/|b|$.",en:"period of trigonometric functions"},
 {term:"사인법칙·코사인법칙",grade:"h2a",node:"h-trigfunc",def:"$\\tfrac{a}{\\sin A}=2R$, $a^2=b^2+c^2-2bc\\cos A$. 두 변과 끼인각 → 코사인, 두 각과 한 변 → 사인.",en:"law of sines / cosines"},
 {term:"등차수열·등비수열",grade:"h2a",node:"h-seq",def:"일정하게 더하면 등차 $a_n=a+(n-1)d$, 일정하게 곱하면 등비 $a_n=ar^{n-1}$. 합 공식은 '거꾸로 더하기', '곱해서 빼기'.",en:"arithmetic / geometric sequence"},
 {term:"시그마 Σ",grade:"h2a",node:"h-seq",def:"$\\sum_{k=1}^{n}a_k=a_1+\\cdots+a_n$. 선형성: 상수 밖으로, 합은 나눠서. $\\sum k=\\tfrac{n(n+1)}{2}$.",en:"sigma notation"},
 {term:"수학적 귀납법",grade:"h2a",node:"h-seq",def:"n=1 에서 참이고, n=k 참 ⇒ n=k+1 참이면 모든 자연수에서 참. 도미노 쓰러뜨리기.",en:"mathematical induction"},
 // 고2 미적분Ⅰ
 {term:"극한값",grade:"h2c",node:"h-calc",def:"x 가 a 에 한없이 가까워질 때 f(x) 가 다가가는 값 $\\lim_{x\\to a}f(x)$. 함숫값과 다를 수 있고, 좌극한=우극한이어야 존재.",en:"limit"},
 {term:"연속",grade:"h2c",node:"h-calc",def:"$f(a)$ 가 존재하고 $\\lim_{x\\to a}f(x)=f(a)$. 닫힌구간에서 연속이면 최대·최소가 있고(최대최소정리) 중간값을 모두 지난다(사잇값정리).",en:"continuity"},
 {term:"미분계수",grade:"h2c",node:"h-calc",def:"$f'(a)=\\lim_{h\\to0}\\tfrac{f(a+h)-f(a)}{h}$: x=a 에서 접선의 기울기 = 순간변화율.",en:"derivative at a point"},
 {term:"도함수",grade:"h2c",node:"h-calc",def:"각 x 에 미분계수를 대응시킨 함수 $f'(x)$. $(x^n)'=nx^{n-1}$, $(fg)'=f'g+fg'$.",en:"derivative function"},
 {term:"극대·극소",grade:"h2c",node:"h-calc",def:"$f'$ 의 부호가 +→− 로 바뀌면 극대, −→+ 면 극소. $f'(a)=0$ 만으로는 극값이 아닐 수 있다 ($x^3$).",en:"local maximum / minimum"},
 {term:"부정적분·정적분",grade:"h2c",node:"h-calc",def:"미분의 역이 부정적분 ($+C$). 정적분 $\\int_a^bf(x)dx=F(b)-F(a)$ 는 넓이(부호 있음).",en:"indefinite / definite integral"},
 // 고2 확률과 통계
 {term:"원순열",grade:"h2p",node:"h-prob",def:"n 개를 원형으로 배열: $(n-1)!$. 회전하면 같은 것은 하나로 센다.",en:"circular permutation"},
 {term:"중복조합",grade:"h2p",node:"h-prob",def:"서로 다른 n 종류에서 중복 허용 r 개: $_nH_r={}_{n+r-1}C_r$. 칸막이 (n−1) 개와 공 r 개 나열.",en:"combination with repetition"},
 {term:"조건부확률",grade:"h2p",node:"h-prob",def:"$P(B|A)=\\tfrac{P(A\\cap B)}{P(A)}$: A 가 일어났다는 조건에서 B 의 확률. 표본공간이 A 로 줄어든다.",en:"conditional probability"},
 {term:"독립사건",grade:"h2p",node:"h-prob",def:"$P(A\\cap B)=P(A)P(B)$, 즉 $P(B|A)=P(B)$. '배반'(동시에 안 일어남)과 다르다.",en:"independent events"},
 {term:"확률변수·확률분포",grade:"h2p",node:"h-prob",def:"시행 결과에 수를 대응시킨 변수 X. $E(X)=\\sum x_ip_i$, $V(X)=E(X^2)-\\{E(X)\\}^2$.",en:"random variable"},
 {term:"이항분포 B(n,p)",grade:"h2p",node:"h-prob",def:"성공 확률 p 인 독립시행 n 번의 성공 횟수. 평균 np, 분산 np(1−p). n 크면 정규분포로 근사.",en:"binomial distribution"},
 {term:"정규분포·표준화",grade:"h2p",node:"h-prob",def:"종 모양 $N(m,\\sigma^2)$. $Z=\\tfrac{X-m}{\\sigma}$ 로 바꾸면 $N(0,1)$ 표를 쓴다.",en:"normal distribution"},
 {term:"신뢰구간",grade:"h2p",node:"h-prob",def:"표본평균 $\\bar x$ 로 모평균을 추정: 95% 신뢰구간 $\\bar x\\pm1.96\\tfrac{\\sigma}{\\sqrt n}$. 표본 크기 4배 → 구간 길이 절반.",en:"confidence interval"},
 // 고3 미적분Ⅱ
 {term:"급수",grade:"h3c",node:"h-calc2",def:"수열의 무한합 $\\sum a_n=\\lim S_n$. 수렴하면 $a_n\\to0$ 이지만 역은 거짓 ($\\sum\\tfrac1n$ 발산).",en:"series"},
 {term:"등비급수",grade:"h3c",node:"h-calc2",def:"$|r|<1$ 일 때 $\\sum ar^{n-1}=\\tfrac{a}{1-r}$. 순환소수를 분수로 바꾸는 것도 등비급수.",en:"geometric series"},
 {term:"자연상수 e",grade:"h3c",node:"h-calc2",def:"$\\lim_{n\\to\\infty}(1+\\tfrac1n)^n\\approx2.718$. $(e^x)'=e^x$ 가 되게 하는 유일한 밑.",en:"Euler's number"},
 {term:"합성함수의 미분(연쇄법칙)",grade:"h3c",node:"h-calc2",def:"$\\{f(g(x))\\}'=f'(g(x))\\,g'(x)$: 바깥 미분 × 안쪽 미분.",en:"chain rule"},
 {term:"치환적분·부분적분",grade:"h3c",node:"h-calc2",def:"치환: 안쪽 함수를 t 로, $dx$ 도 바꾼다. 부분: $\\int uv'=uv-\\int u'v$ (미분하면 간단해지는 것을 u 로).",en:"substitution / integration by parts"},
 {term:"회전체의 부피",grade:"h3c",node:"h-calc2",def:"x축 둘레 회전: $V=\\pi\\int_a^b\\{f(x)\\}^2dx$. 얇은 원판 $\\pi r^2\\,dx$ 를 쌓는다.",en:"volume of revolution"},
 // 고3 기하
 {term:"포물선·타원·쌍곡선",grade:"h3g",node:"h-geo",def:"초점과 준선까지 거리가 같음(포물선), 두 초점까지 거리의 합 일정(타원), 차 일정(쌍곡선). 원뿔을 자른 단면.",en:"conic sections"},
 {term:"벡터",grade:"h3g",node:"h-geo",def:"크기와 방향을 가진 양. 성분 $(a_1,a_2)$ 로 쓰면 덧셈·실수배는 성분끼리.",en:"vector"},
 {term:"내적",grade:"h3g",node:"h-geo",def:"$\\vec a\\cdot\\vec b=|\\vec a||\\vec b|\\cos\\theta=a_1b_1+a_2b_2$. 0 이면 수직. 결과는 수(스칼라).",en:"dot product"},
 {term:"정사영",grade:"h3g",node:"h-geo",def:"도형을 평면에 수직으로 비춘 그림자. 넓이 $S'=S\\cos\\theta$ (θ 는 두 평면이 이루는 각).",en:"orthogonal projection"},
 {term:"삼수선의 정리",grade:"h3g",node:"h-geo",def:"평면 밖의 점 P 에서 평면에 내린 수선의 발 O, 평면 위 직선 l 에 내린 수선의 발 H 에 대해 $OH\\perp l$ ⇔ $PH\\perp l$.",en:"theorem of three perpendiculars"},
 {term:"공간좌표·구",grade:"h3g",node:"h-geo",def:"점 (x,y,z). 거리 $\\sqrt{\\Delta x^2+\\Delta y^2+\\Delta z^2}$. 구 $(x-a)^2+(y-b)^2+(z-c)^2=r^2$.",en:"space coordinates / sphere"}
);

/* ---------------- 암기 카드 (기억 장치) ---------------- */
D.recall.push(
 {f:"divisor-count",mnemonic:"'지수에 1 씩 더해서 곱한다' — 각 소인수를 0개부터 지수개까지 고르는 경우의 수.",story:"고대 그리스는 '완전수'(약수의 합이 자기 자신: 6, 28)를 찾느라 약수를 세는 법을 다듬었다."},
 {f:"sign-rules",mnemonic:"'친구의 적은 적, 적의 적은 친구' — 음×음 = 양.",story:"음수의 곱이 양수라는 규칙은 17세기까지도 논쟁거리였다. 빚(−) 을 빚(−) 으로 갚는다는 비유로 설득했다."},
 {f:"triangle-angle-sum",mnemonic:"꼭짓점 하나를 지나는 평행선을 그으면 세 각이 일직선(180°)에 모인다.",story:"유클리드 『원론』 1권 32번 명제. 평행선 공준이 없으면 이 정리도 없다 — 구면에서는 180° 보다 크다."},
 {f:"circle-area",mnemonic:"원을 부채꼴로 잘게 잘라 번갈아 붙이면 가로 πr, 세로 r 인 직사각형 → πr².",story:"아르키메데스는 원의 넓이가 '반지름이 높이, 둘레가 밑변인 삼각형' 과 같음을 증명했다."},
 {f:"solid-volume",mnemonic:"뿔은 기둥의 ⅓ — 물을 세 번 부어야 찬다. 구는 원기둥의 ⅔.",story:"아르키메데스는 구와 외접 원기둥의 부피비 2:3 을 가장 자랑스러워해 묘비에 새겨 달라 했다."},
 {f:"exponent-rules",mnemonic:"곱하면 더하고, 거듭하면 곱하고, 나누면 뺀다 — 지수는 '개수' 다.",story:"지수 표기는 데카르트(1637)가 정착시켰다. 그 전에는 '세제곱' 을 'cubus' 라고 말로 썼다."},
 {f:"inequality-sign-flip",mnemonic:"음수를 곱하면 수직선이 뒤집힌다 → 부등호도 뒤집힌다.",story:"부등호 < > 는 1631년 해리엇의 책에서 처음 쓰였다. 당시에는 '더 크다' 를 말로 적었다."},
 {f:"linear-function",mnemonic:"기울기는 '오르는 정도', 절편은 '출발 높이'. y = (오름)·x + (출발).",story:"'기울기' 를 수로 다루기 시작한 것은 데카르트와 페르마가 좌표를 발명한 뒤의 일이다."},
 {f:"remainder-theorem",mnemonic:"'x−α 로 나눈 나머지는 α 를 넣으면 나온다' — 나누기 대신 대입.",story:"18세기 베주(Bézout)가 정리로 세웠다. 조립제법은 1819년 루피니·호너가 다듬었다."},
 {f:"vieta",mnemonic:"'합은 −b/a, 곱은 c/a' — 합에만 마이너스.",story:"비에트(1540~1603)는 변호사이자 암호 해독가였다. 문자로 계수를 쓴 최초의 '대수학자'."},
 {f:"permutation-combination",mnemonic:"P 는 줄 세우기, C 는 뽑기만. C = P ÷ r! (순서 r! 가지를 하나로).",story:"파스칼의 삼각형은 중국(양휘, 1261)과 페르시아에서 파스칼보다 수백 년 먼저 알려져 있었다."},
 {f:"point-line-distance",mnemonic:"'식에 점을 넣은 절댓값 ÷ 계수의 피타고라스' — |ax₁+by₁+c| / √(a²+b²).",story:"분모 √(a²+b²) 는 법선벡터 (a,b) 의 길이. 고3 벡터에서 이 공식이 왜 그런지 한 줄로 설명된다."},
 {f:"am-gm",mnemonic:"'더해서 반, 곱해서 루트' — 산술 ≥ 기하, 등호는 둘이 같을 때.",story:"정사각형이 같은 둘레의 직사각형 중 넓이가 가장 큰 이유. 고대부터 알려진 '등주 문제' 의 축소판."},
 {f:"log-rules",mnemonic:"곱은 합으로, 나눗셈은 차로, 거듭제곱은 앞으로 — 로그는 곱셈을 덧셈으로 바꾸는 기계.",story:"네이피어(1614)가 천문학자들의 계산 시간을 줄이려 20년 걸려 만들었다. 라플라스: '천문학자의 수명을 두 배로 늘렸다'."},
 {f:"cosine-law",mnemonic:"'피타고라스 − 2bc cosA' — A 가 90° 면 cos 항이 0 이 되어 피타고라스.",story:"유클리드 『원론』 2권에 이미 기하 형태로 있었다. 삼각함수로 쓴 것은 15세기 이후."},
 {f:"arithmetic-sum",mnemonic:"'(첫 항 + 끝 항) × 개수 ÷ 2' — 앞뒤로 짝지으면 전부 같은 합.",story:"어린 가우스가 1부터 100까지 합을 101×50=5050 으로 순식간에 구한 일화."},
 {f:"geometric-sum",mnemonic:"'r 배 해서 빼라' — S − rS = a − arⁿ.",story:"체스판 쌀알 전설: 한 칸에 1알, 다음 칸은 두 배… 64칸이면 2⁶⁴−1 알 ≈ 1845경."},
 {f:"derivative-power",mnemonic:"'지수가 앞으로 내려오고 하나 줄어든다' — xⁿ → n·xⁿ⁻¹.",story:"뉴턴은 '유율(fluxion)', 라이프니츠는 dy/dx 라 불렀다. 누가 먼저냐는 싸움이 수십 년 갔다."},
 {f:"fundamental-theorem",mnemonic:"'넓이의 변화율은 높이' — 적분을 미분하면 원래 함수. 그래서 ∫ₐᵇ f = F(b) − F(a).",story:"뉴턴의 스승 배로가 거의 도달했고, 뉴턴·라이프니츠가 '미분과 적분은 서로 역' 임을 정리로 세웠다."},
 {f:"conditional-probability",mnemonic:"'조건이 새 전체' — P(B|A) = (둘 다) ÷ (조건 A).",story:"베이즈(1763)는 이 식을 뒤집어 '결과를 보고 원인의 확률' 을 구했다. 스팸 필터의 원리."},
 {f:"normal-standardization",mnemonic:"'평균 빼고 표준편차로 나눠' Z = (X−m)/σ — 모든 종을 하나의 종으로.",story:"가우스가 측정 오차의 분포로 발견. 표준정규분포표 한 장이면 모든 정규분포를 다룬다."},
 {f:"chain-rule",mnemonic:"'겉 미분 × 속 미분' — 양파 껍질 벗기듯 바깥부터.",story:"라이프니츠 기호로 쓰면 dy/dx = (dy/du)(du/dx): 분수처럼 약분되는 것처럼 보여 외우기 쉽다."},
 {f:"integration-by-parts",mnemonic:"'미분하기 쉬운 것을 u, 적분하기 쉬운 것을 v′' — LIATE(로그·역삼각·대수·삼각·지수) 순으로 u.",story:"곱의 미분법 (uv)′ = u′v + uv′ 을 양변 적분해서 옮긴 것뿐이다."},
 {f:"vector-dot",mnemonic:"'길이 × 길이 × cos' = '성분끼리 곱해 더하기'. 수직이면 0.",story:"해밀턴(1843)의 사원수에서 내적·외적이 갈라져 나왔다. 깁스가 지금 모양으로 정리."},
 {f:"ellipse-equation",mnemonic:"'두 못에 실을 걸고 연필을 당겨 그린 곡선' — 거리의 합 = 2a.",story:"케플러(1609)는 행성 궤도가 원이 아니라 태양을 한 초점으로 하는 타원임을 밝혔다."}
);

/* ---------------- 시험 전 훑기 ---------------- */
D.exam.push(
 {id:"e11m",grade:"m11",title:"중1-1 중간고사",range:"소인수분해 · 정수와 유리수",items:[
  {t:"소수 판별(1 은 소수 아님), 소인수분해는 유일, 약수의 개수 = (지수+1) 의 곱",l:"prime-factor"},
  {t:"최대공약수(공통 소인수의 작은 지수) · 최소공배수(모든 소인수의 큰 지수), GCD×LCM = 두 수의 곱",l:"gcd-lcm"},
  {t:"수직선·절댓값·대소 비교: 음수는 절댓값 클수록 작다",l:"integers"},
  {t:"정수의 사칙연산 부호 규칙, 분배법칙, 역수 곱하기로 나눗셈",l:"int-ops"}]},
 {id:"e11f",grade:"m11",title:"중1-1 기말고사",range:"문자와 식 · 일차방정식 · 좌표평면과 그래프",items:[
  {t:"곱셈 기호 생략 규칙, 대입, 동류항 정리, 일차식의 계산",l:"expressions"},
  {t:"등식의 성질 → 이항, 괄호·분수·소수 계수 정리 후 ax=b",l:"linear-eq"},
  {t:"활용: 거리·속력·시간, 농도, 나이, 개수 — 표로 정리하고 등식 세우기",l:"linear-eq-apply"},
  {t:"순서쌍·사분면 부호, 정비례 y=ax (원점 직선) · 반비례 y=a/x (쌍곡선)",l:"coord-graph"}]},
 {id:"e12m",grade:"m12",title:"중1-2 중간고사",range:"기본 도형 · 평면도형",items:[
  {t:"맞꼭지각 같음, 평행선 ↔ 동위각·엇각 같음, 꺾인 점에 보조 평행선",l:"angles"},
  {t:"작도 3종(길이·각·수직이등분선), 합동 조건 SSS·SAS·ASA",l:"construction-congruence"},
  {t:"내각 합 180°(n−2), 외각 합 360°, 대각선 개수 n(n−3)/2",l:"polygon"},
  {t:"부채꼴 호·넓이 ∝ 중심각, S = ½rl",l:"circle-sector"}]},
 {id:"e12f",grade:"m12",title:"중1-2 기말고사",range:"입체도형 · 자료의 정리와 해석",items:[
  {t:"다면체·정다면체 5종, 회전체 단면(축에 수직: 원 / 축 포함: 대칭도형)",l:"solids"},
  {t:"기둥 부피 = 밑넓이×높이, 뿔 = ⅓, 구 = 4/3πr³, 구 겉넓이 4πr², 원뿔 옆넓이 πrl",l:"solids"},
  {t:"도수분포표·계급값·상대도수, 히스토그램 넓이 = 계급 크기 × 도수 합",l:"freq"}]},
 {id:"e21",grade:"m21",title:"중2-1 중간·기말",range:"순환소수 · 식의 계산 · 부등식 · 연립방정식 · 일차함수",items:[
  {t:"유한소수 조건(기약분수 분모의 소인수 2,5 뿐), 순환소수 → 분수 (10ⁿ 배 빼기)",l:"repeating"},
  {t:"지수법칙 4가지, (−a)² 와 −a² 구별, 밑이 다르면 못 더함",l:"exponent"},
  {t:"다항식 곱셈·나눗셈, 식의 값, 등식의 변형",l:"polynomial-calc"},
  {t:"부등식: 음수로 나누면 방향 반전, 수직선에 해 표시(빈 점/찬 점)",l:"inequality"},
  {t:"가감법·대입법, 해가 없는 경우(평행)·무수히 많은 경우(일치)",l:"system"},
  {t:"기울기 = Δy/Δx, 절편, 두 점 → 식, 평행·일치 조건",l:"linear-func"},
  {t:"일차함수와 연립방정식의 그래프, 활용(온도·요금·물탱크)",l:"linear-func-apply"}]},
 {id:"eh11",grade:"h11",title:"고1 공통수학1 전 범위",range:"다항식 · 방정식과 부등식 · 경우의 수 · 행렬",items:[
  {t:"곱셈공식 (a+b)³, a³±b³, (a+b+c)², 나머지정리·인수정리·조립제법",l:"poly-ops"},
  {t:"복소수 상등·켤레·i 의 주기, 판별식, 근과 계수의 관계 (α+β, αβ)",l:"complex"},
  {t:"이차함수 최대·최소(구간 제한), 이차부등식 해 = 그래프가 축 위/아래인 구간",l:"h-quadfunc"},
  {t:"삼차·사차(치환·인수정리), 연립이차방정식(일차식 대입), 절댓값 방정식",l:"various-eq"},
  {t:"합·곱의 법칙, nPr·nCr, 특정 조건(이웃·안 이웃·적어도)",l:"perm-comb"},
  {t:"행렬 덧셈·실수배·곱셈(행×열), AB≠BA, 단위행렬",l:"matrix"}]},
 {id:"eh12",grade:"h12",title:"고1 공통수학2 전 범위",range:"도형의 방정식 · 집합과 명제 · 함수",items:[
  {t:"거리·내분점·무게중심, 직선의 방정식(기울기·두 점), 평행 m 같음·수직 mm′=−1, 점-직선 거리",l:"point-line"},
  {t:"원의 방정식 표준형·일반형, 원과 직선 위치관계(d 와 r), 접선의 방정식",l:"circle-eq"},
  {t:"평행이동 x→x−a, 대칭이동(x축·y축·원점·y=x)",l:"transform"},
  {t:"집합 연산·드모르간·포함배제, 부분집합 2ⁿ",l:"sets"},
  {t:"명제 역·대우, 충분·필요조건, 절대부등식(산술기하평균, 코시)",l:"logic"},
  {t:"합성함수·역함수(일대일대응, y=x 대칭), 유리함수 점근선, 무리함수 시작점",l:"functions"}]},
 {id:"eh2a",grade:"h2a",title:"고2 대수 전 범위",range:"지수·로그 · 삼각함수 · 수열",items:[
  {t:"거듭제곱근·유리수 지수, 로그 정의·성질·밑변환, 상용로그 지표·가수",l:"exp-log"},
  {t:"지수·로그함수 그래프(점근선·증감), 방정식·부등식은 밑 1 기준 방향",l:"exp-log-func"},
  {t:"호도법, 단위원 정의, 주기·진폭·평행이동, 삼각방정식 해의 개수는 그래프 교점",l:"trig-func"},
  {t:"사인법칙(외접원 2R), 코사인법칙, 삼각형 넓이 ½bc sinA",l:"sine-cosine-law"},
  {t:"등차·등비 일반항과 합, 합에서 일반항 aₙ=Sₙ−Sₙ₋₁ (n≥2, a₁=S₁)",l:"sequences"},
  {t:"Σ 공식 3개, 부분분수·귀납적 정의, 수학적 귀납법 두 단계",l:"sigma-induction"}]},
 {id:"eh2c",grade:"h2c",title:"고2 미적분Ⅰ 전 범위",range:"극한과 연속 · 미분 · 적분",items:[
  {t:"극한 계산(약분·유리화·최고차항), 좌극한=우극한, 연속 조건 3개, 사잇값정리",l:"limits"},
  {t:"미분계수 정의, 다항함수 미분, 곱의 미분, 접선의 방정식(접점/기울기/외부점)",l:"derivative"},
  {t:"증감표·극값·최대최소, 방정식 실근 개수 = 그래프 교점, 속도·가속도",l:"derivative-apply"},
  {t:"부정적분(+C), 정적분 기본정리, 넓이(위−아래, x축 교점 나눠서), 속도→거리",l:"integral"}]},
 {id:"eh2p",grade:"h2p",title:"고2 확률과 통계 전 범위",range:"경우의 수 · 확률 · 통계",items:[
  {t:"원순열 (n−1)!, 중복순열 nʳ, 같은 것 있는 순열 n!/(p!q!), 중복조합 ₙHᵣ, 이항정리",l:"adv-counting"},
  {t:"조건부확률, 곱셈정리, 독립 ⇔ P(A∩B)=P(A)P(B), 독립시행 $_nC_xp^xq^{n-x}$",l:"cond-prob"},
  {t:"확률변수 E, V, σ, 일차변환 E(aX+b)=aE+b, V(aX+b)=a²V, 이항분포 np·npq",l:"distributions"},
  {t:"정규분포 표준화, 표본평균 N(m, σ²/n), 신뢰구간 ±1.96σ/√n (95%), ±2.58 (99%)",l:"estimation"}]},
 {id:"eh3c",grade:"h3c",title:"고3 미적분Ⅱ 전 범위",range:"급수 · 미분법 · 적분법",items:[
  {t:"수열의 극한(최고차항·유리화·샌드위치), 등비급수 수렴 |r|<1, 합 a/(1−r)",l:"series"},
  {t:"e 의 정의, $(e^x)'=e^x$, $(\\ln x)'=1/x$, 삼각함수 미분, 연쇄법칙, 몫의 미분, 음함수·매개변수 미분",l:"adv-derivative"},
  {t:"치환적분·부분적분, 삼각·지수·로그 적분, 급수→정적분, 넓이·회전체 부피",l:"adv-integral"}]},
 {id:"eh3g",grade:"h3g",title:"고3 기하 전 범위",range:"이차곡선 · 평면벡터 · 공간도형과 공간좌표",items:[
  {t:"포물선(초점·준선), 타원(합 2a, c²=a²−b²), 쌍곡선(차 2a, 점근선), 접선의 방정식",l:"conics"},
  {t:"벡터 덧셈·실수배·성분, 내적 |a||b|cosθ = 성분 곱의 합, 수직 ⇔ 내적 0, 직선·원의 벡터방정식",l:"vectors"},
  {t:"직선·평면 위치관계, 삼수선의 정리, 정사영 S cosθ, 공간좌표 거리·구의 방정식",l:"space"}]}
);

/* ---------------- 수학 인물 ---------------- */
D.people.push(
 {name:"에라토스테네스",years:"기원전 276?~194?",node:"primefactor",link:"prime-factor",born:-276,body:"소수를 걸러내는 '체(sieve)' 를 고안했다. 2 의 배수, 3 의 배수… 를 차례로 지우면 소수만 남는다. 지구 둘레를 그림자 각도로 잰 것으로도 유명하다."},
 {name:"유클리드 (호제법)",years:"기원전 300?",node:"primefactor",link:"gcd-lcm",born:-300,body:"『원론』 7권의 '호제법': 큰 수를 작은 수로 나눈 나머지로 다시 나누기를 반복하면 최대공약수가 나온다. 2300년 된 이 알고리즘이 지금도 컴퓨터 암호 계산에 쓰인다."},
 {name:"브라마굽타 (0과 음수)",years:"598~668",node:"integers",link:"int-ops",born:598,body:"0 과 음수의 연산 규칙(빚과 재산)을 처음 체계적으로 적었다. '빚 × 빚 = 재산' 이 곧 (−)×(−)=(+)."},
 {name:"디오판토스",years:"200?~284?",node:"linear-eq",link:"linear-eq",born:200,body:"『산수론』에서 미지수를 기호로 쓰고 방정식을 풀었다. 그의 묘비명은 일차방정식 문제: '인생의 1/6 은 소년, 1/12 은 청년…' → 84세."},
 {name:"플라톤 (정다면체)",years:"기원전 427?~347?",node:"solids",link:"solids",born:-427,body:"정다면체가 5개뿐임을 알고 불·흙·공기·물·우주에 대응시켰다. 각 꼭짓점에 모이는 각의 합이 360° 미만이어야 한다는 것이 이유."},
 {name:"존 그란트",years:"1620~1674",node:"freq",link:"freq",born:1620,body:"런던의 사망 기록을 표로 정리해 통계학의 문을 열었다. '자료를 계급으로 나누어 세는' 도수분포의 시작."},
 {name:"르네 데카르트 (지수·좌표)",years:"1596~1650",node:"polynomial",link:"exponent",born:1596,body:"$x^3$ 처럼 지수를 위에 작게 쓰는 표기를 정착시켰고, 좌표평면으로 기하와 대수를 하나로 묶었다."},
 {name:"라파엘 봄벨리",years:"1526~1572",node:"h-complex",link:"complex",born:1526,body:"삼차방정식 풀이에 나오는 '음수의 제곱근' 을 피하지 않고 계산 규칙을 세워 복소수의 길을 열었다."},
 {name:"프랑수아 비에트",years:"1540~1603",node:"h-complex",link:"vieta",born:1540,body:"계수를 문자로 쓴 최초의 수학자. 근과 계수의 관계(비에트 정리)로 '근을 구하지 않고 근에 대해 말하기' 가 가능해졌다."},
 {name:"아서 케일리",years:"1821~1895",node:"h-matrix",link:"matrix",born:1821,body:"행렬을 독립된 수학 대상으로 세우고 곱셈 규칙과 역행렬을 정리했다. 변호사로 14년 일하며 논문 250편을 썼다."},
 {name:"게오르크 칸토어",years:"1845~1918",node:"h-set",link:"sets",born:1845,body:"집합론의 창시자. 무한에도 크기가 있어 자연수보다 실수가 '더 많다' 는 것을 대각선 논법으로 증명했다."},
 {name:"존 네이피어",years:"1550~1617",node:"h-explog",link:"exp-log",born:1550,body:"로그를 발명해 곱셈을 덧셈으로 바꾸었다. 20년의 계산 끝에 1614년 로그표를 출판, 천문학·항해 계산을 혁명적으로 줄였다."},
 {name:"레온하르트 오일러 (e, 삼각함수)",years:"1707~1783",node:"h-explog",link:"exp-log-func",born:1707,body:"기호 e, π, i, f(x), Σ 를 지금 모양으로 쓰게 한 사람. $e^{i\\pi}+1=0$ 으로 지수와 삼각함수를 잇는다."},
 {name:"카를 프리드리히 가우스 (등차수열)",years:"1777~1855",node:"h-seq",link:"sequences",born:1777,body:"열 살에 1+2+…+100 을 (1+100)×50 으로 구했다는 일화. 정수론·통계·전자기학까지 '수학의 왕자'."},
 {name:"아이작 뉴턴",years:"1643~1727",node:"h-calc",link:"derivative",born:1643,body:"운동을 설명하려 미분(유율법)을 만들었다. 속도는 위치의 변화율, 가속도는 속도의 변화율 — 미적분은 물리학의 언어가 되었다."},
 {name:"고트프리트 라이프니츠",years:"1646~1716",node:"h-calc",link:"integral",born:1646,body:"$\\tfrac{dy}{dx}$, $\\int$ 기호를 만들었다. 지금 우리가 쓰는 미적분 표기는 거의 라이프니츠의 것."},
 {name:"야코프 베르누이",years:"1655~1705",node:"h-prob",link:"cond-prob",born:1655,body:"『추측술』에서 큰 수의 법칙을 증명했다. 이항분포의 시행을 '베르누이 시행' 이라 부른다. e 의 극한 정의도 그의 것."},
 {name:"토머스 베이즈",years:"1701~1761",node:"h-prob",link:"cond-prob",born:1701,body:"조건부확률을 뒤집어 '결과로부터 원인의 확률' 을 구하는 베이즈 정리. 오늘날 스팸 필터·의료 진단·AI 의 기반."},
 {name:"아브라암 드무아브르",years:"1667~1754",node:"h-prob",link:"distributions",born:1667,body:"이항분포가 n 이 커지면 종 모양(정규분포)에 가까워짐을 처음 보였다. 가우스보다 70년 앞선다."},
 {name:"오귀스탱 코시",years:"1789~1857",node:"h-calc2",link:"series",born:1789,body:"극한과 수렴을 엄밀하게 정의해 미적분을 흔들리지 않는 기초 위에 올렸다. 급수의 수렴 판정법이 그의 이름을 달고 있다."},
 {name:"베른하르트 리만",years:"1826~1866",node:"h-calc2",link:"adv-integral",born:1826,body:"정적분을 '잘게 자른 직사각형 합의 극한(리만 합)' 으로 정의했다. 리만 기하는 아인슈타인 일반상대성이론의 언어가 되었다."},
 {name:"아폴로니우스",years:"기원전 262?~190?",node:"h-geo",link:"conics",born:-262,body:"원뿔을 평면으로 잘라 포물선·타원·쌍곡선을 하나의 가족으로 다뤘고 이름도 지었다. 1800년 뒤 케플러가 행성 궤도에 썼다."},
 {name:"요하네스 케플러",years:"1571~1630",node:"h-geo",link:"conics",born:1571,body:"행성은 태양을 한 초점으로 하는 타원 궤도를 돈다(제1법칙). 아폴로니우스의 순수 기하가 우주의 법칙이 된 순간."},
 {name:"윌리엄 해밀턴",years:"1805~1865",node:"h-geo",link:"vectors",born:1805,body:"사원수를 발명하다 떠오른 공식을 더블린의 다리에 새겼다는 일화. 여기서 내적과 외적, 그리고 '벡터' 라는 말이 나왔다."}
);
// 시대순 정렬 (years 의 첫 숫자, 기원전은 음수)
const yr=p=>{ if(p.born!=null) return p.born; const m=(p.years||"").match(/\d+/); const v=m?+m[0]:9999; return /기원전/.test(p.years)?-v:v; };
D.people.sort((a,b)=>yr(a)-yr(b));

/* ---------------- 공식이 태어나는 이야기 (새 학년 소단원에 추가) ---------------- */
const STORY = {
 "prime-factor":[
  {h:"수의 '원자' 를 찾다",t:"고대 그리스 사람들은 '모든 수는 더 작은 수의 곱으로 쪼개진다, 그런데 어디까지?' 를 물었다. 2, 3, 5, 7 처럼 더는 쪼개지지 않는 수가 있었고 그것을 **소수**라 불렀다."},
  {h:"쪼개는 방법은 하나뿐",t:"12 = 2·6 = 3·4 로 시작은 달라도 끝까지 쪼개면 2·2·3 으로 똑같다. 유클리드가 증명한 이 사실(산술의 기본정리)이 있어서 소인수분해를 '수의 신분증' 처럼 쓸 수 있다."},
  {h:"약수를 세는 법이 공식이 되다",t:"2²·3 의 약수는 2 를 0, 1, 2 개 중 고르고(3가지) 3 을 0, 1 개 중 고르면(2가지) 된다. 그래서 (2+1)(1+1) = 6 개. '지수에 1 씩 더해 곱한다' 는 공식은 이렇게 **경우의 수**에서 나왔다."}],
 "linear-eq":[
  {h:"천칭 저울",t:"방정식의 '=' 는 저울이 수평인 상태다. 양쪽 접시에 같은 것을 올리거나 내려도 수평은 그대로다. 등식의 성질은 저울의 성질이다."},
  {h:"알콰리즈미의 '옮기기'",t:"9세기 바그다드의 알콰리즈미는 'al-jabr(복원)' 이라는 말로 '한쪽의 빼는 항을 반대쪽에 더하는 항으로 옮기기' 를 설명했다. 이 단어가 **algebra(대수)** 가 되었고, 우리가 배우는 **이항**이 바로 그것이다."},
  {h:"x 하나만 남기기",t:"괄호를 풀고, 분모를 없애고, x 항은 왼쪽 상수는 오른쪽으로 옮기면 ax = b. 마지막에 a 로 나누면 끝. 방정식 풀이는 '저울을 정리해 x 만 남기는 일' 이다."}],
 "angles":[
  {h:"세 각을 한 줄에 모으기",t:"삼각형의 세 각을 찢어 한 점에 모으면 일직선이 된다 — 종이로 해 보면 늘 그렇다. 하지만 '늘 그렇다' 와 '왜 그런가' 는 다르다."},
  {h:"평행선 하나가 증명이 된다",t:"꼭짓점 C 를 지나 밑변 AB 에 평행한 선을 그으면, 엇각이 같아서 ∠A 와 ∠B 가 C 옆에 그대로 옮겨 온다. 세 각이 직선 위에 나란히 → 180°. 평행선의 성질이 곧 삼각형의 성질을 낳는다."},
  {h:"공준 하나에 매달린 180°",t:"이 증명은 '평행선은 하나뿐' 이라는 유클리드의 다섯째 공준에 기댄다. 지구 표면처럼 휜 곳에서는 평행선이 없고, 삼각형의 각의 합은 180° 를 넘는다. 180° 는 **평평한 세상의 법칙**이다."}],
 "linear-func":[
  {h:"변화를 수로 적다",t:"물이 1분에 2 L 씩 차고 처음에 5 L 있었다면 t 분 뒤 물의 양은 2t + 5. '매분 얼마' 가 기울기 a, '처음 얼마' 가 절편 b. 일차함수 y = ax + b 는 **일정한 속도의 변화**를 적는 문장이다."},
  {h:"왜 직선인가",t:"x 가 1 늘 때마다 y 가 항상 a 만큼 는다. 어디서 재도 오르는 비율이 같으니 점들은 한 줄로 선다. 반대로 비율이 바뀌면(이차함수) 휘어진다."},
  {h:"두 점이면 충분",t:"직선은 두 점으로 정해진다. 그래서 기울기 = (y 의 차)/(x 의 차) 를 두 점에서 계산하면 식이 나온다. 그래프를 그릴 때 절편 두 개만 찍는 것도 같은 이유."}],
 "remainder":[
  {h:"나눗셈을 하지 않고 나머지 알기",t:"f(x) 를 x − 3 으로 나누면 f(x) = (x−3)Q(x) + R. 이 식은 모든 x 에서 성립하니 x = 3 을 넣어 보자. (x−3) 이 0 이 되어 f(3) = R. **나누지 않고 대입 한 번**으로 나머지가 나온다."},
  {h:"나머지가 0 이면 인수",t:"f(3) = 0 이면 R = 0, 즉 f(x) = (x−3)Q(x). x − 3 이 f(x) 를 나누어떨어지게 하는 **인수**다. 삼차·사차식의 인수분해는 'f(α) = 0 인 α 찾기' 부터 시작한다."},
  {h:"조립제법: 계수만 적는 나눗셈",t:"몫 Q(x) 까지 필요하면 계수만 적어 내려가는 조립제법을 쓴다. 맨 끝 칸이 나머지 f(α) 와 같음을 확인해 보면 두 방법이 하나임이 보인다."}],
 "circle-eq":[
  {h:"원은 '같은 거리' 의 집합",t:"컴퍼스를 꽂은 점이 중심, 벌린 길이가 반지름. 원 위의 모든 점은 중심에서 r 만큼 떨어져 있다. 좌표로 쓰면 거리 공식 그대로: √((x−a)²+(y−b)²) = r."},
  {h:"제곱해서 근호를 지우다",t:"양변을 제곱하면 (x−a)² + (y−b)² = r². 전개하면 x² + y² + Ax + By + C = 0 꼴 — 이것을 보고 다시 완전제곱식으로 묶으면 중심과 반지름이 되살아난다."},
  {h:"원과 직선: 거리 하나로 판정",t:"직선이 원과 만나는지는 중심에서 직선까지의 거리 d 와 r 의 크기 비교로 끝난다. 점-직선 거리 공식이 여기서 쓰이려고 바로 앞 단원에 있다."}],
 "exp-log":[
  {h:"곱셈이 너무 오래 걸리던 시대",t:"16세기 천문학자들은 7자리 수의 곱셈을 하루 종일 했다. 네이피어는 '지수끼리는 더하면 된다' 는 지수법칙에 주목했다: 2³ × 2⁵ = 2⁸. 수를 모두 '어떤 밑의 몇 제곱' 으로 바꿔 두면 곱셈이 덧셈이 된다."},
  {h:"로그 = 지수를 읽는 기계",t:"8 = 2³ 에서 '3' 을 꺼내 주는 것이 log₂8. 그래서 log(MN) = logM + logN 은 지수법칙 $a^m\\cdot a^n=a^{m+n}$ 을 그대로 번역한 것이다. 로그의 성질은 전부 지수법칙의 거울상."},
  {h:"지수함수와 로그함수는 y = x 대칭",t:"$y=2^x$ 의 x 와 y 를 바꾸면 $x=2^y$, 즉 $y=\\log_2x$. 역함수이므로 그래프는 y = x 에 대칭이고, 지수함수가 (0,1) 을 지나면 로그함수는 (1,0) 을 지난다."}],
 "derivative":[
  {h:"속도계가 가리키는 것",t:"자동차가 2시간에 120 km 를 갔다면 평균 속력 60 km/h. 하지만 속도계는 '지금 이 순간' 의 속력을 보여 준다. 순간을 어떻게 재는가 — 뉴턴과 라이프니츠의 질문이었다."},
  {h:"시간 간격을 0 으로 보내기",t:"짧은 시간 h 동안의 평균 변화율 {f(a+h) − f(a)}/h 를 구하고, h 를 한없이 0 에 가깝게 보낸다. 그 극한이 **미분계수** f′(a). 그래프에서는 두 점을 잇는 할선이 접선으로 바뀌는 순간이다."},
  {h:"xⁿ 의 미분이 nxⁿ⁻¹ 인 이유",t:"(x+h)ⁿ 을 전개하면 xⁿ + n·xⁿ⁻¹h + (h² 이상의 항). xⁿ 을 빼고 h 로 나누면 n·xⁿ⁻¹ + (h 가 남은 항) → h→0 에서 n·xⁿ⁻¹. 지수가 앞으로 내려오는 공식은 이항전개의 둘째 항에서 온다."}],
 "cond-prob":[
  {h:"정보가 생기면 확률이 바뀐다",t:"주사위 눈이 짝수라는 것을 알았다면 '6 이 나올 확률' 은 1/6 이 아니라 1/3. 가능한 세계가 {2,4,6} 으로 줄었기 때문이다. 조건부확률은 **표본공간을 줄이는 것**이다."},
  {h:"공식은 '줄어든 전체로 나누기'",t:"P(B|A) = P(A∩B)/P(A). 분모가 1 이 아니라 P(A) 인 것은 A 가 새 전체가 되었기 때문. 양변에 P(A) 를 곱하면 곱셈정리 P(A∩B) = P(A)P(B|A) — 확률 나무의 가지를 따라 곱하는 규칙."},
  {h:"뒤집으면 베이즈",t:"검사가 양성(결과)일 때 실제 병(원인)일 확률은? P(병|양성) = P(양성|병)P(병)/P(양성). 원인→결과의 확률로 결과→원인의 확률을 구한다. 의료 진단, 스팸 필터, AI 가 모두 이 한 줄 위에 서 있다."}],
 "vectors":[
  {h:"크기만으로는 부족한 양",t:"'바람이 10 m/s' 만으로는 돛을 못 편다. 어느 쪽으로 부는지가 필요하다. 크기와 방향을 함께 가진 양 — 힘, 속도, 변위 — 를 화살표로 그린 것이 벡터다."},
  {h:"내적: 같은 방향 성분만 세기",t:"힘 F 로 물체를 s 만큼 끌 때 한 일은 F 의 '이동 방향 성분' × 거리 = |F||s|cosθ. 각도가 90° 면 일이 0. 이 물리량이 내적 a·b = |a||b|cosθ 의 출생지다."},
  {h:"성분으로 쓰면 코사인법칙",t:"a = (a₁,a₂), b = (b₁,b₂) 에서 |a−b|² 를 코사인법칙으로 쓰고 전개하면 |a||b|cosθ = a₁b₁ + a₂b₂. 각도를 몰라도 성분 곱의 합으로 내적이 나오고, 거꾸로 각도를 구할 수 있다."}]
};
(D.curriculumExtra||[]).flatMap(x=>x.units||x).forEach(u=>u.lessons.forEach(l=>{ if(STORY[l.id]&&!l.story) l.story=STORY[l.id]; }));
})();
