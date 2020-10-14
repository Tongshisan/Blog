<!--
 * @Author: your name
 * @Date: 2020-10-14 16:13:23
 * @LastEditTime: 2020-10-14 16:13:29
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /Blog/JS/defer 和 async.md
-->



# <script> 标签的 defer 和 async 属性



**一图胜前言**

![<script> 标签 defer 和 async 属性](https://raw.githubusercontent.com/Tongshisan/Blog/master/img/js%20defer%20async.png)



**自己的理解**

+ `async` 和 `defer` 都不会阻塞 `html` 的解析, 
+ `async` 会在 js 加载完成后立即执行, 不会保证 js 文件的执行顺序
+ `defer` 下载完成后不会立即执行, 一直到 `html` 解析完成后才开始执行, 能保证 js 文件的执行顺序