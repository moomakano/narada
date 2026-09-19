
const calendar=document.getElementById('calendar'), monthTitle=document.getElementById('monthTitle');
let view=new Date(2026,8,1);
const events={1:['📘 English 08:00'],3:['➗ Math 16:30'],7:['🔬 Science 17:00'],12:['🎹 Piano 18:15'],19:['🏊 Swimming 17:00'],24:['🇹🇭 Thai 17:00']};
function render(){
 calendar.innerHTML='';
 monthTitle.textContent=view.toLocaleDateString('en-US',{month:'long',year:'numeric'});
 const first=new Date(view.getFullYear(),view.getMonth(),1);
 const last=new Date(view.getFullYear(),view.getMonth()+1,0);
 for(let i=0;i<first.getDay();i++){let e=document.createElement('div');e.className='day other';calendar.appendChild(e);}
 const today=19;
 for(let d=1;d<=last.getDate();d++){
   let e=document.createElement('div');e.className='day'+(d===today?' today':'');
   e.innerHTML=`<div>${d}</div>${events[d]?'<div class=dot></div>':''}`;
   e.onclick=()=>openDay(d);
   calendar.appendChild(e);
 }
}
function openDay(d){
 daySheet.classList.add('show');
 sheetDate.textContent=`${d} ${monthTitle.textContent}`;
 sheetContent.innerHTML=(events[d]||['ไม่มีคาบเรียน']).map(x=>`<div style="padding:10px 0;border-bottom:1px solid #eee">${x}</div>`).join('');
}
prevBtn.onclick=()=>{view.setMonth(view.getMonth()-1);render();}
nextBtn.onclick=()=>{view.setMonth(view.getMonth()+1);render();}
closeSheet.onclick=()=>daySheet.classList.remove('show');
settingsBtn.onclick=()=>settingsSheet.classList.add('show');
closeSettings.onclick=()=>settingsSheet.classList.remove('show');
const themes={pink:['#ef7bb1','#8c7cff'],blue:['#6ec6ff','#5b8cff'],purple:['#b388ff','#7c4dff']};
function setTheme(name){localStorage.setItem('theme',name);document.documentElement.style.setProperty('--a',themes[name][0]);document.documentElement.style.setProperty('--b',themes[name][1]);}
pinkTheme.onclick=()=>setTheme('pink');blueTheme.onclick=()=>setTheme('blue');purpleTheme.onclick=()=>setTheme('purple');
setTheme(localStorage.getItem('theme')||'pink');
refreshBtn.onclick=()=>{refreshBtn.classList.add('spin');navigator.vibrate&&navigator.vibrate(15);setTimeout(()=>refreshBtn.classList.remove('spin'),800);}
soundTest.onclick=()=>{const c=new AudioContext();const o=c.createOscillator();const g=c.createGain();o.connect(g);g.connect(c.destination);o.frequency.value=880;g.gain.value=.05;o.start();o.stop(c.currentTime+.18);}
vibrateTest.onclick=()=>navigator.vibrate&&navigator.vibrate([20,30,20]);
render();
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js');
