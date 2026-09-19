const CACHE='narada-v9-build1';
const ASSETS=['./','./index.html','./app.js','./style.css','./manifest.json','./icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{caches.open(CACHE).then(c=>c.put(e.request,res.clone()));return res;}).catch(()=>caches.match('./index.html'))));});
