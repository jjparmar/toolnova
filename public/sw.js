// ToolNova Service Worker for PWA Offline Caching
const CACHE_NAME = 'toolnova-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/logo.png',
  '/favicon-32x32.png',
  '/og-image.png',
  '/tools/merge-pdf',
  '/tools/split-pdf',
  '/tools/image-compressor',
  '/tools/resize-image'
];

// Install Event — cache shell & core browser tools
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event — clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event — Stale-While-Revalidate strategy for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Ignore non-GET requests or API requests
  if (request.method !== 'GET' || request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Network failed — fallback to cached response if available
        return cachedResponse;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
