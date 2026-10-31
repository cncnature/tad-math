# -*- coding: utf-8 -*-
"""
STUDYGOD ↔ TAD 수학 만지기 연동 (2단계: 로컬 LLM 첨삭·튜터)
설치: 이 파일을 STUDYGOD 폴더(app.py 옆)에 복사하고, app.py 맨 아래 `app.run(...)` 바로 위에 두 줄 추가:

    from studygod_tad import register_tad
    register_tad(app, ollama_generate, OLLAMA_MODEL)

그 뒤 TAD(https://cncnature.github.io/tad-math)를 같은 PC 브라우저에서 열면 🤖 패널이 자동으로 나타납니다.
다른 기기(태블릿)는 TAD → 학기·목표 바꾸기 → '로컬 AI 주소' 에 http://[PC IP]:5100 입력.
"""
import json, os, time
from flask import request, jsonify

ALLOWED = ("https://cncnature.github.io", "http://localhost", "http://127.0.0.1")
IMPORT_FILE = "tad_import.json"

SYS = ("당신은 한국 중·고등학교 수학 교사입니다. 2022 개정 교육과정 범위 안에서만, 한국어로, "
       "학생이 스스로 고치도록 짧고 구체적으로 답합니다. 정답을 통째로 주지 말고 '다음 한 걸음'을 제시합니다. "
       "수식은 $...$ 로 씁니다. 300자 이내.")

def _cors(resp):
    o = request.headers.get("Origin", "")
    if any(o.startswith(a) for a in ALLOWED):
        resp.headers["Access-Control-Allow-Origin"] = o
        resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
        resp.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    return resp

def register_tad(app, ollama_generate, model_name="?"):
    app.after_request(_cors)

    @app.route("/api/tad/<path:_p>", methods=["OPTIONS"])
    def tad_opts(_p):
        return jsonify({"ok": True})

    @app.route("/api/tad/ping")
    def tad_ping():
        return jsonify({"ok": True, "model": model_name, "time": int(time.time())})

    @app.route("/api/tad/review", methods=["POST"])
    def tad_review():
        b = request.get_json(force=True) or {}
        rubric = "\n".join(f"- {r[0]} ({r[1]}점)" for r in b.get("rubric", []))
        prompt = (f"{SYS}\n\n[문제]\n{b.get('q','')}\n\n[모범 답안]\n" + "\n".join(b.get("model", [])) +
                  f"\n\n[채점 기준]\n{rubric}\n\n[학생 답안]\n{b.get('student','') or '(비어 있음)'}\n\n"
                  f"[학생의 자기설명]\n{b.get('selfx','') or '(없음)'}\n\n"
                  "채점 기준 항목별로 ✅/⚠️/❌ 를 매기고(한 줄씩), 가장 중요한 빠진 논리 1가지와 "
                  "그것을 고치는 '다음 한 걸음'을 제시하세요. 마지막 줄에 '예상 점수: n/10' 을 쓰세요.")
        return jsonify({"reply": ollama_generate(prompt, max_rounds=1)})

    @app.route("/api/tad/why", methods=["POST"])
    def tad_why():
        b = request.get_json(force=True) or {}
        opts = b.get("opts", [])
        prompt = (f"{SYS}\n\n[문제] {b.get('q','')}\n[보기] " + " / ".join(f"{i+1}) {o}" for i, o in enumerate(opts)) +
                  f"\n학생이 고른 것: {int(b.get('chosen',0))+1}번, 정답: {int(b.get('answer',0))+1}번\n[해설] {b.get('exp','')}\n\n"
                  "학생이 왜 그 보기를 골랐을지 가장 흔한 오개념 1가지를 짚고, 정답으로 가는 첫 단계만 알려 주세요. "
                  "오개념 유형을 [계산 실수/개념 오류/문제 해석/풀이 못함] 중 하나로 분류해 첫 줄에 쓰세요.")
        return jsonify({"reply": ollama_generate(prompt, max_rounds=1)})

    @app.route("/api/tad/chat", methods=["POST"])
    def tad_chat():
        b = request.get_json(force=True) or {}
        c = b.get("context", {})
        ctx = (f"[소단원] {c.get('title','')}\n[핵심 개념] " + " / ".join(c.get("concept", [])) +
               f"\n[왜 그런지] {c.get('why','')}\n[흔한 오개념] " + " / ".join(c.get("pitfalls", [])[:4]) +
               f"\n[학생 상태] 목표율 {c.get('pct','?')}%, 정답률 {c.get('acc','?')}")
        prompt = f"{SYS}\n\n{ctx}\n\n[학생 질문]\n{b.get('message','')}\n\n이 소단원 범위 안에서 답하세요."
        return jsonify({"reply": ollama_generate(prompt, max_rounds=1)})

    @app.route("/api/tad/import", methods=["POST"])
    def tad_import():
        b = request.get_json(force=True) or {}
        with open(IMPORT_FILE, "w", encoding="utf-8") as f:
            json.dump({"when": time.time(), "data": b}, f, ensure_ascii=False)
        return jsonify({"ok": True, "events": len(b.get("qlog", []))})

    @app.route("/api/tad/export")
    def tad_export():
        if not os.path.exists(IMPORT_FILE):
            return jsonify({"ok": False})
        with open(IMPORT_FILE, encoding="utf-8") as f:
            return jsonify(json.load(f))
