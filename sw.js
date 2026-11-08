// Generated locally. Release 59c79eb915fff5ef
const CACHE='gomes-59c79eb915fff5ef';
const FILES=["./","./index.html","./manifest.webmanifest","./styles.css?v=aab1a4a5929d4a3d","./app.js?v=de398380a54737f4","./assets/logo.png","./assets/icon.webp","./assets/icon-192.png","./assets/icon-512.png","./assets/icon-maskable.png","./assets/hero.webp","./assets/usinagem.webp","./assets/engrenagem.webp","./assets/rosca.webp","./assets/balanceamento.webp","./assets/projetos.webp"];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('gomes-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;if(event.request.mode==='navigate'){event.respondWith(fetch(event.request).catch(()=>caches.match('./index.html')));return;}event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request)));});
