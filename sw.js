/* HQ service worker — network-first so updates always land, cache fallback for offline */
var CACHE="hq-v1";
self.addEventListener("install",function(e){self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(self.clients.claim())});
self.addEventListener("fetch",function(e){
  if(e.request.mode==="navigate"||e.request.destination==="document"){
    e.respondWith(
      fetch(e.request).then(function(r){
        var copy=r.clone();
        caches.open(CACHE).then(function(c){c.put(e.request,copy)});
        return r;
      }).catch(function(){return caches.match(e.request)})
    );
  }
});
