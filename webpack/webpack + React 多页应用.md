# webpack + React 多页应用



因业务需求, 需要用 webpack + React 做一个多页应用

1. 创建项目

   使用 `create-react-app` 创建项目

   ```bash
   npx create-react-app multip-pages
   ```

   创建完成后执行 

   ```bash
   cd multip-pages
   npm run eject
   ```

2. 改造项目

   修改 `config/paths.js` 抛出的 appIndexJs

   ```js
   module.exports = {
       dotenv: resolveApp('.env'),
       appPath: resolveApp('.'),
       appBuild: resolveApp(buildPath),
       appPublic: resolveApp('public'),
       appHtml: resolveApp('public/index.html'),
       // 修改这里
       appIndexJs: resolveModule(resolveApp, `src/${process.argv.slice(-1)[0]}/index`),
       appPackageJson: resolveApp('package.json'),
       appSrc: resolveApp('src'),
       appTsConfig: resolveApp('tsconfig.json'),
       appJsConfig: resolveApp('jsconfig.json'),
       yarnLockFile: resolveApp('yarn.lock'),
       testsSetup: resolveModule(resolveApp, 'src/setupTests'),
       proxySetup: resolveApp('src/setupProxy.js'),
       appNodeModules: resolveApp('node_modules'),
       swSrc: resolveModule(resolveApp, 'src/service-worker'),
       publicUrlOrPath,
       dirs
   };
   ```

3. 改造目录

   在 `src` 下创建文件夹, 每一个文件夹代表一个项目, 并且都有自己的 `index.js`

   目录结构:

   src/page1

   src/page2

4. 运行项目

   ```bash
   npm run start Page1
   npm run start Page2
   ```



*[参考链接](https://zhuanlan.zhihu.com/p/31908335)*

