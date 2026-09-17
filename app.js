const KEY='narada-v51';let state=JSON.parse(localStorage.getItem(KEY)||'{}');state.schedule=state.schedule||[{day:'พฤหัส',time:'16:30',teacher:'EFL'}];const save=()=>localStorage.setItem(KEY,JSON.stringify(state));let editIndex=null;const page=document.getElementById('schedulePage');
function render(){page.innerHTML=state.schedule.map((s,i)=>`<div class=card><div class=row><div><b>${s.day}</b><br>${s.time} ${s.teacher}</div><div class=row><button class=primary onclick="openEdit(${i})">แก้ไข</button><button class=danger onclick="delItem(${i})">ลบ</button></div></div></div>`).join('')}
window.openEdit=i=>{editIndex=i;const s=state.schedule[i];editDay.value=s.day;editTime.value=s.time;editTeacher.value=s.teacher;editModal.classList.remove('hidden')}
window.delItem=i=>{state.schedule.splice(i,1);save();render()}
cancelEdit.addEventListener('click',()=>editModal.classList.add('hidden'));
saveEdit.addEventListener('click',e=>{e.preventDefault();if(editIndex===null)return;state.schedule[editIndex]={day:editDay.value,time:editTime.value,teacher:editTeacher.value.trim()||'ไม่มีชื่อ'};save();editModal.classList.add('hidden');render()});
editModal.addEventListener('click',e=>{if(e.target===editModal)editModal.classList.add('hidden')});
render();