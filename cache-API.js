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
