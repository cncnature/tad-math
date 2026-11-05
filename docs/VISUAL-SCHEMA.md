# 학습 시각 자료 스키마 — `data/visuals/<파일>.js` (렌더러 `js/visual.js`)

왜: 글만 있는 차시와 **표·도식·그래프**가 함께 있는 차시는 기억·이해 차이가 크다(이중 부호화, Mayer 멀티미디어 원리). 모든 차시에 최소 **요약정리표 1개 + 도식(흐름·비교·연표·순환·개념도·그래프 중 1개)** 를 붙이는 것이 목표. 교과서 그림·사진은 쓰지 않고(저작권) 스펙으로 새로 그린다.

파일 형식 (차시 id → 시각 자료 배열; 사이트·검사·브리핑이 자동 병합):
```js
window.DATA = window.DATA || {}; (window.DATA.visualsAdd = window.DATA.visualsAdd || []).push({
 "sci-photosyn": [
  {type:"table", title:"광합성 vs 호흡 요약", head:["구분","광합성","호흡"], rows:[["장소","엽록체","미토콘드리아(모든 세포)"],["시간","빛 있을 때","항상"],["기체","CO₂ 흡수·O₂ 방출","O₂ 흡수·CO₂ 방출"]], note:"첫 열은 행 머리말로 굵게 표시"},
  {type:"flow", title:"광합성 과정", steps:[{t:"물 + CO₂",d:"재료"},{t:"빛에너지",d:"엽록체",hi:true},{t:"포도당 + O₂",d:"산물"},{t:"녹말로 저장"}], dir:"h"},
  {type:"compare", title:"세 요인 그래프 비교", items:[{name:"빛의 세기",points:["증가 후 일정"]},{name:"CO₂ 농도",points:["증가 후 일정"]},{name:"온도",points:["적정 온도까지 증가","너무 높으면 **급감**"]}]},
  {type:"timeline", title:"연표", events:[{y:"1392",t:"조선 건국"},{y:"1446",t:"훈민정음 반포",hi:true}]},
  {type:"cycle", title:"물의 순환", nodes:[{t:"증발"},{t:"응결",d:"구름"},{t:"강수"},{t:"유출"}], center:"태양 에너지"},
  {type:"chart", kind:"bar"|"line", title:"수요·공급", x:["100","200","300"], series:[{name:"수요량",data:[50,30,10]},{name:"공급량",data:[10,30,50]}], xlabel:"가격(원)", ylabel:"수량", ymin:0},
  {type:"tree", title:"음운 체계", root:{t:"음운", children:[{t:"자음",children:["조음 위치","조음 방법","소리의 세기"]},{t:"모음",children:["단모음","이중 모음"]}]}},
  {type:"formula", title:"전력", tex:"P = VI = I^2R = \\\\frac{V^2}{R}", where:["P 전력(W)","V 전압(V)","I 전류(A)"]},
  {type:"svg", title:"직각삼각형", svg:"<svg viewBox='0 0 200 140'>…</svg>"},
  {type:"img", title:"사진", src:"assets/…", alt:"…", credit:"Wikimedia Commons, CC BY-SA 4.0, 저자"}
 ]
});
```

규칙
- 파일 이름: `data/visuals/<과목 id>-<학년>.js` (예: `sci-g22.js`, `kor-h1.js`, `math-g22.js`). 한 차시에 2~4개. 첫 번째는 되도록 `table`(시험 직전 요약표).
- 글자는 짧게(표 셀 20자, 도식 박스 14자 이내). 수식은 `formula` 또는 셀 안 `$…$`.
- `svg` 는 외부 리소스·스크립트 없이, viewBox 와 `fill`/`stroke` 에 CSS 변수(`var(--ink)`, `var(--acc)`, `var(--line)`) 사용 가능. 단순 도형(삼각형·회로·세포·지도 개략)만 직접 그린다.
- `img` 는 자체 제작 또는 퍼블릭 도메인/CC 라이선스(출처·저자·라이선스 `credit` 필수). 교과서·문제집 이미지 금지.
- 검사: `node scripts/check.js` 가 차시 존재·타입·표 열 수·그래프 길이·svg 형식·img 출처를 검사한다. `node scripts/audit.js` 가 시각 자료 없는 차시 수를 센다.
