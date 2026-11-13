const C='homofit-097a1916';
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png'])).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
/* network first for the app itself so a new version shows on the next open; cache is the offline fallback.
   GitHub API calls are never cached. */
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin)return;
 e.respondWith(caches.open(C).then(async c=>{try{const r=await fetch(e.request);if(r.ok)c.put(e.request,r.clone());return r}catch(x){return (await c.match(e.request,{ignoreSearch:true}))||Response.error()}}))});
