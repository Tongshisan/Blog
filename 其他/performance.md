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

