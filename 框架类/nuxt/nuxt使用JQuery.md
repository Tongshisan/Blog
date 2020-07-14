# nust 使用JQuery

## 安装

```
npm install JQuery --save
```

## 配置 nuxt.config.js

```js
const webpack = require('webpack')
module.exports = {
    build: {
        plugins: [
            new webpack.ProvidePlugin({
                '$': 'jquery'
            })
        ]
    },
    plugins: []
}
```

