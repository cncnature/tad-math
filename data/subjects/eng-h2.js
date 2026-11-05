// 영어 고2 (영어Ⅰ·영어Ⅱ) — 2022 개정 교육과정(교육부 고시 제2022-33호) 기준. 2028학년도 통합수능 영어 영역(절대평가, 45문항 = 듣기 17 + 독해 28, 70분)의
// 출제 과목이 영어Ⅰ·영어Ⅱ 임을 교육부 2028 대입 개편 확정안·한국교육신문 기사로 확인하고, 수능 문항 유형별로 4단원 8차시를 짰다.
// 성취기준 코드: 영어Ⅰ [12영Ⅰ-01-01]~[12영Ⅰ-02-08](이해 8·표현 8, 총 16개)은 KICE 최소 성취수준 보장지도 자료(영어Ⅰ·Ⅱ·독해와 작문)와 나무위키 영어Ⅰ 문서에서 확인.
// 'Ⅰ'은 로마 숫자 문자(U+2160). 추정 사항: ① 영어Ⅱ 코드 [12영Ⅱ-01-04](논리적 관계 추론)·[12영Ⅱ-01-05](맥락 기반 함축 의미 추론)는 영어Ⅱ 원문 페이지를 열지 못해,
// 영어Ⅰ과 같은 번호 체계(이해 8·표현 9, 총 17개)라는 2차 자료(fineteacher 블로그·KICE 웨비나)에 근거한 추정이다. ② 문항 번호별 유형 배치(18 목적·19 심경·… 41~45 장문)는
// 현행 수능 체제이며 2028 수능도 '그 외 영역은 현행 유지'라는 확정안에 따라 같을 것으로 추정했다. 영어 지문·대화문은 모두 자작.
window.DATA = window.DATA || {}; window.DATA.subjectsExtra = window.DATA.subjectsExtra || [];
window.DATA.subjectsExtra.push({ sid:"eng", grade:"h2",
 src:[
  ["2022 개정 교육과정에 따른 최소 성취수준 보장지도 자료: 영어Ⅰ, 영어Ⅱ, 영어 독해와 작문 (한국교육과정평가원, 세종시교육청 게시)","https://free.sje.go.kr/files/tmp/528338001740708389.pdf"],
  ["2022 개정 교육과정/영어과/고등학교/영어Ⅰ — 성취기준 16개 전문 (나무위키)","https://namu.wiki/w/2022%20%EA%B0%9C%EC%A0%95%20%EA%B5%90%EC%9C%A1%EA%B3%BC%EC%A0%95/%EC%98%81%EC%96%B4%EA%B3%BC/%EA%B3%A0%EB%93%B1%ED%95%99%EA%B5%90/%EC%98%81%EC%96%B4%E2%85%A0"],
  ["2022 개정 영어과 교육과정 해설 웨비나 자료 (KICE 주형미, British Council) — 영어Ⅰ 16·영어Ⅱ 17 성취기준, 어휘 2,000/2,500","https://www.britishcouncil.kr/sites/default/files/20230317_webinar1_2022_revised_eng_national_curriculum_hyung_mi_joo.pdf"],
  ["[공부법] 고2 영어 공부법 — 영어Ⅰ·영어Ⅱ (2022 개정) — 영어Ⅱ 성취기준 차이·2028 수능 출제 과목","https://fineteacher.com/blog/221857d4-0439-4852-a8bd-d9ea2e9ae975"],
  ["교육부 보도자료 별첨: 미래 사회를 대비하는 2028 대학입시제도 개편 확정안 — 영어 공통(영어Ⅰ, 영어Ⅱ)","https://files-scs.pstatic.net/2024/07/02/Ic4S8r8egU/[교육부+12-27(수)+브리핑시(11시)+보도자료]+(별첨)+미래+사회를+대비하는+2028+대학입시제도+개편+확정안.pdf"],
  ["2028학년도 시행 '통합수능' 점수 체제 — 영어 45문항(듣기 17 포함)·70분 (한국교육신문)","https://hangyo.com/mobile/article.html?no=103579"],
  ["2026학년도 수능 영어 영역 분석과 대비 전략 — 31~39번 오답률 (내일신문)","https://www.localnaeil.com/News/View/653727"]
 ],
 units:[

  /* ======================= 1. 수능 듣기 (1~17번) ======================= */
  { id:"eng-h2-listen", grade:"h2", title:"영어Ⅰ·Ⅱ · 수능 듣기 (1~17번)", std:["12영Ⅰ-01-01","12영Ⅰ-01-02","12영Ⅰ-01-03"],
    exam:"수능 45문항 중 17문항(1~17번)·약 25분, 학평도 같은 배치. 1등급(90점)은 듣기 만점이 전제. 내신은 듣기 대신 교과서 대화문 빈칸·배열 서술형으로 나온다.",
    lessons:[
     { id:"eng-h2-listen-purpose", title:"듣기 ① 목적·의견·관계·그림·할 일 (1~5번)", std:["12영Ⅰ-01-02","12영Ⅰ-01-03"],
       concept:[
        "**1~2번 목적·의견**: 담화(1번)는 인사·상황 설명 뒤 **마지막 2~3문장**에 목적이 나온다. 2번 대화의 의견은 한 사람이 **반복해 강조**하는 말이다.",
        "**3번 관계**: 직업을 드러내는 어휘(patient, recipe, script, lens…)와 **누가 부탁하고 누가 서비스를 주는지**로 판단. 장소가 아니라 두 사람의 관계를 묻는다.",
        "**4번 그림**: 선택지 ①~⑤ 순서대로 사물이 언급된다. 위치(on the wall, next to), 개수, 무늬(striped, polka-dot)를 그림과 대조한다.",
        "**5번 할 일**: 두 사람이 일을 나눠 맡으므로 **I'll ~ / Can you ~? → Sure** 뒤의 일이 정답. 이미 한 일(already)과 구분한다.",
        "방송 전 **선택지를 먼저 읽어** 들을 내용을 예측하면, 정답 근거가 나오는 순간을 놓치지 않는다."],
       why:"듣기는 지문이 한 번만 흘러가므로 '다 듣고 생각'하면 늦다. 유형마다 근거가 나오는 위치(목적은 끝, 그림은 순서대로, 할 일은 마지막 합의)가 정해져 있어, 위치를 알고 들으면 집중해야 할 구간이 짧아진다. 1~5번은 전부 2점이지만 한 문제가 90점 경계에서 등급을 가른다.",
       pitfalls:[
        "목적 문제에서 앞부분 **배경 설명**(행사 소개·감사 인사)을 목적으로 고름. 목적은 보통 'I'd like to ask/announce/remind ~'로 끝부분에 온다.",
        "할 일 문제에서 **상대방이 할 일**을 고름. 질문이 '남자가 할 일'인지 '여자가 할 일'인지 먼저 표시한다.",
        "그림 문제에서 처음 언급된 것이 다 맞으면 방심 — 틀린 것은 대개 **④·⑤ 근처**에서 하나만 다르다."],
       points:["목적 담화의 마지막 요청 문장(Please make sure ~)에 정답이 있다", "관계 추론: 직업 어휘 2개 이상 잡기(cast·X-ray → 의사·환자)", "할 일: 마지막 합의(Okay, I'll ~) 직후 종료 — 그 문장을 받아 적는다"],
       pattern:["① 질문 읽고 대상(남/여) 표시 → ② 선택지 핵심어에 밑줄 → ③ 끝부분 요청·합의 문장에 집중 → ④ 선택지는 들은 어구 그대로가 아니라 바꿔 말한 것", "그림: 선택지 번호 순서대로 손가락을 옮기며 '있다/없다·위치·개수'만 확인"],
       memo:"목적은 끝에, 그림은 순서대로, 할 일은 마지막 'I'll ~'.",
       quiz:[
        { q:"담화의 목적은?  Good morning, students. The library will close early this Friday for a system update. Please return borrowed books by Thursday so we can finish on time.", opts:["도서관 신설 안내","도서 반납 기한 안내","독서 행사 홍보","도서관 직원 모집"], a:1, exp:"마지막 문장 'Please return ~ by Thursday'가 요청 = 목적. 시스템 업데이트는 배경 설명." },
        { q:"두 사람의 관계는?  W: How long should I keep this cast on? M: About four weeks. I'll check the X-ray again next Monday. W: Should I keep taking the pills? M: Yes, twice a day.", opts:["약사 – 손님","의사 – 환자","코치 – 선수","교사 – 학생"], a:1, exp:"cast(깁스)·X-ray·pills·'check again' → 진료하는 사람과 받는 사람. 약사는 X-ray를 보지 않는다." },
        { q:"여자가 할 일은?  M: The picnic is tomorrow. I already bought the drinks. W: Great. Then I'll make the sandwiches. M: Can you bring a blanket too? W: Sorry, mine is torn. M: Okay, I'll bring mine.", opts:["음료 사기","샌드위치 만들기","담요 가져오기","자리 예약하기"], a:1, exp:"여자의 'I'll make the sandwiches'가 합의된 일. 담요는 거절했고 남자가 가져오며, 음료는 이미(already) 남자가 샀다." }
       ] },
     { id:"eng-h2-listen-detail", title:"듣기 ② 금액·이유·언급 안 된 것·내용 일치·긴 담화 (6~17번)", std:["12영Ⅰ-01-01","12영Ⅰ-01-02"],
       concept:[
        "**6번 금액**: 단가 × 개수 → 할인(10% off, coupon) → 합계. 숫자를 **메모**하지 않으면 거의 틀린다. 'How about ~?' 제안 뒤에 바뀌는 수량에 주의.",
        "**7번 이유**: 상대의 제안·초대를 **못 받는 이유**. 'I'd love to, but ~' 뒤에 진짜 이유가 온다. 그 앞에 나온 다른 사정(아픈 것·바쁜 것)은 함정.",
        "**8·9번 언급되지 않은 것 / 내용 불일치**: 선택지 5개가 담화 순서대로 나온다. 들리는 것을 하나씩 **지워** 남는 것이 정답.",
        "**10번 표 보고 고르기**: 조건이 하나씩 추가되며 후보가 줄어든다. 'not over $50', 'without ~' 같은 **제외 조건**부터 지운다.",
        "**11~15번 응답**: 마지막 말이 **질문인지 제안인지** 듣고 자연스러운 답. **16~17번 세트**: 한 담화로 주제(16) + 언급 안 된 것(17) — 17번 선택지를 먼저 보고 들린 것을 체크."],
       why:"6~10번과 16~17번은 '세부 정보 파악'([12영Ⅰ-01-01])을 재는 문항으로, 요령보다 **메모 습관**이 점수를 가른다. 금액은 계산 실수, 언급 안 된 것은 하나를 놓치는 실수가 대부분이므로, 선택지 옆에 숫자와 체크 표시를 남기며 듣는 것이 핵심 기술이다.",
       pitfalls:[
        "금액에서 **할인 전 가격**이나 **단가**를 답으로 고름. 질문은 거의 항상 'How much will the man pay?' — 최종 지불액이다.",
        "언급 안 된 것 문제에서 **바꿔 말한 것**(fee → cost, date → when)을 못 알아듣고 '언급 안 됨'으로 착각.",
        "응답 고르기에서 **앞 대화 내용**과만 맞추고, 마지막 말의 **의문문 형식**(Yes/No 의문문·의문사)과 어긋나는 답을 고름."],
       points:["6번: 단가·개수·할인율 세 숫자를 받아 적고 마지막에 한 번만 계산", "8·17번: 선택지 5개 순서대로 체크 — 안 들린 하나가 정답", "16번 주제: 첫 문장 'Today, I'll talk about ~' 또는 반복 핵심어"],
       pattern:["금액: ① 단가 ② 개수 ③ 할인·쿠폰 ④ 합계. 중간에 'Let me get two instead'처럼 개수가 바뀌면 다시 계산", "언급 안 된 것: 선택지 옆에 ✓를 찍으며 듣고, 끝났을 때 ✓ 없는 것을 고른다 — 다시 생각하지 않는다"],
       memo:"숫자는 적고, 선택지는 지우고, 응답은 마지막 말에 맞춘다.",
       quiz:[
        { q:"남자가 지불할 금액은?  M: How much are the notebooks? W: $4 each, or three for $10. M: I'll take three. And this pen? W: $2, but it's 50% off today. M: I'll take the pen too.", opts:["$10","$11","$12","$14"], a:1, exp:"공책 3권 묶음 $10 + 펜 $2의 50% = $1 → $11. 낱개 $4×3 = $12는 함정." },
        { q:"여자가 모임에 못 가는 이유는?  M: Coming to the book club tonight? W: I'd love to, but I can't. M: Still have a cold? W: No, I'm fine now. My cousin is arriving at the airport and I have to pick her up.", opts:["감기에 걸려서","숙제가 많아서","사촌을 마중 가야 해서","책을 다 못 읽어서"], a:2, exp:"'I'd love to, but' 뒤가 진짜 이유. 감기는 'I'm fine now'로 부정된다." },
        { q:"담화에서 언급되지 않은 것은?  Our science camp runs from July 8 to 10 at Green Hill Park. Students in grades 10 and 11 can join, and the fee is $30. Sign up on our website by June 30.", opts:["기간","장소","참가 대상","준비물"], a:3, exp:"기간(July 8–10)·장소(Green Hill Park)·대상(grades 10–11)·비용·신청 방법은 나오지만 준비물은 없다." }
       ] }
    ]},

  /* ======================= 2. 독해 대의 파악 (18~28번) ======================= */
  { id:"eng-h2-read-main", grade:"h2", title:"영어Ⅰ·Ⅱ · 독해 대의 파악 (18~28번)", std:["12영Ⅰ-01-02","12영Ⅰ-01-03","12영Ⅰ-01-01"],
    exam:"18~28번 11문항, 대부분 2점. 1등급이면 이 구간은 무실점이 기본. 내신에서는 교과서 지문의 주제·제목 고르기와 '내용 일치' 서술형으로 변형된다.",
    lessons:[
     { id:"eng-h2-read-purpose", title:"목적·심경·주장·요지 (18~20·22번)", std:["12영Ⅰ-01-02","12영Ⅰ-01-03"],
       concept:[
        "**18번 목적**: 편지·이메일 형식. 인사·배경 뒤 **I am writing to ~ / I would like to ~ / Please ~**가 목적 문장. 선택지는 '~을 요청하려고/안내하려고'로 끝나니 **동사**를 맞춘다.",
        "**19번 심경 변화**: 전반부와 후반부의 **감정 어휘**(nervous, relieved, thrilled…)를 찾고 **전환점**(But then, Suddenly)을 표시. 선택지는 '앞 → 뒤' 순서다.",
        "**20번 주장**: 필자가 독자에게 **해야 한다**고 말하는 문장 — should, must, need to, 명령문. 주장은 글 끝에 자주 재진술된다.",
        "**22번 요지**: 글 전체를 한 문장으로 압축. 주장과 달리 '~해야 한다'가 아닐 수 있다. **역접 뒤**·**결론 신호**(Thus, In short) 뒤 문장을 우선한다."],
       why:"네 유형 모두 '글의 중심 생각·필자의 의도'를 묻는 [12영Ⅰ-01-02]·[12영Ⅰ-01-03] 문항이다. 수능 지문은 예시·배경으로 시작해 핵심 문장으로 끝나는 구조가 많아, 전부 해석하기보다 **신호어 뒤 문장**을 찾아 선택지와 대조하는 편이 빠르고 정확하다.",
       pitfalls:[
        "목적 지문의 첫 단락 **상황 설명**(행사 소개, 감사)을 목적으로 고름. 'Thank you for ~'는 목적이 아니라 인사다.",
        "심경 문제에서 **한쪽 감정만** 맞는 선택지. 처음·끝 감정을 둘 다 확인하고, 순서(앞 → 뒤)가 뒤집힌 선택지를 걸러낸다.",
        "주장·요지에서 **예시 문장의 세부 내용**이 들어간 선택지는 범위가 좁아 오답. 글 전체를 덮는 일반 진술을 고른다."],
       points:["18번: 'I'm writing to ~' 뒤 동사와 선택지 끝 동사(요청·안내·문의·항의) 일치", "19번: 감정 어휘 짝(anxious → relieved, bored → excited) + 전환 신호어", "20·22번: should/must 문장 또는 역접·결론 신호 뒤 문장 ↔ 선택지 대조"],
       pattern:["① 질문 유형 확인 → ② 신호어(I'm writing to / But / Therefore / should) 찾기 → ③ 그 문장을 우리말로 요약 → ④ 선택지 중 가장 넓게 덮는 것", "심경: 시간 순서로 감정 단어에 밑줄 → '전/후' 두 칸에 적고 선택지와 순서까지 맞추기"],
       memo:"목적은 'I'm writing to', 주장은 should, 요지는 역접·결론 뒤 한 문장.",
       quiz:[
        { q:"글의 목적은?  Dear Ms. Park, Thank you for teaching our robotics club this year. I am writing to ask whether you could extend our lab hours to 6 p.m. on Fridays. Many members want more time to build.", opts:["동아리 가입을 권유하려고","지도 교사에게 감사를 전하려고","실습실 이용 시간 연장을 요청하려고","대회 참가 일정을 안내하려고"], a:2, exp:"'I am writing to ask whether you could extend ~'가 목적. Thank you는 인사." },
        { q:"'I'의 심경 변화는?  My hands shook as I waited for my name at the audition. The judges looked tired. Then I began to sing, and one judge smiled and nodded. By the last note, I knew I had done my best.", opts:["bored → angry","nervous → confident","excited → disappointed","calm → worried"], a:1, exp:"hands shook(긴장) → smiled and nodded, 'I had done my best'(자신감). 전환점은 'Then I began to sing'." },
        { q:"필자의 주장은?  Many students copy notes word for word. But memory works best when we put ideas in our own words. So after class, close the book and rewrite the key points in your own words.", opts:["필기는 수업 중에 빠짐없이 해야 한다","필기 내용을 자기 말로 다시 써야 한다","친구와 함께 공부하는 것이 효과적이다","수업 후 바로 복습하면 기억이 오래간다"], a:1, exp:"역접 But 뒤 + 명령문 'rewrite the key points in your own words'가 주장. ④는 부분 내용." }
       ] },
     { id:"eng-h2-read-topic", title:"주제·제목·도표·내용 일치·안내문 (23~28번)", std:["12영Ⅰ-01-02","12영Ⅰ-01-01","12영Ⅰ-01-07"],
       concept:[
        "**23번 주제**: 명사구 선택지. 글의 **반복 핵심어 2개**가 모두 들어간 선택지를 고른다. 핵심어 하나만 있는 것은 함정.",
        "**24번 제목**: 주제를 **비유·대구·의문문**으로 압축한다. 너무 넓은 것(Why Reading Matters)과 너무 좁은 것(세부 예시)을 버리고, 글의 **논조**(권장/경고)와 맞는지 본다.",
        "**25번 도표**: 선택지 ①~⑤가 그래프를 순서대로 설명한다. **비교 표현**(more than twice, the lowest, gap)과 숫자를 하나씩 대조 — 틀린 것은 대개 ③~⑤.",
        "**26번 인물 내용 일치**: 선택지는 글의 순서를 따른다. 연도·장소·순서를 바꾼 것이 오답. '불일치'를 묻는지 꼭 확인.",
        "**27~28번 안내문**: 날짜·시간·비용·참가 조건·주의사항을 **표처럼** 대조. 'free for members, $5 for others' 같은 조건부 정보가 단골."],
       why:"23·24번은 대의 파악, 25~28번은 세부 정보 확인이다. 특히 25~28번은 지문이 쉬워 **시간을 버는 구간**이므로 2분 안에 끝내고 어려운 31~39번에 시간을 넘겨야 한다. 선택지 순서가 글 순서와 같다는 사실을 알면 왕복 없이 한 번에 풀린다.",
       pitfalls:[
        "제목에서 글에 나온 **예시 소재**(한 동물, 한 실험)를 제목으로 고름. 제목은 그 예시가 보여 주는 **일반 원리**여야 한다.",
        "도표에서 'more than twice'를 두 배 **이상**으로, 'nearly half'를 정확히 절반으로 읽는 등 **비교 표현을 대충** 봄. 숫자를 직접 나눠 본다.",
        "내용 일치에서 **부정어**(never, not until, except)를 놓침. 'He did not publish until 1950'과 'He published in 1950'은 다르다."],
       points:["23번: 반복 핵심어 두 개를 모두 포함한 명사구", "25번: 비교 표현 + 수치 계산(배수·차이) 확인", "26~28번: 선택지 순서 = 글 순서, 부정어·조건(only, except, free for)에 표시"],
       pattern:["주제·제목: ① 첫·끝 문장 읽고 핵심어 2개 적기 → ② 핵심어가 둘 다 든 선택지 → ③ 글의 논조(권장/경고)와 어긋나면 탈락", "일치·안내문: 지문 읽기 전 선택지를 먼저 읽고, 선택지 ①의 내용을 지문에서 찾아 ✓/✗ → ② … 순서대로"],
       memo:"주제는 핵심어 둘, 제목은 넓지도 좁지도 않게, 일치는 선택지 순서대로 대조.",
       quiz:[
        { q:"글의 제목으로 가장 적절한 것은?  Honeybees dance to tell others where flowers are. The angle shows direction, and the length shows distance. A tiny insect can thus share precise information without a word.", opts:["Why Bees Need Flowers","Dancing: A Bee's Language of Directions","How Insects Learn to Fly","The Silent Life of Honeybees"], a:1, exp:"핵심어 dance + 정보 전달(direction·distance). ①③은 글에 없고 ④는 '소리 없음'만 강조해 좁다." },
        { q:"안내문의 내용과 일치하는 것은?  City Night Run · Saturday, May 16, 8 p.m. · 5 km course along the river · Fee: $10 (free for students with ID) · Runners receive a T-shirt · Register online by May 10.", opts:["일요일 저녁에 열린다","학생은 신분증이 있으면 무료다","참가자는 메달을 받는다","당일 현장 등록이 가능하다"], a:1, exp:"'free for students with ID'. 토요일, T-shirt, 온라인 사전 등록(by May 10)이므로 나머지는 불일치." },
        { q:"도표 설명 중 틀린 것은?  [표] 선호 동아리(%): 음악 35, 체육 30, 과학 20, 미술 15.  ① Music was the most popular. ② Sports came second. ③ Science was more than twice as popular as art. ④ Art was the least popular.", opts:["①","②","③","④"], a:2, exp:"과학 20%는 미술 15%의 약 1.3배 — 'more than twice'(두 배 이상)가 아니다." }
       ] }
    ]},

  /* ======================= 3. 추론: 빈칸·함축·어휘·어법 (21·29~34번) ======================= */
  { id:"eng-h2-read-infer", grade:"h2", title:"영어Ⅰ·Ⅱ · 추론: 빈칸·함축·어휘·어법 (21·29~34번)", std:["12영Ⅰ-01-05","12영Ⅱ-01-05","12영Ⅰ-01-04"],
    exam:"3점 문항이 몰린 구간. 2026 수능에서도 오답률 상위 10문항 중 7개가 31~39번. 내신은 교과서 문장의 어법·어휘 선택형과 빈칸 서술형(영작)으로 변형된다.",
    lessons:[
     { id:"eng-h2-infer-blank", title:"빈칸 추론·함축 의미 (21·31~34번)", std:["12영Ⅰ-01-05","12영Ⅱ-01-05"],
       concept:[
        "**빈칸은 주제문의 일부**다. 빈칸 문장이 글의 **일반 진술**이면 뒤의 예시가 근거, 빈칸이 **결론**(Thus, In other words)이면 앞 전체가 근거.",
        "**재진술(paraphrase) 찾기**: 빈칸 문장과 같은 뜻의 문장이 글에 한 번 더 있다. 그 문장의 핵심어를 **바꿔 말한** 선택지가 정답.",
        "**대명사·지시어 추적**: this, such, it, these가 가리키는 명사를 거슬러 찾으면 빈칸이 받는 개념이 보인다.",
        "**21번 함축 의미**: 밑줄 친 비유 표현은 글의 **주제를 다른 말로** 한 것. 밑줄 바로 앞뒤 문장에서 설명(that is, in other words)을 찾는다.",
        "**선택지 소거**: 글에 나온 단어를 그대로 쓴 선택지는 **반대 방향**인 경우가 많다. 글의 논조(긍정/부정)부터 정하고 반대 방향 선택지를 먼저 지운다."],
       why:"빈칸·함축 문항은 [12영Ⅰ-01-05]·[12영Ⅱ-01-05] '맥락을 바탕으로 함축적 의미를 추론'하는 능력을 재며, 영어Ⅱ에서는 더 긴 글과 추상적 주제로 심화된다. 어휘가 쉬워도 틀리는 이유는 **빈칸의 역할**(주제문인지 예시인지)을 정하지 않고 번역부터 하기 때문이다.",
       pitfalls:[
        "빈칸 문장만 읽고 **상식**으로 답함. 수능 빈칸은 글 안의 재진술에서만 결정된다.",
        "글에 나온 단어가 **그대로 들어간** 선택지에 끌림 — 출제자는 같은 단어로 반대 방향 오답을 만든다.",
        "함축 의미에서 밑줄 표현을 **문자 그대로** 해석함. 비유는 글의 주제로 번역해야 한다."],
       points:["31~32번(비교적 쉬움): 빈칸 바로 앞뒤 재진술 문장에서 답", "33~34번(3점): 역접 뒤 주제문과 결론 문장을 연결해 방향 결정", "21번: 밑줄 앞뒤의 'that is / in other words'와 글의 주제문 일치"],
       pattern:["① 빈칸 문장의 역할 정하기(주제/예시/결론) → ② 같은 뜻의 문장 찾아 밑줄 → ③ 논조(+/−) 결정 → ④ 반대 방향 선택지 삭제 → ⑤ 남은 것을 빈칸에 넣어 다시 읽기", "함축: 밑줄 → '글쓴이가 결국 하고 싶은 말'로 바꿔 쓰기 → 선택지 중 주제문과 같은 것"],
       memo:"빈칸은 상식이 아니라 재진술; 같은 단어 선택지는 의심.",
       quiz:[
        { q:"빈칸에 가장 적절한 것은?  A map is useful because it leaves things out. If it showed every tree and stone, it would be as confusing as the land itself. In other words, a good map is one that ________.", opts:["copies reality exactly","chooses what to ignore","uses many colors","is drawn by experts"], a:1, exp:"'leaves things out'의 재진술. ①은 글과 반대 방향." },
        { q:"밑줄 친 'build a bridge, not a wall'이 의미하는 바는?  When readers disagree with an author, some stop reading. Wise readers instead ask why the author thinks so. They build a bridge, not a wall.", opts:["글쓴이와 직접 만나 토론한다","반대 의견의 이유를 이해하려 한다","자신의 주장을 더 강하게 만든다","읽기를 멈추고 다른 책을 고른다"], a:1, exp:"바로 앞 문장 'ask why the author thinks so'의 비유. wall = 읽기 중단, bridge = 이해 시도." },
        { q:"빈칸에 가장 적절한 것은?  Experts often give worse predictions than beginners. Knowing many facts makes them confident, and confidence stops them from checking. Thus, expertise can become ________.", opts:["a source of new questions","a reason to trust others","an obstacle to careful thinking","a way to avoid mistakes"], a:2, exp:"결론(Thus) 빈칸 → 앞 전체 요약: 자신감이 점검(checking)을 막는다. ④는 반대 방향." }
       ] },
     { id:"eng-h2-infer-grammar", title:"어법·어휘 (29~30번)", std:["12영Ⅰ-01-01","12영Ⅰ-01-04"],
       concept:[
        "**29번 어법 단골** ① 주어–동사 **수일치**(긴 주어의 핵심 명사 찾기) ② **능동/수동**(분사·동사 뒤 목적어 유무) ③ **동사 vs 준동사**(문장에 본동사가 이미 있는가).",
        "④ **관계사**: that/which + 불완전한 절, what + 불완전한 절·선행사 없음, where/when + 완전한 절. ⑤ **병렬**: and·or 앞뒤 형태 일치. ⑥ 형용사/부사, 대명사 수.",
        "밑줄 5개 중 틀린 것은 **하나**. 자신 있는 것부터 ✓로 지우고 남는 두 개를 정밀 비교한다.",
        "**30번 어휘**: 문맥상 **반대말**이 들어간 것이 정답. 밑줄 단어를 반의어로 바꿔 읽어 보고 글의 논리와 맞으면 그 자리가 오답 단어.",
        "어휘 문제의 근거는 **역접·인과 신호어**(but, however, because, so)와 **대조 쌍**(increase↔decrease, encourage↔discourage) 안에 있다."],
       why:"어법·어휘는 각 1문항이지만 2~3점이 걸려 있고, 내신에서는 교과서 문장을 그대로 어법 변형해 출제하므로 비중이 더 크다. 어법은 문장 구조(주어·동사·목적어 찾기), 어휘는 글의 논리 방향 파악이라는 서로 다른 기술이어서 접근법을 분리해야 한다.",
       pitfalls:[
        "밑줄 친 **단어만** 보고 판단 — 수일치는 밑줄 앞 **핵심 주어**까지, 병렬은 and 앞까지 거슬러 봐야 한다.",
        "which/that 자리에 **what**: 선행사가 있으면 what 불가, 선행사 없이 명사절이면 what. 'the thing that' = what.",
        "어휘 문제에서 **모르는 단어**가 있는 밑줄을 무조건 답으로 고름 — 아는 단어 네 개의 문맥이 맞는지부터 확인."],
       points:["수일치: 'The number of + 복수 명사' + 단수 동사, 'A number of' + 복수 동사", "분사 판단: 뒤에 목적어가 있으면 현재분사(-ing), 없으면 과거분사(p.p.)", "어휘: 역접 뒤 밑줄은 앞 내용과 반대여야 함 — 같은 방향이면 오답 단어"],
       pattern:["어법: ① 밑줄마다 유형 표시(수/태/관계사/병렬/동사) → ② 주어·동사·목적어(S-V-O) 찾아 확인 → ③ 확실한 것 ✓ 지우고 남은 둘만 정밀 비교", "어휘: 각 밑줄을 반의어로 바꿔 읽기 → 바꿨을 때 논리가 자연스러워지는 자리가 정답"],
       memo:"어법은 S-V-O 찾기부터, 어휘는 반의어로 바꿔 읽기.",
       quiz:[
        { q:"어법상 틀린 것은?  The number of students ①who ②study abroad ③have grown rapidly, and many of them ④return with new skills.", opts:["①","②","③","④"], a:2, exp:"주어의 핵심은 The number(단수) → has grown. students는 of 뒤 수식어." },
        { q:"문맥상 적절하지 않은 것은?  Cities plant trees because shade ①lowers street heat. However, trees need years to grow, so the benefit is ②immediate. Planners should ③start early rather than ④wait for a heat wave.", opts:["①","②","③","④"], a:1, exp:"'need years to grow' 뒤 so → 효과는 '늦게'(delayed) 나타난다. immediate는 논리와 반대." },
        { q:"어법상 틀린 것은?  The report, ①written by two engineers, ②explains ③what the bridge failed and ④suggests how to repair it.", opts:["①","②","③","④"], a:2, exp:"뒤 절 'the bridge failed'가 완전한 문장 → what(불완전 절) 불가, why가 맞다. ①은 수동 분사, ②④는 병렬 동사." }
       ] }
    ]},

  /* ======================= 4. 간접 쓰기 (35~45번) ======================= */
  { id:"eng-h2-write", grade:"h2", title:"영어Ⅰ·Ⅱ · 간접 쓰기: 무관 문장·순서·삽입·요약·장문 (35~45번)", std:["12영Ⅰ-01-06","12영Ⅰ-02-04","12영Ⅱ-01-04"],
    exam:"11문항 중 순서·삽입이 3점 단골. 2026 수능 37·39번처럼 문장 간 관계를 묻는 문항의 오답률이 높다. 내신은 교과서 지문의 순서 배열·문장 삽입·요약문 빈칸 서술형으로 출제된다.",
    lessons:[
     { id:"eng-h2-write-order", title:"무관 문장·글의 순서·문장 삽입 (35~39번)", std:["12영Ⅰ-01-06","12영Ⅱ-01-04"],
       concept:[
        "**35번 무관 문장**: 첫 문장(주제)과 **같은 소재지만 다른 논점**을 말하는 문장이 정답. 소재가 완전히 다른 문장은 거의 안 나온다.",
        "**36~37번 순서**: 주어진 글의 마지막 문장과 **연결 고리**를 찾는다. 단서 3종: ① 대명사·지시어(this, these, such, it) ② 정관사(the + 앞에 나온 명사) ③ 연결어(However, For example, As a result).",
        "순서 문제는 (A)(B)(C)를 전부 읽고 조립하기보다, **주어진 글 → 첫 단락** 하나를 확정하면 선택지가 2개로 줄어든다.",
        "**38~39번 삽입**: 주어진 문장의 **단서**를 먼저 분석(대명사가 받을 명사, 연결어 방향). 그 다음 지문에서 **논리가 끊기는 자리**(지칭 대상 없는 the/this가 갑자기 나오는 곳)를 찾는다.",
        "순서·삽입 모두 **시간 순서**(first, then, later)와 **원인 → 결과** 흐름이 거꾸로 되면 틀린 것이다."],
       why:"이 유형은 [12영Ⅰ-01-06] '글의 전개 방식·구조 파악'과 영어Ⅱ의 '논리적 관계 추론'을 재는 문항으로, 해석 능력보다 **문장 사이의 연결 장치**를 보는 눈이 점수를 결정한다. 대명사·정관사·연결어는 '이 문장 앞에 무엇이 있어야 하는가'를 알려 주는 표지이며, 그것을 읽는 것이 전체 번역보다 빠르다.",
       pitfalls:[
        "무관 문장에서 **소재가 같다는 이유로** 모두 관련 있다고 봄. 주제가 '걷기와 사고력'인데 '운동화 시장'을 말하면 무관 문장이다.",
        "순서에서 **내용이 그럴듯한** 순서를 상상으로 짬. 단서(the/this/however)가 없는 연결은 선택하지 않는다.",
        "삽입에서 **처음 자연스러워 보이는 자리**에 넣고 끝냄. 넣은 뒤 **앞뒤 문장을 다시 읽어** 대명사가 올바른 명사를 받는지 확인."],
       points:["36~37번: 주어진 글 끝 명사 → (A)(B)(C) 첫 문장 중 그것을 the/this로 받는 단락이 첫째", "38~39번: 주어진 문장의 this/such/the + 명사가 가리키는 대상이 '직전'에 나오는 자리", "35번: 첫 문장 주제와 다른 논점인 문장(흔히 ③·④)"],
       pattern:["순서: ① 주어진 글 끝 핵심 명사 동그라미 → ② (A)(B)(C) 첫 문장에서 그 명사를 받는 대명사·the 찾기 → ③ 첫 단락 확정 → ④ 남은 둘은 연결어 방향(However/For example)으로 결정", "삽입: ① 주어진 문장 단서 분석 → ② 지문을 읽다 '지칭 대상 없는 this/the' 또는 논리 비약 발견 → ③ 그 앞에 넣고 앞뒤 재독"],
       memo:"순서·삽입의 열쇠는 대명사·정관사·연결어 — 상상 말고 단서.",
       quiz:[
        { q:"흐름과 관계 없는 문장은?  Walking meetings help people think. ① Moving boosts blood flow to the brain. ② Walking side by side lowers tension. ③ Running shoes are a huge market. ④ So new ideas come easily.", opts:["①","②","③","④"], a:2, exp:"주제: 걷기 회의와 사고력. ③은 '운동화 시장'으로 소재만 비슷하고 논점이 다르다." },
        { q:"이어질 순서는?  [주어진 글] A town had no library, so a teacher put a box of books by the road. (A) Today the box is a reading room. (B) This box soon drew many children. (C) Their parents then gave more books.", opts:["(A)-(B)-(C)","(B)-(A)-(C)","(B)-(C)-(A)","(C)-(A)-(B)"], a:2, exp:"'This box'가 주어진 글의 a box를 받음 → (B). 'Their parents'는 (B)의 children을 받음 → (C). 'Today'가 결말 → (A)." },
        { q:"문장이 들어갈 곳은?  [문장] This change, however, did not reduce accidents.  Many cities lowered speed limits. (①) Drivers simply ignored the signs. (②) So planners narrowed roads. (③) Drivers then slowed. (④)", opts:["①","②","③","④"], a:0, exp:"'This change'는 '제한 속도 인하'를 받고, however로 기대와 다른 결과를 말한다. 뒤의 'Drivers simply ignored'가 그 이유 → ①." }
       ] },
     { id:"eng-h2-write-summary", title:"요약문 완성·장문 독해 (40~45번)", std:["12영Ⅰ-02-04","12영Ⅰ-01-02","12영Ⅰ-01-06"],
       concept:[
        "**40번 요약문**: 요약문을 **먼저** 읽는다. 빈칸 (A)는 보통 실험·연구의 **조건/행동**, (B)는 **결과/결론**. 지문에서 해당 문장을 찾아 **바꿔 쓴 단어**(paraphrase)를 선택지에서 고른다.",
        "요약문 선택지는 (A)·(B) 짝으로 나온다. 한쪽이 확실하면 선택지가 2개로 줄어드니 **쉬운 칸부터** 확정한다. 영어Ⅱ는 '재구성하여 요약'이라 지문 단어가 동의어로 바뀐다.",
        "**41~42번 장문(1지문 2문항)**: 41번 제목, 42번 문맥 어휘. 어휘 밑줄 (a)~(e)는 글 전체 흐름과 **반대**되는 하나를 찾는다 — 제목을 먼저 정하면 방향이 보인다.",
        "**43~45번 장문(순서+지칭+일치)**: 이야기 글. 43번 순서는 (A) 끝의 인물·사건을 받는 단락 찾기, 44번 지칭은 **he/she가 바뀌는 지점**을 표시하며 읽기, 45번은 선택지 순서대로 대조.",
        "장문은 마지막에 나오므로 **시간 관리**가 관건 — 43~45번은 쉬우니 시간이 부족할 때는 먼저 푸는 전략도 가능하다."],
       why:"요약은 [12영Ⅰ-02-04] '듣거나 읽은 내용을 요약'하는 표현 역량을 독해로 간접 평가하는 문항이며, 영어Ⅱ는 '재구성하여 요약'하도록 요구해 지문 단어가 그대로 쓰이지 않는다. 장문은 새로운 유형이 아니라 제목·어휘·순서·지칭·일치의 **복합**이므로 앞 차시 기술을 연속으로 쓰는 연습이다.",
       pitfalls:[
        "요약문 빈칸에 **지문 단어 그대로**를 찾으려다 못 찾고 포기 — 정답은 동의어로 바뀐다(reduce → lower, benefit → advantage).",
        "42번 어휘에서 초반 밑줄 (a)·(b)는 대개 맞고, 글의 결론이 드러나는 **후반 밑줄**에서 반대어가 나오는 경우가 많다.",
        "44번 지칭에서 인물이 둘 다 같은 성별일 때 **문단이 바뀌어도 같은 사람**이라고 가정함 — 문단 첫 he/she는 반드시 직전 문장에서 확인."],
       points:["40번: 요약문 먼저 → (A) 조건·행동, (B) 결과·결론 → 동의어 치환", "42번: 제목(주제) 먼저 정하고 흐름과 반대되는 밑줄 어휘 찾기", "43~45번: 순서(연결 단서) → 지칭(he/she 교체 지점 표시) → 일치(선택지 순서대로)"],
       pattern:["요약: ① 요약문 읽고 (A)(B)의 품사·역할 확인 → ② 지문에서 해당 문장 찾기 → ③ 쉬운 칸 확정해 선택지 2개로 → ④ 남은 칸 동의어 비교", "장문 43~45: 인물 이름 옆에 ♂/♀ 표시 → 순서를 먼저 정하고 그 순서로 읽으며 he/she 밑줄 → 일치 문항은 선택지 순서대로"],
       memo:"요약문은 먼저 읽고 동의어로 찾는다; 장문은 앞 유형의 조합.",
       quiz:[
        { q:"요약문의 (A), (B)는?  People recalled a story right after reading it or a day later. Those who waited recalled fewer details but explained the idea better. → Delay (A) details but (B) grasp of the idea.", opts:["(A) improves – (B) weakens","(A) reduces – (B) improves","(A) reduces – (B) removes","(A) keeps – (B) improves"], a:1, exp:"recalled fewer details → reduces, explained better → improves. 지문 단어가 동의어로 바뀐다." },
        { q:"적절하지 않은 것은?  Cheap chairs seem (a) convenient, but they break in a year. A wooden chair costs more yet lasts decades, so its yearly cost is (b) lower. Cheap is (c) expensive; quality is (d) wasteful.", opts:["(a)","(b)","(c)","(d)"], a:3, exp:"글의 결론: 비싼 품질이 오히려 경제적 → (d)는 economical이어야 한다. wasteful은 반대." },
        { q:"밑줄 친 she가 가리키는 대상이 다른 것은?  Mia asked her sister Jane for help. (a) She was tired after work, but (b) she agreed. Mia smiled, and (c) she said thanks. Later Jane admitted (d) she had enjoyed it.", opts:["(a)","(b)","(c)","(d)"], a:2, exp:"(a)(b)(d)는 도움을 주는 Jane, (c)는 웃으며 고맙다고 말한 Mia." }
       ] }
    ]}
 ]});
