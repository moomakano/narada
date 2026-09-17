
const DAYS=['อาทิตย์','จันทร์','อังคาร','พุธ','พฤหัส','ศุกร์','เสาร์'],SHORT=['อา','จ','อ','พ','พฤ','ศ','ส'];
let data=JSON.parse(localStorage.getItem('narada632')||'null')||[
{day:'จันทร์',time:'18:30',teacher:'ครูปาล์ม'},
{day:'อังคาร',time:'16:30',teacher:'ไนไน'},
{day:'อังคาร',time:'17:00',teacher:'ครูใบตอง'},
{day:'พุธ',time:'18:15',teacher:'ครูปอย'},
{day:'พฤหัส',time:'17:00',teacher:'ครูพลอย'},
{day:'พฤหัส',time:'19:15',teacher:'ป้ามิ้น'}];
const ORDER={'จันทร์':1,'อังคาร':2,'พุธ':3,'พฤหัส':4,'ศุกร์':5,'เสาร์':6,'อาทิตย์':7};
let active=DAYS[new Date().getDay()];
function drawWeek(){week.innerHTML='';const today=new Date();const monday=new Date(today);monday.setDate(today.getDate()-((today.getDay()+6)%7));for(let i=0;i<7;i++){const d=new Date(monday);d.setDate(monday.getDate()+i);const full=DAYS[d.getDay()];const c=document.createElement('div');c.className='chip'+(full===active?' active':'');c.innerHTML=`${SHORT[d.getDay()]}<br><b>${d.getDate()}</b>`;c.onclick=()=>{active=full;drawWeek();drawList()};week.appendChild(c)}}
function drawList(){list.innerHTML='';const arr=data.filter(x=>x.day===active).sort((a,b)=>a.time.localeCompare(b.time));if(!arr.length){list.innerHTML='<div class=card>ไม่มีคาบเรียน</div>';return;}arr.forEach(it=>list.insertAdjacentHTML('beforeend',`<div class=card><b>${it.time}</b><div>${it.teacher}</div></div>`))}
refreshBtn.onclick=async()=>{refreshBtn.classList.add('spin');if('serviceWorker' in navigator){const r=await navigator.serviceWorker.getRegistration();if(r)await r.update()}setTimeout(()=>location.reload(),250)}
drawWeek();drawList();
