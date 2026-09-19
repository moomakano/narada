
const cal=document.getElementById('calendar');
const subjects={1:'🔵',2:'🟣',4:'🟢',7:'🟠',12:'🎹',19:'🏊'};
for(let d=1;d<=30;d++){const e=document.createElement('div');e.className='day'+(d===19?' today':'');e.innerHTML=`<div>${d}</div>${subjects[d]?`<div class="dot"></div>`:''}`;cal.appendChild(e);}
const sheet=document.getElementById('sheet');
setBtn.onclick=()=>sheet.classList.add('show');closeBtn.onclick=()=>sheet.classList.remove('show');
refreshBtn.onclick=()=>{refreshBtn.classList.add('spin');navigator.vibrate&&navigator.vibrate(15);setTimeout(()=>refreshBtn.classList.remove('spin'),800);}
const audio=new Audio('assets/chime.mp3');
soundBtn.onclick=()=>audio.play().catch(()=>alert('แตะหน้าจอก่อนเพื่อเปิดเสียง'));
vibrateBtn.onclick=()=>navigator.vibrate&&navigator.vibrate([20,40,20]);
const themes=[['#ef7bb1','#8c7cff'],['#6ec6ff','#5b8cff'],['#b388ff','#7c4dff']];let i=0;
themeBtn.onclick=()=>{i=(i+1)%3;document.documentElement.style.setProperty('--a',themes[i][0]);document.documentElement.style.setProperty('--b',themes[i][1]);};
if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');
