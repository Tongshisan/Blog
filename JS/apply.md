# apply 的实现

## ES5 

```js
    Function.prototype.apply(ctx, arr) {
        let ctx = ctx || window
        // 用 this 获取调用 apply 的函数
        ctx.fn = this
        let res
        if(!arr) {
            res = ctx.fn()
        } else {
            let args = []
            for(let i = 0, len = arr.length; i < len; i++) {
                args.push(`arr[${i}]`)
            }
            res = eval(`ctx.fn(${args})`)
        }
        delete ctx.fn

        return res
    }
```

## ES6

```js
    Function.prototype.apply(ctx, arr) {
        let ctx = ctx || window
        ctx.fn = this

        let res = eval(`ctx.fn(...args)`)
        delete ctx.fn
        return res
    }
```

```js
    Function.prototype.apply = function(ctx, rest) {
        if(!ctx) {
            // ctx 为 null / undefined 时, 设置默认值
            ctx = typeof window === 'undefined' ? global : window
        }
        ctx.fn = this
        let result
        if(rest === 'undefined' || rest === 'null') {
            // undefined 或 null 不是 Iterator 对象, 不能使用扩展运算符
            result = ctx.fn(rest)
        } else if(typeof rest === 'object') {
            result = ctx.fn(...rest)
        }
        delete ctx.fn
        return result
    }
```
*参考链接: https://github.com/mqyqingfeng/Blog/issues/11*