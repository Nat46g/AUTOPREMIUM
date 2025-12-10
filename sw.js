const CACHE_NAME = 'autopremium-v1.0.1';
const urlsToCache = [
  './',
  './hh.html',
  './car.html', 
  './compra.html',
  './nota.html',
  './adeus.html',
  './hh.css',
  './car.css',
  './compra.css',
  './nota.css',
  './adeus.css',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});