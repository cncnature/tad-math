// 매일 브리핑(텔레그램) 설정 — 서버(GitHub Actions)는 브라우저 기록을 볼 수 없으므로 시험 일정을 여기에 적는다.
// type: mid(중간) | final(기말) | mock(학력평가·모의고사) | csat(수능). subjects: 브리핑에 돌아가며 나올 과목. 날짜가 지난 시험은 자동으로 무시된다.
window.DATA = window.DATA || {};
window.DATA.dailyConfig = {
 grade:"g22", name:"",
 daily:["수학","국어","과학","영어","사회","역사"],   // 매일 메시지에 넣을 과목(순서대로). 카카오는 3과목씩 한 통(6과목 = 2통). 비우면 수학 + 날짜 순환 1과목
 exams:[
  {name:"2학기 기말고사", date:"2026-12-16", type:"final", subjects:["수학","국어","영어","과학","사회","역사"]},
  {name:"3월 전국연합학력평가(고1)", date:"2027-03-24", type:"mock", subjects:["수학","국어","영어"]}
 ],
 site:"https://cncnature.github.io/tad-math/"
};
