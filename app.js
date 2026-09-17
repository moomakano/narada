
const schedule=[
{day:'จันทร์',time:'18:30',teacher:'ครูปาล์ม'},
{day:'อังคาร',time:'16:30',teacher:'ไนไน'},
{day:'อังคาร',time:'17:00',teacher:'ครูใบตอง'},
{day:'พุธ',time:'18:15',teacher:'ครูปอย'},
{day:'พฤหัส',time:'17:00',teacher:'ครูพลอย'},
{day:'พฤหัส',time:'19:15',teacher:'ป้ามิ้น'},
{day:'ศุกร์',time:'16:30',teacher:'ครูเก่ง'},
{day:'ศุกร์',time:'18:15',teacher:'ครูปอย'},
{day:'เสาร์',time:'09:00',teacher:'King'},
{day:'อาทิตย์',time:'15:00',teacher:'ครูอัจ'}];
const days=['อาทิตย์','จันทร์','อังคาร','พุธ','พฤหัส','ศุกร์','เสาร์'];
const short=['อา','จ','อ','พ','พฤ','ศ','ส'];
const today=new Date();
const monday=new Date(today);
monday.setDate(today.getDate()-((today.getDay()+6)%7));
let active=days[today.getDay()];
document.getElementById('date').textContent=today.toLocaleDateString('th-TH',{weekday:'long',day:'numeric',month:'long'});
function renderStrip(){const s=document.getElementById('weekStrip');s.innerHTML='';for(let i=0;i<7;i++){const d=new Date(monday);d.setDate(monday.getDate()+i);const full=days[d.getDay()];const chip=document.createElement('div');chip.className='dayChip'+(full===active?' active':'');chip.innerHTML=`<div>${short[d.getDay()]}</div><b>${d.getDate()}</b>`;chip.onclick=()=>{active=full;renderStrip();renderList();};s.appendChild(chip);}}
function renderList(){const out=document.getElementById('schedule');const items=schedule.filter(x=>x.day===active).sort((a,b)=>a.time.localeCompare(b.time));out.innerHTML=`<h3>📅 ${active}</h3>`+(items.length?items.map(x=>`<div class=card><div class=row><div><h2>${x.time}</h2><div>${x.teacher}</div></div><div class=actions><button class=edit>✏️</button><button class=del>🗑️</button></div></div></div>`).join(''):'<div class=card>ไม่มีคาบเรียน</div>');}
renderStrip();renderList();
