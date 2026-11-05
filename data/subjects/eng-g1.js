// 영어 중1 (1학기 m11 · 2학기 m12) — 2022 개정 교육과정(교육부 고시 제2022-33호 별책 14) 기준.
// 출처·추정 사항:
//  - 성취기준 코드·문장은 교육부 고시 2022 개정 영어과 교육과정 원문(공개 데이터셋 korean-secondary-learning-map-mcp)에서 그대로 확인:
//    [9영01-02] 친숙한 주제에 관한 담화나 글에서 세부 정보를 파악한다 / [9영01-03] 담화나 글의 중심 내용을 파악한다 /
//    [9영01-04] 일이나 사건의 논리적 관계를 파악한다 / [9영02-02] 대상이나 인물의 감정을 묘사한다 / [9영02-03] 사실적 정보를 설명한다 /
//    [9영02-04] 경험이나 계획을 설명한다 / [9영02-06] 자신의 의견을 주장한다 / [9영02-08] 간단한 일기·편지·이메일 등의 글을 쓴다 /
//    [9영02-10] 적절한 전략을 활용하여 상황이나 목적에 맞게 말하거나 쓴다.
//  - 2022 개정 중학교 영어 성취기준은 '이해(9영01)·표현(9영02)' 기능 중심이고 문법은 [별표 4] 언어 형식이므로, 각 차시에는
//    그 문법을 가장 직접 쓰는 기능 성취기준을 붙였다(be동사·일반동사 현재 → 사실적 정보 설명 9영02-03, 과거·미래 → 경험·계획 9영02-04 등).
//  - '추정': 단원 배치(1학기 be동사·일반동사·의문문·명령문 / 2학기 진행·과거·미래·조동사·형용사·부사·독해)는 2022 개정 중1 교과서
//    (2025 발행) 공통 문법 순서를 바탕으로 한 추정이며, 출판사에 따라 순서가 다를 수 있다. 성취기준 코드 단위로 쓴다.
//  - 영어 예문·지문·퀴즈는 모두 자작. 웹 조사 없이 작성.
window.DATA = window.DATA || {}; window.DATA.subjectsExtra = window.DATA.subjectsExtra || [];
window.DATA.subjectsExtra.push({ sid:"eng", grade:"m11",
 src:[
  ["교육부 고시 2022 개정 영어과 교육과정 성취기준(공개 데이터셋)","https://www.npmjs.com/package/korean-secondary-learning-map-mcp"]
 ],
 units:[

  /* ======================= 1학기 1. be동사·일반동사 현재 ======================= */
  { id:"eng-g1-verb", grade:"m11", title:"영어 1 · be동사와 일반동사의 현재", std:["9영02-03","9영02-02"],
    exam:"중1 1학기 중간고사의 뼈대. 주어에 맞는 be동사(am/are/is) 고르기, 3인칭 단수 -s/-es, don't/doesn't 부정문·Do/Does 의문문 전환 서술형이 매년 나온다.",
    lessons:[
     { id:"eng-g1-verb-be", title:"be동사 현재(am/are/is) · 부정문·의문문", std:["9영02-03","9영02-02"],
       concept:[
        "**be동사** = '…이다, …에 있다'. 주어에 따라 **I am / You are / He·She·It is / We·They are**. 명사 주어는 단수면 is, 복수면 are. My brother **is** tall. / The books **are** on the desk.",
        "**축약**: I'm, You're, He's, She's, It's, We're, They're. **It's**(= It is)와 **its**(그것의)는 다른 말.",
        "**부정문**: be동사 뒤에 **not**. She **is not**(isn't) busy. / They **are not**(aren't) here. **am not** 은 줄여 쓰지 않는다(I'm not ○, amn't 없음).",
        "**의문문**: be동사를 **주어 앞**으로. **Is she** a nurse? — Yes, she **is**. / No, she **isn't**. 대답의 주어는 **대명사**로 바꾼다(Is Tom …? → Yes, **he** is).",
        "**be동사 뒤**에는 명사(직업·신분)·형용사(상태·감정)·장소(전치사구)가 온다. He is **a student** / **happy** / **in the room**."],
       why:"영어는 '나는 학생이다'처럼 동작이 없는 문장에도 동사가 꼭 있어야 하는데, 그 자리를 채우는 것이 be동사다. 주어에 따라 모양이 바뀌는 유일한 현재 동사라서 가장 먼저 배운다. 부정·의문을 be동사 자체로 만드는 규칙은 뒤에 배울 진행형·수동태에도 그대로 이어진다.",
       pitfalls:[
        "주어가 길면 be동사를 잘못 고름: **My friends** is (X) → **are**. 주어의 핵심 명사(friends)가 단수인지 복수인지 본다.",
        "be동사와 일반동사를 같이 씀: I **am like** pizza (X) → I **like** pizza. '좋아하다'는 동작이므로 be동사가 필요 없다.",
        "의문문 대답에서 주어를 그대로 둠: Is your sister tall? — Yes, **your sister** is (X) → Yes, **she** is."],
       points:["어법: 주어에 맞는 be동사(am/are/is) 빈칸 — 복수 명사·and 로 연결된 주어는 are", "서술형: 긍정문 → 부정문·의문문 전환(not 위치, be동사 앞으로)", "내신: 의문문의 대답 짝 고르기(대명사·be동사 일치, isn't/aren't)"],
       pattern:["be동사 고르기: ① 주어 찾기 → ② 대명사로 바꿔 보기(My mom → she, Tom and I → we) → ③ I-am / you·복수-are / 나머지 단수-is", "의문문 만들기: be동사를 맨 앞으로 옮기고 물음표. 대답은 Yes, 대명사 + be / No, 대명사 + be + not"],
       memo:"I am / You are / 단수 is / 복수 are. 부정은 be + not, 의문은 be 를 주어 앞으로.",
       quiz:[
        { q:"빈칸에 알맞은 것은?  My cousins ___ in Busan now.", opts:["am","is","are","be"], a:2, exp:"주어 My cousins 는 복수(= they) → are." },
        { q:"어법상 틀린 것은?", opts:["I'm not hungry.","She isn't a teacher.","Tom and I are classmates.","It's tail is long."], a:3, exp:"'그것의 꼬리'는 소유격 **Its** tail. It's 는 It is 의 축약." },
        { q:"대화의 빈칸에 알맞은 것은?  A: Is your brother at home?  B: ___", opts:["Yes, he is.","Yes, your brother is.","No, he not.","Yes, is he."], a:0, exp:"대답의 주어는 대명사 he, be동사 is. No 는 No, he isn't." }
       ]},
     { id:"eng-g1-verb-do", title:"일반동사 현재 · 3인칭 단수 · do/does 부정문·의문문", std:["9영02-03"],
       concept:[
        "**일반동사**: be동사 빼고 동작·상태를 나타내는 모든 동사(like, play, have, go …). 현재시제는 **반복되는 습관·사실**을 말한다. I **play** soccer on Sundays.",
        "**3인칭 단수 현재(3단현)**: 주어가 he/she/it(또는 단수 명사)이면 동사에 **-s/-es**. She **plays**. / He **watches** TV. / It **flies**. 예외: **have → has**, **go → goes**, **do → does**.",
        "-es 를 붙이는 동사: **-s, -sh, -ch, -x, -o** 로 끝날 때(pass**es**, wash**es**, teach**es**, fix**es**, go**es**). **자음 + y** 는 y → **ies**(study → stud**ies**), 모음 + y 는 그냥 -s(play**s**).",
        "**부정문**: **don't / doesn't + 동사원형**. I **don't like** carrots. / He **doesn't like** carrots. (doesn't 뒤는 원형 like, likes ×)",
        "**의문문**: **Do / Does + 주어 + 동사원형?** **Does** she **play** the piano? — Yes, she **does**. / No, she **doesn't**."],
       why:"be동사는 스스로 부정·의문을 만들지만 일반동사는 그럴 수 없어 조동사 do 가 대신 나선다. 3인칭 단수의 -s 가 do 로 옮겨 가 does 가 되므로 동사는 원형으로 돌아간다. '-s 는 한 문장에 한 번'이라고 이해하면 doesn't likes 같은 실수가 사라진다.",
       pitfalls:[
        "does/doesn't 뒤에 -s 를 또 붙임: Does he **likes** (X) → Does he **like**. -s 는 does 가 이미 가져갔다.",
        "have 의 3단현: She **haves** (X) → She **has**. 부정은 She **doesn't have**(hasn't ×).",
        "주어가 복수 명사인데 -s 붙임: My parents **works** (X) → **work**. 주어가 he/she/it 으로 바꿀 수 있을 때만 -s."],
       points:["어법: 3인칭 단수 동사 변화(-s/-es/-ies, has/goes/does) 쓰기", "서술형: 긍정문 → don't/doesn't 부정문, Do/Does 의문문 전환(동사원형 유지)", "내신: be동사 문장과 일반동사 문장의 의문문 구별(Is she …? vs. Does she …?)"],
       pattern:["동사 형태 결정 3단계: ① 주어를 대명사로 바꾼다 → ② he/she/it 이면 -s/-es → ③ 문장에 do/does/don't/doesn't 가 있으면 동사는 원형", "의문문·부정문: 문장에 be동사가 있으면 be 를 쓰고, 없으면 Do/Does(don't/doesn't) + 원형"],
       memo:"he/she/it 는 -s(have→has, go→goes). don't/doesn't·Do/Does 뒤는 동사원형 — -s 는 한 문장에 한 번.",
       quiz:[
        { q:"빈칸에 알맞은 것은?  My sister ___ to school by bus.", opts:["go","gos","goes","going"], a:2, exp:"주어 My sister(= she) → 3단현. go 는 -o 로 끝나므로 -es → goes." },
        { q:"어법상 틀린 것은?", opts:["Does your dad cook well?","She doesn't has a pet.","They don't eat meat.","He studies math every day."], a:1, exp:"doesn't 뒤는 동사원형 → doesn't **have**." },
        { q:"의문문으로 바르게 바꾼 것은?  Jenny likes K-pop.", opts:["Is Jenny like K-pop?","Do Jenny likes K-pop?","Does Jenny likes K-pop?","Does Jenny like K-pop?"], a:3, exp:"일반동사 + 3인칭 단수 주어 → Does + 주어 + 동사원형." }
       ]}
    ]},

  /* ======================= 1학기 2. 의문사·명령문·There is ======================= */
  { id:"eng-g1-ask", grade:"m11", title:"영어 1 · 의문사 의문문·명령문·There is", std:["9영02-03","9영02-10","9영01-02"],
    exam:"1학기 중간·기말 모두. 대답을 보고 알맞은 의문사 고르기, 명령문·Let's 전환, There is/are 수일치 빈칸이 단골. 대화문 완성 서술형에 의문사 의문문이 자주 쓰인다.",
    lessons:[
     { id:"eng-g1-ask-wh", title:"의문사 의문문(what·who·where·when·why·how)", std:["9영02-03","9영01-02"],
       concept:[
        "**의문사**: **what**(무엇) **who**(누구) **where**(어디) **when**(언제) **why**(왜) **how**(어떻게). 의문사는 **문장 맨 앞**, 그 뒤는 보통 의문문 어순. **Where** is my bag? / **What** do you want?",
        "be동사: **의문사 + be + 주어?** / 일반동사: **의문사 + do/does + 주어 + 동사원형?** **When does** the class **start**?",
        "의문사 의문문은 **Yes/No 로 대답하지 않는다**. Where is he? — **He is in the library.**(Yes, he is ×)",
        "**how + 형용사/부사**: how old(나이), how many + **복수 명사**(수), how much(양·가격), how often(빈도), how long(기간). **How many** books do you have?",
        "**what + 명사 / which + 명사**: **What** color do you like? / **Which** bus goes downtown?(정해진 것 중 어느). **whose** + 명사: **Whose** bike is this?"],
       why:"Yes/No 의문문은 '그런가?'를 묻지만, 의문사 의문문은 '무엇·누구·어디'라는 빈 정보를 묻는다. 그 빈 자리의 말을 문장 맨 앞으로 꺼내 온 것이 의문사이므로 나머지 부분은 평소 의문문 어순을 그대로 지킨다. 대답을 보고 의문사를 고르는 문제는 '대답이 어떤 정보인가'를 묻는 것이다.",
       pitfalls:[
        "의문사 뒤 어순을 평서문으로 둠: Where **you are** going? (X) → Where **are you** going?",
        "주어를 묻는 who/what 은 **do 를 쓰지 않는다**: Who **does** teach English? (X) → Who **teaches** English? (who 가 주어, 단수 취급)",
        "how many 뒤 단수 명사: How many **book** (X) → **books**. how much 는 셀 수 없는 명사(water, money)."],
       points:["내신: 대답을 보고 알맞은 의문사 고르기(장소→where, 이유→why, 시간→when)", "어법: 의문사 뒤 어순(be/do + 주어), 주어 의문문 who + 동사-s", "서술형: how many/much/old/long 중 알맞은 것 넣어 대화 완성"],
       pattern:["의문사 고르기: 대답의 핵심 정보에 밑줄 → 장소·시간·사람·이유·방법 중 무엇인가 → 의문사 선택 → 어순 확인", "의문문 만들기: ① 평서문에서 모르는 부분을 의문사로 바꾸고 ② 맨 앞으로 ③ 나머지는 be 또는 do/does 의문문 어순"],
       memo:"의문사 + be/do + 주어. 대답은 Yes/No 가 아니라 정보. who 가 주어면 do 없이 동사-s.",
       quiz:[
        { q:"대화의 빈칸에 알맞은 것은?  A: ___ do you go to the gym?  B: Three times a week.", opts:["How long","How often","How many","When"], a:1, exp:"'일주일에 세 번' = 빈도 → How often." },
        { q:"어법상 틀린 것은?", opts:["Where does she live?","What time is it now?","Who wants more juice?","Why you are so tired?"], a:3, exp:"의문사 뒤 be동사 의문문 어순 → Why **are you** so tired?" },
        { q:"밑줄 친 부분을 묻는 의문문은?  Ms. Park teaches science in Room 3. (Ms. Park 을 물을 때)", opts:["Who does teach science in Room 3?","Who teaches science in Room 3?","What does Ms. Park teach?","Where does Ms. Park teach science?"], a:1, exp:"주어를 묻는 who 는 do/does 없이 동사에 -s 를 붙인다." }
       ]},
     { id:"eng-g1-ask-imp", title:"명령문·Let's · There is/are", std:["9영02-10","9영02-03"],
       concept:[
        "**명령문**: 주어(You) 없이 **동사원형**으로 시작. **Open** the window. / **Be** quiet.(be동사 명령은 Be). 공손하게는 **Please** 를 앞이나 뒤에.",
        "**부정 명령문**: **Don't + 동사원형**. **Don't run** in the hall. / **Don't be** late. (Not run ×, Don't be ○)",
        "**Let's + 동사원형**: '…하자'(제안). **Let's go** out. 부정은 **Let's not** + 원형. 대답은 Okay. / Sounds good. / Sorry, I can't.",
        "**There is + 단수·셀 수 없는 명사 / There are + 복수 명사**: '…이 있다'. **There is** a cat on the sofa. / **There are** two cats. 이때 **there** 는 '거기'가 아니라 문장을 여는 말.",
        "There is 의 부정·의문: There **isn't**/**aren't** … / **Is there** a bank near here? — Yes, there **is**. 수는 **뒤에 오는 명사**로 정한다."],
       why:"명령문은 듣는 사람이 you 라는 것이 뻔하니 주어를 생략하고 동사원형부터 말하는 형식이다. Let's 는 Let us 의 축약으로 '우리 같이'를 제안한다. There is/are 는 '어떤 것이 존재한다'를 소개할 때 주어를 뒤로 보내는 특별한 문장이라 be동사의 수를 뒤 명사에 맞추는 것이 핵심이다.",
       pitfalls:[
        "be동사 명령문에 is/are 사용: **Are** careful (X) → **Be** careful. / Don't **is** (X) → Don't **be**.",
        "There is 뒤 복수 명사: There **is** three apples (X) → There **are**. 명사가 복수인지 끝까지 확인.",
        "Let's 의 부정 어순: **Don't let's** (X) → **Let's not** go."],
       points:["서술형: 평서문 → 명령문·부정 명령문·Let's 문장 전환(동사원형, Don't/Let's not)", "어법: There is / There are 수일치(뒤 명사 기준)", "내신: 그림 보고 There is/are 로 물건 위치 설명하기(on/in/under/next to)"],
       pattern:["명령문 만들기: 주어 You 지우고 동사원형. be동사 문장(You are quiet)은 Be quiet, 부정은 Don't be", "There 문장: ① 뒤 명사 찾기 → ② a/an·단수·셀 수 없는 명사면 is, 복수면 are → ③ 의문은 Is/Are there"],
       memo:"명령문 = 동사원형(be동사는 Be), 부정은 Don't, 제안은 Let's. There is + 단수 / There are + 복수.",
       quiz:[
        { q:"빈칸에 알맞은 것은?  There ___ some milk in the glass.", opts:["is","are","be","do"], a:0, exp:"milk 는 셀 수 없는 명사 → There is." },
        { q:"어법상 틀린 것은?", opts:["Don't be shy.","Let's not waste time.","Are quiet in the library.","Please close the door."], a:2, exp:"be동사 명령문은 동사원형 → **Be** quiet." },
        { q:"대화의 빈칸에 알맞은 것은?  A: ___ any good restaurants near the station?  B: Yes, there are two.", opts:["Is there","Are there","There is","There are"], a:1, exp:"대답 there are two(복수) → 의문문은 Are there + 복수 명사." }
       ]}
    ]},

  /* ======================= 2학기 3. 현재진행·과거·미래·조동사 ======================= */
  { id:"eng-g1-tense", grade:"m12", title:"영어 1 · 현재진행·과거·미래와 조동사", std:["9영02-04","9영02-03","9영02-06"],
    exam:"2학기 중간고사 핵심. -ing 형·과거형(규칙/불규칙) 쓰기, was/were·did 부정·의문 전환, will ↔ be going to 바꿔 쓰기, can/must 의 부정 뜻 구별이 어법·서술형의 대부분이다.",
    lessons:[
     { id:"eng-g1-tense-prog", title:"현재진행형(be + -ing)", std:["9영02-03","9영02-02"],
       concept:[
        "**현재진행형** = **am/are/is + 동사-ing**: '지금 …하고 있다'. I **am reading** a book. / They **are playing** soccer **now**. 단서: now, right now, at the moment, Look!",
        "**-ing 만들기**: 대부분 + ing(read → reading). **-e 로 끝나면 e 빼고** + ing(make → mak**ing**). **단모음 + 단자음은 자음 한 번 더**(run → run**ning**, swim → swim**ming**). -ie 는 **ying**(lie → l**ying**).",
        "**부정문**: be + **not** + -ing. She **isn't sleeping**. / **의문문**: be 를 앞으로. **Are you listening**? — Yes, I **am**.",
        "**현재 vs. 현재진행**: He **plays** soccer.(평소 습관) / He **is playing** soccer.(지금 하는 중). 단서어 every day·usually 는 현재, now 는 진행.",
        "**진행형으로 안 쓰는 동사**(상태): like, love, want, know, have(가지다). I **am knowing** (X) → I **know**. 단 have 가 '먹다'면 진행 가능(I'm having lunch)."],
       why:"현재시제는 '평소에 그렇다'는 뜻이라 '지금 이 순간'을 말하려면 다른 형태가 필요하다. 영어는 be동사(지금 상태) + -ing(하는 중)을 합쳐 이를 표현한다. be동사 문장이므로 부정·의문이 be동사 규칙 그대로라는 점이 1학기 내용과 연결되는 핵심이다.",
       pitfalls:[
        "be동사 빠뜨림: She **studying** now (X) → She **is studying**. 진행형은 반드시 be + -ing 둘 다.",
        "-ing 철자: come → **comeing** (X) → com**ing**; stop → **stoping** (X) → stop**ping**(단모음+단자음).",
        "상태동사 진행: I'm **wanting** a new phone (X) → I **want**. 좋아하다·알다·원하다는 진행형 불가."],
       points:["어법: 동사의 -ing 형 쓰기(e 탈락·자음 중복·ie→y)", "서술형: 현재 → 현재진행 전환, 진행형 부정문·의문문", "내신: 그림 보고 '지금 하고 있는 일' 영작, 현재와 진행 구별(every day vs. now)"],
       pattern:["진행형 판별: 문장에 now·Look·at the moment 가 있거나 '지금 …하는 중'이면 be + -ing, every day·always 면 현재", "-ing 만들기 순서: ① -ie → ying ② -e 로 끝 → e 빼기 ③ 단모음 + 단자음 → 자음 추가 ④ 나머지 그냥 + ing"],
       memo:"지금 하는 중 = am/are/is + -ing. make→making, run→running, lie→lying. like·want·know 는 진행형 X.",
       quiz:[
        { q:"빈칸에 알맞은 것은?  Look! The kids ___ in the pool.", opts:["swim","swims","are swiming","are swimming"], a:3, exp:"Look! → 지금 하는 중(현재진행). swim 은 단모음 + 단자음 → swimming." },
        { q:"어법상 틀린 것은?", opts:["I am having dinner now.","She is making a cake.","We are knowing the answer.","Is he coming to the party?"], a:2, exp:"know 는 상태동사 → 진행형 불가. We know the answer." },
        { q:"빈칸에 알맞은 짝은?  Minho usually ___ to music, but right now he ___ a comic book.", opts:["listens – reads","is listening – reads","listens – is reading","is listening – is reading"], a:2, exp:"usually(습관) → 현재 listens / right now → 현재진행 is reading." }
       ]},
     { id:"eng-g1-tense-past", title:"과거시제(be동사 was/were · 일반동사 규칙/불규칙)", std:["9영02-04"],
       concept:[
        "**be동사 과거**: am/is → **was**, are → **were**. I **was** tired yesterday. / They **were** at the park. 부정 **wasn't/weren't**, 의문 **Was/Were + 주어?**",
        "**일반동사 규칙 과거**: + **-ed**(play**ed**). **-e 로 끝나면 + d**(lik**ed**), **자음 + y → ied**(stud**ied**), **단모음 + 단자음은 자음 추가 + ed**(stop**ped**, plan**ned**). 주어가 누구든 **형태 하나**.",
        "**불규칙 과거**(외우기): go→**went**, come→**came**, see→**saw**, eat→**ate**, have→**had**, do→**did**, make→**made**, take→**took**, get→**got**, buy→**bought**, read→**read**[red], put→**put**.",
        "**부정문·의문문**: **didn't + 동사원형** / **Did + 주어 + 동사원형?** I **didn't go**. / **Did** you **see** it? — Yes, I **did**. (didn't went ×)",
        "단서: **yesterday, last ~(night/week/year), ~ ago, in 2020, then**. 과거를 나타내는 말이 있으면 동사도 과거형."],
       why:"과거시제는 '그때 그랬다'는 끝난 일을 말한다. be동사는 was/were 두 개로, 일반동사는 -ed 하나(또는 불규칙형)로 주어와 상관없이 같은 모양이라 현재보다 오히려 단순하다. 다만 부정·의문에서 did 가 과거를 가져가므로 동사가 원형으로 돌아가는 것이 현재시제의 does 와 같은 원리다.",
       pitfalls:[
        "did 와 과거형 중복: Did you **went**? (X) → Did you **go**? / I didn't **ate** (X) → didn't **eat**.",
        "불규칙 동사에 -ed: **goed, eated, buyed** (X). 자주 쓰는 불규칙 동사는 표로 외운다.",
        "be동사 과거 수일치: You **was** (X) → You **were**. / The children **was** (X) → **were**."],
       points:["어법: 동사 과거형 쓰기(규칙 철자 변화 + 불규칙 동사 30개)", "서술형: 현재 → 과거 전환, didn't/Did 부정·의문문(동사원형)", "내신: 주말·방학에 한 일 일기 영작(yesterday, last weekend + 과거형)"],
       pattern:["과거 문장 점검: ① 시간 단서(yesterday·ago·last) 확인 → ② be동사면 was/were, 일반동사면 과거형 → ③ did 가 있으면 동사는 원형", "불규칙 동사 암기: 같은 꼴끼리 묶기(put·cut·read 는 그대로 / buy-bought·think-thought / come-came·become-became)"],
       memo:"was/were + 일반동사 -ed(불규칙은 암기). didn't·Did 뒤는 동사원형. yesterday·ago·last 가 과거 신호.",
       quiz:[
        { q:"빈칸에 알맞은 것은?  We ___ a movie last night.", opts:["watch","watches","watched","watching"], a:2, exp:"last night → 과거시제. watch 는 규칙 동사 → watched." },
        { q:"어법상 틀린 것은?", opts:["She went to Jeju two years ago.","Did you ate breakfast?","They were late for school.","I didn't bring my umbrella."], a:1, exp:"Did 가 과거를 담당 → 동사원형 eat. Did you eat breakfast?" },
        { q:"동사의 과거형이 잘못 짝지어진 것은?", opts:["stop – stopped","study – studied","buy – buyed","take – took"], a:2, exp:"buy 는 불규칙 동사 → bought." }
       ]},
     { id:"eng-g1-tense-fut", title:"미래 will / be going to · 조동사 can / must", std:["9영02-04","9영02-06"],
       concept:[
        "**will + 동사원형**: '…할 것이다'. 주어와 상관없이 will 하나. I **will call** you tomorrow. 부정 **will not = won't**, 의문 **Will you …?** 그 자리에서 정한 일·예측에 잘 쓴다.",
        "**be going to + 동사원형**: '…할 예정이다'(미리 정한 계획). I **am going to visit** my uncle this weekend. be동사는 주어에 맞춤(am/are/is), 부정은 be + not, 의문은 be 를 앞으로.",
        "**can + 동사원형**: 능력(…할 수 있다)·허가(…해도 된다). She **can swim**. / **Can** I **use** your phone? 부정 **cannot = can't**. **be able to** 로 바꿔 쓸 수 있다.",
        "**must + 동사원형**: 의무(…해야 한다). You **must wear** a helmet. = **have to**. **must not(mustn't)** 은 **금지**(…하면 안 된다), **don't have to** 는 **불필요**(…할 필요 없다)로 뜻이 다르다.",
        "**조동사 공통 규칙**: ① 뒤에 **항상 동사원형** ② 주어가 3인칭 단수여도 **-s 없음**(He can**s** ×) ③ 조동사 **두 개 연달아 X**(will can ×  → will be able to)."],
       why:"미래와 조동사는 '아직 일어나지 않은 일'이나 '할 수 있다·해야 한다'는 화자의 판단을 동사 앞에 한 단어로 붙이는 장치다. 동사 자체는 변하지 않으므로 늘 원형이 온다. must not 과 don't have to 의 차이는 영어 특유의 함정으로, '안 된다'와 '안 해도 된다'를 구분하는 것이 중1 2학기 어법의 대표 포인트다.",
       pitfalls:[
        "조동사 뒤 동사 변형: He will **goes** (X) / She can **swims** (X) → 원형 go, swim. be going to 뒤도 원형(going to **visits** ×).",
        "**mustn't**(금지)와 **don't have to**(불필요) 혼동: '내일은 학교에 안 가도 돼' → You **don't have to** go. (mustn't go 는 '가면 안 된다')",
        "be going to 의 be 생략: I **going to** study (X) → I **am going to** study."],
       points:["어법: 조동사 + 동사원형, 3인칭 단수 -s 금지, will not → won't", "서술형: will ↔ be going to 전환, can ↔ be able to, must ↔ have to", "내신: must not vs. don't have to 뜻 구별, 계획 말하기 영작(this weekend, next month)"],
       pattern:["조동사 문장 점검: ① 조동사(will/can/must/be going to) 뒤는 원형인가 → ② 주어가 he/she 여도 -s 없음 → ③ 부정은 조동사 + not(won't/can't/mustn't)", "must 부정 해석: '…하면 안 된다'면 must not, '…안 해도 된다'면 don't have to 로 우리말부터 가른다"],
       memo:"will·be going to·can·must + 동사원형. won't / can't / mustn't(금지) ≠ don't have to(불필요).",
       quiz:[
        { q:"빈칸에 알맞은 것은?  My brother ___ play the guitar very well.", opts:["cans","can","is can","can to"], a:1, exp:"조동사 can 은 주어가 3인칭 단수여도 형태가 변하지 않고 뒤에 동사원형이 온다." },
        { q:"어법상 틀린 것은?", opts:["I am going to meet Jiho tomorrow.","She will not come to the party.","He must wears a seat belt.","Will you help me with this box?"], a:2, exp:"must 뒤는 동사원형 → must **wear**." },
        { q:"빈칸에 알맞은 것은?  It's Sunday, so you ___ get up early. You can sleep more.", opts:["must","must not","don't have to","can't"], a:2, exp:"'더 자도 된다' → 일찍 일어날 필요가 없다(불필요) = don't have to. must not 은 금지." }
       ]}
    ]},

  /* ======================= 2학기 4. 형용사·부사·비교 + 독해 전략 ======================= */
  { id:"eng-g1-descread", grade:"m12", title:"영어 1 · 형용사·부사·비교와 독해 전략", std:["9영02-02","9영01-03","9영01-02"],
    exam:"2학기 기말 범위. 형용사/부사 자리 고르기, -ly 철자, 비교급·최상급 변화표(-er/-est, more/most, 불규칙) 서술형이 어법의 중심이고, 독해는 교과서 본문 변형으로 주제·세부 내용 일치 문항이 나온다.",
    lessons:[
     { id:"eng-g1-descread-adj", title:"형용사와 부사 · 빈도부사", std:["9영02-02","9영02-03"],
       concept:[
        "**형용사**: 명사를 꾸미거나(명사 **앞**) be동사 뒤에서 주어를 설명. a **tall** boy / The boy is **tall**. -thing/-one/-body 로 끝나는 말은 **뒤**에서 꾸민다(some**thing cold**).",
        "**부사**: 동사·형용사·다른 부사를 꾸밈. 대부분 **형용사 + ly**(quick → quick**ly**, happy → happ**ily**). 형태가 같은 것: **fast, hard, early, late, high**. **good 의 부사는 well**.",
        "**-ly 함정**: **lovely, friendly, lonely** 는 -ly 로 끝나지만 **형용사**. **hardly** 는 '거의 …않다'(hard 의 부사 아님), **lately** 는 '최근에'.",
        "**빈도부사** always(항상) > usually > often > sometimes > never(결코 …않다). 위치: **be동사 뒤, 일반동사 앞**. She **is always** kind. / He **never eats** fast food.",
        "**many + 셀 수 있는 복수 / much + 셀 수 없는** / **a lot of = lots of** 는 둘 다. **a few**(조금 있다, 복수) / **a little**(조금 있다, 셀 수 없는) / **few·little**(거의 없다)."],
       why:"형용사는 '어떤 것인가'를, 부사는 '어떻게·얼마나 자주'를 말한다. 자리가 다르므로 빈칸에서 꾸밈 받는 말이 명사면 형용사, 동사·형용사면 부사를 고르는 것이 기본이다. 빈도부사의 위치 규칙(be 뒤·일반동사 앞)과 many/much 의 명사 구분은 중1 어법의 대표 암기 항목이다.",
       pitfalls:[
        "형용사 자리에 부사: She is a **carefully** driver (X) → **careful** driver. 명사 앞은 형용사.",
        "good/well: He plays soccer **good** (X) → **well**. / He is a **well** player 는 틀림(형용사는 good).",
        "빈도부사 위치: He **always is** late (X) → is **always** late. / She **eats never** (X) → **never eats**."],
       points:["어법: 형용사 vs. 부사 자리(명사 앞·be 뒤 = 형용사, 동사 뒤 = 부사)", "서술형: 형용사 → 부사 만들기(-ly, happy→happily, good→well, fast→fast)", "내신: 빈도부사 넣어 문장 배열, many/much/a few/a little 선택"],
       pattern:["형·부 판별: 빈칸이 꾸미는 말을 화살표로 표시 → 명사면 형용사, 동사·형용사·문장 전체면 부사", "빈도부사 위치: be동사가 있으면 그 '뒤', 일반동사만 있으면 그 '앞'. 조동사가 있으면 조동사 뒤"],
       memo:"명사 앞·be 뒤 = 형용사, 동사 꾸미면 부사(-ly). good→well, fast·hard·early 는 그대로. 빈도부사는 be 뒤·일반동사 앞.",
       quiz:[
        { q:"빈칸에 알맞은 것은?  Sora speaks English very ___.", opts:["good","well","goodly","better"], a:1, exp:"동사 speaks 를 꾸미는 부사 자리 → good 의 부사 well." },
        { q:"어법상 틀린 것은?", opts:["He always gets up at six.","She is never late.","I usually am busy on Mondays.","They often visit their grandma."], a:2, exp:"빈도부사는 be동사 뒤 → I **am usually** busy." },
        { q:"빈칸에 알맞은 짝은?  There isn't ___ milk left, but we have ___ eggs.", opts:["much – a few","many – a little","much – a little","many – few"], a:0, exp:"milk(셀 수 없음) → much / eggs(복수) → a few." }
       ]},
     { id:"eng-g1-descread-comp", title:"비교급·최상급 기초", std:["9영02-02","9영02-06"],
       concept:[
        "**비교급 + than**: '…보다 더 ~한'. Tom is **taller than** Jin. **최상급 the + -est**: '…중 가장 ~한'. Tom is **the tallest** in my class(**in** + 장소·집단 / **of** + 복수 명사: of the three).",
        "**규칙 변화**: 1음절은 **-er/-est**(tall → taller → tallest). **-e 로 끝나면 -r/-st**(large → larger). **자음 + y → ier/iest**(happy → happier → happiest). **단모음 + 단자음은 자음 추가**(big → bigger → biggest).",
        "**긴 단어(2음절 이상 대부분·-ful·-ous·-ing)는 more / most**: more beautiful, the most famous, more interesting. (beautifuler ×)",
        "**불규칙**: good/well → **better** → **best**, bad → **worse** → **worst**, many/much → **more** → **most**, little → **less** → **least**.",
        "**as + 원급 + as**: '…만큼 ~한'. She is **as tall as** her mom. 부정 **not as ~ as**(…만큼 ~하지 않다). 비교급 강조는 **much/even/far** + 비교급(very ×)."],
       why:"둘을 견주면 비교급, 셋 이상 중 하나를 고르면 최상급이다. 짧은 단어는 꼬리(-er/-est)를 바꾸고 긴 단어는 앞에 more/most 를 두는 이유는 발음이 너무 길어지는 것을 피하기 위해서다. 최상급 앞의 the 는 '그 하나'를 가리키는 정관사라는 점에서 자연스럽다.",
       pitfalls:[
        "more 와 -er 중복: **more taller** (X) → taller. / **more better** (X) → better(much better ○).",
        "최상급 the 누락·범위 전치사: She is **tallest** in … (X) → **the tallest**. / the best **in** the three (X) → **of** the three.",
        "철자 변화: big → **biger** (X) → big**ger**; easy → **easyer** (X) → eas**ier**; famous → **famouser** (X) → **more** famous."],
       points:["어법: 비교급·최상급 변화표 쓰기(-er/-est, more/most, 불규칙 good-better-best)", "서술형: 두 대상 비교 영작(비교급 + than), 셋 비교(the + 최상급 + in/of)", "내신: 표·그래프 보고 참/거짓 고르기(키·가격·나이 비교), as ~ as 부정 해석"],
       pattern:["비교 문장 만들기: ① 비교 대상이 둘인가 셋 이상인가 → ② 형용사 음절 수로 -er/more 결정 → ③ 비교급이면 than, 최상급이면 the + in/of", "변화표 암기: 짧으면 꼬리(-er/-est), 길면 머리(more/most), good·bad·many 는 따로 외우기"],
       memo:"둘 비교 -er than, 셋 이상 the -est. 긴 단어는 more/most, good-better-best, bad-worse-worst. as ~ as 는 원급.",
       quiz:[
        { q:"빈칸에 알맞은 것은?  This bag is ___ than that one.", opts:["heavy","heavier","more heavy","heaviest"], a:1, exp:"둘 비교 + than → 비교급. heavy 는 자음 + y → heavier." },
        { q:"어법상 틀린 것은?", opts:["Today is hotter than yesterday.","Math is more difficult than art.","She is the best singer in our school.","This is the most cheap phone of the four."], a:3, exp:"cheap 은 1음절 → the **cheapest**." },
        { q:"표의 내용과 일치하는 것은?  (키: Mina 160cm, Jun 165cm, Suji 158cm)", opts:["Mina is taller than Jun.","Suji is the tallest of the three.","Jun is the tallest of the three.","Mina is as tall as Suji."], a:2, exp:"165cm 인 Jun 이 셋 중 가장 크다 → the tallest of the three." }
       ]},
     { id:"eng-g1-descread-read", title:"독해 전략: 주제·세부 정보 찾기", std:["9영01-03","9영01-02","9영02-08"],
       concept:[
        "**주제(topic)**: 글이 '무엇에 관한' 것인지. 지문에서 **가장 자주 반복되는 말(핵심어)**이 주제. 보통 **첫 문장**이나 마지막 문장에 드러난다.",
        "**요지·중심 내용**: 주제에 대해 글쓴이가 하고 싶은 말 한 줄. 'My favorite ~ is …', 'I think ~', '~ is important' 같은 문장을 찾는다. 세부 예시(numbers, examples)는 요지가 아니다.",
        "**세부 정보(일치/불일치)**: 보기의 핵심어(이름·숫자·시간·장소)를 지문에서 **찾아 밑줄** 긋고 1:1 대조. 지문에 **없는 내용**은 '알 수 없음'이므로 일치로 고르지 않는다.",
        "**대명사 가리키기**: it/they/he 가 무엇을 받는지는 **바로 앞 문장의 명사**부터 대입해 본다. 단수·복수(it ↔ they)가 맞는지 확인.",
        "**글의 종류·목적**: 일기(Today I …, 과거형), 편지·이메일(Dear ~ / From ~), 안내문(날짜·장소·시간). 형식을 보면 목적(알리기·초대·부탁)이 보인다."],
       why:"중1 독해 지문은 짧고 쉬운 편이지만, 단어를 다 알아도 '무엇에 관한 글인가'와 '구체적으로 뭐라고 했나'를 구별하지 못하면 틀린다. 주제 문제는 반복되는 말을 세고, 세부 문제는 보기를 지문에 대조한다는 두 가지 습관이 중2·중3의 긴 지문 독해로 이어지는 기초 체력이다.",
       pitfalls:[
        "주제 문제에서 지문의 **한 예시**만 담은 보기 선택. 핵심어가 지문 전체를 덮는지 확인.",
        "세부 문제에서 지문에 있는 단어가 보기에 보이면 그대로 일치로 판단. 숫자·시간·부정어(not, never)가 바뀐 **변형 보기**를 조심.",
        "대명사를 가장 가까운 명사로 자동 연결. 단수·복수와 문맥(사람인지 사물인지)을 맞춰야 한다."],
       points:["내신: 교과서 본문 변형 — 주제·제목 고르기, 세부 내용 일치·불일치", "학평형: 대명사가 가리키는 것, 글의 목적·종류(일기·이메일·안내문)", "서술형: 지문 읽고 질문에 영어로 답하기(세부 정보 그대로 옮겨 쓰기), 간단한 일기·이메일 영작"],
       pattern:["주제 찾기: ① 반복되는 명사에 동그라미 → ② 첫·끝 문장에서 그 말을 담은 문장 찾기 → ③ 보기 중 '너무 좁은 것·너무 넓은 것' 지우기", "세부 일치: 보기 4개의 핵심어(숫자·이름·장소)를 먼저 표시 → 지문에서 그 자리를 찾아 대조 → 지문에 없는 보기는 바로 제외"],
       memo:"주제 = 가장 많이 반복되는 말, 세부 = 보기 핵심어를 지문에 대조, 대명사 = 앞 문장 명사에 단수·복수 맞춰 대입.",
       quiz:[
        { q:"다음 글의 주제로 알맞은 것은?  My name is Yuna. I have a dog, Coco. Coco is small and brown. She likes to run in the park. Every morning I walk with her. She is my best friend.", opts:["Yuna's morning walk","Yuna's dog, Coco","Dogs in the park","Yuna's best friend at school"], a:1, exp:"Coco(She) 가 다섯 문장 중 네 문장에 반복된다. ①은 한 문장의 예시, ③·④는 지문과 범위가 다르다." },
        { q:"다음 글의 내용과 일치하지 않는 것은?  Hi, Jake. Our school festival is on Friday, May 10. It starts at 2 p.m. in the gym. My class is going to sing two songs. Please come and watch us! — Mina", opts:["축제는 5월 10일 금요일이다.","축제는 오후 2시에 시작한다.","축제는 운동장에서 열린다.","미나네 반은 노래 두 곡을 부를 예정이다."], a:2, exp:"장소는 in the gym(체육관). 운동장(playground)이 아니다." },
        { q:"밑줄 친 They 가 가리키는 것은?  Jiho has two hamsters. He keeps them in a big cage. They sleep during the day and play at night. Jiho watches them before bed.", opts:["Jiho and his friend","two hamsters","a big cage","the day and the night"], a:1, exp:"복수 They 가 '낮에 자고 밤에 논다' → 앞 문장의 two hamsters." }
       ]}
    ]}
 ]});
