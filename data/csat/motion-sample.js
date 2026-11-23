// 모션 풀이 견본 2개 (형식: docs/MOTION-SCHEMA.md). 영역별 motion-<영역>.js 작성 때 참고.
window.DATA = window.DATA || {};
(window.DATA.csatMotion = window.DATA.csatMotion || {})["m-diff-cubic"] = {
 title:"삼차함수 구간 최대·최소 — 극값과 끝값을 함께 비교",
 frame:{ x:[-2,4], y:[-4,6], step:1, ystep:2 },
 els:[
  { id:"f", k:"curve", f:"x^3-3x^2+2", x:[-1.6,3.6], c:0, t:"y=f(x)", lx:3.3 },
  { id:"ab", k:"area", f:"6", g:"-4", x:[-1,3], c:6, op:.08 },
  { id:"a", k:"vline", x:-1, c:6, t:"x=-1" }, { id:"b", k:"vline", x:3, c:6, t:"x=3" },
  { id:"p0", k:"point", at:[0,2], c:1, t:"극대 2" }, { id:"p2", k:"point", at:[2,-2], c:1, t:"극소 -2", dy:20 },
  { id:"ea", k:"point", at:[-1,-2], c:2, t:"끝값 -2", dx:-70, dy:20 }, { id:"eb", k:"point", at:[3,2], c:2, t:"끝값 2" },
  { id:"mx", k:"hline", y:2, c:3 }, { id:"mn", k:"hline", y:-2, c:4 },
  { id:"res", k:"box", at:[3.1,4.9], w:190, h:52, t:"최댓값 2 (x=0, 3)\n최솟값 -2 (x=-1, 2)", c:1, fill:true }
 ],
 steps:[
  { say:"구간 **[-1, 3]** 을 먼저 표시한다. 최대·최소 후보는 **이 구간 안**에서만 찾는다.", show:["ab","a","b"], hi:["a","b"] },
  { say:"그래프를 그린다. 삼차함수는 극값 두 개에서 방향이 바뀐다.", show:["f"], hi:["f"], tex:"$f(x)=x^3-3x^2+2$" },
  { say:"$f'(x)=0$ 에서 **극대·극소**: $x=0$ 에서 2, $x=2$ 에서 $-2$.", show:["p0","p2"], hi:["p0","p2"], tex:"$f'(x)=3x^2-6x=3x(x-2)=0$" },
  { say:"==끝값도 후보==다. $f(-1)=-2$, $f(3)=2$ — 많이 놓치는 단계.", show:["ea","eb"], hi:["ea","eb"] },
  { say:"후보 네 개를 비교: 가장 큰 값 2, 가장 작은 값 $-2$.", show:["mx","mn"], hi:["mx","mn"] },
  { say:"결론. 키포인트: **극값 + 끝값**을 모두 줄 세운다.", show:["res"], hi:["res"] }
 ]
};
window.DATA.csatMotion["e-infer-blank-hard"] = {
 title:"고난도 빈칸 — 빈칸 문장의 틀 → 내 말 요약 → 바꿔 쓴 선지",
 els:[
  { id:"s", k:"text", at:[24,52], width:590, parts:[
    {t:"Early maps"},{t:"were"},{t:"less",id:"less"},{t:"about"},{t:"where places were"},{t:"than",id:"than"},{t:"about"},{t:"________",id:"blank",c:1},{t:"."}
  ]},
  { id:"fr", k:"box", at:[170,140], w:290, h:54, t:"틀: less A than B\n→ 정답 방향 = B (A와 반대)", c:0 },
  { id:"ev", k:"box", at:[470,140], w:280, h:54, t:"지문 근거: 지도는 권력·믿음을 담았다", c:2 },
  { id:"ar", k:"arrow", from:[315,140], to:[328,140], c:6 },
  { id:"sum", k:"box", at:[320,225], w:420, h:46, t:"내 말 요약: 지도 = 그린 사람의 생각을 보여 줌", c:4, fill:true },
  { id:"o1", k:"box", at:[175,305], w:270, h:40, t:"✗ the exact distance between towns", c:6 },
  { id:"o2", k:"box", at:[470,305], w:290, h:40, t:"✓ what their makers believed mattered", c:1, fill:true }
 ],
 steps:[
  { say:"빈칸 문장을 먼저 읽는다. **less … than** 이 보이면 틀이 정해진다.", show:["s"], hi:["less","than"] },
  { say:"틀을 정리: less A than ==B== — 정답은 A(위치)와 **반대 방향**.", show:["fr"], hi:["fr"] },
  { say:"지문에서 B의 근거를 찾는다. 반복되는 핵심어를 모은다.", show:["ev","ar"], hi:["ev"] },
  { say:"선지를 보기 전에 **내 말로 한 줄 요약**한다.", show:["sum"], hi:["sum"] },
  { say:"요약과 같은 뜻을 **다른 단어로** 쓴 선지가 정답. A 방향 선지는 지운다.", show:["o1","o2"], hi:["o2"] }
 ]
};
