
const DAYS=['อาทิตย์','จันทร์','อังคาร','พุธ','พฤหัส','ศุกร์','เสาร์'];
const SHORT=['อา','จ','อ','พ','พฤ','ศ','ส'];
let data=JSON.parse(localStorage.getItem('narada632')||'null')||[
{day:'จันทร์',time:'18:30',teacher:'ครูปาล์ม'},
{day:'อังคาร',time:'16:30',teacher:'ไนไน'},
{day:'อังคาร',time:'17:00',teacher:'ครูใบตอง'},
{day:'พุธ',time:'18:15',teacher:'ครูปอย'},
{day:'พฤหัส',time:'17:00',teacher:'ครูพลอย'},
{day:'พฤหัส',time:'19:15',teacher:'ป้ามิ้น'}];
const ORDER={'จันทร์':1,'อังคาร':2,'พุธ':3,'พฤหัส':4,'ศุกร์':5,'เสาร์':6,'อาทิตย์':7};
const sel=document.getElementById('day');DAYS.slice(1).concat(DAYS[0]).forEach(d=>sel.innerHTML+=`<option>${d}</option>`);
let active=DAYS[new Date().getDay()],edit=-1;
function saveDB(){localStorage.setItem('narada632',JSON.stringify(data))}
function drawWeek(){week.innerHTML='';const today=new Date();const monday=new Date(today);monday.setDate(today.getDate()-((today.getDay()+6)%7));for(let i=0;i<7;i++){const d=new Date(monday);d.setDate(monday.getDate()+i);const full=DAYS[d.getDay()];const c=document.createElement('div');c.className='chip'+(full===active?' active':'');c.innerHTML=`${SHORT[d.getDay()]}<br><b>${d.getDate()}</b>`;c.onclick=()=>{active=full;drawWeek();drawList()};week.appendChild(c)}}
function drawList(){list.innerHTML='';data.sort((a,b)=>ORDER[a.day]-ORDER[b.day]||a.time.localeCompare(b.time));const arr=data.filter(x=>x.day===active);if(!arr.length){list.innerHTML='<div class=card>ไม่มีคาบเรียน</div>';return;}arr.forEach(it=>{const idx=data.indexOf(it);const c=document.createElement('div');c.className='card';c.innerHTML=`<div class=row><div><h2>${it.time}</h2><div>${it.teacher}</div></div><div><button class=e>✏️</button> <button class=x>🗑️</button></div></div>`;c.querySelector('.e').onclick=()=>{edit=idx;day.value=it.day;time.value=it.time;teacher.value=it.teacher;modal.classList.remove('hidden')};c.querySelector('.x').onclick=()=>{data.splice(idx,1);saveDB();drawList()};list.appendChild(c)})}
fab.onclick=()=>{edit=-1;day.value='จันทร์';time.value='16:00';teacher.value='';modal.classList.remove('hidden')};
cancel.onclick=()=>modal.classList.add('hidden');
save.onclick=()=>{const it={day:day.value,time:time.value||'16:00',teacher:teacher.value||'ไม่มีชื่อ'};if(edit<0)data.push(it);else data[edit]=it;saveDB();modal.classList.add('hidden');drawWeek();drawList()};
refreshBtn.onclick=async()=>{refreshBtn.classList.add('spin');if('serviceWorker' in navigator){const r=await navigator.serviceWorker.getRegistration();if(r)await r.update()}setTimeout(()=>location.reload(),200)};
drawWeek();drawList();
