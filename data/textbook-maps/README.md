# 교과서 대조표 — `data/textbook-maps/<과목>-<학년대>-<출판사>.js`

학생이 '교과서 고르기'(#/textbooks)에서 출판사를 고르면, 같은 키(`sid|band|pub`)의 대조표가 있을 때 단원의 `order`(차례 순서)·`tb`(교과서 단원 표기)·`term`(1학기면 1)을 덧씌운다(js/merge.js, overrides 보다 먼저 적용되므로 overrides 가 최종). band: m1 m2 m3 h1 h2 h3. pub 는 `data/textbooks.js` 의 `pub(author)` 문자열과 정확히 같아야 한다.

```js
window.DATA = window.DATA || {}; (window.DATA.textbookMapsAdd = window.DATA.textbookMapsAdd || []).push({
 sid:"his", grade:"m3", pub:"비상교육(이병인)", status:"추정|확인", src:"차례를 확인한 URL",
 units:{ "his-ancient":{order:1,term:1,tb:"비상 역사② Ⅰ 국가의 형성과 발전"}, … },
 missing:["교과서에 있는데 사이트에 없는 소단원 — 자동 조사가 채움"] });
```
주간 자동 조사(scripts/weekly-advisor.md 4-1'')가 교과서 차례가 공개되면 `status:"확인"` 으로 바꾸고 누락 소단원을 `<과목>-g<학년>-<출판사>.js` 로 추가한다.
