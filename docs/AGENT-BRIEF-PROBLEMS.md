# 단계별 문제·단원 노트 작성 지침 (에이전트용)

공통: **2022 개정 교육과정 기준**. 교과서·문제집·기출 원문을 베끼지 않는다(자작). 사실·수치는 차시의 concept/pitfalls/points 와 표준 교과 범위 안에서만.

## A. 단계별 문제 — `data/problems/<이름>.js`
1. `docs/PROBLEM-SCHEMA.md` 를 읽는다. 지정된 차시 파일을 읽고 **모든 차시**에 문제를 쓴다. 출력은 지정된 파일 하나(형식: `window.DATA = window.DATA || {}; (window.DATA.problemsAdd = window.DATA.problemsAdd || []).push({ "<차시 id>": [ … ] });`). 다른 파일은 수정하지 않는다.
2. 차시마다 4문항: `lv:2` 객관식 2(내신 중간·기말형 — 개념 적용·함정 보기·계산/자료 한 단계), `lv:3` 객관식 1(학평·수능형 — `data` 에 자작 자료: 표·그래프 설명·사료·짧은 지문·실험 결과 → 보기 5개가 아닌 **4개**, 자료 해석·추론), `lv:3` 서술형 1(`model`·`rubric` 합 10점).
3. 난이도 설계: lv2 는 차시 퀴즈보다 한 단계(두 개념 결합·함정 보기), lv3 은 자료 해석·조건 종합·'옳은 것만 고른 것'형. 오답 보기는 흔한 오개념(pitfalls)에서 만든다. `err` 태그를 모든 문항에 단다. 영어 lv3 는 자작 영어 지문(60~90단어) 독해 + 어법, 국어 lv3 는 자작 지문(4~6문장) 또는 시 2~4행(자작).
4. 길이: q ≤300자, data ≤400자, opts 각 ≤60자, exp ≤250자. `**굵게**`·`$수식$` 가능. 지문은 `data` 에 넣고 q 는 발문만.
5. 검증(반드시): `cd /home/claude/tad-math && node scripts/check.js` 가 `problems N` 을 세고 오류 없이 OK 로 끝나야 한다.
6. 보고: 차시 수, 문항 수(lv2/lv3/서술형), 어려웠던 점.

## B. 단원 노트 — `data/unit-notes/<이름>.js`
1. 지정된 과목 파일들의 **모든 단원**(unit)에 `goals`(3~4, 성취기준 문장을 '~할 수 있다' 학생 말로), `summary`(교과서 핵심 요약 6~10줄, 각 ≤90자, 시험 직전 읽는 요약), `keywords`(8~12), `examTips`(중간·기말 경향 2~3 + 학평·수능 연결 1~2) 를 쓴다. 형식은 `docs/PROBLEM-SCHEMA.md` 의 단원 노트 형식.
2. 내용은 그 단원 차시들의 concept/points/pattern/exam 에서 뽑아 압축한다(새 사실 추가 금지). 검증 `node scripts/check.js` (`unitNotes N`).
