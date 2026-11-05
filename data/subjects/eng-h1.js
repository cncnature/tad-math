// 영어 고1 (공통영어1·공통영어2, 2022 개정 교육과정 기준, 2025학년도 고1부터 적용) — 출처·추정 사항:
// 성취기준 코드는 KICE '최소 성취수준 보장지도 자료(공통영어1·2)'(경기도교육청 게시 PDF), 경기 논술형 평가 자료(2025),
// 인하대사대부고 2025-2학기 공통영어2 운영 계획에서 실제 확인한 코드만 썼다([10공영1-01-01~04·06~08], [10공영1-02-01·02·04·06·07],
// [10공영2-01-01~05·07·08], [10공영2-02-01~05·07~09]). 어법·어휘는 2022 개정에서 성취기준이 아니라 [별표] '언어 형식'이므로
// 가장 가까운 기능 성취기준(표현 점검 10공영1-02-06 / 10공영2-02-07, 이해 전략 10공영1-01-07 등)을 붙였다(추정).
// 교과서: 2025 발행 공통영어1·2(능률 오선영·민병천, YBM 박준언·김은형, 천재 강상구·조수경, 동아 이병민, 미래엔 김성연, 비상 홍민표, 지학사 신상근)
// 모두 4개 과(Lesson 1~4) 구성이며 언어 형식(동명사·가주어 it·명사절 that·분사·계속적 관계대명사 등)은 능률 오선영 1~4과를 참고(추정: 출판사마다 다름).
// 학평 문항 번호(29 어법·30 어휘·31~34 빈칸·35 무관·36~37 순서·38~39 삽입·40 요약)는 고1 전국연합학력평가의 통상 체제를 따랐다(추정).
// 영어 예문·지문은 전부 자작.
window.DATA = window.DATA || {}; window.DATA.subjectsExtra = window.DATA.subjectsExtra || [];
window.DATA.subjectsExtra.push({ sid:"eng", grade:"h1",
 src:[
  ["2022 개정 교육과정에 따른 최소 성취수준 보장지도 자료 — 공통영어1·2 (KICE ORM 2024-79-3, 경기도교육청 게시)","https://www.goe.go.kr/resource/old/BBSMSTR_000000030224/BBS_202503100916461190.pdf"],
  ["2025년 경기 논술형 평가 Ⅱ — 교과별 문항 〈영어과〉 (공통영어1·2 성취기준·채점기준)","https://www.goe.go.kr/resource/goe/na/bbs_2675/2025/11/f2b381cb-37c2-4b0f-950f-c8011f553174.pdf"],
  ["인하대학교사범대학부속고등학교 2025학년도 2학기 교수학습 및 평가 운영 계획(공통영어2 성취기준·단원)","https://inha.icehs.kr/boardCnts/fileDown.do?fileSeq=e36244d3ec33118174b8e5fa28b853d0"],
  ["2022 개정 영어과 교육과정 해설(KICE 주형미, British Council 웨비나 — 공통영어1 16개·공통영어2 17개 성취기준)","https://www.britishcouncil.kr/sites/default/files/20230317_webinar1_2022_revised_eng_national_curriculum_hyung_mi_joo.pdf"],
  ["공통영어1 능률(오선영) 1~4과 핵심 문법(언어 형식)","https://songtanenglish.kr/common-english1-neung-lesson1-4/"],
  ["공통영어1 YBM(박준언) 단원 구성","https://englishtutortv.com/%EA%B3%B5%ED%86%B5%EC%98%81%EC%96%B41-ybm-%EB%B0%95%EC%A4%80%EC%96%B8-1%EA%B3%BC-2%EA%B3%BC-3%EA%B3%BC-4%EA%B3%BC-%EC%A0%84%EB%8B%A8%EC%9B%90-%EB%B3%B8%EB%AC%B8-pdf/"],
  ["2022 개정 고1 공통영어1·2 교과서 목록(출판사·저자)","https://www.daechisecret.com/textbookall"],
  ["내신 5등급제 영어 공부 방향(내일신문 교육기고 — 서술형 감점·요약문 영작)","https://www.localnaeil.com/News/View/653813"],
  ["2026년 3월 고1 전국연합학력평가 영어 분석 기사(헤럴드경제)","https://www.heraldk.com/article/2026042618400354718"]
 ],
 units:[

  /* ======================= 1. 어법 ======================= */
  { id:"eng-h1-grammar", grade:"h1", title:"공통영어1 · 어법 (수일치·시제·태·준동사·관계사·접속사)", std:["10공영1-02-06","10공영1-01-07"],
    exam:"내신: 교과서 본문 문장을 변형한 '어법상 틀린 것' + 괄호 동사 어형 변화 서술형. 학평: 29번 어법(밑줄 5개 중 1개) 1문항이 매회 고정.",
    lessons:[
     { id:"eng-h1-gram-verb", title:"수일치·시제·태 — 동사 자리 점검", std:["10공영1-02-06"],
       concept:[
        "**수일치**: 동사는 '진짜 주어'에 맞춘다. 주어와 동사 사이의 **수식어구(전치사구·관계절·분사구)**를 괄호로 묶고 지운다. The list (of names) **is** long.",
        "**수량 표현**: most/some/half/the rest **of + 명사** → 그 명사에 일치. the number of → 단수, a number of → 복수. each/every/-thing/-one → 단수.",
        "**시제**: 명백한 과거 표시어(yesterday, in 2010, ago) → 과거. since/for/so far/yet → **현재완료**. 시간·조건 부사절(when/if …)에서는 미래 대신 **현재**.",
        "**태**: 동사 뒤에 **목적어가 있으면 능동**, 없으면 수동을 의심. 자동사(happen, appear, remain, exist, occur)는 수동태가 없다.",
        "**분사 자리의 태**: 수식받는 명사가 '하는' 쪽이면 -ing, '당하는' 쪽이면 p.p. the man **standing** there / the letter **written** in ink."],
       why:"학평 29번과 내신 어법은 밑줄 다섯 개 중 서너 개가 '동사 또는 준동사 자리'다. 출제자는 주어와 동사 사이에 긴 수식어를 끼워 수를 헷갈리게 하거나, 목적어를 없애 능동·수동을 묻는다. 그래서 어법은 문법 지식의 양이 아니라 '진짜 주어 찾기 → 목적어 유무 → 시간 표시어' 세 단계를 기계적으로 적용하는 훈련이 점수를 만든다.",
       pitfalls:[
        "동사 바로 앞 명사에 수를 맞춤. The **colors** of the painting **is**(×) — 주어는 colors 이므로 **are**.",
        "there is/are 는 뒤에 오는 명사에 일치: There **are** many reasons. 단수 명사 두 개가 and 로 묶이면 복수.",
        "has been 뒤의 -ing 와 p.p. 혼동: has been **studied**(연구되어 왔다, 목적어 없음) vs has been **studying** English(공부해 오고 있다, 목적어 있음)."],
       points:["학평 29번: 밑줄 동사 → 수일치·태를 먼저 점검(세 밑줄 중 하나는 거의 동사)", "내신 어법: 교과서 본문 문장의 동사를 단·복수나 능·수동으로 바꿔 틀린 것 찾기", "서술형: 괄호 동사를 알맞은 형태로 쓰기 — 시제·태·수 세 가지를 모두 채점"],
       pattern:["밑줄 동사 → ① 진짜 주어 찾기(수식어 괄호) → ② 단·복수 → ③ 뒤에 목적어가 있나?(능동/수동) → ④ 시간 표시어로 시제 확정"],
       memo:"동사는 **진짜 주어**에 맞추고, **목적어 없으면 수동**, since/for 가 보이면 **현재완료**.",
       quiz:[
        { q:"어법상 알맞은 것은?  The books on the top shelf ___ to my grandfather.", opts:["belongs","belong","is belonged","has belonged"], a:1, exp:"주어는 수식어 on the top shelf 를 지운 **books**(복수) → belong. belong 은 자동사라 수동 불가, has belonged 는 단수 동사." },
        { q:"어법상 틀린 부분은?  The festival ①was held last week, and thousands of people ②was invited, so the streets ③were filled ④with music.", opts:["①","②","③","④"], a:1, exp:"주어 thousands of people 은 복수 → **were** invited. ①③ 은 목적어가 없으므로 수동이 맞다." },
        { q:"빈칸에 알맞은 것은?  She ___ in this town since she was a child, so she knows every street.", opts:["lives","lived","has lived","is living"], a:2, exp:"since + 과거 시점 → 과거부터 지금까지 계속 → **현재완료** has lived." }
       ]
     },
     { id:"eng-h1-gram-nonfinite", title:"준동사·관계사·접속사 — 동사가 아닌 자리", std:["10공영1-02-06","10공영1-01-07"],
       concept:[
        "**준동사 판별**: 문장에 이미 **본동사**가 있으면 그 자리는 준동사(to-v / v-ing / p.p.). 한 문장의 동사 수 = 접속사·관계사 수 + 1.",
        "**to부정사 vs 동명사**: want/decide/plan/hope/promise → to-v, enjoy/finish/avoid/mind/give up → v-ing. remember/forget **to-v**(앞으로 할 일) / **v-ing**(이미 한 일).",
        "**분사구문**: 주절 주어가 '하는' 쪽이면 v-ing, '당하는' 쪽이면 p.p. **Seen** from above, the town looks small.(마을은 '보이는' 쪽)",
        "**관계대명사 vs 관계부사**: 뒤 문장이 **불완전**(주어·목적어 빠짐) → which/who/that, **완전** → where/when/why. 전치사 + 관계대명사 = 관계부사.",
        "**that vs what**: 앞에 선행사가 있으면 that, 없으면 **what**(= the thing which). 접속사 that 뒤는 완전한 문장. 전치사 뒤·콤마 뒤에는 that 을 쓰지 않는다."],
       why:"고1 교과서 1~4과의 언어 형식(동명사, 가주어 it, 명사절 that, 분사 수식, 계속적 용법 관계대명사)이 그대로 내신 어법의 재료가 된다. 학평은 같은 항목을 '밑줄 친 자리가 동사인가 아닌가', '뒤 문장이 완전한가'라는 구조 판단으로 묻는다. 따라서 규칙 암기보다 '본동사 세기'와 '완전·불완전 판단'이라는 두 도구를 먼저 익혀야 한다.",
       pitfalls:[
        "**because(접속사) + 절 / because of(전치사) + 명사**, during/while, despite/although 짝을 바꿔 쓴다 — 뒤가 절인지 명사구인지 확인.",
        "관계부사 뒤에 목적어가 빠진 불완전한 절을 쓰는 실수: the book **where** I read(×) → the book **which** I read.",
        "-ing 가 보이면 무조건 현재분사로 봄 — 동명사(주어·목적어 역할)인지 분사(수식·분사구문)인지 '역할'부터 확인."],
       points:["학평 29번: 준동사 밑줄 → '본동사가 따로 있는가' 로 판별", "내신: that/what/which 넣기, 관계부사 ↔ 전치사+관계대명사 바꿔 쓰기 서술형", "접속사·전치사 짝(because/because of, despite/although) 고르기, 분사구문 ↔ 부사절 전환"],
       pattern:["관계사 빈칸: ① 선행사 유무(없으면 what) → ② 뒤 문장 완전/불완전 → ③ 완전이면 관계부사·접속사 that, 불완전이면 관계대명사", "준동사 밑줄: 본동사 찾기 → 수식받는 명사와 '하는/당하는' 관계 → v-ing / p.p."],
       memo:"본동사 하나면 나머지는 준동사, 뒤가 **불완전**하면 관계대명사·**완전**하면 관계부사, 선행사 없으면 **what**.",
       quiz:[
        { q:"빈칸에 알맞은 것은?  This is the park ___ my parents first met twenty years ago.", opts:["which","where","what","whom"], a:1, exp:"뒤 문장 my parents first met 은 주어·동사가 다 있는 **완전한 절** → 관계부사 where(= in which)." },
        { q:"어법상 틀린 부분은?  ①Having finished her homework, Mina decided ②going out ③because the rain had stopped and the air ④felt fresh.", opts:["①","②","③","④"], a:1, exp:"decide 는 to부정사를 목적어로 취한다 → decided **to go** out. ① 은 '숙제를 끝낸 뒤'의 완료 분사구문으로 맞다." },
        { q:"빈칸에 알맞은 것은?  ___ the heavy traffic, the bus arrived on time.", opts:["Although","Despite","Because","Even though"], a:1, exp:"뒤가 명사구(the heavy traffic) → 전치사 **Despite**. Although/Even though 는 접속사라 절이 와야 하고, Because 는 뜻도 어긋난다." }
       ]
     }
    ]},

  /* ======================= 2. 독해 유형 입문 ======================= */
  { id:"eng-h1-reading", grade:"h1", title:"공통영어1 · 독해 유형 입문 (주제·요지·제목, 세부 정보, 지칭, 빈칸 기초)", std:["10공영1-01-01","10공영1-01-02","10공영1-01-03","10공영1-01-04"],
    exam:"내신: 교과서 본문 문단의 주제·제목 고르기, 내용 일치, 밑줄 대명사 지칭 서술형. 학평: 18~24번(목적·심경·주장·요지·주제·제목)·25~28번(도표·안내문)·31~32번 빈칸.",
    lessons:[
     { id:"eng-h1-read-main", title:"주제·요지·제목 + 빈칸 추론 기초", std:["10공영1-01-02","10공영1-01-04"],
       concept:[
        "**주제문** 찾기: 역접 연결어(However, But, Yet) 뒤, 명령문, should/must/need to 문장, 마지막 두 문장에 주로 있다. for example 앞 문장이 주제문인 경우가 많다.",
        "**요지** = 글쓴이의 주장 한 문장(우리말). **주제** = 글이 다루는 내용(영어 명사구). **제목** = 주제를 압축·비유한 표현. 셋 다 같은 주제문에서 나온다.",
        "**오답 패턴**: 지문 단어를 그대로 쓴 **너무 좁은** 선택지(예시 하나만), **너무 넓은** 선택지(일반론), 지문과 **반대** 주장.",
        "**빈칸 추론 기초**(31~32번): 빈칸 문장은 보통 **주제문의 재진술**. 빈칸 앞뒤의 연결어와 반복 어구를 찾고 '같은 뜻, 다른 말'을 고른다.",
        "**주장·목적·함축 의미**(18·20·21번)도 같은 원리 — 핵심 메시지를 한 줄로 요약한 뒤 선택지와 대조한다."],
       why:"고1 독해 유형의 절반은 '이 글의 핵심 한 줄'을 찾는 문제다. 영어 설명문은 통념 → 반박 → 주장 → 예시 → 재진술 구조가 많아서, 주제문의 위치가 어느 정도 정해져 있다. 그 한 문장을 찾은 뒤 선택지와 의미를 비교하면 주제·요지·제목·빈칸이 사실상 한 문제가 된다.",
       pitfalls:[
        "첫 문장을 주제문으로 단정 — 첫 문장은 '통념'이고 However 뒤가 진짜 주장인 글이 많다.",
        "제목에서 지문 단어가 많이 겹치는 선택지를 고름 — 제목은 비유·질문형으로 바뀌어 나오므로 '의미'로 비교한다.",
        "빈칸에 '그럴듯한 상식'을 넣음 — 답은 반드시 지문 안의 근거 문장과 바꿔 쓸 수 있어야 한다."],
       points:["학평 20~24번(주장·요지·주제·제목): 주제문 한 줄 찾기 → 너무 좁은/넓은 선택지 소거", "내신: 교과서 본문 문단의 주제·제목 고르기 + 요지 한 문장 서술형(우리말 또는 영어)", "학평 31~32번 기초 빈칸: 빈칸 문장이 재진술하는 문장을 지문에서 찾기"],
       pattern:["① 역접·명령·should 문장에 밑줄 → ② 그 문장을 한 줄로 요약 → ③ 선택지 중 '같은 뜻, 다른 말' → ④ 너무 좁은/넓은/반대 선택지 제거", "빈칸: 빈칸 문장의 주어·동사부터 읽고 '무엇에 대한 말인가'를 정한 뒤, 지문에서 같은 내용을 말한 문장을 찾아 대입"],
       memo:"주제문은 **However 뒤·명령문·should 문장**; 요지·주제·제목·빈칸은 그 문장의 **바꿔 쓰기**다.",
       quiz:[
        { q:"다음 글의 요지로 가장 적절한 것은?  Many students read a chapter once and feel ready. However, memory fades fast. Testing yourself with the book closed is what truly makes knowledge stay.", opts:["한 번 읽기로 충분하다","스스로 시험해 보는 것이 기억에 효과적이다","책은 여러 권 읽어야 한다","기억력은 나이와 관계없다"], a:1, exp:"However 뒤 + 마지막 문장(Testing yourself … makes knowledge stay)이 주제문. ①은 통념(반대), ③④는 지문에 없다." },
        { q:"다음 글의 제목으로 가장 적절한 것은?  Plants in offices do more than decorate. Workers near green plants report less stress and make fewer errors. A small pot can change a whole day.", opts:["How to Grow Plants Indoors","Green Desks, Better Work","The Cost of Office Space","Why Workers Make Errors"], a:1, exp:"주제는 '사무실 식물이 일의 질을 높인다'. ①은 재배법(지문에 없음), ③은 무관, ④는 예시 하나만 다룬 좁은 선택지." },
        { q:"빈칸에 알맞은 것은?  A good map leaves things out. If it showed every tree and stone, nobody could read it. Likewise, a good explanation ___.", opts:["includes every detail","keeps only what matters","avoids all examples","uses difficult words"], a:1, exp:"Likewise(마찬가지로) → 앞의 '지도는 생략한다'를 설명에 적용 → 중요한 것만 남긴다. ①은 정반대, ③④는 근거 없음." }
       ]
     },
     { id:"eng-h1-read-detail", title:"세부 정보(도표·안내문·일치)와 지칭 추론", std:["10공영1-01-01","10공영1-01-03"],
       concept:[
        "**내용 일치·불일치**(26~28번 인물·안내문): 선택지를 **먼저** 읽고 지문에서 해당 부분만 찾아 대조. 선택지 순서는 보통 지문 순서와 같다.",
        "**도표(25번)**: 증가/감소(increase/decrease), 비교급(higher than, twice as many as), 최상급, 비율(percent / percentage point) 표현을 숫자와 하나씩 대조.",
        "**안내문(27~28번)**: 날짜·시간·장소·요금·신청 방법·주의 사항 등 숫자와 조건을 체크. 선택지의 '무료/유료', '가능/불가' 반전에 주의.",
        "**지칭 추론**: he/she/it/they 가 가리키는 대상은 앞 문장의 **같은 성·수의 명사**를 넣어 읽어 본다. 장문(41~45번)과 내신 본문 문제의 단골.",
        "**발문 확인**: '일치하지 **않는** 것'인지 '일치하는 것'인지 먼저 표시해 둔다."],
       why:"세부 정보 유형은 추론이 필요 없는 대신 '찾기와 대조'의 정확성을 묻는다. 출제자는 숫자·주어·시간 중 하나만 바꿔 오답을 만들기 때문에, 지문 단어와 겹친다고 맞다고 판단하면 틀린다. 지칭 추론도 마찬가지로 '가장 가까운 명사'가 아니라 행동의 주체가 누구인지 문맥으로 확인해야 한다.",
       pitfalls:[
        "지문의 숫자·단어와 겹치면 맞다고 판단 — 주어·동사가 바뀐 선택지(누가 했는지, 언제인지)를 확인.",
        "지칭 대상을 '가장 가까운 명사'로 고름 — 대입해서 행동이 자연스러운 쪽이 답.",
        "도표에서 percent 와 percentage point 혼동 — 20% → 30% 는 10%p 증가이지 10% 증가가 아니다."],
       points:["학평 25~28번: 선택지 → 지문 순서 대조, 숫자·조건 체크", "내신: 교과서 본문 내용 일치/불일치, 밑줄 친 it/they 가 가리키는 것 영어로 쓰기(서술형)", "안내문: 요금·마감·연령 조건과 부정(not, no, free) 함정"],
       pattern:["① 발문(일치/불일치) 확인 → ② 선택지 키워드에 표시 → ③ 지문에서 순서대로 찾아 ○/× → ④ 숫자·시간·주체를 한 번 더 확인", "지칭: 밑줄 대명사 앞 두 문장의 등장인물·사물을 나열 → 각각 대입 → 행동이 자연스러운 쪽"],
       memo:"세부 정보는 **선택지 먼저**, 지문 순서대로 대조; 대명사는 **앞 문장에 대입**해 읽는다.",
       quiz:[
        { q:"글의 내용과 일치하지 않는 것은?  The Spring Book Fair runs from May 3 to May 5 at City Hall. Entry is free, but a workshop costs 5 dollars. Children under 7 must come with an adult.", opts:["5월 3일부터 5일까지 열린다","입장은 무료이다","워크숍 참가비는 5달러이다","7세 미만은 혼자 참가할 수 있다"], a:3, exp:"must come with an adult → 7세 미만은 보호자 동반 필수. 나머지는 지문과 일치." },
        { q:"밑줄 친 it 이 가리키는 것은?  Mina handed Mr. Kim her essay. He read it slowly, and then he smiled because it was the best he had seen all year.", opts:["Mina","Mr. Kim","her essay","all year"], a:2, exp:"read 의 목적어이자 '올해 본 것 중 최고'인 대상 → her essay. 사람(Mina, Mr. Kim)은 it 으로 받지 않는다." },
        { q:"'자전거 이용자 비율이 2020년 20%에서 2024년 30%로' 변한 것을 바르게 나타낸 것은?", opts:["decreased by 10 percent","increased by 10 percentage points","doubled","remained the same"], a:1, exp:"비율의 차이는 **percentage point**로 말한다. 20→30 은 1.5배이므로 doubled 도 아니다." }
       ]
     }
    ]},

  /* ======================= 3. 글의 구조 ======================= */
  { id:"eng-h1-structure", grade:"h1", title:"공통영어2 · 글의 구조 (순서 배열·문장 삽입·무관 문장·요약문)", std:["10공영1-01-06","10공영2-01-04","10공영2-02-05"],
    exam:"내신: 교과서 본문 문단 순서 배열·문장 넣기·요약문 빈칸(철자 채점). 학평: 35~40번 6문항이 매회 고정 — 고1 2등급 이하를 가르는 구간.",
    lessons:[
     { id:"eng-h1-str-order", title:"순서 배열·문장 삽입 — 대명사·연결어 단서", std:["10공영1-01-06","10공영2-01-04"],
       concept:[
        "**순서(36~37번)**: 주어진 글 다음에 올 단락을 **연결어·대명사·관사**로 찾는다. the + 명사, this/these/such 는 '앞에 이미 나왔다'는 신호.",
        "**연결어 단서**: However/But(앞과 반대), For example(앞에 일반 진술), Therefore/As a result(앞에 원인), Finally(마지막). first → then → finally 시간 순서도 단서.",
        "**문장 삽입(38~39번)**: 주어진 문장의 대명사·연결어가 무엇을 받는지 정하고, 지문에서 **논리가 끊기는 자리**(새 대상이 갑자기 the/this 로 등장)를 찾는다.",
        "**대명사 성·수**: he/she/it/they, this/these 가 가리킬 수 있는 명사가 바로 앞 단락에 있어야 한다.",
        "**검증**: 고른 순서대로 처음부터 다시 읽어 매끄러운지 한 번 확인 — 한 군데라도 어색하면 다른 순서."],
       why:"영어 글은 '이미 말한 것(the, this, it)'과 '새로 말하는 것(a, 새 명사)'을 형태로 구분한다. 순서·삽입 문제는 이 신호를 읽는 능력을 묻는 것이지 내용의 그럴듯함을 묻는 것이 아니다. 내용으로 배열하면 두 가지 순서가 모두 말이 되는 함정에 빠지지만, 형태 단서는 답을 하나로 좁혀 준다.",
       pitfalls:[
        "(A)(B)(C)를 각각 읽고 '내용상 그럴듯한' 순서로 배열 — 반드시 **형태 단서**(대명사·the·연결어)로 결정.",
        "삽입에서 주어진 문장을 지문 맨 끝(⑤)에 넣음 — 끝은 보통 결론이므로 그 앞에서 끊긴 자리를 찾는다.",
        "For example 단락을 또 다른 예시 뒤에 붙임 — 예시 앞에는 반드시 **일반적 진술**이 와야 한다."],
       points:["학평 36~39번: 순서·삽입 4문항 — 대명사·the·연결어 단서로 푸는 유형", "내신: 교과서 본문 문단 순서 배열, 문장 넣기(본문을 외워도 단서로 설명할 수 있어야 함)", "주어진 글 → 첫 단락 결정이 가장 큰 점수 차이"],
       pattern:["순서: ① 주어진 글의 마지막 문장에 밑줄 → ② (A)(B)(C) 첫 문장의 대명사·연결어만 보고 후보 2개로 줄임 → ③ 마지막 단락은 결론(Thus, In the end) 확인 → ④ 통독", "삽입: ① 주어진 문장의 this/it/연결어 표시 → ② ①~⑤ 앞뒤를 읽으며 '새 정보가 the 로 갑자기 나오는 곳' → ③ 넣고 다시 읽기"],
       memo:"**this / the / However** 는 앞을 가리키는 화살표 — 순서·삽입은 화살표가 가리키는 자리를 찾는 문제다.",
       quiz:[
        { q:"주어진 글 다음에 이어질 순서로 가장 적절한 것은?  Lena wanted to learn the guitar. (A) Thanks to this habit, she played a song in a month. (B) So she practiced ten minutes a day. (C) But she had little free time.", opts:["(A)-(B)-(C)","(B)-(A)-(C)","(C)-(B)-(A)","(C)-(A)-(B)"], a:2, exp:"But(반대: 시간이 없었다) → So(그래서 매일 10분) → this habit(= 매일 10분 연습)을 받는 (A). 결과가 맨 뒤." },
        { q:"'This is why cafés play soft music.' 이 들어갈 곳은?  Sound changes how we feel. (①) Loud noise makes people eat fast and leave. (②) Gentle tunes do the opposite. (③) Guests stay longer and order more. (④)", opts:["①","②","③","④"], a:3, exp:"This = '손님이 더 오래 머물고 더 주문한다'는 효과 → 그 문장 바로 뒤인 ④. ①②는 아직 부드러운 음악 얘기가 나오기 전." },
        { q:"'As a result'로 시작하는 단락 바로 앞에 와야 하는 내용은?", opts:["결과","원인","예시","반대 의견"], a:1, exp:"As a result(그 결과) 는 앞의 **원인**을 받아 결과를 말한다. 반대 의견 뒤에는 However, 예시 앞에는 일반 진술." }
       ]
     },
     { id:"eng-h1-str-summary", title:"흐름 무관 문장·요약문 완성", std:["10공영1-01-06","10공영2-02-05"],
       concept:[
        "**무관 문장(35번)**: 첫 문장에서 글의 **주제어**를 정하고, 같은 단어를 쓰면서도 **다른 주제**(더 일반적이거나 다른 대상)로 빠지는 문장을 찾는다.",
        "무관 문장은 보통 ②~④. 지문 단어를 재사용해 '살짝' 어긋나게 설계되므로, '이 문장을 빼도 앞뒤가 이어지는가'로 확인.",
        "**요약문(40번)**: 요약문 = 주제문 바꿔 쓰기. 빈칸 (A)(B)는 보통 **원인/조건**과 **결과/행동**의 핵심어. 실험·연구 글이면 '무엇을 했더니 → 어떻게 됐다'.",
        "**요약문 선택지**는 지문 단어의 **동의어**로 나온다(increase → boost, limit → restrict). (A)는 맞고 (B)가 반대인 함정에 주의.",
        "내신 요약문 서술형: 본문 핵심 문장을 **한 문장 영어**로 — 주어·동사·목적어가 모두 있어야 득점."],
       why:"무관 문장과 요약문은 둘 다 '글의 중심 생각을 붙잡고 있는가'를 묻는다. 무관 문장은 중심에서 벗어난 문장을 골라내는 쪽, 요약문은 중심을 다른 말로 다시 쓰는 쪽이다. 첫 문장에서 주제어를 고정하지 않으면 '어려워 보이는 문장'을 무관 문장으로 고르거나, 예시 속 단어를 요약문에 넣는 실수가 나온다.",
       pitfalls:[
        "무관 문장을 '내용이 어려운 문장'으로 고름 — 기준은 어려움이 아니라 **주제 이탈**.",
        "요약문에서 (A)만 맞고 (B)가 반대인 선택지를 고름 — 두 칸을 모두 대입해 읽는다.",
        "요약문을 지문 첫 문장만 보고 완성 — 실험 글은 결과(마지막 부분)가 핵심이다."],
       points:["학평 35번·40번: 주제어 고정 → 이탈 문장 찾기 / 결론의 동의어 찾기", "내신: 본문 요약문 빈칸 (A)(B) 단어 쓰기(철자·품사 채점), 흐름에 맞지 않는 문장 찾기", "서술형: 교과서 문단을 한 문장으로 요약(주어-동사를 갖춘 문장)"],
       pattern:["무관 문장: ① 첫 문장의 주제어 2개 표시 → ② ①~⑤ 문장이 주제어와 '같은 방향'인지 ○× → ③ 빼고 읽어 이어지면 그것이 답", "요약문: ① 요약문 먼저 읽고 (A)(B)의 품사 확인 → ② 지문의 결론 문장 찾기 → ③ 동의어 선택지 대입 → ④ 반의어 함정 점검"],
       memo:"무관 문장은 **주제어 이탈**, 요약문은 **결론의 동의어** — 둘 다 첫 문장의 주제어를 먼저 고정한다.",
       quiz:[
        { q:"전체 흐름과 관계 없는 문장은?  Walking to school has clear benefits. ①Students arrive more awake. ②They also get exercise without a gym. ③Many schools are building new gyms this year. ④Parents save fuel, too.", opts:["①","②","③","④"], a:2, exp:"주제어는 '걸어서 등교의 이점'. ③은 gym 이라는 단어만 빌려 '학교의 체육관 신축'으로 주제를 벗어난다." },
        { q:"요약문의 빈칸에 알맞은 것은?  In a study, children praised for effort chose harder puzzles later, while those praised for being smart chose easy ones. → Praising ___ encourages children to take on challenges.", opts:["talent","effort","results","speed"], a:1, exp:"결과: 노력을 칭찬받은 아이들이 더 어려운 퍼즐을 골랐다 → effort. talent 는 반대쪽(smart) 집단." },
        { q:"요약문에서 지문의 limit 을 바꿔 쓴 말로 가장 적절한 것은?", opts:["restrict","boost","expand","ignore"], a:0, exp:"limit(제한하다) ≒ restrict. boost·expand 는 반의어 계열, ignore 는 무관." }
       ]
     }
    ]},

  /* ======================= 4. 어휘·서술형 ======================= */
  { id:"eng-h1-vocab-writing", grade:"h1", title:"공통영어2 · 어휘·서술형 (문맥 어휘, 내신 영작·배열·빈칸)", std:["10공영2-01-05","10공영2-02-02","10공영2-02-04","10공영2-02-07"],
    exam:"내신: 본문 단어를 반의어·혼동어로 바꾼 어휘 문항 + 서술형(배열·조건 영작·어형 변화) 20~30%. 학평: 30번 문맥 어휘 1문항. 5등급제에서 서술형 감점이 등급을 가른다.",
    lessons:[
     { id:"eng-h1-vocab-context", title:"문맥 어휘 — 반의어 대입과 혼동어", std:["10공영2-01-05","10공영2-02-07"],
       concept:[
        "**어휘 문제(30번)**: 밑줄 5개 중 **문맥과 반대**인 단어 하나. 오답 밑줄은 거의 **반의어 쌍**으로 설계된다(increase↔decrease, positive↔negative, accept↔reject).",
        "밑줄 단어를 **반대말로 바꿔** 읽어 더 자연스러우면 그것이 답. 먼저 글의 방향(찬/반, 긍정/부정)을 첫 두 문장에서 정한다.",
        "**네모 어휘**: (A)(B)(C) 각 네모의 두 단어는 철자가 비슷한 **혼동어**(affect/effect, adapt/adopt, conserve/converse)이거나 반의어.",
        "**다의어·문맥 의미**: 밑줄 단어의 '이 글에서의 뜻' 고르기 — 같은 품사의 선택지를 대입해 자연스러운 것. (run: 달리다 / 운영하다 / 흐르다)",
        "**철자 혼동어** 암기: affect/effect, adapt/adopt, lie/lay, rise/raise, than/then, quite/quiet, loose/lose, desert/dessert, principal/principle."],
       why:"어휘 문항은 단어의 뜻을 아는지가 아니라 '글의 방향과 단어의 방향이 맞는지'를 묻는다. 그래서 어려운 단어가 답인 경우는 드물고, 아는 단어가 반대 방향으로 쓰인 자리가 답이다. 내신은 교과서 본문 단어를 반의어·혼동어로 살짝 바꿔 내므로, 본문을 읽을 때 '이 단어가 긍정인가 부정인가'를 표시해 두는 습관이 두 시험을 함께 대비한다.",
       pitfalls:[
        "모르는 단어에 밑줄이 있으면 그것을 답으로 고름 — 답은 아는 단어의 **반대 방향** 사용인 경우가 대부분.",
        "부정어(not, never, un-, dis-, hardly)를 놓쳐 방향을 거꾸로 읽음.",
        "혼동어 네모에서 '들어본 단어'를 고름 — 품사(affect 동사 / effect 명사)와 뜻을 확인하고 문장에 대입."],
       points:["학평 30번: 반의어 대입으로 어색한 밑줄 찾기", "내신: 교과서 본문 단어를 반의어·혼동어로 바꾼 '문맥상 적절하지 않은 것'", "서술형: 영영 풀이를 보고 본문 단어 쓰기, 주어진 첫 글자로 시작하는 단어 채우기"],
       pattern:["① 첫 두 문장에서 글의 방향(주장) 고정 → ② 밑줄마다 반의어 대입 → ③ 더 자연스러운 쪽이 오류 → ④ 부정어 점검", "네모 어휘: 네모 앞뒤 5단어 안에서 주어·목적어와의 궁합(affect + 목적어 / an effect on) 확인"],
       memo:"어휘 문제는 **반의어 대입** — 바꿨을 때 더 자연스러우면 그 밑줄이 틀렸다.",
       quiz:[
        { q:"문맥상 낱말의 쓰임이 적절하지 않은 것은?  Sleep helps the brain ①store memories. Students who sleep well ②recall more words, while tired students make ③fewer mistakes and ④lose focus.", opts:["①","②","③","④"], a:2, exp:"글의 방향: 잠이 부족하면 나쁘다. 피곤한 학생이 실수를 '적게' 한다는 ③은 반대 → **more** mistakes." },
        { q:"(A)(B)에 알맞은 짝은?  Cold weather can (A) [affect / effect] your mood, so try to (B) [adapt / adopt] a daily walking habit.", opts:["affect – adapt","affect – adopt","effect – adapt","effect – adopt"], a:1, exp:"affect = 동사 '영향을 주다'(effect 는 명사). adopt a habit = 습관을 들이다(adapt 는 '적응하다')." },
        { q:"밑줄 친 runs 의 뜻으로 알맞은 것은?  My aunt runs a small bakery near the station.", opts:["달리다","흐르다","운영하다","작동하다"], a:2, exp:"목적어가 a bakery(가게) → '운영하다'. 달리다·흐르다는 목적어를 취하지 않는다." }
       ]
     },
     { id:"eng-h1-writing-serial", title:"내신 서술형 — 배열·조건 영작·어형 변화 채점 포인트", std:["10공영2-02-02","10공영2-02-04","10공영2-02-07"],
       concept:[
        "**서술형 3대 유형**: ① **배열**(주어진 단어를 순서대로), ② **조건 영작**(우리말 → 영어, 단어 수·특정 표현 지정), ③ **빈칸·어형 변화**(본문 문장의 핵심어와 동사 형태).",
        "**채점 순서**: 어순 → 동사의 수·시제·태 → 관사·전치사 → 철자·대소문자·구두점. 한 군데 틀리면 부분 점수, 두 군데 이상이면 0점으로 처리하는 학교가 많다.",
        "**조건 영작**: '관계대명사를 사용할 것', '8단어로 쓸 것', '주어진 단어를 변형할 것' — 조건 하나만 어겨도 0점이므로 조건에 밑줄.",
        "**어형 변화**: 괄호 동사를 문맥에 맞게 — 본동사가 따로 있는지 먼저 판단(있으면 준동사), 그다음 수일치·시제·태.",
        "**답안 점검 루틴**: 동사 개수 = 접속사·관계사 수 + 1, 3인칭 단수 -s, 과거 표시어와 시제 일치, 마침표."],
       why:"2025학년도 고1부터 내신이 5등급제가 되어 1등급 인원은 늘었지만 상위권 원점수 경쟁은 촘촘해졌다. 선택형은 변별이 어려우므로 서술형이 등급을 가르는 자리가 되었고, 작은 철자·수일치 실수도 감점된다. 교과서 본문을 외우는 것만으로는 조건이 바뀐 발문에 대응할 수 없어, 어법 지식을 '쓰기'로 옮기는 연습이 필요하다.",
       pitfalls:[
        "우리말 어순대로 영어를 씀 — 영어는 **주어 + 동사 + 목적어**, 꾸미는 말(관계절·전치사구)은 뒤에.",
        "배열 문제에서 주어진 단어를 빠뜨리거나 추가함 — 단어 수를 세어 표시하고 다 썼는지 확인.",
        "교과서 본문을 통째로 외워 쓰지만 발문이 조건(시제·인칭·단어 수)을 바꾼 경우 그대로 쓰면 감점."],
       points:["내신 지필 서술형(보통 20~30%): 본문 문장 배열·조건 영작·어형 변화", "5등급제: 1등급 컷이 높아 서술형 1~2점 감점이 등급을 가른다", "논술형(경기 등): 30~40단어 의견 쓰기 — 요구 요소 포함과 논리 연결이 채점 기준, 단어 수 자체로는 감점하지 않음"],
       pattern:["영작: ① 조건에 밑줄 → ② 주어·동사 먼저 → ③ 목적어·보어 → ④ 수식어(형용사구·관계절) 뒤에 붙이기 → ⑤ 동사 수·시제·관사·철자 점검", "배열: 동사·접속사부터 찾아 뼈대(S+V)를 세우고, 남은 단어를 수식어로 배치한 뒤 단어 수 확인"],
       memo:"서술형은 **조건 → 뼈대(S+V) → 수식어 → 동사 점검** 네 단계; 한 글자 실수도 감점이다.",
       quiz:[
        { q:"우리말에 맞게 바르게 배열한 것은?  '내가 어제 산 가방은 가볍다.' (the bag / bought / yesterday / is / I / light)", opts:["The bag I bought yesterday is light.","The bag is light I bought yesterday.","I bought the bag yesterday is light.","The bag bought I yesterday is light."], a:0, exp:"뼈대 The bag is light + 가방을 꾸미는 관계절(which 생략) I bought yesterday 를 명사 바로 뒤에." },
        { q:"조건 '관계대명사 사용, 7단어' 에 맞는 영작은?  '나는 요리를 잘하는 친구가 있다.'", opts:["I have a friend who cooks well.","I have a friend cooking well.","I have a friend he cooks well.","My friend who cooks well."], a:0, exp:"who 사용 + 7단어 + 완전한 문장. ②는 관계대명사 없음(조건 위반), ③은 he 가 중복, ④는 동사(본동사)가 없다." },
        { q:"괄호 동사의 알맞은 형태는?  The letter (write) by my grandmother in 1980 is still kept in a box.", opts:["writing","written","was written","wrote"], a:1, exp:"본동사 is 가 이미 있으므로 준동사 자리. 편지는 '쓰여진' 쪽 → 과거분사 **written**(by my grandmother 가 단서)." }
       ]
     }
    ]}
 ]});
