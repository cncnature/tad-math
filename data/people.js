// 수학 인물: 중2-2~중3-2 단원과 직접 연결되는 인물만.
window.DATA = window.DATA || {};
window.DATA.people = [
 { name:"탈레스", years:"기원전 624?~546?", node:"circle", body:"그리스 최초의 수학자로 불림. 반원에 대한 원주각이 직각임(탈레스의 정리)과 닮은 삼각형으로 피라미드의 높이를 잰 일화로 유명. 논리적 증명이라는 생각 자체를 수학에 들여왔다.", link:"inscribed-angle" },
 { name:"피타고라스", years:"기원전 570?~495?", node:"pythagoras", body:"'만물은 수'라고 믿은 학파의 지도자. 직각삼각형의 세 변 관계를 증명했다고 전해진다. 학파는 √2 가 분수로 표현되지 않음(무리수)을 발견하고 충격을 받았다.", link:"pythagoras" },
 { name:"히파수스", years:"기원전 5세기", node:"sqrt", body:"피타고라스 학파의 일원으로 √2 가 무리수임을 밝혔다고 전해진다. 비밀을 누설해 바다에 던져졌다는 전설이 있다. 실수 체계의 출발점.", link:"real-numbers" },
 { name:"유클리드", years:"기원전 300년경", node:"isosceles", body:"《원론》13권에 당시 기하학을 공리에서 출발해 체계적으로 정리. 이등변삼각형의 밑각 정리(1권 5), 피타고라스 정리(1권 47), 곱셈 공식의 넓이 증명(2권)이 모두 여기에 있다.", link:"isosceles" },
 { name:"아르키메데스", years:"기원전 287?~212", node:"centers", body:"지렛대와 무게중심을 연구해 삼각형의 무게중심이 중선을 2:1 로 나눔을 증명. 원의 넓이를 정다각형으로 근사해 π 의 범위(3.1408~3.1429)를 구했다.", link:"midsegment-centroid" },
 { name:"히파르코스", years:"기원전 190?~120?", node:"trig", body:"천문 관측을 위해 각에 대한 현의 길이 표(삼각비의 표의 원형)를 처음 만들었다. '삼각법의 아버지'.", link:"special-angles" },
 { name:"알콰리즈미", years:"780?~850?", node:"quadratic-eq", body:"《알자브르》에서 이차방정식을 완전제곱식으로 푸는 방법을 체계화. '알자브르(al-jabr)' 가 대수학(algebra), 이름이 알고리즘(algorithm)의 어원.", link:"quadratic-eq" },
 { name:"브라마굽타", years:"598~668", node:"quadratic-eq", body:"인도의 수학자. 0 과 음수의 연산 규칙을 정리했고, 근의 공식을 문장으로 서술했다. 원에 내접하는 사각형의 넓이 공식도 남겼다.", link:"quadratic-eq" },
 { name:"카르다노", years:"1501~1576", node:"quadratic-eq", body:"《위대한 술법》에서 삼차·사차방정식의 해법을 발표. 음수의 제곱근(허수)을 계산에 처음 사용 — 중3 '근이 없다' 가 고1 '허근' 으로 이어지는 지점.", link:"quadratic-eq" },
 { name:"데카르트", years:"1596~1650", node:"quadratic-func", body:"좌표를 도입해 도형을 식으로, 식을 도형으로 바꾸었다. 포물선을 y=ax² 으로 쓰고 그릴 수 있는 것은 그 덕분. 두 점 사이의 거리 공식도 좌표에서 나온다.", link:"quad-func-general" },
 { name:"갈릴레이", years:"1564~1642", node:"quadratic-func", body:"던진 물체가 포물선을 그림을 실험으로 밝혔다. 또한 생물의 크기와 뼈 굵기의 관계(제곱-세제곱 법칙)로 닮음의 넓이비·부피비를 설명했다.", link:"similar-apply" },
 { name:"파스칼", years:"1623~1662", node:"probability", body:"페르마와의 편지에서 도박의 판돈 나누기 문제를 풀며 확률론을 세웠다. 파스칼의 삼각형은 경우의 수(조합)와 곱셈 공식의 계수를 잇는다.", link:"probability" },
 { name:"페르마", years:"1607~1665", node:"probability", body:"파스칼과 함께 확률론의 창시자. 좌표기하도 데카르트와 독립적으로 발전시켰다. '여백이 부족하다' 는 마지막 정리로 유명.", link:"prob-calc" },
 { name:"오일러", years:"1707~1783", node:"centers", body:"삼각형의 외심·무게중심·수심이 한 직선(오일러 선) 위에 있음을 증명. 역사상 가장 많은 논문을 쓴 수학자.", link:"circumcenter" },
 { name:"가우스", years:"1777~1855", node:"statistics", body:"오차의 분포를 종 모양 곡선(정규분포)으로 설명하고 최소제곱법을 세웠다. 표준편차·분산이 왜 '제곱' 을 쓰는지의 이론적 근거.", link:"dispersion" },
 { name:"피어슨", years:"1857~1936", node:"statistics", body:"상관계수(r)와 표준편차라는 용어를 만든 현대 통계학의 창시자. 산점도의 '양의 상관·음의 상관' 을 수로 재는 방법.", link:"boxplot-scatter" },
 { name:"튜키", years:"1915~2000", node:"statistics", body:"상자그림(box plot)과 줄기-잎 그림을 고안. '비트(bit)' 라는 말도 만들었다. 탐색적 자료 분석(EDA)의 아버지.", link:"boxplot-scatter" },
 { name:"이상혁(조선 산학자)", years:"1810~?", node:"quadratic-eq", body:"조선 후기 산학자. 《산술관견》 등에서 방정식 풀이와 원에 내접·외접하는 도형 문제를 다뤘다. 한국 전통 수학(산학)이 방정식을 독자적으로 다룬 사례.", link:"quadratic-apply" }
];
