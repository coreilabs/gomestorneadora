import { readFileSync, writeFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
const token = () => randomBytes(8).toString('hex');
const release = token();
let html = readFileSync('index.html', 'utf8');
const resources = ['styles.css', 'app.js']; const urls = [];
for (const file of resources) {
  const version = token(); const url = `${file}?v=${version}`; urls.push(`./${url}`);
  html = html.replace(new RegExp(`${file.replace('.', '\\.')}\\?v=[a-zA-Z0-9]+`, 'g'), url);
}
if (html.includes('OGTOKEN')) html = html.replaceAll('OGTOKEN', token());
writeFileSync('index.html', html);
const assets = ['./', './index.html', './manifest.webmanifest', ...urls, './assets/logo.png', './assets/icon.webp', './assets/icon-192.png', './assets/icon-512.png', './assets/icon-maskable.png', ...['hero','usinagem','engrenagem','rosca','balanceamento','projetos'].map(n => `./assets/${n}.webp`)];
writeFileSync('sw.js', `// Generated locally. Release ${release}\nconst CACHE='gomes-${release}';\nconst FILES=${JSON.stringify(assets)};\nself.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)));});\nself.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('gomes-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});\nself.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;if(event.request.mode==='navigate'){event.respondWith(fetch(event.request).catch(()=>caches.match('./index.html')));return;}event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request)));});\n`);
console.log(`Prepared release ${release}`);
