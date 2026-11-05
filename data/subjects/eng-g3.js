// 영어 중3 (1학기 g31 · 2학기 g32) — 2022 개정 교육과정(교육부 고시 제2022-33호 별책 14) 기준.
// 출처·추정 사항:
//  - 2022 개정 중학교 영어는 '이해(9영01)·표현(9영02)' 두 영역. 문법은 성취기준이 아니라 [별표 4] 언어 형식이므로 가장 가까운
//    기능 성취기준을 붙였다. 직접 확인한 코드(British Council 웨비나 PDF): [9영01-08] 적절한 전략을 활용하여 다양한 매체로
//    표현된 담화나 글을 듣거나 읽는다 / [9영01-09] 다양한 관점을 존중하는 태도로 듣거나 읽는다 / [9영02-05] 친숙한 주제에 관해
//    일이나 사건의 논리적 관계를 설명한다 / [9영02-06] 친숙한 주제에 관해 자신의 의견을 주장한다 / [9영02-10] 적절한 전략을
//    활용하여 상황이나 목적에 맞게 말하거나 쓴다.
//  - '추정': [9영01-02](담화나 글의 주제·요지 파악)는 원문 전체를 열지 못해 번호를 확정하지 못했다(별책 14 이해 영역 02번으로 추정).
//  - '추정': 2022 개정 중3 교과서는 2027년 발행 예정이라 단원 구성은 2015 개정 중3 교과서 공통 문법(가정법·분사구문·관계부사·
//    what·계속적 용법·과거완료·완료진행·so that·unless·4·5형식 수동태·강조·도치·간접화법)과 실제 중3 기말 분석 기사(과거완료·
//    가정법·분사구문·so that 매년 출제)를 근거로 짰다. 2015↔2022 중학교 성취기준의 높은 연속성은 학술 논문(earticle A444200)으로 확인.
//  - 영어 예문·지문은 모두 자작.
window.DATA = window.DATA || {}; window.DATA.subjectsExtra = window.DATA.subjectsExtra || [];
window.DATA.subjectsExtra.push({ sid:"eng", grade:"g31",
 src:[
  ["2022 개정 영어과 교육과정 해설(KICE 주형미, British Council 교사 웨비나 — 이해/표현 영역·중학교 성취기준 [9영01-08]·[9영02-05] 등)","https://www.britishcouncil.kr/sites/default/files/20230317_webinar1_2022_revised_eng_national_curriculum_hyung_mi_joo.pdf"],
  ["2022 개정 영어과 교육과정 [별표 3] 어휘(교육부 고시 제2022-33호 별책 14 발췌, 경기도교육청)","https://www.goe.go.kr/resource/old/BBSMSTR_000000030136/BBS_202307111028067791.pdf"],
  ["2015·2022 개정 영어과 교육과정 중학교 성취기준의 항존성 분석(earticle) — 두 교육과정 성취기준의 높은 일치","https://m.earticle.net/Article/A444200"],
  ["중3 2학기 기말고사 영어 시험 분석 기사(내일신문) — 과거완료·가정법·분사구문·so that 출제 경향","https://www.localnaeil.com/News/View/652700"]
 ],
 units:[

  /* ======================= 1학기 1. 가정법·분사구문 ======================= */
  { id:"eng-g3-cond", grade:"g31", title:"영어 · 가정법과 분사구문", std:["9영02-05","9영02-06"],
    exam:"중3 1학기 중간·기말 최다 출제. 가정법 과거↔과거완료 시제 짝 맞추기, 직설법↔가정법 전환 서술형, 부사절↔분사구문 전환이 매년 나온다.",
    lessons:[
     { id:"eng-g3-cond-sub", title:"가정법 과거·과거완료, I wish·as if", std:["9영02-05","9영02-06"],
       concept:[
        "**가정법 과거**: 현재 사실의 반대. If + 주어 + **동사 과거형(be는 were)**, 주어 + **would/could/might + 동사원형**. If I **were** you, I **would take** the job.",
        "**가정법 과거완료**: 과거 사실의 반대. If + 주어 + **had p.p.**, 주어 + **would/could/might have p.p.** If she **had left** earlier, she **would have caught** the train.",
        "**I wish + 가정법 과거**(지금 …하면 좋을 텐데) / **I wish + had p.p.**(그때 …했더라면). I wish I **had** a bike. / I wish I **had studied** harder.",
        "**as if + 가정법 과거**: 마치 …인 것처럼(사실 아님). He talks **as if** he **knew** everything. (사실은 모름)",
        "직설법 전환: If I **had** money, I **could buy** it. = **As** I **don't have** money, I **can't buy** it. (시제 한 단계 당기고 긍정↔부정)"],
       why:"'만약 ~라면'의 if 조건절(현재시제)은 실제로 일어날 수 있는 일이고, 가정법은 사실과 반대인 일을 말한다. 영어는 '현실에서 한 발 물러남'을 시제를 한 칸 과거로 미는 방식으로 표시한다. 그래서 현재의 반대는 과거형, 과거의 반대는 과거완료형이 된다.",
       pitfalls:[
        "가정법 과거의 주절에 will: If I were rich, I **will** buy (X) → **would**. if 절에 would 를 넣는 실수도 많다: If I **would** have (X).",
        "과거완료의 주절 would have p.p.를 would + 과거형으로 줄여 쓰는 실수: would **have gone** ○ / would **went** ×.",
        "**혼합 가정법**: If I had taken the bus **then**, I would be home **now**. 과거 조건 + 현재 결과면 주절은 would + 동사원형."],
       points:["어법: if 절·주절 시제 짝 맞추기(were ↔ would V / had p.p. ↔ would have p.p.)", "서술형: 직설법 ↔ 가정법 전환(시제 한 단계, 긍정·부정 뒤집기)", "학평·내신: I wish / as if 뒤 동사 형태 고르기 — 현재 사실 반대면 과거형"],
       pattern:["가정법 판별: ① 주절에 would/could 가 있는가 → ② if 절 동사가 과거형이면 '현재 반대', had p.p.면 '과거 반대' → ③ 우리말로 '~라면 좋을 텐데/~했더라면' 확인", "직설법 전환: 시제를 한 칸 현재 쪽으로 당기고(were→am, had p.p.→과거) 긍정·부정을 뒤집어 As/Because 로 잇는다"],
       memo:"현재 반대 = were/과거형 + would V, 과거 반대 = had p.p. + would have p.p. I wish·as if 도 같은 규칙.",
       quiz:[
        { q:"빈칸에 알맞은 것은?  If I ___ taller, I could reach the top shelf.", opts:["am","were","had been","will be"], a:1, exp:"주절 could reach(가정법 과거) → if 절은 과거형 were. 현재 키가 작다는 뜻." },
        { q:"어법상 틀린 것은?", opts:["If it had snowed, we would have made a snowman.","I wish I had a sister.","She acts as if she were a queen.","If he had known, he would tell me yesterday."], a:3, exp:"yesterday 의 과거 사실 반대 → 주절은 would **have told**." },
        { q:"같은 뜻이 되도록 할 때 알맞은 것은?  As I don't know her number, I can't call her.", opts:["If I knew her number, I could call her.","If I know her number, I can call her.","If I had known her number, I could have called her.","If I didn't know her number, I couldn't call her."], a:0, exp:"현재 사실(모른다)의 반대 → 가정법 과거 knew / could call. 긍정·부정을 뒤집는다." }
       ]},
     { id:"eng-g3-cond-part", title:"분사구문과 현재분사·과거분사", std:["9영02-05"],
       concept:[
        "**현재분사(-ing)**는 능동·진행, **과거분사(p.p.)**는 수동·완료. the **sleeping** baby(자고 있는) / the **broken** window(깨진). 명사 앞·뒤에서 꾸민다.",
        "감정 분사: 감정을 **일으키면 -ing**, **느끼면 p.p.** The movie was **boring**, so I was **bored**. 주어가 사람이라도 남을 지루하게 만들면 boring.",
        "**분사구문** 만들기: ① 접속사 지우기 ② 주절과 같은 주어 지우기 ③ 동사를 **-ing** 로. **When I saw** him, I smiled. → **Seeing** him, I smiled.",
        "뜻은 문맥으로: 시간(…할 때)·이유(…해서)·동시동작(…하면서)·조건·양보. **Being** tired, he went to bed early. (이유)",
        "부정은 **Not** + -ing. **Not knowing** the answer, she kept quiet. 수동이면 **(Being) + p.p.**: **(Being) Written** in haste, the letter had errors."],
       why:"분사는 동사를 형용사처럼 쓰는 장치다. 능동이면 -ing, 수동이면 p.p.라는 한 가지 기준이 명사 수식·감정 분사·분사구문 모두에 똑같이 적용된다. 분사구문은 '접속사+주어+동사'를 -ing 하나로 압축해 글을 가볍게 만드는 쓰기 기술이라 독해 지문에 자주 나온다.",
       pitfalls:[
        "감정 분사 뒤집기: I was **exciting** (X, 내가 남을 흥분시킴) → I was **excited**. 주어가 느끼는 쪽이면 p.p.",
        "주어가 다를 때 지우는 실수: **It** being cold, we stayed in. 주절 주어(we)와 다르면 분사 앞에 남겨야 한다(독립 분사구문).",
        "분사구문 → 부사절 전환 때 접속사를 잘못 고르기. 앞뒤 뜻이 '이유'인지 '동시'인지 우리말로 먼저 번역하고 Because/While 을 고른다."],
       points:["어법: -ing vs. p.p. 고르기(명사와의 관계가 능동이면 -ing, 수동이면 p.p.)", "서술형: 부사절 ↔ 분사구문 전환(접속사·주어 제거, Not 위치)", "내신: 감정 분사 쌍(surprising/surprised 등) 빈칸 — 주어가 사물이면 대개 -ing"],
       pattern:["분사 고르기: 꾸밈 받는 명사가 그 동작을 '하는가(-ing)' '당하는가(p.p.)' 질문 한 번으로 끝", "분사구문 복원: ① -ing 앞에 주절 주어를 넣고 ② 주절 시제로 동사 바꾸고 ③ 문맥에 맞는 접속사(When/Because/While) 붙이기"],
       memo:"하면 -ing, 당하면 p.p. 분사구문 = 접속사·주어 빼고 -ing, 부정은 Not 을 맨 앞에.",
       quiz:[
        { q:"빈칸에 알맞은 것은?  The news was so ___ that everyone was ___.", opts:["surprising – surprised","surprised – surprising","surprising – surprising","surprised – surprised"], a:0, exp:"소식은 놀라게 하는 쪽(-ing), 사람들은 놀란 쪽(p.p.)." },
        { q:"분사구문으로 바르게 바꾼 것은?  Because she didn't have an umbrella, she got wet.", opts:["Not having an umbrella, she got wet.","Having not an umbrella, she got wet.","Not had an umbrella, she got wet.","Didn't having an umbrella, she got wet."], a:0, exp:"접속사·주어 제거, 부정 Not 은 -ing 바로 앞." },
        { q:"밑줄 친 분사구문의 뜻으로 알맞은 것은?  Walking along the river, I found a small cafe.", opts:["강을 따라 걷기 위해","강을 따라 걷다가(걸을 때)","강을 따라 걷지 않아서","비록 강을 따라 걸었지만"], a:1, exp:"'걷다가 발견했다' → 시간(When/While)의 분사구문." }
       ]}
    ]},

  /* ======================= 1학기 2. 관계사 심화·완료 시제 ======================= */
  { id:"eng-g3-relperf", grade:"g31", title:"영어 · 관계사 심화와 완료 시제", std:["9영02-05","9영01-08"],
    exam:"관계부사·what·계속적 용법은 어법 선택형 + 두 문장 합치기 서술형, 과거완료는 '먼저 일어난 일' 고르기가 단골(실제 중3 기말 분석에서 매년 출제 확인).",
    lessons:[
     { id:"eng-g3-relperf-adv", title:"관계부사 · 관계대명사 what · 계속적 용법", std:["9영02-05"],
       concept:[
        "**관계부사** = 전치사 + 관계대명사. 장소 **where**(= in/at which), 시간 **when**(= on which), 이유 **why**(= for which), 방법 **how**. 뒤에는 **완전한 문장**이 온다.",
        "This is the park **where** we first met. (= in which) / I remember the day **when** she left. the way 와 how 는 **같이 쓰지 않는다**(the way how X).",
        "**관계대명사 what** = the thing(s) which. 선행사를 **품고 있어** 앞에 명사가 없다. **What** he said was true. (= The thing which he said)",
        "**계속적 용법**: 콤마(,) + who/which. 선행사를 **보충 설명**하며 '그리고/그런데 그는'으로 앞에서부터 해석. I met Jane, **who** told me the news. **that·what** 은 계속적 용법 불가.",
        "계속적 which 는 **앞 문장 전체**를 받을 수 있다. He passed the test, **which** surprised everyone. (= and it)"],
       why:"관계부사 뒤가 완전한 문장인 이유는 부사(장소·시간)는 빠져도 문장이 깨지지 않기 때문이다. what 은 '…하는 것'이라는 명사 덩어리 자체라서 선행사를 따로 둘 자리가 없다. 콤마는 '이 정보는 꼭 필요한 조건이 아니라 덧붙임'이라는 표시이므로 that 처럼 꽉 묶는 말과는 어울리지 않는다.",
       pitfalls:[
        "선행사만 보고 where 를 고르는 실수. the city **which** I visited(목적어 빠짐 → 관계대명사) vs. the city **where** I live(완전 → 관계부사).",
        "that 과 what 혼동: 앞에 명사가 있으면 that, 없으면 what. I know **what** you did. / the thing **that** you did.",
        "계속적 용법에서 which 를 that 으로 바꾸거나 생략하는 실수. 콤마 뒤 that 금지, 생략 불가."],
       points:["어법: 빈칸 뒤 문장의 완전·불완전 판단 → where/which 선택", "서술형: 두 문장을 관계부사로 합치기 / that 과 what 중 알맞은 것 쓰기", "내신: 계속적 용법 which 가 가리키는 것(앞 문장 전체) 찾기, that 대체 가능 여부"],
       pattern:["관계사 선택 3단계: ① 앞에 명사(선행사)가 있는가 → 없으면 what ② 뒤 문장이 완전한가 → 완전하면 관계부사 ③ 불완전하면 사람 who / 사물 which", "계속적 용법 해석: 콤마에서 끊고 '그리고 그 사람(것)은'을 넣어 앞에서부터 읽는다"],
       memo:"뒤가 완전하면 관계부사, 앞에 명사 없으면 what, 콤마 뒤엔 that·what 금지.",
       quiz:[
        { q:"빈칸에 알맞은 것은?  I still remember the house ___ I grew up.", opts:["which","where","what","that"], a:1, exp:"뒤 문장 I grew up 이 완전(목적어 필요 없음) → 장소 관계부사 where(= in which)." },
        { q:"어법상 틀린 것은?", opts:["What I need now is a short break.","Tell me the reason why you were late.","This is the way how she solved it.","He has a brother, who lives in Jeju."], a:2, exp:"the way 와 how 는 함께 쓸 수 없다. the way 또는 how 하나만." },
        { q:"밑줄 친 which 가 가리키는 것은?  My sister finished the marathon, which made our parents proud.", opts:["the marathon","My sister","our parents","앞 문장 전체(언니가 마라톤을 완주한 것)"], a:3, exp:"콤마 + which 는 앞 문장 전체를 받아 '그런데 그것이'로 이어진다." }
       ]},
     { id:"eng-g3-relperf-perfect", title:"과거완료 · 현재완료진행", std:["9영02-05"],
       concept:[
        "**과거완료** had + p.p.: 과거의 어떤 시점보다 **더 먼저** 일어난 일(대과거). When I arrived, the bus **had** already **left**. (떠남 → 도착)",
        "단서: **by the time, before, already, until** + 과거 시점. 기준 시점은 **과거시제**, 먼저 일어난 일은 **had p.p.**",
        "과거완료의 경험·계속·완료·결과도 현재완료와 같은 용법. I **had never seen** snow until I moved to Seoul. (경험)",
        "**현재완료진행** have/has been + -ing: 과거에 시작해 **지금도 계속 진행 중**. She **has been studying** since 9 a.m. (아직 공부 중)",
        "현재완료(결과·완료) vs. 현재완료진행(계속 진행): I **have read** the book(다 읽음) / I **have been reading** the book(읽는 중). 상태동사(know/like)는 진행 불가."],
       why:"과거의 두 사건을 한 문장에 넣으면 어느 쪽이 먼저인지 알 수 없다. 영어는 먼저 일어난 쪽을 had p.p.로 한 칸 더 뒤로 밀어 순서를 표시한다. 현재완료진행은 현재완료의 '지금까지'와 진행형의 '하는 중'을 합친 것이므로 since/for 와 잘 어울린다.",
       pitfalls:[
        "두 사건이 before/after 로 순서가 이미 분명하면 과거완료 없이 과거시제 둘로도 맞다. '틀린 것' 문제에서 이것을 함부로 고르지 않는다.",
        "기준이 되는 과거 시점 없이 had p.p.만 쓰는 실수. '어제 그 책을 읽었다'는 그냥 과거 read.",
        "현재완료진행에 상태동사: I have been **knowing** him (X) → have known. 기간 표현은 for + 기간 / since + 시점."],
       points:["어법: 두 사건 중 먼저 일어난 것에 had p.p. 고르기(by the time·already 단서)", "서술형: 괄호 안 동사를 과거/과거완료로 알맞게 바꾸기", "내신: 현재완료 vs. 현재완료진행 — '아직 하는 중'이면 been -ing"],
       pattern:["시제 배열: ① 문장 속 두 사건에 번호 매기기 → ② 기준 과거 시점(when/by the time 절)은 과거형 → ③ 그보다 앞선 사건은 had p.p.", "완료진행 판별: since/for + '지금도 하는 중'이면 have been -ing, 결과가 끝났으면 have p.p."],
       memo:"먼저 일어난 과거 = had p.p., 지금도 하는 중 = have been -ing (상태동사는 X).",
       quiz:[
        { q:"빈칸에 알맞은 것은?  By the time we got to the theater, the movie ___.", opts:["starts","started","had started","has started"], a:2, exp:"기준 시점 got(과거)보다 영화 시작이 먼저 → 과거완료 had started." },
        { q:"어법상 틀린 것은?", opts:["I had lost my key, so I couldn't open the door.","It has been raining since last night.","She has been knowing him for ten years.","He had finished dinner before I called."], a:2, exp:"know 는 상태동사 → 진행형 불가. has known 으로." },
        { q:"밑줄 친 부분의 뜻으로 알맞은 것은?  Tom has been painting the fence all morning.", opts:["톰은 아침에 울타리를 다 칠했다.","톰은 아침 내내 울타리를 칠하고 있다(지금도 하는 중).","톰은 울타리를 칠한 적이 있다.","톰은 울타리를 칠할 예정이다."], a:1, exp:"현재완료진행 = 과거에 시작해 지금도 진행 중." }
       ]}
    ]},

  /* ======================= 2학기 3. 접속사·수동태 심화 ======================= */
  { id:"eng-g3-conjpass", grade:"g32", title:"영어 · 접속사·수동태 심화", std:["9영02-05","9영02-10"],
    exam:"2학기 중간 범위의 핵심. so that/unless/as long as 빈칸과 4·5형식 수동태 전환 서술형(to/for, to부정사 복원)이 어법 배점의 절반을 차지한다.",
    lessons:[
     { id:"eng-g3-conjpass-conj", title:"so that · unless · as long as · 접속사 심화", std:["9영02-05"],
       concept:[
        "**so that + 주어 + can/will**: …하기 위해(목적). I got up early **so that** I **could** catch the first train. = **in order to** catch.",
        "**so ~ that**(결과)과 구별: so 와 that 사이에 **형용사/부사**가 끼면 결과, 붙어 있으면 목적. It was so dark **that** I fell. / I left early **so that** I wouldn't be late.",
        "**unless** = if ~ not(…하지 않으면). **Unless** you hurry, you'll miss it. = If you **don't** hurry. unless 절에 not 을 또 쓰지 않는다.",
        "**as long as**: …하는 한(조건). You can stay **as long as** you keep quiet. / **even though**: 비록 …지만(although 강조) / **while**: …하는 동안 또는 반면에.",
        "**not only A but (also) B** = B **as well as** A. 동사는 **B** 에 수일치. **Not only** you **but also** she **is** right. / **both A and B** 는 복수."],
       why:"접속사는 두 사건의 관계를 이름 붙인다. 목적(so that)·조건(unless, as long as)·양보(even though)·대조(while)를 구별하면 빈칸 문제가 해석 문제로 바뀐다. unless 는 이미 '않으면'이 들어 있어 not 과 겹치면 뜻이 뒤집히는 것이 핵심이다.",
       pitfalls:[
        "so that 뒤 조동사 생략: so that I **catch** (X) → so that I **can/could** catch. 시제는 주절에 맞춘다.",
        "unless 절에 이중 부정: Unless you **don't** study (X). unless 자체가 부정.",
        "조건 접속사(unless, as long as, if) 뒤 미래는 **현재시제**: as long as it **doesn't rain** (will not X)."],
       points:["빈칸: so that / unless / as long as / even though 중 문맥에 맞는 것", "서술형: so that ↔ in order to, unless ↔ if ~ not 전환", "어법: not only A but also B 수일치, 조건절 현재시제"],
       pattern:["접속사 빈칸: 앞뒤를 우리말로 '~하려고/~않으면/~하는 한/~지만' 중 하나로 번역해 보고 고른다", "unless 전환: unless + 긍정 ↔ if + not. not 의 개수가 하나인지 세어 본다"],
       memo:"so that + can = 목적, unless = if not(이중 부정 X), as long as = …하는 한, 조건절은 현재시제.",
       quiz:[
        { q:"빈칸에 알맞은 것은?  ___ you water the plant every day, it will die.", opts:["If","Unless","As long as","So that"], a:1, exp:"'물을 주지 않으면 죽는다' → unless(= if you don't)." },
        { q:"같은 뜻이 되도록 할 때 알맞은 것은?  She saved money so that she could buy a camera.", opts:["She saved money in order to buy a camera.","She saved so much money that she bought a camera.","She saved money unless she bought a camera.","She saved money as long as she could buy a camera."], a:0, exp:"so that + can(목적) = in order to + 동사원형." },
        { q:"어법상 틀린 것은?", opts:["You may go out as long as you come back by nine.","Not only Mike but also his parents are coming.","Unless you don't leave now, you'll be late.","Even though it was cold, they went swimming."], a:2, exp:"unless 는 이미 부정 → don't 를 빼야 한다. Unless you leave now." }
       ]},
     { id:"eng-g3-conjpass-passive", title:"4·5형식 수동태 · by 이외 전치사 · 조동사 수동태", std:["9영02-05","9영02-10"],
       concept:[
        "**4형식 수동태**: 목적어가 둘이라 수동태도 둘. She gave **me** a book. → **I was given** a book. / A book **was given to me**. 직접목적어가 주어면 간접목적어 앞에 **to/for**.",
        "to 를 쓰는 동사 give/send/show/tell, **for** 를 쓰는 동사 make/buy/cook. A cake **was made for** me. **buy·make·cook** 은 사람 주어 수동태를 잘 안 쓴다.",
        "**5형식 수동태**: 목적격 보어는 그대로 남긴다. They call him **Captain**. → He **is called Captain**. / We kept the room **clean**. → The room **was kept clean**.",
        "**지각·사역동사 수동태**: 동사원형 보어가 **to부정사**로 바뀐다. They made me **wait**. → I **was made to wait**. / saw him **cross** → He **was seen to cross**.",
        "**조동사 수동태** 조동사 + **be p.p.**: The work **must be done** today. / 구동사는 한 덩어리: **was looked after** by. / by 이외: be filled **with**, be known **for**(이유)·**as**(자격)."],
       why:"수동태는 '목적어를 주어로 끌어올리는' 규칙 하나다. 목적어가 둘이면 주어 후보가 둘이고, 보어는 목적어가 아니라서 자리에 그대로 남는다. 사역·지각동사 뒤에서 생략됐던 to 는 수동태가 되면 동사 뒤에 붙을 목적어가 없어져 다시 나타난다고 이해하면 된다.",
       pitfalls:[
        "4형식 직접목적어 주어 수동태에서 전치사 빠뜨림: A letter was sent **me** (X) → sent **to me**.",
        "사역동사 수동태에서 원형 유지: I was made **clean** (X) → was made **to clean**. 단 **let** 은 수동태 대신 be allowed to.",
        "구동사의 전치사 누락: The dog was taken care **by** her (X) → taken care **of by** her."],
       points:["서술형: 4형식 문장을 두 가지 수동태로 쓰기(to/for 구별)", "어법: 사역·지각동사 수동태의 to부정사, 조동사 + be p.p.", "내신: by 이외 전치사 빈칸(with/at/in/for/as) 짝 외우기"],
       pattern:["4형식 수동태: ① 어느 목적어를 주어로? → ② 직접목적어 주어면 남은 사람 앞에 to/for → ③ 동사별 전치사(give류 to / make류 for)", "5형식 수동태: 목적어만 앞으로, 보어는 제자리. 보어가 동사원형이었으면 to 를 되살린다"],
       memo:"4형식은 수동태 둘(to/for), 5형식 보어는 제자리, 사역·지각 수동태엔 to 부활, 조동사 + be p.p.",
       quiz:[
        { q:"수동태로 바르게 바꾼 것은?  My uncle bought me a watch.", opts:["I was bought a watch by my uncle.","A watch was bought to me by my uncle.","A watch was bought for me by my uncle.","A watch bought me by my uncle."], a:2, exp:"buy 는 for 를 쓰고, 사람(me)을 주어로 한 수동태는 어색하므로 직접목적어 주어형이 자연스럽다." },
        { q:"어법상 틀린 것은?", opts:["I was made to apologize by my teacher.","The room must be cleaned before noon.","She was seen enter the building.","The baby is looked after by her grandmother."], a:2, exp:"지각동사 수동태에서는 동사원형이 to부정사로 → was seen **to enter**." },
        { q:"빈칸에 알맞은 것은?  The jar is filled ___ cookies, and the town is known ___ its old castle.", opts:["with – for","by – as","of – to","with – at"], a:0, exp:"be filled with(…로 가득 차다), be known for(…로 유명하다). known as 는 '…로서'." }
       ]}
    ]},

  /* ======================= 2학기 4. 강조·도치·간접화법 + 독해·영작 ======================= */
  { id:"eng-g3-emphread", grade:"g32", title:"영어 · 강조·도치·간접화법과 독해·영작 서술형", std:["9영01-08","9영02-10","9영02-05"],
    exam:"2학기 기말 범위. It~that 강조 전환, 부정어 도치 어순 배열, 간접화법 시제·대명사 전환 서술형. 독해는 교과서 본문 변형에 고입·고1 학평형(순서·무관 문장) 비중이 커진다.",
    lessons:[
     { id:"eng-g3-emphread-emph", title:"강조 · 도치 · 간접화법", std:["9영02-05","9영02-10"],
       concept:[
        "**It ~ that 강조**: 강조할 말을 It is/was 와 that 사이에. **It was Mina that** broke the vase. (주어·목적어·부사구 가능, **동사는 불가**) 사람이면 who, 사물이면 which 로 바꿀 수 있다.",
        "**동사 강조 do/does/did** + 동사원형: I **do** like this song. / She **did** call you. 재귀대명사 강조: I made it **myself**.",
        "**부정어 도치** Never/Hardly/Not only 가 앞에 → **조동사 + 주어 + 동사**: Never **have I** seen it. / Here·There·So·Neither 뒤는 **동사 + 주어**: Here **comes** the bus. / So **do** I.",
        "**간접화법(평서문)**: said to → **told + 목적어**, 시제는 **한 단계 과거로**, 대명사·부사(now→then, today→that day) 전환. He said, \"I am busy now.\" → He **told me he was busy then**.",
        "**간접화법(의문·명령)**: 의문문은 **asked** + 의문사/if + **주어 + 동사**(평서 어순). 명령문은 **told/asked + 목적어 + to V**, 부정은 **not to V**."],
       why:"강조·도치는 '보통 어순'을 깨뜨려 듣는 사람의 주의를 끄는 장치다. 부정어가 앞에 나오면 의문문처럼 조동사가 주어 앞으로 가는데, 이것이 어법 문제의 핵심이다. 간접화법은 말한 시점·장소·사람이 전달자 기준으로 바뀌므로 시제·대명사·부사가 함께 움직인다.",
       pitfalls:[
        "It ~ that 으로 동사 강조 불가: It was **broke** that (X). 동사는 do/did 로.",
        "부정어 도치에서 일반동사를 과거형 그대로 둠: Never **I saw** (X) / Never **did I see** ○. 조동사가 시제를 가져가고 동사는 원형. 주어가 대명사면 Here **it comes**(도치 X).",
        "간접화법에서 시제를 안 바꾸거나 now/today 를 그대로 두는 실수. 단 **불변의 진리·현재 습관**은 시제 유지: He said that the sun **rises** in the east."],
       points:["서술형: 밑줄 친 부분을 It ~ that 으로 강조한 문장 쓰기", "어법·배열: Never/Not only 로 시작하는 도치 어순(조동사+주어+동사원형)", "서술형: 직접화법 → 간접화법(said to→told, 시제·대명사·부사 전환, 의문문은 if/의문사+주어+동사)"],
       pattern:["It~that 강조: ① 강조할 말을 빼낸다 → ② It was ___ that → ③ 나머지 문장을 순서대로 붙인다(빼낸 자리는 비워 둔다)", "간접화법 4단계 검산: 전달동사(told/asked) → 접속사(that/if/의문사) → 시제 한 칸 → 대명사·시간부사"],
       memo:"It~that 은 동사 빼고 다 강조, 부정어 앞이면 조동사+주어, 간접화법은 told·시제·대명사·부사 네 가지.",
       quiz:[
        { q:"'Never' 로 시작하도록 바르게 바꾼 것은?  I have never eaten such a spicy dish.", opts:["Never I have eaten such a spicy dish.","Never have I eaten such a spicy dish.","Never had I eaten such a spicy dish.","Never I eaten have such a spicy dish."], a:1, exp:"부정어 도치: Never + 조동사(have) + 주어(I) + p.p. 시제는 원래 문장(현재완료) 유지." },
        { q:"간접화법으로 바르게 바꾼 것은?  She said to me, \"I will visit you tomorrow.\"", opts:["She told me that she will visit me tomorrow.","She said me that she would visit me the next day.","She told me that she would visit me the next day.","She told me that I would visit her the next day."], a:2, exp:"said to → told, will → would, you → me, tomorrow → the next day." },
        { q:"밑줄 친 부분을 강조한 문장으로 알맞은 것은?  Jake lost his wallet on the bus. (on the bus 강조)", opts:["It was on the bus that Jake lost his wallet.","It was Jake that lost his wallet on the bus.","It was his wallet that Jake lost on the bus.","It was lost that Jake his wallet on the bus."], a:0, exp:"부사구 on the bus 를 It was ~ that 사이에 넣고 나머지를 그대로 잇는다." }
       ]},
     { id:"eng-g3-emphread-read", title:"독해 전략(순서·흐름 무관 문장·제목·빈칸) + 조건 영작 서술형", std:["9영01-08","9영02-10"],
       concept:[
        "**글의 순서(A)(B)(C)**: 주어진 글의 **마지막 문장**이 가리키는 것 → 각 단락 **첫 문장**의 단서(대명사 this/they, 연결어 However/Then, the + 앞에 나온 명사)로 사슬을 만든다.",
        "**흐름과 무관한 문장**: 글의 **핵심어**를 잡고, 핵심어는 있지만 **방향이 다른** 문장(일반론·광고·다른 대상)이 정답. 보통 ②~④ 사이에 있다.",
        "**제목**: 요지를 비유·명사구로 압축. 'Why ~?', 'How to ~', 'A ~ B' 꼴이 많다. 글 일부만 다루는 보기와 글보다 넓은 보기는 탈락.",
        "**빈칸(어휘·구)**: 빈칸 문장은 글의 **요지를 재진술**한 경우가 대부분. 요지를 먼저 한 줄로 적고 보기를 대입. 부정어(not/never)가 있으면 반대로 고르는 함정 주의.",
        "**조건 영작 서술형**: ① 단어 수 ② 주어진 표현 사용 ③ 어형 변화 여부를 지키지 않으면 **0점** 처리. 쓰고 나서 조건 → 어순 → 시제 → 수일치 순으로 검산."],
       why:"중3 독해는 교과서 본문 변형에 더해 고1 학력평가형(순서·무관 문장·제목)이 들어오기 시작한다. 이런 문제는 단어를 다 알아도 '글의 뼈대'를 못 잡으면 틀린다. 뼈대는 핵심어·대명사·연결어 세 가지 표지로 드러나므로 표시하며 읽는 습관이 점수를 좌우한다.",
       pitfalls:[
        "순서 문제에서 (A)(B)(C)를 '읽히는 대로' 배열하기. 반드시 대명사·연결어 단서로 앞 문장을 확정한 뒤 다음 단락을 찾는다.",
        "무관 문장에서 핵심어가 들어 있다고 '관련 있다'고 판단. 핵심어가 있어도 글의 주장과 다른 방향이면 무관.",
        "조건 영작에서 주어진 단어를 **그대로** 쓰라고 했는데 변형하거나, 변형하라고 했는데 그대로 쓰는 실수. 조건 문장을 먼저 밑줄 긋는다."],
       points:["학평형: 순서 배열·무관 문장·제목 — 대명사·연결어·핵심어 세 표지", "내신: 본문 변형(어법·어휘 바꿔 틀린 것 찾기) + 빈칸 재진술", "서술형: 조건 영작(단어 수·주어진 표현) + 가정법·분사구문·간접화법 전환형 영작"],
       pattern:["순서 배열: ① 주어진 글 끝 문장의 핵심 명사·사건 표시 → ② 세 단락 첫 문장에서 그것을 받는 대명사/the 명사/연결어 찾기 → ③ 사슬이 끊기면 처음으로 돌아가 다시 잇기", "무관 문장: 각 문장을 '핵심어 + 방향(찬/반/예시)'으로 한 줄 요약 → 방향이 혼자 다른 문장"],
       memo:"순서는 대명사·연결어 사슬, 무관 문장은 핵심어 있어도 방향 다른 것, 영작은 조건부터 검산.",
       quiz:[
        { q:"흐름과 무관한 문장은?  Walking to school has many benefits. ① It gives you exercise before class. ② It helps you wake up and focus. ③ Many schools sell snacks at lunch. ④ It is also good for the environment.", opts:["①","②","③","④"], a:2, exp:"핵심어는 '걸어서 등교하기의 장점'. ③은 간식 판매로 방향이 다르다." },
        { q:"이어질 순서로 알맞은 것은?  Last week my class planted trees in the park. (A) Then we watered them and put up name signs. (B) First, we dug holes and put the young trees in them. (C) Now the park looks greener.", opts:["(A)-(B)-(C)","(B)-(A)-(C)","(C)-(A)-(B)","(B)-(C)-(A)"], a:1, exp:"First(B) → Then(A) → Now(C). 연결어와 them(= the young trees) 사슬." },
        { q:"조건을 모두 지킨 영작은?  (조건: 9단어, unless 와 late 사용 / 뜻: '서두르지 않으면 너는 수업에 늦을 것이다')", opts:["Unless you hurry, you will be late for class.","If you don't hurry, you'll be late.","Unless you don't hurry, you will be late.","Unless you hurry you late for class will."], a:0, exp:"①만 9단어·unless·late·어순·조건절 현재시제를 모두 만족. ②는 unless 없음, ③ 이중 부정, ④ 어순 오류." }
       ]}
    ]}
 ]});
