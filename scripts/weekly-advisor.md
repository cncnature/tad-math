# 전담 AI 선생님 — 주간 자동 조사·갱신 절차 (스케줄 작업이 이 문서를 따른다)

1. `git pull origin main` 후 `node scripts/check.js` 로 데이터 무결성 확인.
2. 조사(웹 검색, 한국어 우선, 최근 30일 기사·공식 공고):
   - 교육부·한국교육과정평가원·대교협: 수능 시행 기본계획, 모의평가 일정, 2028학년도 이후 대입 전형 계획, 고교학점제·내신 5등급제 운영 변경.
   - 시·도교육청: 전국연합학력평가 일정(3·6·9·11월), 중학교 자유학기·평가 지침 변경.
   - 2022 개정 수학과 교육과정: 교과서·성취기준 해설 변경, 중3 이차함수 최대·최소 등 신규 내용의 내신 출제 사례.
   - 대치동·시대인재 등 대형 학원 설명회 기사: 학년별 학습 지도 방향, 내신·수능 출제 경향(문항 원문은 수집하지 않는다 — 저작권).
3. `data/advisory.js` 맨 위에 새 게시글을 추가한다. 형식 `{date, grade:[...], tag, title, body(3~5문장, 학생에게 '그래서 무엇을 할지' 포함), src:[[제목,URL]], action?}`. 같은 제목·같은 출처는 중복 추가하지 않는다. 60개를 넘으면 오래된 것부터 지운다. 확인되지 않은 소문은 쓰지 않고 출처 없는 글은 올리지 않는다.
4-1. **입시 컨설팅(data/admissions.js)**: 대교협·각 대학 입학처의 전형 계획·모집요강 변경(전형 신설·폐지, 수능최저 변경, 논술 일정, 지역인재 비율), 입시 결과 공개 자료(입결), 메타인컨설팅·거인의어깨 등 입시 컨설팅 기관의 공개 칼럼에서 수시·정시 전략 변화를 조사해 `bulletins` 맨 위에 추가하고(형식 advisory 와 동일, src 필수), 바뀐 사실은 해당 `univs[].tracks/note/strategy` 를 고친 뒤 `updated` 날짜를 바꾼다. 대학을 추가할 때는 id·name·tier·site·tracks·note·strategy 를 모두 채운다. 특정 학생의 사적 정보·컨설팅 기관의 유료 자료는 수집하지 않는다.
4. 공식 일정·제도가 바뀌었으면 `data/edu-timeline.js` 의 `system`, `csat`, `semesters[*].naesin/teacher` 를 고치고 `updated` 날짜를 바꾼다.
5. 사이트 자가 점검: `python3 -m http.server 8765` 를 띄우고 Playwright 로 `#/`, `#/me`, `#/advisor`, `#/schedule`, `#/weekly`, `#/survival`, 소단원 10개를 열어 JS 오류·KaTeX 오류를 센다. 오류가 있으면 원인을 고친다(데이터 오타, 깨진 수식, 생성기 버그). 큰 설계 변경은 하지 않고, 고친 내용은 보고서에 적는다.
6. `node scripts/check.js` 통과 후 커밋(`-c user.name=cncnature -c user.email=cncnature@gmail.com`, 메시지 끝에 Co-Authored-By 라인) → `git push origin main` → GitHub Actions `Deploy to GitHub Pages` 성공 확인.
7. 보고: 추가한 게시글 제목·출처, 바꾼 로드맵 항목, 고친 오류, 다음 주 확인할 것(예: 3월 평가원 기본계획 발표)을 5줄 이내로.
