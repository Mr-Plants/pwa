/*
 * cache实例的API
 */

/**
 * 获取缓存信息
 */
navigator.storage.estimate().then(
    res => {
        console.log(res)
    }
)

/**
 * 先使用open来获取一个cache对象
 */
caches.open('version2').then(
    cache => {
        /**
         * 先fetch一个资源，然后放进cache
         */
        cache.add('./index.html').then(
            res => {
                console.log(res)
            },
            err => {
                console.log(err)
            }
        )

        cache.match('index.html').then(
            res => {
                /**
                 * 如果匹配成功，res为资源response
                 * 如果失败 res为undefined
                 */

                console.log('match:' + res)
            }
        )
    },
    err => {

    }
)
