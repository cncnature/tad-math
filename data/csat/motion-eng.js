// 영어 모션 풀이 — 패턴 17개(e-infer-blank-hard 는 motion-sample.js) + 고난도 8개. 형식: docs/MOTION-SCHEMA.md
// 모든 예문은 자작(본문제 정답을 그대로 보여 주지 않음). 픽셀 무대 640×360.
window.DATA = window.DATA || {};
(function(){
const M = (window.DATA.csatMotion = window.DATA.csatMotion || {});

/* ───────── 듣기 ───────── */
M["e-lis-main"] = {
 title:"듣기 목적 — 전환 표현 뒤 문장을 선택지 동사와 맞추기",
 els:[
  { id:"opt", k:"box", at:[500,70], w:240, h:58, t:"선택지 끝 동사 먼저 훑기\n안내? 요청? 홍보?", c:0 },
  { id:"t1", k:"text", at:[20,130], width:340, parts:[{t:"Good morning, students.",c:6}] },
  { id:"t2", k:"text", at:[20,180], width:340, parts:[{t:"As you know,",id:"ayk",c:6},{t:"the hall is crowded.",c:6}] },
  { id:"skip", k:"label", at:[244,127], anchor:"start", c:6, t:"← 인사·배경: 흘려듣기" },
  { id:"t3", k:"text", at:[20,240], width:340, parts:[{t:"So,",id:"so",c:1},{t:"starting Monday,"},{t:"please sign up online.",id:"pl",c:1}] },
  { id:"o1", k:"box", at:[500,200], w:250, h:50, t:"① 강당 혼잡을 사과하려고\n(배경 단어 그대로 → 함정)", c:6 },
  { id:"o2", k:"box", at:[500,272], w:250, h:44, t:"② 온라인 신청을 요청하려고 ✓", c:1, fill:true },
  { id:"key", k:"box", at:[320,333], w:600, h:34, t:"키포인트: 인사·배경은 흘려듣고, So·Please 뒤 문장 = 목적", c:4, fill:true }
 ],
 steps:[
  { say:"방송 전 **선택지 끝 동사**부터 훑는다: 안내인가, 요청인가, 홍보인가.", show:["opt"], hi:["opt"] },
  { say:"인사·배경(As you know ~)은 **흘려듣는다**. 아직 목적이 아니다.", show:["t1","t2","skip"], hi:["ayk"] },
  { say:"==So,== 같은 전환 표현이 들리면 집중! 뒤의 **please ~** 가 목적이다.", show:["t3"], hi:["so","pl"] },
  { say:"배경 단어(강당 혼잡)가 그대로 든 ①은 함정. ② **요청**이 내용과 맞는다.", show:["o1","o2"], hi:["o2"] },
  { say:"키포인트: 전환 표현(So, Please) 뒤 문장을 선택지 끝 동사와 맞춘다.", show:["key"], hi:["key"] }
 ]
};

M["e-lis-detail"] = {
 title:"듣기 금액 — 단가×수량 메모 → 변경 반영 → 할인은 마지막",
 els:[
  { id:"d1", k:"text", at:[20,50], width:320, parts:[{t:"M:"},{t:"Tickets are"},{t:"$15",id:"p15",c:0},{t:"each."}] },
  { id:"d2", k:"text", at:[20,100], width:320, parts:[{t:"W:"},{t:"We need"},{t:"three.",id:"n3",c:0}] },
  { id:"tb1", k:"table", at:[350,40], cw:68, rh:32, head:["항목","단가","수량","소계"], rows:[["성인","15","3","45"]] },
  { id:"d3", k:"text", at:[20,160], width:320, parts:[{t:"Actually,",id:"act",c:1},{t:"one is a child:"},{t:"$10.",id:"p10",c:0}] },
  { id:"tb2", k:"table", at:[350,40], cw:68, rh:32, head:["항목","단가","수량","소계"], rows:[["성인","15","2","30"],["어린이","10","1","10"]] },
  { id:"x1", k:"label", at:[486,158], c:1, t:"수량 3 → 2 로 고침" },
  { id:"sum", k:"box", at:[486,200], w:270, h:38, t:"합계 30 + 10 = 40달러", c:0 },
  { id:"d4", k:"text", at:[20,220], width:320, parts:[{t:"W:"},{t:"I have a"},{t:"10% off",id:"off",c:4},{t:"coupon."}] },
  { id:"fin", k:"box", at:[486,260], w:270, h:44, t:"할인은 맨 끝에 한 번\n40 × 0.9 = 36달러", c:1, fill:true },
  { id:"key", k:"box", at:[320,330], w:600, h:34, t:"키포인트: 단가×수량 즉시 메모 → Actually 뒤 변경 → 할인은 마지막", c:4, fill:true }
 ],
 steps:[
  { say:"숫자는 듣는 즉시 **단가 × 수량**으로 적는다: 15달러 × 3장.", show:["d1","d2","tb1"], hi:["p15","n3"] },
  { say:"==Actually== 뒤에는 앞 내용이 바뀐다. 한 명은 어린이, 10달러.", show:["d3","tb2","x1"], hide:["tb1"], hi:["act","p10"] },
  { say:"고친 메모로 합계를 낸다: 30 + 10 = **40달러**.", show:["sum"], hi:["sum"] },
  { say:"쿠폰·할인은 **합계를 낸 뒤 맨 마지막**에 한 번만 적용한다.", show:["d4","fin"], hi:["off","fin"] },
  { say:"키포인트: 처음 수량 그대로 계산하거나 할인을 일부에만 적용하면 함정.", show:["key"], hi:["key"] }
 ]
};

M["e-lis-response"] = {
 title:"듣기 응답 — 마지막 말(제안·질문)에 이어지는 대답",
 els:[
  { id:"b1", k:"box", at:[190,34], w:340, h:34, t:"M: I'm nervous about my speech tomorrow.", c:0 },
  { id:"prob", k:"label", at:[500,40], c:4, t:"문제 상황: 발표 긴장" },
  { id:"b2", k:"box", at:[430,78], w:340, h:34, t:"W: Did you practice in front of anyone?", c:2 },
  { id:"b3", k:"box", at:[190,122], w:340, h:34, t:"M: No, only alone in my room.", c:0 },
  { id:"b4", k:"text", at:[290,175], width:340, parts:[{t:"W: Why don't we",id:"why",c:1},{t:"practice together?"}] },
  { id:"opt", k:"table", at:[20,198], cw:300, rh:26, head:["선택지 (남자의 응답)","판단"], rows:[["① I wrote my notes yesterday.","✗ 단어(notes)만 반복"],["② Sure, I'm free after four.","✓ 제안 수락 + 시간"],["③ The audience was big.","✗ 제안에 대한 대답 아님"]] },
  { id:"key", k:"box", at:[320,330], w:600, h:34, t:"키포인트: 마지막 말이 제안이면 수락·거절+이유, 질문이면 직접 대답", c:4, fill:true }
 ],
 steps:[
  { say:"먼저 대화의 **문제 상황**을 한 단어로 잡는다: 남자는 발표가 걱정이다.", show:["b1","prob"], hi:["prob"] },
  { say:"흐름을 따라간다. 혼자서만 연습했다는 사실이 나온다.", show:["b2","b3"], hi:["b3"] },
  { say:"정답 근거는 **마지막 말**. Why don't we ~ 는 ==제안==이다.", show:["b4"], hi:["why"] },
  { say:"제안에는 **수락·거절 + 이유**로 답한다. 단어만 반복한 ①③은 지운다.", show:["opt"], hi:["opt"] },
  { say:"키포인트: 대화 속 단어를 반복만 한 선택지는 대답이 아니다.", show:["key"], hi:["key"] }
 ]
};

/* ───────── 대의 파악 ───────── */
M["e-main-claim"] = {
 title:"주장·요지 — 통념 → 반박(In fact) → should 문장",
 els:[
  { id:"s1", k:"text", at:[20,50], width:600, parts:[{t:"Many people believe",id:"many",c:6},{t:"long study hours"},{t:"bring better grades."}] },
  { id:"b1", k:"box", at:[130,215], w:210, h:44, t:"통념: 오래 공부 = 좋은 성적", c:6 },
  { id:"s2", k:"text", at:[20,100], width:600, parts:[{t:"In fact,",id:"inf",c:1},{t:"short breaks"},{t:"help memory more."}] },
  { id:"ar", k:"arrow", from:[240,215], to:[305,215], c:1, t:"반박", dx:-14 },
  { id:"s3", k:"text", at:[20,150], width:600, parts:[{t:"Students"},{t:"should",id:"sh",c:1},{t:"rest between study sessions.",id:"rest",c:4}] },
  { id:"b2", k:"box", at:[460,215], w:300, h:44, t:"필자 주장: 공부 사이에 쉬어야 한다", c:1, fill:true },
  { id:"o1", k:"box", at:[170,280], w:290, h:36, t:"✗ 공부 시간을 최대한 늘려야 한다", c:6 },
  { id:"o2", k:"box", at:[470,280], w:290, h:36, t:"✓ 학습 중간에 휴식을 넣어야 한다", c:1, fill:true },
  { id:"key", k:"box", at:[320,334], w:600, h:32, t:"키포인트: 통념 → But / In fact → should 문장 = 필자의 주장", c:4, fill:true }
 ],
 steps:[
  { say:"첫 문장이 **Many people believe** — 통념이다. 필자는 대개 그 반대편.", show:["s1","b1"], hi:["many"] },
  { say:"==In fact== 가 나오면 반박이 시작된다.", show:["s2","ar"], hi:["inf"] },
  { say:"**should** 문장이 주제문. 필자의 주장을 우리말 한 줄로 옮긴다.", show:["s3","b2"], hi:["sh","rest","b2"] },
  { say:"통념을 옮긴 선지는 지우고, 주장을 **가장 넓게 덮는** 선지를 고른다.", show:["o1","o2"], hi:["o2"] },
  { say:"키포인트: 통념 → 반박 구조를 찾으면 주장이 보인다.", show:["key"], hi:["key"] }
 ]
};

M["e-main-mood"] = {
 title:"심경 변화 — 전환점 앞뒤의 몸의 반응을 감정어로",
 els:[
  { id:"vl", k:"line", from:[320,34], to:[320,200], c:6, dash:true },
  { id:"L", k:"text", at:[20,70], width:280, parts:[{t:"My hands shook.",id:"h",c:0},{t:"My heart pounded.",id:"hp",c:0}] },
  { id:"R", k:"text", at:[340,70], width:280, parts:[{t:"Then,",id:"then",c:1},{t:"the crowd cheered."},{t:"I smiled.",id:"sm",c:2},{t:"I felt lighter.",id:"lt",c:2}] },
  { id:"e1", k:"box", at:[160,170], w:160, h:40, t:"nervous (긴장)", c:0 },
  { id:"e2", k:"box", at:[480,170], w:160, h:40, t:"relieved (안도)", c:2, fill:true },
  { id:"ar", k:"arrow", from:[245,170], to:[395,170], c:6 },
  { id:"tb", k:"table", at:[50,215], cw:180, rh:30, head:["선택지","앞","뒤"], rows:[["nervous → relieved","○","○"],["nervous → disappointed","○","✗"]] },
  { id:"key", k:"box", at:[320,333], w:600, h:34, t:"키포인트: 전환점 앞·뒤 몸의 반응 → 감정어, 양쪽 다 맞아야 정답", c:4, fill:true }
 ],
 steps:[
  { say:"전환점 **Then,** 을 찾아 글을 앞·뒤로 나눈다.", show:["vl","L","R"], hi:["then"] },
  { say:"앞: 손이 떨리고 심장이 뛴다 → **nervous**. 감정어가 없어도 몸이 단서.", show:["e1"], hi:["h","hp","e1"] },
  { say:"뒤: 미소, 몸이 가벼워짐 → **relieved**.", show:["e2","ar"], hi:["sm","lt","e2"] },
  { say:"선지는 화살표 ==양쪽 모두== 맞아야 한다. 뒤가 틀린 쪽은 지운다.", show:["tb"], hi:["tb"] },
  { say:"키포인트: 한쪽만 맞는 선지(nervous → disappointed)가 대표 함정.", show:["key"], hi:["key"] }
 ]
};

M["e-main-title"] = {
 title:"주제·제목 — 반복어(주제어) + 결론 문장의 평가",
 els:[
  { id:"s1", k:"text", at:[20,45], width:600, parts:[{t:"Everyone makes"},{t:"mistakes.",id:"m1",c:4},{t:"Scientists record their"},{t:"mistakes",id:"m2",c:4}] },
  { id:"s2", k:"text", at:[20,95], width:600, parts:[{t:"In this sense,",id:"its",c:1},{t:"mistakes",id:"m3",c:4},{t:"are"},{t:"steps toward learning.",id:"ev",c:2}] },
  { id:"k1", k:"box", at:[150,160], w:200, h:44, t:"주제어: mistakes", c:4 },
  { id:"plus", k:"label", at:[300,167], big:true, t:"+" },
  { id:"k2", k:"box", at:[460,160], w:260, h:44, t:"평가: 배움의 발판 (긍정)", c:2, fill:true },
  { id:"tb", k:"table", at:[20,205], cw:200, rh:28, head:["제목 선택지","주제어","평가"], rows:[["Mistakes: Steps to Growth","○","○"],["Why We Make Mistakes","○","✗ 없음"],["Never Make Mistakes","○","✗ 반대"]] },
  { id:"key", k:"box", at:[320,340], w:600, h:30, t:"키포인트: 제목 = 주제어 + 필자의 평가, 둘 다 있어야 정답", c:4, fill:true }
 ],
 steps:[
  { say:"**반복되는 핵심어**를 찾는다: mistakes 가 계속 나온다.", show:["s1"], hi:["m1","m2"] },
  { say:"결론 표지 **In this sense** 뒤 문장에서 필자의 평가를 확인한다.", show:["s2"], hi:["its","m3"] },
  { say:"반복어 = **주제어**.", show:["k1","plus"], hi:["k1"] },
  { say:"평가 = 배움의 발판. 주제어와 평가를 묶어 한 줄로 만든다.", show:["k2"], hi:["ev","k2"] },
  { say:"주제어만 있거나 평가가 ==반대==인 제목은 지운다.", show:["tb"], hi:["tb"] },
  { say:"키포인트: 소재 단어만 따온 제목, 평가가 반대인 제목이 함정.", show:["key"], hi:["key"] }
 ]
};

/* ───────── 세부 정보 ───────── */
M["e-detail-chart"] = {
 title:"도표 불일치 — 비교 표현 → 숫자 두 개 → 직접 계산",
 els:[
  { id:"ttl", k:"label", at:[180,40], t:"온라인 장보기 이용률(%)" },
  { id:"bars", k:"bars", at:[40,300], data:[20,28,40,38], labels:["2020","2021","2022","2023"], bw:50, gap:20, h:200, cs:[6,6,0,6] },
  { id:"c1", k:"text", at:[330,50], width:300, parts:[{t:"① 2022 was"},{t:"twice",id:"tw",c:1},{t:"2020."}] },
  { id:"c2", k:"text", at:[330,95], width:300, parts:[{t:"② The"},{t:"gap",id:"gap",c:1},{t:"of 21 and 23 is 12."}] },
  { id:"c3", k:"text", at:[330,140], width:300, parts:[{t:"③ 2023"},{t:"dropped",id:"dr",c:1},{t:"from 2022."}] },
  { id:"ar1", k:"arrow", from:[65,198], to:[203,104], c:0, t:"×2 ?", dx:-40, dy:-14 },
  { id:"g1", k:"line", from:[135,160], to:[292,160], c:1, dash:true },
  { id:"g2", k:"arrow", from:[300,160], to:[300,113], c:1, t:"10", dx:4, dy:4 },
  { id:"tb", k:"table", at:[330,180], cw:98, rh:28, head:["선지","계산","판정"], rows:[["① twice","40 = 2×20","○"],["② gap 12","38−28 = 10","✗"],["③ dropped","40 → 38","○"]] },
  { id:"key", k:"box", at:[480,322], w:290, h:44, t:"키포인트: 비교 표현 → 숫자 두 개\n→ 손으로 직접 계산", c:4, fill:true }
 ],
 steps:[
  { say:"첫 문장(도표 설명)은 건너뛰고 **막대(수치)**부터 본다.", show:["ttl","bars"], hi:["bars"] },
  { say:"선지마다 **비교 표현**에 동그라미: twice, gap, dropped.", show:["c1","c2","c3"], hi:["tw","gap","dr"] },
  { say:"① twice → 2022(40)와 2020(20) 두 숫자만: 40 = 2 × 20, 일치.", show:["ar1"], hi:["ar1","tw"] },
  { say:"② gap → 2021(28)과 2023(38): 차이는 ==10==. 12가 아니다!", show:["g1","g2"], hi:["g2","gap"] },
  { say:"표로 정리하면 불일치는 ②. 계산 없이 넘기면 함정에 빠진다.", show:["tb"], hi:["tb"] },
  { say:"키포인트: twice·gap·more than 은 반드시 숫자 두 개로 계산한다.", show:["key"], hi:["key"] }
 ]
};

M["e-detail-notice"] = {
 title:"안내문 일치 — 선택지 먼저, 키워드 줄만 대조",
 els:[
  { id:"opk", k:"table", at:[290,40], cw:160, rh:32, head:["선택지 키워드"], rows:[["① 대상 1~3학년"],["② 참가비 무료"],["③ 현장 신청 가능"],["④ 결과 12월 20일"]] },
  { id:"hd", k:"label", at:[120,30], t:"Science Camp 안내문" },
  { id:"nt", k:"text", at:[20,62], width:250, lh:38, parts:[{t:"Who: Grades 1-3",id:"who"},{t:"Date: Dec 5 (Sat)",id:"dt"},{t:"Fee: Free",id:"fee"},{t:"Sign up: online only",id:"su"},{t:"Results: Dec 20",id:"rs"}] },
  { id:"ar", k:"arrow", from:[210,170], to:[286,154], c:1 },
  { id:"lim", k:"box", at:[455,276], w:290, h:50, t:"제한어 only · not · except · free\n= 오답 단골", c:1, fill:true },
  { id:"res", k:"table", at:[456,40], cw:160, rh:32, head:["안내문 대조"], rows:[["○ Grades 1-3"],["○ Free"],["✗ online only"],["○ Results: Dec 20"]] },
  { id:"dd", k:"box", at:[155,276], w:270, h:50, t:"날짜 두 개 주의\n캠프 Dec 5 ≠ 발표 Dec 20", c:4 },
  { id:"key", k:"box", at:[320,334], w:600, h:30, t:"키포인트: 선택지 먼저 → 키워드 줄만 대조 → 제한어·날짜 확인", c:4, fill:true }
 ],
 steps:[
  { say:"**선택지를 먼저** 읽고 키워드만 뽑는다. 선택지 순서 = 글의 순서.", show:["opk"], hi:["opk"] },
  { say:"안내문에서 그 키워드가 있는 **줄만** 찾아 대조한다.", show:["hd","nt"], hi:["who","fee"] },
  { say:"③ 현장 신청? 안내문은 online ==only==. 제한어가 답을 가른다.", show:["ar","lim"], hi:["su","lim"] },
  { say:"대조 결과를 정리하면 불일치는 ③.", show:["res"], hi:["res"] },
  { say:"날짜가 두 개면 섞이기 쉽다. 캠프 날과 발표 날을 구분한다.", show:["dd"], hi:["dt","rs","dd"] },
  { say:"키포인트: 'but ~ is not' 같은 뒷부분 제한까지 끝까지 읽는다.", show:["key"], hi:["key"] }
 ]
};

/* ───────── 어법·어휘 ───────── */
M["e-form-grammar"] = {
 title:"어법 — 수식어 괄호 → 진짜 주어와 수일치, 관계사 뒤 완전성",
 els:[
  { id:"s", k:"text", at:[30,70], width:600, parts:[{t:"The number",id:"subj",c:0},{t:"of students",id:"m1",c:6},{t:"studying abroad",id:"m2",c:6},{t:"have",id:"v",c:1},{t:"grown."}] },
  { id:"br", k:"line", from:[138,95], to:[398,95], c:6, w:3, t:"( 수식어 ) 괄호로 묶기", dx:-70, dy:20 },
  { id:"sv", k:"arrow", from:[81,130], to:[428,130], c:0, t:"진짜 주어 The number = 단수", dx:-150, dy:22 },
  { id:"fix", k:"box", at:[530,160], w:160, h:44, t:"have ✗ → has ✓", c:1, fill:true },
  { id:"rt", k:"table", at:[30,205], cw:196, rh:32, head:["관계사 뒤 문장","완전한가?","관계사"], rows:[["I grew up ___ (in it)","완전","where"],["I read ___ (목적어 빠짐)","불완전","which / that"]] },
  { id:"key", k:"box", at:[320,333], w:600, h:34, t:"키포인트: 수식어 괄호 → 진짜 주어와 수일치 / 관계사는 뒤 문장 완전성", c:4, fill:true }
 ],
 steps:[
  { say:"밑줄이 **동사(have)**다. 먼저 이 동사의 **진짜 주어**를 찾는다.", show:["s"], hi:["v"] },
  { say:"주어와 동사 사이 **수식어**(전치사구·분사구)를 괄호로 묶는다.", show:["br"], hi:["m1","m2","br"] },
  { say:"남는 진짜 주어는 **The number** — 단수다.", show:["sv"], hi:["subj","sv"] },
  { say:"그래서 have ✗ → ==has==. 바로 앞 명사(students)에 속지 않는다.", show:["fix"], hi:["fix","v"] },
  { say:"관계사 밑줄은 **뒤 문장이 완전한지** 본다: 완전 → where, 불완전 → which.", show:["rt"], hi:["rt"] },
  { say:"키포인트: 동사 → 진짜 주어, 관계사 → 뒤 문장 완전성부터 확인.", show:["key"], hi:["key"] }
 ]
};

M["e-form-vocab"] = {
 title:"문맥 어휘 — 논리 방향 먼저, 밑줄을 반의어로 바꿔 보기",
 els:[
  { id:"ch1", k:"box", at:[110,50], w:170, h:40, t:"자전거 도로 ↑", c:0 },
  { id:"a1", k:"arrow", from:[200,50], to:[242,50], c:6 },
  { id:"ch2", k:"box", at:[320,50], w:150, h:40, t:"자전거 이용 ↑", c:0 },
  { id:"a2", k:"arrow", from:[400,50], to:[442,50], c:6 },
  { id:"ch3", k:"box", at:[530,50], w:170, h:40, t:"차량 혼잡 ↓", c:2, fill:true },
  { id:"s", k:"text", at:[20,135], width:600, parts:[{t:"As more people cycled,"},{t:"traffic jams"},{t:"increased.",id:"w",c:1}] },
  { id:"sw1", k:"box", at:[190,215], w:300, h:48, t:"원래: increased (늘었다)\n→ 혼잡↓ 흐름과 충돌 ✗", c:1 },
  { id:"sw2", k:"box", at:[480,215], w:240, h:48, t:"반의어: decreased\n→ 흐름과 맞음 ✓", c:2, fill:true },
  { id:"key", k:"box", at:[320,300], w:600, h:40, t:"키포인트: 논리 방향(원인→결과) 먼저 → 밑줄을 반의어로 바꿔 넣어 비교", c:4, fill:true }
 ],
 steps:[
  { say:"주제문으로 **논리 방향**부터 잡는다: 자전거 도로↑ → 이용↑.", show:["ch1","a1","ch2"], hi:["ch1","ch2"] },
  { say:"결론은 혼잡 ==감소==. 이 방향이 모든 밑줄을 재는 기준선이다.", show:["a2","ch3"], hi:["ch3"] },
  { say:"밑줄 문장: traffic jams **increased**. 뜻만 보면 어색하지 않다.", show:["s"], hi:["w"] },
  { say:"**반의어로 바꿔** 넣어 비교한다. 흐름에 맞는 쪽은 decreased.", show:["sw1","sw2"], hi:["sw1","sw2"] },
  { say:"키포인트: 단어 뜻이 아니라 앞뒤 인과로 판단한다.", show:["key"], hi:["key"] }
 ]
};

/* ───────── 빈칸·함축 ───────── */
M["e-infer-implied"] = {
 title:"함축 의미 — 대비 구조에서 밑줄 비유의 자리 정하기",
 els:[
  { id:"B", k:"box", at:[160,60], w:260, h:50, t:"B: 원리를 이해하는 학생\n(필자 지지)", c:2, fill:true },
  { id:"vs", k:"label", at:[320,66], big:true, t:"vs" },
  { id:"A", k:"box", at:[480,60], w:260, h:50, t:"A: 정답만 외우는 학생\n(필자 비판)", c:6 },
  { id:"u", k:"text", at:[40,150], width:560, parts:[{t:"Good learners"},{t:"carry a map,",id:"map",c:2},{t:"not a list of turns.",id:"turn",c:6}] },
  { id:"l1", k:"arrow", from:[232,126], to:[190,90], c:2 },
  { id:"l2", k:"arrow", from:[391,126], to:[450,90], c:6 },
  { id:"o1", k:"box", at:[170,235], w:280, h:46, t:"✗ 실제로 지도를 들고 다닌다\n(글자 그대로의 뜻)", c:6 },
  { id:"o2", k:"box", at:[470,235], w:280, h:46, t:"✓ 원리를 알아 새 문제에도 적용한다", c:1, fill:true },
  { id:"key", k:"box", at:[320,318], w:600, h:40, t:"키포인트: 밑줄 = 주제문의 비유 → 대비의 어느 쪽인가 → 풀어 쓴 선지", c:4, fill:true }
 ],
 steps:[
  { say:"글 전체의 **대비**부터 잡는다: 원리를 이해하는 학생 vs 정답만 외우는 학생.", show:["B","vs","A"], hi:["B","A"] },
  { say:"밑줄 표현을 읽는다. **map** 과 **list of turns** 가 서로 대비된다.", show:["u"], hi:["map","turn"] },
  { say:"map 은 B(원리), list of turns 는 A(외우기)에 대응한다.", show:["l1","l2"], hi:["l1","l2"] },
  { say:"글자 그대로의 선지는 함정. ==뜻을 풀어 쓴== 선지가 정답.", show:["o1","o2"], hi:["o2"] },
  { say:"키포인트: 밑줄은 주제문을 비유로 바꿔 쓴 것이다.", show:["key"], hi:["key"] }
 ]
};

M["e-infer-blank-basic"] = {
 title:"빈칸(단어·구) — 묻는 것 확인 → 우리말 답 먼저",
 els:[
  { id:"s", k:"text", at:[20,50], width:600, parts:[{t:"A coach's feedback"},{t:"is best seen as",id:"q",c:0},{t:"________",id:"blank",c:1}] },
  { id:"n", k:"box", at:[160,130], w:260, h:50, t:"다른 관점: 피드백 = 비난\n(필자가 반대)", c:6 },
  { id:"p", k:"box", at:[480,130], w:260, h:50, t:"필자: 피드백 = 나아질 정보\n(필자가 지지)", c:2, fill:true },
  { id:"kr", k:"box", at:[320,205], w:360, h:40, t:"우리말 답 먼저: '더 잘하게 돕는 것'", c:4, fill:true },
  { id:"o1", k:"box", at:[170,268], w:280, h:40, t:"✗ a sign of weakness (반대 관점)", c:6 },
  { id:"o2", k:"box", at:[470,268], w:280, h:40, t:"✓ a tool for improvement", c:1, fill:true },
  { id:"key", k:"box", at:[320,330], w:600, h:34, t:"키포인트: 빈칸이 묻는 것 → 우리말 답 먼저 → 필자 반대 관점은 함정", c:4, fill:true }
 ],
 steps:[
  { say:"빈칸 문장이 무엇을 묻는지: 피드백을 **무엇으로 보아야** 하는가.", show:["s"], hi:["q","blank"] },
  { say:"글의 대비에서 **필자가 지지하는 쪽**을 고른다.", show:["n","p"], hi:["p"] },
  { say:"선택지를 보기 전에 ==우리말 답==을 먼저 정한다.", show:["kr"], hi:["kr"] },
  { say:"필자가 반대하는 관점(약점·실패)을 옮긴 선지는 함정. 같은 뜻 선지를 고른다.", show:["o1","o2"], hi:["o2"] },
  { say:"키포인트: 우리말 답을 정해 두면 그럴듯한 반대 관점에 끌리지 않는다.", show:["key"], hi:["key"] }
 ]
};

/* ───────── 간접 쓰기 ───────── */
M["e-flow-irrelevant"] = {
 title:"무관한 문장 — 주제 화살표를 잇지 못하는 문장 찾기",
 els:[
  { id:"tp", k:"box", at:[320,40], w:320, h:40, t:"주제 화살표: 운동 → 집중력 ↑", c:1, fill:true },
  { id:"r1", k:"box", at:[260,100], w:440, h:34, t:"① Exercise sends more blood to the brain.", c:0 },
  { id:"r2", k:"box", at:[260,148], w:440, h:34, t:"② This helps students focus in class.", c:0 },
  { id:"ok1", k:"label", at:[560,129], c:2, t:"✓ 화살표를 잇는다" },
  { id:"r3", k:"box", at:[260,196], w:440, h:34, t:"③ Many gyms offer discounts in winter.", c:6 },
  { id:"r4", k:"box", at:[260,244], w:440, h:34, t:"④ Focused students remember more.", c:0 },
  { id:"l3", k:"label", at:[560,201], c:1, t:"✗ 초점 이탈(할인)" },
  { id:"by", k:"arrow", from:[260,166], to:[260,226], c:2, t:"② → ④ 바로 이어 읽기" },
  { id:"ok4", k:"label", at:[560,249], c:2, t:"✓" },
  { id:"key", k:"box", at:[320,330], w:600, h:34, t:"키포인트: 소재가 같아도 초점(화살표)이 다르면 무관한 문장", c:4, fill:true }
 ],
 steps:[
  { say:"첫 문장에서 주제를 **화살표**로 적는다: 운동 → 집중력.", show:["tp"], hi:["tp"] },
  { say:"①② 는 화살표를 잇는다: 운동 → 뇌 혈류 → 수업 집중.", show:["r1","r2","ok1"], hi:["r1","r2"] },
  { say:"③ 은 gym(운동 소재)이 있지만 초점이 **할인**으로 바뀐다.", show:["r3","r4","l3"], hi:["r3","l3"] },
  { say:"③ 을 ==빼고== 읽으면 ② → ④ 가 매끄럽게 이어진다. 검증 끝.", show:["by","ok4"], hide:["r3"], hi:["by"] },
  { say:"키포인트: 소재 단어(gym)가 있다고 관련 문장이라 착각하지 않는다.", show:["key"], hi:["key"] }
 ]
};

M["e-flow-order"] = {
 title:"순서 배열 — 첫머리 단서(such·this·As a result)를 이어 붙이기",
 els:[
  { id:"g", k:"box", at:[320,40], w:520, h:40, t:"주어진 글: For centuries, people sent letters by hand.", c:0, fill:true },
  { id:"A", k:"text", at:[20,108], width:190, lh:34, parts:[{t:"(A)",c:6},{t:"The telegraph"},{t:"changed"},{t:"this.",id:"this",c:1}] },
  { id:"B", k:"text", at:[225,108], width:190, lh:34, parts:[{t:"(B)",c:6},{t:"As a result,",id:"res",c:1},{t:"news was fast."}] },
  { id:"C", k:"text", at:[430,108], width:200, lh:34, parts:[{t:"(C)",c:6},{t:"But such letters",id:"such",c:1},{t:"took weeks."}] },
  { id:"q0", k:"box", at:[80,250], w:120, h:44, t:"주어진 글\n(전통)", c:0 },
  { id:"qC", k:"box", at:[240,250], w:110, h:44, t:"(C)\n한계", c:1 },
  { id:"aq1", k:"arrow", from:[142,250], to:[183,250], c:6, t:"such", dx:-16, dy:-14 },
  { id:"qA", k:"box", at:[390,250], w:110, h:44, t:"(A)\n변화", c:4 },
  { id:"aq2", k:"arrow", from:[297,250], to:[333,250], c:6, t:"this", dx:-14, dy:-14 },
  { id:"qB", k:"box", at:[540,250], w:110, h:44, t:"(B)\n결과", c:2 },
  { id:"aq3", k:"arrow", from:[447,250], to:[483,250], c:6, t:"result", dx:-20, dy:-14 },
  { id:"key", k:"box", at:[320,326], w:600, h:34, t:"키포인트: 단서가 받는 대상 확인 + 전통 → 한계 → 변화 → 결과로 검증", c:4, fill:true }
 ],
 steps:[
  { say:"주어진 글의 **화제와 시점**: 옛날, 손으로 쓴 편지.", show:["g"], hi:["g"] },
  { say:"각 단락 **첫머리 단서**를 표시한다: this, As a result, But such.", show:["A","B","C"], hi:["this","res","such"] },
  { say:"such letters = 손편지 → **(C)** 가 주어진 글 바로 뒤.", show:["q0","qC","aq1"], hi:["such","qC"] },
  { say:"(A)의 this = '편지가 느린 문제'. 주어진 글에 바로 붙이면 ==한계를 건너뛴다==.", show:["qA","aq2"], hi:["this","qA"] },
  { say:"As a result 는 맨 끝 결과. 이어 읽어 흐름을 검증한다.", show:["qB","aq3"], hi:["res","qB"] },
  { say:"키포인트: 단서가 약하면 전통 → 한계 → 변화 → 결과 논리로 배열.", show:["key"], hi:["key"] }
 ]
};

M["e-flow-insert"] = {
 title:"문장 삽입 — 연결 단서로 앞뒤 예측 → 논리가 끊긴 빈자리",
 els:[
  { id:"glab", k:"label", at:[535,24], c:1, t:"주어진 문장" },
  { id:"gv", k:"text", at:[440,58], width:190, parts:[{t:"However,",id:"how",c:1},{t:"they have"},{t:"one weakness.",id:"wk",c:1}] },
  { id:"need", k:"box", at:[535,165], w:180, h:52, t:"앞에는 장점\n뒤에는 단점 이야기", c:0 },
  { id:"para", k:"text", at:[24,50], width:350, lh:70, parts:[{t:"Online classes save travel time.",id:"c1"},{t:"They also let students replay lessons.",id:"c2"},{t:"For example, many lose focus at home.",id:"c3"},{t:"Their grades often drop as a result.",id:"c4"}] },
  { id:"slots", k:"text", at:[382,85], width:30, lh:70, parts:[{t:"①",id:"sl1",c:6},{t:"②",id:"sl2",c:6},{t:"③",id:"sl3",c:6},{t:"④",id:"sl4",c:6}] },
  { id:"ins", k:"box", at:[190,148], w:300, h:24, t:"However, they have one weakness.", c:1, fill:true },
  { id:"key", k:"box", at:[320,336], w:600, h:34, t:"키포인트: 연결 단서로 앞 예측 → 논리 공백 찾기 → 다음 문장까지 확인", c:4, fill:true }
 ],
 steps:[
  { say:"주어진 문장의 단서 **However** → 앞에는 반대 내용(장점)이 있어야 한다.", show:["glab","gv"], hi:["how"] },
  { say:"앞뒤에 필요한 것을 적는다: 앞 = 장점, 뒤 = **one weakness** 의 내용.", show:["need"], hi:["need","wk"] },
  { say:"자리마다 앞뒤를 잇는다. ② 에서 장점 → 갑자기 단점 예시로 ==끊긴다==.", show:["para","slots"], hi:["sl2","c2","c3"] },
  { say:"② 자리에 넣는다: 장점 → However → 단점. 흐름이 이어진다.", show:["ins"], hi:["ins","sl2"] },
  { say:"검증: 다음 문장 For example 이 **one weakness** 의 예로 자연스럽다.", hi:["c3","wk"] },
  { say:"키포인트: 넣은 뒤 다음 문장의 지시어·연결어까지 확인한다.", show:["key"], hi:["key"] }
 ]
};

/* ───────── 장문·요약 ───────── */
M["e-long-summary"] = {
 title:"요약문 — 요약문 먼저, 조건→결과 표, (A)(B) 둘 다 확인",
 els:[
  { id:"sm", k:"text", at:[20,50], width:600, parts:[{t:"Having"},{t:"(A)",id:"A",c:0},{t:"rather than",id:"rt",c:1},{t:"following orders"},{t:"made workers more"},{t:"(B).",id:"B",c:4}] },
  { id:"tb", k:"table", at:[40,120], cw:186, rh:32, head:["그룹","조건 (무엇을 바꿨나)","결과"], rows:[["1","일할 과제를 직접 고름","더 오래 매달림"],["2","시키는 대로 함","일찍 포기"]] },
  { id:"ma", k:"box", at:[170,250], w:260, h:40, t:"(A) ↔ 조건: 스스로 선택(choice)", c:0 },
  { id:"mb", k:"box", at:[470,250], w:260, h:40, t:"(B) ↔ 결과: 끈기 있는(committed)", c:4 },
  { id:"o", k:"text", at:[20,300], width:600, parts:[{t:"choice / committed ✓",id:"o1",c:2},{t:"choice / reluctant ✗",id:"o2",c:6},{t:"rules / committed ✗",id:"o3",c:6}] },
  { id:"key", k:"box", at:[320,340], w:600, h:30, t:"키포인트: 요약문 먼저 → 조건·결과 표 → (A)(B) 둘 다 맞는 짝", c:4, fill:true }
 ],
 steps:[
  { say:"**요약문을 먼저** 읽는다. (A) rather than ~ → (A)는 '명령 따르기'의 반대.", show:["sm"], hi:["A","rt","B"] },
  { say:"지문의 실험을 **조건 → 결과** 표로 정리한다.", show:["tb"], hi:["tb"] },
  { say:"(A)는 조건 쪽: 스스로 고르기 = **choice**.", show:["ma"], hi:["ma","A"] },
  { say:"(B)는 결과 쪽: 더 오래 매달림 = **committed**.", show:["mb"], hi:["mb","B"] },
  { say:"(A)(B) ==둘 다== 맞는 짝만 정답. 한쪽만 맞으면 지운다.", show:["o"], hi:["o1","o2"] },
  { say:"키포인트: (B)가 반대말(reluctant)인 선지가 대표 함정.", show:["key"], hi:["key"] }
 ]
};

M["e-long-set"] = {
 title:"장문 세트 — 문항 먼저, 단락 요지로 제목, 어휘는 반의어",
 els:[
  { id:"qs", k:"box", at:[320,32], w:360, h:36, t:"문항 먼저: 41번 제목 + 42번 어휘", c:4, fill:true },
  { id:"pt", k:"table", at:[20,66], cw:150, rh:34, head:["¶1","¶2","¶3","¶4"], rows:[["빈 공터 방치","주민이 텃밭","이웃이 만남","시가 지원"]] },
  { id:"br", k:"line", from:[20,148], to:[620,148], c:2, w:3, t:"네 요지를 모두 덮는 제목", dx:-90, dy:18 },
  { id:"t1", k:"box", at:[320,205], w:470, h:36, t:"✓ Empty Lots to Shared Gardens: A City Grows Together", c:1, fill:true },
  { id:"t2", k:"box", at:[320,252], w:470, h:36, t:"✗ How to Grow Tomatoes in a Small Space (¶2만)", c:6 },
  { id:"vb", k:"text", at:[20,302], width:600, parts:[{t:"¶3: neighbors grew"},{t:"distant",id:"vw",c:1},{t:"↔ close",id:"vc",c:2}] },
  { id:"vn", k:"label", at:[370,298], anchor:"start", c:1, t:"반의어 대입 → close 가 맞다" },
  { id:"key", k:"box", at:[320,342], w:600, h:28, t:"키포인트: 문항 먼저 → 단락 요지 → 모두 덮는 제목, 어휘는 반의어 대입", c:4, fill:true }
 ],
 steps:[
  { say:"장문은 **문항부터** 본다: 제목과 어휘를 한 번 읽으며 함께 푼다.", show:["qs"], hi:["qs"] },
  { say:"단락마다 **한 줄 요지**를 여백에 적는다.", show:["pt"], hi:["pt"] },
  { say:"제목은 네 요지를 ==모두 덮어야== 한다.", show:["br","t1"], hi:["br","t1"] },
  { say:"한 단락 소재(텃밭 기르기)만 담은 제목은 오답.", show:["t2"], hi:["t2"] },
  { say:"어휘: 밑줄을 **반의어로 바꿔** 넣는다. 이웃이 만났으니 distant ✗.", show:["vb","vn"], hi:["vw","vc"] },
  { say:"키포인트: 시간이 없어도 장문은 단락 요지로 빠르게 푼다.", show:["key"], hi:["key"] }
 ]
};

/* ═════════ 고난도 해부 (신호 → 첫 수 → 막힘 → 돌파 → 검산) ═════════ */
M["he-2023-34"] = {
 title:"추상 빈칸 — 뼈대 문장 → 두 소재의 연결 → 바꿔 쓴 선지",
 els:[
  { id:"sg", k:"box", at:[320,26], w:440, h:32, t:"신호: 추상 빈칸 + 철학 개념 + 과학 소재", c:4, fill:true },
  { id:"s", k:"text", at:[20,82], width:600, parts:[{t:"The idea of deep time,",id:"subj",c:0},{t:"which geologists use,",id:"mod",c:6},{t:"makes",id:"verb",c:1},{t:"plastic waste",id:"obj",c:5},{t:"look like"},{t:"________",id:"blank",c:1}] },
  { id:"A", k:"box", at:[130,180], w:220, h:46, t:"개념 A: 깊은 시간\n(수백만 년 단위로 봄)", c:0 },
  { id:"ln", k:"box", at:[320,180], w:130, h:46, t:"연결 고리\n= ?", c:6 },
  { id:"B", k:"box", at:[510,180], w:220, h:46, t:"소재 B: 플라스틱 쓰레기", c:5 },
  { id:"tr", k:"box", at:[320,245], w:600, h:36, t:"막힘: ✗ the speed of rock formation (A만)  ✗ ways to recycle (B만)", c:6 },
  { id:"bk", k:"box", at:[320,245], w:600, h:36, t:"돌파: A의 눈으로 B를 보면 → 수백만 년 남을 지층 속 흔적", c:1, fill:true },
  { id:"op", k:"box", at:[280,298], w:480, h:34, t:"✓ a layer that will outlast human history", c:1 },
  { id:"ck", k:"label", at:[580,304], c:2, t:"검산 ✓" },
  { id:"key", k:"box", at:[320,342], w:600, h:28, t:"키포인트: 주어–동사 뼈대 → 'A가 B를 어떻게 보게 하나' → 바꿔 쓴 선지", c:4, fill:true }
 ],
 steps:[
  { say:"**신호**: 빈칸이 추상 명사구, 지문에 철학 개념과 과학 소재가 함께 나온다.", show:["sg"], hi:["sg"] },
  { say:"**첫 수**: 긴 문장은 주어–동사만 남긴다. 관계절(which ~)은 괄호.", show:["s"], hi:["subj","verb","mod"] },
  { say:"두 소재 A(깊은 시간)와 B(플라스틱)가 **어떻게 이어지는지**가 핵심이다.", show:["A","ln","B"], hi:["ln"] },
  { say:"**막힘**: 고리를 못 찾으면 한쪽 소재 단어만 담은 선지로 간다. 둘 다 오답.", show:["tr"], hi:["tr"] },
  { say:"**돌파**: 'A가 B를 어떻게 다르게 보게 하나'를 한 줄로 → 바꿔 쓴 선지.", show:["bk","op"], hide:["tr"], hi:["bk","op"] },
  { say:"**검산**: 빈칸에 넣고 앞뒤 연결어(thus, rather)와 방향이 맞는지 본다.", show:["ck"], hi:["blank","ck"] },
  { say:"키포인트: 두 소재를 모두 담아 바꿔 쓴 선지가 정답이다.", show:["key"], hi:["key"] }
 ]
};

M["he-2023-37"] = {
 title:"낯선 소재 순서 — 단어 뜻 대신 단락의 기능으로 배열",
 els:[
  { id:"sg", k:"box", at:[320,24], w:460, h:30, t:"신호: 낯선 소재 + 첫머리에 however·this 가 없다", c:4, fill:true },
  { id:"g", k:"box", at:[320,72], w:580, h:34, t:"주어진 글: Farmers once paid beekeepers a fixed fee per hive.", c:0 },
  { id:"pA", k:"text", at:[20,140], width:190, lh:34, parts:[{t:"(A)",c:6},{t:"New contracts"},{t:"pay by"},{t:"fruit set.",id:"set",c:1}] },
  { id:"pB", k:"text", at:[225,140], width:190, lh:34, parts:[{t:"(B)",c:6},{t:"Now hives are"},{t:"placed well."}] },
  { id:"pC", k:"text", at:[430,140], width:200, lh:34, parts:[{t:"(C)",c:6},{t:"A hive count"},{t:"said little."}] },
  { id:"tp", k:"box", at:[320,232], w:560, h:36, t:"막힘: fruit set 을 '과일 세트'로 읽음 → (A)의 역할 오판", c:6 },
  { id:"fa", k:"label", at:[110,212], c:4, t:"대안" },
  { id:"fb", k:"label", at:[315,212], c:2, t:"효과" },
  { id:"fc", k:"label", at:[525,212], c:1, t:"한계" },
  { id:"chain", k:"text", at:[50,268], width:590, parts:[{t:"fixed fee"},{t:"→"},{t:"(C) limit",id:"cl",c:1},{t:"→"},{t:"(A) new pay",id:"an",c:4},{t:"→"},{t:"(B) effect",id:"be",c:2}] },
  { id:"ck", k:"label", at:[320,306], c:2, t:"검산: (B)가 글을 닫는 결론으로 읽힌다 ✓" },
  { id:"key", k:"box", at:[320,340], w:600, h:28, t:"키포인트: 기존 방식 → 한계 → 대안 → 효과, 단락 기능으로 배열", c:4, fill:true }
 ],
 steps:[
  { say:"**신호**: 소재가 낯설고 (A)(B)(C) 첫머리에 however·this 같은 단서가 없다.", show:["sg"], hi:["sg"] },
  { say:"**첫 수**: 주어진 글의 '기존 방식'을 한 줄로: 벌통 수만큼 고정 요금.", show:["g"], hi:["g"] },
  { say:"각 단락을 읽고 역할 이름(문제·대안·결과)을 붙일 준비를 한다.", show:["pA","pB","pC"] },
  { say:"**막힘**: fruit set 을 일상 뜻으로 읽으면 (A)를 놓친다. 뜻은 '열매 맺힘'.", show:["tp"], hi:["set","tp"] },
  { say:"단어 뜻 대신 **단락 기능**으로: (C) 한계, (A) 대안, (B) 효과.", show:["fa","fb","fc"], hide:["tp"], hi:["fa","fb","fc"] },
  { say:"**돌파**: 기존 방식 → 한계 → 대안 → 효과 순서로 배열한다.", show:["chain"], hi:["cl","an","be"] },
  { say:"**검산**: 끝까지 이어 읽어 (B)가 결론처럼 글을 닫는지 확인한다.", show:["ck"], hi:["ck","be"] },
  { say:"키포인트: 낯선 소재일수록 단어보다 단락의 역할을 본다.", show:["key"], hi:["key"] }
 ]
};

M["he-2022-38"] = {
 title:"단서 약한 삽입 — 자리마다 앞뒤만 이어 읽어 비약 찾기",
 els:[
  { id:"sg", k:"box", at:[320,24], w:480, h:30, t:"신호: 연결어 없음 + 끊긴 곳이 잘 안 보인다", c:4, fill:true },
  { id:"gv", k:"box", at:[470,82], w:300, h:46, t:"주어진 문장: Each new tool\nrequired new skills.", c:1 },
  { id:"req", k:"box", at:[470,150], w:300, h:50, t:"앞: 새 도구 등장이 있어야\n뒤: 기술 배우기가 와야", c:0 },
  { id:"para", k:"text", at:[20,80], width:250, lh:66, parts:[{t:"Farms used simple tools.",id:"c1"},{t:"Then machines arrived.",id:"c2"},{t:"Workers took courses.",id:"c3"},{t:"This training changed jobs.",id:"c4"}] },
  { id:"slots", k:"text", at:[272,113], width:30, lh:66, parts:[{t:"①",id:"sl1",c:6},{t:"②",id:"sl2",c:6},{t:"③",id:"sl3",c:6},{t:"④",id:"sl4",c:6}] },
  { id:"trap", k:"box", at:[470,215], w:300, h:40, t:"막힘: tools 단어만 보고 ① ?", c:6 },
  { id:"tb", k:"table", at:[330,122], cw:96, rh:30, head:["자리","앞 → 뒤","비약?"], rows:[["①","도구 → 기계","없음"],["②","기계 → 강좌","있음!"],["③","강좌 → 훈련","없음"]] },
  { id:"ins", k:"label", at:[475,264], c:1, t:"② : 기계 → (새 기술 필요) → 강좌" },
  { id:"ck", k:"label", at:[475,294], c:2, t:"검산: 강좌가 new skills 를 받음 ✓" },
  { id:"key", k:"box", at:[320,338], w:600, h:30, t:"키포인트: 앞·뒤 요구 적기 → 자리마다 이어 읽기 → 다음 문장 확인", c:4, fill:true }
 ],
 steps:[
  { say:"**신호**: 주어진 문장에 뚜렷한 연결어가 없고, 끊긴 곳이 잘 안 보인다.", show:["sg","gv"], hi:["gv"] },
  { say:"**첫 수**: 주어진 문장이 앞·뒤에 **요구하는 것**을 한 줄씩 적는다.", show:["req"], hi:["req"] },
  { say:"문단과 빈자리 ①~④ 를 놓고 각 자리의 앞뒤를 본다.", show:["para","slots"] },
  { say:"**막힘**: tools 같은 단어 단서만 보고 첫 그럴듯한 자리 ① 에 넣는다.", show:["trap"], hi:["sl1","c1","trap"] },
  { say:"**돌파**: 자리마다 앞·뒤 문장만 이어 읽는다. ==비약==은 ② 뿐.", show:["tb"], hide:["req","trap"], hi:["tb"] },
  { say:"② 에 넣으면 기계 등장 → 새 기술 필요 → 강좌로 고리가 메워진다.", show:["ins"], hi:["sl2","ins"] },
  { say:"**검산**: 다음 문장(Workers took courses)이 주어진 문장을 자연스럽게 받는다.", show:["ck"], hi:["c3","ck"] },
  { say:"키포인트: 단어 단서보다 '논리가 비약하는 유일한 곳'을 찾는다.", show:["key"], hi:["key"] }
 ]
};

M["he-2026-34"] = {
 title:"거의 같은 두 선지 — 차이 단어 하나를 지문 강도와 대조",
 els:[
  { id:"sg", k:"box", at:[320,26], w:460, h:32, t:"신호: 거의 같은 선지 두 개, 한 단어만 다르다", c:4, fill:true },
  { id:"o1", k:"text", at:[20,85], width:600, parts:[{t:"①"},{t:"readers"},{t:"usually",id:"u",c:2},{t:"trust familiar sources"}] },
  { id:"o2", k:"text", at:[20,128], width:600, parts:[{t:"②"},{t:"readers"},{t:"always",id:"a",c:1},{t:"trust familiar sources"}] },
  { id:"ck", k:"label", at:[440,124], anchor:"start", c:2, t:"검산: 반례와 모순 없음 ✓" },
  { id:"sm", k:"box", at:[320,190], w:560, h:40, t:"첫 수: 요약 + 강도 → '대체로 익숙한 출처를 믿는다 (예외 있음)'", c:0 },
  { id:"tp", k:"box", at:[320,255], w:560, h:36, t:"막힘: 더 단호하고 익숙한 always 쪽에 끌린다", c:6 },
  { id:"tb", k:"table", at:[40,230], cw:186, rh:30, head:["차이 단어","지문 근거","판정"], rows:[["usually","예외 독자도 언급","○"],["always","반례와 모순 (과장)","✗"]] },
  { id:"key", k:"box", at:[320,340], w:600, h:28, t:"키포인트: 같은 부분은 지우고, 차이 단어만 지문의 강도와 대조", c:4, fill:true }
 ],
 steps:[
  { say:"**신호**: 두 선지가 거의 같고 **한 단어**(usually / always)만 다르다.", show:["sg","o1","o2"], hi:["u","a"] },
  { say:"**첫 수**: 주장을 한 줄로 + 필자가 **얼마나 강하게** 말하는지까지 적는다.", show:["sm"], hi:["sm"] },
  { say:"**막힘**: 더 익숙하고 단호한 단어 쪽(always)을 고르기 쉽다.", show:["tp"], hi:["tp","a"] },
  { say:"**돌파**: 차이 단어에만 동그라미 → 지문 근거와 맞는지, ==과장==인지 따진다.", show:["tb"], hide:["tp"], hi:["tb"] },
  { say:"**검산**: 고른 ① 을 빈칸에 넣고 지문의 예시·반례와 모순이 없는지 읽는다.", show:["ck"], hi:["ck","u"] },
  { say:"키포인트: always·only·never 같은 강한 한정어는 과장 여부부터 의심.", show:["key"], hi:["key"] }
 ]
};

M["he-2027-21"] = {
 title:"비유 함축 — 비유의 물리적 성질 → 글 속 대응",
 els:[
  { id:"sg", k:"box", at:[320,26], w:480, h:32, t:"신호: 밑줄이 일상 비유, 글은 기업·기술 이야기", c:4, fill:true },
  { id:"u", k:"text", at:[20,82], width:600, parts:[{t:"The company kept"},{t:"running in iron boots.",id:"ub",c:1}] },
  { id:"ph1", k:"box", at:[110,140], w:170, h:40, t:"쇠 장화를 신고 달림", c:0 },
  { id:"pa1", k:"arrow", from:[200,140], to:[242,140], c:6 },
  { id:"ph2", k:"box", at:[320,140], w:150, h:40, t:"발이 무겁다", c:0 },
  { id:"pa2", k:"arrow", from:[400,140], to:[442,140], c:6 },
  { id:"ph3", k:"box", at:[530,140], w:170, h:40, t:"속도가 느려진다", c:1, fill:true },
  { id:"tp", k:"box", at:[320,205], w:560, h:36, t:"막힘: '튼튼한 보호 장비' 이미지 → 긍정 선지 ✗", c:6 },
  { id:"mp", k:"box", at:[320,205], w:560, h:36, t:"돌파: 글 속 대응 = 낡은 시스템 고집 → 혁신이 느려짐", c:1, fill:true },
  { id:"op", k:"box", at:[320,258], w:560, h:36, t:"✓ holding on to old systems that slow progress", c:1 },
  { id:"ck", k:"label", at:[320,302], c:2, t:"검산: 뒤 문장 Instead, rivals moved fast 와 같은 방향 ✓" },
  { id:"key", k:"box", at:[320,340], w:600, h:28, t:"키포인트: 비유의 성질(느려짐) → 글에서 무엇이 무엇을 방해하나", c:4, fill:true }
 ],
 steps:[
  { say:"**신호**: 밑줄이 일상 비유(쇠 장화)이고, 글은 기업 이야기다.", show:["sg","u"], hi:["ub"] },
  { say:"**첫 수**: 비유의 물리적 성질부터: 쇠 장화를 신고 달리면 → 발이 무겁다.", show:["ph1","pa1","ph2"], hi:["ph1","ph2"] },
  { say:"→ 속도가 느려진다. 이 **느려짐**이 비유의 핵심 성질.", show:["pa2","ph3"], hi:["ph3"] },
  { say:"**막힘**: 장화의 '튼튼함·보호' 이미지에 끌려 긍정적 선지를 고른다.", show:["tp"], hi:["tp"] },
  { say:"**돌파**: 글에서 '속도를 늦추는 것'을 찾는다: 낡은 시스템 고집.", show:["mp"], hide:["tp"], hi:["mp"] },
  { say:"'무엇이 무엇을 ==방해한다==' 로 바꿔 쓴 선지를 고른다.", show:["op"], hi:["op"] },
  { say:"**검산**: 밑줄 자리에 넣어 뒤 문장(Instead ~)과 같은 방향인지 확인.", show:["ck"], hi:["ck"] },
  { say:"키포인트: 비유는 이미지가 아니라 물리적 결과(느려짐)로 해석한다.", show:["key"], hi:["key"] }
 ]
};

M["he-2027-33"] = {
 title:"차이 속 공통점 빈칸 — 표 두 칸 → 공통점 한 단어",
 els:[
  { id:"sg", k:"box", at:[320,26], w:480, h:32, t:"신호: 차이를 길게 말하다 '그럼에도 공통점'으로 전환", c:4, fill:true },
  { id:"s", k:"text", at:[15,80], width:620, parts:[{t:"Despite these differences,",id:"des",c:1},{t:"every team"},{t:"teaches players to"},{t:"________",id:"blank",c:1}] },
  { id:"tb", k:"table", at:[40,118], cw:280, rh:32, head:["차이 (무엇을 가르치나)","공통점 (어떻게 따르게 하나)"], rows:[["훈련법·전술이 나라마다 다름","팀 규칙에 자기를 맞추게 함"]] },
  { id:"tp", k:"box", at:[320,222], w:560, h:36, t:"막힘: ✗ value local culture and personal style (지문 단어 多)", c:6 },
  { id:"cmp", k:"box", at:[320,222], w:360, h:36, t:"돌파: 공통점을 한 단어로 → '맞추기'", c:4, fill:true },
  { id:"op", k:"box", at:[320,272], w:560, h:36, t:"✓ fit in with the group", c:1 },
  { id:"ck", k:"label", at:[320,312], c:2, t:"검산: Despite 뒤 빈칸 = 공통점을 말하는가 ✓" },
  { id:"key", k:"box", at:[320,342], w:600, h:26, t:"키포인트: 차이/공통점 분리 → 공통점을 내 말 한 단어로 → 다른 단어 선지", c:4, fill:true }
 ],
 steps:[
  { say:"**신호**: 차이를 길게 말하다 **Despite these differences** 로 방향을 튼다.", show:["sg","s"], hi:["des"] },
  { say:"**첫 수**: 차이와 공통점을 **표 두 칸**으로 나눠 적는다.", show:["tb"], hi:["tb"] },
  { say:"**막힘**: 지문에 자주 나온 단어(culture, personal)가 많은 선지가 익숙해 보인다.", show:["tp"], hi:["tp"] },
  { say:"**돌파**: 공통점 칸을 내 말 ==한 단어==로 압축한다: 맞추기.", show:["cmp"], hide:["tp"], hi:["cmp"] },
  { say:"지문에 없던 단어로 같은 뜻을 쓴 선지를 찾는다.", show:["op"], hi:["op"] },
  { say:"**검산**: 고른 선지가 '차이'가 아니라 '공통점'을 말하는지 확인한다.", show:["ck"], hi:["ck","des","blank"] },
  { say:"키포인트: 빈칸 문장의 구조(Despite …)가 어느 칸을 묻는지 알려 준다.", show:["key"], hi:["key"] }
 ]
};

M["he-2027-34"] = {
 title:"개념 전이 빈칸 — 원래 분야의 성질을 새 분야에 짝짓기",
 els:[
  { id:"sg", k:"box", at:[320,26], w:480, h:32, t:"신호: 음악 용어(화음)로 요리를 설명한다", c:4, fill:true },
  { id:"o1h", k:"box", at:[160,84], w:260, h:36, t:"원래 분야: 음악", c:0 },
  { id:"d1", k:"box", at:[160,146], w:260, h:52, t:"화음 = 다른 음들이 동시에\n어울려 한 느낌을 만듦", c:0 },
  { id:"tp", k:"box", at:[320,215], w:560, h:36, t:"막힘: ✗ the sounds of a busy kitchen (원래 분야로 돌아감)", c:6 },
  { id:"n1h", k:"box", at:[480,84], w:260, h:36, t:"새 분야: 요리", c:2 },
  { id:"d2", k:"box", at:[480,146], w:260, h:52, t:"= 다른 맛들이 한 입에\n어울려 한 맛을 만듦", c:2, fill:true },
  { id:"ma", k:"arrow", from:[292,146], to:[348,146], c:1, t:"짝짓기", dx:-24, dy:-16 },
  { id:"op", k:"box", at:[320,262], w:560, h:36, t:"✓ flavors that blend into a single taste", c:1 },
  { id:"ck", k:"label", at:[320,304], c:2, t:"검산: 선지가 요리(새 분야)에 대한 말인가 ✓" },
  { id:"key", k:"box", at:[320,340], w:600, h:28, t:"키포인트: 원래 분야 성질 한 줄 → 새 분야의 짝 → 새 분야를 말하는 선지", c:4, fill:true }
 ],
 steps:[
  { say:"**신호**: 한 분야의 용어(화음)가 다른 분야(요리)를 설명하는 데 쓰인다.", show:["sg"], hi:["sg"] },
  { say:"**첫 수**: 원래 분야에서 개념의 핵심 성질을 한 줄로: 다른 음이 동시에 어울림.", show:["o1h","d1"], hi:["d1"] },
  { say:"**막힘**: '소리' 같은 원래 분야 표현에 끌려 음악 이야기로 돌아간다.", show:["tp"], hi:["tp"] },
  { say:"**돌파**: 같은 성질을 새 분야에서 찾는다: 다른 맛이 한 입에 어울림.", show:["n1h","d2","ma"], hide:["tp"], hi:["d2","ma"] },
  { say:"그 짝을 담은 선지를 고른다.", show:["op"], hi:["op"] },
  { say:"**검산**: 선지가 원래 분야가 아니라 ==새 분야==에 대한 말인지 확인한다.", show:["ck"], hi:["ck"] },
  { say:"키포인트: 개념은 성질만 가져오고, 답은 새 분야의 말로 쓴다.", show:["key"], hi:["key"] }
 ]
};

M["he-2027-39"] = {
 title:"전략 지문 삽입 — 문제→전략→결과 단계 중 빠진 자리",
 els:[
  { id:"sg", k:"box", at:[320,24], w:520, h:30, t:"신호: 주어진 문장 = 전략 단계, 글 = 기업의 대응 과정", c:4, fill:true },
  { id:"gv", k:"box", at:[515,82], w:230, h:62, t:"주어진 문장:\nSo the firm began\nselling repair kits.", c:1 },
  { id:"para", k:"text", at:[20,80], width:290, lh:56, parts:[{t:"Sales of new phones fell.",id:"c1"},{t:"Buyers kept old phones.",id:"c2"},{t:"This approach won fans.",id:"c3"},{t:"Yet repair income was small.",id:"c4"}] },
  { id:"tags", k:"text", at:[290,80], width:56, lh:56, parts:[{t:"문제",id:"tg1",c:1},{t:"문제",id:"tg2",c:1},{t:"결과",id:"tg3",c:2},{t:"한계",id:"tg4",c:6}] },
  { id:"st", k:"box", at:[515,152], w:230, h:34, t:"→ 단계: 전략", c:4, fill:true },
  { id:"slots", k:"text", at:[358,108], width:30, lh:56, parts:[{t:"①",id:"sl1",c:6},{t:"②",id:"sl2",c:6},{t:"③",id:"sl3",c:6},{t:"④",id:"sl4",c:6}] },
  { id:"tp", k:"box", at:[515,212], w:230, h:50, t:"막힘: So 만 보고\n단계가 다른 자리에 넣음", c:6 },
  { id:"jp", k:"box", at:[515,212], w:230, h:50, t:"돌파: 문제 → 결과 사이\n전략이 빠짐 → ②", c:1, fill:true },
  { id:"ck", k:"box", at:[515,275], w:230, h:46, t:"검산: This approach\n= repair kits 전략 ✓", c:2 },
  { id:"key", k:"box", at:[320,336], w:600, h:30, t:"키포인트: 단계 표시 → 주어진 문장의 단계 → 그 단계가 빠진 자리", c:4, fill:true }
 ],
 steps:[
  { say:"**신호**: 주어진 문장이 전략(So ~ began)을, 글은 기업의 대응을 말한다.", show:["sg","gv"], hi:["gv"] },
  { say:"**첫 수**: 글을 문제 → 전략 → 결과/한계 단계로 나눠 문장 옆에 표시한다.", show:["para","tags"], hi:["tg1","tg2","tg3","tg4"] },
  { say:"주어진 문장(수리 키트 판매 시작)은 ==전략== 단계다.", show:["st"], hi:["st"] },
  { say:"**막힘**: So 같은 연결어만 보고 단계가 맞지 않는 자리에 넣는다.", show:["slots","tp"], hi:["tp"] },
  { say:"**돌파**: 문제 바로 뒤에 결과(This approach)가 온다 → 그 사이 ② 가 비약.", show:["jp"], hide:["tp"], hi:["jp","sl2","tg2","tg3"] },
  { say:"**검산**: 다음 문장의 This approach 가 주어진 문장의 전략을 받는다.", show:["ck"], hi:["c3","ck"] },
  { say:"키포인트: 넣은 뒤 다음 문장 주어·지시어(this approach)까지 확인.", show:["key"], hi:["key"] }
 ]
};
})();
