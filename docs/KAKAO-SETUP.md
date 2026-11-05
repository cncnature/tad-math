# 카카오톡 '나와의 채팅'으로 오늘의 5줄 받기 (15분, 선택)

텔레그램→카카오톡 자동 포워드는 카카오톡이 외부에서 메시지를 받아들이는 통로를 열어 두지 않아 불가능합니다. 대신 카카오가 공식으로 허용하는 **'나에게 보내기' API**로 같은 브리핑을 **나와의 채팅방**에 직접 넣습니다. 텍스트 한 통이 200자까지라 과목 블록마다 한 통씩(보통 4통) 들어오고, 각 통 아래 **답·풀이 보기** 버튼이 붙습니다. 텔레그램과 동시에 동작하며, 둘 중 설정된 쪽으로만 보냅니다.

제약: 본인 카카오 계정의 '나와의 채팅'에만 보낼 수 있습니다(다른 사람·단체방은 친구 동의·심사 필요). 토큰은 2개월짜리지만 매일 전송이 돌면 자동 연장되고, 아래 4번(REPO_PAT)까지 해 두면 갱신된 토큰이 Secrets에 자동 저장됩니다.

## 1. 카카오 디벨로퍼스 앱 (5분)
1. https://developers.kakao.com → 로그인 → **내 애플리케이션 → 애플리케이션 추가** (이름 `TAD 브리핑`, 회사명 아무거나).
2. **앱 설정 → 앱 키** 에서 **REST API 키** 복사 → `KAKAO_REST_KEY`.
3. **제품 설정 → 카카오 로그인 → 활성화 ON**, 같은 화면 **Redirect URI** 에 `https://cncnature.github.io/tad-math/kakao.html` 등록.
4. **카카오 로그인 → 동의항목** 에서 **카카오톡 메시지 전송(talk_message)** 을 '선택 동의'로 설정. (보이지 않으면 **제품 설정 → 카카오톡 메시지** 를 먼저 켭니다.)
5. **보안 → Client Secret** 은 켜지 않아도 됩니다. 켰다면 그 값을 `KAKAO_CLIENT_SECRET` 으로 함께 등록.

## 2. 인가 코드 → 리프레시 토큰 (3분)
브라우저 주소창에 아래를 넣습니다(`REST키` 자리만 바꿈).
```
https://kauth.kakao.com/oauth/authorize?client_id=REST키&redirect_uri=https://cncnature.github.io/tad-math/kakao.html&response_type=code&scope=talk_message
```
동의 화면에서 '카카오톡 메시지 전송'에 동의하면 사이트의 `kakao.html` 페이지가 열리며 **인가 코드**를 보여 줍니다(10분 안에 1회만 유효). 복사한 뒤 터미널에서:
```bash
cd tad-math
KAKAO_REST_KEY=REST키 node scripts/kakao-token.js 인가코드
```
`KAKAO_REFRESH_TOKEN=…` 한 줄이 나옵니다. 터미널이 없으면 이 코드를 저에게(Claude) 주셔도 같은 교환을 대신할 수 있습니다.

## 3. GitHub Secrets (2분)
`https://github.com/cncnature/tad-math/settings/secrets/actions` → **New repository secret**:
- `KAKAO_REST_KEY` = REST API 키
- `KAKAO_REFRESH_TOKEN` = 2번 결과
- (Client Secret을 켰다면) `KAKAO_CLIENT_SECRET`

## 4. 토큰 자동 갱신 (선택, 2달 뒤에도 끊기지 않게)
카카오는 리프레시 토큰이 한 달 남으면 새 토큰을 내려 주는데, 이를 Secrets에 다시 써 넣으려면 GitHub 토큰이 필요합니다. https://github.com/settings/tokens → **Generate new token (classic)** → `repo` 권한 체크 → 만든 값을 Secrets 에 `REPO_PAT` 으로 등록. 이게 없으면 약 2달마다 2번을 다시 하면 됩니다(워크플로 로그에 ⚠️ 로 알려 줍니다).

## 5. 테스트
**Actions → Daily brief → Run workflow**. 나와의 채팅방에 4통이 오면 성공. 내용만 미리 보려면 `node scripts/send-kakao.js --dry`.
