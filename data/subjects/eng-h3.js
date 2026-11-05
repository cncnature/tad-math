// 영어 고3 (수능 영어 — 영어Ⅰ·영어Ⅱ 범위) — 2022 개정 교육과정(교육부 고시 제2022-33호) 기준. 수능 영어 영역(절대평가, 90점 이상 1등급, 45문항 = 듣기 17 + 독해 28, 70분)을
// 문항 유형별 전략으로 3단원 9차시로 짰다. 성취기준 코드는 2022 개정 영어과 성취기준 공개 데이터셋(korean-secondary-learning-map-mcp)의 영어Ⅰ(이해 8·표현 8)·영어Ⅱ(이해 8·표현 9) 목록을 썼고,
// 코드의 'Ⅰ·Ⅱ'는 로마 숫자 문자(U+2160·U+2161)로 적었다(scripts/check.js 의 std 정규식과 일치). 웹 조사는 하지 않았다(지시에 따름).
// 추정 사항: ① 문항 번호별 유형 배치(1~17 듣기, 18 목적·19 심경·20 주장·21 함축·22 요지·23 주제·24 제목·25 도표·26 인물·27~28 안내문·29 어법·30 어휘·31~34 빈칸·35 무관·36~37 순서·38~39 삽입·40 요약·41~45 장문)와
// 배점(듣기 37점·독해 63점, 3점 문항 10개)은 현행 수능 체제 기준이며 해마다 소폭 바뀔 수 있다. ② 시간 배분(듣기 약 25분·독해 약 45분)과 풀이 순서는 일반적 권장 전략이지 공식 지침이 아니다.
// ③ 1등급 비율 등 통계 수치는 확인하지 못해 적지 않았다. 영어 지문·대화문·인물·표는 모두 자작이며 실제 기출 원문을 쓰지 않았다.
window.DATA = window.DATA || {}; window.DATA.subjectsExtra = window.DATA.subjectsExtra || [];
window.DATA.subjectsExtra.push({ sid:"eng", grade:"h3",
 src:[["교육부 고시 2022 개정 영어과 교육과정 성취기준(공개 데이터셋)","https://www.npmjs.com/package/korean-secondary-learning-map-mcp"]],
 units:[

  /* ======================= 1. 수능 듣기 1~17번 유형 전략 ======================= */
  { id:"eng-h3-listen", grade:"h3", title:"수능 영어 · 듣기 1~17번 유형 전략", std:["12영Ⅰ-01-01","12영Ⅰ-01-02","12영Ⅰ-01-03","12영Ⅱ-01-03"],
    exam:"절대평가(90점 이상 1등급)에서 듣기 17문항 37점은 1등급의 '기본 점수'. 최근 수능은 독해 후반 난도가 높아 듣기에서 1문항을 잃으면 독해 허용 오답이 그만큼 줄어든다 — 듣기 만점이 사실상 전제.",
    lessons:[
     { id:"eng-h3-listen-1to5", title:"수능 듣기 ① 목적·의견·관계·그림·할 일 (1~5번)", std:["12영Ⅰ-01-02","12영Ⅰ-01-03"],
       concept:[
        "**선택지 선독**: 시작 안내 방송 동안 1~5번 선택지를 먼저 읽는다. 1번(목적)은 선택지 끝 동사(안내·요청·모집), 3번(관계)은 직업 쌍, 5번(할 일)은 질문의 남/여를 미리 표시한다.",
        "**1번 목적 담화**: 인사 → 배경(As you know ~) → **요청·공지 문장**(Please ~ / Starting ~, every ~ must) 순. 정답은 마지막 2~3문장. **2번 의견**: 한 사람이 두 번 이상 반복하는 'I think ~ / You should ~'.",
        "**3번 관계**: 직업 어휘 2개 이상 모은다(script·rehearsal → 감독–배우, menu·reservation → 직원–손님). 장소나 화제가 아니라 **두 사람의 역할**을 묻는다.",
        "**4번 그림**: 선택지 ①~⑤가 담화 순서와 같다. 위치(above, under, next to)·개수(two, a pair of)·모양(striped, round)·동작을 그림과 대조. 다른 것은 보통 하나뿐이다.",
        "**5번 할 일**: 역할 분담 대화. 'I'll ~ / Can you ~? → Sure, I'll ~' 뒤가 할 일, 'I already ~'는 끝난 일, 'Sorry, I can't'는 거절. 질문의 **남자/여자**에 먼저 동그라미."],
       why:"1~5번은 [12영Ⅰ-01-02]·[12영Ⅰ-01-03] 주제·의도 파악 문항으로 난도는 낮지만, 절대평가에서는 '당연히 맞히는' 문제를 놓치는 것이 가장 큰 손실이다. 유형별 정답 위치(목적은 끝, 그림은 순서대로, 할 일은 마지막 합의)를 알고 들으면 집중 구간이 짧아지고, 남는 틈에 다음 문항 선택지를 읽을 여유가 생긴다.",
       pitfalls:[
        "목적 담화의 **배경 설명**(행사 소개·사정 설명)을 목적으로 고름. 'As you know, the lot is crowded'는 배경, 'Starting next Monday, every car must ~'가 목적.",
        "2번 의견에서 **상대방 말**이나 처음 꺼낸 **질문**을 고름. 질문이 묻는 사람(남/여)이 끝까지 고수하는 주장이 답이다.",
        "5번에서 상대가 **제안한 일**을 할 일로 고름. 'Can you ~?'에 'Sorry' 뒤 다른 사람이 맡으면 그 사람의 일이다."],
       points:["1번: 마지막 요청·공지 문장(Please / must / Starting ~)의 동사 = 선택지 끝 동사", "3번: 직업 어휘 2개 + '누가 서비스를 주는가' — 장소 선택지는 함정", "5번: 'I'll ~' 직후 대화 종료 → 질문의 남/여 표시와 대조"],
       pattern:["① 안내 방송 중 1~5번 선택지 읽고 핵심어 밑줄 → ② 질문의 남/여·목적·관계 표시 → ③ 유형별 정답 위치(끝/순서/합의)에만 집중 → ④ 선택지는 바꿔 말한(paraphrase) 표현임을 전제", "그림: 손가락을 ①부터 순서대로 옮기며 '있다·위치·개수·모양'만 ✓/✗ — 틀린 것 하나를 찾는 즉시 다음 문항 선택지로 눈을 옮긴다"],
       memo:"듣기 1~5번은 '위치'로 푼다 — 목적은 끝, 의견은 반복, 그림은 순서, 할 일은 I'll.",
       quiz:[
        { q:"담화의 목적으로 가장 적절한 것은?  Hello, residents of Maple Apartments. This is the manager speaking. As you know, our parking lot has become crowded, and visitors often take the spaces of residents. Starting next Monday, every car must display a resident sticker on the front window. You can pick up your sticker at the office this week. Thank you for your cooperation.", opts:["주차장 공사 일정을 알리려고","방문객 주차 요금 인상을 안내하려고","차량 주차 스티커 부착을 안내하려고","주차장 청소 봉사자를 모집하려고"], a:2, exp:"'Starting next Monday, every car must display a resident sticker'가 공지의 핵심. 'As you know ~'의 혼잡 상황은 배경 설명이다." },
        { q:"여자의 의견으로 가장 적절한 것은?  M: Mom, can I skip piano practice today? I have a lot of homework. W: I understand, but I think you should practice at least fifteen minutes every day. M: Fifteen minutes won't make a difference. W: Actually, it will. Short daily practice builds skill much better than one long session on the weekend. M: Okay, I'll do fifteen minutes after dinner.", opts:["숙제를 먼저 끝내야 한다","짧더라도 매일 연습하는 것이 효과적이다","주말에 몰아서 연습해도 충분하다","피아노보다 공부가 더 중요하다"], a:1, exp:"여자가 반복한 말 'practice at least fifteen minutes every day' + 'Short daily practice builds skill much better'. ③은 여자가 반박한 내용." },
        { q:"남자가 할 일로 가장 적절한 것은?  W: The school festival booth is almost ready. I've finished the poster. M: Great. Did you order the paper cups? W: Yes, they arrive tomorrow. But we still need a tablecloth. M: I have one at home. I'll bring it tomorrow morning. W: Perfect. Then I'll set up the speaker. M: Sounds good.", opts:["포스터 만들기","종이컵 주문하기","식탁보 가져오기","스피커 설치하기"], a:2, exp:"남자의 'I'll bring it(a tablecloth) tomorrow morning'. 포스터·종이컵은 여자가 이미 한 일, 스피커는 여자가 맡은 일." }
       ] },
     { id:"eng-h3-listen-6to10", title:"듣기 ② 금액·이유·언급 안 된 것·불일치·표 (6~10번)", std:["12영Ⅰ-01-01","12영Ⅱ-01-01"],
       concept:[
        "**6번 금액**: 단가 → 개수 → 할인(10% off, coupon, membership) → 합계. 숫자가 나올 때마다 **메모**한다. 'I'll take two instead'처럼 중간에 바뀌는 개수가 단골 함정.",
        "**7번 이유**: 제안·초대를 **못 하는 이유**. 'I really wanted to, but ~' 뒤가 진짜 이유. 상대가 짐작한 이유('Is it because of ~?')는 'No'로 부정되는 함정이다.",
        "**8번 언급되지 않은 것**: 선택지 5개가 대화 순서대로 나온다. 들릴 때마다 ✓ → 끝났을 때 ✓ 없는 것. 바꿔 말한 표현(fee → cost, when → date)을 놓치지 않는다.",
        "**9번 내용 불일치**: 담화(행사 안내) 순서 = 선택지 순서. 날짜·장소·대상·비용·신청 방법을 선택지 옆에 **숫자로** 적어 대조. 틀린 것은 흔히 숫자·요일 하나.",
        "**10번 표 보고 고르기**: 조건이 하나씩 제시되며 후보가 줄어든다. 제외 조건(not over $50, not on Monday)부터 가로줄로 지우고, 마지막 남은 둘을 가르는 조건에 집중."],
       why:"6~10번은 [12영Ⅰ-01-01]·[12영Ⅱ-01-01] 세부 정보 파악 문항으로, 영어 실력보다 **메모와 소거 습관**이 정답률을 결정한다. 절대평가에서 6번 금액 계산 실수 하나는 3점 독해 문항 하나와 같은 무게이므로, 듣는 동안 숫자를 적는 손이 멈추지 않도록 훈련하는 것이 가장 효율 높은 투자다.",
       pitfalls:[
        "금액에서 **할인 전 합계**나 **단가**를 답으로 고름. 질문은 'How much will she pay?' — 할인·쿠폰·회원 혜택까지 적용한 최종 지불액이다.",
        "7번에서 화자가 **처음 언급한 사정**(아르바이트·감기)을 이유로 고름. 'No, I switched shifts'처럼 부정된 뒤에 나오는 것이 진짜 이유.",
        "표 문제에서 조건 하나를 흘려 들어 후보가 둘 남음. 조건은 보통 3~4개 — 마지막 조건('Then we have one left')까지 끝까지 듣는다."],
       points:["6번: 단가·개수·할인율 세 숫자를 적고 마지막에 한 번 계산 — 묶음 할인(three for $10)은 개별 단가 무시", "8·9번: 선택지 순서 = 담화 순서 → ✓ 없는 것 / 숫자·요일이 다른 것", "10번: 제외 조건 먼저 지우고 → 남은 둘을 가르는 마지막 조건"],
       pattern:["금액: ① 단가 ② 개수(변경 여부) ③ 할인·쿠폰·회원 ④ 합계 — 계산은 대화가 끝난 뒤 한 번만, 중간 계산 금지", "표: 조건을 들을 때마다 해당 행에 가로줄(✗) → 마지막 남은 것이 정답, 다시 고민하지 않는다"],
       memo:"6~10번은 손으로 푼다 — 숫자는 적고, 선택지는 지우고, 표는 가로줄.",
       quiz:[
        { q:"여자가 지불할 금액은?  W: Hi, I'd like two adult tickets for the aquarium. M: Adult tickets are $20 each. W: And one child ticket, please. M: Children are $10. Do you have a membership card? W: Yes, here it is. M: Then you get 10% off the total. W: Great, I'll pay by card.", opts:["$40","$45","$50","$54"], a:1, exp:"성인 $20×2 + 어린이 $10 = $50, 회원 10% 할인 → $45. $50은 할인 전 합계(함정)." },
        { q:"남자가 캠핑 여행에 갈 수 없는 이유는?  W: Are you joining the camping trip this weekend? M: I really wanted to, but I can't. W: Why not? Is it because of your part-time job? M: No, I switched shifts with a coworker. The problem is my grandmother is visiting from Busan, and my parents want me to stay home. W: I see. Maybe next time.", opts:["아르바이트 근무가 있어서","할머니가 방문하셔서","부산에 가야 해서","캠핑 장비가 없어서"], a:1, exp:"'No, I switched shifts'로 아르바이트는 부정됨. 'The problem is my grandmother is visiting'이 진짜 이유. 부산은 할머니가 오는 곳." },
        { q:"두 사람이 선택할 강좌는?  [표] A: 요가·월요일·오전·$40 / B: 요가·수요일·저녁·$60 / C: 수영·수요일·저녁·$45 / D: 수영·금요일·오전·$50.  W: Let's sign up for a class together this month. M: Sure. I can only go in the evening after work, though. W: Okay. And I'd rather not spend more than $50. M: Then we have one left. Swimming sounds fun. W: Let's go with that.", opts:["A","B","C","D"], a:2, exp:"저녁 조건 → B·C만 남고, $50 이하 조건 → B($60) 제외 → C. 마지막 'Swimming sounds fun'으로 확인." }
       ] },
     { id:"eng-h3-listen-11to17", title:"듣기 ③ 응답 고르기·상황 설명·세트 문항 (11~17번)", std:["12영Ⅰ-01-03","12영Ⅱ-01-03","12영Ⅰ-01-02"],
       concept:[
        "**11~12번 짧은 응답**: 마지막 말이 **의문사 의문문**(When/How long)이면 그 정보를 주는 답, **Yes/No 의문문·제안**이면 수락/거절 + 이유. 소재만 맞고 질문 형식에 안 맞는 선택지가 오답.",
        "**13~14번 긴 응답**: 마지막 말 직전의 **문제 상황**(고민·부탁)을 기억하고, 마지막 말이 '해결책 제안'인지 '추가 질문'인지 판단. 선택지를 미리 읽어 두면 들으면서 소거된다.",
        "**15번 상황 설명**: 'what would A most likely say to B?' — A가 **B에게** 하고 싶은 말(제안·부탁·조언)이 담화 후반 'wants to suggest/ask ~'에 나온다. 말하는 사람이 바뀌면 오답.",
        "**16~17번 세트**: 한 담화에 주제(16) + 언급되지 않은 것(17). 17번 선택지(동물·식물·국가 나열)를 먼저 보고 들린 것을 ✓. 16번 주제는 첫 문장 'Today, let's look at ~' + 반복 핵심어.",
        "**17번이 끝나면 즉시 독해**: 문항 사이 빈 시간에 다음 선택지를 읽어 두고, 17번 종료와 동시에 1~17번을 마킹한 뒤 18번으로 넘어간다. 남은 독해 시간은 약 45분."],
       why:"11~17번은 [12영Ⅰ-01-03]·[12영Ⅱ-01-03] 화자의 의도 추론 문항이다. 응답 문제는 내용 이해가 아니라 **마지막 말의 기능**(질문·제안·요청)을 알아채는 능력을 재고, 15번은 상황 전체를 요약해 '누가 누구에게'를 정확히 잡는 것이 핵심이다. 16~17번 세트에는 듣기 3점이 걸려 있어 듣기 만점 여부를 가른다.",
       pitfalls:[
        "응답 선택지에서 대화에 **나온 단어가 그대로** 든 것에 끌림. 소재는 맞지만 마지막 말(의문문 형식)에 대한 답이 아니다.",
        "15번에서 **B가 A에게** 할 말을 고름. 'what would Mina say to Tom'의 주어(Mina)가 말하는 사람이다.",
        "17번에서 선택지를 먼저 안 보고 듣다가 끝난 뒤 '뭐가 안 나왔지?' 하며 기억에 의존 — 반드시 선택지 옆에 ✓를 찍으며 듣는다."],
       points:["11~14번: 마지막 말이 의문사 의문문/Yes-No 의문문/제안 중 무엇인지 → 형식에 맞는 답", "15번: 'wants to suggest/ask ~' 문장 = 정답 내용, 말하는 사람(A) 확인", "16번 첫 문장 + 반복어, 17번은 ✓ 없는 선택지"],
       pattern:["응답: ① 마지막 말의 형식 표시(의문사/Yes-No/제안) → ② 소재만 맞는 선택지 소거 → ③ 남은 것 중 직전 문제 상황과 이어지는 답", "15번: 들으며 '누가(A) · 누구에게(B) · 무엇을(suggest ~)' 세 칸 메모 → 선택지 중 A의 입에서 나올 말"],
       memo:"응답은 마지막 말의 '형식', 15번은 '누가 누구에게', 17번은 ✓.",
       quiz:[
        { q:"남자의 마지막 말에 대한 여자의 응답으로 가장 적절한 것은?  W: Jake, you look worried. What's wrong? M: I left my science report at home, and it's due this afternoon. W: Can't you ask your mom to bring it? M: She's at work until six. W: Then why don't you email the teacher and explain the situation? M: Do you think she'll give me more time?", opts:["I'm sure she will if you explain honestly.","Science is my favorite subject, too.","Your mom can pick you up at six.","The report was due last week."], a:0, exp:"마지막 말은 Yes/No 의문문('Do you think she'll ~?') → 긍정/부정 + 이유. ②③은 소재만 맞고, ④는 사실과 다르다." },
        { q:"다음 상황에서 Mina가 Tom에게 할 말로 가장 적절한 것은?  Mina and Tom are preparing a group presentation. Tom has written the slides, but each one is full of long sentences. Mina knows the audience will stop reading. She wants to suggest that Tom keep only key words on each slide and explain the details out loud. In this situation, what would Mina most likely say to Tom?", opts:["Why don't we put just the key words on the slides?","Could you add more sentences to each slide?","Let's cancel the presentation and write a report.","You should read every sentence slowly to the audience."], a:0, exp:"'She wants to suggest that Tom keep only key words'를 제안문으로 바꾼 것. ②④는 반대 방향, ③은 담화에 없다." },
        { q:"담화에서 언급된 동물이 아닌 것은?  Hello, everyone. Today, let's look at how animals survive the cold. Arctic foxes grow thick white fur that hides them in the snow. Emperor penguins huddle in large groups to share body heat. Bears eat heavily in autumn and then sleep through the winter. Finally, some frogs let their bodies partly freeze and wake up in spring.", opts:["foxes","penguins","whales","frogs"], a:2, exp:"foxes·penguins·bears·frogs 순서로 언급. whales는 나오지 않는다 — 선택지 옆 ✓로 소거." }
       ] }
    ]},

  /* ======================= 2. 독해 — 대의 파악·빈칸·순서·삽입·무관·요약 ======================= */
  { id:"eng-h3-read", grade:"h3", title:"수능 영어 · 독해 — 대의 파악·빈칸·순서·삽입·무관한 문장·요약", std:["12영Ⅰ-01-02","12영Ⅰ-01-05","12영Ⅰ-01-06","12영Ⅱ-01-04","12영Ⅱ-01-05"],
    exam:"독해 28문항 63점. 절대평가지만 최근 수능은 빈칸(31~34)·순서(36~37)·삽입(38~39) 3점 문항의 오답률이 높아 1등급 비율이 크게 출렁인다. 90점은 10점까지만 잃어도 되는 점수 — 3점 3문항 또는 2점 5문항.",
    lessons:[
     { id:"eng-h3-read-main", title:"대의 파악 — 목적·심경·주장·요지·주제·제목 (18~24번)", std:["12영Ⅰ-01-02","12영Ⅰ-01-03","12영Ⅱ-01-02"],
       concept:[
        "**18번 목적**: 편지·이메일. 인사와 배경(Thank you for ~ / As you know ~) 뒤 **I am writing to ~ / I would like to ~ / Please ~**가 목적. 선택지 끝 동사(요청·안내·문의·항의)와 맞춘다.",
        "**19번 심경 변화**: 전반부·후반부의 감정 단서(throat dry·shook → smiled·took a breath)를 찾고 **전환점**(Then, Suddenly, But)을 표시. 선택지는 '앞 → 뒤' 순서여야 한다.",
        "**20번 주장**: should, must, need to, 명령문이 든 문장. **22번 요지**: 글을 한 문장으로 압축 — 역접(But/Yet) 뒤와 결론 신호(In other words, Thus) 뒤 문장이 우선.",
        "**23번 주제**(명사구)·**24번 제목**: 반복 핵심어 **2개**가 모두 든 선택지. 제목은 너무 넓은 것(Why X Matters), 너무 좁은 것(예시 하나), 논조(권장/경고)가 반대인 것을 버린다.",
        "**공통 구조**: 수능 지문은 '통념 → 역접 → 필자의 주장 → 예시/재진술'이 많다. 역접어와 결론 신호어 뒤 문장을 먼저 찾으면 전부 해석하지 않아도 대의가 잡힌다."],
       why:"18~24번은 [12영Ⅰ-01-02]·[12영Ⅰ-01-03]·[12영Ⅱ-01-02] 주제·요지·의도 파악 문항으로 대부분 2점이지만 7문항이 몰려 있어 절대평가 90점의 '기본 득점 구간'이다. 여기서 1문항이라도 잃으면 뒤 3점 문항의 허용 오답이 줄어들므로, 빠르면서도 정확한 신호어 독해가 1등급의 조건이다.",
       pitfalls:[
        "목적 지문의 **감사·배경 문장**을 목적으로 고름. 'Thank you for teaching ~'은 인사, 'I am writing to ask ~'가 목적.",
        "심경에서 **한쪽 감정만** 맞는 선택지나 **순서가 뒤집힌** 선택지. 앞·뒤 감정 두 칸을 적고 둘 다 확인한다.",
        "요지·제목에서 **예시 세부 내용**이 든 선택지(범위가 좁음)와 글의 단어를 그대로 쓴 **반대 논조** 선택지를 고름."],
       points:["18번: 'I am writing to + 동사' ↔ 선택지 끝 '~하려고'의 동사 일치", "19번: 감정 어휘 짝(anxious → reassured, nervous → confident) + 전환점 Then/But", "22~24번: 역접·결론 뒤 문장 요약 ↔ 핵심어 2개 모두 든 선택지, 논조 일치"],
       pattern:["① 문항 유형 확인 → ② 신호어(I'm writing to / But / In other words / should) 찾아 밑줄 → ③ 그 문장을 우리말 한 줄로 요약 → ④ 선택지 중 가장 넓게 덮으며 논조가 같은 것", "심경: 감정 단서에 시간 순서로 번호 → '전/후' 두 칸에 적기 → 선택지 순서까지 일치하는 것만 남기기"],
       memo:"목적은 I'm writing to, 주장은 should, 요지·제목은 역접·결론 뒤 한 문장 + 핵심어 둘.",
       quiz:[
        { q:"다음 글에 드러난 Lena의 심경 변화로 가장 적절한 것은?  Lena stared at the empty stage, her throat dry. In ten minutes she would give her first speech in English, and every sentence she had practiced seemed to vanish. Then her teacher appeared beside her and whispered, 'Just talk to one friendly face.' Lena spotted her little brother waving in the front row. She took a breath, smiled, and walked out.", opts:["anxious → reassured","bored → curious","proud → ashamed","excited → disappointed"], a:0, exp:"throat dry·sentences seemed to vanish(불안) → 전환점 Then(교사의 조언) → smiled, walked out(안심). 앞·뒤 감정 둘 다 맞는 것은 ①뿐." },
        { q:"다음 글의 요지로 가장 적절한 것은?  Many people believe that talent decides who becomes an expert. Yet studies of musicians, athletes, and chess players tell a different story. The best performers are not those who started with the most ability but those who practiced with clear goals and immediate feedback for years. In other words, how you practice matters more than what you were born with.", opts:["타고난 재능이 전문가를 결정한다","전문가가 되려면 여러 분야를 경험해야 한다","목표와 피드백이 있는 연습 방식이 재능보다 중요하다","음악가와 운동선수는 서로 다른 훈련이 필요하다"], a:2, exp:"통념(talent) → 역접 Yet → 결론 'In other words, how you practice matters more'. ①은 통념(반대 논조), ④는 글에 없는 세부." },
        { q:"다음 글의 제목으로 가장 적절한 것은?  City planners once thought wider roads would end traffic jams. But when a road gets wider, more people decide to drive, and within a few years the new lanes are just as crowded. Economists call this induced demand. Cities that have reduced jams did the opposite: they improved buses and bike lanes so that fewer trips needed a car at all.", opts:["More Lanes, More Cars: Why Wider Roads Fail","How to Build a Safer Highway","The Rising Cost of Public Buses","Bicycles: A Hobby for City Dwellers"], a:0, exp:"핵심어 wider roads + more people drive(induced demand). ②는 글에 없는 '안전', ③④는 예시 소재 하나만 잡아 좁다." }
       ] },
     { id:"eng-h3-read-blank", title:"수능 빈칸 추론·함축 의미 (21·31~34번)", std:["12영Ⅰ-01-05","12영Ⅱ-01-05"],
       concept:[
        "**빈칸의 역할 먼저**: 빈칸 문장이 **주제문**이면 뒤 예시가 근거, **결론**(Thus, The lesson is clear)이면 앞 전체의 요약, **예시**면 주제문을 구체화한 것. 역할을 정한 뒤 해석한다.",
        "**재진술 찾기**: 빈칸과 같은 뜻의 문장이 글 안에 한 번 더 있다(In other words, that is, 대구 문장). 그 문장의 핵심어를 **바꿔 말한** 선택지가 정답.",
        "**논조 결정 → 반대 방향 소거**: 글이 긍정/부정, 많음/적음 어느 쪽인지 먼저 정하면 선택지 2~3개가 바로 빠진다. 글의 단어를 그대로 쓴 선택지는 반대 방향인 경우가 많다.",
        "**21번 함축 의미**: 밑줄 친 비유는 글의 주제를 다른 말로 한 것. 밑줄 앞뒤의 설명(so, because, that is)과 마지막 문장을 연결해 '글쓴이가 결국 하려는 말'로 바꾼다.",
        "**33~34번 3점**: 지문이 추상적이고 선택지가 길다. 빈칸 문장의 구조(주어·동사·목적어)에서 **들어갈 말의 품사·역할**을 먼저 정하고, 그 다음 재진술 문장과 비교한다."],
       why:"빈칸·함축은 [12영Ⅰ-01-05]·[12영Ⅱ-01-05] 함축 의미 추론 문항으로, 최근 수능에서 오답률 최상위를 차지하며 1등급 비율을 떨어뜨리는 주범이다. 어휘가 쉬운데도 틀리는 이유는 빈칸의 역할을 정하지 않고 번역부터 하거나 상식으로 답하기 때문이다. 정답은 언제나 글 안의 재진술에서만 결정된다.",
       pitfalls:[
        "빈칸 문장만 읽고 **상식·배경지식**으로 답함. 글이 통념을 뒤집는 구조면 상식은 정확히 오답이다.",
        "글에 나온 단어가 **그대로 들어간** 선택지에 끌림 — 출제자는 같은 단어로 반대 방향 오답을 만든다. 동의어로 바뀐 선택지를 의심하지 않는다.",
        "함축 의미를 **문자 그대로** 해석함('tomorrow's energy' = 내일의 전기). 비유는 반드시 글의 주제로 번역한다."],
       points:["31~32번: 빈칸 바로 앞뒤 재진술 문장(In other words / that is)에서 결정", "33~34번: 역접 뒤 주제문 + 결론 문장의 방향(+/−)을 합쳐 선택지 소거", "21번: 밑줄 앞뒤 설명 + 마지막 문장 ↔ 주제와 같은 선택지"],
       pattern:["① 빈칸 역할(주제/결론/예시) → ② 같은 뜻 문장 찾아 밑줄 → ③ 논조(+/−) → ④ 반대 방향·같은 단어 선택지 삭제 → ⑤ 남은 것을 넣고 앞뒤 문장과 함께 다시 읽기", "함축: 밑줄 → '결국 하고 싶은 말'로 우리말 한 줄 → 선택지 중 주제문과 같은 것, 문자 해석 선택지 삭제"],
       memo:"빈칸은 역할 → 재진술 → 논조; 상식과 '같은 단어' 선택지는 의심.",
       quiz:[
        { q:"빈칸에 들어갈 말로 가장 적절한 것은?  Early photographers believed a picture should copy the world exactly. Painters, however, had long known that leaving things out can say more than putting everything in. A portrait with a blurred background pulls the eye to the face; a landscape without a single figure feels vast. In art, as in a good conversation, meaning often comes from ________.", opts:["copying every detail faithfully","the newest camera technology","what is deliberately left out","the size of the canvas"], a:2, exp:"빈칸은 결론 문장 → 앞 전체 요약. 재진술 'leaving things out can say more'. ①은 글의 단어(copy)를 쓴 반대 방향 함정." },
        { q:"밑줄 친 'borrowing tomorrow's energy'가 의미하는 바로 가장 적절한 것은?  Students often stay up all night before an exam and feel proud of their effort. But sleep is when the brain files away what it learned, so an all-night session is really borrowing tomorrow's energy. The facts crammed at 3 a.m. are the first to fade, and the tired mind makes careless mistakes the next morning. A rested brain remembers more than a stuffed one.", opts:["밤샘 공부는 다음 날의 집중력과 기억을 희생시킨다","내일 쓸 전기를 미리 끌어다 쓴다","시험 전날에는 친구에게 노트를 빌려야 한다","밤에 공부하면 아침보다 능률이 오른다"], a:0, exp:"밑줄 뒤 'facts ~ fade', 'careless mistakes the next morning'이 설명. ②는 문자 해석, ④는 반대 논조." },
        { q:"빈칸에 들어갈 말로 가장 적절한 것은?  A company tested two versions of its website. Version A listed thirty products on the front page; Version B showed only six. Surprisingly, visitors to Version B bought more. With fewer options, they compared quickly, chose confidently, and rarely abandoned their carts. Those facing thirty choices spent longer looking and often left without buying. The lesson for designers is clear: ________.", opts:["customers always want more variety","more choice can mean fewer sales","front pages should load faster","prices matter more than layout"], a:1, exp:"결론(The lesson is clear) 빈칸 → 앞 전체 요약: 선택지 적은 B가 더 팔림. ①은 반대 방향, ③④는 글에 없는 소재." }
       ] },
     { id:"eng-h3-read-flow", title:"무관한 문장·글의 순서·문장 삽입·요약문 (35~40번)", std:["12영Ⅰ-01-06","12영Ⅱ-01-04","12영Ⅱ-02-04"],
       concept:[
        "**35번 무관한 문장**: 첫 문장이 주제. 같은 소재(vegetables·garden)지만 **다른 논점**(가격·시장)을 말하는 문장이 정답. 소재가 완전히 다른 문장은 거의 안 나오고, 정답은 ②~④에 몰린다.",
        "**36~37번 순서**: 주어진 글 끝의 명사·상황 → 그것을 받는 **대명사·지시어**(this, these, such), **정관사**(the + 앞 명사), **연결어**(However, But, For example, As a result)가 단서. 첫 단락만 확정해도 선택지가 2개로 준다.",
        "**시간·논리 순서**: At first → But after → Today처럼 시간 부사와 '원인 → 결과' 흐름이 거꾸로면 틀린 순서. 전부 해석해 조립하기보다 단서로 연결한다.",
        "**38~39번 삽입**: 주어진 문장의 단서(this change, however, such a result)를 먼저 분석 → 지문에서 **지칭 대상 없는 the/this가 갑자기 나오는 곳**, 논리가 비약하는 곳에 넣고 **앞뒤 재독**.",
        "**40번 요약문**: 요약문을 **먼저** 읽는다. (A)는 보통 조건·방법, (B)는 결과·결론. 지문 단어가 동의어로 바뀌므로(read silently → passive, write from memory → recall) 바꿔 쓴 말을 고르고, 쉬운 칸부터 확정해 선택지를 2개로."],
       why:"이 구간은 [12영Ⅰ-01-06] 전개 방식·구조 파악, [12영Ⅱ-01-04] 논리적 관계 추론, [12영Ⅱ-02-04] 재구성 요약을 재며, 최근 수능에서 순서·삽입 3점 문항이 빈칸과 함께 오답률 상위를 차지한다. 해석력보다 **문장 사이의 연결 장치**(대명사·정관사·연결어)를 읽는 눈이 득점을 결정하고, 그 눈은 전체 번역보다 빠르다.",
       pitfalls:[
        "무관한 문장에서 **소재가 같으면 모두 관련 있다**고 봄. 주제가 '텃밭의 공동체 효과'인데 '채소 가격 상승'은 무관하다.",
        "순서에서 **내용이 그럴듯한** 조합을 상상으로 짬. 단서(the/this/however) 없는 연결은 선택하지 않는다.",
        "삽입에서 **처음 자연스러워 보이는 자리**에 넣고 끝냄. 넣은 뒤 대명사가 바로 앞 명사를 받는지, 뒤 문장과 연결어 방향이 맞는지 확인."],
       points:["36~37번: 주어진 글 끝 명사 → (A)(B)(C) 첫 문장의 this/the/인칭대명사·시간 부사로 첫 단락 확정", "38~39번: 주어진 문장의 this/such/however가 받을 대상이 '직전'에 있는 자리 → 앞뒤 재독", "40번: 요약문 먼저 → (A) 조건·(B) 결과 → 동의어 치환, 쉬운 칸부터"],
       pattern:["순서: ① 주어진 글 끝 핵심 명사 동그라미 → ② 각 단락 첫 문장의 대명사·the·연결어 확인 → ③ 첫 단락 확정 → ④ 남은 둘은 시간 부사·연결어 방향으로", "삽입: ① 주어진 문장 단서 분석 → ② 지문 읽으며 '지칭 대상 없는 this/the·논리 비약' 발견 → ③ 그 앞에 넣고 앞뒤 재독 / 요약: 요약문 먼저 읽고 (A)(B)의 품사·역할 확인"],
       memo:"순서·삽입은 상상 말고 단서(this·the·however); 요약문은 먼저 읽고 동의어로.",
       quiz:[
        { q:"다음 글에서 전체 흐름과 관계 없는 문장은?  Community gardens do more than grow vegetables. ① Neighbors who rarely spoke begin to share tools and advice over the rows of beans. ② Children learn where food comes from by pulling their own carrots. ③ Supermarket vegetable prices rose sharply last year because of poor weather. ④ Studies also show that people who garden regularly report lower stress. For these reasons, many cities now lend empty lots to residents.", opts:["①","②","③","④"], a:2, exp:"주제: 텃밭이 주는 공동체·교육·건강 효과. ③은 '채소 가격'으로 소재만 비슷하고 논점이 다르다." },
        { q:"주어진 글 다음에 이어질 글의 순서로 가장 적절한 것은?  [주어진 글] In 1850, a small town in the mountains had no doctor, so a young nurse named Clara opened a one-room clinic. (A) Today that clinic has grown into the region's largest hospital, and its entrance still carries her name. (B) At first, villagers were suspicious and few came. (C) But after she saved a child during a fever outbreak, people lined up at her door every morning.", opts:["(A)-(C)-(B)","(B)-(A)-(C)","(B)-(C)-(A)","(C)-(B)-(A)"], a:2, exp:"시간 부사: At first(B) → But after(C) → Today(A). (A)의 'that clinic'은 결말, (C)의 'But'은 (B)의 의심을 뒤집는다." },
        { q:"다음 글의 요약문 빈칸 (A), (B)에 들어갈 말로 가장 적절한 것은?  Researchers asked two groups to memorize a list of words. One group read the list silently four times. The other read it once and then tried to write it down from memory three times, checking their mistakes each round. A week later, the second group remembered almost twice as many words.  → Compared with (A) reading, repeated (B) leads to stronger long-term memory.", opts:["(A) repeated – (B) listening","(A) passive – (B) recall","(A) careful – (B) reading","(A) quick – (B) copying"], a:1, exp:"'read silently four times' → passive reading, 'write it down from memory' → recall. 지문 단어가 동의어로 바뀐다. (B)를 먼저 확정하면 ②만 남는다." }
       ] }
    ]},

  /* ======================= 3. 어법·어휘·장문·시간 배분 ======================= */
  { id:"eng-h3-final", grade:"h3", title:"수능 영어 · 어법·어휘·장문(41~45번)·시간 배분", std:["12영Ⅰ-01-01","12영Ⅰ-01-04","12영Ⅰ-01-07","12영Ⅱ-01-03","12영Ⅱ-01-07"],
    exam:"어법(29)·어휘(30)는 각 1문항이지만 29번은 빈칸 다음으로 오답률이 높은 단골. 장문 41~45번은 쉬운 편이라 시간만 있으면 득점. 70분 중 듣기 약 25분을 빼면 독해 28문항에 약 45분 — 1문항 약 1분 36초가 1등급의 시간 예산.",
    lessons:[
     { id:"eng-h3-final-grammar", title:"어법 (29번) — 수일치·동사 유무·분사·관계사·병렬", std:["12영Ⅰ-01-01","12영Ⅰ-02-06"],
       concept:[
        "**수일치**: 긴 주어의 **핵심 명사** 찾기 — 'Readers with background knowledge' → Readers(복수), 'The number of ~' → 단수, 동명사 주어(reading quickly) → 단수.",
        "**동사 vs 준동사**: 문장에 **본동사가 있는가**. 주어 뒤에 분사(-ing/p.p.)만 있고 동사가 없으면 틀림(the lighthouse now serving → serves). 분사·to부정사는 수식어다.",
        "**능동/수동·분사**: 뒤에 목적어가 있으면 -ing, 없고 '~된' 뜻이면 p.p.(boats tied to the dock). 'wanted the building to be saved'처럼 to부정사의 수동형도 확인.",
        "**관계사**: which/that + 불완전한 절, what + 선행사 없음, where/when/why + 완전한 절. **콤마 + most of whom**: 절 안에 동사가 있으면 대명사(them)가 아니라 관계대명사(whom)여야 한다.",
        "**병렬·기타**: and/or 앞뒤 형태 일치(move fast and still answer), 형용사 vs 부사, 대명사 수(it/them), 도치(Only then did ~)·가정법."],
       why:"29번은 1문항이지만 최근 수능에서 빈칸 다음으로 오답률이 높은 단골 3점 후보다. 어법 문제는 문장을 해석하는 것이 아니라 **구조를 분석**(주어·동사·목적어 찾기)하는 것이므로, 밑줄마다 '어떤 유형을 묻는가'를 먼저 표시하면 보는 눈이 좁혀진다. [12영Ⅰ-02-06] 글의 표현 점검·고쳐 쓰기와 연결되어 내신 어법 서술형에도 그대로 쓰인다.",
       pitfalls:[
        "밑줄 친 **단어만** 보고 판단 — 수일치는 밑줄 앞 **핵심 주어**까지, 병렬은 and 앞까지 거슬러 봐야 한다.",
        "**분사가 본동사처럼 보이는 함정**: 'The lighthouse now serving as ~'는 문장이 아니다. 주어 뒤에 동사가 있는지 끝까지 확인.",
        "콤마 뒤 'most of them + 동사'를 자연스럽다고 넘김 — 접속사 없이 두 절을 잇는 것이므로 whom(which)이어야 한다."],
       points:["수일치: 핵심 명사(복수/단수/동명사) — The number of는 단수, A number of는 복수", "동사 유무: 주어 뒤 -ing/p.p.만 있고 본동사가 없으면 틀림", "관계사: what(선행사 없음·불완전) vs that/which vs where(완전) + '콤마 + 전치사 + whom/which'"],
       pattern:["① 밑줄에 유형 표시(수/태/동사/관계사/병렬) → ② 각 문장의 S-V-O 찾기 → ③ 확실한 것 ✓로 지우고 남은 둘만 정밀 비교 → ④ 2분 넘으면 표시하고 다음 문항", "관계사 판별: 관계사 뒤 절에 주어·목적어 빠진 자리가 있는가(불완전 → which/that/what), 없는가(완전 → where/when/why, 접속사 that)"],
       memo:"어법은 해석이 아니라 S-V-O: 핵심 주어·본동사 유무·관계사 뒤 완전/불완전.",
       quiz:[
        { q:"다음 글의 밑줄 친 부분 중 어법상 틀린 것은?  The old lighthouse, ①which had guided ships for a century, was finally closed last year. Many residents ②wanted the building to be saved, so they formed a group ③to raise money. Thanks to their effort, the lighthouse now ④serving as a small museum where visitors can climb the tower and enjoy the view.", opts:["①","②","③","④"], a:3, exp:"마지막 문장의 주어 the lighthouse 뒤에 본동사가 없다 → serves. ①은 콤마 뒤 which(계속적 용법), ②는 to부정사 수동, ③은 목적의 to부정사로 맞다." },
        { q:"다음 글의 밑줄 친 부분 중 어법상 틀린 것은?  Most people assume that reading quickly ①mean understanding less. However, researchers who tested hundreds of readers found ②that speed and comprehension are only weakly connected. What matters more is ③whether the reader already knows something about the topic. Readers with background knowledge ④were able to move fast and still answer detailed questions correctly.", opts:["①","②","③","④"], a:0, exp:"that절의 주어는 동명사구 reading quickly(단수) → means. ②는 found의 목적어절 that, ③은 is의 보어절 whether, ④는 핵심 주어 Readers(복수) → were." },
        { q:"다음 글의 밑줄 친 부분 중 어법상 틀린 것은?  When the storm hit the coast, the fishing boats ①tied to the dock were badly damaged. The villagers, ②most of them depended on fishing, had no way to earn money. A charity sent carpenters ③to help rebuild the boats, and within two months the harbor was ④alive again with the sound of engines.", opts:["①","②","③","④"], a:1, exp:"콤마 사이 절에 동사(depended)가 있으므로 접속사 없이 them을 쓸 수 없다 → most of whom. ①은 '묶인'의 과거분사, ③은 목적의 to부정사, ④는 was의 보어 형용사." }
       ] },
     { id:"eng-h3-final-vocab-long", title:"어휘 (30번)·장문 독해 (41~45번)", std:["12영Ⅰ-01-04","12영Ⅱ-01-03","12영Ⅰ-01-02"],
       concept:[
        "**30번 어휘**: 문맥상 **반대말**이 들어간 밑줄이 정답. 각 밑줄을 반의어로 바꿔 읽어 보고 논리가 자연스러워지는 자리를 찾는다. 근거는 인과·역접 신호어(so, for this reason, however)와 대조 쌍.",
        "**41번 제목 + 42번 어휘(1지문 2문항)**: 제목을 먼저 정해 글의 **방향**을 잡으면 42번 (a)~(e) 중 흐름과 반대되는 하나가 보인다. 반대어는 글의 결론이 드러나는 **후반**에 자주 있다.",
        "**43번 순서**: (A) 끝의 인물·사건을 받는 단락(인칭대명사·the + 명사)을 찾는다. 이야기 글이므로 시간 부사(Years later, The next morning)가 큰 단서다.",
        "**44번 지칭**: he/she가 **누구로 바뀌는 지점**을 읽으며 표시. 같은 성별 인물 둘이면 행동의 주체(가르친 사람/배운 사람)로 구분하고, 문단이 바뀌어도 같은 사람이라 가정하지 않는다.",
        "**45번 내용 일치**: 선택지 순서 = 글 순서. 부정어(never, not until)·수량·장소를 대조. 41~45번은 지문이 길지만 **쉬운 편**이라 시간만 확보하면 득점한다."],
       why:"어휘 문항은 [12영Ⅰ-01-04] 논리적 관계 파악을, 장문은 제목·어휘·순서·지칭·일치의 **복합**으로 [12영Ⅱ-01-03]·[12영Ⅰ-01-02]를 잰다. 장문 5문항(11점)은 난도가 낮아 90점의 '마지막 안전 구간'이지만 시간이 부족하면 통째로 날아가므로, 어휘는 반의어 치환, 장문은 앞 차시 기술의 순차 적용으로 **빠르게** 푼다.",
       pitfalls:[
        "어휘 문제에서 **모르는 단어**가 든 밑줄을 무조건 답으로 고름 — 아는 단어 네 개의 문맥이 맞는지부터 확인한다.",
        "42번 어휘에서 초반 (a)·(b)에 시간을 쏟음. 글의 결론이 드러나는 (c)~(e)에서 반대어가 나오는 경우가 더 많다.",
        "44번 지칭에서 같은 성별 인물을 **문장 단위**로 추적하지 않음. 'he even seemed to whisper'처럼 행동이 바뀌면 주체도 바뀐다."],
       points:["30번: 반의어로 바꿔 읽어 논리가 통하는 자리 — 근거는 so/for this reason/however", "41~42번: 제목(주제) 먼저 → 흐름과 반대되는 밑줄, 후반 집중", "43~45번: 시간 부사·인칭대명사로 순서 → he/she 교체 지점 표시 → 일치는 선택지 순서대로"],
       pattern:["어휘: 각 밑줄 → 반의어로 바꿔 읽기 → 바꿨을 때 앞뒤 인과가 자연스러운 자리 = 정답, 나머지는 원래대로가 자연스러운지 재확인", "장문 43~45: 인물 이름 옆에 ♂/♀·역할 표시 → 순서 먼저 정하고 그 순서로 읽으며 he/she 옆에 이름 적기 → 일치는 선택지 ①부터 ✓/✗"],
       memo:"어휘는 반의어로 바꿔 읽기; 장문은 제목 먼저, 지칭은 행동의 주체로.",
       quiz:[
        { q:"밑줄 친 부분 중 문맥상 낱말의 쓰임이 적절하지 않은 것은?  When a new species arrives on an island, it often has no natural enemies, so its numbers ①shrink. Native birds, which evolved without such predators, may not even ②recognize the danger. Within decades, several native species can ③vanish completely. For this reason, airports on islands ④tighten their inspections of luggage to keep foreign insects and seeds out.", opts:["①","②","③","④"], a:0, exp:"'no natural enemies, so' 뒤는 개체 수가 '폭증'해야 논리가 맞다 → explode. ①을 반의어로 바꾸면 자연스럽고, 나머지는 원래대로가 자연스럽다." },
        { q:"밑줄 친 (a)~(d) 중 문맥상 적절하지 않은 것은?  Daniel believed that a good leader must have every answer. In his first job as team manager, he (a) hid his doubts and gave quick orders. The team obeyed but rarely (b) offered ideas. One day a junior member solved a problem he had missed, and Daniel realized that admitting uncertainty actually (c) invites help. Since then, his meetings have become (d) quieter, filled with questions from every member.", opts:["(a)","(b)","(c)","(d)"], a:3, exp:"결론: 불확실함을 인정하자 구성원이 질문·도움을 내놓게 됨 → 회의는 '활발해진다'(livelier). 'filled with questions'와 quieter는 모순." },
        { q:"밑줄 친 (a)~(d) 중 가리키는 대상이 나머지 셋과 다른 것은?  Grandpa Joe taught his grandson Ben to fish every summer. (a) He learned how to tie a hook and wait without speaking. Years later, Ben returned to the lake alone. He felt as if the old man were still there; (b) he even seemed to whisper 'patience'. When a fish pulled the line, (c) he laughed, remembering how (d) he used to jump up at every catch as a boy.", opts:["(a)","(b)","(c)","(d)"], a:1, exp:"(a) 배운 사람 = Ben, (c) 웃은 사람 = 혼자 온 Ben, (d) 어릴 때 뛰어오르던 = Ben. (b) 'patience'를 속삭이는 듯한 the old man = Joe." }
       ] },
     { id:"eng-h3-final-time", title:"시간 배분·풀이 순서·마킹 — 절대평가 90점 전략", std:["12영Ⅰ-01-07","12영Ⅱ-01-07","12영Ⅰ-01-01"],
       concept:[
        "**시간 예산**: 70분 = 듣기 약 25분 + 독해 28문항 약 45분. 독해 1문항 평균 **1분 36초**. 쉬운 문항(25~28·41~45)은 1분 안에, 빈칸·순서·삽입은 최대 3분 — 넘기면 표시하고 넘어간다.",
        "**풀이 순서**: 18~28(대의·세부) → 41~45(장문) → 29~30 → 35~40 → 31~34(빈칸) 순으로 **쉬운 것부터** 확보하는 전략이 흔하다. 어려운 3점을 끝에 두면 남은 시간을 모두 쓸 수 있다.",
        "**90점 계산**: 100점 만점에서 **10점까지** 잃어도 1등급 — 3점 3문항 또는 2점 5문항. 듣기 37점은 만점이 전제이고, 독해에서 '버릴' 문항을 미리 정하지 않는다. 다 풀되 시간 배분으로 지킨다.",
        "**마킹**: 듣기 17번이 끝나면 즉시 1~17번 마킹. 독해는 10문항 단위로 마킹해 마지막 5분 몰아 마킹을 피한다. 넘긴 문항 번호는 문제지 여백에 적어 둔다.",
        "**듣기 중 독해**: 문항 사이 빈 시간에 다음 선택지를 읽고, 긴 간격에는 18~20번 같은 짧은 지문을 미리 볼 수 있다. 단, 소리가 나면 **즉시 듣기로 복귀** — 듣기 1문항이 독해 1문항보다 싸지 않다."],
       why:"절대평가는 남과의 경쟁이 아니라 **90점과의 경쟁**이므로 시간 배분 자체가 득점 전략이다. 최근 수능은 독해 후반(31~39번) 난도가 높아, 쉬운 문항을 먼저 확보하고 남은 시간을 3점에 몰아 주는 수험생과 번호순으로 풀다 장문을 놓친 수험생의 점수 차가 크다. [12영Ⅰ-01-07]·[12영Ⅱ-01-07]의 '전략 활용'이 시험장에서는 시간 관리다.",
       pitfalls:[
        "빈칸 한 문항에 5분 이상 붙잡혀 **장문 5문항(11점)**을 못 푸는 것 — 등급을 가르는 가장 흔한 실패.",
        "어려운 문항을 **미리 포기**해 찍기로 두는 것 — 수능 빈칸도 재진술 하나면 풀리므로, 뒤로 미루되 버리지 않는다.",
        "마지막 5분에 20문항을 몰아 마킹하다 **밀려 쓰기**. 10문항 단위 마킹과 넘긴 번호 메모로 예방한다."],
       points:["1문항 1분 36초 — 쉬운 문항 1분·어려운 문항 3분 상한", "풀이 순서(흔한 전략): 18~28 → 41~45 → 29~30 → 35~40 → 31~34", "90점 = 10점 손실 허용(3점×3 또는 2점×5), 듣기 만점 전제"],
       pattern:["모의고사마다: ① 듣기 끝 즉시 마킹 → ② 18~28·41~45를 25분 안에 → ③ 29~30·35~40 → ④ 남은 시간 전부 31~34 → ⑤ 10문항 단위 마킹·넘긴 번호 메모", "3분 초과 시: 선택지에 소거 표시를 남기고 번호 메모 → 다음 문항 → 끝나고 돌아와 남은 둘 중 재진술과 맞는 것"],
       memo:"90점과 경쟁한다 — 쉬운 것 먼저, 1문항 3분 상한, 10문항 단위 마킹.",
       quiz:[
        { q:"[1분 안에] Riverside Night Market에 관한 안내문의 내용과 일치하지 않는 것은?  Riverside Night Market · Every Friday and Saturday in July, 6 p.m. to 11 p.m. · Over 40 food stalls and local craft shops · Live music from 8 p.m. on the main stage · Free entry; parking $5 per car · Pets are welcome on a leash · Stalls accept cards only, no cash · Visit our website for the full schedule.", opts:["7월 매주 금·토요일에 열린다","라이브 음악은 저녁 8시부터 시작된다","입장은 무료이고 주차는 유료다","가판대에서 현금 결제가 가능하다"], a:3, exp:"'cards only, no cash' → 현금 불가. 선택지 순서 = 안내문 순서이므로 위에서부터 ✓/✗." },
        { q:"[1분 안에] Elena Ruiz에 관한 다음 글의 내용과 일치하는 것은?  Elena Ruiz was born in 1931 in a village in Chile. Although her family could not afford books, a local priest lent her his collection, and she taught herself to read by age five. She left for the capital at seventeen to study chemistry, becoming the first woman in her region to earn a doctorate. Later she founded a free science school for rural girls, which still operates today.", opts:["책이 많은 부유한 집안에서 태어났다","다섯 살 무렵 혼자 읽는 법을 익혔다","열일곱 살에 물리학을 공부하러 수도로 갔다","그녀가 세운 학교는 현재 문을 닫았다"], a:1, exp:"'taught herself to read by age five'. ①은 could not afford books와 반대, ③은 chemistry, ④는 still operates today와 반대." },
        { q:"[1분 안에] 다음 도표의 내용과 일치하지 않는 것은?  [표] 2025년 Greenfield 고교 학생의 통학 수단(%): 도보 40, 자전거 25, 버스 20, 자가용 15.  ① Walking was the most common way to get to school, chosen by two out of five students. ② Cycling ranked second, five percentage points above the bus. ③ The bus and the car together accounted for more than two fifths of all students. ④ The share of students who came by car was less than half that of those who walked.", opts:["①","②","③","④"], a:2, exp:"버스 20 + 자가용 15 = 35% < 40%(two fifths) → ③이 틀림. ① 40% = 2/5, ② 25−20 = 5, ④ 15 < 20(40의 절반)은 맞다." }
       ] }
    ]}
 ]});
