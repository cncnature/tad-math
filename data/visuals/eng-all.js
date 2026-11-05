// 영어 시각 자료 (중2 eng.js · 중2 천재 보강 · 중3 · 고1 · 고2 — 36차시). 형식: docs/VISUAL-SCHEMA.md, 렌더러 js/visual.js
// 내용은 각 차시 concept/pitfalls/points/pattern 범위 안의 사실만 쓰고, 영어 예문은 전부 자작(≤20자).
window.DATA = window.DATA || {}; window.DATA.visuals = Object.assign(window.DATA.visuals || {}, {

 /* ===================== 중2-2 eng.js ===================== */
 "eng-rel-subj": [
  {type:"table", title:"주격 관계대명사 한눈 정리", head:["선행사","관계대명사","예문"], rows:[["사람","**who** / that","a boy who sings"],["사물·동물","**which** / that","a dog which runs"],["소유 (뒤에 명사)","**whose** + 명사","a man whose car"],["관계절 동사","**선행사**에 수일치","boys who are tall"]], note:"주격 뒤에는 바로 동사가 온다. 동사는 문장 전체 주어가 아니라 선행사에 맞춘다."},
  {type:"flow", title:"관계대명사 문제 풀이 순서", steps:[{t:"① 선행사 찾기",d:"사람? 사물?"},{t:"② 빠진 성분",d:"주어 빠짐 → 주격"},{t:"③ who / which",d:"둘 다 that 가능",hi:true},{t:"④ 동사 수일치",d:"선행사 단·복수"}]},
  {type:"flow", title:"두 문장 합치기 (I know a girl. + She sings.)", steps:[{t:"겹치는 말 ○",d:"a girl = she"},{t:"she → who",d:"대명사 지우기",hi:true},{t:"선행사 바로 뒤",d:"a girl who sings"}], note:"who 뒤에 she 를 남기면 틀린다."}
 ],
 "eng-rel-obj": [
  {type:"table", title:"주격 vs 목적격 관계대명사", head:["구분","주격","목적격"], rows:[["관계사 바로 뒤","**동사**","**주어 + 동사**"],["생략","불가","**가능**"],["예문","a cat that sleeps","a cat that I love"],["전치사 뒤","—","**which** 만 (that ×)"],["목적어 중복","—","which I saw **it** ×"]]},
  {type:"compare", title:"who · which · that", items:[{name:"who(m)",points:["선행사가 **사람**","주격·목적격 모두"]},{name:"which",points:["선행사가 **사물·동물**","전치사 뒤 가능: in which"]},{name:"that",points:["사람·사물 둘 다","**-thing·최상급·the only** 뒤는 that 만","전치사 뒤 **×** (in that ×)"]}]},
  {type:"flow", title:"목적격 관계대명사 영작 순서", steps:[{t:"① 선행사",d:"the book"},{t:"② 관계대명사",d:"which / that",hi:true},{t:"③ 남은 문장",d:"I read (목적어 빼고)"}], note:"뒤에 주어+동사가 바로 오면 목적격 → 생략 OK. 뒤에 동사면 주격 → 생략 ×."}
 ],
 "eng-c5-percept": [
  {type:"table", title:"5형식 동사별 목적격 보어", head:["동사","목적격 보어","예문"], rows:[["지각 see/hear/feel","**동사원형** / -ing","I saw him run."],["사역 make/have/let","**동사원형**만","Let me try."],["help","(to) 동사원형","help me (to) go"],["get","**to**부정사","get him to help"],["당하는 관계","**p.p.**","had my hair cut"]], note:"지각동사만 -ing 도 가능, 사역동사는 원형만, get 만 to."},
  {type:"flow", title:"5형식 어순 (S + V + O + O.C.)", steps:[{t:"주어 S",d:"Mom"},{t:"동사 V",d:"made (사역)"},{t:"목적어 O",d:"me"},{t:"목적격 보어",d:"clean (원형)",hi:true}], note:"목적어와 보어는 주어-동사 관계(I clean). to 는 끼지 않는다."},
  {type:"tree", title:"5형식 동사 체계", root:{t:"S + V + O + O.C.", children:[{t:"지각동사",children:["see / watch / hear","feel / notice","원형 또는 -ing"]},{t:"사역동사",children:["make / have / let","원형만","to부정사 ×"]},{t:"help · get",children:["help + (to) 원형","get + to 원형"]}]}}
 ],
 "eng-c5-adj-to": [
  {type:"table", title:"목적격 보어 형태 정리", head:["보어 형태","동사","예문"], rows:[["**형용사**","make/keep/find/leave","made me happy"],["**명사**","call/name/elect","call him Max"],["**to부정사**","want/ask/tell/advise","told me to go"],["**동사원형**","사역·지각동사","let me go"]], note:"보어 자리에 부사 ×: made me sadly (×) → sad."},
  {type:"tree", title:"목적격 보어 분류", root:{t:"목적격 보어", children:[{t:"형용사 (상태)",children:["make / keep","find / leave","부사 ×"]},{t:"to부정사",children:["want / ask","tell / advise","allow / expect"]},{t:"동사원형",children:["사역 make/have/let","지각 see/hear"]}]}},
  {type:"compare", title:"make 두 가지 · want 두 가지", items:[{name:"make + O + 형용사",points:["…하게 **만들다**","made me sad"]},{name:"make + O + 원형",points:["…하도록 **시키다**","made me wait"]},{name:"want to / want O to",points:["want **to go**: 내가 감","want **him to go**: 그가 감"]}]}
 ],
 "eng-conj-indq": [
  {type:"table", title:"간접의문문 전환 정리", head:["구분","직접의문문","간접의문문"], rows:[["의문사 있음","Where is he?","where **he is**"],["의문사 없음","Is she busy?","**if** she is busy"],["do/does/did","What does he want?","what he **wants**"],["think 류","Do you think…?","**Who** do you think…"],["의문사 + to V","= should","what **to do**"]], note:"do 는 사라지고 시제·3인칭 -s 를 동사에 넘긴다."},
  {type:"flow", title:"간접의문문 어순 도식", steps:[{t:"주절",d:"I wonder"},{t:"의문사 / if",d:"where"},{t:"주어",d:"he"},{t:"동사",d:"lives (-s)",hi:true}], note:"평서문 어순. where is he (×) → where he is."},
  {type:"flow", title:"간접의문문 변환 3단계", steps:[{t:"① 의문사 남김",d:"없으면 if/whether"},{t:"② 주어 + 동사",d:"평서문 어순",hi:true},{t:"③ do 제거",d:"시제·-s 를 동사에"}]}
 ],
 "eng-conj-sub": [
  {type:"table", title:"접속사 한눈 정리", head:["접속사","관계·뜻","예문"], rows:[["so 형 that","너무 …해서 ~ (결과)","so hot that I left"],["too 형 to","…하기엔 너무 (불가)","too hot to run"],["although","비록 …지만 (양보)","Although it rained,"],["if (조건)","만약 … → **현재시제**","If it rains, …"],["that (명사절)","…라는 것, 생략 가능","I think (that) …"]], note:"although 와 but 을 한 문장에 같이 쓰지 않는다."},
  {type:"flow", title:"so~that → too~to 전환", steps:[{t:"so + 형 + that",d:"so hot that"},{t:"too + 형",d:"형용사 그대로"},{t:"같은 주어 지움",d:"can't → to",hi:true},{t:"too hot to run",d:"목적어 it 도 ×"}]},
  {type:"compare", title:"so ~ that vs so that · 조건 if vs 명사절 if", items:[{name:"so ~ that",points:["so 와 that 사이에 **형용사**","결과: 너무 …해서"]},{name:"so that",points:["so·that 붙어 있음","목적: …하기 위해"]},{name:"if 두 가지",points:["조건절: **현재시제** (will ×)","명사절 '…인지': will 가능"]}]}
 ],
 "eng-cmp-comp": [
  {type:"table", title:"비교 표현 한눈 정리", head:["표현","형태","예문"], rows:[["원급","as + 원급 + as","as tall as Tom"],["비교급","비교급 + **than**","taller than Tom"],["최상급","the 최상급 + **in/of**","the tallest in class"],["배수","배수사 + as~as","twice as old as me"],["the 비교급","the 비교급, the 비교급","The more, the better"]], note:"배수사 + as 원급 as = 배수사 + 비교급 than."},
  {type:"flow", title:"비교 영작 순서", steps:[{t:"① 몇 개 비교?",d:"2개 비교급 / 3개+ 최상급"},{t:"② 같다 / 다르다",d:"as~as / than",hi:true},{t:"③ 강조·배수",d:"much / twice"}]},
  {type:"compare", title:"강조·범위 표현 비교", items:[{name:"원급 강조",points:["**very** + 원급","very tall"]},{name:"비교급 강조",points:["**much / even / far / a lot**","much taller","very bigger ×"]},{name:"최상급 범위",points:["**in** + 장소·집단","**of** + 복수 명사"]}]}
 ],
 "eng-cmp-it": [
  {type:"table", title:"가주어 It · 목적어 형태 정리", head:["구분","형태·동사","예문"], rows:[["가주어 It","It is 형 (for A) to V","It is hard to swim"],["의미상 주어","**for** + 목적격 / 성격 **of**","nice of you"],["to부정사만","want/plan/decide","want to go"],["동명사만","enjoy/finish/avoid","enjoy swimming"],["뜻이 다름","remember/forget/stop","forgot to lock"]]},
  {type:"flow", title:"It 이 보이면 — 가주어 판단", steps:[{t:"It 발견",d:"'그것' 아님?"},{t:"뒤에 to V/that?",d:"있으면 가주어",hi:true},{t:"형용사 확인",d:"성격 형용사?"},{t:"for / of",d:"for me · of you"}]},
  {type:"compare", title:"to V vs -ing (remember · forget · stop)", items:[{name:"to V",points:["**앞으로 할 일**","forgot to lock (안 잠금)"]},{name:"-ing",points:["**이미 한 일**","forgot locking (잠갔음)"]},{name:"stop",points:["stop to V: …하려고 멈춤","stop -ing: …하기를 멈춤"]}]}
 ],
 "eng-cmp-review": [
  {type:"table", title:"현재완료 용법과 과거시제", head:["용법","단서","예문"], rows:[["경험","ever/never/before","I have never flown."],["계속","**since** 시점 / **for** 기간","has lived since 2021"],["완료","just / already / yet","has just left"],["과거시제","ago/yesterday/last ~","left two days ago"]], note:"ago·yesterday 가 보이면 현재완료가 아니라 과거!"},
  {type:"flow", title:"능동 → 수동 전환 4단계", steps:[{t:"① 목적어 → 주어",d:"this song"},{t:"② be 시제·수",d:"is / was / were",hi:true},{t:"③ p.p.",d:"loved (broke ×)"},{t:"④ by + 목적격",d:"by them"}], note:"자동사(happen, arrive)는 수동태 불가."},
  {type:"compare", title:"현재완료 vs 과거 · been vs gone", items:[{name:"현재완료 have + p.p.",points:["과거 → **지금까지** 이어짐","since / for / ever / yet"]},{name:"과거시제",points:["끝난 **한 시점**","ago / yesterday / in 2020"]},{name:"been to / gone to",points:["have **been** to: 가 본 적","have **gone** to: 가고 없음"]}]}
 ],
 "eng-read-strategy": [
  {type:"table", title:"독해 유형별 보는 곳", head:["유형","보는 곳","오답 패턴"], rows:[["주제·요지","첫·끝 문장, 반복어","세부 사실"],["제목","요지를 압축","너무 넓거나 좁음"],["빈칸","앞뒤 **연결어**","본문 단어 그대로"],["순서·삽입","대명사·연결어","—"],["영작","어순·시제·수일치","하나만 틀려도 감점"]]},
  {type:"flow", title:"독해 순서", steps:[{t:"① 첫·끝 문장",d:"주장 위치"},{t:"② 반복어·연결어",d:"표시하기",hi:true},{t:"③ 유형별 정독",d:"필요한 곳만"}], note:"However = 반대, For example = 예시, Therefore = 결과."},
  {type:"flow", title:"영작 5초 검산", steps:[{t:"동사 찾기"},{t:"주어와 수일치"},{t:"시제 부사 확인",d:"ago / since"},{t:"태 (능동/수동)"},{t:"어순",d:"S + V + O"}]}
 ],

 /* ===================== 중2-2 천재 보강 ===================== */
 "eng-g22-thing-adj": [
  {type:"table", title:"-thing / -body / -one 정리", head:["구분","규칙","예문"], rows:[["보통 형용사","명사 **앞**","a cold drink"],["-thing/-body/-one","형용사 **뒤**","something cold"],["+ to부정사","형용사 → to V","something hot to eat"],["수일치","**단수** 취급","Everything is ready."],["some-/any-/no-","긍정 / 의문·부정 / 부정 뜻","anything new?"]]},
  {type:"flow", title:"어순 도식: 대명사 → 형용사 → to부정사", steps:[{t:"-thing 대명사",d:"something"},{t:"형용사",d:"cold",hi:true},{t:"to부정사",d:"to drink"}], note:"cold something (×), something to drink cold (×)."},
  {type:"compare", title:"some- · any- · no-", items:[{name:"some-",points:["**긍정문**","something sweet"]},{name:"any-",points:["**의문문·부정문**","Is there anything new?"]},{name:"no-",points:["**부정의 뜻**","There is nothing wrong.","= not ~ anything"]}]}
 ],
 "eng-g22-quantifier": [
  {type:"table", title:"수량 형용사 한눈 정리", head:["명사","많은","조금 있는","거의 없는"], rows:[["셀 수 있음 (복수)","**many**","**a few**","**few**"],["셀 수 없음","**much**","**a little**","**little**"],["둘 다","a lot of / lots of","some / any","—"]], note:"much 는 주로 의문문·부정문. money·time·information·advice 는 셀 수 없는 명사."},
  {type:"flow", title:"수량 형용사 문제 순서", steps:[{t:"① 뒤 명사 -s?",d:"복수형인가"},{t:"② 묶음 선택",d:"many 쪽 / much 쪽",hi:true},{t:"③ 문맥 긍정/부정",d:"a 붙일지 결정"}]},
  {type:"compare", title:"a few vs few (a 의 유무)", items:[{name:"a few / a little",points:["'**조금 있다**' (긍정)","a few friends"]},{name:"few / little",points:["'**거의 없다**' (부정)","few friends → lonely"]},{name:"셀 수 없는 명사",points:["water, money, time","information, advice","a little money (a few ×)"]}]}
 ],

 /* ===================== 중3 ===================== */
 "eng-g3-cond-sub": [
  {type:"table", title:"가정법 시제 짝 맞추기", head:["구분","if 절","주절","뜻"], rows:[["가정법 과거","과거형 (**were**)","**would + V**","현재 사실 반대"],["가정법 과거완료","**had p.p.**","**would have p.p.**","과거 사실 반대"],["혼합 가정법","had p.p. (then)","would + V (now)","과거 조건·현재 결과"],["I wish / as if","과거형 / had p.p.","—","사실 아님"]], note:"if 절에 would ×, 주절에 will ×."},
  {type:"flow", title:"가정법 판별 순서", steps:[{t:"① 주절 would?",d:"would/could 확인"},{t:"② if 절 동사",d:"과거형 / had p.p.",hi:true},{t:"③ 뜻 확인",d:"현재 반대 / 과거 반대"}]},
  {type:"flow", title:"가정법 → 직설법 전환", steps:[{t:"가정법 문장",d:"If I were rich, …"},{t:"시제 한 칸 당김",d:"were → am",hi:true},{t:"긍정 ↔ 부정",d:"not 뒤집기"},{t:"As / Because",d:"As I am not rich"}]}
 ],
 "eng-g3-cond-part": [
  {type:"table", title:"현재분사 vs 과거분사", head:["구분","-ing","p.p."], rows:[["관계","**능동·진행**","**수동·완료**"],["명사 수식","a crying baby","a locked door"],["감정 분사","감정을 **일으킴**","감정을 **느낌**"],["예문","a boring movie","I was bored."],["분사구문","Seeing him, …","(Being) Written …"]]},
  {type:"flow", title:"분사구문 만들기 3단계", steps:[{t:"① 접속사 지움",d:"When ×"},{t:"② 같은 주어 지움",d:"she ×"},{t:"③ 동사 → -ing",d:"Meeting him, …",hi:true},{t:"부정은 Not 앞",d:"Not knowing, …"}], note:"주어가 다르면 남긴다: It being cold, we stayed in."},
  {type:"compare", title:"감정 분사 -ing vs p.p.", items:[{name:"-ing (일으킴)",points:["주어가 감정의 **원인**","an exciting game","사람이어도 남을 지루하게 하면 boring"]},{name:"p.p. (느낌)",points:["주어가 **느끼는** 쪽","I was excited.","I was exciting ×"]}]}
 ],
 "eng-g3-relperf-adv": [
  {type:"table", title:"관계부사 · what 정리", head:["관계사","= 전치사 + 관계대명사","뒤 문장","예문"], rows:[["where (장소)","in / at which","**완전**","a park where we met"],["when (시간)","on which","완전","the day when he left"],["why (이유)","for which","완전","the reason why I cry"],["how (방법)","the way 와 같이 ×","완전","how she did it"],["what","= the thing which","**불완전**","what he said"]]},
  {type:"flow", title:"관계사 선택 3단계", steps:[{t:"① 선행사 있나?",d:"없으면 what"},{t:"② 뒤 문장 완전?",d:"완전 → 관계부사",hi:true},{t:"③ 불완전",d:"사람 who / 사물 which"}]},
  {type:"compare", title:"제한적 vs 계속적 용법", items:[{name:"제한적 (콤마 ×)",points:["선행사를 꾸밈","that 가능"]},{name:"계속적 (콤마 ○)",points:["**보충 설명**, 앞에서부터 해석","'그리고/그런데 그는'","**that · what ×**, 생략 ×","which 는 **앞 문장 전체** 가능"]}]}
 ],
 "eng-g3-relperf-perfect": [
  {type:"table", title:"시제 한눈 정리", head:["시제","형태","뜻","단서"], rows:[["과거","V-ed","끝난 한 시점","ago, yesterday"],["과거완료","**had p.p.**","과거보다 **더 먼저**","by the time, before"],["현재완료","have p.p.","지금까지·결과","since / for, just"],["현재완료진행","have **been -ing**","**지금도** 하는 중","since / for"]], note:"상태동사(know, like)는 진행형 불가."},
  {type:"flow", title:"과거완료 시제 배열", steps:[{t:"① 두 사건 번호",d:"무엇이 먼저?"},{t:"② 기준 과거 시점",d:"when 절 → 과거형"},{t:"③ 먼저 일어난 것",d:"had p.p.",hi:true}], note:"When I came, he had left. (떠남 → 옴)"},
  {type:"compare", title:"현재완료 vs 현재완료진행", items:[{name:"have p.p.",points:["**결과·완료**","I have read it. (다 읽음)"]},{name:"have been -ing",points:["**지금도 진행 중**","have been reading (읽는 중)","know / like 는 ×"]}]}
 ],
 "eng-g3-conjpass-conj": [
  {type:"table", title:"접속사 심화 정리", head:["접속사","뜻","예문"], rows:[["so that + can","…하기 위해 (목적)","so that I can win"],["so 형 that","너무 …해서 (결과)","so late that I ran"],["unless","…하지 않으면 = if not","Unless you go, …"],["as long as","…하는 한 (조건)","as long as you try"],["even though","비록 …지만","Even though I lost,"],["not only A but B","= B as well as A","동사는 **B** 에 일치"]], note:"조건 접속사 뒤 미래는 현재시제."},
  {type:"compare", title:"so that vs so ~ that", items:[{name:"so that (목적)",points:["so·that **붙어** 있음","+ 주어 + **can/could**","= in order to"]},{name:"so ~ that (결과)",points:["사이에 **형용사/부사**","너무 …해서 ~하다"]}]},
  {type:"flow", title:"unless ↔ if not 전환", steps:[{t:"unless + 긍정",d:"Unless you run,"},{t:"= if + not",d:"If you don't run,",hi:true},{t:"not 개수 = 1",d:"이중 부정 ×"},{t:"조건절은 현재",d:"will ×"}]}
 ],
 "eng-g3-conjpass-passive": [
  {type:"table", title:"형식별 수동태 정리", head:["형식","수동태 형태","예문"], rows:[["4형식 (사람 주어)","IO + be p.p. + DO","I was given a pen."],["4형식 (사물 주어)","DO + be p.p. **to/for**","was given to me"],["5형식","보어는 **제자리**","is called Max"],["사역·지각","원형 → **to** 부활","was made to wait"],["조동사","조동사 + **be p.p.**","must be done"],["구동사","한 덩어리","looked after by"]]},
  {type:"flow", title:"4형식 수동태 순서", steps:[{t:"① 어느 목적어?",d:"사람 / 사물"},{t:"② 사물 주어면",d:"사람 앞 to/for",hi:true},{t:"③ 동사별 전치사",d:"give류 to / make류 for"}]},
  {type:"compare", title:"to vs for · by 이외 전치사", items:[{name:"to",points:["give / send / show / tell","was sent to me"]},{name:"for",points:["make / buy / cook","was made for me","사람 주어 수동태 잘 안 씀"]},{name:"by 이외",points:["filled **with**","known **for**(이유) / **as**(자격)","let → be allowed to"]}]}
 ],
 "eng-g3-emphread-emph": [
  {type:"table", title:"강조 · 도치 · 간접화법 정리", head:["구문","형태","예문"], rows:[["It ~ that 강조","It is/was **X** that …","It was Mia that won."],["동사 강조","**do/does/did** + 원형","I do like it."],["부정어 도치","Never + **조동사 + 주어**","Never have I lied."],["Here/So 도치","**동사 + 주어**","So do I."],["간접화법","told + 시제 한 칸","told me he was busy"]], note:"It ~ that 으로 동사는 강조 불가. 주어가 대명사면 Here it comes (도치 ×)."},
  {type:"flow", title:"It ~ that 강조 만들기", steps:[{t:"① 강조할 말 빼기",d:"on the bus"},{t:"② It was…that",d:"사이에 넣기",hi:true},{t:"③ 나머지 순서대로",d:"빼낸 자리는 비움"}]},
  {type:"flow", title:"간접화법 4단계 검산", steps:[{t:"전달동사",d:"told / asked"},{t:"접속사",d:"that / if / 의문사"},{t:"시제 한 칸",d:"will → would",hi:true},{t:"대명사·부사",d:"now → then"}], note:"불변의 진리·현재 습관은 시제 유지."}
 ],
 "eng-g3-emphread-read": [
  {type:"table", title:"독해 유형별 단서와 함정", head:["유형","단서","함정"], rows:[["순서 (A)(B)(C)","대명사·연결어·the","읽히는 대로 배열"],["무관 문장","핵심어 + **방향**","핵심어만 같음"],["제목","Why ~ / How to ~","너무 넓거나 좁음"],["빈칸","요지 **재진술**","부정어 반대 함정"],["조건 영작","단어 수·표현·어형","하나 어겨도 **0점**"]]},
  {type:"flow", title:"순서 배열 풀이", steps:[{t:"① 끝 문장 표시",d:"핵심 명사·사건"},{t:"② 첫 문장 단서",d:"대명사 / the / 연결어",hi:true},{t:"③ 사슬 잇기",d:"끊기면 처음부터"}]},
  {type:"flow", title:"조건 영작 검산 순서", steps:[{t:"조건",d:"밑줄 긋기",hi:true},{t:"어순"},{t:"시제"},{t:"수일치"}]}
 ],

 /* ===================== 고1 ===================== */
 "eng-h1-gram-verb": [
  {type:"table", title:"동사 자리 점검표", head:["점검","규칙","예문"], rows:[["수일치","**진짜 주어**에 맞춤","The box of pens is"],["수량 표현","the number of → 단수","a number of → 복수"],["시제","ago → 과거","since/for → 현재완료"],["태","목적어 없으면 **수동**","자동사 수동 ×"],["분사의 태","하는 쪽 -ing","당하는 쪽 p.p."]], note:"each / every / -thing / -one → 단수."},
  {type:"flow", title:"밑줄 동사 점검 4단계", steps:[{t:"① 진짜 주어",d:"수식어 괄호"},{t:"② 단·복수",d:"주어에 맞춤"},{t:"③ 목적어 있나?",d:"있음 능동 / 없음 수동",hi:true},{t:"④ 시간 표시어",d:"ago / since"}]},
  {type:"compare", title:"has been p.p. vs -ing · There is/are", items:[{name:"has been p.p.",points:["**수동** (…되어 왔다)","목적어 없음"]},{name:"has been -ing",points:["**진행** (…해 오고 있다)","목적어 있음"]},{name:"There is / are",points:["**뒤 명사**에 일치","단수 둘 and → 복수"]}]}
 ],
 "eng-h1-gram-nonfinite": [
  {type:"table", title:"동사가 아닌 자리 정리", head:["자리","판별","예문"], rows:[["준동사","본동사 이미 있음","the girl singing"],["to-v 목적어","want / decide / plan","plan to leave"],["v-ing 목적어","enjoy/finish/avoid","avoid eating late"],["관계대명사","뒤 **불완전**","the pen which I lost"],["관계부사","뒤 **완전**","the day when we met"],["what","**선행사 없음**","what she wants"]], note:"동사 수 = 접속사·관계사 수 + 1."},
  {type:"tree", title:"관계사 체계", root:{t:"관계사", children:[{t:"관계대명사 (뒤 불완전)",children:["who / which / that","전치사 + 관계대명사","= 관계부사"]},{t:"관계부사 (뒤 완전)",children:["where / when / why","접속사 that 도 완전"]},{t:"what (선행사 없음)",children:["= the thing which","앞에 명사 있으면 that"]}]}},
  {type:"compare", title:"접속사 vs 전치사 짝", items:[{name:"접속사 + 절",points:["because","although","while"]},{name:"전치사 + 명사(구)",points:["because of","despite","during"]}]}
 ],
 "eng-h1-read-main": [
  {type:"table", title:"요지 · 주제 · 제목 · 빈칸", head:["문항","답의 성격","오답 패턴"], rows:[["요지","주장 한 문장 (우리말)","세부·반대"],["주제","내용 명사구 (영어)","너무 넓음"],["제목","압축·비유","지문 단어 그대로"],["빈칸","주제문 **재진술**","그럴듯한 상식"]], note:"넷 다 같은 주제문에서 나온다."},
  {type:"flow", title:"설명문 구조와 주제문 위치", steps:[{t:"통념",d:"첫 문장"},{t:"반박",d:"However 뒤",hi:true},{t:"주장",d:"should / 명령문"},{t:"예시",d:"for example"},{t:"재진술",d:"마지막 두 문장"}], note:"첫 문장을 주제문으로 단정하지 않는다."},
  {type:"flow", title:"주제문 → 선택지 대조", steps:[{t:"① 신호 문장 밑줄",d:"역접·명령·should"},{t:"② 한 줄 요약"},{t:"③ 같은 뜻 다른 말",hi:true},{t:"④ 소거",d:"좁은·넓은·반대"}]}
 ],
 "eng-h1-read-detail": [
  {type:"table", title:"세부 정보 유형 정리", head:["유형","체크 항목","함정"], rows:[["일치·불일치","**선택지 먼저**, 순서 대조","주어·시간 바뀜"],["도표","증감·비교급·비율","percent ≠ %p"],["안내문","날짜·요금·조건","무료/유료 반전"],["지칭","앞 문장 같은 성·수","가장 가까운 명사"]]},
  {type:"flow", title:"세부 정보 풀이 순서", steps:[{t:"① 발문 확인",d:"일치 / 불일치"},{t:"② 선택지 키워드",d:"표시"},{t:"③ 순서대로 ○×",d:"지문에서 찾기",hi:true},{t:"④ 재확인",d:"숫자·시간·주체"}]},
  {type:"compare", title:"percent vs percentage point", items:[{name:"percent (%)",points:["비율 **자체**","20 → 30 은 1.5배 (doubled ×)"]},{name:"percentage point",points:["비율의 **차이**","20% → 30% = **10%p** 증가"]}]}
 ],
 "eng-h1-str-order": [
  {type:"table", title:"순서·삽입 단서 정리", head:["단서","뜻","예"], rows:[["the + 명사","앞에 이미 나옴","a box → the box"],["this / these / such","앞 내용 가리킴","this habit"],["However / But","앞과 **반대**","—"],["For example","앞에 **일반 진술**","—"],["Therefore","앞에 **원인**","As a result"],["first→then→finally","시간 순서","—"]]},
  {type:"flow", title:"순서 (36~37번) 풀이", steps:[{t:"① 끝 문장 밑줄",d:"주어진 글"},{t:"② 첫 문장 단서",d:"후보 2개로",hi:true},{t:"③ 결론 단락",d:"Thus / In the end"},{t:"④ 통독",d:"매끄러운지"}]},
  {type:"flow", title:"삽입 (38~39번) 풀이", steps:[{t:"① 주어진 문장",d:"this / it / 연결어"},{t:"② 끊기는 자리",d:"the 로 갑자기 등장",hi:true},{t:"③ 넣고 다시 읽기"}], note:"맨 끝 ⑤는 보통 결론이므로 그 앞에서 찾는다."}
 ],
 "eng-h1-str-summary": [
  {type:"table", title:"무관 문장 · 요약문 정리", head:["유형","기준","함정"], rows:[["무관 문장 (35)","**주제어 이탈**","어려운 문장"],["위치","보통 ②~④","—"],["요약문 (40)","결론의 **동의어**","(A) 맞고 (B) 반대"],["요약 서술형","주어·동사·목적어 갖춤","첫 문장만 보기"]]},
  {type:"flow", title:"무관 문장 풀이", steps:[{t:"① 주제어 2개",d:"첫 문장"},{t:"② 방향 ○×",d:"①~⑤ 문장",hi:true},{t:"③ 빼고 읽기",d:"이어지면 답"}]},
  {type:"flow", title:"요약문 풀이", steps:[{t:"① 요약문 먼저",d:"(A)(B) 품사"},{t:"② 결론 문장",d:"지문 끝 부분"},{t:"③ 동의어 대입",hi:true},{t:"④ 반의어 점검"}], note:"increase → boost, limit → restrict 처럼 바뀐다."}
 ],
 "eng-h1-vocab-context": [
  {type:"table", title:"어휘 문항 정리", head:["문항","원리","방법"], rows:[["30번 어휘","문맥과 **반대** 단어 1개","반의어 대입"],["네모 (A)(B)(C)","혼동어·반의어","품사·뜻 확인"],["다의어","이 글에서의 뜻","같은 품사 대입"],["내신 어휘","본문 단어 → 반의어","긍정/부정 표시"]], note:"모르는 단어가 답인 경우는 드물다."},
  {type:"flow", title:"반의어 대입 풀이", steps:[{t:"① 글의 방향",d:"첫 두 문장"},{t:"② 반의어 대입",d:"밑줄마다",hi:true},{t:"③ 자연스러우면",d:"그 밑줄이 오류"},{t:"④ 부정어 점검",d:"not / un- / dis-"}]},
  {type:"compare", title:"철자 혼동어", items:[{name:"affect / effect",points:["affect = **동사** 영향을 주다","effect = **명사**","an effect on"]},{name:"adapt / adopt",points:["adapt = 적응하다","adopt a habit = 습관 들이기"]},{name:"더 외울 짝",points:["lie/lay, rise/raise","than/then, quite/quiet","loose/lose, desert/dessert","principal/principle"]}]}
 ],
 "eng-h1-writing-serial": [
  {type:"table", title:"서술형 3대 유형과 감점", head:["유형","내용","감점 포인트"], rows:[["배열","주어진 단어 순서대로","단어 빠뜨림·추가"],["조건 영작","단어 수·표현 지정","하나 위반 → **0점**"],["어형 변화","본동사 유무 → 수·시제·태","—"],["채점 순서","어순 → 동사 → 관사 → 철자","둘 이상 틀리면 0점"]]},
  {type:"flow", title:"영어 어순 도식 (S + V + O + 수식어)", steps:[{t:"주어 S",d:"I"},{t:"동사 V",d:"have"},{t:"목적어 O",d:"a friend"},{t:"수식어는 뒤",d:"who cooks well",hi:true}], note:"우리말 순서대로 쓰지 않는다. 관계절·전치사구는 명사 뒤."},
  {type:"flow", title:"영작 5단계", steps:[{t:"① 조건 밑줄"},{t:"② 주어·동사"},{t:"③ 목적어·보어"},{t:"④ 수식어 뒤에"},{t:"⑤ 점검",d:"수·시제·관사·철자",hi:true}]}
 ],

 /* ===================== 고2 (수능 영어Ⅰ·Ⅱ) ===================== */
 "eng-h2-listen-purpose": [
  {type:"table", title:"듣기 1~5번 근거 위치", head:["문항","근거 위치","핵심 신호"], rows:[["1 목적","담화 **마지막 2~3문장**","Please ~ / I'd like"],["2 의견","반복해 강조하는 말","—"],["3 관계","직업 어휘 2개 이상","누가 부탁·서비스"],["4 그림","선택지 **순서대로**","위치·개수·무늬"],["5 할 일","마지막 합의","I'll ~ / Sure"]], note:"방송 전 선택지를 먼저 읽는다."},
  {type:"flow", title:"듣기 풀이 절차", steps:[{t:"① 질문 읽기",d:"남 / 여 표시"},{t:"② 선택지 밑줄",d:"핵심어"},{t:"③ 끝부분 집중",d:"요청·합의 문장",hi:true},{t:"④ 바꿔 말한 것",d:"그대로 아님"}]},
  {type:"tree", title:"수능 영어 45문항 유형 분류", root:{t:"수능 영어 45문항", children:[{t:"듣기 1~17",children:["목적·의견·관계","그림·할 일","금액·이유·언급"]},{t:"대의 파악 18~28",children:["목적·심경·주장·요지","주제·제목·도표","일치·안내문"]},{t:"추론 21·29~34",children:["빈칸·함축","어법·어휘"]},{t:"간접 쓰기 35~45",children:["무관·순서·삽입","요약·장문"]}]}}
 ],
 "eng-h2-listen-detail": [
  {type:"table", title:"듣기 6~17번 기술과 함정", head:["문항","기술","함정"], rows:[["6 금액","단가×개수 → 할인 → 합계","할인 전 가격·단가"],["7 이유","I'd love to, but ~ 뒤","앞에 나온 다른 사정"],["8·9·17 언급 無","선택지 순서대로 지움","바꿔 말한 것 놓침"],["10 표","**제외 조건**부터 지움","—"],["11~15 응답","마지막 말 질문/제안","앞 내용만 맞춤"],["16 주제","첫 문장·반복 핵심어","—"]]},
  {type:"flow", title:"금액 계산 순서", steps:[{t:"① 단가"},{t:"② 개수",d:"바뀌면 다시"},{t:"③ 할인·쿠폰",hi:true},{t:"④ 합계",d:"최종 지불액"}], note:"숫자를 메모하지 않으면 거의 틀린다."},
  {type:"flow", title:"언급 안 된 것 풀이", steps:[{t:"① 선택지 먼저"},{t:"② 들리면 ✓",d:"바꿔 말한 것도",hi:true},{t:"③ ✓ 없는 것",d:"다시 생각 ×"}]}
 ],
 "eng-h2-read-purpose": [
  {type:"table", title:"18~20·22번 신호어", head:["문항","신호어","선택지 대조"], rows:[["18 목적","**I am writing to ~**","끝 동사 (요청·안내)"],["19 심경","감정 어휘 + 전환점","앞 → 뒤 순서"],["20 주장","should / must / 명령문","글 끝 재진술"],["22 요지","역접·Thus / In short","전체 덮는 진술"]]},
  {type:"flow", title:"대의 파악 풀이", steps:[{t:"① 유형 확인"},{t:"② 신호어 찾기",d:"writing to / But",hi:true},{t:"③ 우리말 요약"},{t:"④ 넓게 덮는 것",d:"예시 세부 ×"}]},
  {type:"compare", title:"목적 문장 vs 함정", items:[{name:"목적 문장 ○",points:["I am writing to ~","I would like to ~","Please ~"]},{name:"함정 ×",points:["Thank you for ~ (인사)","첫 단락 상황 설명"]},{name:"심경 함정",points:["한쪽 감정만 맞음","앞 → 뒤 순서 뒤집힘"]}]}
 ],
 "eng-h2-read-topic": [
  {type:"table", title:"23~28번 방법과 오답", head:["문항","방법","오답"], rows:[["23 주제","반복 핵심어 **2개 모두**","핵심어 하나만"],["24 제목","비유·대구·의문문","너무 넓거나 좁음"],["25 도표","비교 표현 + 숫자","③~⑤ 대충 읽기"],["26 인물","선택지 = 글 순서","연도·장소 바꿈"],["27~28 안내문","날짜·비용·조건 표","조건부 정보"]], note:"25~28번은 2분 안에 끝내 31~39번에 시간을 넘긴다."},
  {type:"flow", title:"주제·제목 풀이", steps:[{t:"① 첫·끝 문장",d:"핵심어 2개"},{t:"② 둘 다 든 선택지",hi:true},{t:"③ 논조 확인",d:"권장 / 경고"}]},
  {type:"flow", title:"일치·안내문 풀이", steps:[{t:"① 선택지 먼저"},{t:"② ①부터 ✓/✗",d:"글 순서대로",hi:true},{t:"③ 부정어·조건",d:"never / except"}]}
 ],
 "eng-h2-infer-blank": [
  {type:"table", title:"빈칸·함축 근거 찾기", head:["빈칸 위치","근거","방법"], rows:[["일반 진술","뒤의 **예시**","예시 → 일반화"],["결론 (Thus)","**앞 전체**","요약"],["재진술","같은 뜻 문장","핵심어 바꿔 말함"],["21 함축","앞뒤 that is","주제로 번역"],["선택지 소거","논조 + / −","같은 단어 의심"]]},
  {type:"flow", title:"빈칸 풀이 5단계", steps:[{t:"① 빈칸 역할",d:"주제 / 예시 / 결론"},{t:"② 같은 뜻 문장",d:"밑줄",hi:true},{t:"③ 논조 결정",d:"+ / −"},{t:"④ 반대 방향 ×"},{t:"⑤ 넣어서 재독"}]},
  {type:"compare", title:"정답 선택지 vs 오답 선택지", items:[{name:"정답",points:["글 안 **재진술**의 바꿔 말하기","논조와 같은 방향"]},{name:"오답",points:["상식으로 그럴듯함","글 단어 그대로 + 반대 방향","비유를 문자 그대로"]}]}
 ],
 "eng-h2-infer-grammar": [
  {type:"table", title:"29번 어법 단골 · 30번 어휘", head:["유형","확인할 것","예"], rows:[["수일치","핵심 주어","The number of → 단수"],["능동 / 수동","목적어 유무","목적어 ○ → -ing"],["동사 vs 준동사","본동사 이미 있나","—"],["관계사","that/which 불완전","where/when 완전"],["병렬","and·or 앞뒤 형태","—"],["30 어휘","반의어로 바꿔 읽기","역접·인과 신호어"]]},
  {type:"flow", title:"어법 풀이 절차", steps:[{t:"① 유형 표시",d:"수/태/관계사/병렬"},{t:"② S-V-O 찾기",hi:true},{t:"③ 확실한 것 ✓"},{t:"④ 남은 둘 비교"}]},
  {type:"compare", title:"The number of vs A number of · what vs that", items:[{name:"The number of",points:["+ 복수 명사","**단수** 동사"]},{name:"A number of",points:["+ 복수 명사","**복수** 동사"]},{name:"what vs that",points:["what: 선행사 **없음**","that: 선행사 있음","the thing that = what"]}]}
 ],
 "eng-h2-write-order": [
  {type:"table", title:"35~39번 단서와 함정", head:["문항","단서","함정"], rows:[["35 무관","같은 소재·**다른 논점**","소재 같다고 관련"],["36~37 순서","대명사·the·연결어","그럴듯한 상상"],["38~39 삽입","지칭 대상 없는 this/the","처음 자연스러운 자리"],["공통","시간·원인→결과 순서","거꾸로면 틀림"]]},
  {type:"tree", title:"연결 단서 3종", root:{t:"연결 단서", children:[{t:"대명사·지시어",children:["this / these","such / it"]},{t:"정관사",children:["the + 앞에 나온 명사"]},{t:"연결어",children:["However","For example","As a result"]}]}},
  {type:"flow", title:"순서·삽입 풀이", steps:[{t:"① 끝 핵심 명사 ○",d:"주어진 글"},{t:"② 받는 단락",d:"대명사 / the",hi:true},{t:"③ 첫 단락 확정",d:"선택지 2개로"},{t:"④ 연결어 방향",d:"However / For example"},{t:"⑤ 앞뒤 재독",d:"삽입 후 확인"}]}
 ],
 "eng-h2-write-summary": [
  {type:"table", title:"40~45번 정리", head:["문항","구성","방법"], rows:[["40 요약","(A) 조건 · (B) 결과","요약문 먼저, 동의어"],["41 제목","장문 1","주제 먼저 정하기"],["42 어휘","(a)~(e) 중 하나 반대","**후반** 밑줄 주의"],["43 순서","(A) 끝 인물·사건","연결 단서"],["44 지칭","he/she 바뀌는 지점","문단 첫 he/she 확인"],["45 일치","선택지 순서대로","—"]], note:"43~45번은 쉬우므로 시간이 부족하면 먼저 푼다."},
  {type:"flow", title:"요약문 풀이", steps:[{t:"① 요약문 읽기",d:"(A)(B) 품사·역할"},{t:"② 해당 문장 찾기"},{t:"③ 쉬운 칸 확정",d:"선택지 2개로",hi:true},{t:"④ 동의어 비교",d:"reduce → lower"}]},
  {type:"flow", title:"장문 43~45 풀이", steps:[{t:"① 인물 ♂/♀ 표시"},{t:"② 순서 먼저",d:"연결 단서",hi:true},{t:"③ he/she 밑줄",d:"읽으면서"},{t:"④ 일치",d:"선택지 순서대로"}]}
 ]
});
