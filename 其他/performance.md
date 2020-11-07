# performance



## 页面加载

1. 输入网址, 回车

2. 缓存解析: 如果浏览器本地缓存有资源则从缓存取资源

3. 域名解析:  `DNS` 解析, 将域名解析成 `IP`, 如果缓存中存在, 直接从缓存中取, 

4. 发送请求: 向服务器发送请求

5. `TCP` 连接, 三次握手: 建立浏览器端合服务端的连接

6. 服务器接到请求: 服务器响应请求

7. 数据传输

8. 浏览器端拿到数据, 解析 `html` 文档, 构建 `DOM` 树, `CSSOM` 树

9. 初始的 `html` 被完全加载和解析后会触发 `DOMCOntentLoaded` 事件

10. `DOM` 树和 `CSSOM` 树加载完成后生成 `render` 树, 绘制

11. 在生成 `render` 树的过程中, 浏览器就开始调用 `GPU` 绘制, 合成图层, 将内容显示在屏幕上

12. 没有文件传输, 四次挥手, `TCP` 断开连接

  页面加载主要过程主要分为: 白屏, 重定向,  `DNS`查询, `TCP` 连接, `http`请求, `DOM`解析, `DOMReady`, `onload`. 这些也就是我们前端性能监控的主要方面



## performance

`performance` 是前端性能监控的 `API`, 可以获取到当前页面中与性能相关的信息.



<img src="https://raw.githubusercontent.com/Tongshisan/Blog/master/img/performance-main.png" alt="performance-main" style="zoom:50%;" />



​	由上图可以看出, window.performance 是一个对象, 包含了: `memory`, `timing`, `navigation`, `timeOrigin` 等属性, 以及一个事件处理程序 `onresourcetimingbufferfull`



### permorance-memory

在 `chrome` 中添加的一个非标准扩展, 这个属性提供了一个可以获取到基本内存使用的情况对象 `memoryInfo`

<img src="https://raw.githubusercontent.com/Tongshisan/Blog/master/img/performance-memory.png" alt="performance-memory" style="zoom:50%;" />

​    

```js
performance.memory = {
  jsHeapSizeLimit,		// 内存大小限制, 单位是字节 B
  totalJSHeapSize,		// 可使用的内存大小, 单位是字节 B
  usedJSHeapSize			// js 对象占用的内存大小, 单位是字节 B
}
```



**如果 `usedGSHeapSize` 的值大于 `totalGSHeapSize` 的值, 则会引起内存泄露**



### performance-navigation

返回 `PerformanceNavigation` 对象, 提供了在指定的时间段发生的操作相关信息, 包括页面是加载还是刷新, 发生了多少重定向等

<img src="https://raw.githubusercontent.com/Tongshisan/Blog/master/img/performance-navigation.png" alt="performance-navigation" style="zoom:50%;" />

```js
performance.navigation = {
  redirectCount: xxx,		// 重定向次数
  type: 0, 		// 网页的加载来源
}
```

type 取值及含义

| type | 网页加载方式                                       | 相当于                                   |
| ---- | -------------------------------------------------- | ---------------------------------------- |
| 0    | 通过点击链接, 地址栏输入, 表单提交, 脚本等方式加载 | performance.navigation.TYPE_NAVIGATENEXT |
| 1    | 通过重新加载按钮或 location.reload() 加载          | performance.navigation.TYPE_RELOAD       |
| 2    | 通过前进或后退按钮或历史记录加载                   | performance.navigation.TYPE_BACK_FORWARD |
| 255  | 任何其他来源加载                                   | performance.navigation.TYPE_UNDEFINED    |



### performance.timeOrigin

返回性能测量开始的高精度时间戳



### performance.onresourcetimingbufferfull

一个回调的  `EventTarget`, 当触发 `resourcetimingbufferfull` 回调的时候会调用



### performance.timing

返回 `PerformanceTiming` 对象, 包含了各种与浏览器性能相关的数据, 提供了浏览器处理页面的各个阶段的耗时

<img src="https://raw.githubusercontent.com/Tongshisan/Blog/master/img/performance-timing.png" alt="performance-timing" style="zoom:50%;" />

其整体结构可以参考下图

<img src="https://raw.githubusercontent.com/Tongshisan/Blog/master/img/performance.png" alt="performance整体结构"  />

`PerformanceTiming` 对象中的属性都是只读属性, 值都是精确到毫秒的时间戳

