# css module 下 重写 antd 样式



新建 `reset-antd.css`

```css
/*
 * @Author: lizhi
 * @Date: 2021-06-02 14:28:30
 * @LastEditTime: 2021-06-02 14:30:49
 * @LastEditors: Please set LastEditors
 * @Description: 用于重写 antd 样式
 * @FilePath: /src/styles/antd/reset-antd.scss
 */

:global(.ant-input-group-addon) {
    background-color: rgba($color: #fff, $alpha: .005);
    border: none;
    border-radius: 4px;
}

:global(.ant-select) {
    color: #fff;
}

:global(.ant-select-arrow) {
    color: #fff;
}

:global(.ant-input) {
    color: #fff;
}
```

 然后引进就行

```js
import '@/styles/antd/reset-antd.css'
```

