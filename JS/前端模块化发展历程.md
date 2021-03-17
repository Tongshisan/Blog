# 前端模块化发展历程



## IIFE

使用立即执行函数来实现模块化

特点: 在一个单独的函数作用域内执行代码, 避免变量冲突

```js
(function() {
  ...
})()
```



## AMD

使用 `requireJS` 来编写模块化

特点: 依赖必须提前声明好

```js
define('./index.js', function(code) {
  ...
})
```



## CMD

使用 `seaJS` 来编写模块化

特点: 支持动态引入依赖文件

```js
define(function(require, ports, module) {
  var indexCode = require('./index.js')
})
```



## CommonJS

nodejs 中自带的模块化

```js
const fs = require('fs');
```



## UMD

兼容 `AMD`, `CommonJS` 模块化语法



## ES Modules

Es6 引入的模块化, 支持 `import` 来引入另一个 js

```js
import Index from './Index
```





