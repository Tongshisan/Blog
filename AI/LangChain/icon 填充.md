# icon 填充



### 获取 icons 源

因为两次使用灵感组件的间隔内可能会调整团队库(开启的团队库), 或者调整团队库内组件， 所以现在每次选择灵感组件进行 icon 填充时都会重新获取 icons

+ 获取开启的团队库
+ 获取开启的团队库的组件列表（异步）

![](/Users/lizhi/Library/Application Support/typora-user-images/image-20240606160955754.png)

*同一次填充中不会重新获取*





### 包含规则

![image-20240606161209387](/Users/lizhi/Library/Application Support/typora-user-images/image-20240606161209387.png)





### 预置 icons 

需要调接口获取？

w





```ts
const mg = {
  // 创建容器，返回容器 id
  createFrame: (): string => {},
  // 创建矩形，返回创建的矩形的 id
  createRect: (): string => {},
  // 根据图层 id 设置颜色
  setColor: (id: string, color: string) => {},
  // 向父容器内添加子图层
  append: (parentId: string, childIds: string[])
}
```

