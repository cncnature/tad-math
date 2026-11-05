/* 데이터 병합 공통 — 브라우저(app.js)와 Node(check.js·send-*.js·audit.js)가 같은 순서로 합친다.
   1) curriculumExtra → curriculum.units  2) subjectsExtra → subjects[sid].units  3) overrides(lessons/units/hide) 덧씌우기 */
(function(root){
  function apply(D, opt){
    opt=opt||{};
    if(opt.curriculum!==false&&D.curriculum){ D.curriculum.units=[...D.curriculum.units,...(D.curriculumExtra||[]).flatMap(x=>x.units||x)]; D.curriculumExtra=[]; }
    (D.subjectsExtra||[]).forEach(x=>{ const sj=D.subjects&&D.subjects[x.sid]; if(sj) sj.units.push(...x.units.map(u=>({...u,grade:u.grade||x.grade}))); }); D.subjectsExtra=[];
    const V={}; (D.visualsAdd||[]).forEach(obj=>{ Object.entries(obj).forEach(([id,list])=>{ (V[id]=V[id]||[]).push(...list); }); }); Object.entries(D.visuals||{}).forEach(([id,list])=>{ (V[id]=V[id]||[]).push(...list); }); D.visuals=V; D.visualsAdd=[]; const P={}; (D.problemsAdd||[]).forEach(obj=>{ Object.entries(obj).forEach(([id,list])=>{ (P[id]=P[id]||[]).push(...list); }); }); D.problems=P; D.problemsAdd=[];
    const N={}; (D.unitNotesAdd||[]).forEach(obj=>{ Object.entries(obj).forEach(([id,n])=>{ N[id]=Object.assign(N[id]||{},n); }); }); D.unitNotes=N; D.unitNotesAdd=[];
    const attach=l=>{ if(V[l.id]) l.visuals=[...(l.visuals||[]),...V[l.id]]; if(P[l.id]) l.problems=[...(l.problems||[]),...P[l.id]]; };
    const attachU=u=>{ if(N[u.id]) u.notes=Object.assign(u.notes||{},N[u.id]); };
    if(D.curriculum) D.curriculum.units.forEach(u=>{ attachU(u); u.lessons.forEach(attach); }); Object.values(D.subjects||{}).forEach(s=>s.units.forEach(u=>{ attachU(u); u.lessons.forEach(attach); }));
    // 교과서 대조표(data/textbook-maps): 프로필에서 고른 출판사의 표가 있으면 단원 order/tb/term 을 덧씌운다 (overrides 보다 먼저, overrides 가 최종)
    const TM={}; (D.textbookMapsAdd||[]).forEach(m=>{ TM[m.sid+"|"+m.grade+"|"+m.pub]=m; }); D.textbookMaps=TM; D.textbookMapsAdd=[];
    const sel=opt.textbooks||{}; Object.entries(sel).forEach(([band,bySubj])=>{ Object.entries(bySubj||{}).forEach(([sid,pub])=>{ const m=TM[sid+"|"+band+"|"+pub]; if(!m) return; const sj=D.subjects&&D.subjects[sid]; if(!sj) return; sj.units.forEach(u=>{ const x=m.units&&m.units[u.id]; if(x) Object.assign(u,x,{tbMap:m.pub}); }); }); });
    const O=D.overrides||{}; const L=O.lessons||{}, U=O.units||{}, H=new Set(O.hide||[]); const hiddenLessons=new Set();
    const patchUnits=units=>{ for(let i=units.length-1;i>=0;i--){ const u=units[i]; if(H.has(u.id)){ (u.lessons||[]).forEach(l=>hiddenLessons.add(l.id)); units.splice(i,1); continue; } if(U[u.id]) Object.assign(u,U[u.id]); for(let j=u.lessons.length-1;j>=0;j--){ const l=u.lessons[j]; if(H.has(l.id)){ hiddenLessons.add(l.id); u.lessons.splice(j,1); continue; } if(L[l.id]) Object.assign(l,L[l.id]); } if(!u.lessons.length) units.splice(i,1); } };
    if(D.curriculum) patchUnits(D.curriculum.units);
    const GO=["m11","m12","m21","g22","g31","g32","h1","h2","h3"]; const gi=g=>{ const i=GO.indexOf(g); return i<0?99:i; };
    Object.values(D.subjects||{}).forEach(s=>{ patchUnits(s.units); s.units.sort((a,b)=>(gi(a.grade||s.grade)-gi(b.grade||s.grade))||((a.order??999)-(b.order??999))); });
    D.hiddenLessons=hiddenLessons;
    return D;
  }
  const api={apply};
  if(typeof module!=="undefined"&&module.exports) module.exports=api; else root.MERGE=api;
})(typeof window!=="undefined"?window:globalThis);
