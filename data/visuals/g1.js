// 중1 시각 자료 — 출처 차시: data/subjects/kor-g1.js, eng-g1.js, sci-g1.js, soc-g1.js (각 차시의 concept/pitfalls/points 사실만 사용, 교과서 그림 미사용)
window.DATA = window.DATA || {}; (window.DATA.visualsAdd = window.DATA.visualsAdd || []).push({

 /* ======================= 국어 1 · 문학 ======================= */
 "kor-g1-lit-poem": [
  {type:"table", title:"화자·운율·심상 한눈 정리", head:["요소","뜻","시험 포인트"], rows:[["화자","시 속에서 말하는 목소리","시인과 다를 수 있음"],["운율","읽을 때 느껴지는 가락","반복·음보·의성어"],["외형률","글자 수·음보 규칙적","정형시"],["내재율","자유시에서 느껴짐","자유시도 운율 있음"],["심상","시어가 떠올리는 감각","공감각 판별"]], note:"화자의 처지·태도·어조가 시의 분위기와 주제를 결정한다."},
  {type:"compare", title:"공감각적 심상 vs 복합 감각", items:[{name:"공감각적 심상",points:["한 감각을 **다른 감각으로 표현**","'푸른 종소리'(청각→시각)","'달콤한 목소리'(청각→미각)"]},{name:"복합 감각",points:["두 감각이 **나란히** 있음","'차가운 바람 소리'","감각을 옮겨 표현한 것이 아님"]}]},
  {type:"tree", title:"심상(이미지)의 종류", root:{t:"심상", children:[{t:"시각"},{t:"청각"},{t:"후각"},{t:"미각"},{t:"촉각"},{t:"공감각",children:["감각 옮김"]}]}, note:"가장 흔한 변별 문항: 선지 네 개의 감각을 가르고 공감각적 심상 찾기."}
 ],
 "kor-g1-lit-novel": [
  {type:"table", title:"소설 핵심 개념 정리", head:["개념","내용"], rows:[["구성 3요소","인물·사건·배경"],["배경의 종류","시간적·공간적·사회적"],["인물 유형","주동/반동, 평면적/입체적"],["직접 제시","서술자가 성격을 설명"],["간접 제시","말·행동·외모로 보여 줌"],["갈등","내적 갈등 / 외적 갈등"]], note:"주동 인물 = 사건을 이끄는 인물(선악과 무관). 반동 인물 = 주동 인물과 맞서는 인물."},
  {type:"flow", title:"소설의 구성 단계", steps:[{t:"발단",d:"인물·배경 소개"},{t:"전개",d:"갈등 시작"},{t:"위기",d:"갈등 깊어짐·긴장"},{t:"절정",d:"갈등 최고조·전환",hi:true},{t:"결말",d:"해결·여운"}], dir:"h", note:"절정은 갈등이 가장 팽팽해지며 방향이 바뀌는 지점, 결말은 갈등이 풀리는 부분. '해결 장면'을 절정으로 쓰면 감점."},
  {type:"compare", title:"갈등의 종류", items:[{name:"내적 갈등",points:["한 인물 **마음속**의 갈등"]},{name:"외적 갈등",points:["인물 ↔ 인물","인물 ↔ 사회","인물 ↔ 운명(자연)"]}], note:"서술형은 갈등의 종류·원인·해결 세 요소를 모두 쓴다."}
 ],

 /* ======================= 국어 1 · 문법 ======================= */
 "kor-g1-gram-lang": [
  {type:"table", title:"언어의 특성 5가지", head:["특성","뜻","사례"], rows:[["자의성","소리와 뜻이 필연적 아님","나무 / tree"],["사회성","약속이라 개인이 못 바꿈","마음대로 바꾸면 소통 X"],["역사성","생기고 변하고 사라짐","옛말 '온(百)' 사라짐"],["규칙성","문법이 있음","어순·활용 규칙"],["창조성","처음 듣는 문장도 이해","새 문장 만들기"]], note:"자의성 vs 사회성: 한 사례에 둘이 같이 나오면 묻는 초점을 본다."},
  {type:"tree", title:"국어의 음운 체계", root:{t:"음운(뜻 구별 최소 단위)", children:[{t:"자음 19개",children:["소리 나는 위치","소리 내는 방법","소리의 세기"]},{t:"모음 21개",children:["단모음 10","이중 모음 11"]}]}, note:"단모음 분류: 혀의 앞뒤(전설·후설)·혀의 높이(고·중·저)·입술 모양(평순·원순). 이중 모음은 발음 도중 입 모양이 바뀜."},
  {type:"table", title:"한글 제자 원리", head:["구분","기본자","원리","만든 글자"], rows:[["자음","ㄱㄴㅁㅅㅇ","발음 기관 상형","가획: ㅋ·ㄷ·ㅂ 등"],["모음","ㆍㅡㅣ","하늘·땅·사람 상형","합성: 나머지 모음"]], note:"소리의 세기: ㄱ(예사)–ㄲ(된)–ㅋ(거센). ㅅ은 된소리 ㅆ만 있고 거센소리가 없다. '닭'은 글자 하나, 음운은 넷."}
 ],
 "kor-g1-gram-pos": [
  {type:"table", title:"아홉 품사 정리", head:["기능","품사","형태"], rows:[["체언","명사·대명사·수사","불변어"],["용언","동사·형용사","가변어"],["수식언","관형사·부사","불변어"],["관계언","조사","불변어('이다'만 가변)"],["독립언","감탄사","불변어"]], note:"분류 기준 세 가지 = 형태(불변어/가변어)·기능(다섯 갈래)·의미(아홉 품사)."},
  {type:"tree", title:"품사 분류 체계", root:{t:"단어(아홉 품사)", children:[{t:"체언",children:["명사","대명사","수사"]},{t:"용언",children:["동사","형용사"]},{t:"수식언",children:["관형사","부사"]},{t:"관계언",children:["조사"]},{t:"독립언",children:["감탄사"]}]}},
  {type:"compare", title:"헷갈리는 품사 판별법", items:[{name:"동사 vs 형용사",points:["'-ㄴ다/-는다' 되면 **동사**","명령·청유 되면 동사","'*예쁜다' 안 되면 형용사"]},{name:"수사 vs 수 관형사",points:["조사가 붙으면 **체언**(수사)","'둘이 왔다' → 수사","'두 사람' → 관형사"]},{name:"조사 vs 의존 명사",points:["앞말이 체언이면 조사","앞말이 관형어면 의존 명사","'너만큼' / '먹을 만큼'"]}]}
 ],
 "kor-g1-gram-meaning": [
  {type:"table", title:"단어의 의미 관계 정리", head:["관계","뜻","예"], rows:[["유의 관계","뜻이 비슷, 느낌은 다름","죽다–돌아가시다"],["반의 관계","한 가지 요소만 대립","남자–여자"],["상하 관계","한 단어가 다른 것 포함","꽃(상위어)⊃장미"],["다의어","여러 뜻이 관련, 표제어 1","손: 신체→일손"],["동음이의어","소리만 같고 뜻 무관","배: 신체·과일·선박"]], note:"어휘의 체계: 고유어(하늘·마음)·한자어(학교·친구)·외래어(버스·피아노)."},
  {type:"compare", title:"반의어의 세 종류", items:[{name:"상보 반의어",points:["**중간이 없음**","살다–죽다"]},{name:"정도 반의어",points:["정도가 있음","크다–작다"]},{name:"방향 반의어",points:["방향이 반대","가다–오다"]}], note:"반의어는 하나뿐이 아니다: '벗다' ↔ 입다·쓰다·신다처럼 상황에 따라 여럿."},
  {type:"compare", title:"다의어 vs 동음이의어", items:[{name:"다의어",points:["뜻 사이에 **관련** 있음","사전에 한 표제어, 번호로 구분","손: 신체 → 일손 → 손길"]},{name:"동음이의어",points:["소리만 같고 뜻 **무관**","사전에 **별개 표제어**","다리(신체) / 다리(교량)"]}]}
 ],

 /* ======================= 국어 1 · 읽기 ======================= */
 "kor-g1-read-summary": [
  {type:"table", title:"요약 규칙 네 가지", head:["규칙","하는 일","예"], rows:[["삭제","세부·반복·예시 빼기","예시 문장 지우기"],["선택","중심 문장 고르기","문단의 핵심 문장"],["일반화","상위어 하나로 묶기","사과·배·감→과일"],["재구성","중심 문장 새로 만들기","중심 문장 없을 때"]], note:"일반화 vs 삭제: 세부 항목을 아예 빼면 삭제, 상위어로 묶으면 일반화."},
  {type:"flow", title:"읽기 과정 점검", steps:[{t:"읽기 전",d:"제목·그림 예측, 목적"},{t:"읽는 중",d:"질문·밑줄·메모",hi:true},{t:"읽은 후",d:"요약·평가"}], dir:"h", note:"어려우면 되돌아 읽고 속도·방법을 조정한다."},
  {type:"table", title:"글의 구조와 전개 방식", head:["부분","역할"], rows:[["처음","화제 제시"],["중간","내용 전개"],["끝","정리"],["중간의 전개 방식","나열·순서·비교·대조"],["","원인–결과·문제–해결"]], note:"구조를 알면 요약의 틀이 정해진다. 첫 문장이 늘 중심 문장은 아니다."}
 ],
 "kor-g1-read-explain": [
  {type:"table", title:"설명 방법 8가지", head:["방법","뜻","표지·예"], rows:[["정의","뜻을 규정","'~은 ~이다'"],["예시","구체적 예 들기","표지 없어도 예시"],["비교 / 대조","공통점 / 차이점","둘을 견줌"],["분류","기준에 따라 종류로","악기→현·관·타악기"],["분석","전체를 부분으로","기타→몸통·줄·헤드"],["인과 / 과정","원인–결과 / 순서대로","변화·현상 설명"]]},
  {type:"compare", title:"분류 vs 분석 (가장 많이 틀림)", items:[{name:"분류",points:["'**종류**'로 나눔","나눈 것이 각각 독립된 종류","악기 → 현악기·관악기·타악기"]},{name:"분석",points:["'**부분**'으로 나눔","합쳐야 하나가 되는 부품","기타 → 몸통·줄·헤드"]}]},
  {type:"table", title:"대상에 맞는 설명 방법", head:["대상","알맞은 방법"], rows:[["낯선 개념","정의·예시"],["비슷한 두 대상","비교·대조"],["종류가 많은 대상","분류"],["짜임이 있는 대상","분석"],["변화·현상","인과·과정"]], note:"설명하는 글은 객관적·정확·명료하게. '정말 멋지다' 같은 주관적 표현은 쓰지 않는다."}
 ],

 /* ======================= 국어 1 · 쓰기·화법·매체 ======================= */
 "kor-g1-write-exp": [
  {type:"table", title:"경험을 담은 글 요약", head:["항목","내용"], rows:[["갈래","수필·생활문·편지·일기"],["좋은 글감","마음이 움직인 작은 순간"],["진솔한 표현","행동·장면으로 보여 주기"],["글의 뼈대","정서의 변화 흐름"],["공유 점검","개인 정보·사생활·비속어"]], note:"경험만 나열하면 생활문이 아니라 일정표. 그 일이 나에게 무엇을 남겼는지가 핵심."},
  {type:"flow", title:"경험 글 쓰기 구성", steps:[{t:"경험 고르기"},{t:"감정·생각 정리",d:"그때 감정, 지금 생각"},{t:"장면 중심 배열",d:"시간순 / 인상 깊은 장면",hi:true},{t:"깨달음·변화",d:"마무리"}], dir:"h"},
  {type:"compare", title:"감정 표현 고치기", items:[{name:"형용사로만 말함 (X)",points:["'너무너무 슬펐다'","'기뻤다·슬펐다'","독자가 같이 느끼지 못함"]},{name:"장면·행동으로 보여 줌 (O)",points:["'밥이 넘어가지 않았다'","대화 삽입·감각적 표현","짧은 문장으로 긴장"]}], note:"표현은 느낌을 또렷이 전하는 수단이지 장식이 아니다."}
 ],
 "kor-g1-speak-talk": [
  {type:"table", title:"공감하는 반응 vs 비공감 반응", head:["구분","예"], rows:[["공감 반응","'속상했겠다'(감정 읽기)"],["되짚어 확인","'그러니까 ~라는 거지?'"],["평가·충고 (X)","'공부 좀 하지'"],["화제 돌리기 (X)","'나는 더 망쳤어'"],["무시 (X)","반응 없음"]], note:"공감 ≠ 동의. '네 말이 다 맞아'는 공감이 아니라 동의."},
  {type:"flow", title:"토의 절차", steps:[{t:"문제 확인"},{t:"원인·방안 제시"},{t:"방안 검토",d:"장단점·실현 가능성",hi:true},{t:"최선의 대안 결정"}], dir:"h", note:"다수결로 바로 결정하지 않는다. 검토한 뒤 합의하며 표결은 마지막 수단."},
  {type:"compare", title:"토의 vs 토론", items:[{name:"토의",points:["공동 문제의 **대안 마련**","협력이 목적","예: 학교 축제 프로그램 정하기"]},{name:"토론",points:["**찬반**으로 나뉘어 겨룸","경쟁","예: 교복 폐지 찬반"]}]}
 ],
 "kor-g1-media-compare": [
  {type:"table", title:"대중매체 vs 개인 인터넷 방송", head:["기준","대중매체","개인 인터넷 방송"], rows:[["생산자","전문 조직","개인"],["소통 방향","한 방향","쌍방향(댓글·채팅)"],["검증","취재·편집·검증 절차","검증 절차 약함"],["신뢰성","높음","선정성·광고 문제"],["소재","-","다양·개성적"],["참여","수용자 참여 낮음","참여 높음"]], note:"대중매체도 오보·편향이 있고 개인 방송도 전문가 채널이 있다. 기준은 검증 절차와 출처."},
  {type:"compare", title:"신뢰성 vs 영향력", items:[{name:"신뢰성",points:["정보가 **확인**되었는가","검증 절차·출처"]},{name:"영향력",points:["퍼지는 **범위**","구독자 많다고 믿을 만한 것 아님"]}]},
  {type:"flow", title:"매체 자료 제작 과정 성찰", steps:[{t:"누가 볼까",d:"수용자 예상"},{t:"상처받는 사람?",d:"초상권·저작권·개인 정보",hi:true},{t:"올린 뒤 반응 보기"},{t:"고치기"}], dir:"h", note:"표현의 자유는 타인의 권리(초상권·명예·개인 정보)를 침해하지 않는 범위 안에서."}
 ],

 /* ======================= 영어 1 · be동사·일반동사 ======================= */
 "eng-g1-verb-be": [
  {type:"table", title:"주어별 be동사와 축약", head:["주어","be동사","축약"], rows:[["I","am","I'm"],["You / We / They","are","You're / We're"],["He / She / It","is","He's / She's / It's"],["단수 명사","is","My brother is"],["복수 명사","are","The books are"]], note:"It's(= It is)와 its(그것의)는 다른 말. am not은 줄여 쓰지 않는다(amn't 없음)."},
  {type:"flow", title:"긍정문 → 부정문 → 의문문", steps:[{t:"She is busy",d:"긍정문"},{t:"She isn't busy",d:"be 뒤에 not"},{t:"Is she busy?",d:"be를 주어 앞으로",hi:true},{t:"Yes, she is",d:"대답은 대명사로"}], dir:"h", note:"Is Tom …? → Yes, he is. (your sister is ×)"},
  {type:"table", title:"be동사 뒤에 오는 말", head:["종류","뜻","예"], rows:[["명사","직업·신분","He is a student."],["형용사","상태·감정","He is happy."],["장소(전치사구)","…에 있다","He is in the room."]], note:"I am like pizza (X) → I like pizza. '좋아하다'는 동작이므로 be동사가 필요 없다."}
 ],
 "eng-g1-verb-do": [
  {type:"table", title:"3인칭 단수 현재 동사 변화", head:["끝 형태","규칙","예"], rows:[["대부분","+s","plays, likes"],["-s/-sh/-ch/-x/-o","+es","passes, goes"],["자음 + y","y → ies","study → studies"],["모음 + y","+s","plays"],["예외","have → has","do → does"]], note:"주어가 he/she/it으로 바꿀 수 있을 때만 -s. My parents works (X) → work."},
  {type:"flow", title:"일반동사 부정문·의문문", steps:[{t:"He runs",d:"긍정문"},{t:"He doesn't run",d:"doesn't + 원형",hi:true},{t:"Does he run?",d:"Does + 주어 + 원형"},{t:"Yes, he does",d:"No, he doesn't"}], dir:"h", note:"Does he likes (X): -s는 does가 이미 가져갔다. She haves (X) → has, doesn't have (hasn't ×)."},
  {type:"compare", title:"be동사 문장 vs 일반동사 문장", items:[{name:"be동사 문장",points:["Is she a nurse?","부정: is **not**","be를 주어 앞으로"]},{name:"일반동사 문장",points:["**Does** she play the piano?","부정: don't / doesn't + 원형","Do/Does + 주어 + 원형"]}]}
 ],

 /* ======================= 영어 1 · 의문사·명령문 ======================= */
 "eng-g1-ask-wh": [
  {type:"table", title:"의문사 6가지", head:["의문사","뜻","대답 예"], rows:[["what","무엇","What do you want?"],["who","누구","Who teaches English?"],["where","어디","He's in the library."],["when","언제","When does it start?"],["why","왜","이유로 대답"],["how","어떻게","방법·상태"]], note:"의문사 의문문은 Yes/No로 대답하지 않는다."},
  {type:"table", title:"how + 형용사/부사", head:["표현","묻는 것","주의"], rows:[["how old","나이",""],["how many","수","+ 복수 명사"],["how much","양·가격","셀 수 없는 명사"],["how often","빈도",""],["how long","기간",""]], note:"How many book (X) → books. what + 명사 / which + 명사(정해진 것 중) / whose + 명사."},
  {type:"compare", title:"의문사 뒤 어순", items:[{name:"be동사",points:["의문사 + **be + 주어**?","Where **is** my bag?"]},{name:"일반동사",points:["의문사 + **do/does + 주어** + 원형?","When **does** the class start?"]},{name:"주어를 묻는 who/what",points:["do를 쓰지 **않음**","Who **teaches** English?","who는 단수 취급"]}], note:"Where you are going? (X) → Where are you going?"}
 ],
 "eng-g1-ask-imp": [
  {type:"table", title:"명령문·Let's·There is 정리", head:["문장","형태","예"], rows:[["명령문","동사원형으로 시작","Open the window."],["be동사 명령","Be + …","Be quiet."],["부정 명령문","Don't + 동사원형","Don't be late."],["제안","Let's + 동사원형","Let's go out."],["제안 부정","Let's not + 원형","Let's not go."]], note:"Are careful (X) → Be careful. Don't let's (X) → Let's not."},
  {type:"compare", title:"There is vs There are", items:[{name:"There is",points:["+ **단수** 명사","+ 셀 수 없는 명사","There is a cat on the sofa."]},{name:"There are",points:["+ **복수** 명사","There are two cats.","There is three apples (X)"]}], note:"수는 뒤에 오는 명사로 정한다. 이때 there는 '거기'가 아니라 문장을 여는 말."},
  {type:"table", title:"There is의 부정·의문", head:["종류","형태","예"], rows:[["부정","There isn't / aren't","There isn't a bank."],["의문","Is there …?","Is there a bank?"],["대답","Yes, there is.","No, there isn't."]]}
 ],

 /* ======================= 영어 1 · 시제·조동사 ======================= */
 "eng-g1-tense-prog": [
  {type:"table", title:"-ing 만들기", head:["끝 형태","규칙","예"], rows:[["대부분","+ ing","read → reading"],["-e로 끝남","e 빼고 + ing","make → making"],["단모음 + 단자음","자음 한 번 더","run → running"],["-ie로 끝남","ie → ying","lie → lying"]], note:"comeing (X) → coming, stoping (X) → stopping."},
  {type:"compare", title:"현재 vs 현재진행", items:[{name:"현재(He plays)",points:["평소 **습관**·사실","단서: every day, usually"]},{name:"현재진행(He is playing)",points:["**지금** 하는 중","단서: now, right now, Look!","be + -ing 둘 다 필요"]}], note:"She studying now (X) → She is studying."},
  {type:"table", title:"진행형으로 안 쓰는 동사(상태)", head:["동사","틀림","맞음"], rows:[["know","I am knowing (X)","I know"],["want","I'm wanting (X)","I want"],["like / love","진행형 불가","I like"],["have(가지다)","진행형 불가","have가 '먹다'면 가능"]], note:"부정: be + not + -ing. 의문: be를 앞으로 — Are you listening? Yes, I am."}
 ],
 "eng-g1-tense-past": [
  {type:"table", title:"규칙 과거형 철자", head:["끝 형태","규칙","예"], rows:[["대부분","+ ed","played"],["-e로 끝남","+ d","liked"],["자음 + y","y → ied","studied"],["단모음 + 단자음","자음 추가 + ed","stopped, planned"]], note:"주어가 누구든 형태 하나. be동사 과거: am/is → was, are → were."},
  {type:"table", title:"불규칙 과거형(외우기)", head:["원형","과거","원형","과거"], rows:[["go","went","come","came"],["see","saw","eat","ate"],["have","had","do","did"],["make","made","take","took"],["get","got","buy","bought"],["read","read[red]","put","put"]], note:"goed, eated, buyed (X)."},
  {type:"flow", title:"과거 부정문·의문문", steps:[{t:"I went there.",d:"긍정"},{t:"I didn't go.",d:"didn't + 원형",hi:true},{t:"Did you go?",d:"Did + 주어 + 원형"},{t:"Yes, I did.",d:"대답"}], dir:"h", note:"Did you went? (X) / didn't ate (X). 단서: yesterday, last ~, ~ ago, in 2020, then."}
 ],
 "eng-g1-tense-fut": [
  {type:"table", title:"미래·조동사 정리", head:["표현","뜻","부정"], rows:[["will + 원형","…할 것이다(예측)","will not = won't"],["be going to + 원형","…할 예정(계획)","be + not"],["can + 원형","능력·허가","cannot = can't"],["must + 원형","의무(= have to)","must not(금지)"]], note:"can = be able to, must = have to로 바꿔 쓸 수 있다."},
  {type:"compare", title:"mustn't vs don't have to", items:[{name:"must not(mustn't)",points:["**금지**: …하면 안 된다","You mustn't go. = 가면 안 된다"]},{name:"don't have to",points:["**불필요**: …할 필요 없다","'학교에 안 가도 돼' → don't have to go"]}]},
  {type:"table", title:"조동사 공통 규칙 3", head:["규칙","틀림","맞음"], rows:[["뒤는 항상 동사원형","He will goes (X)","He will go"],["3인칭 단수 -s 없음","He cans (X)","He can"],["조동사 두 개 연달아 X","will can (X)","will be able to"]], note:"I going to study (X) → I am going to study."}
 ],

 /* ======================= 영어 1 · 형용사·비교·독해 ======================= */
 "eng-g1-descread-adj": [
  {type:"table", title:"형용사 vs 부사 자리", head:["구분","자리","예"], rows:[["형용사","명사 앞","a tall boy"],["형용사","be동사 뒤","The boy is tall."],["형용사","-thing/-one 뒤","something cold"],["부사","동사·형용사·부사 꾸밈","He runs quickly."],["good → well","부사는 well","plays soccer well"]], note:"형태 같은 부사: fast, hard, early, late, high. lovely·friendly·lonely는 형용사, hardly = 거의 …않다."},
  {type:"flow", title:"빈도부사(많음 → 적음)", steps:[{t:"always",d:"항상"},{t:"usually"},{t:"often"},{t:"sometimes"},{t:"never",d:"결코 …않다"}], dir:"h", note:"위치: be동사 뒤, 일반동사 앞. She is always kind. / He never eats fast food."},
  {type:"table", title:"수량 표현", head:["표현","함께 쓰는 명사","뜻"], rows:[["many","셀 수 있는 복수","많은"],["much","셀 수 없는","많은"],["a lot of = lots of","둘 다","많은"],["a few / few","복수","조금 있다 / 거의 없다"],["a little / little","셀 수 없는","조금 있다 / 거의 없다"]]}
 ],
 "eng-g1-descread-comp": [
  {type:"table", title:"비교급·최상급 규칙 변화", head:["형태","비교급","최상급"], rows:[["1음절","tall → taller","tallest"],["-e로 끝남","large → larger","largest"],["자음 + y","happy → happier","happiest"],["단모음 + 단자음","big → bigger","biggest"],["긴 단어","more beautiful","the most famous"]], note:"more taller (X), beautifuler (X), famouser (X)."},
  {type:"table", title:"불규칙 변화", head:["원급","비교급","최상급"], rows:[["good / well","better","best"],["bad","worse","worst"],["many / much","more","most"],["little","less","least"]], note:"more better (X) → better. 비교급 강조는 much/even/far(very ×)."},
  {type:"compare", title:"비교 표현 세 가지", items:[{name:"비교급 + than",points:["…보다 더 ~한","Tom is taller **than** Jin."]},{name:"the + 최상급",points:["…중 가장 ~한","**the** tallest **in** my class","**of** the three"]},{name:"as + 원급 + as",points:["…만큼 ~한","not as ~ as = …만큼 ~하지 않다"]}]}
 ],
 "eng-g1-descread-read": [
  {type:"table", title:"독해 문제 유형별 전략", head:["유형","어디를 보나","주의"], rows:[["주제(topic)","가장 자주 반복되는 말","첫·마지막 문장"],["요지","'I think ~' 문장","예시는 요지 아님"],["세부 정보","이름·숫자·시간·장소","없는 내용은 알 수 없음"],["대명사","바로 앞 문장의 명사","단수·복수 확인"],["글의 종류","형식(Dear ~, Today I)","목적이 보임"]]},
  {type:"flow", title:"세부 정보 일치·불일치 풀이", steps:[{t:"보기 핵심어 찾기",d:"이름·숫자·시간·장소"},{t:"지문에서 밑줄",d:"1:1 대조",hi:true},{t:"변형 확인",d:"숫자·시간·부정어"},{t:"없는 내용 = 알 수 없음"}], dir:"h"},
  {type:"table", title:"글의 종류와 단서", head:["종류","단서","목적"], rows:[["일기","Today I …, 과거형","하루 기록"],["편지·이메일","Dear ~ / From ~","알리기·초대·부탁"],["안내문","날짜·장소·시간","알리기"]]}
 ],

 /* ======================= 과학 1 · 생물의 구성과 다양성 ======================= */
 "sci-g1-cell": [
  {type:"table", title:"동물 세포 vs 식물 세포", head:["구조","역할","동물","식물"], rows:[["핵","유전 물질·생명 활동 조절","○","○"],["세포막","물질 출입 조절","○","○"],["세포질","생명 활동 장소","○","○"],["미토콘드리아","에너지 생성","○","○"],["세포벽","보호·모양 유지","×","○"],["엽록체","광합성","×","○"]], note:"세포막은 모든 세포에, 세포벽은 식물 세포에만. 식물 세포는 세포벽 안쪽에 세포막도 있다. 발달한 액포(물·노폐물 저장)도 식물 세포."},
  {type:"svg", title:"식물 세포 개략도", svg:"<svg viewBox='0 0 360 230' role='img' aria-label='식물 세포 개략도'><rect x='30' y='20' width='230' height='190' rx='8' fill='none' stroke='var(--ink)' stroke-width='4'/><rect x='42' y='32' width='206' height='166' rx='6' fill='none' stroke='var(--acc)' stroke-width='1.5' stroke-dasharray='4 3'/><circle cx='100' cy='80' r='26' fill='none' stroke='var(--ink)' stroke-width='2'/><circle cx='100' cy='80' r='6' fill='var(--ink)'/><ellipse cx='175' cy='150' rx='48' ry='30' fill='none' stroke='var(--line)' stroke-width='2'/><ellipse cx='190' cy='60' rx='14' ry='8' fill='var(--acc)' opacity='.8'/><ellipse cx='215' cy='95' rx='14' ry='8' fill='var(--acc)' opacity='.8'/><ellipse cx='70' cy='150' rx='14' ry='8' fill='var(--acc)' opacity='.8'/><line x1='262' y1='40' x2='290' y2='40' stroke='var(--ink)'/><text x='294' y='44' font-size='12' fill='var(--ink)'>세포벽</text><line x1='248' y1='120' x2='290' y2='120' stroke='var(--acc)'/><text x='294' y='124' font-size='12' fill='var(--ink)'>세포막</text><text x='100' y='122' text-anchor='middle' font-size='12' fill='var(--ink)'>핵</text><text x='175' y='154' text-anchor='middle' font-size='12' fill='var(--ink)'>액포</text><text x='215' y='112' text-anchor='middle' font-size='12' fill='var(--acc)'>엽록체</text><text x='145' y='200' text-anchor='middle' font-size='12' fill='var(--ink)'>세포질</text></svg>", note:"세포벽·엽록체·발달한 액포는 식물 세포에만 있다."},
  {type:"compare", title:"생물의 구성 단계", items:[{name:"동물",points:["세포 → 조직 → 기관","→ **기관계** → 개체","예: 위·소장이 모인 소화계"]},{name:"식물",points:["세포 → 조직 → **조직계**","→ 기관 → 개체","예: 표피·관다발 조직이 모인 조직계"]}], note:"현미경 배율 = 접안렌즈 × 대물렌즈(10 × 40 = 400배, 더하지 않음). 상은 상하좌우가 거꾸로 — 물체를 오른쪽으로 보내려면 표본을 왼쪽으로. 고배율일수록 시야가 좁고 어둡다."}
 ],
 "sci-g1-biodiv": [
  {type:"table", title:"생물의 5계", head:["계","핵","특징","예"], rows:[["원핵생물계","없음","핵 없는 단세포","세균"],["원생생물계","있음","다양한 생물","아메바·짚신벌레·미역"],["균계","있음","몸 밖에서 분해해 흡수","버섯·곰팡이"],["식물계","있음","광합성","식물"],["동물계","있음","다른 생물을 먹음","동물"]], note:"버섯·곰팡이는 광합성을 하지 않으므로 균계. 미역·다시마는 원생생물계."},
  {type:"flow", title:"분류 단계(작은 단위 → 큰 단위)", steps:[{t:"종"},{t:"속"},{t:"과"},{t:"목"},{t:"강"},{t:"문"},{t:"계",hi:true}], dir:"v", note:"계가 가장 크고 종이 가장 작다(종속과목강문계). 같은 속 생물이 같은 과 생물보다 더 가깝다."},
  {type:"compare", title:"생물다양성의 세 측면", items:[{name:"종의 다양성",points:["한 지역에 사는 생물 종의 다양함"]},{name:"유전적 다양성",points:["같은 종 안의 **변이**","무당벌레 점무늬·달팽이 껍데기 색"]},{name:"생태계의 다양성",points:["사막·갯벌·숲 등"]}], note:"종 = 자연 상태에서 짝짓기하여 생식 능력이 있는 자손을 낳는 무리. 노새는 새끼를 못 낳으므로 말과 당나귀는 다른 종."}
 ],

 /* ======================= 과학 1 · 열 ======================= */
 "sci-g1-heat-transfer": [
  {type:"table", title:"열의 이동 세 가지", head:["방식","어디서","원리","사례"], rows:[["전도","주로 고체","이웃 입자의 충돌","쇠숟가락이 뜨거워짐"],["대류","액체·기체","뜨거운 부분이 위로","난방기 아래, 에어컨 위"],["복사","물질 없이","열이 직접 전달","태양열, 난로 앞 얼굴"]], note:"뜨거운 국의 숟가락은 전도, 국 자체가 데워지는 것은 대류. 금속은 전도가 빠르고 나무·플라스틱·공기는 느리다."},
  {type:"compare", title:"온도 vs 열 vs 열평형", items:[{name:"온도",points:["입자 운동이 얼마나 활발한지(℃)","**상태**를 나타냄"]},{name:"열",points:["높은 물체 → 낮은 물체로 **이동하는 에너지**","'온도가 이동한다'는 틀림"]},{name:"열평형",points:["온도가 같아져 열 이동이 멈춤","잃은 열 = 얻은 열","같은 물질·질량일 때만 중간값"]}], note:"80 ℃ 물 + 20 ℃ 물을 같은 양 섞으면 50 ℃."},
  {type:"svg", title:"보온병의 단열 원리", svg:"<svg viewBox='0 0 320 230' role='img' aria-label='보온병 단열'><rect x='60' y='20' width='120' height='190' rx='14' fill='none' stroke='var(--ink)' stroke-width='3'/><rect x='78' y='38' width='84' height='160' rx='10' fill='none' stroke='var(--acc)' stroke-width='3'/><rect x='88' y='48' width='64' height='140' rx='8' fill='var(--acc)' opacity='.12'/><text x='120' y='122' text-anchor='middle' font-size='12' fill='var(--ink)'>내용물</text><line x1='69' y1='110' x2='40' y2='110' stroke='var(--line)' stroke-width='1.5'/><text x='36' y='104' text-anchor='end' font-size='12' fill='var(--ink)'>진공</text><text x='36' y='120' text-anchor='end' font-size='12' fill='var(--ink)'>전도·대류</text><text x='36' y='134' text-anchor='end' font-size='12' fill='var(--ink)'>차단</text><line x1='162' y1='80' x2='200' y2='80' stroke='var(--acc)' stroke-width='1.5'/><text x='204' y='76' font-size='12' fill='var(--acc)'>은도금</text><text x='204' y='92' font-size='12' fill='var(--ink)'>복사 차단</text><line x1='180' y1='170' x2='200' y2='170' stroke='var(--ink)' stroke-width='1.5'/><text x='204' y='174' font-size='12' fill='var(--ink)'>바깥 벽</text></svg>", note:"단열 = 전도·대류·복사 세 이동을 막는 것."}
 ],
 "sci-g1-specific-heat": [
  {type:"table", title:"비열과 열팽창 요약", head:["항목","내용"], rows:[["비열","1 kg을 1 ℃ 높이는 열량"],["단위","kcal/(kg·℃)"],["물의 비열","1(매우 큼)"],["비열 작으면","같은 열량에 온도 많이 변함"],["열팽창","입자 사이 거리 ↑, 부피 ↑"],["팽창 정도","고체 < 액체 < 기체"]], note:"비열이 큰 물질은 천천히 데워지고 천천히 식는다. 입자 자체의 크기·수는 변하지 않는다."},
  {type:"formula", title:"열량 공식", tex:"Q = c \\times m \\times \\Delta t", where:["Q 열량(kcal)","c 비열","m 질량(kg)","Δt 온도 변화(℃)"], note:"물 2 kg을 20 ℃ → 30 ℃: 1 × 2 × 10 = 20 kcal. Δt에 최종 온도(30)를 넣으면 안 된다."},
  {type:"compare", title:"해풍 vs 육풍 / 바이메탈", items:[{name:"낮(해풍)",points:["모래(비열 작음)가 빨리 데워짐","바다 → 육지로 바람"]},{name:"밤(육풍)",points:["모래가 빨리 식음","육지 → 바다로 바람"]},{name:"바이메탈",points:["열팽창 정도가 다른 두 금속","가열 시 **많이 팽창하는 금속이 바깥**","냉각하면 반대로 휨"]}], note:"물의 큰 비열 활용: 자동차 냉각수, 찜질 팩, 해안 지방의 작은 기온 변화."}
 ],

 /* ======================= 과학 1 · 물질의 상태 변화 ======================= */
 "sci-g1-particle-state": [
  {type:"table", title:"고체·액체·기체 비교", head:["구분","고체","액체","기체"], rows:[["모양","일정","변함","변함"],["부피","일정","일정","변함"],["입자 배열","규칙적, 제자리 진동","비교적 자유롭게 이동","매우 자유롭게 운동"],["입자 거리","가까움","비교적 가까움","매우 멂"],["압축","안 됨","거의 안 됨","잘 됨"]], note:"입자 사이 거리와 운동의 활발함: 고체 < 액체 < 기체. 기체만 압축이 잘 된다."},
  {type:"svg", title:"세 가지 상태의 입자 모형", svg:"<svg viewBox='0 0 400 170' role='img' aria-label='입자 모형'><rect x='10' y='20' width='110' height='110' rx='6' fill='none' stroke='var(--line)' stroke-width='1.5'/><g fill='var(--acc)'><circle cx='30' cy='40' r='7'/><circle cx='52' cy='40' r='7'/><circle cx='74' cy='40' r='7'/><circle cx='96' cy='40' r='7'/><circle cx='30' cy='62' r='7'/><circle cx='52' cy='62' r='7'/><circle cx='74' cy='62' r='7'/><circle cx='96' cy='62' r='7'/><circle cx='30' cy='84' r='7'/><circle cx='52' cy='84' r='7'/><circle cx='74' cy='84' r='7'/><circle cx='96' cy='84' r='7'/><circle cx='30' cy='106' r='7'/><circle cx='52' cy='106' r='7'/><circle cx='74' cy='106' r='7'/><circle cx='96' cy='106' r='7'/></g><text x='65' y='152' text-anchor='middle' font-size='13' font-weight='600' fill='var(--ink)'>고체</text><rect x='145' y='20' width='110' height='110' rx='6' fill='none' stroke='var(--line)' stroke-width='1.5'/><g fill='var(--acc)'><circle cx='165' cy='110' r='7'/><circle cx='185' cy='100' r='7'/><circle cx='206' cy='112' r='7'/><circle cx='228' cy='104' r='7'/><circle cx='172' cy='90' r='7'/><circle cx='196' cy='84' r='7'/><circle cx='218' cy='88' r='7'/><circle cx='238' cy='96' r='7'/><circle cx='180' cy='70' r='7'/><circle cx='204' cy='66' r='7'/><circle cx='228' cy='72' r='7'/><circle cx='162' cy='74' r='7'/></g><text x='200' y='152' text-anchor='middle' font-size='13' font-weight='600' fill='var(--ink)'>액체</text><rect x='280' y='20' width='110' height='110' rx='6' fill='none' stroke='var(--line)' stroke-width='1.5'/><g fill='var(--acc)'><circle cx='300' cy='40' r='7'/><circle cx='360' cy='52' r='7'/><circle cx='330' cy='80' r='7'/><circle cx='300' cy='112' r='7'/><circle cx='372' cy='104' r='7'/></g><text x='335' y='152' text-anchor='middle' font-size='13' font-weight='600' fill='var(--ink)'>기체</text></svg>", note:"상태가 달라도 입자의 종류·크기는 같고 배열과 거리만 다르다."},
  {type:"compare", title:"확산·증발·끓음", items:[{name:"확산",points:["입자가 **스스로 운동**해 퍼짐","온도 높을수록·입자 질량 작을수록 빠름","기체 > 액체 > 고체, 진공에서 더 빠름"]},{name:"증발",points:["액체 **표면**에서 기체가 됨","어느 온도에서나","온도↑·습도↓·바람↑·표면적↑"]},{name:"끓음",points:["**내부**에서도 기화","특정 온도(끓는점)에서"]}], note:"빨래가 마르는 것은 증발. 확산은 바람 때문이 아니다."}
 ],
 "sci-g1-state-change": [
  {type:"table", title:"상태 변화 6가지와 열에너지", head:["변화","방향","열에너지","사례"], rows:[["융해","고 → 액","흡수","아이스박스의 얼음"],["기화","액 → 기","흡수","땀이 증발해 시원함"],["승화","고 → 기","흡수","드라이아이스로 냉장"],["응고","액 → 고","방출","이글루 벽에 물 뿌리기"],["액화","기 → 액","방출","수증기 화상, 이슬"],["승화","기 → 고","방출","서리·성에"]], note:"흡수 → 주위가 차가워짐, 방출 → 주위가 따뜻해짐. 서리·성에는 승화(기→고)이지 응고가 아니다. 질량은 불변, 부피만 변한다(물은 얼면 부피 ↑)."},
  {type:"svg", title:"상태 변화 삼각형", svg:"<svg viewBox='0 0 360 230' role='img' aria-label='상태 변화'><defs><marker id='scA' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto'><path d='M0 0L10 5L0 10z' fill='var(--ink)'/></marker></defs><rect x='140' y='14' width='80' height='36' rx='8' fill='none' stroke='var(--acc)' stroke-width='2'/><text x='180' y='37' text-anchor='middle' font-size='13' font-weight='600' fill='var(--ink)'>기체</text><rect x='20' y='170' width='80' height='36' rx='8' fill='none' stroke='var(--ink)' stroke-width='2'/><text x='60' y='193' text-anchor='middle' font-size='13' font-weight='600' fill='var(--ink)'>고체</text><rect x='260' y='170' width='80' height='36' rx='8' fill='none' stroke='var(--ink)' stroke-width='2'/><text x='300' y='193' text-anchor='middle' font-size='13' font-weight='600' fill='var(--ink)'>액체</text><line x1='108' y1='178' x2='252' y2='178' stroke='var(--ink)' stroke-width='1.5' marker-end='url(#scA)'/><text x='180' y='172' text-anchor='middle' font-size='12' fill='var(--ink)'>융해(흡수)</text><line x1='252' y1='198' x2='108' y2='198' stroke='var(--ink)' stroke-width='1.5' marker-end='url(#scA)'/><text x='180' y='216' text-anchor='middle' font-size='12' fill='var(--ink)'>응고(방출)</text><line x1='292' y1='162' x2='220' y2='56' stroke='var(--ink)' stroke-width='1.5' marker-end='url(#scA)'/><text x='292' y='104' font-size='12' fill='var(--ink)'>기화(흡수)</text><line x1='208' y1='60' x2='278' y2='164' stroke='var(--ink)' stroke-width='1.5' marker-end='url(#scA)'/><text x='214' y='140' font-size='12' fill='var(--ink)'>액화(방출)</text><line x1='68' y1='162' x2='140' y2='56' stroke='var(--ink)' stroke-width='1.5' marker-end='url(#scA)'/><text x='22' y='104' font-size='12' fill='var(--ink)'>승화(흡수)</text><line x1='152' y1='60' x2='82' y2='164' stroke='var(--ink)' stroke-width='1.5' marker-end='url(#scA)'/><text x='88' y='140' font-size='12' fill='var(--ink)'>승화(방출)</text></svg>", note:"기화에는 증발과 끓음이 있다."},
  {type:"svg", title:"가열 곡선 — 수평 구간의 뜻", svg:"<svg viewBox='0 0 400 220' role='img' aria-label='가열 곡선'><line x1='40' y1='190' x2='380' y2='190' stroke='var(--line)' stroke-width='1.5'/><line x1='40' y1='190' x2='40' y2='20' stroke='var(--line)' stroke-width='1.5'/><text x='380' y='208' text-anchor='end' font-size='12' fill='var(--ink)'>가열 시간</text><text x='44' y='18' font-size='12' fill='var(--ink)'>온도</text><polyline points='40,180 100,130 180,130 240,70 320,70 370,30' fill='none' stroke='var(--acc)' stroke-width='2.5'/><line x1='40' y1='130' x2='100' y2='130' stroke='var(--line)' stroke-dasharray='3 3'/><line x1='40' y1='70' x2='240' y2='70' stroke='var(--line)' stroke-dasharray='3 3'/><text x='36' y='134' text-anchor='end' font-size='12' fill='var(--ink)'>녹는점</text><text x='36' y='74' text-anchor='end' font-size='12' fill='var(--ink)'>끓는점</text><text x='68' y='170' text-anchor='middle' font-size='12' fill='var(--ink)'>고체</text><text x='140' y='122' text-anchor='middle' font-size='12' fill='var(--ink)'>고체+액체</text><text x='210' y='112' text-anchor='middle' font-size='12' fill='var(--ink)'>액체</text><text x='280' y='62' text-anchor='middle' font-size='12' fill='var(--ink)'>액체+기체</text><text x='350' y='60' text-anchor='middle' font-size='12' fill='var(--ink)'>기체</text></svg>", note:"수평 구간에서도 열은 계속 받지만 상태 변화에 쓰여 온도가 오르지 않는다. 녹는점 = 어는점, 물질마다 고유."}
 ],

 /* ======================= 과학 1 · 힘의 작용 ======================= */
 "sci-g1-forces": [
  {type:"table", title:"여러 가지 힘 정리", head:["힘","방향","크기를 정하는 것"], rows:[["중력","지구 중심 방향","질량(무게 = 9.8×질량)"],["탄성력","변형 방향과 반대","변형이 클수록 큼"],["마찰력","운동 방향과 반대","거칠기·누르는 힘"],["부력","위","잠긴 부피(면적 무관)"]], note:"힘의 화살표: 길이 = 크기, 방향 = 힘의 방향, 시작점 = 작용점. 단위 N. 마찰력은 접촉 면적과 무관."},
  {type:"formula", title:"무게와 질량", tex:"W(\\text{N}) = 9.8 \\times m(\\text{kg})", where:["W 무게(N) — 중력의 크기, 장소에 따라 다름","m 질량(kg) — 물질의 양, 어디서나 같음"], note:"3 kg: 지구에서 29.4 N, 달에서 약 4.9 N(1/6). 질량은 달에서도 3 kg 그대로."},
  {type:"chart", kind:"line", title:"용수철: 힘과 늘어난 길이는 비례", x:["0","5","10","15","20","25"], series:[{name:"늘어난 길이(cm)",data:[0,1,2,3,4,5]}], xlabel:"매단 힘(N)", ylabel:"길이(cm)", ymin:0, note:"10 N에 2 cm 늘면 25 N에 5 cm. 부력 = 공기 중 무게 − 액체 속 무게."}
 ],
 "sci-g1-force-balance": [
  {type:"table", title:"힘의 평형과 운동 상태", head:["알짜힘","운동 상태","예"], rows:[["0","유지(정지·등속 직선)","책상 위 책, 등속 낙하산"],["0이 아님","빨라짐","떨어지는 공"],["0이 아님","느려짐","굴러가다 멈추는 공"],["0이 아님","방향 변화","커브 도는 자동차"]], note:"힘이 필요한 것은 '변화'이지 '운동 자체'가 아니다. 등속 직선 운동은 알짜힘 0."},
  {type:"svg", title:"두 힘의 평형 — 책상 위 책", svg:"<svg viewBox='0 0 300 200' role='img' aria-label='힘의 평형'><defs><marker id='fbA' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto'><path d='M0 0L10 5L0 10z' fill='var(--acc)'/></marker></defs><line x1='30' y1='150' x2='270' y2='150' stroke='var(--ink)' stroke-width='3'/><rect x='100' y='110' width='100' height='40' rx='4' fill='none' stroke='var(--ink)' stroke-width='2'/><text x='150' y='135' text-anchor='middle' font-size='13' font-weight='600' fill='var(--ink)'>책</text><line x1='150' y1='110' x2='150' y2='40' stroke='var(--acc)' stroke-width='2.5' marker-end='url(#fbA)'/><text x='160' y='60' font-size='12' fill='var(--acc)'>책상이 떠받치는 힘</text><line x1='150' y1='150' x2='150' y2='190' stroke='var(--acc)' stroke-width='2.5' marker-end='url(#fbA)'/><text x='160' y='184' font-size='12' fill='var(--acc)'>중력</text><text x='40' y='30' font-size='12' fill='var(--ink)'>크기 같음 · 방향 반대 · 같은 작용선</text><text x='40' y='48' font-size='12' fill='var(--ink)'>같은 물체 → 알짜힘 = 0</text></svg>", note:"크기 같고 방향 반대라도 서로 다른 물체에 작용하면 평형이 아니다."},
  {type:"compare", title:"알짜힘 구하기와 평형 사례", items:[{name:"같은 방향",points:["더한다","3 N + 5 N = 8 N"]},{name:"반대 방향",points:["큰 힘 − 작은 힘","8 N − 3 N = 5 N, 큰 힘의 방향"]},{name:"평형 사례",points:["물에 뜬 배: 중력 = 부력","낙하산: 중력 = 공기 저항","줄다리기 비김"]}], note:"생활 장치: 체중계(탄성력), 구명조끼(부력), 베어링(마찰 ↓), 타이어 홈(마찰 ↑)."}
 ],

 /* ======================= 과학 1 · 기체의 성질 ======================= */
 "sci-g1-pressure": [
  {type:"table", title:"압력·기체 압력·대기압", head:["항목","내용"], rows:[["압력","힘 ÷ 면적, 단위 Pa(N/m²)"],["기체 압력","입자가 벽에 충돌해 생김"],["작용 방향","모든 방향에 같은 크기"],["커지는 조건","입자 수↑, 온도↑, 부피↓"],["대기압","공기의 무게로 생김"],["1기압","76 cmHg ≈ 1013 hPa"]], note:"높이 올라갈수록 공기가 희박해 대기압은 낮아진다(토리첼리의 수은 기둥)."},
  {type:"formula", title:"압력 공식", tex:"P = \\frac{F}{A}", where:["P 압력(Pa)","F 힘(N)","A 면적(m²)"], note:"20 N, 0.5 m² → 40 Pa. 같은 사람이 스키를 신으면 힘은 같아도 압력은 작아진다."},
  {type:"compare", title:"압력 크게 vs 작게 / 대기압 사례", items:[{name:"면적 좁혀 압력 ↑",points:["못 끝","스케이트 날"]},{name:"면적 넓혀 압력 ↓",points:["스키","낙타 발","넓은 가방끈"]},{name:"대기압 사례",points:["빨대로 음료 마시기","흡착판, 찌그러지는 빈 깡통","높은 산: 과자 봉지 부풂, 귀 먹먹"]}], note:"과자 봉지가 부푸는 것은 바깥 대기압이 낮아져 안쪽 기체가 팽창하기 때문."}
 ],
 "sci-g1-gas-laws": [
  {type:"table", title:"보일 법칙 vs 샤를 법칙", head:["구분","보일 법칙","샤를 법칙"], rows:[["일정한 것","온도","압력"],["관계","압력 × 부피 = 일정","온도↑ → 부피 일정 비율↑"],["그래프","반비례 곡선","오른쪽 위 직선"],["입자 해석","충돌 횟수 변화","운동 활발 → 부피↑"],["사례","잠수부 기포, 주사기","열기구, 찌그러진 탁구공"]], note:"샤를: 섭씨온도에 비례하지 않고 일정한 양씩 늘어나는 직선. −273 ℃로 늘이면 부피 0. 팽창해도 입자 크기·수는 그대로, 입자 사이 거리만 멀어진다."},
  {type:"chart", kind:"line", title:"보일 법칙 — 압력과 부피(온도 일정)", x:["1","2","3"], series:[{name:"부피(mL)",data:[60,30,20]}], xlabel:"압력(기압)", ylabel:"부피(mL)", ymin:0, note:"P₁V₁ = P₂V₂: 1기압·60 mL → 3기압이면 1 × 60 = 3 × V, V = 20 mL. 더하지 말고 곱한다."},
  {type:"compare", title:"생활 사례 분류", items:[{name:"보일(압력 변화)",points:["높이 올라가면 과자 봉지 부풂","잠수부 기포가 떠오르며 커짐","에어백·풍선 터짐"]},{name:"샤를(온도 변화)",points:["열기구","찌그러진 탁구공을 뜨거운 물에","여름철 타이어 팽팽, 찬 곳의 풍선 쭈그러짐"]}]}
 ],

 /* ======================= 과학 1 · 태양계 ======================= */
 "sci-g1-solar-sun": [
  {type:"table", title:"지구형 행성 vs 목성형 행성", head:["구분","지구형","목성형"], rows:[["행성","수성·금성·지구·화성","목성·토성·천왕성·해왕성"],["크기·질량","작음","큼"],["밀도","큼","작음"],["표면","단단한 암석","기체"],["위성","없거나 적음","많음"],["고리","없음","있음"]], note:"크기가 크면 밀도도 크다는 혼동 주의 — 목성형은 기체라 밀도가 작다(토성은 물보다 작음)."},
  {type:"tree", title:"태양계의 구성", root:{t:"태양계", children:[{t:"태양(항성)",children:["스스로 빛을 냄"]},{t:"행성 8개",children:["지구형 4","목성형 4"]},{t:"위성",children:["행성 둘레를 돎"]},{t:"기타",children:["소행성","왜소 행성","혜성(긴 꼬리)"]}]}, note:"금성: 두꺼운 CO₂ 대기의 온실 효과로 표면 온도 최고(수성 아님). 목성: 가장 큼·대적점. 토성: 뚜렷한 고리. 천왕성: 누워서 자전."},
  {type:"table", title:"태양의 표면·대기 현상", head:["위치","현상","특징"], rows:[["표면(광구)","흑점","주위보다 온도 낮아 어둡게"],["표면(광구)","쌀알 무늬",""],["대기","채층","붉은 층"],["대기","코로나","개기 일식 때 진주빛"],["대기","홍염 / 플레어","불기둥 / 폭발"]], note:"흑점 수는 약 11년 주기. 흑점의 동→서 이동으로 태양의 자전을 안다. 활동 극대기: 오로라·델린저 현상·자기 폭풍·인공위성 고장."}
 ],
 "sci-g1-earth-moon": [
  {type:"table", title:"지구의 자전 vs 공전", head:["구분","자전","공전"], rows:[["방향","서 → 동","서 → 동"],["주기","하루 1회(1시간 15°)","1년 1회(하루 약 1°)"],["겉보기 현상","일주 운동(동 → 서)","연주 운동"],["결과","북쪽 하늘 시계 반대 회전","계절마다 별자리 변화"]], note:"우리가 서→동으로 돌기 때문에 하늘은 반대로 도는 것처럼 보인다. 2시간 → 30°."},
  {type:"table", title:"달의 위상 순서", head:["위상","음력","보이는 모양·시각"], rows:[["삭","1일","안 보임"],["상현","7~8일","오른쪽 반, 저녁 남쪽"],["보름(망)","15일","둥근 달, 밤새"],["하현","22~23일","왼쪽 반, 새벽 남쪽"]], note:"주기 약 29.5일. 달이 하루 약 13°씩 동쪽으로 옮겨 가 같은 위상의 달은 매일 약 50분씩 늦게 뜬다."},
  {type:"svg", title:"일식과 월식의 배열", svg:"<svg viewBox='0 0 400 200' role='img' aria-label='일식 월식 배열'><circle cx='50' cy='55' r='26' fill='var(--acc)' opacity='.85'/><text x='50' y='100' text-anchor='middle' font-size='12' fill='var(--ink)'>태양</text><circle cx='190' cy='55' r='8' fill='var(--ink)'/><text x='190' y='100' text-anchor='middle' font-size='12' fill='var(--ink)'>달</text><circle cx='300' cy='55' r='16' fill='none' stroke='var(--ink)' stroke-width='2'/><text x='300' y='100' text-anchor='middle' font-size='12' fill='var(--ink)'>지구</text><text x='390' y='60' text-anchor='end' font-size='13' font-weight='600' fill='var(--ink)'>일식(삭)</text><line x1='20' y1='120' x2='380' y2='120' stroke='var(--line)' stroke-dasharray='4 3'/><circle cx='50' cy='155' r='26' fill='var(--acc)' opacity='.85'/><text x='50' y='196' text-anchor='middle' font-size='12' fill='var(--ink)'>태양</text><circle cx='210' cy='155' r='16' fill='none' stroke='var(--ink)' stroke-width='2'/><text x='210' y='196' text-anchor='middle' font-size='12' fill='var(--ink)'>지구</text><circle cx='300' cy='155' r='8' fill='var(--ink)'/><text x='300' y='196' text-anchor='middle' font-size='12' fill='var(--ink)'>달</text><text x='390' y='160' text-anchor='end' font-size='13' font-weight='600' fill='var(--ink)'>월식(망)</text></svg>", note:"일식 = 태양–달–지구(삭), 월식 = 태양–지구–달(망). 달의 공전 궤도가 약 5° 기울어 매달 일어나지는 않는다."}
 ],

 /* ======================= 사회 ① · 개인과 사회생활, 문화 ======================= */
 "soc-g1-social-life": [
  {type:"table", title:"사회화·지위·역할 정리", head:["개념","뜻","예"], rows:[["사회화","규범·가치를 배워 구성원 됨","평생 계속"],["재사회화","새 환경에 맞춰 다시 배움","전학·취업·은퇴"],["귀속 지위","태어나며 저절로","딸, 청소년, 노인"],["성취 지위","노력으로 얻음","학생회장, 교사"],["역할","지위에 기대되는 행동","역할 행동은 사람마다"],["역할 갈등","둘 이상 지위의 역할 충돌","동시에 부딪쳐야"]], note:"청소년·노인은 나이에 따라 저절로 주어지므로 귀속 지위."},
  {type:"tree", title:"사회화 기관", root:{t:"사회화 기관", children:[{t:"가정"},{t:"또래 집단"},{t:"학교"},{t:"직장"},{t:"대중매체"}]}, note:"자아 정체성은 타인의 반응·기대를 거울삼아 사회화 과정에서 만들어지며 청소년기에 가장 활발히 탐색."},
  {type:"compare", title:"갈등·차별과 시민의 자질", items:[{name:"사회 갈등",points:["세대·노사·지역·성별"]},{name:"차별",points:["합리적 이유 없는 불리한 대우"]},{name:"시민의 자질",points:["관용·공감·비판적 사고","대화와 타협·참여","국가인권위원회 등 제도 활용"]}], note:"역할 갈등 대응: 우선순위 정하기·조정·대화, 돌봄·유연 근무 같은 사회적 지원 제도."}
 ],
 "soc-g1-culture-media": [
  {type:"table", title:"문화의 특징 5가지", head:["특징","뜻"], rows:[["학습성","배워 익힘"],["공유성","함께 가져 행동 예측 가능"],["축적성","언어·문자로 전해져 쌓임"],["변동성","시간 따라 변함"],["총체성","하나가 바뀌면 다른 것도 변함"]], note:"본능(먹기·잠)은 문화가 아니고 젓가락 사용·식사 예절은 문화. 공유성('예측 가능') vs 총체성('하나가 바뀌니 다른 것도') 구별."},
  {type:"compare", title:"문화를 보는 세 가지 태도", items:[{name:"자문화 중심주의",points:["우리 것만 우월"]},{name:"문화 사대주의",points:["남의 것이 우월"]},{name:"문화 상대주의",points:["그 사회의 환경·맥락에서 이해","**바람직**","단, 인간 존엄을 해치는 것까지 인정하는 극단적 상대주의는 경계"]}]},
  {type:"flow", title:"미디어 정보 비판적 검토", steps:[{t:"출처·작성자 확인"},{t:"사실과 의견 구분",hi:true},{t:"다른 매체와 교차 확인"},{t:"빠진 정보·의도 묻기"},{t:"저작권·초상권 존중"}], dir:"h", note:"미디어는 현실을 선택·편집해 보여 주므로 관점·상업성·알고리즘 편향이 섞인다."}
 ],

 /* ======================= 사회 ① · 정치와 민주주의 ======================= */
 "soc-g1-politics": [
  {type:"table", title:"민주주의의 이념과 기본 원리", head:["구분","내용"], rows:[["근본 가치","인간의 존엄성"],["이념","자유, 평등"],["국민 주권","주권은 국민에게"],["국민 자치","국민이 스스로 다스림"],["입헌주의","권력이 헌법에 따라 제한"],["권력 분립","권력을 나누어 견제"]], note:"입헌주의의 핵심은 '헌법이 있음'이 아니라 '권력이 헌법에 따라 제한'된다는 것."},
  {type:"timeline", title:"민주주의의 발전", events:[{y:"고대",t:"아테네 직접 민주주의(민회)"},{y:"근대",t:"시민 혁명: 명예·독립·프랑스 혁명",hi:true},{y:"이후",t:"재산·성별 제한 철폐 → 보통 선거"},{y:"현대",t:"대의 민주주의 + 보완 제도"}], note:"아테네는 성인 남성 시민만 참여, 여성·노예·외국인 제외. 시민 혁명의 사상: 천부 인권·사회 계약."},
  {type:"compare", title:"정치의 뜻과 현대 민주주의", items:[{name:"정치(좁은 뜻)",points:["국가 권력 행사·정책 결정"]},{name:"정치(넓은 뜻)",points:["집단의 갈등 조정·공동 문제 해결","학급 회의도 정치"]},{name:"대의제 보완",points:["국민 투표·국민 발안·국민 소환","전자 민주주의","과제: 정치적 무관심·가짜 뉴스"]}]}
 ],
 "soc-g1-election": [
  {type:"table", title:"선거의 4원칙과 기능", head:["원칙","뜻"], rows:[["보통 선거","자격 제한 없음"],["평등 선거","한 표의 가치가 같음"],["직접 선거","직접 투표"],["비밀 선거","누구에게 투표했는지 비밀"],["기능","대표 선출·정당성·정부 통제"]], note:"보통(자격 제한 없음) vs 평등(한 표의 가치 같음) 혼동 주의. 공정 관리는 선거관리위원회, 비용 지원은 선거 공영제, 투표는 만 18세 이상."},
  {type:"flow", title:"정치과정", steps:[{t:"요구 표출",d:"개인·집단"},{t:"집약",d:"정당"},{t:"정책 결정",d:"국회·정부",hi:true},{t:"집행"},{t:"평가·환류"}], dir:"h", note:"전 과정에 언론·여론이 영향."},
  {type:"table", title:"정치 주체와 지방 자치", head:["주체","목표·역할","예"], rows:[["정당","정권 획득, 공익 표방","후보 공천·공약"],["이익집단","자기 집단의 특수 이익","노동조합·의사회"],["시민단체","공익·비영리","환경·소비자 단체"],["언론","여론 형성·감시",""],["지방의회","조례 제정·예산 심의","주민이 선출"],["단체장","집행","주민이 선출"]], note:"주민 참여 수단: 주민 투표·주민 소환·주민 조례 청구·주민 참여 예산·공청회."}
 ],

 /* ======================= 사회 ① · 법과 인권 ======================= */
 "soc-g1-law": [
  {type:"table", title:"법의 종류", head:["종류","관계","법률 예"], rows:[["공법","국가 ↔ 개인","헌법·형법·행정법"],["사법(私法)","개인 ↔ 개인","민법·상법"],["사회법","사법에 국가 개입, 약자 보호","근로기준법·소비자기본법"]], note:"법 = 국가가 만들고 강제성으로 지키게 하는 규범(도덕·관습과 구별). 목적: 정의 실현·공공복리·질서 유지·인권 보장. 사회법 사례: 최저 임금제·아동 노동 금지·산업 재해 보상."},
  {type:"compare", title:"민사 재판 vs 형사 재판", items:[{name:"민사 재판",points:["개인 간 계약·손해","**원고** vs **피고**"]},{name:"형사 재판",points:["범죄","**검사가 기소** vs **피고인**","무죄 추정"]}], note:"형사 재판에서 '원고 = 피해자'는 틀림. 기소하는 쪽은 검사. 그 밖에 행정·가사·헌법 재판."},
  {type:"table", title:"공정한 재판을 위한 제도", head:["제도","내용"], rows:[["사법권 독립","법관은 헌법·법률·양심에 따라"],["심급 제도(3심)","불복 시 다시 재판받을 기회"],["공개 재판","재판을 공개"],["증거 재판주의","증거에 따라 판단"],["국민참여재판","배심원 의견은 권고"]], note:"3심제는 '세 번 다 받아야 함'이 아니라 불복할 때 기회를 보장하는 제도."}
 ],
 "soc-g1-rights": [
  {type:"table", title:"기본권의 종류", head:["기본권","뜻","예"], rows:[["평등권","차별받지 않을 권리",""],["자유권","국가 간섭 배제","신체·종교·표현·사생활"],["참정권","정치 참여","선거·공무담임"],["청구권","침해 시 구제 절차","청원·재판·국가 배상"],["사회권","인간다운 생활 요구","교육·근로·사회보장·환경"]], note:"바탕: 인간의 존엄과 가치·행복추구권. 청구권(구제 절차) vs 사회권(인간다운 생활 요구) 구별."},
  {type:"flow", title:"기본권 제한(헌법 제37조 ②)", steps:[{t:"목적",d:"국가 안전 보장·질서 유지·공공복리"},{t:"법률로써",d:"명령·조례로는 불가",hi:true},{t:"한계",d:"본질적 내용 침해 불가"}], dir:"h", note:"헌법에 적은 이유: 국가의 자의적 침해를 막기 위해."},
  {type:"table", title:"권리 구제 기관과 근로자 권리", head:["기관","하는 일"], rows:[["법원","재판"],["헌법재판소","헌법 소원·위헌 법률 심판"],["국가인권위원회","인권 침해·차별 조사·권고"],["국민권익위원회","행정 고충·민원"],["고용노동부","근로자 권리 침해 진정"],["노동 3권","단결·단체교섭·단체행동"]], note:"국가인권위원회는 조사·권고 기관이고 처벌·판결은 법원. 근로기준법: 최저 임금·주 40시간·휴일·부당 해고 금지. 청소년 근로: 근로 계약서, 야간·위험 업무 제한."}
 ],

 /* ======================= 사회 ① · 세계의 지역과 아시아 ======================= */
 "soc-g1-region": [
  {type:"table", title:"지역의 특성을 추론하는 요소", head:["요소","내용","예"], rows:[["절대적 위치","위도·경도","위도 높을수록 기온 낮음"],["상대적 위치","주변과의 관계",""],["자연환경","기후·지형","해안 해양성·내륙 대륙성"],["인문환경","인구·산업·문화",""],["스케일","공간 규모","동네·도시·국가·세계"]], note:"지역 특성은 위치 + 자연 + 인문환경을 함께 고려. 위도·경도는 절대적 위치, 주변과의 관계가 상대적 위치."},
  {type:"compare", title:"해양성 vs 대륙성 기후", items:[{name:"해안(해양성)",points:["연교차 **작음**"]},{name:"내륙(대륙성)",points:["연교차 **큼**"]}], note:"위도: 열대 → 온대 → 냉대 → 한대. 지형·기후가 의식주·산업 같은 생활 양식을 만든다."},
  {type:"compare", title:"세계 ↔ 지역의 상호 영향(양방향)", items:[{name:"세계 → 지역",points:["국제 유가·곡물 가격 → 우리 물가","감염병·기후변화의 확산"]},{name:"지역 → 세계",points:["한류","지역 특산물·지역 축제의 세계화"]}], note:"공간적 상호 작용: 사람·물자·정보·자본의 이동(통근·무역·관광·SNS). 교통·통신 발달로 지역 간 연계 강화. 글로컬 관점."}
 ],
 "soc-g1-asia": [
  {type:"table", title:"아시아의 종교와 문화경관", head:["종교","경관·생활","지역"], rows:[["불교","사원·탑","동남·동아시아"],["힌두교","갠지스강 목욕, 소 신성시","인도"],["이슬람교","모스크(첨탑·돔)·라마단·할랄","서남아·동남아 일부"],["크리스트교","","필리핀"]], note:"첨탑과 돔은 모스크(이슬람), 다채로운 신상·탑은 힌두 사원."},
  {type:"compare", title:"아시아 지역별 인구 구조", items:[{name:"동아시아(한·중·일)",points:["**저출산·고령화**"]},{name:"남·서남·동남아시아",points:["**젊은 인구** 많음","성장 가능성 큼","과제: 교육·일자리"]}], note:"아시아는 세계 인구의 절반 이상, 인도·중국이 인구 대국. '아시아 전체가 젊다'로 일반화하지 않는다."},
  {type:"table", title:"아시아의 자연환경과 산업", head:["지역","자연환경","산업"], rows:[["동·남아시아","계절풍(몬순)","벼농사 밀집"],["서남·중앙아시아","건조(사막·초원)","유목, 석유(서남아)"],["중국","황허·창장","'세계의 공장'"],["인도","갠지스강","IT·서비스"],["동남아시아","메콩강","제조업 이전"]], note:"히말라야산맥·티베트고원. 글로컬 관점: 중국 임금 상승·기술 발전은 우리 수출·공장 입지·고용에 직접 영향."}
 ],

 /* ======================= 사회 ① · 유럽과 아프리카 ======================= */
 "soc-g1-europe": [
  {type:"table", title:"유럽의 세 기후", head:["기후","지역","특징","원인·작물"], rows:[["서안 해양성","서부","연중 고른 강수, 연교차 작음","편서풍·난류"],["지중해성","남부","여름 고온 건조, 겨울 온난 습윤","올리브·포도"],["대륙성","동부","연교차 큼",""]], note:"서안 해양성은 '비가 많은 기후'가 아니라 '연중 고른 강수·작은 연교차'. 지중해성 그래프는 여름 강수가 적다."},
  {type:"compare", title:"유럽연합(EU)의 통합 vs 분리", items:[{name:"통합",points:["단일 시장·공동 화폐(유로)","국경 자유 이동","자유로운 이동·취업·무역·교육 교류"]},{name:"분리 움직임",points:["영국의 EU 탈퇴(**브렉시트**)","카탈루냐·스코틀랜드 독립 요구","이민·난민 갈등, 경제 격차, 주권 약화 논란"]}], note:"브렉시트는 '유로화 탈퇴'가 아니다. 영국은 원래 유로를 쓰지 않았고 EU 회원국에서 탈퇴한 것."},
  {type:"table", title:"유럽의 도시 유형과 자연", head:["구분","예"], rows:[["역사·문화 도시","로마·아테네"],["세계 도시","런던·파리"],["지속가능 도시","코펜하겐·프라이부르크·암스테르담"],["산지·평원","알프스·스칸디나비아, 북유럽 평원"],["하천","라인강·다뉴브강"]], note:"지속가능 도시: 자전거·대중교통, 재생 에너지, 녹지로 기후위기 대응."}
 ],
 "soc-g1-africa": [
  {type:"table", title:"아프리카 요약", head:["항목","내용"], rows:[["기후대","적도 중심 남북 대칭"],["지형","나일강·콩고강, 동아프리카 지구대"],["문화","수천 개 민족·언어, 전통 예술"],["종교","북부 이슬람, 남부 크리스트교, 토착"],["식민 흔적","직선 국경, 유럽어 공용어"],["잠재력","젊은 인구, 자원, 모바일 금융"]], note:"직선 국경은 자연 지형이 아니라 식민 지배 시 유럽이 임의로 그은 경계로 민족 분포와 어긋남."},
  {type:"svg", title:"적도 중심 기후대의 남북 대칭", svg:"<svg viewBox='0 0 300 250' role='img' aria-label='아프리카 기후대 대칭'><rect x='40' y='14' width='170' height='30' fill='var(--line)' opacity='.5'/><text x='125' y='34' text-anchor='middle' font-size='12' fill='var(--ink)'>지중해성</text><rect x='40' y='44' width='170' height='34' fill='var(--acc)' opacity='.18'/><text x='125' y='66' text-anchor='middle' font-size='12' fill='var(--ink)'>사막(사하라)</text><rect x='40' y='78' width='170' height='30' fill='var(--acc)' opacity='.35'/><text x='125' y='98' text-anchor='middle' font-size='12' fill='var(--ink)'>사바나</text><rect x='40' y='108' width='170' height='36' fill='var(--acc)' opacity='.6'/><text x='125' y='130' text-anchor='middle' font-size='13' font-weight='600' fill='var(--ink)'>열대 우림</text><rect x='40' y='144' width='170' height='30' fill='var(--acc)' opacity='.35'/><text x='125' y='164' text-anchor='middle' font-size='12' fill='var(--ink)'>사바나</text><rect x='40' y='174' width='170' height='34' fill='var(--acc)' opacity='.18'/><text x='125' y='196' text-anchor='middle' font-size='12' fill='var(--ink)'>사막(칼라하리)</text><rect x='40' y='208' width='170' height='30' fill='var(--line)' opacity='.5'/><text x='125' y='228' text-anchor='middle' font-size='12' fill='var(--ink)'>지중해성</text><line x1='20' y1='126' x2='230' y2='126' stroke='var(--ink)' stroke-width='1.5' stroke-dasharray='5 3'/><text x='236' y='130' font-size='12' fill='var(--ink)'>적도</text><text x='236' y='34' font-size='12' fill='var(--ink)'>북</text><text x='236' y='228' font-size='12' fill='var(--ink)'>남</text></svg>", note:"아프리카 전체가 '덥고 건조한 사막'이 아니다. 적도 부근은 열대 우림, 남·북 끝은 지중해성."},
  {type:"compare", title:"편견 성찰과 지속가능한 발전", items:[{name:"미디어의 편견",points:["'빈곤·분쟁·질병' 단일 이미지","실제는 지역마다 다르고 역동적"]},{name:"자체 노력(먼저)",points:["아프리카연합(AU)","모바일 금융 등 기술 도약","생태 관광"]},{name:"협력·참여",points:["공정 무역, 적정 기술","국제기구·NGO, 우리나라 ODA","공정무역 소비·후원"]}]}
 ],

 /* ======================= 사회 ① · 아메리카와 오세아니아·극지방 ======================= */
 "soc-g1-america": [
  {type:"table", title:"앵글로아메리카 vs 라틴아메리카", head:["구분","앵글로아메리카","라틴아메리카"], rows:[["언어","영어","에스파냐어·포르투갈어"],["종교","개신교","가톨릭"],["도시 예","뉴욕·로스앤젤레스","멕시코시티·상파울루"],["지형","로키산맥·중앙 평원","안데스·아마존·팜파스"]], note:"'라틴어'가 아니라 에스파냐어·포르투갈어(브라질). 인구: 원주민 + 유럽계 + 아프리카계 + 아시아계 → 다민족·다인종."},
  {type:"flow", title:"초국적 기업의 공간적 분업", steps:[{t:"본사·연구소",d:"관리·기술 — 미국 등"},{t:"공장",d:"값싼 노동력 — 멕시코·아시아",hi:true},{t:"판매",d:"세계 시장"}], dir:"h", note:"입지·이전 이유: 임금·토지 비용, 시장 접근, 무역 협정."},
  {type:"compare", title:"문화 혼종성과 공장 이전의 영향", items:[{name:"문화 혼종성",points:["다른 문화가 **섞여 새 문화**","메스티소, 죽은 자의 날","삼바·탱고·재즈, 텍스멕스"]},{name:"공장이 온 지역",points:["일자리·산업 성장","환경 문제"]},{name:"공장이 떠난 지역",points:["실업·쇠퇴","미국 러스트벨트"]}], note:"혼종성은 한 문화가 다른 문화를 대체하는 것이 아니다."}
 ],
 "soc-g1-oceania-polar": [
  {type:"table", title:"북극 vs 남극", head:["구분","북극","남극"], rows:[["성격","바다·해빙","대륙"],["영유","주변국 영유","남극 조약: 영유권 동결"],["허용","","평화적 과학 연구만"],["우리 기지","다산","세종·장보고"]], note:"남극은 '어느 나라 땅'이 아니다. 남극 조약으로 영유권 주장이 동결되고 과학 연구만 허용."},
  {type:"table", title:"오세아니아·태평양 환경 문제", head:["문제","내용"], rows:[["해수면 상승","투발루·키리바시 침수 위험"],["원인","바닷물 열팽창 + 육지 빙하 융해"],["산호초 백화","그레이트배리어리프"],["해양 쓰레기","플라스틱"],["참여","탄소·플라스틱 줄이기, 협약 지지"]], note:"오스트레일리아 내륙은 건조, 뉴질랜드는 화산·빙하 지형. 철광석·석탄·양모·밀·소고기를 중국·일본·한국 등 아시아로 수출(유럽 아님)."},
  {type:"compare", title:"극지 개발을 둘러싼 이해관계", items:[{name:"개발·이용",points:["석유·가스·광물 자원","해빙 감소로 열리는 **북극 항로**"]},{name:"보전",points:["생태계·원주민","기후 조절·연구 가치"]}], note:"자신과 상대 의견을 근거로 비판적 검토(토론형)."}
 ]
});
