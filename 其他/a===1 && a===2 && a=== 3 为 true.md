# 让 a===1 && a===2 && a===3 为 true

## Proxy

```js
let a = new Proxy({}, {
    i: 1,
    get: function() {
        return () => this.i++
    }
})

```