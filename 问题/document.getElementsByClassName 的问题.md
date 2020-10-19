<!--
 * @Author: your name
 * @Date: 2020-10-19 14:15:36
 * @LastEditTime: 2020-10-19 14:36:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Blog/问题/document.getElementsByClassName 的问题.md
-->
# document.getElementsByClassName

今天在使用 document.getElementsByClassName 的时候碰到了一个问题

![document.getElementsByClassName()](https://raw.githubusercontent.com/Tongshisan/Blog/master/img/document.getElementsByClassName0.png)

结果

![document.getElementsByClassName()](https://raw.githubusercontent.com/Tongshisan/Blog/master/img/document.getElementsByClassName1.png)

查阅后是因为在 dom 未加载完成就调用了 js 

![document.getElementsByClassName()](https://raw.githubusercontent.com/Tongshisan/Blog/master/img/document.getElementsByClassName2.png)
![document.getElementsByClassName()](https://raw.githubusercontent.com/Tongshisan/Blog/master/img/document.getElementsByClassName3.png)



获取元素的 offset

```js
element.offsetTop
```

`Element.offsetTop`, 只读属性, 返回当前元素相对于其 `offsetParent` 元素的顶部内边距的距离



使用了 

```js
element.scrollTop = value
```

`Element.scrollTop` 属性可以读取或设置一个元素的内容垂直滚动的像素数

无效, 原因待查证



**最终解决方法**

```js
Element.scrollIntoView()
```

`Element.scrollIntoView()` 方法让当前的元素滚动到浏览器窗口的可视区域内。