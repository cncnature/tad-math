# 오늘의 5줄 — 매일 아침 텔레그램 브리핑 설정 (5분)

매일 07:00(KST)에 GitHub Actions 가 `scripts/send-telegram.js` 를 실행해 **시험 D-day 기준 맞춤 5줄**(꼭 알 것 · 함정 · 출제·풀이 패턴 · 확인 문제 · 오늘 할 일)을 텔레그램으로 보냅니다. 같은 내용은 사이트 `#/today` 에서 답·풀이와 함께 볼 수 있습니다. 서버·비용·토큰 만료 없음.

## 1. 봇 만들기 (텔레그램 앱)
1. 텔레그램에서 **@BotFather** 검색 → `/newbot` → 이름(예: `TAD 수학 브리핑`)과 아이디(예: `tad_math_brief_bot`, 끝이 `bot`) 입력.
2. 발급된 **토큰**(`123456789:AAH…` 형태)을 복사해 둡니다.
3. 새 봇과의 대화창을 열어 **아무 메시지나 하나** 보냅니다(`/start`). 학생·학부모 여러 명이 받으려면 단체방을 만들고 봇을 초대한 뒤 그 방에 메시지를 하나 보냅니다.

## 2. 채팅 ID 알아내기
브라우저 주소창에 아래를 넣습니다(토큰 부분만 바꿈).
```
https://api.telegram.org/bot<토큰>/getUpdates
```
응답 JSON 의 `"chat":{"id":123456789,…}` 가 채팅 ID 입니다(단체방은 음수 `-100…`). 아무것도 안 나오면 봇에게 메시지를 한 번 더 보내고 새로고침.

## 3. GitHub Secrets 등록
저장소 **Settings → Secrets and variables → Actions → New repository secret** 에 두 개:
- `TELEGRAM_BOT_TOKEN` = 1번 토큰
- `TELEGRAM_CHAT_ID` = 2번 채팅 ID

터미널이 편하면: `gh secret set TELEGRAM_BOT_TOKEN` / `gh secret set TELEGRAM_CHAT_ID`.

## 4. 시험 일정 넣기
`data/daily-config.js` 의 `exams` 에 중간·기말·학력평가·수능 날짜와 과목을 적고 커밋합니다. 지난 날짜는 자동으로 무시됩니다. (사이트 `#/today` 는 학생이 `#/schedule` 에 등록한 일정을 우선 씁니다 — 서버는 브라우저 기록을 볼 수 없어 이 파일이 필요합니다.)

## 5. 바로 테스트
**Actions → Daily brief (Telegram) → Run workflow** (날짜를 비우면 오늘). 로컬에서 내용만 보려면 `node scripts/send-telegram.js --dry --date 2026-12-12`.

## 메시지 규칙
- 가장 가까운 시험으로 단계를 정합니다: 개념 완성기(D-22 이전) → 유형·내신 집중기(D-8~21) → 실전기(D-7 이내, 새 개념 금지) → 복기(시험 후 3일).
- 과목: 수학은 매일, 나머지(국어·영어·과학·사회·역사)는 날짜로 돌아가며 1과목(실전기는 2과목). 차시는 날짜 순환이라 같은 날짜엔 같은 내용이 나옵니다.
- 내용은 모두 `data/curriculum*.js`(수학)와 `data/subjects/*.js`(5과목)에서 가져옵니다. 매주 월요일 자동 조사가 차시를 늘리면 브리핑 범위도 함께 늘어납니다.
- 카카오톡 '나와의 채팅'으로도 받으려면 `docs/KAKAO-SETUP.md`(15분). 텔레그램→카톡 자동 포워드는 카카오톡이 외부 입력을 막아 두어 불가능하고, 대신 같은 브리핑을 카카오 API 로 직접 보냅니다.
