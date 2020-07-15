# jsonp

用来解决跨域, 只能 GET 请求

## 前端代码

```js
    function jsonp({url, params, cb}) {
        return new Promise((resolve, reject) => {
            // 创建 script 标签
            let script = document.createElement('script')
            // 将回调函数挂载到 window 上
            window[cb] = function (data) {
                resole(data)
                // 执行代码后将添加的 script 标签删除
                document.body.remove.child(script)
            } 

            // 组合参数和回调函数
            let params=  {...params, cb}
            let arr = []
            for(let prop in params) {
                arr.push(`${prop}=${params[prop]}`)
            }
            script.src = `${url}?${arr.join('&')}`
            document.body.appendChild(script)
        })
    }

    // 使用

    jsonp({
        url: 'http://127.0.0.1:1234/jsonp',
        params: {
            name: '李四',
            age: 22
        },
        cb: 'sayHi'
    }).then((response) => {
        console.log(response)
    })
```

## nodejs 

```js
    const Koa = require('koa')
    const router = require('koa-router')()

    const app = new Koa()

    router.get('/jsonp', async (ctx) => {
        let {cb} = ctx.query             // sayHi
        ctx.body = `${cb}('success')`
    })

    app.use(router.routes())
    app.listen(1234)
```