// 영어 중2-2 천재(소영순·이상기) 보강 — 2022 개정 교육과정 기준. 사이트 eng.js 에 없는 두 판 2학기 언어 형식(-thing + 형용사, 수량 형용사)을 보탠다.
// 출처: englishtutortv 의 천재(소영순)·천재(이상기) '22개정' 단원별 언어 형식 페이지 2건을 직접 열어 확인(소영순 L8 '-thing + 형용사', 이상기 L7 '수량 형용사', L1 '-thing + 형용사').
// 추정 사항: 1·2학기 경계는 L1~L4 = 1학기, L5~L8 = 2학기로 추정(학교 진도에 따라 다를 수 있음). 문법은 성취기준이 아닌 [별표] 언어 형식이므로
// 가장 가까운 표현 영역 성취기준 [9영02-05]·[9영02-10] 을 붙였다(코드·문장은 data/standards-all.js 로 확인). 예문은 모두 자작.
window.DATA = window.DATA || {}; window.DATA.subjectsExtra = window.DATA.subjectsExtra || [];
window.DATA.subjectsExtra.push({ sid:"eng", grade:"g22",
 src:[
  ["2022 개정 중2 천재(소영순) 1~8과 단원별 언어 형식 (englishtutortv, 22개정 표기 확인)","https://englishtutortv.com/%EC%A4%912-%EC%B2%9C%EC%9E%AC-%EC%86%8C%EC%98%81%EC%88%9C-1%EA%B3%BC-2%EA%B3%BC-3%EA%B3%BC-4%EA%B3%BC-5%EA%B3%BC-6%EA%B3%BC-7%EA%B3%BC-8%EA%B3%BC-%EC%A0%84%EB%8B%A8%EC%9B%90-%EB%8C%80%ED%99%94/"],
  ["2022 개정 중2 천재(이상기) 1~8과 단원별 언어 형식 (englishtutortv, 22개정 표기 확인)","https://englishtutortv.com/%EC%A4%912-%EC%B2%9C%EC%9E%AC-%EC%9D%B4%EC%83%81%EA%B8%B0-1%EA%B3%BC-2%EA%B3%BC-3%EA%B3%BC-4%EA%B3%BC-5%EA%B3%BC-6%EA%B3%BC-7%EA%B3%BC-8%EA%B3%BC-%EC%A0%84%EB%8B%A8%EC%9B%90-%EB%8C%80%ED%99%94/"]
 ],
 units:[
  { id:"eng-g22-chunjae", grade:"g22", order:5, tb:"천재(소영순) L8 / 천재(이상기) L7", title:"영어 · 형용사의 위치와 수량 형용사 (-thing + 형용사 / a few · a little · many · much)", std:["9영02-05","9영02-10"],
    exam:"기말 범위 마지막 과. 어순 바로잡기(something cold ↔ cold something)와 a few/few, many/much 중 고르기가 객관식·서술형 모두에 나온다. 소영순 판은 L8, 이상기 판은 L7.",
    lessons:[
     { id:"eng-g22-thing-adj", title:"-thing/-body/-one + 형용사 어순", std:["9영02-05"],
       concept:[
        "보통 형용사는 명사 **앞**: a **cold** drink. 그러나 **-thing / -body / -one** 으로 끝나는 대명사는 형용사를 **뒤**에 둔다: something **cold**, anybody **tall**, someone **famous**.",
        "해당 단어: some**thing**, any**thing**, no**thing**, every**thing** / some**body**·any**body**·no**body**·every**body** / some**one**·any**one**·no**one**·every**one**.",
        "긍정문은 **some-**, 의문문·부정문은 **any-**, 부정의 뜻은 **no-**: I want **something** sweet. / Is there **anything** new? / There is **nothing** wrong.",
        "**-thing + 형용사 + to부정사** 어순: something **cold to drink**(마실 차가운 것), nothing **special to do**(특별히 할 일 없음). 형용사가 먼저, to부정사가 뒤.",
        "**-thing / -body / -one** 은 모두 **단수** 취급: Everything **is** ready. / Everybody **likes** her."],
       why:"-thing·-body·-one 은 '것·사람'을 뜻하는 뭉치 단어라 그 안에 이미 명사(thing, body, one)가 들어 있다. 그래서 형용사를 앞에 붙일 자리가 없고 뒤에 붙여 설명을 덧댄다. to부정사도 뒤에서 꾸미는 말이므로 '대명사 → 형용사 → to부정사' 순으로 뒤쪽에 줄지어 선다.",
       pitfalls:[
        "**cold something**(×) → something **cold**(○). 우리말 '차가운 것' 순서대로 쓰면 틀린다.",
        "to부정사와 형용사 순서 바꿈: something **to eat delicious**(×) → something **delicious to eat**(○).",
        "everybody·everyone 을 복수 취급: Everyone **are** here(×) → Everyone **is** here(○). 뜻은 '모두'지만 문법은 단수."],
       points:["어법상 틀린 부분 고치기: 형용사 위치(앞→뒤)", "서술형: 우리말을 영어로 — '마실 뜨거운 것 좀 있니?' → Do you have anything hot to drink?", "some-/any-/no- 가운데 문맥(긍정·의문·부정)에 맞는 것 고르기"],
       pattern:["-thing 문제: ① -thing/-body/-one 단어 찾기 → ② 형용사는 바로 **뒤**에 → ③ to부정사가 있으면 그 **다음**에 → ④ 동사는 단수로", "some/any 문제: 문장이 의문문·부정문이면 any-, 권유·긍정이면 some-. '아무것도 ~않다'는 not ~ anything = nothing"],
       memo:"-thing · -body · -one 은 형용사가 뒤! something cold to drink (대명사 → 형용사 → to부정사), 동사는 단수.",
       quiz:[
        { q:"어법상 알맞은 것은?", opts:["I want to eat delicious something.","I want to eat something delicious.","I want to eat something to delicious.","I want to eat delicious to something."], a:1, exp:"-thing 뒤에 형용사: something delicious." },
        { q:"우리말과 뜻이 같도록 배열한 것은?  '우리는 읽을 재미있는 것이 필요하다.'  (need / to read / something / interesting / we)", opts:["We need interesting something to read.","We need something to read interesting.","We need something interesting to read.","We need to read something interesting."], a:2, exp:"-thing + 형용사 + to부정사 순서. '읽을 재미있는 것' = something interesting to read." },
        { q:"빈칸에 알맞은 것은?  Everybody in my class ___ a new nickname.", opts:["have","having","has","are having"], a:2, exp:"-body 로 끝나는 대명사는 단수 취급 → has." }
       ]},
     { id:"eng-g22-quantifier", title:"수량 형용사 (a few/few, a little/little, many/much, a lot of, some/any)", std:["9영02-10"],
       concept:[
        "**셀 수 있는 명사(복수)** 앞: **many**, **a few**(조금 있는), **few**(거의 없는). many books / a few friends / few mistakes.",
        "**셀 수 없는 명사** 앞: **much**, **a little**(조금 있는), **little**(거의 없는). much water / a little time / little hope.",
        "**a lot of = lots of** 는 둘 다 가능: a lot of apples / a lot of milk. much 는 주로 **의문문·부정문**에서 쓴다: Do you have much time?",
        "**some**(긍정문·권유), **any**(의문문·부정문)은 둘 다 가능: some cookies, some juice / any cookies, any juice.",
        "**a** 의 유무가 뜻을 가른다: a few = '몇 개 있다'(긍정), few = '거의 없다'(부정). a little / little 도 같은 관계."],
       why:"영어는 명사를 '셀 수 있는 것'과 '셀 수 없는 것'으로 먼저 나누고, 양을 말하는 단어도 그에 맞춰 둘로 갈라 쓴다. 그래서 수량 형용사 문제는 늘 '뒤 명사가 셀 수 있나?'에서 출발한다. a few/few 의 a 는 '있긴 있다'는 긍정의 느낌을 더한다.",
       pitfalls:[
        "**much + 복수 명사**(×): much books → **many** books. 반대로 many water(×) → **much** water.",
        "few 와 a few 를 같은 뜻으로 봄: I have **few** friends 는 '친구가 거의 없다'(외롭다), **a few** friends 는 '친구가 몇 명 있다'.",
        "money·time·information·advice·homework 는 **셀 수 없는 명사**. a few money(×) → **a little** money(○)."],
       points:["빈칸: many/much, a few/a little 중 뒤 명사에 맞는 것 고르기", "문맥: 'so I was lonely' 처럼 부정적 결과가 이어지면 few/little, 긍정이면 a few/a little", "서술형: much → a lot of 바꿔 쓰기, 셀 수 없는 명사 목록(water, money, time, information)"],
       pattern:["수량 형용사 문제: ① 뒤 명사가 복수형(-s)인가? → 복수면 many/a few/few, 아니면 much/a little/little → ② 문맥이 긍정인지 부정인지로 a 붙일지 결정", "many/much 가 모두 불편하면 a lot of 로 바꿔 쓰면 안전(긍정문)."],
       memo:"셀 수 있으면 many · a few · few, 셀 수 없으면 much · a little · little. a 가 있으면 '조금 있다', 없으면 '거의 없다'.",
       quiz:[
        { q:"빈칸에 알맞은 것은?  There isn't ___ milk in the fridge, so I will buy some.", opts:["many","much","a few","few"], a:1, exp:"milk 는 셀 수 없는 명사 + 부정문 → much." },
        { q:"문맥상 알맞은 것은?  Mina moved to a new town last week. She knows ___ people there, so she feels lonely.", opts:["few","a few","much","a little"], a:0, exp:"people 은 복수 취급 + '외롭다'는 부정적 결과 → '거의 없다' few." },
        { q:"어법상 틀린 것은?", opts:["We have a lot of homework today.","I need a little salt for the soup.","He asked me a few questions.","She drank much waters at lunch."], a:3, exp:"water 는 셀 수 없는 명사라 복수형을 쓰지 않는다. She drank a lot of water." }
       ]}
    ]}
 ]});
