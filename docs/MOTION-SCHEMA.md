# 모션 풀이 형식 (motion 필드)

모션은 영역별 파일 `data/csat/motion-<영역>.js` 에 `(window.DATA.csatMotion = window.DATA.csatMotion || {})["<패턴 또는 고난도 id>"] = { ... };` 형식으로 등록한다(index.html 에 실림). 이렇게 등록하면 수능 전략 패턴이나 고난도 해부의 해당 페이지에 '🎬 모션으로 이해하기'가 나타난다. 그리는 쪽은 js/motion.js 다. 무대는 640×360 SVG이고, 단계(steps)마다 요소가 그려지거나 나타나고 강조된다. 화면 아래에는 그 단계의 설명이 함께 나온다.

## 차시 단계별 풀이 판서 (data/lesson-motion)

같은 형식을 `data/lesson-motion/<과목>-<학년>.js` 에 `(window.DATA.lessonMotion = window.DATA.lessonMotion || {})["<차시 또는 수학 소단원 id>"] = { ... }` 로 등록하면, 그 차시 페이지(#/sub/과목/차시 또는 #/study/단원/소단원) 맨 위에 '🖊 선생님 판서 — 단계별 풀이'(판서·모션 탭)가 나온다. 판서는 js/board.js 의 fromMotion 이 모션을 2.5배 키워 손글씨로 바꾼 것이다. 등록하지 않은 차시도 js/board-auto.js 가 핵심 개념·한눈에 보기·예제(문제→풀이 한 줄씩→답 상자)·한 문장 정리를 자동 판서로 만든다. 새 파일은 index.html 에 script 로 넣어야 하고, check-csat.js 가 대상 차시와 형식을 검사한다.

## 설계 원칙 (Mayer 멀티미디어 학습 원리)

- **한 단계, 한 생각:** 한 단계에서는 새 요소를 1~3개만 보여 준다(분절).
- **강조와 설명을 같은 순간에:** 지금 설명하는 요소를 `hi` 로 깜빡이게 하고, 설명 문장도 그 순간에 그 요소를 가리킨다(신호 주기, 시간 근접).
- **패턴의 일반 원리를 보여 준다:** 이 패턴의 본문제(q) 정답을 그대로 보여 주지 않는다. 숫자를 바꾼 예제로 원리를 보여 준다.
- **분량:** 단계는 4~8개, 단계마다 설명(say)은 90자 이내. 설명에는 **굵게**, ==형광==, $수식$ 을 쓸 수 있다.

## 형식

```js
motion:{
  title:"삼차함수 구간 최대·최소 — 극값과 끝값 비교",   // 40자
  frame:{ x:[-2,4], y:[-4,6], step:1, ystep:2, xl:"x", yl:"y", grid:true, ticks:true },  // 좌표 무대(선택). 없으면 640×360 픽셀 좌표 무대
  els:[ /* 요소 목록, 모든 요소는 고유 id */ ],
  steps:[ { say:"설명", show:["id"...], hi:["id"...], hide:["id"...], tex:"$f'(x)=0$" } ]
}
```

좌표 무대(frame 있음)에서 `at·from·to·pts` 는 수학 좌표다. 픽셀 무대(frame 없음)에서는 640×360 안의 픽셀 좌표다(왼쪽 위가 0,0).

## 요소 (k)

| k | 필드 | 움직임 | 쓰임 |
|---|---|---|---|
| curve | f:"x^3-3x"(x의 식), x:[a,b], c, t(이름표), lx(이름표 x), dash | 선이 그려짐 | 함수 그래프 |
| area | f, g(기본 "0"), x:[a,b], c, op, t | 서서히 채워짐 | 넓이·정적분 |
| point | at:[x,y], t, c, open(빈 점), dx, dy | 튀어나옴 | 교점·극값·끝점 |
| line / arrow | from, to, t, c, dash, w | 선이 그려짐 | 접선·변화·힘·이동 |
| vline / hline | x 또는 y, t | 점선 | 경계·기준선 |
| poly | pts:[[x,y]...], labels:["A","B"...], fill | 선이 그려짐 | 삼각형·도형 |
| circle | at, r, fill, t | 선이 그려짐 | 원·외접원 |
| label | at, t, big, anchor | 떠오름 | 짧은 글자 |
| box | at(중심), w, h, t("줄1\n줄2"), c, fill | 떠오름 | 개념 상자·단계 상자·지문 요약 |
| tex | at(중심), t:"$...$", w, h | 떠오름 | 무대 위 수식 |
| bars | at:[왼쪽 아래 x, y], data:[...], labels, vl(값 이름표), cs(막대별 색), bw, gap, h | 막대가 자람 | 도표·인구·확률 분포 |
| table | at:[왼쪽 위], head:[...], rows:[[...]...], cw, rh | 행이 차례로 | 자료표·경우 정리 |
| text | at:[왼쪽 위 기준선], parts:[{t:"단어/구", id, c}], width, lh | 떠오름. 칩 id 를 hi 에 넣으면 그 칩이 빨갛게 강조 | 영어·국어 문장 구조, 단서어 표시 |

- **색(c):** 0 파랑, 1 빨강, 2 초록, 3 노랑, 4 보라, 5 청록, 6 회색. 또는 "#hex".
- **식(f):** 숫자, x, + - * / ^ ( ), 함수 sin cos tan exp ln log(상용) log2 sqrt abs, 상수 pi, e 를 쓸 수 있다. 곱셈은 `2x`, `3(x-1)` 처럼 생략해도 된다. 단, 함수 이름 앞에 숫자를 붙여 쓰는 표기는 피하고 `2*sin(x)` 로 쓴다.
- **text 칩:** text 요소의 칩에도 id 를 주면, steps 의 hi 에 그 칩 id 를 넣어 강조할 수 있다. 칩은 text 요소가 show 된 뒤에만 보인다.

## 과목별 예

- **수학:** 그래프(curve·point·vline·area), 도형(poly·circle·line), 경우의 수·확률(table·bars·box).
- **과학:** 그래프(속도-시간·힘-시간 → area 로 충격량), 모식도(box·arrow), 이온 수 막대(bars).
- **사회:** 도표(bars·table), 기후 그래프(curve·bars), 관점 비교(box·arrow).
- **한국사:** 연표(hline + point·label), 사건 흐름(box·arrow).
- **국어·영어:** 문장·지문 구조(text 칩 강조), 논리 흐름(box·arrow), 선지 판단표(table).

## 검사

`node scripts/check-csat.js` 가 motion 을 검사한다. 확인 항목은 요소 id 가 고유한지, steps 가 참조하는 id 가 있는지, 식(f)이 해석되는지, 단계 수가 3~10개인지다.
