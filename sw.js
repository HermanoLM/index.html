const CACHE = 'fidelis-v1';
const ASSETS = [
  '/Para-Samantha/',
  '/Para-Samantha/index.html',
  '/Para-Samantha/fondo.png',
  '/Para-Samantha/fondo2.png',
  '/Para-Samantha/bg.jpg.png',
  '/Para-Samantha/icon-192.png',
  '/Para-Samantha/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
