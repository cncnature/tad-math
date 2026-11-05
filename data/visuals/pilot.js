// 파일럿(과학 광합성·전기 에너지, 수학 외심) — 다른 파일과 겹치지 않는 차시만 남김
window.DATA = window.DATA || {}; window.DATA.visuals = Object.assign(window.DATA.visuals || {}, {
 "sci-photosyn": [
  {
   "type": "table",
   "title": "광합성 · 호흡 한눈 비교",
   "head": [
    "구분",
    "광합성",
    "호흡"
   ],
   "rows": [
    [
     "장소",
     "엽록체",
     "미토콘드리아(모든 살아 있는 세포)"
    ],
    [
     "일어나는 때",
     "빛이 있을 때",
     "항상(밤낮)"
    ],
    [
     "기체 출입",
     "CO₂ 흡수 → O₂ 방출",
     "O₂ 흡수 → CO₂ 방출"
    ],
    [
     "에너지",
     "빛에너지 → 화학 에너지 **저장**",
     "포도당 분해 → 에너지 **방출**"
    ]
   ],
   "note": "밤에는 호흡만 일어나므로 CO₂가 나온다."
  },
  {
   "type": "flow",
   "title": "광합성의 재료와 산물",
   "steps": [
    {
     "t": "물 + 이산화 탄소",
     "d": "뿌리·기공"
    },
    {
     "t": "빛에너지 · 엽록체",
     "d": "반응 장소",
     "hi": true
    },
    {
     "t": "포도당 + 산소",
     "d": "산물"
    },
    {
     "t": "녹말로 저장",
     "d": "잎에서 검출"
    }
   ]
  },
  {
   "type": "compare",
   "title": "광합성에 영향을 주는 세 요인 — 그래프 모양",
   "items": [
    {
     "name": "빛의 세기",
     "points": [
      "증가하다 일정"
     ]
    },
    {
     "name": "CO₂ 농도",
     "points": [
      "증가하다 일정"
     ]
    },
    {
     "name": "온도",
     "points": [
      "적정 온도까지 증가",
      "너무 높으면 **급감** (산 모양)"
     ]
    }
   ]
  }
 ],
 "sci-g22-elec-energy": [
  {
   "type": "formula",
   "title": "전력과 전력량",
   "tex": "P = VI,\\quad W = Pt",
   "where": [
    "P 전력(W)",
    "V 전압(V)",
    "I 전류(A)",
    "W 전력량(Wh = W × h)"
   ]
  }
 ],
 "circumcenter": [
  {
   "type": "svg",
   "title": "외심 — 세 변의 수직이등분선이 만나는 점",
   "svg": "<svg viewBox='0 0 260 200' role='img' aria-label='외심'><circle cx='130' cy='105' r='78' fill='none' stroke='var(--line)' stroke-width='1.5'/><polygon points='70,160 200,160 110,32' fill='none' stroke='var(--ink)' stroke-width='2'/><circle cx='130' cy='105' r='4' fill='var(--acc)'/><text x='138' y='101' font-size='13' fill='var(--acc)' font-weight='700'>O</text><line x1='130' y1='105' x2='70' y2='160' stroke='var(--acc)' stroke-dasharray='4 3'/><line x1='130' y1='105' x2='200' y2='160' stroke='var(--acc)' stroke-dasharray='4 3'/><line x1='130' y1='105' x2='110' y2='32' stroke='var(--acc)' stroke-dasharray='4 3'/><text x='56' y='176' font-size='13' fill='var(--ink)'>B</text><text x='204' y='176' font-size='13' fill='var(--ink)'>C</text><text x='104' y='24' font-size='13' fill='var(--ink)'>A</text><text x='150' y='140' font-size='11' fill='var(--muted)'>OA = OB = OC</text></svg>"
  },
  {
   "type": "table",
   "title": "외심 vs 내심",
   "head": [
    "구분",
    "외심 O",
    "내심 I"
   ],
   "rows": [
    [
     "정의",
     "세 변의 **수직이등분선**의 교점",
     "세 각의 **이등분선**의 교점"
    ],
    [
     "같은 거리",
     "세 **꼭짓점**까지(외접원 반지름)",
     "세 **변**까지(내접원 반지름)"
    ],
    [
     "직각삼각형",
     "빗변의 **중점**",
     "—"
    ],
    [
     "단골 공식",
     "∠BOC = 2∠A",
     "∠BIC = 90° + ½∠A"
    ]
   ]
  }
 ]
});
