const CACHE_NAME = "2023-10-17 00:00";
const urlsToCache = [
  "/dajare-ondoku/",
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

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName)),
      );
    }),
  );
});
