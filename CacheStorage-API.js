/**
 * CacheStorage API
 */

/**
 * 在当前域名下打开一个缓存（不存在就新建），同一个域名下可以有多个cache对象，建议使用版本号命名
 */
caches.open('version1').then(
  res => {
    // res:cache示例
    console.log(res)
    alert('缓存成功')
  },
  err => {
    console.error(err)
    alert('缓存失败')
  }
)

/**
 * 在当前域名下删除一个缓存
 */
caches.delete('version1').then(
  res => {
    /**
     * 无论存不存在要删除的版本，都会走进resolve
     * 存在版本，res:true，不存在版本 res：false
     */
    console.log(res)
    alert('删除成功')
  },
  err => {
    console.error(err)
    alert('删除失败')
  }
)

/**
 * 返回当前域名下所有的缓存
 */
caches.keys().then(
  res => {
    /**
     * res是所有cachename的集合
     */
    console.log(res)
  },
  err => {
    console.error(err)
  }
)

/**
 * 判断当前域下是否含有指定的cache
 */
caches.has('version2').then(
  res => {
    /**
     * res是检查的结果，含有：true，没有：false
     */
    console.log(res)
  },
  err => {
    console.error(err)
  }
)

/**
 * 查找当前域下的所有缓存对象是否含有指定的资源（url或者文件）
 */
caches.match('index.html').then(
  res => {
    /**
     * 如果没找到res：undefined
     * 如果匹配到则返回基于fetch的response，可以直接通过sw响应页面请求
     */
    console.log(res)
  },
  err => {
    console.error(err)
  }
)

/**
 * 查找当前域下的所有缓存对象是否含有指定的资源（url或者文件），使用查询配置
 */
caches.match('index.html', {
  ignoreMethod: true,   // 忽略请求方法，默认false
  ignoreSearch: true,   // 忽略search值，默认false
  ignoreVary: true,    // 忽略vary头，默认false
  cacheName: ''  // 指定要搜索的缓存对象，可以加快搜索
}).then(
  res => {
    /**
     * 如果没找到res：undefined
     * 如果匹配到则返回基于fetch的response，可以直接通过sw响应页面请求
     */
    console.log(res)
  },
  err => {
    console.error(err)
  }
)


/**
 * 注意！所有CacheStorage的api都是基于promise的
 */

/*
interface CacheStorage {
    delete(cacheName: string): Promise<boolean>;
    has(cacheName: string): Promise<boolean>;
    keys(): Promise<string[]>;
    match(request: RequestInfo, options?: CacheQueryOptions): Promise<Response | undefined>;
    open(cacheName: string): Promise<Cache>;
}
 */
