
let active=DAYS[new Date().getDay()];
document.getElementById('monthLabel').textContent=new Date().toLocaleDateString('th-TH',{month:'long',year:'numeric'});
const sel=document.getElementById('editDay'); DAYS.slice(1).concat(DAYS[0]).forEach(d=>sel.innerHTML+=`<option>${d}</option>`);
window.refresh=function(){
 const next=DB.schedule.slice().sort((a,b)=>a.time.localeCompare(b.time))[0];
 dashboard.innerHTML=`<div class=card><small>คาบเรียนถัดไป</small><h2>${next.day} ${next.time}</h2><div>${next.teacher}</div></div>`;
 renderWeek(active,d=>{active=d;refresh();});
 renderSchedule(active);
}
fab.onclick=()=>sheet.classList.remove('hidden');
cancelBtn.onclick=()=>sheet.classList.add('hidden');
saveBtn.onclick=()=>{DB.schedule.push({day:editDay.value,time:editTime.value||'16:00',teacher:editTeacher.value||'ไม่มีชื่อ'});saveDB();sheet.classList.add('hidden');refresh();}
refresh();
