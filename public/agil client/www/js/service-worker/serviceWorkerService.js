angular.module('agil.servicios')
  .service('ServiceWorkerService', ['$http',
    function ($http) {
      const version = 5;
      const imgName = `imagenCache-${version}`
      this.SW = null
      this.init=()=>{
        this.registerSW();
        //find out what we have in the cache and other storage
       // this.getCacheSize();
      }
      this.checkServiceWorker = () =>{
        if ('serviceWorker' in navigator) {
          return true;
        }
        return false;
      };
      this.getCacheSize = () =>{
        //let's see how much storage we are using
        if ('storage' in navigator) {
          if ('estimate' in navigator.storage) {
            //get the total storage and current usage
            navigator.storage.estimate().then(({ usage, quota }) => {
              //returned numbers are in bytes
              //divide by 1024 to convert to KB
              let usedKB = parseInt(usage / 1024);
              let quotaKB = parseInt(quota / 1024);
              console.log(`Using ${usedKB} KB of ${quotaKB} KB`);
            });
            //see if storage can be set to persistent or stay best-effort
            navigator.storage.persist().then((isPer) => {
              console.log(`Browser grants persistent permission: ${isPer}`);
            });
          } else {
            console.log('No support for StorageManager methods');
          }
        }
        //look at individual files and their sizes
        caches.open(imgName).then((cache) => {
          cache.matchAll().then((matches) => {
            //matches is an Array of Response objects
            let total = 0;
            matches.forEach((response) => {
              if (response.headers.has('content-length')) {
                total += parseInt(response.headers.get('content-length'));
                console.log(`Adding size for ${response.url}`);
              }
            });
            console.log(`Total size in imageCache-2 is ${total}`);
          });
        });
      },
      this.registerSW = async () =>{
        try {
          //1.- register service worker hosting al the root of the site using the default scope
          if (this.checkServiceWorker()) {
            let registration = await navigator.serviceWorker.register('/sw.js', {
              scope: '/'
            });
            this.SW = registration.installing || registration.waiting || registration.active;
            console.log('serviceWorker registered')
          } else {
            console.log("Service worker are not supported")
          }

          //2.- see if page is currently has a service worker
          if (navigator.serviceWorker.controller) {
            console.log("we have a service worker installed")
          }
          //3.- registrate a handler to detect when new or
          // update service worker is installed & Activate.
          navigator.serviceWorker.oncontrollerchange = () => {
            console.log('new service worker active')
          }

          //4.- remove/inregister service workers
        /*   let registrations = await navigator.serviceWorker.getRegistrations()
          for (let reg of registrations) {
            const isUnReg = await reg.unregister()
            console.log(isUnReg)
          } */
          //5.- listen for messages from the service worker
        } catch (error) {
          console.log(error)
        };
      };
    }
  ]);
  
 /*  let optionsMatchAll = {
    ignoresearch: false,
    ignoreMethod:false,
    innoreVary:false
  } */