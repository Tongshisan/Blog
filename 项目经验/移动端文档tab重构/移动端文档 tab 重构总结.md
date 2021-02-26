# 移动端文档 tab 重构总结

## 项目配置

1. 多环境配置

   在项目根目录创建 `.env` 文件

   ```
   .env.rd
   .env.qa
   .env.gray
   .env.online
   ```

   .env.rd (变量必须以 `REACT_APP_` 开头)

   ```shell
   REACT_APP_FLAG = 'RD'
   ```

   安装 `dotenv`

   ```shell
   npm i dotenv-cli
   ```

   package.json

   ```json
   "script": {
     "start": "node scripts/start.js",
     "start:rd": "dotenv -e .env.rd node scripts/start.js",
     "start:qa": "dotenv -e .env.qa node scripts/start.js",
     "build": "node scripts/build.js",
     "build:rd": "dotenv -e .env.rd node scripts/build.js",
     "build:qa": "dotenv -e .env.qa node scripts/build.js",
     "build:online": "dotenv -e .env.online node scripts/build.js"
   }
   ```

2. 项目目录

   + api
   + assets
   + components
   + pages
   + router
   + store
   + utils
   + mock
   + constant

3. 



## 经验总结

1. 使用常量

2. 常量写进 `constant` 里

3. React class 组件函数使用箭头函数

   ```jsx
   componentDidMount(){
     
   }
   initPage = () => {
     this.setState({
       ...
     })
   }
   ```

   可以不用在 `constructor` 里给函数绑定 `this`

4. 不要在 `render()` 里操作 `localStorage`

5. 函数参数超过两个时使用对象

6. 变量命名使用驼峰

7. 请求参数为 下划线 时使用字符串

   ```jsx
   // bad
   {
     page: 1,
     page_size: 10
   }
   
   // good
   {
     'page': 1,
     'page_size': 10
   }
   ```

8. 图标使用 `<Icon>` 组件统一管理

9. `postcss-px-to-viewport` 插件可以将 `px` 转换为 `vw`





## ListView 使用经验

1. renderFooter

   根据状态来渲染一个 <Footer> 组件

   ```jsx
   const {listStatus} = this.indexStore;
   ...
   <ListView
     renderFooter={
       () => <Footer
           status={listStatus}
        />
     }
   >
   ```

   `Footer`

   ```jsx
   function Footer({status}) {
     switch (status) {
       case LIST_STATUS.NARMAL:
         return (
         	// 默认样式
         );
       case LIST_STATUS.LOADING:
         return (
         	// loading 样式
         );
       case LIST_STATUS.FINISH:
         return (
         	// 列表加载完样式
         );
       case LIST_STATUS.FAILED:
         return (
         	// 加载失败样式
         );
       default:
         return null;
     }
   }
   ```

2. pullToRefresh 下拉/上滑刷新

   可以自己渲染 下拉/上滑 时的样式

   ```jsx
   import {DeActivate, Activate, Finish, Release} from '@newPage/components/ListStatus';
   
   /**
    * @description: 列表下拉时各个状态的样式
    * @param {*}
    * @return {*}
    */
   renderIndicator = () => {
     return {
       activate: <Activate />,
       deactivate: <DeActivate />,
       release: <Release />,
       finish: <Finish />
     }
   }
   
   render() {
     return (
     	...
       <ListView
         ...
         pullToRefresh={
           <PullToRefresh
             ...
             indicator={this.renderIndicator()}
           />
         }
       />
     );
   }
   ```

