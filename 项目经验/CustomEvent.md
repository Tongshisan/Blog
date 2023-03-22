# CustomEvent



起因: 最近项目在用新框架重构 (旧: React, 新: solid), 因为只重构了一部分, 导致现在项目有两套框架同时存在,

问题: 因为同时存在了两套路由系统, 现在整体路由是 `solid` 写的, 之前.`React` 针对路由改变的监听失效了

方案: 使用 `CustomEvent`



在 `solid` 切换路由时, 发送一个 `CusomEvent`

```tsx
const handleRouteChange = (route): void => {
  // ... 切换路由
  dispatchCustomEvent()
}

const dispatchCustomEvent = (route): void => {
  const event = new CustomEvent('routechange', {
      detail: {
        currentRoute: route
      }
    });
    document.body.dispatchEvent(event);
}
```



然后在 `React` 里进行监听:

custom-event

```ts
export const customEventWatcher = (event: string, handler: (e: any) => void): () => void => {
  document.body.addEventListener(event, handler);
  return (): void => {
    document.body.removeEventListener(event, handler);
  }
}

```



使用

```tsx
import customEventWatcher from '@/utils/custom-event';

const Index = () => {
  	
  useEffect(() => {
    	
    const handler = () => {}
    
  	const watcher = customEventWatcher('routechange', handler);
    
    return () => {
      watcher();
    }
	}, [])
  
  reutrn (
  	<div></div>
  )
}
```

