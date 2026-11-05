// 데이터 수정 오버레이 — 큰 콘텐츠 파일을 건드리지 않고 '덧씌우기' 로 고친다. 사이트·check.js·브리핑이 로드 뒤 자동 적용(js/merge.js).
// 쓰임: 오타·수치 정정, 성취기준 코드 확정(추정→확인), 학기 배치·단원 순서(order)·교과서 표기(tb) 변경, 잘못된 차시 숨기기(hide). 주간 자동 조사와 사람이 모두 이 파일만 고치면 된다.
// 형식: lessons:{"<차시 id>":{필드…}}, units:{"<단원 id>":{order, tb, title, grade, exam…}}, hide:["id"], log:[{date, what, why, src}]
window.DATA = window.DATA || {};
window.DATA.overrides = {
 "lessons": {},
 "units": {
  "kor-lit": {
   "order": 1.5,
   "tb": "천재(노미숙) 2-2 1단원 (1) 문학, 시대의 거울"
  },
  "kor-read": {
   "order": 2.5,
   "tb": "천재(노미숙) 2-2 2단원 (1) 설명·논증 + 4단원 (1) 복합양식 읽기"
  },
  "kor-gram": {
   "order": 3.5,
   "tb": "천재(노미숙) 2-2 3단원 (1) 음운 — 음운 변동은 심화"
  },
  "kor-write": {
   "order": 90,
   "tb": "천재 2-2 미수록 (다른 학기·교과서 범위)"
  },
  "eng-c5": {
   "order": 1,
   "tb": "천재(소영순) L5·L6·L7 / 천재(이상기) L5"
  },
  "eng-conj": {
   "order": 2,
   "tb": "천재(소영순) L5 간접의문문 / 천재(이상기) L6 so~that·L8 if"
  },
  "eng-cmp": {
   "order": 3,
   "tb": "천재(소영순) L7 가주어 It / 천재(이상기) L8 가주어·L6 수동태 — 비교급은 심화"
  },
  "eng-rel": {
   "order": 4,
   "tb": "천재(소영순) L8 목적격 관계대명사 / 천재(이상기) L7"
  },
  "eng-read": {
   "order": 5,
   "tb": "독해·서술형 공통"
  },
  "eng-g22-chunjae": {
   "order": 5.5
  },
  "sci-plant-energy": {
   "order": 1,
   "tb": "미래엔 과학 2 Ⅴ 식물과 에너지 (약 p.172~189)"
  },
  "sci-animal-energy": {
   "order": 2,
   "tb": "미래엔 과학 2 Ⅵ 동물과 에너지 (약 p.202~231)"
  },
  "sci-electric": {
   "order": 3,
   "tb": "미래엔 과학 2 Ⅶ 전기와 자기 (약 p.244~269)"
  },
  "sci-stars": {
   "order": 4,
   "tb": "미래엔 과학 2 Ⅷ 별과 우주 (약 p.282~307)"
  },
  "sci-g22-mirae-electric": {
   "order": 3.5
  },
  "sci-g22-mirae-space": {
   "order": 4.5
  },
  "his-exchange": {
   "order": 1,
   "tb": "비상 역사① Ⅳ 지역 세계의 교류와 변화"
  },
  "his-nation": {
   "order": 2,
   "tb": "비상 역사① Ⅴ 제국주의와 국민 국가 건설 운동"
  },
  "his-ancient": {
   "order": 3,
   "tb": "비상 역사② Ⅰ 국가의 형성과 발전",
   "title": "국가의 형성과 발전"
  },
  "his-silla-goryeo": {
   "order": 4,
   "tb": "비상 역사② Ⅱ 통일 신라와 발해 · Ⅲ 고려의 성립과 변천",
   "title": "통일 신라와 발해 · 고려의 성립과 변천"
  }
 },
 "hide": [],
 "log": [
  {
   "date": "2026-11-05",
   "what": "중2 과목 단원 순서·교과서 표기를 초은중 교과서(국어·영어 천재, 과학 미래엔, 역사 비상, 수학 동아)에 맞춤 — 단원 order/tb 덧씌우기",
   "why": "학교 시험 범위와 단원 순서를 맞추기 위해",
   "src": "https://m.chunjaetext.co.kr/product/book_list1.html?cate_no=68"
  },
  {
   "date": "2026-11-05",
   "what": "천재(노미숙) 국어 2-2 에 있으나 없던 소단원 7개(사회·문화적 상황, 발표, 논증의 오류, 광고 분석, 음운·문자 체계, 듣기·말하기 성찰, 복합양식 글쓰기) 추가 — kor-g22-chunjae.js",
   "why": "교과서 차례 대조 결과 2학기 범위 누락",
   "src": ""
  },
  {
   "date": "2026-11-05",
   "what": "천재 영어 2학기 언어 형식 중 없던 '-thing+형용사', '수량 형용사' 추가; 비교급·최상급은 2학기 교과서 범위 아님(심화 표시)",
   "why": "천재(소영순·이상기) L5~L8 언어 형식 대조",
   "src": "https://englishtutortv.com/%EC%A4%912-%EC%B2%9C%EC%9E%AC-%EC%86%8C%EC%98%81%EC%88%9C-1%EA%B3%BC-2%EA%B3%BC-3%EA%B3%BC-4%EA%B3%BC-5%EA%B3%BC-6%EA%B3%BC-7%EA%B3%BC-8%EA%B3%BC-%EC%A0%84%EB%8B%A8%EC%9B%90-%EB%8C%80%ED%99%94/"
  },
  {
   "date": "2026-11-05",
   "what": "미래엔 과학 2 2학기 단원 순서(Ⅴ~Ⅷ) 확인 — 변경 없음; 빠진 소단원 '전기 에너지 전환·소비 전력', '우주 탐사' 추가",
   "why": "미래엔 차례 대조",
   "src": "https://bookstore.visang.com/BookStore_view_new.asp?CateCode=&b_code=BM12832&gotopage="
  },
  {
   "date": "2026-11-05",
   "what": "역사 한국사 단원 제목을 비상 역사② 2022 명칭으로 교체(국가의 형성과 발전 / 통일 신라와 발해·고려의 성립과 변천). 중2가 역사①인지 ②인지는 교과서 표지로 확인 필요",
   "why": "비상 역사 차례 대조",
   "src": ""
  }
 ]
};
