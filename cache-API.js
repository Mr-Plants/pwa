/*
 * cache实例的API
 * 可以理解为表
  interface Cache {
      add(request: RequestInfo): Promise<void>;
      addAll(requests: RequestInfo[]): Promise<void>;
      delete(request: RequestInfo, options?: CacheQueryOptions): Promise<boolean>;
      keys(request?: RequestInfo, options?: CacheQueryOptions): Promise<ReadonlyArray<Request>>;
      match(request: RequestInfo, options?: CacheQueryOptions): Promise<Response | undefined>;
      matchAll(request?: RequestInfo, options?: CacheQueryOptions): Promise<ReadonlyArray<Response>>;
      put(request: RequestInfo, response: Response): Promise<void>;
  }
 */

/**
 * 先使用open来获取一个cache对象
 */
caches.open('version2').then(
  cache => {
    /**
     * 先fetch一个资源，然后放进cache
     */
    cache.add('index.html').then(
      res => {
        // 成功res为undefined
        console.log(res)
      },
      err => {
        /**
         * 如果获取资源失败，err 为 fetch error
         */
        console.log('err' + err)
      }
    )
  }
)

caches.open('version2').then(
  cache => {
    /**
     * 先fetch一个资源集合，然后放进cache
     */
    cache.addAll(['index.html', 'login.html']).then(
      res => {
        // 成功res为undefined
        console.log(res)
      },
      err => {
        /**
         * 如果获取任意一个资源失败，其他也不会缓存，err 为 fetch error
         */
        console.log('err' + err)
      }
    )
  }
)


caches.open('version2').then(
  cache => {
    /**
     * 在当前cache对象中匹配资源，返回匹配的第一个资源response
     */
    cache.match('index.html').then(
      res => {
        /**
         * 如果匹配成功，res为资源response
         * 如果失败 res为undefined
         */
        console.log(res)
      }
    )
  }
);


caches.open('version2').then(
  cache => {
    /**
     * 在当前cache对象中匹配资源，返回匹配到的所有资源response集合
     * 如果request不传值，则返回当前cache对象下的所有已缓存资源response集合
     */
    cache.matchAll('index.html').then(
      res => {
        /**
         * 如果删除成功，res为true
         * 如果资源不存在或已删除 res为false
         */
        console.log(res)
      }
    )
  }
)

caches.open('version2').then(
  cache => {
    /**
     * 在当前cache对象中删除资源
     */
    cache.delete('index.html').then(
      res => {
        /**
         * 如果删除成功，res为true
         * 如果资源不存在或已删除 res为false
         */
        console.log(res)
      }
    )
  }
)

caches.open('version2').then(
  cache => {
    /**
     * 返回当前cache对象中所有资源response集合
     */
    cache.keys('index.html').then(
      res => {
        /**
         * 如果有缓存，res为缓存response集合
         * 如果没有缓存，res为空集合
         */
        console.log(res)
      }
    )
  }
)

fetch('index.html').then(
  res => {
    caches.open('version2').then(
      cache => {
        /**
         * put通常需要配合fetch使用，不如直接使用add或者addAll
         */
        cache.put('index.html', res).then(
          info => {
            /**
             * 如果缓存成功，info为undefined
             */
            console.log(info)
          }
        )
      }
    )
  }
)
