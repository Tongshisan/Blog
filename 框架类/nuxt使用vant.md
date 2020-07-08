# nuxt 中使用 vant

## 安装插件

```
npm install babel-plugin-import less less-loader
```

## 在 plugins 目录下创建 vant.js

```js
import Vue from 'vue'
import {Popup, Toast} from 'vant'

Vue.use(Popup)
Vue.use(Toast)
```

## 配置 nuxt.config.js

```js
plugins: [
    {src: '~/plugins/vant', ssr: true}
    ...
]
// 使用 less
build: {
    transpile: [/vant.*?less/]
    babel: {
        plugins: [
            ['import', {
                libraryName: 'vant',
                style: (name) => {
                    return `${name}/style/less.js`
                }
            }, 'vant']
        ],
    },
}
// 使用css
build: {
    babel: {
        plugins: [
            ['import', {
                libraryName: 'vant',
                style: (name) => {
                    return `${name}/index.css`
                }
            }, 'vant']
        ],
    },
}

```