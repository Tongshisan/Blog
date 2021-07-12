# React 中 防抖节流的使用

起因: 在某次项目中做了一个表格展示数据, 表头某个字段有个输入框可过滤数据, 产品说要一边输入一边请求, 所以考虑加个防抖优化

防抖函数

```ts
const debounce = (func: Function, delay: number): Function => {
	let timer: any;
	
	return (...args: any[]) => {
		if (!!timer) {
			clearTimerout(timer)
		}
		timer = setTimerout(() => {
			func.apply(this, args);
		}, delay);
	}
}

```

**错误使用方法**  

```tsx
import * as React from 'react';
import { debounce } from '@utils';
import { fetchTableData } from '@apis';

handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  fetchTableData();
}

return (
	<input 
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => debounce(handleInputChange, 500)}  
  />
)
```

*原因*:  输入框每次变化都会产生一个新的防抖函数,

在 `debounce` 函数里打印 `timer`

```ts
const debounce = (func: Function, delay: number): Function => {
	let timer: any;
	
	return (...args: any[]) => {
		if (!!timer) {
			clearTimerout(timer)
		}
    console.log('timer', timer);
		timer = setTimerout(() => {
			func.apply(this, args);
		}, delay);
	}
}

```

这里每次打印的都是 `undefined`, 所以达不到防抖的效果



**正确姿势**

```tsx
import * as React from 'react';
import { debounce } from '@utils';
import { fetchTableData } from '@apis';

handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  fetchTableData();
}

handleInputChangeDebounce = debounce(handleInputChange, 500)

return (
	<input 
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChangeDebounce(e)}  
  />
)
```

这里需要把防抖后的函数提前声明好, 在输入框的 `onChange` 事件里直接使用防抖后的函数, 而不是使用时才防抖
