# 전담 AI 선생님 — 주간 자동 조사·갱신 절차 (스케줄 작업이 이 문서를 따른다)

1. `git pull origin main` 후 `node scripts/check.js` 로 데이터 무결성 확인.
2. 조사(웹 검색, 한국어 우선, 최근 30일 기사·공식 공고):
   - 교육부·한국교육과정평가원·대교협: 수능 시행 기본계획, 모의평가 일정, 2028학년도 이후 대입 전형 계획, 고교학점제·내신 5등급제 운영 변경.
   - 시·도교육청: 전국연합학력평가 일정(3·6·9·11월), 중학교 자유학기·평가 지침 변경.
   - 2022 개정 수학과 교육과정: 교과서·성취기준 해설 변경, 중3 이차함수 최대·최소 등 신규 내용의 내신 출제 사례.
   - 대치동·시대인재 등 대형 학원 설명회 기사: 학년별 학습 지도 방향, 내신·수능 출제 경향(문항 원문은 수집하지 않는다 — 저작권).
3. `data/advisory.js` 맨 위에 새 게시글을 추가한다. 형식 `{date, grade:[...], tag, title, body(3~5문장, 학생에게 '그래서 무엇을 할지' 포함), src:[[제목,URL]], action?}`. 같은 제목·같은 출처는 중복 추가하지 않는다. 60개를 넘으면 오래된 것부터 지운다. 확인되지 않은 소문은 쓰지 않고 출처 없는 글은 올리지 않는다.
4-1. **입시 컨설팅(data/admissions.js)**: 대교협·각 대학 입학처의 전형 계획·모집요강 변경(전형 신설·폐지, 수능최저 변경, 논술 일정, 지역인재 비율), 입시 결과 공개 자료(입결), 메타인컨설팅·거인의어깨 등 입시 컨설팅 기관의 공개 칼럼에서 수시·정시 전략 변화를 조사해 `bulletins` 맨 위에 추가하고(형식 advisory 와 동일, src 필수), 바뀐 사실은 해당 `univs[].tracks/note/strategy` 를 고친 뒤 `updated` 날짜를 바꾼다. 대학을 추가할 때는 id·name·tier·site·tracks·note·strategy 를 모두 채운다. 특정 학생의 사적 정보·컨설팅 기관의 유료 자료는 수집하지 않는다.
4-00. **자동 감지 반영**: `docs/BACKLOG.md` 의 '## 자동 감지' 단락(매일 watch.js 가 쌓음)을 위에서부터 열어 읽고, 사실이면 해당 데이터(일정·입시·advisory·overrides)에 반영한 뒤 `[x]` 로 바꾼다. `data/sync-report.json` 의 미확인 성취기준 코드는 공개 자료로 확인해 `overrides.js` 로 고친다.
4-0. **자가 진단·백로그**: `node scripts/audit.js` 를 먼저 돌려 `docs/AUDIT.md` 의 부족분·재검증·지난 시험을 보고, `docs/BACKLOG.md` 의 '날짜가 정해진 일' 중 기한이 온 항목을 최우선으로 처리한다. 처리한 항목은 BACKLOG 체크박스를 `[x] (날짜, 커밋)` 로 바꾸고, 새로 발견한 할 일은 알맞은 단락에 추가한다.
4-1'. **정정은 오버라이드로**: 기존 차시·단원의 오타·수치·성취기준 코드·학기 배치를 고칠 때는 콘텐츠 파일을 다시 쓰지 말고 `data/overrides.js` 의 `lessons/units/hide` 에 덧씌우고 `log` 에 `{date, what, why, src}` 를 남긴다(사이트 소개 화면에 표시됨). 확인된 뒤에는 해당 파일 머리말의 '추정' 표기를 지운다.
4-1''. **학교 교과서 기준**: `data/daily-config.js` 의 `textbooks`(초은중: 수학 동아, 국어·영어 천재, 과학 미래엔, 역사 비상)에 맞춰 단원 순서(`order`)·교과서 표기(`tb`)를 유지한다. 새 학년·학기 교과서 차례가 확인되면 `docs/textbook-proposals/` 형식으로 대조표를 남기고 `overrides.js` 로 반영, 교과서에 있는데 없는 소단원은 `<과목>-g<학년>-<출판사>.js` 확장 파일로 추가한다.
4-2. **전 과목 확장(data/subjects/*.js)**: 국어·영어·과학·사회·역사 각 1차시 이상 `docs/SUBJECT-SCHEMA.md` 형식으로 추가한다(학년 확장 파일 `<과목>-g3|h1|h2.js`, 고3은 `-h3.js` 신설). 우선순위: AUDIT 부족분 순서, 단 현재 학기 범위가 먼저. 성취기준 코드는 공개 자료로 확인하고 추정이면 파일 주석에 표시. 교과서 원문·기출 원문은 넣지 않는다(자작 지문·예문만). 추가 후 `node scripts/send-telegram.js --dry` 로 브리핑이 깨지지 않는지 본다.
4-2'. **시각 자료**: 새로 추가한 차시마다 `docs/VISUAL-SCHEMA.md` 형식으로 요약정리표 1개 + 도식 1개 이상을 `data/visuals/<과목>-*.js` 에 넣는다(기존 파일에 키 추가). `node scripts/audit.js` 의 '시각 자료 없는 차시' 가 0 이 되게 유지한다.
4-3. **일정 반영**: 조사한 학력평가·모의평가 날짜가 `data/daily-config.js` 의 `exams` 와 다르면 고친다(지난 시험은 지운다).
4. 공식 일정·제도가 바뀌었으면 `data/edu-timeline.js` 의 `system`, `csat`, `semesters[*].naesin/teacher` 를 고치고 `updated` 날짜를 바꾼다.
5. 사이트 자가 점검: `python3 -m http.server 8765` 를 띄우고 Playwright 로 `#/`, `#/me`, `#/advisor`, `#/schedule`, `#/weekly`, `#/survival`, 소단원 10개를 열어 JS 오류·KaTeX 오류를 센다. 오류가 있으면 원인을 고친다(데이터 오타, 깨진 수식, 생성기 버그). 큰 설계 변경은 하지 않고, 고친 내용은 보고서에 적는다.
6. `node scripts/check.js` 통과 후 커밋(`-c user.name=cncnature -c user.email=cncnature@gmail.com`, 메시지 끝에 Co-Authored-By 라인) → `git push origin main` → GitHub Actions `Deploy to GitHub Pages` 성공 확인.
7. 보고: 추가한 게시글 제목·출처, 바꾼 로드맵 항목, 고친 오류, 다음 주 확인할 것(예: 3월 평가원 기본계획 발표)을 5줄 이내로.
