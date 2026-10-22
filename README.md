# 중등수학 만지기 — 중2-2 ~ 중3-2 수학 전용 학습 사이트

> 외우기 전에 먼저 만져 보는 중등수학. 로그인·결제 없음, 빌드 도구 없음, GitHub Pages 에 올리면 끝.

**데모 주소**: **https://cncnature.github.io/tad-math/**

## 무엇이 들어 있나

| 섹션 | 경로 | 내용 |
|---|---|---|
| 🧮 수학 학습 | `#/study` | 12단원 · 33소단원. 핵심 개념 → 왜 그런지 → **공식이 태어나는 이야기**(핵심 14개) → **흔한 오개념·함정** → **출제 포인트** → 공식 → 예제 → 확인 퀴즈 3문항(심화 포함) → 이 개념의 자리 |
| 🔗 개념 연결·응용 | `#/bridge` | 두세 단원이 한 문제에서 만나는 "다리 문제" 12편. 풀이 단계마다 사용 개념 표시, 변형 문제 포함 |
| 🔀 섞어 풀기 | `#/mix` | 교차 연습: 서로 다른 단원 6문항을 섞어 "어느 단원인지" 먼저 고른 뒤 풀기 (Rohrer 외 2020 근거) |
| ✍️ 서술형·증명·자기설명 | `#/essay` | 16편. 먼저 쓰기 → 모범 답안 → 채점 기준(10점)으로 자기 채점 → 자기설명 |
| ⏱ 하루 10분 코스 | `#/daily` | 암기 카드 3장 → 섞어 풀기 6문제 → 이야기 1편, 연속 일수 도장 |
| 🏫 교사 대시보드 | `#/teacher` | 학급 코드로 학생 요약(끊긴 고리 분포·정답률) 보기 (Firebase 필요) |
| 🗺 개념 지도 | `#/roadmap` | 개념 29개 · 선후관계 42개. 노드를 누르면 선수 개념(주황)·후속 개념(파랑)에 불이 켜짐 |
| 📐 공식 사전 | `#/formulas` | 45편. **정말 외울 것 15편** 과 **유도 한 줄로 되살릴 것** 으로 구분, 유도 단계 수록 |
| 🌐 수학의 생태계 | `#/ecosystem` | 개념을 중심으로 공식·인물·생활 속 쓰임·위젯을 위성처럼 한 장에 |
| 🧭 진단 | `#/diagnostic` | 18문항이 개념 선후 순서대로 출제. **처음 틀린 자리 = 끊긴 고리** → 해당 소단원과 복구 경로 제시 |
| 🔬 매스랩 | `#/lab` | Canvas 인터랙티브 위젯 15종 (넓이 모형·두 주사위 격자 등 CRA 모형 포함) (이차함수, 피타고라스 물 쏟기, 사각형 갈래, 닮음비, 평행선과 선분의 비, 무게중심, 합차 공식 ㄱ자 펴기, 삼각비 사분원, 원주각, 원과 접선, 주사위 상대도수, 통계 막대 드래그, 상자그림) |
| 🎞 슬라이드 | `#/slides` | 10분 수업용 6편, 위젯 내장, 키보드 ←→ |
| 🎮 플레이 | `#/play` | 60초 미니게임 6종 (공식 짝 맞추기, 인수분해 러시, 삼각비 플래시, 피타고라스 수, 꼭짓점 사냥, 원주각 퀴즈) |
| 📖 개념 사전 | `#/concepts` | 용어 50개, 정의·영어·자리 |
| 🧠 공식 암기법 | `#/recall` | 기억 장치(리듬·그림·이야기) + **간격 반복 카드**(SM-2 간이형, 로컬 저장) |
| 📝 중간·기말 전 훑기 | `#/exam` | 6개 시험(중2-2 중간/기말, 중3-1 중간/기말, 중3-2 중간/기말) 한 줄 체크리스트, 진행률 저장 |
| 🌍 생활 속 수학 | `#/life` | 44편, 8개 생활 영역 탭, SVG 도면 33개 + "계산해 보기" 단계 |
| 👤 수학 인물 | `#/people` | 18명, 각 단원과 연결 |
| 📒 오답 노트 | `#/notes` | 퀴즈·섞어 풀기 오답 자동 수집, 틀린 이유 태깅(계산/개념/해석/미풀이)과 분포, JSON 내보내기 |

