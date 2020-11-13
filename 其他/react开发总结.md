# React 开发规范总结



## 组件的 `props` 和 `state` 

组件的 `props` 和 `state` 要有具体的类型, 不能使用 `any`

```tsx
interface IIndexProps {
  
}

interface IIndexState {
  
}

class Index extends React.Component<IIndexProps, IIndexState> {
  constructor(props: IIndexProps) {
    super(props)
  }
}
```





## React 渲染函数

使用函数渲染某个列表 or 组件时, 推荐使用 "React" 渲染方法: renderXXX(), 并且将返回的 `html` 放入 `()` 中, 另外把包裹的 `<div>` 也放到函数里

```tsx
renderTable(): React.ReactNode {
  return (
    <div className="test-table">
    </div>
  )
}
```



## 点击事件一般使用 `handleXXX`

点击事件一般使用 `handle` 为前缀

例如点击刷新列表函数:

```tsx
handleUpdateList() {
  
}
```



## 异步函数获取数据时

函数命名使用: `fetchXXX`,  尽量使用 `async` `await`

```tsx
import {IFetchTableDataParams, IFetchTableDataRes} from './define'
import {fetchTableData} from '@test/api/index'

async fetchTableData(params: IFetchTableDataParams) {
  const res: IFetchTableDataRes = await fetchTableData(params)
}
```



## 变量命名

+ boolean 类型: 使用 `isXXX` 开头

  ```tsx
  const isShow: boolean = false;
  ```

+ 对于值不变的变量 (常量), 使用 `const` , `object` 类型统一使用 `const`

  ```tsx
  interface ITest {
    
  }
  
  // bad
  var isShow: boolean = false
  let str: string = 'test'
  let obj: ITest = {}
  
  // good
  const isShow: boolean = false
  const str: string = 'test'
  const obj: ITest = {}
  ```

  

## 功能型函数 or 变量

对于功能型函数 or 变量, 统一抽取 `Utils`

```tsx
// bad
const userAgent = window.navigator.userAgent;
const platfrom: string = /macintosh|mac os x/gi.test(userAgent) ? 'mac' : 'win'

// good
import {getPlatfrom} from '@test/utils/index'
const platfrom: string = getPlatfrom()
```

utils/index.ts

```ts
export const getPlatfrom = () => {
  const userAgent = window.navigator.userAgent;
  return /macintosh|mac os x/gi.test(userAgent) ? 'mac' : 'win'
}
```

