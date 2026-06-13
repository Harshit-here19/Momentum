const CACHE_NAME = "momentum-clone-v1";

const ASSETS = [
    "/",
    "/index.html",
    "/style.css",
    "/js/app.js",
    "/js/background.js",
    "/js/clock.js",
    "/js/weather.js",
    "/js/quotes.js",
    "/js/todos.js",
    "/js/settings.js"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cached) => {
            return cached || fetch(event.request);
        })
    );
});