// 중2-2 영어 (2022 개정 교육과정 첫 적용 학년, 2026학년도) — 2학기 공통 문법 + 독해·서술형 전략
// 성취기준: 2022 개정은 '이해(9영01)·표현(9영02)' 두 영역. 문법은 성취기준이 아니라 [별표 4] 언어 형식이므로
// 가장 가까운 기능 성취기준 코드를 붙였다. 2022 개정 중2 교과서 5종(천재 소영순·이상기, 동아 이병민, 미래엔 문영인, 능률 김기택)
// 의 5~8과 언어 형식을 교차 확인해 단원을 짰다(관계대명사·5형식·간접의문문/접속사·비교/가주어). 수동태·현재완료는
// 대부분 1학기(2~4과)에 나오지만 2학기 내신에 누적 출제되므로 '복습' 레슨으로 넣었다. 영어 예문은 모두 자작.
window.DATA = window.DATA || {}; window.DATA.subjects = window.DATA.subjects || {};
window.DATA.subjects.eng = {
 id:"eng", name:"영어", icon:"🔤", grade:"g22", term:2,
 src:[
  ["2022 개정 영어과 교육과정 해설(KICE 주형미, British Council 교사 웨비나 자료 — 이해/표현 영역·중학교 신설 성취기준)","https://www.britishcouncil.kr/sites/default/files/20230317_webinar1_2022_revised_eng_national_curriculum_hyung_mi_joo.pdf"],
  ["2022 개정 영어과 교육과정 [별표 3] 어휘(교육부 고시 제2022-33호 별책 14 발췌, 경기도교육청)","https://www.goe.go.kr/resource/old/BBSMSTR_000000030136/BBS_202307111028067791.pdf"],
  ["2022 개정 중2 동아(이병민) 단원별 언어 형식","https://englishtutortv.com/%EC%A4%912-%EB%8F%99%EC%95%84-%EC%9D%B4%EB%B3%91%EB%AF%BC-1%EA%B3%BC-2%EA%B3%BC-3%EA%B3%BC-4%EA%B3%BC-5%EA%B3%BC-6%EA%B3%BC-7%EA%B3%BC-8%EA%B3%BC-%EB%8C%80%ED%99%94%EB%AC%B8-%EB%B3%B8%EB%AC%B8-pdf/"],
  ["2022 개정 중2 천재(소영순) 단원별 언어 형식","https://englishtutortv.com/%EC%A4%912-%EC%B2%9C%EC%9E%AC-%EC%86%8C%EC%98%81%EC%88%9C-1%EA%B3%BC-2%EA%B3%BC-3%EA%B3%BC-4%EA%B3%BC-5%EA%B3%BC-6%EA%B3%BC-7%EA%B3%BC-8%EA%B3%BC-%EC%A0%84%EB%8B%A8%EC%9B%90-%EB%8C%80%ED%99%94/"],
  ["2022 개정 중2 미래엔(문영인) 단원별 언어 형식","https://englishtutortv.com/%EC%A4%912-%EB%AF%B8%EB%9E%98%EC%97%94-%EB%AC%B8%EC%98%81%EC%9D%B8-%EC%A0%84%EB%8B%A8%EC%9B%90-%EB%8C%80%ED%99%94%EB%AC%B8-%EB%B3%B8%EB%AC%B8-pdf/"],
  ["2022 개정 중2 능률(김기택) 단원별 언어 형식","https://englishtutortv.com/%EC%A4%912-%EB%8A%A5%EB%A5%A0-%EA%B9%80%EA%B8%B0%ED%83%9D-%EC%A0%84%EB%8B%A8%EC%9B%90-%EB%8C%80%ED%99%94%EB%AC%B8-%EB%B3%B8%EB%AC%B8-pdf/"],
  ["2022 개정 중2 천재(이상기) 단원별 언어 형식","https://englishtutortv.com/%EC%A4%912-%EC%B2%9C%EC%9E%AC-%EC%9D%B4%EC%83%81%EA%B8%B0-1%EA%B3%BC-2%EA%B3%BC-3%EA%B3%BC-4%EA%B3%BC-5%EA%B3%BC-6%EA%B3%BC-7%EA%B3%BC-8%EA%B3%BC-%EC%A0%84%EB%8B%A8%EC%9B%90-%EB%8C%80%ED%99%94/"]
 ],
 units:[

  /* ======================= 1. 관계대명사 ======================= */
  { id:"eng-rel", title:"관계대명사 (who / which / that)", std:["9영02-05","9영01-08"],
    exam:"기말 단골. 알맞은 관계대명사 고르기 + 두 문장을 한 문장으로 합치는 서술형 + 생략 가능한 것 찾기가 세트로 나온다.",
    lessons:[
     { id:"eng-rel-subj", title:"주격 관계대명사", std:["9영02-05"],
       concept:[
        "**관계대명사** = 접속사 + 대명사. 두 문장을 잇고, 앞의 명사(**선행사**)를 꾸민다.",
        "선행사가 사람이면 **who**, 사물·동물이면 **which**, 둘 다 **that**으로 바꿀 수 있다.",
        "**주격**: 관계대명사가 뒤 문장의 주어 자리. 바로 뒤에 **동사**가 온다. The boy **who is singing** is my brother.",
        "관계절의 동사는 **선행사**에 수일치. I have a friend **who lives** in Busan. (friend → lives)",
        "I know a girl. + She can speak three languages. → I know a girl **who can speak** three languages."],
       why:"영어는 명사를 길게 꾸밀 때 뒤에 문장을 통째로 붙인다. 그런데 두 문장에 같은 사람(a girl = she)이 두 번 나오면 하나는 군더더기이므로, 그 대명사를 관계대명사로 바꿔 '연결 고리' 역할을 시킨다. 그래서 관계대명사 뒤에는 주어가 빠진 불완전한 문장이 온다.",
       pitfalls:[
        "관계절 동사를 **문장 전체 주어**가 아니라 선행사에 맞춘다. The books which **are** on the desk **is** mine? → 문장 동사는 books 에 맞춰 **are**.",
        "who 와 **whose**(소유격) 혼동. 뒤에 명사가 바로 오면 whose: a man **whose** car is red.",
        "선행사가 사람인데 which 를 쓰는 실수. 사람 = who/that, 사물 = which/that."],
       points:["어법상 틀린 것: 관계절 동사의 수일치(선행사 단수/복수)", "서술형: 두 문장을 관계대명사로 한 문장 만들기(대명사 지우기 필수)", "학평: 빈칸에 who/which 고르기 — 선행사가 사람인지 먼저 확인"],
       pattern:["관계대명사 문제: ① 선행사 찾기(사람/사물) → ② 뒤 문장에서 빠진 성분(주어/목적어) → ③ 동사는 선행사에 수일치", "두 문장 합치기: 겹치는 명사·대명사에 동그라미 → 둘째 문장의 것을 who/which 로 바꿔 선행사 바로 뒤에 붙인다"],
       memo:"사람 who · 사물 which · 둘 다 that, 주격 뒤엔 동사, 동사는 선행사에 맞춘다.",
       quiz:[
        { q:"빈칸에 알맞은 것은?  I have a dog ___ likes to swim.", opts:["who","which","whose","what"], a:1, exp:"선행사 a dog(동물) + 뒤에 동사 likes → 주격 which (that 도 가능)." },
        { q:"어법상 틀린 부분은?  The students who ①is ②studying in the library ③are ④my classmates.", opts:["①","②","③","④"], a:0, exp:"관계절 동사는 선행사 students(복수)에 맞춰 who **are** studying." },
        { q:"두 문장을 바르게 합친 것은?  I met a woman. / She teaches math.", opts:["I met a woman who she teaches math.","I met a woman which teaches math.","I met a woman who teaches math.","I met a woman whose teaches math."], a:2, exp:"She 를 who 로 바꾸고 지운다. who 뒤에 she 를 남기면 틀림." }
       ]},
     { id:"eng-rel-obj", title:"목적격 관계대명사와 생략", std:["9영02-05"],
       concept:[
        "**목적격**: 관계대명사가 뒤 문장의 목적어 자리. 사람 **who(m)**, 사물 **which**, 둘 다 **that**. 뒤에 **주어+동사**가 온다.",
        "This is the book **which I read** yesterday. (I read the book → the book 이 목적어)",
        "목적격 관계대명사는 **생략 가능**: This is the book I read yesterday. 주격은 생략 불가.",
        "**that**만 쓰는 경우: 선행사가 -thing(everything/something), 최상급, all·the only 일 때. This is the **only** thing **that** I want.",
        "전치사의 목적어: the house **which** she lives **in** = the house **in which** she lives. 단, **in that** 은 안 된다."],
       why:"뒤 문장에서 목적어가 빠져도 '주어+동사'가 남아 있어서 문장이 어디서 시작하는지 알 수 있다. 그래서 목적격은 지워도 뜻이 통하고, 주격을 지우면 동사 두 개가 연달아 나와 문장이 깨진다. 생략 여부는 '뒤에 주어+동사가 바로 오는가'로 판단한다.",
       pitfalls:[
        "목적격 관계절 안에 목적어를 또 쓰는 실수. the movie which I saw **it** (X) → 이미 which 가 목적어.",
        "전치사 뒤에 **that** 금지: the city in **that** I live (X) → in **which**.",
        "'생략할 수 있는 것'을 고를 때 주격을 고르면 오답. 뒤에 **동사**가 바로 오면 주격 → 생략 불가."],
       points:["내신: 관계대명사가 생략된 문장 찾기 / 생략할 수 없는 것 고르기", "서술형: 목적격 관계대명사를 써서 영작(목적어 중복 쓰면 감점)", "학평: 전치사+관계대명사 어법(in which ○ / in that ×)"],
       pattern:["생략 가능? → 관계대명사 바로 뒤가 '주어+동사'면 목적격 → 생략 OK / '동사'면 주격 → 불가", "영작: ① 선행사 → ② 관계대명사 → ③ 남은 문장(목적어는 빼고)"],
       memo:"뒤에 주어+동사면 목적격(생략 OK), 뒤에 동사면 주격(생략 X). 전치사 뒤 that 금지.",
       quiz:[
        { q:"생략할 수 있는 관계대명사가 쓰인 문장은?", opts:["I know the man who lives next door.","The cake that she made was great.","He has a cat which has blue eyes.","This is the bag that is on sale."], a:1, exp:"that 뒤에 she made(주어+동사) → 목적격 → 생략 가능. 나머지는 뒤에 동사 → 주격." },
        { q:"어법상 틀린 것은?", opts:["This is the pen which I lost.","She is the girl that I met at the park.","That is the house in that he was born.","Tell me everything that you know."], a:2, exp:"전치사 in 뒤에는 that 을 쓸 수 없다. in which 로 고친다." },
        { q:"우리말에 맞게 영작할 때 빈칸에 알맞은 것은?  '내가 어제 산 신발은 편하다.' → The shoes ___ are comfortable.", opts:["which I bought them yesterday","I bought yesterday","who I bought yesterday","that bought yesterday"], a:1, exp:"목적격 which/that 생략형. them 을 남기면 목적어 중복, who 는 사람에만." }
       ]}
    ]},

  /* ======================= 2. 5형식 (목적격 보어) ======================= */
  { id:"eng-c5", title:"5형식 — 지각·사역동사와 목적격 보어", std:["9영02-05","9영02-10"],
    exam:"5종 교과서 모두 5~7과에 배치. 목적격 보어 형태(동사원형 / -ing / to부정사 / 형용사) 고르기가 어법 문제의 절반.",
    lessons:[
     { id:"eng-c5-percept", title:"지각동사·사역동사 + 목적어 + 동사원형", std:["9영02-05"],
       concept:[
        "**5형식**: 주어 + 동사 + 목적어 + **목적격 보어(O.C.)**. 보어가 목적어의 상태·동작을 설명한다.",
        "**지각동사** see/watch/hear/feel/notice + 목적어 + **동사원형**(또는 **-ing**). I saw him **cross** the street. / I heard her **singing**.",
        "**사역동사** make/have/let + 목적어 + **동사원형**. Mom **made** me **clean** my room. / **Let** me **go**.",
        "동사원형 = 동작 전체, -ing = 진행 중인 장면 강조. 지각동사만 -ing 가능, 사역동사는 **원형만**.",
        "help 는 둘 다: help + 목적어 + (to) 동사원형. She helped me **(to) carry** the box."],
       why:"'그가 길을 건너는 것을 보았다'에서 him 과 cross 는 주어-동사 관계(he crosses)다. 영어는 이 작은 문장을 목적어 자리에 넣을 때 to 를 떼고 동사원형만 남긴다. 지각·사역동사는 '직접 보고·시키는' 동사라 to 가 끼어들 틈이 없다고 이해하면 된다.",
       pitfalls:[
        "사역동사 뒤에 to부정사: made me **to clean** (X). make/have/let 은 원형만.",
        "**get** 은 사역의 뜻이지만 **to부정사**: get him **to help** me. have 와 혼동 주의.",
        "목적어가 '당하는' 관계면 **p.p.**: I had my hair **cut**. (내 머리가 잘림)"],
       points:["어법: make/let/have + 목적어 + 동사원형 vs. to부정사 고르기", "서술형: 괄호 안 동사를 알맞은 형태로(원형/-ing/p.p.)", "학평: 지각동사 -ing 와 원형 둘 다 맞는 보기 → 틀린 것은 to부정사"],
       pattern:["5형식 어법: ① 동사가 지각/사역인지 확인 → ② 목적어와 보어가 능동(원형·-ing)인지 수동(p.p.)인지 → ③ get·want 는 to"],
       memo:"지각·사역 뒤엔 to 없는 동사원형. 지각은 -ing 도 OK, get 만 to.",
       quiz:[
        { q:"어법상 틀린 것은?", opts:["I saw a cat jump over the wall.","My dad let me use his laptop.","She made us to wait outside.","We heard the birds singing."], a:2, exp:"사역동사 made + 목적어 + 동사원형 → made us wait." },
        { q:"빈칸에 들어갈 수 없는 것은?  I watched the children ___ in the yard.", opts:["play","playing","to play","(둘 다 가능)play/playing"], a:2, exp:"지각동사 watch + 목적어 + 동사원형/-ing. to부정사는 불가." },
        { q:"우리말과 같도록 할 때 알맞은 것은?  '그는 나에게 창문을 열게 했다.'", opts:["He had me open the window.","He had me to open the window.","He had me opening the window.","He had me opened the window."], a:0, exp:"사역동사 have + 목적어 + 동사원형. 내가 여는 것이므로 능동 원형." }
       ]},
     { id:"eng-c5-adj-to", title:"make/keep + 형용사, want/ask/tell + to부정사", std:["9영02-05","9영02-10"],
       concept:[
        "목적격 보어가 **형용사**: make/keep/find/leave + 목적어 + **형용사**. The news made me **happy**. (happily X)",
        "목적격 보어가 **명사**: call/name/elect + 목적어 + 명사. We call him **Captain**.",
        "**to부정사**를 보어로 쓰는 동사: want/ask/tell/advise/allow/expect + 목적어 + **to 동사원형**. She told me **to come** early.",
        "주어가 직접 하면 want **to go**, 남이 하길 바라면 want **him to go**. 목적어 유무로 '누가 하는지'가 달라진다."],
       why:"목적격 보어는 '목적어가 어떤 상태인가'를 말한다. 상태는 형용사가 맡으니 부사를 쓰면 안 된다. 반면 want·tell 은 '앞으로 할 일'을 시키는 동사라서 미래 지향의 to부정사가 보어로 온다. 동사의 뜻이 보어의 형태를 정한다.",
       pitfalls:[
        "make + 목적어 + **부사**: made me **sadly** (X) → sad. 보어 자리는 형용사.",
        "want/tell 뒤 동사원형: told me **clean** (X) → **to clean**. 사역동사가 아니다.",
        "**make** 는 두 가지: make + O + 형용사(…하게 만들다) / make + O + 동사원형(…하도록 시키다). 뒤에 오는 말의 품사로 구별."],
       points:["내신: 보기 중 목적격 보어 형태가 다른 하나 고르기", "서술형: 'A가 B하도록 말했다' 영작 → tell + A + to B", "학평: 형용사/부사 자리 어법(keep the room clean ○ cleanly ×)"],
       pattern:["보어 형태 판단: 동사가 지각·사역 → 원형 / want·ask·tell → to / make·keep·find → 형용사(상태) 순으로 분류 표를 외운다"],
       memo:"make·keep + 형용사(부사 X), want·ask·tell + to부정사, 사역은 원형.",
       quiz:[
        { q:"어법상 틀린 것은?", opts:["The movie made me sleepy.","Keep your hands cleanly.","We named the puppy Max.","I want you to listen carefully."], a:1, exp:"keep + 목적어 + 형용사 → clean. 부사 cleanly 는 보어가 될 수 없다." },
        { q:"빈칸에 알맞은 것은?  The teacher asked us ___ quiet during the test.", opts:["be","being","to be","been"], a:2, exp:"ask + 목적어 + to부정사." },
        { q:"목적격 보어의 형태가 나머지와 다른 하나는?", opts:["She let me borrow her pen.","He made his son wash the car.","I heard someone knock on the door.","Mom told me finish my homework."], a:3, exp:"tell 은 to부정사 보어(to finish)가 와야 한다. 나머지는 동사원형이 맞다." }
       ]}
    ]},

  /* ======================= 3. 간접의문문·접속사 ======================= */
  { id:"eng-conj", title:"간접의문문과 접속사 (so~that / although / if / that)", std:["9영02-05","9영02-06"],
    exam:"어순 배열 서술형의 단골. 간접의문문 '의문사+주어+동사' 어순과 so~that / too~to 전환, although vs. because 고르기.",
    lessons:[
     { id:"eng-conj-indq", title:"간접의문문과 의문사 + to부정사", std:["9영02-05"],
       concept:[
        "**간접의문문**: 의문문이 다른 문장 안에 들어가면 **의문사 + 주어 + 동사** 어순(평서문 어순). I don't know **where he lives**.",
        "의문사가 없으면 **if/whether** + 주어 + 동사. Tell me **if she is** coming.",
        "do/does/did 는 사라지고 동사에 시제·수를 넘긴다. Where does she live? → I wonder where she **lives**.",
        "think/believe/guess 뒤에서는 의문사가 **문장 맨 앞**으로. **What** do you think he wants?",
        "**의문사 + to부정사** = 의문사 + 주어 + should + 동사. I don't know **what to do** = what I should do."],
       why:"문장 안에 들어간 의문문은 더 이상 '질문'이 아니라 '명사 덩어리'(목적어)다. 질문이 아니므로 주어·동사를 뒤집을 이유가 없고, 조동사 do 도 필요 없다. 의문사+to부정사는 그 덩어리를 더 짧게 줄인 형태다.",
       pitfalls:[
        "어순 뒤집기: I wonder where **is he** (X) → where **he is**.",
        "do 남기기: I don't know what **does** she **want** (X) → what she **wants**.",
        "why + to부정사는 쓰지 않는다. how/what/where/when + to 만 가능."],
       points:["서술형: 두 문장을 간접의문문으로 합쳐 쓰기(어순·동사 변화)", "내신: 어순 배열 — 의문사 뒤에 주어가 오는지 확인", "학평: Do you know ~? vs. What do you think ~? 의문사 위치"],
       pattern:["간접의문문 변환: ① 의문사 남기기(없으면 if) → ② 주어+동사 평서문 어순 → ③ do 제거하고 시제·3인칭 -s 동사에 반영"],
       memo:"간접의문문은 '의문사 + 주어 + 동사', do 는 사라지고 think 류는 의문사가 맨 앞.",
       quiz:[
        { q:"어법상 옳은 것은?", opts:["I don't know where does he work.","I don't know where he works.","I don't know where works he.","I don't know does he work where."], a:1, exp:"간접의문문 어순: 의문사 + 주어 + 동사, do 는 없어지고 works 에 -s." },
        { q:"두 문장을 하나로 바르게 합친 것은?  Do you think? + Who is the winner?", opts:["Do you think who is the winner?","Do you think who the winner is?","Who do you think the winner is?","Who do you think is the winner?"], a:2, exp:"think 류 동사는 의문사가 문장 맨 앞 + 주어·동사 평서문 어순(the winner is)." },
        { q:"같은 뜻이 되도록 할 때 빈칸은?  I don't know what to say. = I don't know what I ___ say.", opts:["can","should","will","did"], a:1, exp:"의문사 + to부정사 = 의문사 + 주어 + should + 동사원형." }
       ]},
     { id:"eng-conj-sub", title:"so~that / although / if / that 절", std:["9영02-05","9영02-06"],
       concept:[
        "**so + 형용사/부사 + that + 주어 + 동사**: 너무 …해서 ~하다. It was **so** cold **that** we stayed home.",
        "so~that 과 **too~to**: too + 형 + to부정사(…하기엔 너무 -해서 못 하다). so cold that we **couldn't** go = **too** cold **to** go.",
        "**although/though** + 주어 + 동사: 비록 …지만(양보). **Although** it rained, we had fun. = **but** 과 뜻은 같지만 함께 쓰지 않는다.",
        "**if** 조건절: 현재시제가 미래를 대신. If it **rains** tomorrow, I **will** stay home. (will rain X)",
        "**that** 명사절: I think **(that)** he is right. 목적어 that 은 생략 가능. 주어 자리면 It is true **that** ~."],
       why:"접속사는 두 문장의 '관계'를 이름 붙이는 말이다. so~that 은 원인→결과, although 는 반대, if 는 조건. 관계가 다르면 쓰는 접속사도 다르다. if 절의 현재시제는 '조건은 이미 정해진 틀'이라 미래로 적지 않는 영어의 습관이다.",
       pitfalls:[
        "**so that**(…하기 위해, 목적) 과 **so ~ that**(너무 …해서) 구별. so 와 that 사이에 형용사가 끼면 결과.",
        "although 와 but 을 한 문장에 둘 다 쓰는 실수. Although it rained, **but** we went (X).",
        "if 절에 will: If it **will** rain (X). 단, '…할지 안 할지'의 명사절 if 는 will 가능: I don't know if it **will** rain."],
       points:["서술형: so~that ↔ too~to 전환(부정의 not 이 사라지는지 확인)", "내신: 빈칸에 although / because / if 중 문맥에 맞는 것", "학평: 어법 — 조건 if 절의 현재시제"],
       pattern:["접속사 고르기: 앞뒤 문장의 관계를 '그래서(so~that)/그런데(although)/만약(if)' 중 하나로 우리말로 먼저 번역한다", "so~that → too~to: 형용사 그대로, that 절의 주어가 같으면 지우고 can't → to"],
       memo:"so 형 that 결과, too 형 to 불가능, although = 반대(but 과 같이 X), if 조건절은 현재시제.",
       quiz:[
        { q:"빈칸에 알맞은 것은?  ___ she was tired, she finished the report.", opts:["Because","Although","If","So"], a:1, exp:"'피곤했지만 끝냈다' → 반대 관계 → although." },
        { q:"같은 뜻이 되도록 할 때 알맞은 것은?  The box was so heavy that I couldn't lift it.", opts:["The box was too heavy to lift.","The box was too heavy to lift it.","The box was heavy enough to lift.","The box was so heavy to lift."], a:0, exp:"too + 형 + to부정사. 목적어 it 은 주어(the box)와 같으므로 쓰지 않는다." },
        { q:"어법상 틀린 것은?", opts:["If you hurry, you will catch the bus.","I hope that you like the gift.","If it will snow, we will build a snowman.","It was so dark that I couldn't see."], a:2, exp:"조건의 if 절은 현재시제가 미래를 대신 → If it snows." }
       ]}
    ]},

  /* ======================= 4. 비교·가주어 + 1학기 시제 복습 ======================= */
  { id:"eng-cmp", title:"비교·가주어 It, 그리고 수동태·현재완료 복습", std:["9영02-05","9영02-10"],
    exam:"비교 구문은 서술형(as~as, 배수, the 비교급) 단골. 수동태·현재완료는 1학기 범위지만 2학기 어법 문제에 누적 출제된다.",
    lessons:[
     { id:"eng-cmp-comp", title:"비교급·최상급·as~as·배수 표현", std:["9영02-05"],
       concept:[
        "**원급 비교** as + 원급 + as: Tom is **as tall as** his father. 부정은 not as(so) ~ as.",
        "**비교급** + than: Seoul is **bigger than** Busan. 강조는 **much/even/far/a lot** + 비교급 (very X).",
        "**최상급** the + 최상급 + in(장소·집단) / of(복수 명사): the tallest **in** my class / **of** all the students.",
        "**배수**: 배수사 + as 원급 as = 배수사 + 비교급 than. This bag is **twice as heavy as** mine. three times **bigger than**.",
        "**the 비교급, the 비교급**: …할수록 더 ~하다. **The more** you practice, **the better** you get."],
       why:"as~as 는 '같은 자'로 재는 것이라 형용사를 바꾸지 않고, 비교급은 둘을 저울에 올리므로 than 이 필요하다. 최상급은 '범위 안에서 1등'이므로 범위를 in/of 로 꼭 밝힌다. 세 표현은 서로 바꿔 쓸 수 있어 서술형 전환 문제로 자주 나온다.",
       pitfalls:[
        "as 와 as 사이에 **비교급**을 넣는 실수: as taller as (X) → as tall as.",
        "비교급 강조에 very: **very** bigger (X) → **much** bigger.",
        "최상급 전환: A is the tallest = No other student is **taller than** A = A is taller than **any other** student(단수)."],
       points:["서술형: 배수 표현 as~as ↔ 비교급 than 바꿔 쓰기", "내신: 최상급 뒤 in/of 구별, 비교급 강조 부사 고르기", "학평: 'the 비교급, the 비교급' 어순 배열"],
       pattern:["비교 영작: ① 몇 개를 비교하는가(2개 → 비교급, 3개 이상 → 최상급) → ② 같다/다르다(as~as / than) → ③ 강조·배수 붙이기"],
       memo:"as 원급 as · 비교급 than(강조 much) · the 최상급 in/of · 배수사는 as 앞.",
       quiz:[
        { q:"어법상 틀린 것은?", opts:["This river is much longer than that one.","She runs as fast as her brother.","He is the youngest of the three.","My bag is very heavier than yours."], a:3, exp:"비교급 강조는 much/even/far/a lot. very 는 원급에만." },
        { q:"같은 뜻이 되도록 할 때 알맞은 것은?  This rope is three times as long as that one.", opts:["This rope is three times longer than that one.","This rope is longer three times than that one.","This rope is three times as longer as that one.","That one is three times longer than this rope."], a:0, exp:"배수사 + as 원급 as = 배수사 + 비교급 than." },
        { q:"우리말과 같도록 배열한 것은?  '더 많이 읽을수록 더 많이 안다.'", opts:["The more you read, the more you know.","More you read, more you know.","The most you read, the most you know.","The more read you, the more know you."], a:0, exp:"the 비교급 + 주어 + 동사, the 비교급 + 주어 + 동사." }
       ]},
     { id:"eng-cmp-it", title:"가주어 It ~ to부정사·동명사 목적어", std:["9영02-05","9영02-10"],
       concept:[
        "**가주어 It**: to부정사 주어가 길면 뒤로 보내고 It 을 앞에. **It** is hard **to learn** Chinese. (= To learn Chinese is hard.)",
        "의미상 주어 **for + 목적격**: It is easy **for me** to swim. 사람 성격 형용사(kind/nice/foolish)는 **of**.",
        "**to부정사만** 목적어: want/hope/plan/decide/promise + **to V**. I decided **to join** the club.",
        "**동명사만** 목적어: enjoy/finish/mind/avoid/keep/give up + **-ing**. She enjoys **swimming**.",
        "둘 다 뜻이 다른 동사: remember/forget **to V**(앞으로 할 일) vs. **-ing**(이미 한 일). I forgot **to lock** the door(안 잠금)."],
       why:"영어는 머리가 무거운 문장을 싫어해 긴 주어를 뒤로 보내고, 빈 주어 자리에 뜻 없는 It 을 세운다. 목적어 형태는 동사의 성격이 정한다. want·plan 처럼 '앞일'을 보는 동사는 to(→ 방향), enjoy·finish 처럼 '하고 있는 일'을 다루는 동사는 -ing 를 데려온다.",
       pitfalls:[
        "가주어 It 을 '그것'으로 해석하는 실수. 뒤의 to부정사가 진짜 주어.",
        "enjoy to swim (X), want swimming (X). 동사별 목적어 형태 암기 필수.",
        "stop **to V**(…하려고 멈추다) ≠ stop **-ing**(…하기를 멈추다)."],
       points:["어법: It ~ to 구문에서 for/of 선택(성격 형용사면 of)", "내신: 목적어 형태가 틀린 동사 찾기(enjoy/finish/want/decide)", "서술형: 'A가 B하는 것은 어렵다' → It is hard for A to B"],
       pattern:["It 이 보이면 ① 뒤에 to부정사/that 절이 있는지 확인 → 있으면 가주어 ② 형용사가 사람 성격이면 of, 아니면 for", "목적어 형태: 동사를 '미래형(to)/진행형(-ing)' 두 묶음으로 나눠 외우고 remember·forget·stop 만 따로"],
       memo:"It is 형 (for 사람) to V. want·plan·decide → to, enjoy·finish·mind → -ing.",
       quiz:[
        { q:"어법상 틀린 것은?", opts:["It is important to eat breakfast.","It was nice of you to help me.","She finished to write the essay.","He gave up eating fast food."], a:2, exp:"finish 는 동명사만 목적어로 → finished writing." },
        { q:"빈칸에 알맞은 것은?  It is difficult ___ children to sit still for an hour.", opts:["of","for","to","with"], a:1, exp:"to부정사의 의미상 주어는 for + 목적격. difficult 는 성격 형용사가 아니므로 of 불가." },
        { q:"'문 잠그는 것을 잊어서 문이 열려 있었다'의 뜻이 되는 것은?", opts:["I forgot locking the door.","I forgot to lock the door.","I forgot lock the door.","I forgot locked the door."], a:1, exp:"forget + to V = 할 일을 잊다(아직 안 함). forget + -ing = 한 일을 잊다." }
       ]},
     { id:"eng-cmp-review", title:"수동태·현재완료 복습 (1학기 핵심, 2학기 누적)", std:["9영02-05","9영02-10"],
       concept:[
        "**수동태** be + **p.p.** (+ by 행위자). The window **was broken** by Tom. 시제는 be 동사가 맡는다: is/was/will be + p.p.",
        "by 이외의 전치사: be interested **in**, be known **to**, be covered **with**, be made **of**(재료 보임)/**from**(재료 변함).",
        "**현재완료** have/has + **p.p.** — 경험(ever/never/before) · 계속(**since/for**) · 완료(just/already/yet) · 결과.",
        "I **have lived** here **for** 5 years / **since** 2021. (for + 기간, since + 시작점)",
        "현재완료 vs. 과거: **yesterday / ago / last ~ / in 2020** 같은 특정 과거 시점 부사는 **과거시제**만."],
       why:"수동태는 '누가 했나'보다 '무엇이 당했나'를 앞세우는 말이다. 현재완료는 과거의 일이 지금까지 이어지거나 지금 영향을 준다는 '현재' 시제다. 그래서 과거 한 시점(yesterday)만 가리키는 부사와는 함께 쓸 수 없다.",
       pitfalls:[
        "수동태에서 p.p. 대신 과거형: was **broke** (X) → was **broken**. 불규칙 p.p. 암기.",
        "have gone to(가고 없다) vs. have been to(가 본 적 있다). He **has gone to** Paris 는 '지금 없음'.",
        "자동사(happen, appear, arrive)는 수동태 불가: The accident **was happened** (X)."],
       points:["어법: 수동태 be 동사의 시제·수일치(were + p.p.)", "내신: 현재완료와 ago/yesterday 가 같이 쓰인 틀린 문장 찾기", "서술형: 능동 ↔ 수동 전환(목적어 → 주어, 동사 시제 유지, by + 목적격)"],
       pattern:["능동→수동: ① 목적어를 주어로 → ② be 를 원래 시제·새 주어 수에 맞게 → ③ p.p. → ④ by + 목적격(대명사 주의)", "현재완료 용법 판별: since/for → 계속, ever/never → 경험, just/already/yet → 완료"],
       memo:"수동태 be+p.p., 현재완료 have+p.p. — ago·yesterday 보이면 현재완료 아니고 과거!",
       quiz:[
        { q:"어법상 틀린 것은?", opts:["The letters were written by my aunt.","I have known her since 2020.","She has visited London two years ago.","This cake was made by my mom."], a:2, exp:"two years ago 는 특정 과거 시점 → 과거시제 visited." },
        { q:"능동태를 수동태로 바르게 바꾼 것은?  Many people love this song.", opts:["This song is loved by many people.","This song was loved by many people.","This song loves by many people.","This song is love by many people."], a:0, exp:"현재시제 유지 → is + loved + by many people." },
        { q:"빈칸에 알맞은 것은?  We have been friends ___ ten years.", opts:["since","for","from","during"], a:1, exp:"기간(ten years) 앞에는 for, 시작 시점 앞에는 since." }
       ]}
    ]},

  /* ======================= 5. 독해·서술형 전략 ======================= */
  { id:"eng-read", title:"독해·서술형 전략", std:["9영01-08","9영02-10"],
    exam:"내신 독해는 교과서 본문 변형(제목·요지·빈칸·순서) + 서술형 영작. 서술형은 어순·시제·수일치 세 가지로 감점된다.",
    lessons:[
     { id:"eng-read-strategy", title:"주제·요지·빈칸 추론과 영작 채점 포인트", std:["9영01-08","9영02-10"],
       concept:[
        "**주제·요지**: 첫 문장과 마지막 문장, 그리고 **반복되는 단어**를 잡는다. 글쓴이의 '주장'은 should/must/important/need 가 있는 문장에 있다.",
        "**제목**: 요지를 짧게 압축한 것. 너무 넓거나(Animals) 너무 좁은(A Dog Named Max) 보기는 오답.",
        "**빈칸 추론**: 빈칸 앞뒤의 **연결어**(However=반대, For example=예시, Therefore=결과)를 보고 흐름을 정한 뒤 보기를 넣어 읽는다.",
        "**문장 순서·삽입**: 대명사(it/they/this)와 연결어가 가리키는 앞 문장을 찾으면 순서가 정해진다.",
        "**영작 서술형 채점 3대 포인트**: ① **어순**(주어+동사+목적어, 간접의문문·5형식) ② **시제**(ago→과거, since→현재완료) ③ **수일치**(선행사·주어 단복수)."],
       why:"영어 글은 '주장 → 근거·예시 → 재진술' 구조가 많아 처음과 끝에 핵심이 몰린다. 연결어는 글쓴이가 길을 알려 주는 표지판이라 빈칸·순서 문제의 열쇠다. 서술형은 뜻이 통해도 어순·시제·수일치 중 하나만 틀리면 부분 감점이므로 쓰고 나서 세 가지를 순서대로 검사한다.",
       pitfalls:[
        "요지와 '세부 사실'을 혼동. 본문에 나온 말이라도 글 전체를 덮지 못하면 요지가 아니다.",
        "빈칸 문제에서 보기 단어가 본문에 '그대로' 있다고 고르기 — 반대 뜻이 들어가는 However 뒤 빈칸이 함정.",
        "영작에서 우리말 순서대로 쓰기: '나는 그가 어디 사는지 안다' → I know where **he lives**(where lives he X)."],
       points:["내신: 교과서 본문 변형 — 요지·제목·빈칸·문장 순서 세트로 출제", "서술형: 조건 영작(단어 수·주어진 표현 사용) — 조건 하나라도 어기면 0점 처리하는 학교가 많다", "학평: 연결어 빈칸(However/Therefore/For example), 글의 목적·주제"],
       pattern:["독해 순서: ① 첫·끝 문장 읽기 → ② 반복어·연결어에 표시 → ③ 문제 유형별로 필요한 곳만 정독", "영작 검산: 쓰고 나서 '동사 찾기 → 주어와 수일치 → 시제 부사 확인 → 태(능동/수동) → 어순' 5초 체크"],
       memo:"요지는 처음·끝·반복어, 빈칸은 연결어, 영작은 어순·시제·수일치 순으로 검산.",
       quiz:[
        { q:"다음 글의 요지로 가장 알맞은 것은?  Many students study late at night. However, sleep helps the brain remember what we learned. So, getting enough sleep is a smart way to study.", opts:["Late-night study is the best way to learn.","Sleep is important for remembering what we learn.","Students should drink coffee at night.","The brain works best at night."], a:1, exp:"However 뒤와 마지막 So 문장에 주장이 있다: 잠이 기억을 돕는다." },
        { q:"빈칸에 가장 알맞은 것은?  I planned to go hiking on Saturday. ___, it rained all day, so I stayed home and read a book.", opts:["For example","However","Therefore","In addition"], a:1, exp:"계획(등산)과 반대 결과(집에 있음) → 역접 However." },
        { q:"서술형 영작의 감점 요소가 없는 문장은?  (조건: '내 남동생이 그린 그림'을 관계대명사로)", opts:["the picture which my brother drew","the picture which my brother drew it","the picture who my brother drew","the picture which my brother draw"], a:0, exp:"② 목적어 중복(it) ③ 사람 아닌데 who ④ 시제(과거 drew) 감점. ①만 어순·시제·수일치 모두 맞다." }
       ]}
    ]}
 ]
};
