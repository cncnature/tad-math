// 개념 지도: 중1 ~ 고3. 노드(개념)와 간선(선수 → 후속). col 은 columns 의 id.
window.DATA = window.DATA || {};
window.DATA.roadmap = {
  columns: [
    { id:"m1", label:"중1" }, { id:"m21", label:"중2-1" }, { id:"g22", label:"중2-2" }, { id:"g31", label:"중3-1" }, { id:"g32", label:"중3-2" },
    { id:"h1", label:"고1 공통수학" }, { id:"h2", label:"고2 대수·미적분Ⅰ·확통" }, { id:"h3", label:"고3 미적분Ⅱ·기하" }
  ],
  nodes: [
    // 중1
    { id:"primefactor", col:"m1", label:"소인수분해", strand:"num", unit:"m1u1" },
    { id:"integers", col:"m1", label:"정수와 유리수", strand:"num", unit:"m1u2" },
    { id:"polynomial", col:"m1", label:"문자와 식·식의 계산", strand:"alg", unit:"m1u3" },
    { id:"linear-eq", col:"m1", label:"일차방정식·부등식·연립", strand:"alg", unit:"m1u4" },
    { id:"proportion", col:"m1", label:"좌표평면·정비례·반비례", strand:"alg", unit:"m1u5" },
    { id:"angles", col:"m1", label:"평행선과 각", strand:"geo", unit:"m1u6" },
    { id:"congruence", col:"m1", label:"작도와 합동", strand:"geo", unit:"m1u6" },
    { id:"polygon", col:"m1", label:"다각형·원과 부채꼴", strand:"geo", unit:"m1u7" },
    { id:"solids", col:"m1", label:"입체도형", strand:"geo", unit:"m1u8" },
    { id:"freq", col:"m1", label:"도수분포·상대도수", strand:"stat", unit:"m1u9" },
    // 중2-1
    { id:"rational", col:"m21", label:"유리수와 순환소수", strand:"num", unit:"m2u1" },
    { id:"linear-func", col:"m21", label:"일차함수", strand:"alg", unit:"m2u5" },
    // 중2-2
    { id:"isosceles", col:"g22", label:"이등변·직각삼각형", strand:"geo", unit:"u1" },
    { id:"centers", col:"g22", label:"외심과 내심", strand:"geo", unit:"u1" },
    { id:"quad", col:"g22", label:"사각형의 성질", strand:"geo", unit:"u2" },
    { id:"similar", col:"g22", label:"도형의 닮음", strand:"geo", unit:"u3" },
    { id:"pythagoras", col:"g22", label:"피타고라스 정리", strand:"geo", unit:"u4" },
    { id:"counting", col:"g22", label:"경우의 수", strand:"stat", unit:"u5" },
    { id:"probability", col:"g22", label:"확률", strand:"stat", unit:"u5" },
    // 중3-1
    { id:"sqrt", col:"g31", label:"제곱근과 실수", strand:"num", unit:"u6" },
    { id:"expansion", col:"g31", label:"곱셈 공식", strand:"alg", unit:"u7" },
    { id:"factoring", col:"g31", label:"인수분해", strand:"alg", unit:"u7" },
    { id:"quadratic-eq", col:"g31", label:"이차방정식", strand:"alg", unit:"u8" },
    { id:"quadratic-func", col:"g31", label:"이차함수", strand:"alg", unit:"u9" },
    // 중3-2
    { id:"trig", col:"g32", label:"삼각비", strand:"geo", unit:"u10" },
    { id:"circle", col:"g32", label:"원의 성질", strand:"geo", unit:"u11" },
    { id:"statistics", col:"g32", label:"대푯값·산포도·상관관계", strand:"stat", unit:"u12" },
    // 고1
    { id:"h-poly", col:"h1", label:"다항식·나머지정리", strand:"alg", unit:"h1u1" },
    { id:"h-complex", col:"h1", label:"복소수·방정식", strand:"alg", unit:"h1u2" },
    { id:"h-quadfunc", col:"h1", label:"이차함수·부등식", strand:"alg", unit:"h1u2" },
    { id:"h-count", col:"h1", label:"순열과 조합", strand:"stat", unit:"h1u3" },
    { id:"h-matrix", col:"h1", label:"행렬", strand:"alg", unit:"h1u4" },
    { id:"h-coord", col:"h1", label:"도형의 방정식", strand:"geo", unit:"h1u5" },
    { id:"h-set", col:"h1", label:"집합과 명제", strand:"num", unit:"h1u6" },
    { id:"h-func", col:"h1", label:"함수·유리·무리함수", strand:"alg", unit:"h1u7" },
    // 고2
    { id:"h-explog", col:"h2", label:"지수·로그함수", strand:"alg", unit:"h2u1" },
    { id:"h-trigfunc", col:"h2", label:"삼각함수", strand:"geo", unit:"h2u2" },
    { id:"h-seq", col:"h2", label:"수열", strand:"alg", unit:"h2u3" },
    { id:"h-calc", col:"h2", label:"극한·미분·적분(Ⅰ)", strand:"alg", unit:"h2u5" },
    { id:"h-prob", col:"h2", label:"확률과 통계", strand:"stat", unit:"h2u7" },
    // 고3
    { id:"h-calc2", col:"h3", label:"급수·미적분Ⅱ", strand:"alg", unit:"h3u2" },
    { id:"h-geo", col:"h3", label:"이차곡선·벡터·공간", strand:"geo", unit:"h3u4" }
  ],
  edges: [
    // 중1 내부·중2-1
    ["primefactor","integers"],["integers","polynomial"],["polynomial","linear-eq"],["linear-eq","proportion"],["integers","rational"],["proportion","linear-func"],["linear-eq","linear-func"],["polynomial","linear-func"],
    ["angles","polygon"],["angles","congruence"],["polygon","solids"],
    // 중2-2
    ["congruence","isosceles"],["angles","isosceles"],["isosceles","centers"],["congruence","quad"],["angles","quad"],["isosceles","quad"],
    ["proportion","similar"],["congruence","similar"],["quad","similar"],["similar","pythagoras"],["polynomial","pythagoras"],
    ["counting","probability"],["rational","probability"],["freq","probability"],
    // 중3
    ["rational","sqrt"],["pythagoras","sqrt"],["polynomial","expansion"],["expansion","factoring"],["sqrt","quadratic-eq"],["factoring","quadratic-eq"],["linear-eq","quadratic-eq"],
    ["quadratic-eq","quadratic-func"],["linear-func","quadratic-func"],["similar","trig"],["pythagoras","trig"],["sqrt","trig"],
    ["centers","circle"],["isosceles","circle"],["pythagoras","circle"],["trig","circle"],["freq","statistics"],["probability","statistics"],
    // 고1
    ["expansion","h-poly"],["factoring","h-poly"],["quadratic-eq","h-complex"],["sqrt","h-complex"],["h-poly","h-complex"],["quadratic-func","h-quadfunc"],["h-complex","h-quadfunc"],
    ["counting","h-count"],["pythagoras","h-coord"],["circle","h-coord"],["quadratic-func","h-coord"],["linear-func","h-coord"],["h-quadfunc","h-coord"],
    ["probability","h-set"],["linear-func","h-func"],["proportion","h-func"],["h-quadfunc","h-func"],["linear-eq","h-matrix"],
    // 고2
    ["expansion","h-explog"],["h-func","h-explog"],["trig","h-trigfunc"],["circle","h-trigfunc"],["h-coord","h-trigfunc"],["h-poly","h-seq"],["h-count","h-seq"],
    ["h-quadfunc","h-calc"],["h-func","h-calc"],["h-seq","h-calc"],["h-count","h-prob"],["statistics","h-prob"],["h-set","h-prob"],
    // 고3
    ["h-seq","h-calc2"],["h-calc","h-calc2"],["h-explog","h-calc2"],["h-trigfunc","h-calc2"],["h-coord","h-geo"],["h-trigfunc","h-geo"],["solids","h-geo"]
  ]
};
