
const cal=document.getElementById('cal');
for(let i=1;i<=30;i++){let e=document.createElement('div');e.className='d'+(i===19?' today':'');e.textContent=i;cal.appendChild(e)}
settingsBtn.onclick=()=>settings.classList.add('show');close.onclick=()=>settings.classList.remove('show');
refreshBtn.onclick=async()=>{refreshBtn.classList.add('spin');navigator.vibrate&&navigator.vibrate(15);if('serviceWorker'in navigator){const r=await navigator.serviceWorker.getRegistration();if(r)await r.update()}setTimeout(()=>location.reload(),800)}
const audio=new Audio('assets/sounds/bubble.wav');
test.onclick=()=>{audio.currentTime=0;audio.play();if(vibrate.checked&&navigator.vibrate)navigator.vibrate([20,30,20])}
notifyToggle.onchange=async()=>{if(notifyToggle.checked){const p=await Notification.requestPermission();if(p!=='granted'){notifyToggle.checked=false;return alert('ต้องอนุญาตการแจ้งเตือน')}localStorage.setItem('notify','1');new Notification('Narada พร้อมแล้ว 🎀',{body:'เปิดการแจ้งเตือนสำเร็จ'})}else localStorage.removeItem('notify')}
notifyToggle.checked=localStorage.getItem('notify')==='1';
setInterval(()=>{if(localStorage.getItem('notify')!=='1'||Notification.permission!=='granted')return;const n=new Date();if(n.getHours()==18&&n.getMinutes()==20){audio.play();if(vibrate.checked&&navigator.vibrate)navigator.vibrate([20,30,20]);new Notification('อีก '+lead.value+' นาทีถึงคาบ ครูปาล์ม',{body:'18:30'})}},30000);
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js');
