const staticCacheName = "site-static-idskl2831213" + new Date().getTime();
const dynamicChace = "cache_dynamic_idrskl4831213_" + new Date().getTime();

const assets = [
    "/",
    "/css/css_siswa.css",
    "/css/css_timeline.css",
    "/css/csssiswa.css",
    "/css/stylegurukelas.css",
    "/css/stylegurukelasgurumapel.css",
    "/css/w3-theme-blue-grey.css",
    "/css/w3.css",
    "/img/lamaso.webp",
    "/img/eabsensi.webp",
    "/img/L_vT86_100px.png",
    "/img/jaga_diri_dari_covid.webp",
    "/img/polos.png",
    "/img/akarkuadrat.PNG",
    "/img/akarkubik.PNG",
    "/img/anaksd.png",
    "/img/bgloginguru.jpeg",
    "/img/bgloginsiswa.jpeg",
    "/img/bgloginortu.jpeg",
    "/img/PTK.png",

    
    "/js/aafnbaruv7.js",
    "/js/absen.js",
    "/js/absengurumapel.js",
    "/js/barcode.js",
    "/js/datasiswa.js",
    "/js/datasiswagurumapel.js",
    "/js/editor.js",
    "/js/exceltabel.js",
    "/js/firstscript.js",
    "/js/gurukelas.js",
    "/js/gurumapel.js",
    "/js/guruprofil.js",
    "/js/kehadiranguru.js",
    "/js/kurikulum.js",
    "/js/materi.js",
    "/js/materiguru.js",
    "/js/materigurumapel.js",
    "/js/menuabsensiswa.js",
    "/js/nilai.js",
    "/js/ortujs.js",
    "/js/raportsemester.js",
    "/js/renderpdf.js",
    "/js/siswa.js",
    "/js/siswajs.js",
    "/js/uploadmateri.js",
    "/js/uploadmaterigurumapel.js",
    "/js/uploadmedia.js",
    "/js/variabel.js",
    "/js/videoelamaso.js",
    "/js/waktu.js",
    "/js/zframe.js",

    "/css/firststyle.css",

    "/kepsek/exceltabel.js",
    "/kepsek/skrip.js",
    "/kepsek/umum.js",
    "/kepsek/unfaedah.js",
    "/kepsek/videoelamaso.js",
    "/kepsek/zframe.js",
    "/user/elamaso_offline.html"


];


const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        });
    });
};

self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets');
            cache.addAll(assets);

        }).catch(err => console.log(err))
    );
});


self.addEventListener('activate', evt => {

    // console.log('server worker berahsil diaktivasi')
    evt.waitUntil(
        caches.keys().then(keys => {
            //         //console.log(keys);
            return Promise.all(keys.filter(key => key !== staticCacheName && key !== dynamicChace)
                .map(key => caches.delete(key))
                //             .map(key => caches.delete(key))
            );
            //     })
            // );
        })
    )
})
self.addEventListener('fetch', evt => {

    // console.log(evt.request.url);
    if (evt.request.url.indexOf('https://script.google.com') === -1) {
        evt.respondWith(
            caches.match(evt.request).then(cacheRes => {
                return cacheRes || fetch(evt.request).then(fetchRes => {
                    return caches.open(dynamicChace).then(cache => {
                        cache.put(evt.request.url, fetchRes.clone());
                        // check cached items size
                        limitCacheSize(dynamicChace, 35);
                        return fetchRes;
                    })
                });
            }).catch((er) => {
                console.log(er)
                if (evt.request.url.indexOf('.html') > -1) {
                    return caches.match('/user/elamaso_offline.html');
                }
            })
        );
    }
    // // console.log('fetch event', evt);
})