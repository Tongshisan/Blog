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