
importScripts('./assets/app/sw_env.js');


const { cacheName, cacheFiles } = globalThis.sw_env;

globalThis.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    e.waitUntil((async function () {
        globalThis.skipWaiting();
        const cache = await caches.open(cacheName);
        return cache.addAll(cacheFiles);
    })());
});

globalThis.addEventListener('activate', function (e) {
    e.waitUntil((async function () {
        await clients.claim();
    })());
});

globalThis.addEventListener('fetch', function (e) {
    e.respondWith(async function () {
        const url = String(e.request.url);
        let allowCache = true;
        for (const i in globalThis.sw_replaces) {
            if (url.endsWith(i)) {
                const result = await globalThis.sw_replaces[i](e.request);
                if (result === globalThis.sw_env.NO_CACHE) {
                    allowCache = false;
                }
                else return result;
            }
        }
        // if (allowCache && (e.request.cache !== 'no-store' && e.request.cache !== 'no-cache')) {
        //     const cacheResult = await caches.match(e.request);
        //     if (cacheResult) {
        //         return cacheResult;
        //     }
        // }
        try {
            const req = new Request(e.request.url, {
                method: e.request.method,
                headers: e.request.headers,
                body: e.request.body,
                mode: (e.request.mode === 'navigate') ? undefined : e.request.mode,
                credentials: e.request.credentials,
                cache: e.request.cache,
                redirect: e.request.redirect,
                referrer: e.request.referrer,
                referrerPolicy: e.request.referrerPolicy,
                integrity: e.request.integrity,
            });
            const cacheResult = await caches.match(e.request);
            const useCacheResult = allowCache && /GET/i.test(req.method) && cacheResult && (req.cache !== 'no-store' && req.cache !== 'no-cache');
            if (useCacheResult) {
                const etag = cacheResult.headers.get('etag');
                if (etag) req.headers.set('if-none-match', etag);
            }
            const resp = await fetch(req);
            if (useCacheResult) {
                if (resp.status === 304) return cacheResult;
            }
            if (
                allowCache &&
                /GET/i.test(req.method) &&
                resp.status === 200 &&
                (url.startsWith(globalThis.location.origin))
            ) try {
                const cache = await caches.open(cacheName);
                await cache.put(e.request, resp.clone());
            } catch (error) { console.warn('Failed to cache', e.request, ':', error); };
            return resp;
        } catch (error) {
            console.error('Failed to request', e.request.url, ':', error);
        }
        return new Response(new Blob([]), { status: 599, statusText: 'Service Worker Internal Error' });
    }());
});



function nop() { }



