/* 학습 기록 동기화 (선택 기능)
   - data/sync-config.js 의 Firebase 설정이 비어 있으면 아무것도 하지 않습니다 (기기별 localStorage 저장).
   - 설정되어 있으면 상단에 "로그인" 버튼이 생기고, 아이디/비밀번호(짧아도 됨)로 로그인하면
     이 브라우저의 기록(imm:*)이 Firebase Realtime Database 의 users/<uid>/data 에 저장되고
     다른 기기에서 같은 아이디로 로그인하면 그대로 이어집니다.
   - 첫 로그인 시 계정이 자동 생성됩니다. */
(function(){
  const cfg = window.SYNC_CONFIG;
  if(!cfg || !cfg.apiKey){ window.SYNC = { enabled:false, onChange(){} }; return; }
  const KEYS = ()=>Object.keys(localStorage).filter(k=>k.startsWith("imm:") && k!=="imm:theme");
  const $ = s=>document.querySelector(s);
  let app, auth, db, user=null, pushTimer=null, status="";
  const S = window.SYNC = { enabled:true, user:null,
    onChange(){ if(!user) return; clearTimeout(pushTimer); pushTimer=setTimeout(push, 1500); }
  };
  // 아이디 → Firebase 이메일, 짧은 비밀번호 → 6자 이상으로 보정
  const emailOf = id=>`${id.trim().toLowerCase().replace(/[^a-z0-9._-]/g,"")}@tad-math.user`;
  const pwOf = pw=>pw+"·tad-math·2026";

  function load(src){ return new Promise((res,rej)=>{ const s=document.createElement("script"); s.src=src; s.onload=res; s.onerror=rej; document.head.appendChild(s); }); }
  async function init(){
    const v="10.12.5";
    await load(`https://www.gstatic.com/firebasejs/${v}/firebase-app-compat.js`);
    await load(`https://www.gstatic.com/firebasejs/${v}/firebase-auth-compat.js`);
    await load(`https://www.gstatic.com/firebasejs/${v}/firebase-database-compat.js`);
    app = firebase.initializeApp(cfg); auth = firebase.auth(); db = firebase.database();
    auth.onAuthStateChanged(async u=>{ user=u; S.user=u; renderBtn(); if(u){ await pull(); } });
    renderBtn();
  }
  function snapshot(){ const o={}; KEYS().forEach(k=>o[k.slice(4)]=localStorage.getItem(k)); return o; }
  async function push(){ if(!user) return; try{ await db.ref(`users/${user.uid}/data`).set({ ...snapshot(), _updated: Date.now() }); status="저장됨 "+new Date().toLocaleTimeString("ko"); renderBtn(); }catch(e){ status="저장 실패"; renderBtn(); console.warn(e); } }
  async function pull(){ if(!user) return; try{ const snap=await db.ref(`users/${user.uid}/data`).get(); const d=snap.val();
      if(d){ // 원격 기록을 이 기기에 적용 (원격 우선)
        Object.keys(d).forEach(k=>{ if(k!=="_updated") localStorage.setItem("imm:"+k, d[k]); });
        status="불러옴"; renderBtn(); window.dispatchEvent(new HashChangeEvent("hashchange"));
      } else { await push(); } }catch(e){ status="불러오기 실패"; renderBtn(); console.warn(e); } }

  function idOf(u){ return (u.email||"").split("@")[0]; }
  function renderBtn(){ let b=$("#syncbtn"); if(!b){ b=document.createElement("button"); b.id="syncbtn"; b.className="icon"; $(".tools").insertBefore(b, $("#theme")); }
    b.innerHTML = user ? `👤 ${idOf(user)}` : "🔐 로그인"; b.title = user ? (status||"동기화 중") : "아이디로 로그인하면 기록이 모든 기기에서 이어집니다";
    b.onclick = user ? menu : dialog; }
  function menu(){ if(confirm(`${idOf(user)} 로 로그인 중 (${status||"동기화"}).\n로그아웃할까요? (이 기기의 기록은 그대로 남습니다)`)) auth.signOut(); }
  function dialog(){
    const box=document.createElement("div"); box.className="sync-modal"; box.innerHTML=`<div class="sync-card"><h3>🔐 로그인 · 기록 이어하기</h3>
      <p class="muted">아이디와 비밀번호를 정해 입력하세요. 처음이면 자동으로 만들어집니다. 같은 아이디로 폰·PC 어디서든 이어집니다.</p>
      <label>아이디 <input id="sy-id" autocomplete="username" placeholder="예: tad"></label>
      <label>비밀번호 <input id="sy-pw" type="password" autocomplete="current-password" placeholder="예: tad"></label>
      <p id="sy-msg" class="muted" style="min-height:1.4em"></p>
      <div class="row"><button class="btn" id="sy-go">로그인 / 만들기</button><button class="btn ghost" id="sy-x">닫기</button></div></div>`;
    document.body.appendChild(box); $("#sy-id").focus();
    const close=()=>box.remove(); $("#sy-x").onclick=close; box.addEventListener("click",e=>{ if(e.target===box) close(); });
    const go=async()=>{ const id=$("#sy-id").value.trim(), pw=$("#sy-pw").value; const msg=$("#sy-msg");
      if(!id||!pw){ msg.textContent="아이디와 비밀번호를 입력하세요."; return; }
      msg.textContent="확인 중…";
      try{ await auth.signInWithEmailAndPassword(emailOf(id), pwOf(pw)); close(); }
      catch(e){ if(["auth/user-not-found","auth/invalid-credential","auth/invalid-login-credentials"].includes(e.code)){
          try{ await auth.createUserWithEmailAndPassword(emailOf(id), pwOf(pw)); close(); }
          catch(e2){ msg.textContent = e2.code==="auth/email-already-in-use" ? "비밀번호가 틀렸습니다." : "실패: "+(e2.message||e2.code); } }
        else msg.textContent = e.code==="auth/wrong-password" ? "비밀번호가 틀렸습니다." : "실패: "+(e.message||e.code); } };
    $("#sy-go").onclick=go; box.addEventListener("keydown",e=>{ if(e.key==="Enter") go(); });
  }
  init().catch(e=>console.warn("sync init failed",e));
})();
