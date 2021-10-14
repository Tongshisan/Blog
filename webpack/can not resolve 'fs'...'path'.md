# can not resolve 'fs'...'path'



刚接手一个项目, 看着 `package.json` 运行项目结果报了两个错:

```bash
can not resolve 'fs'....
can not resolve 'path'...
```



解决方案:

`webpack.config.js`

```js
module.exports = {
    ...
    externals: {
      fs: 'fs'
    },
    fallback: {
        // 记得先 npm i path-browserify
        path: require.resolve("path-browserify"),
    }
}
```

