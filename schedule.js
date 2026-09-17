
const ORDER={'จันทร์':1,'อังคาร':2,'พุธ':3,'พฤหัส':4,'ศุกร์':5,'เสาร์':6,'อาทิตย์':7};
window.renderSchedule=function(active){
 const t=document.getElementById('timeline');
 DB.schedule.sort((a,b)=>ORDER[a.day]-ORDER[b.day]||a.time.localeCompare(b.time));
 const arr=DB.schedule.filter(x=>x.day===active);
 t.innerHTML='<div class=card><h3>'+active+'</h3></div>';
 arr.forEach((it,i)=>{
   t.insertAdjacentHTML('beforeend',`<div class=card><b>${it.time}</b><div>${it.teacher}</div></div>`);
 });
}
