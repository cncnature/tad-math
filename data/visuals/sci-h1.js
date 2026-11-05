// 고1 통합과학1·2 시각 자료 — data/subjects/sci-h1.js 의 10개 차시(concept/pitfalls/points 범위 안의 사실만 사용). 스키마: docs/VISUAL-SCHEMA.md
window.DATA = window.DATA || {}; (window.DATA.visualsAdd = window.DATA.visualsAdd || []).push({

 /* ===== 통합과학1 I. 과학의 기초 ===== */
 "sci-h1-measure": [
  {type:"table", title:"측정과 단위 한눈 정리", head:["구분","핵심","예·주의"], rows:[
   ["기본량 7개","m·kg·s·A·K·mol·cd","질량 **kg**, 온도 **K**"],
   ["유도량","기본량의 조합","N = kg·m/s², Pa, m/s"],
   ["측정 표준","자연 상수로 정의","세슘 진동, 빛의 속력"],
   ["접두어","k M G / m μ n","10³ 10⁶ 10⁹ / 10⁻³ …"],
   ["단위 환산","지수 → 거듭제곱 → 숫자","1 cm³ = 10⁻⁶ m³"],
   ["신호","아날로그 → 디지털","잡음에 강함·복제 쉬움"]
  ], note:"무게(N)는 힘, 질량(kg)이 아니다. km/h → m/s 는 ÷3.6."},
  {type:"flow", title:"정보의 디지털 변환 과정", steps:[{t:"물리량",d:"온도·빛·압력"},{t:"센서",d:"전기 신호로"},{t:"아날로그 신호",d:"연속값"},{t:"디지털 변환",d:"0과 1의 단계",hi:true},{t:"저장·전송",d:"복제·분석 쉬움"}], note:"연속값을 단계로 끊으므로 정보 일부는 사라지지만, 잡음에 강하고 복제·전송 시 변형이 적다."},
  {type:"formula", title:"단위 환산: km/h → m/s", tex:"1\\ \\text{km/h} = \\frac{1000\\ \\text{m}}{3600\\ \\text{s}} = \\frac{1}{3.6}\\ \\text{m/s}", where:["72 km/h = 72000 m ÷ 3600 s = 20 m/s","1 cm = 10⁻² m 이지만 1 cm³ = 10⁻⁶ m³"]}
 ],

 /* ===== 통합과학1 II. 물질의 규칙성과 성질 ===== */
 "sci-h1-elements": [
  {type:"table", title:"원소 생성 순서 요약", head:["단계","생성 원소","비고"], rows:[
   ["빅뱅 직후 수 분","수소·헬륨 원자핵","질량비 약 **3:1**"],
   ["약 38만 년 뒤","원자 형성","우주 배경 복사"],
   ["별 핵융합(주계열)","수소 → 헬륨","모든 별"],
   ["질량 큰 별","탄소·산소 … **철까지**","철 = 가장 안정"],
   ["초신성 폭발","철보다 무거운 원소","금·우라늄"],
   ["성운 → 태양계","약 46억 년 전","지구 = 무거운 원소"]
  ], note:"우주 = 수소·헬륨 / 지각 = 산소·규소 / 생명체 = 산소·탄소·수소·질소"},
  {type:"flow", title:"우주 원소 생성 순서", steps:[{t:"빅뱅",d:"H·He (3:1)"},{t:"별 핵융합",d:"H → He → 철까지",hi:true},{t:"초신성 폭발",d:"철보다 무거운 원소"},{t:"성운",d:"물질이 모임"},{t:"태양·행성",d:"약 46억 년 전"}], note:"별 내부에서 '모든' 원소가 만들어지는 것은 아니다 — 핵융합은 철까지."},
  {type:"table", title:"주기율표 족 요약", head:["족","원자가 전자","이온·성질"], rows:[
   ["1족 알칼리 금속","1개","+1 이온, 물과 격렬 반응"],
   ["17족 할로젠","7개","−1 이온"],
   ["18족 비활성 기체","8개(안정)","반응 X, 옥텟"],
   ["13~18족","족 − 10 개","O 16족 → 6개"],
   ["같은 족","원자가 전자 같음","성질 비슷"]
  ], note:"껍질 수 = 주기, 가장 바깥 전자 수 = 족. 수소는 1족이지만 **비금속**."}
 ],

 "sci-h1-bonding": [
  {type:"table", title:"결합 종류 비교", head:["구분","이온 결합","공유 결합","금속"], rows:[
   ["구성","금속 + 비금속","비금속 + 비금속","금속"],
   ["전자","전자 이동(이온)","전자쌍 공유","자유 전자"],
   ["녹는점","높음","낮음(분자)","—"],
   ["고체 전기 전도","**X**","X","O"],
   ["액체·수용액 전도","**O**","X","O"],
   ["예","NaCl, MgO","H₂O, O₂, CO₂, NH₃","Cu"]
  ], note:"공유 결합 수 = 8 − 원자가 전자 수 (O 는 2개, N 은 3개)."},
  {type:"flow", title:"규산염 사면체(SiO₄)의 연결", steps:[{t:"독립",d:"감람석 · Si:O 1:4"},{t:"단일 사슬",d:"휘석"},{t:"이중 사슬",d:"각섬석"},{t:"판",d:"흑운모"},{t:"망",d:"석영·장석 · 1:2",hi:true}], note:"공유 산소가 많을수록 단단하고, Si:O 비율의 O 는 **줄어든다**(1:4 → 1:2)."},
  {type:"table", title:"생명체의 물질 · 반도체", head:["구분","단위체·구성","비고"], rows:[
   ["단백질","아미노산","펩타이드 결합"],
   ["핵산","뉴클레오타이드","인산·당·염기"],
   ["DNA / RNA","A-T·G-C 이중 나선","RNA 는 단일 가닥·U"],
   ["n형 반도체","규소 + 15족(인)","전자가 남음"],
   ["p형 반도체","규소 + 13족(붕소)","양공 생김"],
   ["다이오드","p-n 접합","한 방향 전류"]
  ], note:"n형·p형 모두 전체적으로는 전기적 **중성**."},
  {type:"svg", title:"p-n 접합 다이오드 회로 — 순방향(p 쪽에 +극)", svg:"<svg viewBox='0 0 320 150' role='img' aria-label='p-n 접합 다이오드 회로'><rect x='100' y='50' width='60' height='40' fill='var(--acc)' opacity='.18' stroke='var(--acc)' stroke-width='1.5'/><rect x='160' y='50' width='60' height='40' fill='none' stroke='var(--ink)' stroke-width='1.5'/><text x='130' y='74' text-anchor='middle' font-size='13' font-weight='700' fill='var(--ink)'>p형</text><text x='190' y='74' text-anchor='middle' font-size='13' font-weight='700' fill='var(--ink)'>n형</text><text x='130' y='44' text-anchor='middle' font-size='12' fill='var(--ink)'>양공</text><text x='190' y='44' text-anchor='middle' font-size='12' fill='var(--ink)'>전자</text><line x1='100' y1='70' x2='64' y2='70' stroke='var(--ink)' stroke-width='1.5'/><line x1='64' y1='56' x2='64' y2='84' stroke='var(--ink)' stroke-width='2'/><line x1='54' y1='62' x2='54' y2='78' stroke='var(--ink)' stroke-width='2'/><text x='64' y='50' text-anchor='middle' font-size='13' fill='var(--acc)' font-weight='700'>+</text><text x='54' y='96' text-anchor='middle' font-size='13' fill='var(--ink)'>−</text><line x1='54' y1='70' x2='30' y2='70' stroke='var(--ink)' stroke-width='1.5'/><line x1='30' y1='70' x2='30' y2='116' stroke='var(--ink)' stroke-width='1.5'/><line x1='30' y1='116' x2='149' y2='116' stroke='var(--ink)' stroke-width='1.5'/><circle cx='160' cy='116' r='11' fill='none' stroke='var(--ink)' stroke-width='1.5'/><line x1='152' y1='108' x2='168' y2='124' stroke='var(--ink)' stroke-width='1.5'/><line x1='168' y1='108' x2='152' y2='124' stroke='var(--ink)' stroke-width='1.5'/><line x1='171' y1='116' x2='290' y2='116' stroke='var(--ink)' stroke-width='1.5'/><line x1='290' y1='116' x2='290' y2='70' stroke='var(--ink)' stroke-width='1.5'/><line x1='290' y1='70' x2='220' y2='70' stroke='var(--ink)' stroke-width='1.5'/><polygon points='92,70 82,65 82,75' fill='var(--acc)'/><line x1='250' y1='116' x2='262' y2='116' stroke='var(--acc)' stroke-width='3'/><polygon points='262,116 252,111 252,121' fill='var(--acc)'/><text x='160' y='146' text-anchor='middle' font-size='12' fill='var(--ink)'>전구(LED) 켜짐 · 전류는 한 방향으로만</text><text x='262' y='60' text-anchor='middle' font-size='12' fill='var(--acc)'>전류 방향</text></svg>", note:"극을 반대로 연결하면 전류가 흐르지 않는다. LED·태양 전지가 p-n 접합을 이용."}
 ],

 /* ===== 통합과학1 III. 시스템과 상호작용 ===== */
 "sci-h1-mechanics": [
  {type:"table", title:"역학 핵심 정리", head:["구분","식·내용","그래프·주의"], rows:[
   ["자유 낙하","v = gt, h = ½gt²","질량과 무관"],
   ["수평 던지기","수평 등속 · 연직 낙하","낙하 시간은 **높이**로"],
   ["운동 법칙","F = ma","v–t 기울기 = 가속도"],
   ["운동량","p = mv (kg·m/s)","v–t 넓이 = 거리"],
   ["충격량","I = FΔt = Δp (N·s)","F–t 넓이 = 충격량"],
   ["안전장치","시간 ↑ → 힘 ↓","충격량은 **그대로**"]
  ], note:"g ≈ 9.8 m/s². 외력이 없으면 충돌 전후 총 운동량 보존."},
  {type:"formula", title:"운동량과 충격량", tex:"p = mv,\\qquad I = F\\Delta t = \\Delta p = mv_2 - mv_1", where:["p 운동량(kg·m/s, 방향 있음)","I 충격량(N·s)","F 평균 힘(N)","Δt 충돌 시간(s)"], note:"벽에 부딪혀 되튀면 방향이 바뀌므로 Δp = m(v₁ + v₂). 속력이 같아도 Δp = 2mv."},
  {type:"chart", kind:"line", title:"F–t 그래프: 같은 충격량, 다른 힘", x:["0","0.1","0.2","0.3","0.4","0.5"], series:[{name:"단단한 벽",data:[0,60,0,0,0,0]},{name:"에어백",data:[0,8,16,24,12,0]}], xlabel:"시간(s)", ylabel:"힘(N)", ymin:0, note:"두 그래프 아래 넓이(충격량)는 6 N·s 로 같다(예시 값). 충돌 시간이 길수록 최대 힘이 작다 — 에어백·범퍼·매트의 원리."}
 ],

 "sci-h1-earth": [
  {type:"table", title:"판 경계 비교", head:["경계","판 운동·지형","지진·화산","예"], rows:[
   ["발산","멀어짐 · 해령·열곡","천발 · 현무암질 화산","대서양 중앙 해령"],
   ["수렴(섭입)","가까워짐 · 해구·호상 열도","천~심발 · 화산 O","일본·안데스"],
   ["수렴(충돌)","가까워짐 · 습곡 산맥","지진 O · 화산 거의 X","히말라야"],
   ["보존","엇갈림 · 변환 단층","천발만 · 화산 X","산안드레아스"]
  ], note:"판 = 암석권(지각 + 상부 맨틀 일부), 그 아래 연약권. 원동력 = 맨틀 대류. 에너지원 = 태양·지구 내부·조력."},
  {type:"svg", title:"판 경계 모식도(단순)", svg:"<svg viewBox='0 0 420 150' role='img' aria-label='판 경계 모식도'><rect x='10' y='80' width='55' height='18' fill='var(--line)'/><rect x='75' y='80' width='55' height='18' fill='var(--line)'/><polygon points='63,80 70,66 77,80' fill='var(--acc)'/><line x1='70' y1='122' x2='70' y2='100' stroke='var(--acc)' stroke-width='2' stroke-dasharray='3 3'/><line x1='48' y1='70' x2='28' y2='70' stroke='var(--ink)' stroke-width='2'/><polygon points='22,70 30,65 30,75' fill='var(--ink)'/><line x1='92' y1='70' x2='112' y2='70' stroke='var(--ink)' stroke-width='2'/><polygon points='118,70 110,65 110,75' fill='var(--ink)'/><text x='70' y='56' text-anchor='middle' font-size='12' fill='var(--ink)'>해령</text><text x='70' y='135' text-anchor='middle' font-size='12' font-weight='700' fill='var(--ink)'>발산 · 천발 · 화산 O</text><line x1='140' y1='20' x2='140' y2='140' stroke='var(--line)'/><rect x='150' y='80' width='50' height='14' fill='var(--line)'/><polygon points='200,80 200,94 228,124 218,124' fill='var(--line)'/><rect x='214' y='78' width='56' height='16' fill='var(--line)'/><polygon points='206,78 210,86 214,78' fill='none' stroke='var(--ink)' stroke-width='1.5'/><polygon points='246,78 253,62 260,78' fill='var(--acc)'/><circle cx='209' cy='99' r='2.5' fill='var(--ink)'/><circle cx='216' cy='107' r='2.5' fill='var(--ink)'/><circle cx='223' cy='115' r='2.5' fill='var(--ink)'/><line x1='168' y1='68' x2='188' y2='68' stroke='var(--ink)' stroke-width='2'/><polygon points='194,68 186,63 186,73' fill='var(--ink)'/><line x1='262' y1='56' x2='242' y2='56' stroke='var(--ink)' stroke-width='2'/><polygon points='236,56 244,51 244,61' fill='var(--ink)'/><text x='204' y='54' text-anchor='middle' font-size='12' fill='var(--ink)'>해구</text><text x='210' y='135' text-anchor='middle' font-size='12' font-weight='700' fill='var(--ink)'>섭입 · 심발 · 화산 O</text><line x1='280' y1='20' x2='280' y2='140' stroke='var(--line)'/><rect x='298' y='60' width='56' height='56' fill='var(--line)'/><rect x='356' y='60' width='56' height='56' fill='var(--line)'/><line x1='355' y1='52' x2='355' y2='124' stroke='var(--acc)' stroke-width='2.5'/><line x1='326' y1='104' x2='326' y2='80' stroke='var(--ink)' stroke-width='2'/><polygon points='326,72 321,80 331,80' fill='var(--ink)'/><line x1='384' y1='72' x2='384' y2='96' stroke='var(--ink)' stroke-width='2'/><polygon points='384,104 379,96 389,96' fill='var(--ink)'/><text x='355' y='44' text-anchor='middle' font-size='12' fill='var(--ink)'>변환 단층(위에서 봄)</text><text x='350' y='135' text-anchor='middle' font-size='12' font-weight='700' fill='var(--ink)'>보존 · 지진만 · 화산 X</text></svg>", note:"섭입대의 지진(점)은 해구에서 대륙 쪽으로 갈수록 깊어진다. 충돌형(히말라야)은 산맥만 솟고 화산이 거의 없다."},
  {type:"cycle", title:"탄소 순환 — 네 권역 사이의 이동", nodes:[{t:"기권",d:"CO₂"},{t:"생물권",d:"광합성 ↓ · 호흡 ↑"},{t:"지권",d:"석회암·화석 연료"},{t:"수권",d:"용해 · 탄산 이온"}], center:"탄소 순환", note:"화살표 이름: 기권→생물권 광합성, 생물권→기권 호흡·분해, 지권→기권 연소·화산 분출, 기권↔수권 용해. 탄소가 가장 많은 곳은 **지권**."}
 ],

 "sci-h1-life": [
  {type:"table", title:"생명 시스템 한눈 정리", head:["구분","핵심","주의"], rows:[
   ["세포막","인지질 2중층 + 단백질","선택적 투과성"],
   ["확산","고농도 → 저농도","O₂·CO₂ 직접 통과"],
   ["삼투","**물**이 고농도 쪽으로","적혈구: 저장액 터짐"],
   ["효소","활성화 에너지 ↓","반응열 불변 · 재사용"],
   ["효소 조건","기질 특이성 · 온도·pH","펩신 pH 2, 트립신 pH 8"],
   ["유전정보","DNA → RNA → 단백질","코돈 3개 = 아미노산 1"]
  ], note:"식물 세포는 고장액에서 원형질 분리. 효소는 반응의 방향과 반응열은 바꾸지 않는다."},
  {type:"flow", title:"유전정보의 흐름: 전사 → 번역", steps:[{t:"DNA",d:"유전자 구간"},{t:"전사",d:"T→A, A→U, G↔C",hi:true},{t:"mRNA",d:"코돈 = 염기 3개"},{t:"번역",d:"코돈 1 = 아미노산 1",hi:true},{t:"단백질",d:"아미노산 사슬"}], note:"RNA 에는 T 가 없다. 주형 TAC GGA → mRNA AUG CCU → 코돈 2개 = 아미노산 2개."},
  {type:"svg", title:"세포막 개략 — 확산과 막단백질 통과", svg:"<svg viewBox='0 0 360 160' role='img' aria-label='세포막 개략'><defs><g id='sh1lip'><circle cx='0' cy='0' r='6' fill='var(--line)' stroke='var(--ink)'/><line x1='-3' y1='6' x2='-3' y2='18' stroke='var(--ink)'/><line x1='3' y1='6' x2='3' y2='18' stroke='var(--ink)'/></g><g id='sh1lipb'><circle cx='0' cy='0' r='6' fill='var(--line)' stroke='var(--ink)'/><line x1='-3' y1='-6' x2='-3' y2='-18' stroke='var(--ink)'/><line x1='3' y1='-6' x2='3' y2='-18' stroke='var(--ink)'/></g></defs><use href='#sh1lip' x='20' y='56'/><use href='#sh1lip' x='40' y='56'/><use href='#sh1lip' x='60' y='56'/><use href='#sh1lip' x='80' y='56'/><use href='#sh1lip' x='100' y='56'/><use href='#sh1lip' x='120' y='56'/><use href='#sh1lip' x='140' y='56'/><use href='#sh1lip' x='220' y='56'/><use href='#sh1lip' x='240' y='56'/><use href='#sh1lip' x='260' y='56'/><use href='#sh1lip' x='280' y='56'/><use href='#sh1lip' x='300' y='56'/><use href='#sh1lip' x='320' y='56'/><use href='#sh1lip' x='340' y='56'/><use href='#sh1lipb' x='20' y='104'/><use href='#sh1lipb' x='40' y='104'/><use href='#sh1lipb' x='60' y='104'/><use href='#sh1lipb' x='80' y='104'/><use href='#sh1lipb' x='100' y='104'/><use href='#sh1lipb' x='120' y='104'/><use href='#sh1lipb' x='140' y='104'/><use href='#sh1lipb' x='220' y='104'/><use href='#sh1lipb' x='240' y='104'/><use href='#sh1lipb' x='260' y='104'/><use href='#sh1lipb' x='280' y='104'/><use href='#sh1lipb' x='300' y='104'/><use href='#sh1lipb' x='320' y='104'/><use href='#sh1lipb' x='340' y='104'/><rect x='155' y='46' width='50' height='68' rx='12' fill='var(--acc)' opacity='.22' stroke='var(--acc)' stroke-width='1.5'/><text x='180' y='84' text-anchor='middle' font-size='12' fill='var(--ink)'>막단백질</text><line x1='80' y1='26' x2='80' y2='132' stroke='var(--ink)' stroke-width='1.5' stroke-dasharray='4 3'/><polygon points='80,138 75,128 85,128' fill='var(--ink)'/><text x='80' y='18' text-anchor='middle' font-size='12' fill='var(--ink)'>O₂ · CO₂</text><text x='80' y='154' text-anchor='middle' font-size='12' fill='var(--ink)'>확산(직접 통과)</text><line x1='180' y1='26' x2='180' y2='132' stroke='var(--acc)' stroke-width='1.5'/><polygon points='180,138 175,128 185,128' fill='var(--acc)'/><text x='180' y='18' text-anchor='middle' font-size='12' fill='var(--acc)'>포도당 · 이온</text><text x='180' y='154' text-anchor='middle' font-size='12' fill='var(--acc)'>막단백질 통과</text><text x='290' y='30' text-anchor='middle' font-size='12' fill='var(--ink)'>세포 밖</text><text x='290' y='138' text-anchor='middle' font-size='12' fill='var(--ink)'>세포 안</text><text x='290' y='154' text-anchor='middle' font-size='12' fill='var(--ink)'>인지질 2중층</text></svg>", note:"확산은 고농도 → 저농도. 삼투에서는 물이 반투과성 막을 지나 용질 농도가 높은 쪽으로 이동."}
 ],

 /* ===== 통합과학2 I. 변화와 다양성 ===== */
 "sci-h1-chem-change": [
  {type:"table", title:"산 · 염기 비교", head:["구분","산","염기"], rows:[
   ["내는 이온","**H⁺**","**OH⁻**"],
   ["예","HCl·H₂SO₄·CH₃COOH","NaOH·KOH·Ca(OH)₂"],
   ["맛·촉감","신맛","쓴맛·미끈"],
   ["BTB","노랑","파랑"],
   ["기타 지시약","푸른 리트머스 → 붉게","페놀프탈레인 → 붉게"],
   ["반응","금속과 반응 → H₂","단백질 녹임"]
  ], note:"중화: H⁺ + OH⁻ → H₂O (+ 염), 열 발생. 제산제·석회·레몬이 활용 예."},
  {type:"chart", kind:"line", title:"중화 적정: HCl 에 NaOH 를 넣을 때 이온 수", x:["0","1","2","3","4","5"], series:[{name:"H⁺",data:[4,3,2,1,0,0]},{name:"OH⁻",data:[0,0,0,0,0,1]},{name:"Na⁺",data:[0,1,2,3,4,5]},{name:"Cl⁻",data:[4,4,4,4,4,4]}], xlabel:"넣은 NaOH 양(상대값)", ylabel:"이온 수(상대값)", ymin:0, note:"중화점(4)에서 H⁺ = 0, 온도 **최고**·전기 전도도 **최저**. Cl⁻ 는 일정, Na⁺ 는 계속 증가, OH⁻ 는 중화점 뒤부터 증가 → 전도도 다시 상승."},
  {type:"table", title:"산화·환원 · 발열·흡열 정리", head:["구분","정의·특징","예"], rows:[
   ["산화","산소 얻음 · **전자 잃음**","연소, 철의 부식, CO→CO₂"],
   ["환원","산소 잃음 · **전자 얻음**","Fe₂O₃→Fe, Ag⁺→Ag"],
   ["동시성","산화·환원은 항상 동시","Cu→Cu²⁺ · Ag⁺→Ag"],
   ["발열 반응","열 방출, 주위 온도 ↑","연소·중화·손난로"],
   ["흡열 반응","열 흡수, 주위 온도 ↓","질산 암모늄 용해·냉찜질"]
  ], note:"광합성 = CO₂ 환원(흡열), 세포 호흡 = 포도당 산화. 산소가 없으면 이온 전하 변화로 판단."}
 ],

 "sci-h1-evolution": [
  {type:"table", title:"지질 시대 한눈 정리", head:["시대","대표 생물","사건"], rows:[
   ["선캄브리아","남세균","최초 생명 · 산소 증가"],
   ["고생대","삼엽충·필석·어류·양치식물","육상 진출 · 말기 최대 멸종"],
   ["중생대","공룡·암모나이트·겉씨식물","—"],
   ["신생대","포유류·속씨식물·매머드","화폐석 · 인류 출현"]
  ], note:"표준 화석 = 짧게 살고 넓게 분포 → **시대** / 시상 화석 = 환경에 민감(산호·고사리) → **환경**. 대멸종은 다섯 번."},
  {type:"flow", title:"자연선택의 단계", steps:[{t:"변이 존재",d:"돌연변이·유성생식"},{t:"환경이 선택",d:"유리한 변이"},{t:"생존·번식 차이",d:"더 많이 남김"},{t:"집단 비율 변화",d:"세대를 거치며",hi:true}], note:"개체가 변하는 것이 아니라 **집단의 비율**이 변한다. 항생제는 내성을 만들지 않고 이미 있던 내성 변이를 선택할 뿐."},
  {type:"table", title:"생물다양성 3수준", head:["수준","뜻","의의"], rows:[
   ["유전적 다양성","한 종 안의 변이","환경 변화에 생존 가능성"],
   ["종 다양성","종 수 + 개체 수 고른 정도","한 종 압도적이면 낮음"],
   ["생태계 다양성","다양한 생태계","—"]
  ], note:"감소 원인: 서식지 파괴·외래종·남획·오염·기후 변화. 보전: 서식지 보호·종자 은행·국립공원."},
  {type:"chart", kind:"bar", title:"종 다양성 비교 — 종 수가 같은 두 숲", x:["종1","종2","종3","종4","종5"], series:[{name:"숲 A",data:[90,2.5,2.5,2.5,2.5]},{name:"숲 B",data:[20,20,20,20,20]}], xlabel:"나무 종", ylabel:"비율(%)", ymin:0, ymax:100, note:"둘 다 5종이지만 개체 수가 고르게 분포한 **B** 의 종 다양성이 높다(A 의 나머지 네 종 비율은 예시 값)."}
 ],

 /* ===== 통합과학2 II·III. 환경과 에너지 · 과학과 미래 사회 ===== */
 "sci-h1-ecosystem": [
  {type:"table", title:"생태계·기후 변화 한눈 정리", head:["구분","내용","예"], rows:[
   ["작용","비생물 → 생물","추운 지방 여우의 작은 귀"],
   ["반작용","생물 → 비생물","지렁이의 토양 개량"],
   ["상호작용","생물 ↔ 생물","경쟁·포식·공생·기생"],
   ["에너지·물질","에너지 흐름 · 물질 순환","열로 방출 → 위로 감소"],
   ["온실 효과","지표 적외선 흡수·재방출","강화 = 지구온난화"],
   ["엘니뇨","무역풍 약화","동태평양 수온 ↑"]
  ], note:"온실 효과 자체는 생명에 필수(평균 약 15 ℃). 서술형은 '온실 효과의 **강화**'로 쓴다."},
  {type:"cycle", title:"생태계의 물질 순환", nodes:[{t:"생산자",d:"광합성"},{t:"소비자",d:"먹이 그물"},{t:"분해자",d:"사체·배설물 분해"},{t:"비생물 환경",d:"토양·공기"}], center:"물질 순환", note:"탄소·질소 같은 물질은 분해자를 거쳐 순환하지만, **에너지는 순환하지 않는다** — 각 단계에서 열로 빠져나가 태양이 계속 공급해야 한다."},
  {type:"flow", title:"생태계 평형의 회복(1차 소비자가 늘었을 때)", steps:[{t:"1차 소비자 ↑",d:"원인",hi:true},{t:"생산자 ↓ · 2차 ↑",d:"시간차"},{t:"1차 소비자 ↓",d:"먹이 부족·포식"},{t:"원래대로 회복",d:"평형"}], note:"먼저 변한 단계가 원인. 바로 위 단계는 같은 방향, 바로 아래 단계는 반대 방향으로 시간차를 두고 변한다. 먹이 그물이 복잡할수록 안정."}
 ],

 "sci-h1-energy": [
  {type:"table", title:"발전 방식과 에너지 전환", head:["발전","에너지 전환","기원·비고"], rows:[
   ["화력","화학 → 열 → 운동 → 전기","연료 연소, 태양 기원"],
   ["수력","위치 → 운동 → 전기","태양 기원"],
   ["핵발전","**핵분열** 열 → 증기 → 전기","우라늄"],
   ["태양광","빛 → 전기(p-n 접합)","터빈 X"],
   ["조력 · 지열","조석 차 / 지구 내부 열","태양 기원 **아님**"],
   ["수소 연료 전지","H₂ + O₂ → H₂O","생성물은 물뿐"]
  ], note:"터빈 발전의 공통 원리 = **전자기 유도**. 송전은 고전압으로 손실을 줄인다. 태양 = 핵융합, 원전 = 핵분열."},
  {type:"flow", title:"화력 발전의 에너지 전환", steps:[{t:"연료",d:"화학 E"},{t:"연소 · 열",d:"증기"},{t:"터빈",d:"운동 E"},{t:"발전기",d:"전자기 유도",hi:true},{t:"전기 E",d:"고전압 송전"}], note:"뒷부분 '터빈 → 발전기 → 전기'는 고정. 수력·풍력은 운동 E 로, 화력·핵은 열로 시작한다."},
  {type:"formula", title:"에너지 효율", tex:"\\text{효율}(\\%) = \\frac{\\text{유용하게 쓴 에너지}}{\\text{공급 에너지}} \\times 100", where:["유용 E = 공급 E − 손실 E(열)","두 단계면 전체 효율 = 효율₁ × 효율₂","예: 100 J 공급, 빛 30 J → 30 %"], note:"총량은 보존되지만 손실분이 열로 흩어져 쓸 수 있는 에너지는 줄어든다. 태양 에너지의 근원: 수소 핵융합, E = mc²."},
  {type:"svg", title:"발전의 원리 — 전자기 유도", svg:"<svg viewBox='0 0 340 160' role='img' aria-label='전자기 유도'><rect x='18' y='66' width='84' height='30' rx='3' fill='var(--line)' stroke='var(--ink)'/><text x='40' y='86' text-anchor='middle' font-size='13' font-weight='700' fill='var(--ink)'>S</text><text x='82' y='86' text-anchor='middle' font-size='13' font-weight='700' fill='var(--acc)'>N</text><line x1='106' y1='81' x2='124' y2='81' stroke='var(--acc)' stroke-width='2.5'/><polygon points='132,81 122,75 122,87' fill='var(--acc)'/><text x='60' y='56' text-anchor='middle' font-size='12' fill='var(--ink)'>자석(움직임)</text><ellipse cx='150' cy='81' rx='7' ry='26' fill='none' stroke='var(--ink)' stroke-width='1.5'/><ellipse cx='168' cy='81' rx='7' ry='26' fill='none' stroke='var(--ink)' stroke-width='1.5'/><ellipse cx='186' cy='81' rx='7' ry='26' fill='none' stroke='var(--ink)' stroke-width='1.5'/><ellipse cx='204' cy='81' rx='7' ry='26' fill='none' stroke='var(--ink)' stroke-width='1.5'/><ellipse cx='222' cy='81' rx='7' ry='26' fill='none' stroke='var(--ink)' stroke-width='1.5'/><ellipse cx='240' cy='81' rx='7' ry='26' fill='none' stroke='var(--ink)' stroke-width='1.5'/><text x='195' y='126' text-anchor='middle' font-size='12' fill='var(--ink)'>코일</text><line x1='150' y1='55' x2='150' y2='22' stroke='var(--ink)' stroke-width='1.5'/><line x1='150' y1='22' x2='300' y2='22' stroke='var(--ink)' stroke-width='1.5'/><line x1='300' y1='22' x2='300' y2='66' stroke='var(--ink)' stroke-width='1.5'/><circle cx='300' cy='81' r='15' fill='none' stroke='var(--acc)' stroke-width='2'/><text x='300' y='86' text-anchor='middle' font-size='13' font-weight='700' fill='var(--acc)'>G</text><line x1='300' y1='96' x2='300' y2='140' stroke='var(--ink)' stroke-width='1.5'/><line x1='300' y1='140' x2='240' y2='140' stroke='var(--ink)' stroke-width='1.5'/><line x1='240' y1='140' x2='240' y2='107' stroke='var(--ink)' stroke-width='1.5'/><text x='225' y='14' text-anchor='middle' font-size='12' fill='var(--acc)'>유도 전류 (검류계 G)</text><text x='170' y='154' text-anchor='middle' font-size='12' fill='var(--ink)'>코일 속 자기장이 변하면 → 유도 전류</text></svg>", note:"발전기는 자석·코일을 회전시켜 자기장을 계속 바꾼다. 화력·수력·핵발전 모두 터빈으로 이 회전을 만든다."}
 ]
});
