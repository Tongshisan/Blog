# 用 Object.prototype.toString 判断值类型

```js
let toString = Object.prototype.toString

toString.call(new Date)       // [Object Date]
toString.call(new String)      // [Object String]
toString.call(Math)             // [Object Math]
toString.call(undefined)   // [Object Undefined]
toString.call(null)             // [Object Null]
```