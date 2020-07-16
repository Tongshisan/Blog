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