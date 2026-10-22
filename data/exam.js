// 중간·기말고사 전 훑기: 시험별로 '한 줄 체크' 목록. 체크 상태는 localStorage 에 저장.
// 학교마다 범위가 다르므로 단원 단위로 묶고, 각 줄은 lesson 링크를 가집니다.
window.DATA = window.DATA || {};
window.DATA.exam = [
 { id:"e22m", grade:"g22", title:"중2-2 중간고사", range:"삼각형의 성질 · 사각형의 성질", items:[
   { t:"이등변삼각형: 밑각 같다, 꼭지각 이등분선 ⊥ 밑변 (증명은 SAS 합동)", l:"isosceles" },
   { t:"직각삼각형 합동 RHA·RHS, 각의 이등분선 ↔ 두 변에서 같은 거리", l:"rha-rhs" },
   { t:"외심: 수직이등분선의 교점, OA=OB=OC, ∠BOC=2∠A, 직각삼각형은 빗변의 중점", l:"circumcenter" },
   { t:"내심: 각의 이등분선의 교점, ∠BIC=90°+½∠A, S=½r(a+b+c)", l:"incenter" },
   { t:"평행사변형 성질 3 + 되는 조건 5, 대각선으로 넓이 4등분", l:"parallelogram" },
   { t:"직사각형(대각선 길이 같음) · 마름모(대각선 수직) · 정사각형(둘 다) · 등변사다리꼴", l:"special-quads" },
   { t:"사각형 포함관계: 사다리꼴 ⊃ 평행사변형 ⊃ 직사각형·마름모 ⊃ 정사각형", l:"special-quads" }
 ]},
 { id:"e22f", grade:"g22", title:"중2-2 기말고사", range:"도형의 닮음 · 피타고라스 정리 · 확률", items:[
   { t:"닮음 조건 SSS·SAS·AA, 직각삼각형 빗변 수선: AB²=BD·BC", l:"similar" },
   { t:"DE∥BC ⇒ AD:AB=AE:AC=DE:BC, 각의 이등분선 AB:AC=BD:CD", l:"parallel-ratio" },
   { t:"중점연결정리 MN=½BC, 사다리꼴 중점선 (a+b)/2", l:"midsegment-centroid" },
   { t:"무게중심 2:1, 넓이 6등분", l:"midsegment-centroid" },
   { t:"닮음비 m:n → 넓이비 m²:n², 부피비 m³:n³, 축척", l:"similar-apply" },
   { t:"피타고라스 a²+b²=c², 역, 예각·직각·둔각 판별", l:"pythagoras" },
   { t:"정사각형 대각선 √2a, 정삼각형 높이 (√3/2)a, 직육면체 대각선 √(a²+b²+c²)", l:"pythagoras-apply" },
   { t:"합의 법칙·곱의 법칙, 한 줄 세우기, 대표 뽑기", l:"counting" },
   { t:"확률 0≤p≤1, 여사건 1−p ('적어도')", l:"probability" },
   { t:"확률의 덧셈(또는)·곱셈(그리고), 꺼낸 것을 다시 넣지 않는 경우", l:"prob-calc" }
 ]},
 { id:"e31m", grade:"g31", title:"중3-1 중간고사", range:"제곱근과 실수 · 다항식의 곱셈과 인수분해", items:[
   { t:"'a 의 제곱근' ±√a vs '제곱근 a' √a, √(a²)=|a|", l:"sqrt-basic" },
   { t:"무리수·실수, 정수 부분/소수 부분, 대소 비교(제곱·차)", l:"real-numbers" },
   { t:"√a√b=√(ab), √(a²b)=a√b, 분모의 유리화, 동류항처럼 덧셈", l:"radical-calc" },
   { t:"곱셈 공식 4개 + 변형 a²+b²=(a+b)²−2ab", l:"expansion" },
   { t:"인수분해: 공통인수 → 완전제곱 → 합차 → (x+a)(x+b) → 가위표", l:"factoring" },
   { t:"복잡한 식: 치환, 항 묶기(2항+2항), 인수분해 공식 응용 계산", l:"factoring" }
 ]},
 { id:"e31f", grade:"g31", title:"중3-1 기말고사", range:"이차방정식 · 이차함수", items:[
   { t:"이차방정식 풀이 3종: 인수분해(AB=0), 완전제곱식, 근의 공식", l:"quadratic-eq" },
   { t:"판별식 b²−4ac 로 근의 개수, 중근 조건", l:"quadratic-eq" },
   { t:"활용: 미지수 → 식 → 풀이 → 조건 확인(자연수·양수)", l:"quadratic-apply" },
   { t:"두 근이 α, β → x²−(α+β)x+αβ=0", l:"quadratic-apply" },
   { t:"y=ax²: 볼록 방향·폭, x축 대칭 y=−ax²", l:"quad-func-basic" },
   { t:"y=a(x−p)²+q 꼭짓점 (p,q), 축 x=p, 증가·감소 구간", l:"quad-func-basic" },
   { t:"일반형 → 완전제곱식, 꼭짓점 (−b/2a, c−b²/4a), x절편 = 이차방정식의 해", l:"quad-func-general" },
   { t:"a, b, c 부호와 그래프(볼록·축의 위치·y절편), 최댓값·최솟값", l:"quad-func-general" }
 ]},
 { id:"e32m", grade:"g32", title:"중3-2 중간고사", range:"삼각비 · 원의 성질(현·접선)", items:[
   { t:"sin·cos·tan 정의, 한 삼각비 → 나머지 구하기(피타고라스)", l:"trig-ratio" },
   { t:"특수각 30·45·60 표, 0°·90°, 삼각비의 표 읽기", l:"special-angles" },
   { t:"sin²A+cos²A=1, tanA=sinA/cosA, 각이 커질 때 증감", l:"trig-ratio" },
   { t:"활용: 높이·거리 (tan), 두 변과 끼인각 넓이 ½ab sinC, 사각형 ½pq sinx", l:"trig-apply" },
   { t:"현의 수직이등분선은 중심을 지남, 중심에서 같은 거리 → 현 길이 같음", l:"chord-tangent" },
   { t:"접선 ⊥ 반지름, 두 접선의 길이 같음, 삼각형 내접원과 접선 길이", l:"chord-tangent" }
 ]},
 { id:"e32f", grade:"g32", title:"중3-2 기말고사", range:"원주각 · 통계", items:[
   { t:"원주각 = ½중심각, 같은 호 → 같은 원주각, 반원 → 90°", l:"inscribed-angle" },
   { t:"호의 길이 ∝ 원주각", l:"inscribed-angle" },
   { t:"네 점이 한 원 위: ∠ACB=∠ADB / 내접사각형 대각의 합 180°, 외각=대각", l:"cyclic-quad" },
   { t:"접선과 현이 이루는 각 = 원주각", l:"cyclic-quad" },
   { t:"평균·중앙값·최빈값, 극단값이 있을 때 중앙값", l:"central" },
   { t:"편차 합 = 0, 분산 = 편차² 평균, 표준편차 = √분산, 자료 변환 시 변화", l:"dispersion" },
   { t:"사분위수·사분위수 범위, 상자그림 읽기", l:"boxplot-scatter" },
   { t:"산점도와 양·음의 상관관계, 상관은 인과가 아님", l:"boxplot-scatter" }
 ]}
];
