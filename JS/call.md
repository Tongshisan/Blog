# call 方法的实现

## ES5

```js
    Function.prototype.call(ctx) {
        let ctx = ctx || window
        let args = []
        ctx.fn = this
        for(let i = 1, len = arguments.length; i < len; i++) {
            args.push(`arguments[${i}]`)
        }

        let res = eval(`ctx.fn(${args})`)

        delete ctx.fn
        return res
    }
```

## ES6

```js
    Function.prototype.call(ctx, ...args) {
        let ctx = ctx || window
        ctx.fn = this

        let res = eval(`ctx.fn(...args)`)
        delete ctx.fn
        return res
    }
```

```js
    Function.prototype.call = function(ctx) {
        if(!ctx) {
            ctx = typeof window === 'undefined' ? global : window
        }

        ctx.fn = this      // this 指向当前函数
        let rest = [...arguments].slice(1)      // 获取除了 this 指向对象以外的参数
        let result = ctx.fn(...rest)

        delete ctx.fn
        return result
    }
```