# 手动实现 instanceof

```js
    function instanceof(left, right) {
        // 获取类型的原型
        let prototype = right.prototype
        // 获取对象的原型
        let left = left.__proto__
        while(true) {
            if(left === null)  return false
            if(left === prototype)  return true
        }
    }
```