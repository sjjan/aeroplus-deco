// AeroPlus Deco — Service Worker
// Bump this version string whenever you deploy a new version of index.html
const CACHE_VERSION = '2026-03-17h';
const CACHE_NAME = `aeroplus-deco-${CACHE_VERSION}`;

const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-maskable-192.png',
  '/icon-maskable-512.png'
];

// ── Install: pre-cache all app shell assets ──────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())  // activate immediately, don't wait for tabs to close
  );
});

// ── Activate: delete old caches ──────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith('aeroplus-deco-') && key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      ))
      .then(() => self.clients.claim())  // take control of all open tabs immediately
  );
});

// ── Fetch: cache-first for app shell, network-first for everything else ───────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) return;

  // Cache-first strategy: serve from cache, fall back to network
  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) return cached;

        // Not in cache — fetch from network and cache the response
        return fetch(event.request)
          .then(response => {
            // Only cache valid responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, responseToCache));

            return response;
          })
          .catch(() => {
            // Network failed — serve index.html for navigation requests (offline fallback)
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// ── Message: force update from app UI ────────────────────────────────────────
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
