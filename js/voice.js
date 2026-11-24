/* TAD 공부방 — 판서 음성 (js/voice.js)
   브라우저 내장 음성(Web Speech)을 '선생님 말투'로 읽게 하는 층. 세 가지를 한다.
   ① 가장 자연스러운 한국어 음성 고르기: 신경망 음성(Edge 'SunHi/InJoon Online (Natural)', Chrome 'Google 한국의', Apple 'Yuna 향상됨')을 먼저 고르고,
      기계음에 가까운 옛 음성(Windows 'Heami' 등)은 맨 뒤로. 학생이 고른 음성은 기억한다(imm:voice).
   ② 읽을 수 있는 말로 바꾸기: 수식·기호(x² → 엑스 제곱, 2/15 → 15분의 2, = → 은/는, ≤ → 이하, Ω → 옴 …), **강조**·이모지 제거.
   ③ 대화체로 다듬기: 판서 메모 말투(…한다/…이다)를 설명 말투(…해요/…예요)로 바꾸고, 단계 앞에 "자,", "이번엔" 같은 연결말을 붙인다.
      문장 단위로 끊어 읽되 문장 사이 쉼은 짧게(약 0.25초) — 한 덩어리로 몰아 읽지도, 단어마다 끊기지도 않게.
      (Chrome 은 15초 넘는 긴 발화를 끊는 버그가 있어 문장 단위가 더 안정적이다.)
   근거: Mayer 개인화 원리 — 대화체(“우리”, “-해요”) 설명이 형식적 문어체보다 전이 점수가 높다(Mayer, Fennell, Farmer & Campbell, 2004, J. Educ. Psychol. 96(2)). */
