# webpack-dev-server 报错



报错信息

```shell
Cannot find module 'webpack-cli/bin/config-yargs'
```



报错原因

`webpack-cli` 版本 4, 删除了 `webpack-cli/config-yargs` 文件导致



解决方案

1. 卸载 `webpack-cli`

   ```shel
   npm uninstall webpack-cli
   ```

2. 安装 `webpack-cli` 版本 3

   ```shell
   npm install webpack-cli@3.3
   ```

   

