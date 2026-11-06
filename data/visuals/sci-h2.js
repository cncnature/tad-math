// 고2 과학 일반선택(물리학·화학·생명과학·지구과학) 시각 자료 — data/subjects/sci-h2.js 의 8차시. 전부 자작 스펙(교과서 그림 없음).
window.DATA = window.DATA || {}; (window.DATA.visualsAdd = window.DATA.visualsAdd || []).push({

 "sci-h2-phy-equilibrium": [
  {type:"table", title:"평형과 안정성 요약", head:["구분","내용"], rows:[["알짜힘","모든 힘의 벡터 합"],["돌림힘","τ = rF (수직 거리)"],["평형 조건","알짜힘 0 + 돌림힘 0"],["무게중심","연직선이 받침면 안"],["안정성","낮은 무게중심·넓은 받침면"]], note:"알짜힘이 0이어도 작용선이 다른 두 힘(짝힘)은 회전을 일으킨다."},
  {type:"svg", title:"시소의 돌림힘 평형", svg:"<svg viewBox='0 0 340 140' xmlns='http://www.w3.org/2000/svg'><g stroke='var(--ink)' stroke-width='2' fill='none'><path d='M30 70H310'/><path d='M170 70L155 100H185Z'/><rect x='45' y='45' width='30' height='25'/><rect x='255' y='50' width='22' height='20'/></g><g stroke='var(--acc)' stroke-width='2'><path d='M60 70V110M266 70V110'/><path d='M60 120H170M170 120H266' stroke-dasharray='4 3'/></g><g font-size='12' fill='var(--ink)' text-anchor='middle'><text x='60' y='38'>m₁</text><text x='266' y='42'>m₂</text><text x='115' y='134'>r₁</text><text x='218' y='134'>r₂</text><text x='170' y='20'>m₁g·r₁ = m₂g·r₂</text></g></svg>"},
  {type:"formula", title:"돌림힘과 평형 조건", tex:"\\tau = rF,\\qquad \\sum F = 0,\\quad \\sum \\tau = 0", where:["τ 돌림힘(N·m)","r 회전축에서 작용선까지 수직 거리(m)","F 힘(N)"]}
 ],
 "sci-h2-phy-motion": [
  {type:"table", title:"운동 법칙과 운동량 요약", head:["개념","식·핵심"], rows:[["제2법칙","$F = ma$"],["v-t 그래프","기울기 a, 넓이 변위"],["작용·반작용","크기 같음, 서로 다른 물체"],["충격량","$F\\Delta t = \\Delta p$"],["운동량 보존","외력 0이면 총합 일정"]], note:"작용·반작용은 서로 다른 물체에 작용하므로 상쇄되지 않는다."},
  {type:"compare", title:"힘의 평형 vs 작용·반작용", items:[{name:"힘의 평형",points:["**한 물체**에 작용하는 두 힘","크기 같고 방향 반대","합하면 0 (상쇄)"]},{name:"작용·반작용",points:["**서로 다른 두 물체**에 작용","크기 같고 방향 반대","상쇄되지 않음"]}]},
  {type:"flow", title:"충돌 문제 풀이 순서", steps:[{t:"방향 (+) 정하기"},{t:"전 운동량 합",d:"m₁v₁ + m₂v₂"},{t:"후 운동량 합",d:"같다고 놓기",hi:true},{t:"부호로 방향 판단"}], dir:"h"}
 ],
 "sci-h2-chem-mole": [
  {type:"table", title:"1 mol 의 여러 얼굴", head:["기준","1 mol 에 해당하는 양"], rows:[["입자 수","6.02×10²³개"],["질량","화학식량 g"],["기체 부피","22.4 L (0 ℃, 1 atm)"],["H₂O 예","18 g, 원자 3 mol"],["CO₂ 예","44 g/mol"]], note:"22.4 L는 0 ℃, 1 atm의 기체에만 적용한다."},
  {type:"svg", title:"몰을 중심으로 한 환산", svg:"<svg viewBox='0 0 360 200' xmlns='http://www.w3.org/2000/svg'><g fill='none' stroke='var(--ink)' stroke-width='2'><rect x='130' y='80' width='100' height='40' rx='8' stroke='var(--acc)'/><rect x='130' y='10' width='100' height='34' rx='6'/><rect x='10' y='150' width='110' height='34' rx='6'/><rect x='240' y='150' width='110' height='34' rx='6'/></g><g stroke='var(--line)' stroke-width='2'><path d='M180 44V80M150 120L80 150M210 120L280 150'/></g><g font-size='13' fill='var(--ink)' text-anchor='middle'><text x='180' y='105' fill='var(--acc)'>몰(mol)</text><text x='180' y='32'>질량(g)</text><text x='65' y='172'>입자 수</text><text x='295' y='172'>기체 부피(L)</text><text x='245' y='65' font-size='12'>÷ 몰 질량</text><text x='70' y='130' font-size='12'>× 6.02×10²³</text><text x='300' y='130' font-size='12'>× 22.4</text></g></svg>", note:"어떤 양이든 먼저 몰로 바꾼 뒤 원하는 양으로 바꾼다."}
 ],
 "sci-h2-chem-stoich": [
  {type:"table", title:"반응식의 양적 관계", head:["관계","2H₂ + O₂ → 2H₂O"], rows:[["계수비(몰비)","2 : 1 : 2"],["기체 부피비","H₂ : O₂ = 2 : 1"],["질량비","4 g : 32 g : 36 g"],["질량 보존","36 g = 36 g"],["분자 수 변화","3 → 2"]], note:"계수비 = 몰비 = 기체 부피비이지만 질량비와는 다르다."},
  {type:"table", title:"반응 전·후 표 (H₂ 2 mol + O₂ 2 mol)", head:["단계","H₂","O₂","H₂O"], rows:[["반응 전","2","2","0"],["반응","−2","−1","+2"],["반응 후","0","1","2"]], note:"먼저 0이 되는 H₂가 한계 반응물, O₂ 1 mol이 남는다."},
  {type:"flow", title:"양적 관계 계산 순서", steps:[{t:"반응식 계수 맞춤"},{t:"주어진 양 → mol"},{t:"계수비로 mol",hi:true},{t:"g·L로 바꾸기"}], dir:"h"}
 ],
 "sci-h2-bio-energy": [
  {type:"table", title:"동화 작용 vs 이화 작용", head:["구분","동화 작용","이화 작용"], rows:[["분자 크기","작은 → 큰","큰 → 작은"],["에너지","흡수","방출"],["예","광합성, 단백질 합성","세포 호흡"],["예 2","포도당 → 글리코젠","단백질 → 아미노산"]], note:"분자가 커지면 동화, 작아지면 이화."},
  {type:"cycle", title:"ATP와 ADP의 전환", nodes:[{t:"ATP",d:"인산 3개"},{t:"에너지 방출",d:"생명 활동"},{t:"ADP + 인산"},{t:"세포 호흡",d:"에너지 저장"}], center:"에너지 화폐"},
  {type:"flow", title:"세포 호흡", steps:[{t:"포도당 + O₂",d:"반응물"},{t:"미토콘드리아",d:"효소, 단계적",hi:true},{t:"CO₂ + H₂O",d:"생성물"},{t:"ATP + 열",d:"에너지"}], dir:"h"}
 ],
 "sci-h2-bio-organ": [
  {type:"table", title:"기관계 역할 요약", head:["기관계","주요 기관","역할"], rows:[["소화계","소장, 간","영양소 분해·흡수"],["호흡계","폐(폐포)","O₂ 흡수, CO₂ 배출"],["순환계","심장, 혈관","물질 운반"],["배설계","콩팥","요소를 오줌으로"]], note:"요소는 간에서 만들어지고 콩팥은 걸러 내보낸다."},
  {type:"svg", title:"기관계의 연결", svg:"<svg viewBox='0 0 380 210' xmlns='http://www.w3.org/2000/svg'><g fill='none' stroke='var(--ink)' stroke-width='2'><rect x='140' y='85' width='100' height='40' rx='8' stroke='var(--acc)'/><rect x='20' y='15' width='100' height='34' rx='6'/><rect x='260' y='15' width='100' height='34' rx='6'/><rect x='20' y='160' width='100' height='34' rx='6'/><rect x='260' y='160' width='100' height='34' rx='6'/></g><g stroke='var(--line)' stroke-width='2'><path d='M100 49L160 85M280 49L220 85M160 125L100 160M220 125L280 160'/></g><g font-size='13' fill='var(--ink)' text-anchor='middle'><text x='190' y='110' fill='var(--acc)'>순환계</text><text x='70' y='37'>소화계</text><text x='310' y='37'>호흡계</text><text x='70' y='182'>조직 세포</text><text x='310' y='182'>배설계</text><text x='105' y='70' font-size='12'>영양소</text><text x='280' y='70' font-size='12'>O₂ ⇄ CO₂</text><text x='100' y='145' font-size='12'>운반</text><text x='285' y='145' font-size='12'>요소</text></g></svg>", note:"기관계 사이의 물질 이동은 모두 순환계를 거친다."},
  {type:"flow", title:"질소 노폐물의 경로", steps:[{t:"단백질 분해",d:"조직 세포"},{t:"암모니아"},{t:"간",d:"요소로 전환",hi:true},{t:"콩팥",d:"오줌으로 배출"}], dir:"h"}
 ],
 "sci-h2-earth-seawater": [
  {type:"table", title:"해수의 층상 구조", head:["층","수온","특징"], rows:[["혼합층","거의 일정","바람이 강할수록 두꺼움"],["수온 약층","깊이 따라 급감","매우 안정, 대류 억제"],["심해층","낮고 일정","위도별 차이 작음"]], note:"혼합층 두께는 바람의 세기가 결정한다."},
  {type:"svg", title:"수온의 연직 분포(개략)", svg:"<svg viewBox='0 0 320 220' xmlns='http://www.w3.org/2000/svg'><g stroke='var(--ink)' stroke-width='2' fill='none'><path d='M50 20V205M50 20H300'/><path d='M260 20V60C240 100 120 110 90 140V205' stroke='var(--acc)'/></g><g stroke='var(--line)' stroke-dasharray='4 3'><path d='M50 60H300M50 140H300'/></g><g font-size='12' fill='var(--ink)'><text x='175' y='14' text-anchor='middle'>수온 →</text><text x='6' y='120'>깊이↓</text><text x='60' y='45'>혼합층</text><text x='60' y='105'>수온 약층</text><text x='60' y='175'>심해층</text></g></svg>", note:"개략도이며 수치는 넣지 않았다."},
  {type:"compare", title:"표층 염분을 바꾸는 요인", items:[{name:"염분 ↑",points:["증발량 증가","결빙(염류가 빠져나옴)","중위도 고압대"]},{name:"염분 ↓",points:["강수량 증가","하천수 유입","해빙(얼음이 녹음)"]}]}
 ],
 "sci-h2-earth-circulation": [
  {type:"table", title:"표층 순환 vs 심층 순환", head:["구분","표층 순환","심층 순환"], rows:[["원인","바람","밀도 차(수온·염분)"],["속도","빠름","매우 느림"],["침강 해역","—","그린란드·남극 주변"],["역할","열 운반","열 운반, 심해 산소 공급"]], note:"두 순환은 연결되어 전 지구를 도는 컨베이어 벨트를 이룬다."},
  {type:"svg", title:"대서양 심층 수괴의 깊이 순서(개략)", svg:"<svg viewBox='0 0 360 200' xmlns='http://www.w3.org/2000/svg'><g stroke='var(--ink)' stroke-width='2' fill='none'><path d='M20 30H340'/><path d='M20 185H340'/></g><g stroke='var(--acc)' stroke-width='2' fill='none'><path d='M40 40V170H320'/><path d='M320 40V130H60'/><path d='M80 40V75H300'/></g><g font-size='12' fill='var(--ink)'><text x='20' y='22'>남극 쪽</text><text x='300' y='22'>북쪽(그린란드)</text><text x='150' y='68'>남극 중층수 →</text><text x='130' y='123'>← 북대서양 심층수</text><text x='140' y='163'>남극 저층수 →</text><text x='150' y='198'>해저</text></g></svg>", note:"아래로 갈수록 밀도가 크다: 남극 저층수 > 북대서양 심층수 > 남극 중층수."},
  {type:"flow", title:"온난화와 심층 순환", steps:[{t:"빙하 융해"},{t:"담수 유입",d:"염분·밀도 ↓"},{t:"침강 약화",hi:true},{t:"심층 순환 약화",d:"열 수송 변화"}], dir:"h"}
 ]
});
