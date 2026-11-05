# 카카오톡 '나와의 채팅'으로 오늘의 5줄 받기 (15분, 선택)

텔레그램→카카오톡 자동 포워드는 카카오톡이 외부에서 메시지를 받아들이는 통로를 열어 두지 않아 불가능합니다. 대신 카카오가 공식으로 허용하는 **'나에게 보내기' API**로 같은 브리핑을 **나와의 채팅방**에 직접 넣습니다. 텍스트 한 통이 200자까지라 과목 블록마다 한 통씩(보통 4통) 들어오고, 각 통 아래 **답·풀이 보기** 버튼이 붙습니다. 텔레그램과 동시에 동작하며, 둘 중 설정된 쪽으로만 보냅니다.

제약: 본인 카카오 계정의 '나와의 채팅'에만 보낼 수 있습니다(다른 사람·단체방은 친구 동의·심사 필요). 토큰은 2개월짜리지만 매일 전송이 돌면 자동 연장되고, 아래 4번(REPO_PAT)까지 해 두면 갱신된 토큰이 Secrets에 자동 저장됩니다.

## 1. 카카오 디벨로퍼스 앱 (5분) — 2025 새 콘솔 기준 (공식 문서 developers.kakao.com/docs/ko/app-setting/app)
1. https://developers.kakao.com → 로그인 → **내 애플리케이션 → 애플리케이션 추가**. 앱 이름 `TAD 브리핑`, 회사명은 본인 이름(개인도 됨), 카테고리 `교육`, 대표 도메인 `https://cncnature.github.io` → 저장.
2. 왼쪽 **앱 → 플랫폼 키 → REST API 키** 화면에서 세 가지를 합니다.
   - **REST API 키** 복사 → `KAKAO_REST_KEY`
   - 같은 화면의 **클라이언트 시크릿**: REST API 키는 기본이 **ON** 이라 코드 값이 보입니다. 복사 → `KAKAO_CLIENT_SECRET` (끄고 싶으면 OFF 로 바꿔도 됩니다. ON 이면 토큰 교환 때 반드시 필요)
   - 같은 화면의 **리다이렉트 URI → 등록**: `https://cncnature.github.io/tad-math/kakao.html`
3. **제품 설정 → 카카오 로그인 → 사용 설정** 에서 **상태 ON**.
4. **제품 설정 → 카카오 로그인 → 동의항목 → 접근권한** 에서 **카카오톡 메시지 전송** 행의 **설정** → 동의 단계 **선택 동의**, 동의 목적 `학습 브리핑 전송` → 저장. ('친구목록' 항목은 나에게 보내기엔 필요 없습니다.) 이 행이 보이지 않으면 **제품 설정 → 카카오톡 메시지** 를 먼저 켜고 다시 봅니다.
5. 비즈 앱 전환·추가 기능 신청은 **친구에게** 보낼 때만 필요합니다. **나에게 보내기**는 심사 없이 발송 건수 제한도 없습니다.

## 2. 인가 코드 → 리프레시 토큰 (3분)
브라우저 주소창에 아래를 넣습니다(`REST키` 자리만 바꿈).
```
https://kauth.kakao.com/oauth/authorize?client_id=REST키&redirect_uri=https://cncnature.github.io/tad-math/kakao.html&response_type=code&scope=talk_message
```
동의 화면에서 '카카오톡 메시지 전송'에 동의하면 사이트의 `kakao.html` 페이지가 열리며 **인가 코드**를 보여 줍니다(10분 안에 1회만 유효). 복사한 뒤 터미널에서:
```bash
cd tad-math
KAKAO_REST_KEY=REST키 KAKAO_CLIENT_SECRET=시크릿 node scripts/kakao-token.js 인가코드
```
`KAKAO_REFRESH_TOKEN=…` 한 줄이 나옵니다.

**터미널이 없을 때(권장)**: 먼저 3번·4번의 Secrets(`KAKAO_REST_KEY`, `KAKAO_CLIENT_SECRET`, `REPO_PAT`)를 넣어 두고, Actions → **Kakao token exchange (1회 설정)** → Run workflow 에 인가 코드를 붙여 넣으면 워크플로가 토큰을 발급받아 `KAKAO_REFRESH_TOKEN` Secret 까지 자동으로 저장합니다(토큰은 로그에 가려집니다). (오류 KOE006 = 리다이렉트 URI 불일치, KOE004 = 카카오 로그인 사용 설정 OFF, KOE010 = 시크릿 누락·불일치)

## 3. GitHub Secrets (2분)
`https://github.com/cncnature/tad-math/settings/secrets/actions` → **New repository secret**:
- `KAKAO_REST_KEY` = REST API 키
- `KAKAO_REFRESH_TOKEN` = 2번 결과
- `KAKAO_CLIENT_SECRET` = 클라이언트 시크릿 코드 (OFF 로 껐다면 생략)

## 4. 토큰 자동 갱신 (선택, 2달 뒤에도 끊기지 않게)
카카오는 리프레시 토큰이 한 달 남으면 새 토큰을 내려 주는데, 이를 Secrets에 다시 써 넣으려면 GitHub 토큰이 필요합니다. https://github.com/settings/tokens → **Generate new token (classic)** → `repo` 권한 체크 → 만든 값을 Secrets 에 `REPO_PAT` 으로 등록. 이게 없으면 약 2달마다 2번을 다시 하면 됩니다(워크플로 로그에 ⚠️ 로 알려 줍니다).

## 5. 테스트
**Actions → Daily brief → Run workflow**. 나와의 채팅방에 4통이 오면 성공. 내용만 미리 보려면 `node scripts/send-kakao.js --dry`.
