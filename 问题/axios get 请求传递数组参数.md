# axios get 请求传递数组参数

从接受企业平台, 不到一个月, 因为 axios get 请求传递数组参数, 出现了三个 bug

从请求中来看都是 url 中 '[' 和 ']' 没有被转义

#### 解决方法

**使用 qs 库 和 axios 的参数处理函数**

```js
axios.get(url, {
    params: {
        ids: [1, 2, 3],
        type: 1
    },
    paramsSerializer: params => {
        return qs.stringify(params, { indices: false })
    }
})
```