(function(){
  const has=typeof window!=="undefined"&&"speechSynthesis" in window;
  const LS="imm:voice";
  const get=()=>{ try{ return JSON.parse(localStorage.getItem(LS))||{}; }catch(e){ return {}; } };
  const put=o=>{ try{ localStorage.setItem(LS,JSON.stringify({...get(),...o})); }catch(e){} };

  // ① 음성 순위
  function score(v){ const n=v.name||""; let s=0;
    if(/natural|neural|online/i.test(n)) s+=100;
    if(/google/i.test(n)) s+=70;
    if(/premium|enhanced|향상|고품질/i.test(n)) s+=60;
    if(/sunhi|injoon|hyunsu|yuna|sora|jian/i.test(n)) s+=15;
    if(/heami|compact/i.test(n)) s-=40;
    if(v.localService===false) s+=5;
    return s; }
  function list(){ if(!has) return []; return window.speechSynthesis.getVoices().filter(v=>/^ko/i.test(v.lang)).sort((a,b)=>score(b)-score(a)); }
  function pick(){ const L=list(); const want=get().name; return L.find(v=>v.name===want)||L[0]||null; }
  const natural=v=>v&&score(v)>=60;

  // ② 읽을 수 있는 말로
  const NUMB="영일이삼사오육칠팔구", BAT=new Set([0,1,3,6,7,8]);
  function josa(prev,a,b){ // 받침 있으면 a(은/이/을), 없으면 b
    const c=prev.slice(-1); if(!c) return b; const k=c.charCodeAt(0);
    if(k>=0xAC00&&k<=0xD7A3) return (k-0xAC00)%28?a:b;
    if(/[0-9]/.test(c)) return BAT.has(+c)?a:b;
    if(/[lmnrLMNR]/.test(c)) return a; return b; }
  const LAT={x:"엑스",y:"와이",z:"제트",a:"에이",b:"비",c:"씨",n:"엔",k:"케이",m:"엠",p:"피",q:"큐",r:"알",t:"티",f:"에프",g:"지",h:"에이치",S:"에스",V:"브이",I:"아이",R:"알",P:"피",A:"에이",B:"비",C:"씨",D:"디",M:"엠",N:"엔",E:"이",F:"에프",G:"지",H:"에이치",O:"오",Q:"큐",T:"티",W:"더블유",X:"엑스",Y:"와이"};
  const SUP={"²":" 제곱","³":" 세제곱","⁴":" 네제곱","ⁿ":" 엔제곱"};
  function speakable(t){ let s=String(t??"");
    s=s.replace(/\$+([^$]*)\$+/g,(m,x)=>" "+mathRead(x)+" ")
       .replace(/\*\*|==|__|`/g,"").replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu,"")
       .replace(/([①-⑩])/g,(m,c)=>["첫째","둘째","셋째","넷째","다섯째","여섯째","일곱째","여덟째","아홉째","열째"][c.charCodeAt(0)-0x2460]+", ")
       .replace(/D-(\d+)/g,"디데이 $1일 전").replace(/(\d)\s*~\s*(\d)/g,"$1에서 $2")
       .replace(/(\d+(?:\.\d+)?)\s*%/g,"$1퍼센트").replace(/(\d)\s*Ω/g,"$1 옴").replace(/Ω/g,"옴").replace(/(\d)″/g,"$1초").replace(/(\d)\s*°/g,"$1도")
       .replace(/∠/g,"각 ").replace(/△/g,"삼각형 ").replace(/∴|⇒/g,", 그래서 ").replace(/→/g,", 그러면 ").replace(/↔|⇔/g," 와 같은 뜻인 ")
       .replace(/·/g,", ").replace(/[|/](?=\s)/g,", ").replace(/\s*\((?:[A-Za-z]{1,4}|[A-Za-z]+\s*\(?[A-Za-z]*\)?)\)/g,"").replace(/\s*\(([^()]{1,30})\)/g,", $1,")
       .replace(/[“”"']/g,"")
       .replace(/(\d)\s*kWh\b/g,"$1킬로와트시").replace(/(\d)\s*Wh\b/g,"$1와트시").replace(/(\d)\s*W\b/g,"$1와트").replace(/(\d)\s*h\b/g,"$1시간").replace(/(\d)\s*V\b/g,"$1볼트").replace(/(\d)\s*A\b/g,"$1암페어")
       .replace(/(\d)\s*cm²/g,"$1제곱센티미터").replace(/(\d)\s*cm\b/g,"$1센티미터").replace(/(\d)\s*pc\b/g,"$1파섹").replace(/(\d)\s*km\b/g,"$1킬로미터").replace(/(\d)\s*kg\b/g,"$1킬로그램")
       .replace(/(\d)\s*:\s*(?=\d)/g,"$1 대 ").replace(/^계산\s*:/,"계산하면,").replace(/([가-힣A-Za-z0-9)])\s*:\s+/g,"$1, ");
    s=mathRead(s,true);
    return s.replace(/\s*,\s*(,\s*)+/g,", ").replace(/\s+([,.?!])/g,"$1").replace(/\s{2,}/g," ").trim(); }
  function mathRead(x,soft){ let s=String(x)
      .replace(/\\(?:d|t)?frac\{([^{}]*)\}\{([^{}]*)\}/g,(m,a,b)=>`${b}분의 ${a}`).replace(/\\(?:d|t)?frac\s*(\S)\s*(\S)/g,"$2분의 $1")
      .replace(/\\sqrt\{([^{}]*)\}/g,"루트 $1").replace(/\\(text|mathrm)\{([^{}]*)\}/g,"$2")
      .replace(/\^\{?2\}?/g,"²").replace(/\^\{?3\}?/g,"³").replace(/\^\{?([^{}\s]+)\}?/g," 의 $1제곱")
      .replace(/_\{([^{}]*)\}/g," $1").replace(/_(\w)/g," $1")
      .replace(/\\times|×/g," 곱하기 ").replace(/\\div|÷/g," 나누기 ").replace(/\\cdot/g," 곱하기 ").replace(/\\(le|leq)|≤/g," 이하 ").replace(/\\(ge|geq)|≥/g," 이상 ").replace(/\\(ne|neq)|≠/g," 는 같지 않다 ")
      .replace(/\\pi|π/g,"파이").replace(/\\theta|θ/g,"세타").replace(/\\Rightarrow/g,", 그래서 ").replace(/\\(?:to|rightarrow)/g,", 그러면 ").replace(/\\[a-zA-Z]+/g," ").replace(/[{}]/g,"")
      .replace(/√\(?([^)\s]+)\)?/g,"루트 $1");
    s=s.replace(/(\d+)\s*\/\s*(\d+)/g,"$2분의 $1");
    s=s.replace(/([²³⁴ⁿ])/g,m=>SUP[m]);
    s=s.replace(/(\S)\s*\+\s*/g,"$1 더하기 ").replace(/(\S)\s+[−-]\s+/g,"$1 빼기 ");
    s=s.replace(/(^|[\s(,=+])([a-zA-Z])(?=$|[\s),.=+²³제의분])/g,(m,a,c)=>a+(LAT[c]||c));
    s=s.replace(/\\[,;!: ]/g," ");
    let eq=0; s=s.replace(/(\S+?)\s*=\s*/g,(m,p)=>{ eq++; return eq===1?p+josa(p,"은 ","는 "):p+(eq===2?", 그러니까 ":", 그래서 "); });
    return s; }

  // ③ 대화체
  const END=[[/이다(?=[.!:,]|\s|$)/g,"이에요"],[/한다(?=[.!:,]|\s|$)/g,"해요"],[/된다(?=[.!:,]|\s|$)/g,"돼요"],[/있다(?=[.!:,]|\s|$)/g,"있어요"],[/없다(?=[.!:,]|\s|$)/g,"없어요"],
    [/같다(?=[.!:,]|\s|$)/g,"같아요"],[/크다(?=[.!:,]|\s|$)/g,"커요"],[/작다(?=[.!:,]|\s|$)/g,"작아요"],[/많다(?=[.!:,]|\s|$)/g,"많아요"],[/본다(?=[.!:,]|\s|$)/g,"봐요"],[/준다(?=[.!:,]|\s|$)/g,"줘요"],
    [/쓴다(?=[.!:,]|\s|$)/g,"써요"],[/뺀다(?=[.!:,]|\s|$)/g,"빼요"],[/낸다(?=[.!:,]|\s|$)/g,"내요"],[/잇는다(?=[.!:,]|\s|$)/g,"이어요"],[/찾는다(?=[.!:,]|\s|$)/g,"찾아요"],[/넣는다(?=[.!:,]|\s|$)/g,"넣어요"],
    [/찍는다(?=[.!:,]|\s|$)/g,"찍어요"],[/읽는다(?=[.!:,]|\s|$)/g,"읽어요"],[/곱한다(?=[.!:,]|\s|$)/g,"곱해요"],[/나뉜다(?=[.!:,]|\s|$)/g,"나뉘어요"],[/보인다(?=[.!:,]|\s|$)/g,"보여요"],[/지난다(?=[.!:,]|\s|$)/g,"지나요"],
    [/움직인다(?=[.!:,]|\s|$)/g,"움직여요"],[/바뀐다(?=[.!:,]|\s|$)/g,"바뀌어요"],[/커진다(?=[.!:,]|\s|$)/g,"커져요"],[/작아진다(?=[.!:,]|\s|$)/g,"작아져요"],[/뒤집혔다(?=[.!:,]|\s|$)/g,"뒤집혔어요"],
    [/했다(?=[.!:,]|\s|$)/g,"했어요"],[/였다(?=[.!:,]|\s|$)/g,"였어요"],[/이었다(?=[.!:,]|\s|$)/g,"이었어요"],[/고른다(?=[.!:,]|\s|$)/g,"골라요"],[/그린다(?=[.!:,]|\s|$)/g,"그려요"],[/만든다(?=[.!:,]|\s|$)/g,"만들어요"],[/잰다(?=[.!:,]|\s|$)/g,"재요"],[/센다(?=[.!:,]|\s|$)/g,"세요"],[/놓는다(?=[.!:,]|\s|$)/g,"놓아요"],[/꺼낸다(?=[.!:,]|\s|$)/g,"꺼내요"],[/붙는다(?=[.!:,]|\s|$)/g,"붙어요"],[/줄어든다(?=[.!:,]|\s|$)/g,"줄어들어요"],[/늘어난다(?=[.!:,]|\s|$)/g,"늘어나요"],[/나온다(?=[.!:,]|\s|$)/g,"나와요"],[/온다(?=[.!:,]|\s|$)/g,"와요"],[/간다(?=[.!:,]|\s|$)/g,"가요"],[/쓰인다(?=[.!:,]|\s|$)/g,"쓰여요"],[/든다(?=[.!:,]|\s|$)/g,"들어요"],[/(는)?다\?/g,"나요?"],[/일까\?/g,"일까요?"],[/할까\?/g,"할까요?"]];
  function polite(s){ let o=s; for(const [re,to] of END) o=o.replace(re,to);
    o=o.replace(/([가-힣])이에요/g,(m,c)=>{ const k=c.charCodeAt(0); return c+((k-0xAC00)%28?"이에요":"예요"); });
    o=o.replace(/([가-힣]{1,4})(이다|다)$/,(m,a,b)=>m); // 남은 문어체는 그대로
    return o; }
  const OPEN=["자, ","이번엔, ","다음으로, ","그럼, ","여기서, ","이제, "];
  function talk(text,i,n){ let s=speakable(text); if(!s) return "";
    s=s.split(/(?<=[.!?])\s+/).map(polite).join(" ");
    if(i!=null&&n){ if(/^(키포인트|정리|핵심)/.test(s)) s=s.replace(/^(키포인트|정리|핵심)\s*[:：,]?\s*/,"마지막으로 꼭 기억할 점, ");
      else if(i===0) s="자, "+s; else if(i===n-1&&!/^(그래서|따라서|마지막)/.test(s)) s="정리하면, "+s; else if(!/^(먼저|그런데|그럼|이번|다음|그래서|따라서|여기|이제|자)/.test(s)&&i%2===1) s=OPEN[(i>>1)%OPEN.length+1]+s; }
    return s; }

  // 말하기: 문장 단위 큐, 문장 사이 짧은 쉼
  let gen=0;
  function cancel(){ gen++; if(has) try{ window.speechSynthesis.cancel(); }catch(e){} }
  function speak(text,opt={}){ return new Promise(res=>{ if(!has||!text) return res(); cancel(); const my=gen;
    const parts=text.split(/(?<=[.!?。])\s+|(?<=요,)\s+(?=.{25,})/).map(x=>x.trim()).filter(Boolean);
    const v=pick(); const st=get(); const rate=(st.rate||1)*(opt.rate||1);
    let i=0; const next=()=>{ if(my!==gen||i>=parts.length) return res(); const u=new SpeechSynthesisUtterance(parts[i++]); u.lang="ko-KR"; if(v) u.voice=v;
      u.rate=Math.max(0.6,Math.min(1.8,rate*(natural(v)?1.02:0.96))); u.pitch=natural(v)?1:1.05; u.volume=1;
      let done=false; const fin=()=>{ if(done) return; done=true; clearTimeout(tm); setTimeout(next,/[?]$/.test(u.text)?320:230); };
      const tm=setTimeout(fin,Math.max(2500,u.text.length*230/rate)); u.onend=fin; u.onerror=fin; window.speechSynthesis.speak(u); };
    next(); }); }

  // 음성 고르기 UI(판서 도구줄에 끼움)
  function picker(){ if(!has) return ""; return `<select class="wb-vsel" title="음성 고르기" aria-label="음성 고르기"></select>`; }
  function fill(sel){ if(!sel) return; const L=list(); const cur=pick(); if(!L.length){ sel.hidden=true; return; } sel.hidden=false;
    sel.innerHTML=L.map(v=>`<option value="${v.name.replace(/"/g,"&quot;")}"${cur&&v.name===cur.name?" selected":""}>${natural(v)?"★ ":""}${v.name.replace(/Microsoft |Google |\(.*?\)|- Korean.*$|Korean/gi,"").trim()||v.name}${natural(v)?" (자연스러움)":""}</option>`).join("")
      +`<option value="__rate">말 빠르기: ${({0.9:"천천히",1:"보통",1.15:"빠르게"})[get().rate||1]||"보통"}</option>`;
    sel.onchange=()=>{ if(sel.value==="__rate"){ const r=get().rate||1; put({rate:r===1?1.15:r===1.15?0.9:1}); fill(sel); return; } put({name:sel.value}); speak(talk("안녕하세요, 이 목소리로 설명할게요.")); }; }
  function hint(){ const v=pick(); if(!has) return "이 브라우저는 음성을 지원하지 않아요."; if(!v) return "한국어 음성이 없어요. 기기 설정에서 한국어 음성을 내려받아 주세요."; if(natural(v)) return ""; return "더 자연스러운 목소리: PC는 Edge 브라우저(★ SunHi·InJoon), 안드로이드는 Chrome(Google 한국어), 아이폰은 설정 → 손쉬운 사용 → 읽기 및 말하기 → 음성 → 한국어에서 '향상됨' 음성을 받으세요."; }
  if(has){ window.speechSynthesis.onvoiceschanged=()=>document.querySelectorAll(".wb-vsel").forEach(fill); }
  window.VOICE={speak,cancel,talk,speakable,list,pick,picker,fill,hint,natural};
})();
