# python3 scripts/optimize-images.py — assets/img 의 수집 이미지를 640px JPEG(품질 82)로 줄이고 manifest·images.js 의 경로를 맞춘다 (GitHub Actions 가 fetch 직후 실행)
import json,os
from PIL import Image
os.chdir(os.path.join(os.path.dirname(__file__),".."))
m=json.load(open("data/images-manifest.json",encoding="utf8")); n=0
for id_,lst in m.items():
    for x in lst:
        p=x["src"]
        if not os.path.exists(p) or p.endswith(".gif"): continue
        im=Image.open(p); w,h=im.size
        if max(w,h)<=640 and p.endswith(".jpg") and os.path.getsize(p)<150000: continue
        if max(w,h)>640: s=640/max(w,h); im=im.resize((max(1,int(w*s)),max(1,int(h*s))),Image.LANCZOS)
        if im.mode in ("RGBA","LA") or (im.mode=="P" and "transparency" in im.info):
            bg=Image.new("RGB",im.size,(255,255,255)); bg.paste(im.convert("RGBA"),mask=im.convert("RGBA").split()[3]); im=bg
        else: im=im.convert("RGB")
        newp=os.path.splitext(p)[0]+".jpg"; im.save(newp,"JPEG",quality=82,optimize=True)
        if newp!=p: os.remove(p); x["src"]=newp
        n+=1
json.dump(m,open("data/images-manifest.json","w",encoding="utf8"),ensure_ascii=False,indent=1)
V={id_:[{"type":"img","title":x["alt"],"src":x["src"],"alt":x["alt"],"credit":f"{x['artist']} · {x['lic']} · Wikimedia Commons","link":x["page"]} for x in lst] for id_,lst in m.items() if lst}
open("data/visuals/images.js","w",encoding="utf8").write("// 자동 수집 이미지(scripts/fetch-images.js) — 위키백과·위키미디어 공용의 자유 라이선스 이미지만. 출처·저자·라이선스는 각 항목 credit/link. 수정 금지(재실행 시 덮어씀)\nwindow.DATA = window.DATA || {}; (window.DATA.visualsAdd = window.DATA.visualsAdd || []).push("+json.dumps(V,ensure_ascii=False,indent=1)+");\n")
print("optimized",n)
