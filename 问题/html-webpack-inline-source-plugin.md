# html-webpack-inline-source-plugin



需求: 打包时将 `css` 和 `js` 直接打进 `index.html` 中



## `create-react-app`

插件: `react-app-rewire-inline-source-plugin`





## `create-react-app`  (执行 npm run eject)

插件: `html-webpack-inline-source-plugin`



步骤 :

1. ```shell
   npm i html-webpack-inline-source-plugin html-webpack-plugin --save-dev
   ```

2. webpack.config.js

   ```js
   ...
   const HtmlWebpackPlugin = require('html-webpack-plugin');
   const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
   
   module.exports = function (webpackEnv) {
     ...
     return {
       ...
       plugins: [
         new HtmlWebpackPLugin({
           inlineSource: '.(js|css)$'
         }),
         new HtmlWebpackInlineSourcePlugin()
       ]
     }
   }
   ```

3. 报错.........

   ```shell
   Cannot read property 'getHooks' of undefined
   ```

   原因: `html-webpack-plugin ` 版本过低, 

   解决:  `npm i --save html-webpack-plugin@next`

4. 报错.......

5. ```shell
   Cannot read property 'tap' of undefined
   ```

   原因: 包安装重复了

   解决: // todo





## 最终解决方案

1. 只适用于 CRA 创建的项目

```shell
npm i --save-dev html-inline-css-webpack-plugin
```

webpack.config.js

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const HtmlInlineCssWebpackPlugin = require('html-inline-css-webpack-plugin').default;

module.exports = {
  ...
  plugins: [
    new HtmlWebpackPlugin(),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime~.+[.]js/]),
    new HtmlInlineCssWebpackPlugin()
  ],
  ...
}
```

*[友情链接](https://webpack.eleven.net.cn/content/inline.html)*

