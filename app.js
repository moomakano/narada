
const KEY='narada-v51';
const state=JSON.parse(localStorage.getItem(KEY)||'{}');
state.schedule=state.schedule||[
{day:'จันทร์',time:'18:30',teacher:'ครูปาล์ม'},
{day:'อังคาร',time:'16:30',teacher:'ไนไน'},
{day:'อังคาร',time:'17:00',teacher:'ครูใบตอง'},
{day:'พุธ',time:'18:15',teacher:'ครูปอย'},
{day:'พฤหัส',time:'17:00',teacher:'ครูพลอย'},
{day:'พฤหัส',time:'19:15',teacher:'ป้ามิ้น'},
{day:'ศุกร์',time:'16:30',teacher:'ครูเก่ง'},
{day:'ศุกร์',time:'18:15',teacher:'ครูปอย'},
{day:'เสาร์',time:'09:00',teacher:'King'},
{day:'เสาร์',time:'13:00',teacher:'ครูแนน'},
{day:'เสาร์',time:'16:30',teacher:'ครูเอ๋'},
{day:'เสาร์',time:'18:15',teacher:'เปียโน'},
{day:'เสาร์',time:'19:30',teacher:'ครูโอ้'},
{day:'อาทิตย์',time:'15:00',teacher:'ครูอัจ'},
{day:'อาทิตย์',time:'17:00',teacher:'ว่ายน้ำ'}];
state.homework=state.homework||[];
state.tab=state.tab||'today';
const save=()=>localStorage.setItem(KEY,JSON.stringify(state));
const pages={today:todayPage,schedule:schedulePage,homework:homeworkPage,settings:settingsPage};
document.getElementById('todayLabel').textContent=new Date().toLocaleDateString('th-TH',{weekday:'long',day:'numeric',month:'long'});
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{state.tab=b.dataset.tab;save();render();});
let editIndex=null;
function render(){
 Object.values(pages).forEach(p=>p.classList.add('hidden'));
 pages[state.tab].classList.remove('hidden');
 todayPage.innerHTML='<div class="card"><h2>วันนี้</h2><p>ยินดีต้อนรับ 👧</p></div>';
 schedulePage.innerHTML='<button class="primary" id="addBtn">➕ เพิ่มคาบเรียน</button>';
 state.schedule.forEach((s,i)=>{
  schedulePage.innerHTML+=`<div class="card"><div class="row"><div><b>${s.day}</b><br>${s.time} · ${s.teacher}</div><div class="row"><button class="secondary" onclick="openEdit(${i})">แก้ไข</button><button class="danger" onclick="delSchedule(${i})">ลบ</button></div></div></div>`;
 });
 document.getElementById('addBtn').onclick=()=>{const d=prompt('วัน');if(!d)return;state.schedule.push({day:d,time:prompt('เวลา')||'',teacher:prompt('ครู')||''});save();render();};
 homeworkPage.innerHTML='<button class="primary" id="addHW">➕ เพิ่มการบ้าน</button>';
 state.homework.forEach((h,i)=>homeworkPage.innerHTML+=`<div class="card"><div class="row"><div><input type="checkbox" ${h.done?'checked':''} onchange="toggleHW(${i})"> <b>${h.title}</b><br>${h.subject}</div><button class="danger" onclick="delHW(${i})">ลบ</button></div></div>`);
 document.getElementById('addHW').onclick=()=>{const t=prompt('การบ้าน');if(!t)return;state.homework.push({title:t,subject:prompt('วิชา')||'',done:false});save();render();};
 settingsPage.innerHTML='<div class="card"><button class="primary" id="exportBtn">สำรองข้อมูล</button></div>';
 document.getElementById('exportBtn').onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='narada-backup.json';a.click();};
}
window.delSchedule=i=>{state.schedule.splice(i,1);save();render();}
window.toggleHW=i=>{state.homework[i].done=!state.homework[i].done;save();render();}
window.delHW=i=>{state.homework.splice(i,1);save();render();}
window.openEdit=i=>{editIndex=i;const s=state.schedule[i];editDay.value=s.day;editTime.value=s.time;editTeacher.value=s.teacher;editModal.classList.remove('hidden');}
cancelEdit.onclick=()=>editModal.classList.add('hidden');
saveEdit.onclick=()=>{state.schedule[editIndex]={day:editDay.value,time:editTime.value,teacher:editTeacher.value};save();editModal.classList.add('hidden');render();}
if('serviceWorker' in navigator)navigator.serviceWorker.register('service-worker.js');
render();
