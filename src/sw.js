const cacheName = "2026-02-25 00:00";
const urlsToCache = [
  "/dajare-ondoku/index.js",
  "/dajare-ondoku/data/0.csv",
  "/dajare-ondoku/data/1.csv",
  "/dajare-ondoku/data/yomi.csv",
  "/dajare-ondoku/mp3/end.mp3",
  "/dajare-ondoku/mp3/incorrect1.mp3",
  "/dajare-ondoku/mp3/correct3.mp3",
  "/dajare-ondoku/favicon/favicon.svg",
  "/dajare-ondoku/kohacu.webp",
];

async function preCache() {
  const cache = await caches.open(cacheName);
  await Promise.all(
    urlsToCache.map((url) =>
      cache.add(url).catch((err) => console.warn("Failed to cache", url, err))
    ),
  );
  self.skipWaiting();
}

async function handleFetch(event) {
  const cached = await caches.match(event.request);
  return cached || fetch(event.request);
}

async function cleanOldCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map((name) => name !== cacheName ? caches.delete(name) : null),
  );
  self.clients.claim();
}

self.addEventListener("install", (event) => {
  event.waitUntil(preCache());
});
self.addEventListener("fetch", (event) => {
  event.respondWith(handleFetch(event));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(cleanOldCaches());
});
