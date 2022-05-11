;
//asignar un nombre y versión al cache
const CACHE_NAME = 'Cache_Pendulo',
  urlsToCache = [
    './',
    'https://jrdiaz08.github.io/Pendulo/appleTouchIcon.png',
    'https://jrdiaz08.github.io/Pendulo/Bandinski.html',
    'https://jrdiaz08.github.io/Pendulo/BerlinSansFB.ttf',
    'https://jrdiaz08.github.io/Pendulo/BG.png',
    'https://jrdiaz08.github.io/Pendulo/bluetooth.js',
    'https://jrdiaz08.github.io/Pendulo/estilos.css',
    'https://jrdiaz08.github.io/Pendulo/favicon.ico',
    'https://jrdiaz08.github.io/Pendulo/Icono1.png',
    'https://jrdiaz08.github.io/Pendulo/Icono2.png',
    'https://jrdiaz08.github.io/Pendulo/Icono3.png',
    'https://jrdiaz08.github.io/Pendulo/Icono4.png',
    'https://jrdiaz08.github.io/Pendulo/icono16x16.png',
    'https://jrdiaz08.github.io/Pendulo/icono32x32.png',
    'https://jrdiaz08.github.io/Pendulo/icono150x150.png',
    'https://jrdiaz08.github.io/Pendulo/icono192x192.png',
    'https://jrdiaz08.github.io/Pendulo/icono512x512.png',
    'https://jrdiaz08.github.io/Pendulo/index.html',
    'https://jrdiaz08.github.io/Pendulo/logo.png',
    'https://jrdiaz08.github.io/Pendulo/Marca.png',
    'https://jrdiaz08.github.io/Pendulo/PenDali.html',
    'https://jrdiaz08.github.io/Pendulo/script.js',
  ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      })
  )
})
