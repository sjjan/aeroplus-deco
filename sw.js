// AeroPlus Deco — Service Worker
// Cache-first app shell with background refresh.
// All paths are RELATIVE so this works on the GitHub Pages subpath
// (https://sjjan.github.io/aeroplus-deco/) as well as any other origin/root.
const CACHE_VERSION = '2026-08-04a';
const CACHE_NAME = 'aeroplus-deco-' + CACHE_VERSION;

// Must-have for offline start. install fails (and retries next launch) if these fail.
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Nice-to-have. Cached best-effort; a 404 here must never break install.
const EXTRA_ASSETS = [
  './notam.html',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-192.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png'
];

// ── Install: pre-cache the app shell ────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(CORE_ASSETS).then(() =>
        Promise.allSettled(EXTRA_ASSETS.map(url => cache.add(url)))
      )
    ).then(() => self.skipWaiting())
  );
});

// ── Activate: delete old caches, take control immediately ───────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith('aeroplus-deco-') && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// ── Fetch ────────────────────────────────────────────────────────────────────
// Navigations (app launches): serve the cached shell INSTANTLY, then refresh
// the cache from the network in the background. Cold starts are fast and
// fully offline-capable; updates arrive on the following launch.
// Other same-origin requests: cache-first with runtime caching.
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (url.origin !== location.origin) return; // never touch cross-origin (licensing, docs links)
  if (request.method !== 'GET') return;       // never intercept POSTs

  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html').then(cached => {
        // Background refresh: keep the cached shell current without blocking launch.
        const refresh = fetch(request).then(response => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put('./index.html', copy.clone());
              cache.put('./', copy);
            });
          }
          return response;
        }).catch(() => cached); // offline: swallow the failure

        if (cached) {
          event.waitUntil(refresh.catch(() => {}));
          return cached;         // instant start, online or offline
        }
        return refresh;          // first-ever visit: must come from network
      })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
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
