# React 组件持久化



背景: 有两个页面, 每次切换路由时页面都会重新请求数据, 不符合预期

原因: React 在切换组件时, 会经历一个完整的组件销毁过程, 后一个组件会经历完整的组件加载流程

例子:

```tsx
import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import KeepAlive from 'react-activation';
import { Provider } from "mobx-react";
import rootStore from "./stores";

import Page1 from '@/pages/page1';
import Page2 from '@/pages/page2';

function App() {
  return (
    <Provider>
      <Router>
      	<Switch>
          <Route path="/" exact component={Page1} />
          <Route path="/page1" exact component={Page1} />
          <Route path="/page2" exact component={Page2} />
        </Switch>
      </Router>
    </Provider>
  )
}
```

当切换路由时, 都会重触发旧组件的卸载, 新组件的加载过程, 每次都会重新请求页面数据

**解决:**



**方案一**

手动保存组件状态

使用 sessionStorage 在组件 willMount 时保存组件状态(包括数据和位置), didMount 时恢复保存的数据



**方案二**

使用 `react-activation` 插件

[react-activation](https://github.com/CJY0208/react-activation/blob/master/README_CN.md)





最终代码

```tsx
import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import KeepAlive from 'react-activation';
import { Provider } from "mobx-react";
import rootStore from "./stores";

import Page1 from '@/pages/page1';
import Page2 from '@/pages/page2';

const KeepAlivePage1 = () => (
  <KeepAlive>
  	<Page1 />
  </KeepAlive>
);

const KeepAlivePage2 = () => (
  <KeepAlive>
  	<Page2 />
  </KeepAlive>
);

function App() {
  return (
    <Provider>
      <Router>
      	<Switch>
          <Route path="/" exact component={KeepAlivePage1} />
          <Route path="/page1" exact component={KeepAlivePage1} />
          <Route path="/page2" exact component={KeepAlivePage2} />
        </Switch>
      </Router>
    </Provider>
  )
}
```

这样在组件间切换时不会触发组件的额外的生命周期