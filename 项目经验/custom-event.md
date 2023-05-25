# custom-event

[CustomEvent MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent/CustomEvent)

## 情景

项目使用 `React` 开发, 最近使用 `Solidjs` 渐进式重构项目.

因为先重构了路由部分, 导致切换路由时, `React` 代码监听不到路由改变, 在路由变化时做的一系列操作也失效了



## 问题

本来在 `React` 代码中监听了路由改变, 改变时做一些操作, 现在整体路由系统是 `solid` , `React` 中监听不到



## 方案

在 `solidjs` 代码中切换路由的时候, 发一个 `customEvent `事件, 然后在 `react` 代码中监听这个事件;



*发出事件*

```ts
const dispatchCustomEvent = (route: string): void => {
  const event = new CustomEvent('routechange', {
    detail: {
      currentRoute: route
    }
  });
  document.body.dispatchEvent(event);
}
```



*监听事件*

*custom-event.ts*

```ts
export const customEventWatcher = (event: string, handler: (e: any) => void): () => void => {
  document.body.addEventListener(event, handler);
  return (): void => {
    document.body.removeEventListener(event, handler);
  }
}

```

*demo.tsx*

```tsx
import { customEventWatcher } from '@/utils/custom-event';

const Demo = () => {
  const routeChangeWatcher = customEventWatcher('routechange', handleRouteChange)
  const handleRouteChange = (e: CustomEvent) => {
    // todo
  }
}
```




## 完善

```ts
const dispatchCustomEvent = ({ event, data, dom = document.body }) => {
  const customEvent = new CustomEvent(event, {
    detail: data,
  });
  dom.dispatchEvent(customEvent);
};
```



