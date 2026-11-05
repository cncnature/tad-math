# 과목 확장 작성 지침 (콘텐츠 에이전트용)

공통 조건 — **모든 내용은 2022 개정 교육과정(교육부 고시 제2022-33호) 기준**이어야 한다. 2015 개정의 과목명(국어·영어·통합사회(단일)·한국사(단일)·화법과 작문·언어와 매체·독서)이나 2015 성취기준 코드를 쓰면 안 된다. 2022 개정 과목명 예: 공통국어1·2, 공통영어1·2, 통합사회1·2, 통합과학1·2, 한국사1·2, 화법과 언어, 독서와 작문, 문학, 영어Ⅰ, 영어Ⅱ. 중학교는 2022 개정 중학교 성취기준([9국xx-xx], [9영xx-xx], [9과xx-xx], [9사(일사)xx-xx]/[9사(지리)xx-xx], [9역xx-xx]).

1. 먼저 `docs/SUBJECT-SCHEMA.md` 를 읽고, 기존 파일(`data/subjects/<과목>.js`)의 문체·분량을 본다. **기존 파일은 수정하지 않는다.** 지정된 확장 파일 하나만 쓴다.
2. 확장 파일 형식(파일 전체를 이 형식으로 덮어쓴다):
```js
// <과목> <학년> — 2022 개정 교육과정 기준. 출처·추정 사항: (여기에 적는다)
window.DATA = window.DATA || {}; window.DATA.subjectsExtra = window.DATA.subjectsExtra || [];
window.DATA.subjectsExtra.push({ sid:"soc", grade:"h1",
 src:[["실제로 연 자료 제목","https://..."], ...],
 units:[
  { id:"soc-h1-...", grade:"h1", title:"통합사회1 · 인권 보장과 헌법", std:["10통사1-03-01"], exam:"내신 출제 경향 한 줄",
    lessons:[ { id:"soc-h1-...", title:"...", std:["10통사1-03-01"], concept:[3~5], why:"...", pitfalls:[2~3], points:[3], pattern:[1~2], memo:"...", quiz:[3문항 4지선다 {q,opts,a,exp}] } ] }
 ]});
```
   - `sid` 는 kor/eng/sci/soc/his 중 하나. `grade` 는 중3 1학기 `g31`, 2학기 `g32`(단원마다 지정), 고1 `h1`, 고2 `h2`.
   - 모든 id 는 `<sid>-<학년>-...` 로 시작하고 유일해야 한다(예: `kor-g3-...`, `soc-h1-...`, `eng-h2-...`). 역사 단원은 `track:"korea"` 또는 `"world"` 를 붙인다.
   - 단원 제목 앞에 과목명을 붙인다(예: `통합과학1 · 물질의 규칙성과 성질`, `문학 · 서정 갈래의 이해`).
3. 조사(WebSearch·WebFetch): 2022 개정 해당 과목의 **성취기준 코드와 문장**, 2022 개정 교과서(2025·2026 발행)의 단원 구성, 내신·학력평가·수능 출제 경향. NCIC/교육부 PDF가 안 열리면 2차 자료(교육청·출판사 목차·학습 사이트)를 쓰고 파일 머리말에 '추정' 으로 표시한다. 실제로 연 URL만 `src` 에 넣는다.
4. 내용 규칙: 교과서·문제집·실제 문학 작품·기출 문항 원문을 베끼지 않는다. 국어·영어 지문은 짧은 자작 지문. 역사·과학·사회의 사실은 표준 교과 범위에서 쓰되 연도·수치는 확실한 것만. 각 문자열 200자 이내, `**굵게**` 와 `$수식$`(KaTeX) 가능.
5. 검증(반드시 통과시킬 것):
```bash
cd /home/claude/tad-math && node -e 'global.window={};eval(require("fs").readFileSync("data/subjects/<파일>.js","utf8"));const x=window.DATA.subjectsExtra[0];let n=0;const ids=new Set();for(const u of x.units){if(!u.id.startsWith(x.sid+"-")||ids.has(u.id))throw "unit id "+u.id;ids.add(u.id);if(!u.exam||!u.grade)throw "unit meta "+u.id;for(const l of u.lessons){n++;if(!l.id.startsWith(x.sid+"-")||ids.has(l.id))throw "lesson id "+l.id;ids.add(l.id);if(!(l.concept&&l.concept.length>=3&&l.pitfalls&&l.points&&l.points.length===3&&l.memo))throw "lesson fields "+l.id;if(l.quiz.length!==3)throw "quiz n "+l.id;for(const q of l.quiz){if(q.opts.length!==4||!(q.a>=0&&q.a<4)||!q.exp)throw "quiz "+l.id}}}console.log("OK lessons",n)' && node scripts/check.js
```
6. 보고: 단원·차시 목록(성취기준 코드 포함), 실제로 연 출처, 추정 사항.
