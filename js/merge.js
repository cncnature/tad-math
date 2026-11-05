/* 데이터 병합 공통 — 브라우저(app.js)와 Node(check.js·send-*.js·audit.js)가 같은 순서로 합친다.
   1) curriculumExtra → curriculum.units  2) subjectsExtra → subjects[sid].units  3) overrides(lessons/units/hide) 덧씌우기 */
(function(root){
  function apply(D, opt){
    opt=opt||{};
    if(opt.curriculum!==false&&D.curriculum){ D.curriculum.units=[...D.curriculum.units,...(D.curriculumExtra||[]).flatMap(x=>x.units||x)]; D.curriculumExtra=[]; }
    (D.subjectsExtra||[]).forEach(x=>{ const sj=D.subjects&&D.subjects[x.sid]; if(sj) sj.units.push(...x.units.map(u=>({...u,grade:u.grade||x.grade}))); }); D.subjectsExtra=[];
    const O=D.overrides||{}; const L=O.lessons||{}, U=O.units||{}, H=new Set(O.hide||[]);
    const patchUnits=units=>{ for(let i=units.length-1;i>=0;i--){ const u=units[i]; if(H.has(u.id)){ units.splice(i,1); continue; } if(U[u.id]) Object.assign(u,U[u.id]); for(let j=u.lessons.length-1;j>=0;j--){ const l=u.lessons[j]; if(H.has(l.id)){ u.lessons.splice(j,1); continue; } if(L[l.id]) Object.assign(l,L[l.id]); } if(!u.lessons.length) units.splice(i,1); } };
    if(D.curriculum) patchUnits(D.curriculum.units);
    const GO=["m11","m12","m21","g22","g31","g32","h1","h2","h3"]; const gi=g=>{ const i=GO.indexOf(g); return i<0?99:i; };
    Object.values(D.subjects||{}).forEach(s=>{ patchUnits(s.units); s.units.sort((a,b)=>(gi(a.grade||s.grade)-gi(b.grade||s.grade))||((a.order??999)-(b.order??999))); });
    return D;
  }
  const api={apply};
  if(typeof module!=="undefined"&&module.exports) module.exports=api; else root.MERGE=api;
})(typeof window!=="undefined"?window:globalThis);
