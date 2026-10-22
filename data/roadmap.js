// 개념 지도: 노드(개념)와 간선(선수 → 후속). 중1~중2-1 의 선수 개념은 'pre' 열에 배치.
window.DATA = window.DATA || {};
window.DATA.roadmap = {
  columns: [
    { id:"pre", label:"선수 개념 (중1~중2-1)" },
    { id:"g22", label:"중2-2" },
    { id:"g31", label:"중3-1" },
    { id:"g32", label:"중3-2" },
    { id:"next", label:"고1 로 이어짐" }
  ],
  nodes: [
    // 선수 개념
    { id:"congruence", col:"pre", label:"삼각형의 합동", strand:"geo", unit:null },
    { id:"angles", col:"pre", label:"평행선과 각", strand:"geo", unit:null },
    { id:"linear-eq", col:"pre", label:"일차방정식·연립", strand:"alg", unit:null },
    { id:"linear-func", col:"pre", label:"일차함수", strand:"alg", unit:null },
    { id:"polynomial", col:"pre", label:"식의 계산(지수법칙·다항식)", strand:"alg", unit:null },
    { id:"rational", col:"pre", label:"유리수와 순환소수", strand:"num", unit:null },
    { id:"ratio", col:"pre", label:"비와 비례식", strand:"num", unit:null },
    { id:"freq", col:"pre", label:"도수분포·상대도수", strand:"stat", unit:null },
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
    { id:"h-poly", col:"next", label:"다항식·나머지정리", strand:"alg", unit:null },
    { id:"h-complex", col:"next", label:"복소수·이차방정식", strand:"alg", unit:null },
    { id:"h-quadfunc", col:"next", label:"이차함수와 최대·최소", strand:"alg", unit:null },
    { id:"h-coord", col:"next", label:"도형의 방정식", strand:"geo", unit:null },
    { id:"h-trigfunc", col:"next", label:"삼각함수(수학Ⅰ)", strand:"geo", unit:null },
    { id:"h-prob", col:"next", label:"확률과 통계", strand:"stat", unit:null }
  ],
  edges: [
    ["congruence","isosceles"],["angles","isosceles"],["isosceles","centers"],["congruence","quad"],["angles","quad"],["isosceles","quad"],
    ["ratio","similar"],["congruence","similar"],["quad","similar"],
    ["similar","pythagoras"],["polynomial","pythagoras"],
    ["counting","probability"],["rational","probability"],
    ["rational","sqrt"],["pythagoras","sqrt"],
    ["polynomial","expansion"],["expansion","factoring"],["sqrt","quadratic-eq"],["factoring","quadratic-eq"],["linear-eq","quadratic-eq"],
    ["quadratic-eq","quadratic-func"],["linear-func","quadratic-func"],
    ["similar","trig"],["pythagoras","trig"],["sqrt","trig"],
    ["centers","circle"],["isosceles","circle"],["pythagoras","circle"],["trig","circle"],
    ["freq","statistics"],["probability","statistics"],
    ["expansion","h-poly"],["factoring","h-poly"],["quadratic-eq","h-complex"],["sqrt","h-complex"],["quadratic-func","h-quadfunc"],
    ["pythagoras","h-coord"],["circle","h-coord"],["quadratic-func","h-coord"],["trig","h-trigfunc"],["probability","h-prob"],["statistics","h-prob"]
  ]
};
