// 플레이: 미니게임 목록 (문제 생성 로직은 js/app.js 의 GAMES 에 있음)
window.DATA = window.DATA || {};
window.DATA.play = [
 { id:"formula-match", title:"공식 짝 맞추기", desc:"공식 이름을 보고 맞는 식을 60초 안에 최대한 많이 고르세요.", grade:"all", node:null },
 { id:"factor-rush", title:"인수분해 러시", desc:"x²+bx+c 를 보고 (x+p)(x+q) 의 p, q 를 입력. 틀리면 힌트.", grade:"g31", node:"factoring" },
 { id:"trig-flash", title:"특수각 삼각비 플래시", desc:"sin 60° 는? 보기 중 고르기. 10문제 연속 정답에 도전.", grade:"g32", node:"trig" },
 { id:"pytha-triple", title:"피타고라스 수 찾기", desc:"두 변을 보고 빗변을 입력. 정수 삼각형만 나옵니다.", grade:"g22", node:"pythagoras" },
 { id:"vertex-hunt", title:"꼭짓점 사냥", desc:"y=a(x−p)²+q 를 보고 꼭짓점 좌표 (p, q) 를 입력.", grade:"g31", node:"quadratic-func" },
 { id:"angle-quiz", title:"원주각 퀴즈", desc:"중심각·원주각·내접사각형 각도를 빠르게 계산.", grade:"g32", node:"circle" }
];
