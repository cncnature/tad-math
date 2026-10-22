// 진단 문항: 개념 선후 순서대로 18문항. 처음 틀린 노드가 '끊긴 고리'.
// level: 'A' 중2-2 진단(1~9), 'B' 중3 진단(5~18), 'ALL' 전체
window.DATA = window.DATA || {};
window.DATA.diagnostic = [
 /* ---- 중1 · 중2-1 (band M1) ---- */
 { band:"M1", node:"primefactor", label:"소인수분해", q:"$2^3\\times3$ 의 약수의 개수는?", opts:["4","6","8","12"], a:2, exp:"(3+1)(1+1)=8." },
 { band:"M1", node:"integers", label:"정수와 유리수", q:"$(-2)^3-(-3)^2$ 의 값은?", opts:["1","−17","17","−1"], a:1, exp:"−8−9=−17." },
 { band:"M1", node:"polynomial", label:"문자와 식", q:"$3(x-2)-(2x+1)$ 을 간단히 하면?", opts:["x−7","x−5","5x−7","x+7"], a:0, exp:"3x−6−2x−1." },
 { band:"M1", node:"linear-eq", label:"일차방정식", q:"$\\frac{x}{2}+1=\\frac{x+5}{3}$ 의 해는?", opts:["2","4","5","6"], a:1, exp:"×6: 3x+6=2x+10." },
 { band:"M1", node:"proportion", label:"정비례·반비례", q:"$y=\\frac{a}{x}$ 가 점 (2, 6) 을 지날 때 a 는?", opts:["3","6","8","12"], a:3, exp:"6=a/2." },
 { band:"M1", node:"angles", label:"평행선과 각", q:"삼각형의 세 내각의 비가 1:2:3 일 때 가장 큰 각은?", opts:["60°","80°","90°","120°"], a:2, exp:"180×3/6." },
 { band:"M1", node:"polygon", label:"다각형·부채꼴", q:"반지름 6, 중심각 60° 인 부채꼴의 넓이는?", opts:["3π","6π","12π","36π"], a:1, exp:"36π×60/360." },
 { band:"M1", node:"linear-func", label:"일차함수", q:"두 점 (0, 3), (2, 7) 을 지나는 직선의 기울기는?", opts:["1","2","3","4"], a:1, exp:"(7−3)/(2−0)." },
 { band:"P", node:"polynomial", label:"식의 계산(선수)", q:"$(2x+3)-(x-5)$ 를 간단히 하면?", opts:["x+8","x−2","3x−2","x−8"], a:0, exp:"2x+3−x+5 = x+8." },
 { band:"P", node:"linear-eq", label:"일차방정식(선수)", q:"$3x-7=8$ 의 해는?", opts:["x=3","x=5","x=−5","x=15"], a:1, exp:"3x = 15." },
 { band:"P", node:"congruence", label:"삼각형의 합동(선수)", q:"두 삼각형이 합동이 되는 조건이 아닌 것은?", opts:["SSS","SAS","ASA","SSA"], a:3, exp:"SSA 는 합동 조건이 아닙니다." },
 { band:"A", node:"isosceles", label:"이등변삼각형", q:"AB=AC 인 △ABC 에서 ∠A=80° 일 때 ∠B 는?", opts:["40°","50°","80°","100°"], a:1, exp:"(180−80)/2 = 50°." },
 { band:"A", node:"centers", label:"외심·내심", q:"△ABC 의 내심을 I 라 하고 ∠A=40° 일 때 ∠BIC 는?", opts:["100°","110°","120°","140°"], a:1, exp:"90° + 40°/2 = 110°." },
 { band:"A", node:"quad", label:"사각형의 성질", q:"두 대각선의 길이가 같고 서로 수직이등분하는 사각형은?", opts:["직사각형","마름모","정사각형","평행사변형"], a:2, exp:"직사각형+마름모 = 정사각형." },
 { band:"A", node:"similar", label:"도형의 닮음", q:"△ABC 에서 DE∥BC, AD=2, DB=4, DE=3 일 때 BC 는?", opts:["6","9","12","4.5"], a:1, exp:"AD:AB = 2:6 = 1:3 → BC = 9." },
 { band:"A", node:"pythagoras", label:"피타고라스 정리", q:"빗변 13, 한 변 5 인 직각삼각형의 나머지 변은?", opts:["8","10","12","√194"], a:2, exp:"169−25 = 144." },
 { band:"A", node:"probability", label:"확률", q:"주사위 2 개를 던져 눈의 합이 7 일 확률은?", opts:["1/6","1/9","1/12","7/36"], a:0, exp:"6가지/36." },
 { band:"B", node:"sqrt", label:"제곱근과 실수", q:"$\\sqrt{48}-\\sqrt{12}$ 를 간단히 하면?", opts:["√36","2√3","4√3","6"], a:1, exp:"4√3 − 2√3 = 2√3." },
 { band:"B", node:"expansion", label:"곱셈 공식", q:"$(x+3)(x-3)$ 을 전개하면?", opts:["x²−6x+9","x²+9","x²−9","x²−6"], a:2, exp:"합차 공식." },
 { band:"B", node:"factoring", label:"인수분해", q:"$x^2+5x+6$ 을 인수분해하면?", opts:["(x+1)(x+6)","(x+2)(x+3)","(x−2)(x−3)","(x+5)(x+1)"], a:1, exp:"곱 6, 합 5 → 2, 3." },
 { band:"B", node:"quadratic-eq", label:"이차방정식", q:"$x^2-x-6=0$ 의 해는?", opts:["x=3 또는 x=−2","x=−3 또는 x=2","x=−1 또는 x=−6","x=1 또는 x=6"], a:0, exp:"(x−3)(x+2)=0." },
 { band:"B", node:"quadratic-func", label:"이차함수", q:"$y=(x-2)^2+3$ 의 꼭짓점은?", opts:["(2, 3)","(−2, 3)","(2, −3)","(−2, −3)"], a:0, exp:"y = a(x−p)²+q 의 꼭짓점 (p, q)." },
 { band:"B", node:"trig", label:"삼각비", q:"$\\sin 30^\\circ + \\cos 60^\\circ$ 의 값은?", opts:["1/2","1","√3","√3/2"], a:1, exp:"1/2 + 1/2." },
 { band:"B", node:"trig", label:"삼각비의 활용", q:"두 변이 4, 6 이고 끼인각 60° 인 삼각형의 넓이는?", opts:["6","6√3","12","12√3"], a:1, exp:"½·4·6·(√3/2) = 6√3." },
 { band:"B", node:"circle", label:"원의 성질", q:"호 AB 에 대한 중심각이 120° 일 때 원주각은?", opts:["30°","60°","120°","240°"], a:1, exp:"중심각의 절반." },
 { band:"B", node:"statistics", label:"통계", q:"자료 1, 2, 3, 4, 5 의 분산은?", opts:["1","2","√2","5"], a:1, exp:"평균 3, 편차² 4,1,0,1,4 → 합 10/5 = 2." },
 /* ---- 고1 (band H) ---- */
 { band:"H", node:"h-poly", label:"다항식·나머지정리", q:"$x^3+2x-1$ 을 $x-1$ 로 나눈 나머지는?", opts:["0","1","2","−1"], a:2, exp:"f(1)=1+2−1." },
 { band:"H", node:"h-complex", label:"복소수", q:"$(1+i)^2$ 의 값은?", opts:["0","2i","2","1+2i"], a:1, exp:"1+2i+i²." },
 { band:"H", node:"h-complex", label:"근과 계수의 관계", q:"$x^2-3x+1=0$ 의 두 근 α, β 에 대해 $\\alpha^2+\\beta^2$ 은?", opts:["5","7","9","11"], a:1, exp:"9−2." },
 { band:"H", node:"h-coord", label:"도형의 방정식", q:"점 (1, 2) 와 직선 $3x+4y-1=0$ 사이의 거리는?", opts:["1","2","3","10"], a:1, exp:"|3+8−1|/5." },
 { band:"H", node:"h-set", label:"집합과 명제", q:"$n(A)=10$, $n(B)=7$, $n(A\\cap B)=4$ 일 때 $n(A\\cup B)$ 는?", opts:["11","13","17","21"], a:1, exp:"10+7−4." },
 { band:"H", node:"h-func", label:"함수", q:"$f(x)=2x+1$ 의 역함수 $f^{-1}(5)$ 는?", opts:["1","2","3","11"], a:1, exp:"2x+1=5." }
];
