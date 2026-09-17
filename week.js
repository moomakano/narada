
window.renderWeek=function(active,onSelect){
 const short=['อา','จ','อ','พ','พฤ','ศ','ส'];
 const wrap=document.getElementById('weekView');
 wrap.innerHTML='<div class=week></div>';
 const g=wrap.firstChild;
 const today=new Date();
 const monday=new Date(today);
 monday.setDate(today.getDate()-((today.getDay()+6)%7));
 for(let i=0;i<7;i++){
   const d=new Date(monday); d.setDate(monday.getDate()+i);
   const full=DAYS[d.getDay()];
   const c=document.createElement('div');
   c.className='chip'+(full===active?' active':'');
   c.innerHTML=`${short[d.getDay()]}<br><b>${d.getDate()}</b>`;
   c.addEventListener('click',()=>onSelect(full));
   g.appendChild(c);
 }
}
