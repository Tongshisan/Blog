# indexedDB

indexedDB 是一种可以让你在用户的浏览器内持久化存储数据的方法, indexedDB 为生成 web Application 提供了丰富的查询能力, 使应用在线离线都能正常工作

>  `indexedDB` 是一个事务型数据库系统, 类似于 SQL 的 RDBMS, 然而不像 RDBMS 使用固定列表
>
> `indexedDB` 是一个基于 js 的面相对象数据库, `indexedDB` 允许您存储和检索用<strong>键</strong> 索引的对象, 你只需要指定数据库模式, 打开与数据库的连接m 然后检索和更新一系列<strong>事务</strong>



## 打开数据库

```js
const request = window.indexedDB.open('myDatabase');
```

打开数据库就像任何其他操作一样, 必须进行 `request`

open 请求不回立即打开数据库或开始一个事务, 对 `open()` 函数的调用会反回一个我们可以作为事件来处理的包含 result (成功的话) 或者错误的 `IDBOpenDBrequest` 对象， open 函数的结果是一个 `IDBDatabase` 对象的实例;

Open 方法接受第二个参数, 就是数据库的版本号, 数据库的版本决定了数据库架构, 即数据库的对象仓库  (object store) 和他的结构,

+  如果数据库不存在, `open` 操作回创建该数据库, 然后 `onupgradeneeded` 事件被触发, 你需要在该事件的处理函数中创建数据库模式
+ 如果数据库已存在, 但你指定了一个更高的数据库版本, 会直接触发 `onupgradeneeded` 事件, 允许你在处理函数中更新数据库模式

```js
request.onsuccess = (event) => {};
request.onerror = (event) => {};
result.onupgradeneeded = (event) => {};
```



## 增加数据

## 读取数据

## 删除数据

## 删除数据库

```js
const delReq = window.indexedDB.deleteDatabase('maDatabase');
```

处理函数

```js
delReq.onsuccess = (event) => {};
delReq.onerror = (event) => {};
delReq.onblock = (event) => {};
```

删除数据库的时候, 如果数据库没有断开链接会触发以下机制:

1. 数据库本身 的 `versionchange` 事件
2. `delReq` 的 block 事件

解决办法: 打开数据库成功的时候, 添加 `versionchange` 监听函数, 主动断开连接;

```js
const openReq = window.indexedDB.open('myDatabase');
openReq.onsuccess = () => {
  const db = openReq.result;
  db.onversionchange = (e) => {
  db.close();
	}
};

```







## 实践

项目中有重置应用的功能, 需要清除所有的 