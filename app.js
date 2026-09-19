
const names=['จ','อ','พ','พฤ','ศ','ส','อา'];let sel=5;
let data=JSON.parse(localStorage.getItem('narada-v10')||'[{"day":5,"time":"13:00","title":"ครูแนน"},{"day":5,"time":"16:30","title":"ครูเอ๋ ภาษา"}]');
const week=week=document.getElementById('week'),list=document.getElementById('list');
const root=document.documentElement;
root.dataset.theme=localStorage.getItem('theme')||'pink';
root.dataset.dark=localStorage.getItem('dark')||'false';
themeBtn.onclick=()=>themePanel.classList.toggle('hidden');
document.querySelectorAll('.sw').forEach(b=>b.onclick=()=>{const t=b.classList[1];root.dataset.theme=t;localStorage.setItem('theme',t)});
darkBtn.onclick=()=>{const d=root.dataset.dark!=='true';root.dataset.dark=d;localStorage.setItem('dark',d)};
function drawWeek(){week.innerHTML='';for(let i=0;i<7;i++){let d=document.createElement('div');d.className='day'+(i===sel?' active':'');d.innerHTML=`<div>${names[i]}</div><div>${14+i}</div>`;d.onclick=()=>{sel=i;drawWeek();drawList()};week.appendChild(d)}}
function drawList(){list.innerHTML='';data.filter(x=>x.day===sel).sort((a,b)=>a.time.localeCompare(b.time)).forEach((x,i)=>{let c=document.createElement('div');c.className='card';c.innerHTML=`<div class=row><div class=time>${x.time}</div><div class=mini><button onclick='edit(${i})'>✏️</button><button onclick='delItem(${i})'>🗑️</button></div></div><div>${x.title}</div>`;list.appendChild(c)})}
window.delItem=i=>{data.splice(i,1);saveData()};window.edit=i=>{dlg.showModal();day.selectedIndex=data[i].day;time.value=data[i].time;title.value=data[i].title;window.idx=i};
function saveData(){localStorage.setItem('narada-v10',JSON.stringify(data));drawList()}
drawWeek();drawList();
add.onclick=()=>{idx=-1;dlg.showModal()};cancel.onclick=e=>{e.preventDefault();dlg.close()};save.onclick=e=>{e.preventDefault();let o={day:day.selectedIndex,time:time.value,title:title.value};if(idx>=0)data[idx]=o;else data.push(o);dlg.close();saveData()}