### 참고 사이트(intomath.kr)와 다른 점
- **범위를 중2-2~중3-2 로 좁혀** 그 범위 안에서 선수 개념(중1~중2-1)과 후속 개념(고1)을 함께 보여 줌
- **완전 무료·오픈소스(MIT)** — 풀이·유도·연습 문제에 유료 이용권 없음
- **로그인 없음** — 학습 기록(퀴즈·진단·암기·체크리스트·오답)은 브라우저 `localStorage` 에만 저장, JSON 내보내기 가능
- 추가 기능: 간격 반복 암기 카드, 오답 노트, 중간·기말 체크리스트, 다크 모드, 전체 검색
- 콘텐츠는 모두 `data/*.js` 의 데이터 파일 — 코드를 몰라도 문항·공식·인물을 추가할 수 있음

## 배포: GitHub Pages 에 올리기 (5분)

1. GitHub 에서 새 저장소를 만듭니다. 예: `tad-math` (Public).
2. 이 폴더의 파일 전체를 올립니다.
   ```bash
   cd tad-math
   git init
   git add .
   git commit -m "중등수학 만지기 최초 커밋"
   git branch -M main
   git remote add origin https://github.com/cncnature/tad-math.git
   git push -u origin main
   ```
   (웹에서 "Add file → Upload files" 로 끌어다 놓아도 됩니다.)
3. 저장소 **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**.
4. 1~2분 뒤 `https://cncnature.github.io/tad-math/` 에서 누구나 접속할 수 있습니다.

`.nojekyll` 파일이 포함되어 있어 Jekyll 처리 없이 그대로 서빙됩니다. 사용자 정의 도메인을 쓰려면 Settings → Pages → Custom domain 에 입력하면 됩니다.

### 로컬에서 미리 보기
```bash
python3 -m http.server 8000   # 또는 npx serve
# http://localhost:8000
```
`index.html` 을 더블클릭해도 동작합니다 (수식 포함, 인터넷 불필요).

## 콘텐츠 추가 방법 (코드 수정 없이)

모든 내용은 `data/` 폴더의 JS 파일에 있습니다. 파일을 열어 항목을 하나 더 붙이면 사이트 전체(목록·검색·지도·생태계)에 자동 반영됩니다.

| 파일 | 추가할 것 | 핵심 필드 |
|---|---|---|
| `data/curriculum.js` | 단원·소단원 | `id`, `node`(로드맵 노드 id), `concept[]`, `why`, `formulas[]`(공식 id), `example{q,sol[],ans}`, `quiz[{q,opts,a,exp}]` |
| `data/formulas.js` | 공식 | `id`, `node`, `tex`(KaTeX), `core`(외울 것 여부), `derive[]`, `tip` |
| `data/roadmap.js` | 개념 노드·선후관계 | `nodes[{id,col,label,strand,unit}]`, `edges[[선수, 후속]]` |
| `data/diagnostic.js` | 진단 문항 | 개념 선후 순서대로 배열. 처음 틀린 문항의 `node` 가 끊긴 고리 |
| `data/recall.js` | 암기 카드 | `f`(공식 id), `mnemonic`, `story` |
| `data/exam.js` | 시험 체크리스트 | `items[{t, l(소단원 id)}]` |
| `data/life.js`, `data/people.js`, `data/concepts.js`, `data/slides.js`, `data/play.js` | 생활·인물·용어·슬라이드·게임 | 각 파일 상단 주석 참고 |
| `js/widgets.js` | 인터랙티브 위젯 | `WIDGETS.id = {title, desc, node, grade, render(container)}` |

수식은 `$...$`(KaTeX) 로 쓰고, `**굵게**` 가 지원됩니다.

### 무결성 검사
```bash
node scripts/check.js
```
모든 id 참조(소단원↔노드↔공식↔시험↔슬라이드)가 연결되는지 확인합니다.

