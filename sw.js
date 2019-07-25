let version = '1.0';
let cacheFiles = [
  'index.html'
];

// 每次打开带有sw的页面，都会拉取最新sw脚本文件，判断新老脚本文件如果存在字节差异，就安装新的sw脚本，触发install事件
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
  console.log('已安装');
  self.skipWaiting();
})

// 旧的service-worker页面全部关闭后，就会激活新的service-worker，触发activate事件，在这里可以清空上一个版本的缓存
self.addEventListener('activate', ev => {
  console.log('已激活');
  ev.waitUntil(
    caches.keys().then(
      keylist => {
        return Promise.all(keylist.map(
          key => {
            console.log(key)
            // 此处展示所有版本，可以在激活时删除旧版本
          }
        ))
      }
    )
  )
  self.clients.claim();
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

self.addEventListener('sync', ev => {

})

self.addEventListener('push', ev => {

})


/**
 * 获取缓存信息
 */
navigator.storage.estimate().then(
  res => {
    console.log(res)
  }
)
