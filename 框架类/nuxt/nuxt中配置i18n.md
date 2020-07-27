# nuxt 框架中配置使用 i18n

## 添加 locales 文件夹

在 locales 文件夹中添加 index. js, zh-CN. json. en-US. json

index. js

``` js
    export default () => {
        return ['zh-CN', 'en-US']
    }
```

## 在 middleware 文件夹中创建 i18n. js

``` js
    export default function({
        isHMR,
        app,
        store,
        route,
        params,
        error,
        redirect
    }) {
        const defaultLocale = app.i18n.fallbackLocale
        // If middleware is called from hot module replacement, ignore it
        if (isHMR) return
        // Get locale from params
        const locale = params.lang || defaultLocale
        if (store.state.locales.indexOf(locale) === -1) {
            return error({
                message: 'This page could not be found.',
                statusCode: 404
            })
        }
        // Set locale
        store.commit('SET_LANG', store.state.locale)
        app.i18n.locale = store.state.locale
        // If route is /<defaultLocale>/... -> redirect to /...
        if (locale === defaultLocale && route.fullPath.indexOf('/' + defaultLocale) === 0) {
            const toReplace = '^/' + defaultLocale + (route.fullPath.indexOf('/' + defaultLocale + '/') === 0 ? '/' : '')
            const re = new RegExp(toReplace)
            return redirect(
                route.fullPath.replace(re, '/')
            )
        }
    }
```

## 在 plugins 文件夹中创建 i18n. js

``` js
    import Vue from 'vue'
    import VueI18n from 'vue-i18n'

    Vue.use(VueI18n)

    export default ({
        app,
        store
    }) => {
        let data = {}
        let Locale = store.state.locales
        for (let i = 0; i < Locale.length; i++) {
            data[Locale[i]] = require( `~/locales/${Locale[i]}.json` )
        }
        // Set i18n instance on app
        // This way we can use it in middleware and pages asyncData/fetch
        app.i18n = new VueI18n({
            locale: store.state.locale,
            fallbackLocale: 'en-US',
            messages: data
        })
        // 自定义页面跳转方法
        app.i18n.path = (link) => {
            return `/${app.i18n.locale}/${link}` 
        }
    }
```

## 配置 nuxt.config.js

```js
    plugins: [
        '~/plugins/i18n.js'
    ],
    ...
    router: {
        middleware: 'i18n'
    }
```