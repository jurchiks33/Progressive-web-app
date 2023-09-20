self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('v1').then((cache) =>{
            return cache.addAll([
               '/',
               '/index.html',
               '/css/styles.css',
               '/js/main.js',
               'icon.png' 
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) =>
            response || fetch(event.request)
        )
    );
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
        console.log('Service Worker registered with scope:',registration.scope);    
    }).catch((error) => {
        console.log('Service Worker registration failed:', error);
    });
}