3. 只更新某一条数据

   ```jsx
   import {observable, action, runInAction, makeObservable} from 'mobx';
   import api from '@newPage/api';
   import {ListView} from 'antd-mobile';
   
   export class testStore {
     
     constructor() {
       // mobx6 以上需要使用一下语法才会更新视图
       makeObservable(this);
     }
     @observable page = 1;
     @observable FileList = [];
   	@observable dataSource = new ListView.DataSource({
           rowHasChanged: (row1, row2) => row1 !== row2,
      });
     
   	@action
   	fetchFileList = async () => {
       const fetchFileListParams = {
         'page': this.page,
         'page_size': 10
       };
       try {
         const res = await api.fetchFileList(fetchFileListParams);
         // 部分代码
         if (this.page === 1) {
           this.FileList = res.files;
         } else {
           this.FileList = [...this.FileList, ...res.files];
         }
         this.dataSource = this.dataSource.cloneWithRows(this.FileList);
         
       } catch (error) {
         console.error(error);
       }
     }
   }
   
   setPage = (page) => {
     this.page = page;
   }
   
   /**
    * @description: 这里以文件的 添加/取消 星标和删除记录为例
    * @param {file} 要更新的文件
    * @param {type} 操作
    * @return {*}
    */
   @action
   updateList = (file, type) => {
     const oldFileList = [...this.FileList];
     let newFileList = [];
     const index = oldFileList.findIndex((item) => item.id === file.id);
     switch (type) {
       case 'addStar':
       case 'deleteStar':
         const newFile = Object.assign({}, file, {
           ...file,
           star: !file.star
         });
         newFileList = [..oldFileList.slice(0, index),
           						newFile,
                       ...oldFileList.slice(index+1)];
         this.FileList = newFileList;
       case 'removeFile':
         newFileList = [...oldFileList.slice(0, index), ...oldFileList.slice(index+1)];
       default:
         break;
     }
     this.dataSource = this.dataSource.cloneWithRows([newFileList]);
   }
   ```

   

## 爬坑经验

1. 页面使用了三个 `tab`,  每次切换到新的 `tab` 都会初始页面, 从第一页请求数据 ,在安卓上, 左右两个 `tab` 下滑一段距离, 再切换到中间 `tab` 时, 页面会按照设定的回到第一页初始位置, 但是在中间 `tab` 下滑一段距离, 再切到左右任一 `tab` 时, 页面会自己下滑到刚才中间 `tab` 的位置

   解决: 每次切换 `tab` 的时候, 手动设定滚动位置:

   ```js
   window.scrollTo(0, 0);
   ```

2. iphone5s  上页面白屏

   (项目没有配置 `babel.config.json`, 通过配置 `babel` 应该也可以解决)

   在 safari 上调试查看, 发现控制台报错

   ```js
   Object.ectries is not a function
   ```

   查看 mdn, `Object.entries` 在 ios 的 safari 上最低支持版本是 `10.3`, 而 iphone5s 的 safari 版本是 `10.1`,

   查看代码发现是 `mobx` 中使用了 `Object.ectries`

   解决方法:

   +  在 `utils` 下创建 `entries.polyfill.js`

     ```js
     if (!Object.entries) {
         Object.entries = function (obj) {
             var ownProps = Object.keys(obj);
             var  i = ownProps.length;
             var resArray = new Array(i); // preallocate the Array
             while (i--) {
                 resArray[i] = [ownProps[i], obj[ownProps[i]]];
             }
             return resArray;
         };
     }
     ```

   + 在 `index.js` 最开始引用 `entries.polyfill.js`

     ```js
     import '@pages/utils/entries.polyfill';
     import React from 'react';
     ...
     ```

3. 使用 `New Date()` 获取时间戳时, 在 `safari` 浏览器不显示

   ```js
   const time = +new Date('2020-12-12')
   ```

   原因: 在 `safari` 浏览器中要使用 `/` 作为连接符, 不能使用 `-`

   ```js
   const time = +new Date('2020/12/12')
   ```

   如果后端返回的是 `2020-12-12`, 可以使用一下方法:

   ```js
   const time = +new Date('2020-12-12'.replace(/-/g, '/'))
   ```

    
   
4. 在安卓上滚动条异常的问题

   因为重复利用了 FileList 组件用来展示文件夹和多级文件夹内容, 在超过一屏后, 点击进入新的文件夹会滚动到页面顶部再刷新, 影响用户体验,

   解决办法: 

   在点击文件夹时, 给 `body` 添加样式 :

   ```csss
   overflow: hidden
   ```

   来取消滚动条, 页面重新加载后再移除此样式