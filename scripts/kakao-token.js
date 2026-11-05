// node scripts/kakao-token.js <인가코드>   (환경변수 KAKAO_REST_KEY 필수, KAKAO_CLIENT_SECRET 선택)
// 브라우저에서 받은 인가 코드를 리프레시 토큰으로 바꿔 출력한다. 절차: docs/KAKAO-SETUP.md
const https=require("https"); const code=process.argv[2]; const KEY=process.env.KAKAO_REST_KEY, SEC=process.env.KAKAO_CLIENT_SECRET||"";
if(!code||!KEY){ console.error("사용법: KAKAO_REST_KEY=… node scripts/kakao-token.js <인가코드>"); process.exit(1); }
const redirect=process.env.KAKAO_REDIRECT||"https://cncnature.github.io/tad-math/kakao.html";
const data=new URLSearchParams({grant_type:"authorization_code",client_id:KEY,redirect_uri:redirect,code,...(SEC?{client_secret:SEC}:{})}).toString();
const req=https.request({hostname:"kauth.kakao.com",path:"/oauth/token",method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded;charset=utf-8","Content-Length":Buffer.byteLength(data)}},r=>{ let s=""; r.on("data",c=>s+=c); r.on("end",()=>{ const j=JSON.parse(s); if(!j.refresh_token){ console.error("실패:",j); process.exit(1); } console.log("KAKAO_REFRESH_TOKEN="+j.refresh_token); console.log("(유효 "+Math.round(j.refresh_token_expires_in/86400)+"일 · 매일 전송이 돌면 자동 연장, REPO_PAT 설정 시 Secrets 자동 갱신)"); }); });
req.on("error",e=>{ console.error(e); process.exit(1); }); req.write(data); req.end();
