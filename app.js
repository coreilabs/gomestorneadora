/* Publication versions are generated locally by tools/version-assets.mjs. */
const COMPANY = { phone: '(62) 99999-9999', provisional: true };
function whatsappNumber(value) {
  const raw = value.trim(); let n = raw.replace(/\D/g, '');
  if (raw.startsWith('+') && !n.startsWith('55')) return n.length >= 10 && n.length <= 15 ? n : '';
  if (n.startsWith('0055')) n = n.slice(2);
  if (n.startsWith('55') && (n.length === 12 || n.length === 13)) n = n.slice(2);
  if (n.startsWith('0800')) return n.length === 11 ? '55' + n.slice(1) : '';
  if (n.startsWith('800') && n.length === 10) return '55' + n;
  if (!/^[1-9]\d{9,10}$/.test(n)) return '';
  if (n.length === 11) { if (n[2] !== '9') return ''; n = n.slice(0, 2) + n.slice(3); }
  return '55' + n;
}
const service = document.querySelector('#service');
function updateLinks() {
  const number = whatsappNumber(COMPANY.phone);
  const message = `Olá, equipe Gomes Torneadora! Gostaria de solicitar um orçamento para ${service.value.toLowerCase()}. Posso enviar fotos e medidas?`;
  document.querySelectorAll('.whatsapp').forEach(a => {
    if (!number) { a.removeAttribute('href'); return; }
    a.href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    a.target = '_blank'; a.rel = 'noopener noreferrer';
  });
}
updateLinks(); service.addEventListener('change', updateLinks);
document.querySelectorAll('[data-service]').forEach(a => a.addEventListener('click', () => { service.value = a.dataset.service; updateLinks(); }));
const toggle = document.querySelector('.menu-toggle');
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', open); toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); document.querySelector('#menu').classList.toggle('open', open); });
document.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => { toggle.setAttribute('aria-expanded', 'false'); document.querySelector('#menu').classList.remove('open'); }));
document.querySelectorAll('.service-list details').forEach(item => item.addEventListener('toggle', () => {
  if (!item.open) return;
  document.querySelectorAll('.service-list details').forEach(other => { if (other !== item) other.open = false; });
  const image = document.querySelector('#service-image'); image.src = `assets/${item.dataset.image}.webp`; image.alt = item.dataset.alt;
  document.querySelector('#service-caption').textContent = item.dataset.caption;
}));
const dialog = document.querySelector('#lightbox'); let lastTrigger;
document.querySelectorAll('[data-full]').forEach(button => button.addEventListener('click', () => { lastTrigger = button; dialog.querySelector('img').src = button.dataset.full; dialog.querySelector('img').alt = button.querySelector('img').alt; dialog.querySelector('p').textContent = button.querySelector('img').alt; dialog.showModal(); }));
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => lastTrigger?.focus());
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(items => items.forEach(item => { if (item.isIntersecting) { item.target.classList.remove('pending'); observer.unobserve(item.target); } }), { threshold: .08 });
  document.querySelectorAll('.section-heading,.precision-copy,.process-line article,.gallery-title').forEach(el => { el.classList.add('reveal', 'pending'); observer.observe(el); });
}
document.querySelector('#year').textContent = new Date().getFullYear();
let installPrompt; const install = document.querySelector('#install');
window.addEventListener('beforeinstallprompt', event => { event.preventDefault(); installPrompt = event; install.hidden = false; });
install.addEventListener('click', async () => { if (!installPrompt) return; await installPrompt.prompt(); await installPrompt.userChoice; installPrompt = null; install.hidden = true; });
window.addEventListener('appinstalled', () => { install.hidden = true; });
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(error => console.warn('Modo offline indisponível:', error)));
