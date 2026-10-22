// 학습 기록 동기화 설정 (선택). 비워 두면 기기별 저장만 동작합니다.
// Firebase 콘솔 → 프로젝트 설정 → "내 앱" → 웹 앱의 firebaseConfig 값을 그대로 붙여 넣으세요.
// (apiKey 등은 공개되어도 되는 식별자입니다. 보안은 Realtime Database 규칙으로 지킵니다.)
window.SYNC_CONFIG = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  appId: ""
};
