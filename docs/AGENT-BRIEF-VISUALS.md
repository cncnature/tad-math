# 시각 자료 작성 지침 (에이전트용)

1. `docs/VISUAL-SCHEMA.md` 를 읽고 `js/visual.js` 의 타입을 정확히 지킨다. 지정된 소스 파일(차시 데이터)을 읽어 **모든 차시**에 시각 자료를 만든다. 출력은 지정된 `data/visuals/<이름>.js` 하나(형식: `window.DATA = window.DATA || {}; window.DATA.visuals = Object.assign(window.DATA.visuals || {}, { "<차시 id>": [ … ], … });`). 다른 파일은 수정하지 않는다.
2. 차시마다 **2~3개**: ① `table` 요약정리표(시험 직전 한눈 정리, 3~6행 × 2~4열, 첫 열은 행 머리말) 는 필수. ② 내용에 맞는 도식 1개: 과정·절차 → `flow`, 둘 이상 비교 → `compare`, 역사 → `timeline`, 순환 → `cycle`, 수치 관계 → `chart`, 분류·체계 → `tree`, 공식 → `formula`, 도형·장치·구조 → 직접 그린 단순 `svg`(viewBox, `var(--ink)` `var(--acc)` `var(--line)` 색만). ③ 필요하면 하나 더.
3. 내용은 그 차시의 concept/pitfalls/points 에 있는 사실만 쓴다(새 사실·수치 추가 금지). 교과서 그림·도표·사진을 베끼지 않는다. `img` 는 쓰지 않는다.
4. 글자 길이: 표 셀 ≤ 20자, 도식 박스 ≤ 14자, 연표 항목 ≤ 30자, 그래프 x 라벨 ≤ 6자. 수식은 `formula` 의 `tex`(KaTeX) 또는 표 셀 `$…$`. svg 안의 글자는 `font-size` 12~14 로 적고 viewBox 는 가로 260~420.
5. 검증(반드시): `cd /home/claude/tad-math && node -e 'global.window={};const fs=require("fs");eval(fs.readFileSync("data/visuals/<이름>.js","utf8"));const V=window.DATA.visuals;const VIS=require("./js/visual.js");let n=0;for(const id in V){for(const v of V[id]){n++;const h=VIS.render(v);if(!h||h.includes("시각 자료 오류"))throw id+" "+v.type;}}console.log("OK visuals",n)'` 그리고 (index.html 에 아직 안 실려도) `node scripts/check.js` 가 시각 자료 검사를 통과하는지 — check.js 는 `data/visuals/*.js` 를 모두 읽으므로 그대로 실행하면 된다.
6. 보고: 차시 수, 시각 자료 수, 타입 분포, 어려웠던 점.
