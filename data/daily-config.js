// 매일 브리핑(텔레그램·카카오) 설정 — 서버(GitHub Actions)는 브라우저 기록을 볼 수 없으므로 시험 일정을 여기에 적는다.
// type: mid(중간) | final(기말) | mock(학력평가·모의고사) | csat(수능). subjects: 브리핑에 돌아가며 나올 과목. 지난 시험은 scripts/auto-update.js 가 자동으로 지운다. grade 는 매년 3/1·9/1 에 자동 전환(gradeSince).
window.DATA = window.DATA || {};
window.DATA.dailyConfig = {
 "grade": "g22",
 "name": "",
 "school": "인천초은중학교",
 "textbooks": {"수학":"동아출판","국어":"천재교육(노미숙)","영어":"천재교육","과학":"미래엔","사회":"비상교육(사회②)","역사":"비상교육(역사①)"},
 "daily": [
  "수학",
  "국어",
  "과학",
  "영어",
  "사회",
  "역사"
 ],
 "exams": [
  {
   "name": "2학기 기말고사",
   "date": "2026-12-16",
   "type": "final",
   "subjects": [
    "수학",
    "국어",
    "영어",
    "과학",
    "사회",
    "역사"
   ]
  },
  {
   "name": "3월 전국연합학력평가(고1)",
   "date": "2027-03-24",
   "type": "mock",
   "subjects": [
    "수학",
    "국어",
    "영어"
   ]
  }
 ],
 "site": "https://cncnature.github.io/tad-math/",
 "gradeSince": "2026-03-01"
};
