const KEY='narada-v6';
const defaults=[{day:'จันทร์',time:'18:30',teacher:'ครูปาล์ม'},{day:'อังคาร',time:'16:30',teacher:'ไนไน'},{day:'อังคาร',time:'17:00',teacher:'ครูใบตอง'},{day:'พุธ',time:'18:15',teacher:'ครูปอย'},{day:'พฤหัส',time:'17:00',teacher:'ครูพลอย'},{day:'พฤหัส',time:'19:15',teacher:'ป้ามิ้น'}];
let schedule=JSON.parse(localStorage.getItem(KEY)||'null')||defaults;
let edit=-1;
const list=document.getElementById('list'),modal=document.getElementById('modal');
const day=document.getElementById('day'),time=document.getElementById('time'),teacher=document.getElementById('teacher');
document.getElementById('date').textContent=new Date().toLocaleDateString('th-TH',{weekday:'long',day:'numeric',month:'long'});
const saveData=()=>localStorage.setItem(KEY,JSON.stringify(schedule));
function render(){list.innerHTML='';schedule.forEach((s,i)=>{const c=document.createElement('div');c.className='card';c.innerHTML=`<div class=row><div><h3>${s.day}</h3><div>${s.time} • ${s.teacher}</div></div><div class=row><button class=secondary data-e="${i}">แก้ไข</button><button class=danger data-d="${i}">ลบ</button></div></div>`;list.appendChild(c);});document.querySelectorAll('[data-e]').forEach(b=>b.onclick=()=>openEdit(+b.dataset.e));document.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{schedule.splice(+b.dataset.d,1);saveData();render();});}
function openEdit(i){edit=i;const s=schedule[i];day.value=s.day;time.value=s.time;teacher.value=s.teacher;modal.classList.remove('hidden');}
document.getElementById('add').onclick=()=>{edit=-1;day.value='จันทร์';time.value='16:00';teacher.value='';modal.classList.remove('hidden');};
document.getElementById('cancel').onclick=()=>modal.classList.add('hidden');
modal.onclick=e=>{if(e.target===modal)modal.classList.add('hidden');};
document.getElementById('save').onclick=()=>{const item={day:day.value,time:time.value||'16:00',teacher:teacher.value.trim()||'ไม่มีชื่อ'};if(edit>=0)schedule[edit]=item;else schedule.push(item);saveData();modal.classList.add('hidden');render();};
render();