# 수학 인물 초상 추가하기 (퍼블릭 도메인)

Wikimedia Commons 에는 저작권이 만료된 초상(흉상·판화·회화)이 많습니다. 아래 검색어로 파일을 찾아
`assets/people/<이름>.jpg` 로 저장한 뒤 `data/people.js` 의 해당 인물에 `img:"assets/people/<이름>.jpg"` 를 넣으면
인물 카드에 자동으로 표시됩니다. (라이선스 표시가 **Public domain** 또는 **CC0** 인 파일만 사용하세요.)

| 인물 | Commons 검색어 | 비고 |
|---|---|---|
| 탈레스 | Thales of Miletus bust | 판화·흉상 PD |
| 피타고라스 | Kapitolinischer Pythagoras | 카피톨리니 흉상 사진(CC0 판 있음) |
| 유클리드 | Euclid Raphael School of Athens detail | 라파엘로 회화 PD |
| 아르키메데스 | Domenico Fetti Archimedes | 1620년 회화 PD |
| 히파르코스 | Hipparchos engraving | 판화 PD |
| 알콰리즈미 | Al-Khwarizmi stamp 1983 | 우표 — 저작권 확인 필요, 대신 Khiva 동상 사진(CC) 권장 |
| 브라마굽타 | Brahmagupta | 초상 없음 — 《브라마스푸타싯단타》 사본 이미지 |
| 카르다노 | Gerolamo Cardano portrait | 16세기 판화 PD |
| 데카르트 | Frans Hals René Descartes | 할스 회화 PD |
| 갈릴레이 | Justus Sustermans Galileo | 수스테르만스 회화 PD |
| 파스칼 | Blaise Pascal Versailles | 베르사유 소장 초상 PD |
| 페르마 | Pierre de Fermat portrait | 17세기 초상 PD |
| 오일러 | Leonhard Euler Handmann | 한트만 회화(1753) PD |
| 가우스 | Carl Friedrich Gauss Jensen | 옌센 회화(1840) PD |
| 피어슨 | Karl Pearson 1910 | 1910년 사진 PD |
| 튜키 | John Tukey | 사진 — 대부분 저작권 있음, 생략 권장 |
| 이상혁 | — | 초상 없음, 《산술관견》 표지 이미지(규장각) 확인 |

한 줄 예시 (`data/people.js`):
```js
{ name:"가우스", years:"1777~1855", img:"assets/people/gauss.jpg", ... }
```