+ **`navigationStart`** : 返回当前浏览器窗口的前一个页面的关闭, 发生 `unload` 事件时的时间戳. 如果没有前一个页面, 则等于 `fetchStart` 属性
+ **`unloadEventStart`** : 如果前一个页面与当前页面同域, 则返回前一个页面 `unload` 事件发生时的时间戳, 如果没有前一个页面, 或者前一个页面与当前页面不同域, 则返回 0
+ **`unloadEventEnd`** :  返回 `unload` 事件处理程序结束之时的毫秒时间戳, 如果没有前一个页面或者与前一个页面不同域, 则返回 0
+ **`redirectStart`** : 返回第一个 `http` 的重定向开始时的时间戳, 如果没有发生重定向或其中一个重定向非同源, 则返回 0
+ **`redirectEnd`** : 返回最后一个 `http` 重定向被完成且 `http` 响应的最后一个字节被接收之时的时间戳,  如果没有发生重定向或其中一个重定向非同源, 则返回 0
+ **`fetchStart`** : 返回浏览器已经准备好使用 `http` 请求抓取文档时的时间戳, 在检查应用的缓存之前
+ **`domainLookupStart`** : 为域名开始解析之前的时间戳, 如果使用了持久连接或者使用了本地缓存 (也就是没有 `dns` 查询, 直接从缓存中取 `ip` ), 则与 `fetchStart` 相同
+ **`domainLookupEnd `** : 为解析域名结束时的时间戳,  如果使用了持久连接或者使用了本地缓存 (也就是没有 `dns` 查询, 直接从缓存中取 `ip` ), 则与 `fetchStart` 相同
+ **`connectStart`** : 请求连接被发送到网络之前的时间戳, 如果传输层报告错误并且连接的建立重新开始, 则把最后建立连接的时间作为该值。 如果使用了持久连接, 则与 `fetchStart` 相同
+ **`connectEnd`** : 网络链接建立的时间节点. 如果传输层报告了错误并且连接的建立重新开始, 则采用最后一次链接建立的时间, 如果使用了持久连接, 则与 `fetchStart` 相同。链接被认为打开以所有的链接握手, SOCKS 认证结束为标志
+ **`secureConnectionStart`** : 返回安全链接握手开始的时间戳, 如果不是安全链接, 则返回 0
+ **`requestStart`** : 返回浏览器发送从服务器或者缓存获取实际文档的请求时的时间戳, 如果传输层在请求开始之后发生错误并且连接被重新打开, 则返回新的请求的相应值
+ **`responseStart`** : 返回浏览器从服务器, 缓存或本地资源接收到响应的第一个字节时的时间戳
+ **`responseEnd`** : 返回浏览器从服务器, 缓存或本地资源接收到响应的最后一个字节 或者 连接被关闭时的时间戳
+ **`domLoading`** : 为解析器开始工作, 即 `Document.readyState` 改变为 `loading` 并且`readystatechange` 事件触发时的时间戳
+ **`domInteractive`** : 为主文档的解析器结束工作, 即 `Document.readyState` 改变为 `interactive`, 并且触发 `readystatechange` 事件触发时的时间戳. (这个属性被用于测量用户感受的加载网页的速度)
+ **`domContentLoadedEventStart`** : 为解析器发出 `DOMContentLoaded` 事件之前, 即所有需要被运行的脚本已经被解析之时的时间戳
+ **`domContentLoadedEventEnd`** : 为所有需要尽早执行的脚本执行完毕时的时间戳
+ **`domComplete`** : 为主文档的解析器结束工作, `Document.readyState` 改变为 `complete` 且 `readystatechange` 事件触发时的时间戳
+ **`loadEventStart`** : 为 `load` 事件被现在的文档触发之时的时间戳, 如果这个事件没有被触发, 则返回 0
+ **`loadEventEnd`** : 为 `load` 事件处理程序被终止, 加载事件已经完成之时的时间戳, 如果这个事件没有被触发或者事件没能完成, 返回 0



## 常用的时间点



### 页面加载完成时间: 代表了用户等待页面可用的时间

```js
let performance = window.performance
let t = performance.timing
let time = t.loadEventEnd - t.navigationStart
```



### 解析 DOM 树结构的时间: 判断 DOM 树嵌套情况

```js
let performance = window.performance
let t = performance.timing
let time = t.domComplete - t.responseEnd
```



### 重定向的时间

```js
let performance = window.performance
let t = performance.timing
let time = t.redirectEnd - t.redirectStart
```



### `DNS` 查询时间: 可做预加载, 缓存, 减少查询时间

```js
let performance = window.performance
let t = performance.timing
let time = t.domainLookupEnd - t.domainLookupStart
```



### 白屏时间: 读取第一个字节的时间

```js
let performance = window.performance
let t = performance.timing
let time = t.responseStart - t.navigationStart
```



### 内容加载完成的时间

```js
let performance = window.performance
let t = performance.timing
let time = t.responseEnd - t.responseStart
```



### 执行 `onload` 事件的时间

```js
let performance = window.performance
let t = performance.timing
let time = t.loadEventEnd - t.loadEventStart
```



### `DNS` 缓存时间

```js
let performance = window.performance
let t = performance.timing
let time = t.domainLookupStart - t.fetchStart
```



### 卸载页面的时间

```js
let performance = window.performance
let t = performance.timing
let time = t.unloadEventEnd - t.unloadEventStart
```



### TCP 建立连接完成握手的时间

```js
let performance = window.performance
let t = performance.timing
let time = t.connectEnd - t.connectStart
```

