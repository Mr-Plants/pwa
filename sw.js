// 安装回调
self.addEventListener('install', ev => {
    console.log(ev)
})

self.addEventListener('activate', ev => {
    console.log('已激活')
})

self.addEventListener('fetch', (ev) => {

})
