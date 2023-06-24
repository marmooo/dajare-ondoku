var CACHE_NAME = "2023-06-24 10:16";
var urlsToCache = [
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

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(urlsToCache);
      }),
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }),
  );
});

self.addEventListener("activate", function (event) {
  var cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});
