
const KEY='narada-v4';const app=document.getElementById('app');
const state=JSON.parse(localStorage.getItem(KEY)||'{"tab":"today","schedule":[],"homework":[]}');
const defaults=[["จันทร์","18:30","ครูปาล์ม"],["อังคาร","16:30","ไนไน"],["อังคาร","17:00","ครูใบตอง"],["พุธ","18:15","ครูปอย"],["พฤหัส","17:00","ครูพลอย"],["พฤหัส","19:15","ป้ามิ้น"],["ศุกร์","16:30","ครูเก่ง"],["ศุกร์","18:15","ครูปอย"],["เสาร์","09:00","King"],["เสาร์","13:00","ครูแนน"],["เสาร์","16:30","ครูเอ๋"],["เสาร์","18:15","เปียโน"],["เสาร์","19:30","ครูโอ้"],["อาทิตย์","15:00","ครูอัจ"],["อาทิตย์","17:00","ว่ายน้ำ"]];
if(!state.schedule.length) state.schedule=defaults.map(x=>({day:x[0],time:x[1],teacher:x[2]}));
const save=()=>localStorage.setItem(KEY,JSON.stringify(state));
document.getElementById('todayLabel').textContent=new Date().toLocaleDateString('th-TH',{weekday:'long',day:'numeric',month:'long'});
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{state.tab=b.dataset.tab;save();render()});
const toast=t=>{const x=document.getElementById('toast');x.textContent=t;x.style.opacity=1;setTimeout(()=>x.style.opacity=0,1400)}
window.delS=i=>{state.schedule.splice(i,1);save();render();toast('ลบแล้ว')}
window.delH=i=>{state.homework.splice(i,1);save();render();toast('ลบแล้ว')}
window.toggle=i=>{state.homework[i].done=!state.homework[i].done;save();render()}
function render(){
 if(state.tab==='today'){app.innerHTML=`<div class="card"><h2>วันนี้</h2><p>เปิดเมนูด้านล่างเพื่อจัดการตารางเรียนและการบ้าน</p></div>`}
 if(state.tab==='schedule'){app.innerHTML='<button class="primary" id=a>+ เพิ่มคาบเรียน</button>'+state.schedule.map((s,i)=>`<div class=card><div class=row><div><b>${s.day}</b><div>${s.time} • ${s.teacher}</div></div><button class=danger onclick="delS(${i})">ลบ</button></div></div>`).join('');document.getElementById('a').onclick=()=>{const d=prompt('วัน');if(!d)return;state.schedule.push({day:d,time:prompt('เวลา')||'',teacher:prompt('ครู')||''});save();render();toast('บันทึกแล้ว')}}
 if(state.tab==='homework'){app.innerHTML='<button class="primary" id=h>+ เพิ่มการบ้าน</button>'+state.homework.map((h,i)=>`<div class=card><div class=row><div><input type=checkbox ${h.done?'checked':''} onchange="toggle(${i})"> <b>${h.title}</b><div>${h.subject}</div></div><button class=danger onclick="delH(${i})">ลบ</button></div></div>`).join('');document.getElementById('h').onclick=()=>{const t=prompt('การบ้าน');if(!t)return;state.homework.push({title:t,subject:prompt('วิชา')||'',done:false});save();render();toast('เพิ่มแล้ว')}}
 if(state.tab==='settings'){app.innerHTML='<div class=card><button class="primary" id=e>ส่งออกข้อมูล</button> <button class=danger id=r>รีเซ็ต</button></div>';document.getElementById('e').onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='narada-backup.json';a.click()};document.getElementById('r').onclick=()=>{if(confirm('รีเซ็ต?')){localStorage.removeItem(KEY);location.reload()}}}
}
if('serviceWorker' in navigator) navigator.serviceWorker.register('service-worker.js');
render();
