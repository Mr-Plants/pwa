let version = '1.0';
let cacheFiles = [
    // 'index.html'
];

// 安装回调
self.addEventListener('install', ev => {
    ev.waitUntil(
        // 创建一个缓存版本，返回promise
        caches.open(version).then(
            cache => {
                console.log('install success');
                // resolve时缓存cacheFiles所有文件
                return cache.addAll(cacheFiles);
            },
            err => {
                console.log('install failed');
            }
        )
    )
    console.log('已安装')
})

self.addEventListener('activate', ev => {
    console.log('已激活')
})

self.addEventListener('fetch', (ev) => {
    ev.respondWith(
        caches.match(ev.request).then(
            res => {
                console.log(res);
                return res || fetch(ev.request);

            }
        )
    )
})
