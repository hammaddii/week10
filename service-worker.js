var cacheName = 'petstore-v1';
var cacheFiles = [
    'index.html',
    'products.js',
    'style.css',
    'petstore.webmanifest',
    'images/birdFood.png',
    'images/catFood.png',
    'images/dogFood.png',
    'images/ferretFood.png',
    'images/fishFood.png',
    'images/icon-512.png'
];

self.addEventListener('install', (e)=>{
    console.log('[Service Worker] install');
    e.waitUntil(
        caches.open(cacheName).then((cache) =>{
            console.log('[Service Worker] caching all the files');
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('fetch', function (e){
    e.respondWith(
        caches.match(e.request).then(function (r){
            return r || fetch(e.request).then(function(response){
                return caches.open(cacheName).then(function (cache){
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});