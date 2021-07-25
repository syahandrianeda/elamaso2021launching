const staticCacheName = "site-static-tp1" + new Date().getTime();
const dynamicChace = "cache_dynamic_tp1" + new Date().getTime();

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

    "/guru/aafnbaruv7.js",
    "/gk/absen.js",
    "/gmp/absengurumapel.js",
    "/gk/barcode.js",
    "/gk/datasiswa.js",
    "/gmp/datasiswagurumapel.js",
    "/guru/editor.js",
    "/guru/exceltabel.js",
    "/gk/gurukelas.js",
    "/gmp/gurumapel.js",
    "/guru/guruprofildankehadiran.js",
    "/guru/kurikulum.js",
    "/script/materi.js",
    "/gk/materiguru.js",
    "/gmp/materigurumapel.js",
    "/guru/nilai.js",
    "/script/ortujs.js",
    "/guru/raportsemester.js",
    "/script/renderpdf.js",
    "/script/siswa.js",
    "/gk/uploadmateri.js",
    "/gmp/uploadmaterigurumapel.js",
    "/script/uploadmedia.js",
    "/guru/variabel.js",
    "/guru/videoelamaso.js",
    "/guru/waktu.js",
    "/guru/zframe.js",

    "/css/firststyle.css",

    "/kepsek/exceltabel.js",
    "/kepsek/skrip.js",
    "/kepsek/umum.js",
    "/kepsek/unfaedah.js",
    "/kepsek/videoelamaso.js",
    "/kepsek/zframe.js",
    "/user/elamaso_offline.html",

    "/staff/staff.js",
    "/staff/exceltabel.js",
    "/staff/umum.js",
    "/staff/unfaedah.js",
    "/stff/videolamaso.js"



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