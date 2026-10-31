# TAD 수학 만지기 — 안드로이드 앱

`capacitor.config.json` 의 `server.url` 이 GitHub Pages(https://cncnature.github.io/tad-math/)를 가리키는 **얇은 래퍼**입니다.
사이트를 GitHub 에 푸시하면 앱을 다시 설치하지 않아도 항상 최신 버전이 열리고, 사이트의 서비스 워커가 오프라인 캐시를 맡습니다.

- 빌드: `.github/workflows/build-apk.yml` 이 `main` 푸시마다 APK 를 만들고 Release `apk-latest` 에 올립니다.
- 설치: Releases → apk-latest → `tad-math-*.apk` 다운로드 → 설치(출처 불명 앱 허용). Lenovo ZUI(안드로이드 16)에서 확인.
- 로컬 빌드: `cd app && npm ci && npx cap add android && npm run build:apk`