## 기술
- 순수 HTML / CSS / JavaScript (ES2020), 프레임워크·번들러 없음
- 수식: [KaTeX](https://katex.org) 0.16.11 — `vendor/katex/` 에 동봉 (MIT), CDN 불필요·오프라인 동작
- 위젯: Canvas 2D API, 외부 라이브러리 없음
- 아이콘·일러스트: [OpenMoji](https://openmoji.org) 17.0 (CC BY-SA 4.0), `assets/openmoji/`
- 라우팅: 해시(`#/...`) 기반 → GitHub Pages 에서 새로고침·직접 링크 모두 동작
- 저장: `localStorage` (키 접두어 `imm:`)

## 교육과정 근거
교육부 고시 **2022 개정 수학과 교육과정** 중학교 2·3학년 성취기준(수와 연산, 변화와 관계, 도형과 측정, 자료와 가능성)을 기준으로 단원을 구성했으며, 2015 개정과 공통인 범위를 다룹니다. 상자그림은 2022 개정에서 중학교 통계에 추가된 내용입니다. 학교별 진도·시험 범위는 교과서 차례로 조정하세요.

## 라이선스
MIT. 본문·문항·위젯 코드는 이 저장소에서 작성되었습니다. 참고 사이트의 텍스트·코드·이미지를 복제하지 않았습니다.

## 학습 기록 동기화 (아이디로 이어하기) — 선택

기본은 브라우저별 저장입니다. 아이디 로그인으로 **폰·PC 어디서든 이어하기**를 켜려면 무료 Firebase 프로젝트를 하나 만들어 키를 붙입니다 (5분, 신용카드 불필요).

1. https://console.firebase.google.com → **프로젝트 추가** (이름 자유, Google Analytics 는 꺼도 됨)
2. 왼쪽 **빌드 → Authentication → 시작하기 → 로그인 방법 → 이메일/비밀번호 → 사용 설정 → 저장**
3. 왼쪽 **빌드 → Realtime Database → 데이터베이스 만들기** (위치 아무거나, **잠금 모드**로 시작) → **규칙** 탭에 아래를 붙여 넣고 게시
   ```json
   { "rules": { "users": { "$uid": { ".read": "auth.uid === $uid", ".write": "auth.uid === $uid" } } } }
   ```
4. 왼쪽 위 **프로젝트 설정(⚙) → 일반 → 내 앱 → 웹(</>) 앱 추가** → 이름 입력 → 표시되는 `firebaseConfig` 의 값들을 `data/sync-config.js` 에 붙여 넣기 (`databaseURL` 은 Realtime Database 화면 상단의 `https://…firebasedatabase.app` 주소)
5. 커밋·푸시 → 사이트 상단에 **🔐 로그인** 버튼이 생깁니다. 아이디·비밀번호는 짧아도 되며(예: `tad` / `tad`), 처음 입력하면 자동 생성됩니다.

동작: 로그인하면 기록이 `users/<uid>/data` 에 저장되고, 다른 기기에서 같은 아이디로 로그인하면 **원격 기록이 그 기기에 덮어써집니다**. 저장은 변경 1.5초 뒤 자동. 무료 한도(동시 접속 100, 저장 1GB)는 학급 단위로 충분합니다.

### 교사 대시보드 (학급 코드)
학생이 로그인 후 **👤 아이디 버튼 → 학급 코드 입력**(예: `3-2`)을 하면 요약(최근 진단·끊긴 고리·퀴즈 정답률·섞어 풀기·오답 수·10분 코스 일수)이 `classes/<코드>/<uid>` 에 공유됩니다. 교사는 로그인 후 **🏫 교사 대시보드** 에서 같은 코드를 입력해 봅니다. 이를 위해 Realtime Database 규칙에 `classes` 를 추가하세요:
```json
{
  "rules": {
    "users":   { "$uid": { ".read": "auth.uid === $uid", ".write": "auth.uid === $uid" } },
    "classes": { "$code": { ".read": "auth != null", "$uid": { ".write": "auth.uid === $uid" } } }
  }
}
```
(상세 기록은 여전히 본인만 읽을 수 있고, 학급 요약은 로그인한 사용자가 코드를 알아야 볼 수 있습니다.)
