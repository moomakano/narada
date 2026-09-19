const g=document.getElementById('grid');
for(let i=1;i<=30;i++){let d=document.createElement('div');d.className='d'+(i===19?' today':'');d.innerHTML=`<div>${i}</div><div class=dot></div>`;g.appendChild(d);}
const r=document.getElementById('r');r.onclick=()=>{r.classList.add('spin');navigator.vibrate&&navigator.vibrate(15);setTimeout(()=>r.classList.remove('spin'),800);}
if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');
