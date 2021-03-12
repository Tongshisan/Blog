# webpack5 升级之路



## 升级插件

```shell
npm install -g npm-check-updates
ncu -u
npm update
```



## 运行项目

你会发现错一个接着一个...



1. `webpack-manifest-plugin`

   ```js
   // 以前的引入方式
   const WebpackManifestPlugin = require('webpack-manifest-plugin');
   ..
   
   new WebpackManifestPlugin({
     ...
   })
   error: WebpackManifestPlugin is not a constructor
   
   // 更新之后
   const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
   ```

2. ```shell
   configuration.output has an unknown property 'jsonpFunction'
   ```

   解决: `output.jsonpFunction`  ==> `chunkLoadingGlobal`

3. ```shell
   configuration.output has an unknown property 'futureEmitAssets'
   ```

   ```
   output.futureEmitAssets option will be removed in webpack v5.0.0 and this behaviour will become the new default.
   webpack v5.0.0中的output.futureEmitAssets选项将被删除，此行为将成为新的默认设置。
   ```

   所以删除就好

4. ```shell
   which falls outside of the project src/ directory. Relative imports outside of src/ are not supported. You can either move it inside src/, or add a symlink to it from project's node_modules/.
   ```

   使用react-create-app构建的项目，当src文件夹下文件想引用src文件夹外文件因为官方限制问题会报以下错误。

   解决: 1. 直接 eject           2.将webpack.config.dev中ModuleScopePlugin命令注释掉即可

5. ```shell
   TypeError: message.split is not a function
       at formatMessage (/Users/v_lizhi07/Documents/baidu/so-doc/ecloud-doc-mobile/node_modules/react-dev-utils/formatWebpackMessages.js:18:23)
    
   ```

   :cry:

   Build.js

   ```js
   const rawMessages = stats.toJson({moduleTrace: false}, true);
   ```

   from:

   ```js
   const messages = formatWebpackMessages(rawMessages);
   ```

   To:

   ```js
   const messages = formatWebpackMessages({
      errors: rawMessages.errors.map((e) => e.message),
      warnings: rawMessages.warnings.map((e) => e.message),
    });
   ```

   

6. ```shell
   ValidationError: Invalid options object. PostCSS Loader has been initialized using an options object that does not match the API schema.
    - options has an unknown property 'plugins'. These properties are valid:
      object { postcssOptions?, execute?, sourceMap?, implementation? }
   ```

   解决: 

   Webpack.config.js

   From: 

   ```js
   loader: 'postcss-loader',
                           options: {
                                plugins: []
                           }
   ```

   To:

   ```js
   loader: 'postcss-loader',
                           options: {
                               postcssOptions: {
                                   plugins: []
                               }
                           }
   ```

7. ```
   Loading PostCSS "postcss-import" plugin failed: Cannot find module 'postcss-import'
   Loading PostCSS "postcss-url" plugin failed: Cannot find module 'postcss-url'
   ```

   最终固定在 :

   ```json
   {
     "postcss": "^8.1.9",
     "posrcss-import": "12.0.1"
   }
   ```

8. ```shell
   Error: Cannot load preset "advanced". Please check your configuration for errors and try again.
   ```

   解决:

   ```shell
   npm i --save-dev cssnano-preset-advanced
   ```

9. ```shell
   Please check your GenerateSW plugin configuration:
   navigateFallbackBlacklist has been renamed navigateFallbackDenylist.
   ```

   解决办法就在 第二行

10. ```shell
    Please check your GenerateSW plugin configuration:
    "importWorkboxFrom" is not allowed
    ```

11. 