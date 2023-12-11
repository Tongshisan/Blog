# webpack to vite



+ vite-plugin-html





+  `[less] Inline JavaScript is not enabled. Is it set in your options?`

  > 



####  [less] Inline JavaScript is not enabled. Is it set in your options?

解决: 在 `vite.config.ts` 里添加 

```ts
{
  ...
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }
    }
  },
}
```





![image-20230329171010973](/Users/lizhi1/Library/Application Support/typora-user-images/image-20230329171010973.png)





#### 类型“ImportMeta”上不存在属性“env”。

```tscondig.json
{
	compilerOptions: {
		"types": ["vite/client"]
	}
}
```



![image-20230329190327107](/Users/lizhi1/Library/Application Support/typora-user-images/image-20230329190327107.png)









### `scssmodule` 解决插件 `https://github.com/jsonz1993/vite-plugin-load-css-module/blob/master/src/index.ts` 





`vite-plugin-style-import` : antd 按需加载 [传送门](https://github.com/vbenjs/vite-plugin-style-import/tree/main#readme)



#### 打补丁大法: [打补丁](https://juejin.cn/post/6962554654643191815)





**二级路由下刷新页面, 资源路径不对**

+ 原 路径 `localhost:5173/chart/12345`, 正常跳转没问题, 在这个页面刷新请求资源的路径变成了`localhost:5173/chart/src/pages/chart/12345`















```sh
npm i patch-package --save-dev
npx patch-package antd
{
    "postinstall":"patch-package"
}

```



















### 涉及改代码的地方

1. `screener` : noDataImg 引用方式由 require 改为 import
2. `optionalSymbolCard`: `styles.infoTopName` 改为 `styles['infoTop-name']` 
3. `monaco-editor`









```js
import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html';
import vitePluginRequire from "vite-plugin-require";
import loadCssModulePlugin from 'vite-plugin-load-css-module';
import { createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';
import requireSupport from 'vite-plugin-require-support';


import {
  scssModulePlugin,
  scssInlinePlugin,
  scssModuleTsxPlugin,
  processEnvPlugin,
  requireComponent,
  rewriteSlashToIndexHtml,
  camelCaseToKebabCasePlugin
} from '../vite-plugins';

const root = path.resolve(__dirname, '../');
const localModules = path.resolve(root, 'local-modules');
const chartRoot = path.resolve(localModules, 'landbridge-chart');

// const pageName = process.argv.slice(-1)[0];
const pageName = 'screener';


export default defineConfig(({ command, mode, ssrBuild, ...args }) => {
  // console.error('defineConfig', command, mode, ssrBuild, args);
  const env = loadEnv(mode, process.cwd(), '');
  // console.log('env', env);
  return {
    plugins: [
      camelCaseToKebabCasePlugin(),
      {
        ...rewriteSlashToIndexHtml(),
        enforce: 'post'
      },
      {
        ...requireComponent(),
        enforce: 'pre'
      },
      // {
      //   ...scssModulePlugin(),
      //   enforce: 'pre'
      // },
      // scssModuleTsxPlugin(),
      loadCssModulePlugin({
        include: (id) => id.endsWith('scss') && !id.includes('node_modules')
      }),
      processEnvPlugin(),
      react({
        babel: {
          // babelrc: true,
          // plugins: ["@babel/plugin-"]
          parserOpts: {
            plugins: ['decorators-legacy']
          }
        },
      }),
      // {
      //   ...scssModuleTsxPlugin(),
      //   enforce: 'post'
      // },
      // viteCssModule(),
      createHtmlPlugin({
        //   // spa
        minify: true,
        entry: `src/pages/${pageName}/index.tsx`,
        // entry: 'src/pages/chart/index.tsx',
        template: 'public/index.html'

        //   // Multi-page
        // minify: true,
        // pages: [
        //   {
        //     entry: 'src/pages/chart/index.tsx',
        //     filename: 'index.html',
        //     template: 'public/index.html',
        //     injectOptions: {
        //       data: {
        //         title: '',
        //         injectScript: `<script src="./inject.js"></script>`,
        //       },
        //       tags: [
        //         {
        //           injectTo: 'body-prepend',
        //           tag: 'div',
        //           attrs: {
        //             id: 'tag1'
        //           }
        //         }
        //       ]
        //     }
        //   },
        //   {
        //     entry: 'src/pages/remind/index.tsx',
        //     filename: 'remind.html',
        //     template: 'public/index.html',
        //     injectOptions: {
        //       data: {
        //         title: '',
        //         injectScript: `<script src="./inject.js"></script>`,
        //       },
        //       tags: [
        //         {
        //           injectTo: 'body-prepend',
        //           tag: 'div',
        //           attrs: {
        //             id: 'tag2'
        //           }
        //         }
        //       ]
        //     }
        //   },
        //   {
        //     entry: 'src/pages/screener/index.tsx',
        //     filename: 'screener.html',
        //     template: 'public/index.html',
        //     injectOptions: {
        //       data: {
        //         title: '',
        //         injectScript: `<script src="./inject.js"></script>`,
        //       },
        //       tags: [
        //         {
        //           injectTo: 'body-prepend',
        //           tag: 'div',
        //           attrs: {
        //             id: 'tag3'
        //           }
        //         }
        //       ]
        //     }
        //   },
        //   {
        //     entry: 'src/pages/home/index.tsx',
        //     filename: 'home.html',
        //     template: 'public/index.html',
        //     injectOptions: {
        //       data: {
        //         title: '',
        //         injectScript: `<script src="./inject.js"></script>`,
        //       },
        //       tags: [
        //         {
        //           injectTo: 'body-prepend',
        //           tag: 'div',
        //           attrs: {
        //             id: 'tag4'
        //           }
        //         }
        //       ]
        //     }
        //   },
        //   {
        //     entry: 'src/pages/download/index.tsx',
        //     filename: 'download.html',
        //     template: 'public/index.html',
        //     injectOptions: {
        //       data: {
        //         title: '',
        //         injectScript: `<script src="./inject.js"></script>`,
        //       },
        //       tags: [
        //         {
        //           injectTo: 'body-prepend',
        //           tag: 'div',
        //           attrs: {
        //             id: 'tag5'
        //           }
        //         }
        //       ]
        //     }
        //   },
        //   {
        //     entry: 'src/pages/price/index.tsx',
        //     filename: 'price.html',
        //     template: 'public/index.html',
        //     injectOptions: {
        //       data: {
        //         title: '',
        //         injectScript: `<script src="./inject.js"></script>`,
        //       },
        //       tags: [
        //         {
        //           injectTo: 'body-prepend',
        //           tag: 'div',
        //           attrs: {
        //             id: 'tag6'
        //           }
        //         }
        //       ]
        //     }
        //   },
        // ]
      }),
      vitePluginRequire({
        fileRegex: /(.jsx?|.tsx?|.vue)$/,
        log: (...args) => {
          console.log('args', args)
        }
      }),
      createStyleImportPlugin({
        resolves: [AntdResolve()]
      }),
      monacoEditorPlugin({
        languageWorkers: ['editorWorkerService', 'css', 'html', 'json', 'typescript']
      }),
      // requireSupport({
      //   filters: /.tsx$|.ts$/
      // })
      // requireSupport()
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        }
      },
      modules: {
      }
    },
    server: {

    },
    publicDir: 'public',
    appType: 'spa',
    assetsInclude: ['**/*.mov'],
    resolve: {
      alias: {
        '@web': path.resolve(__dirname, '../src'),
        '@imgs': path.resolve(__dirname, '../src/assets/imgs'),
        '@chart': path.resolve(chartRoot, 'src'),
      }
    },
  }
})

```













+ 时间组件滚动问题
+ 多条件 title 问题
+ 画图设置恢复默认问题
+ 
