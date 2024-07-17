
# vue3-createApp

```ts
import { createApp, reactive } from 'vue';
import MyComponent from './MyComponent.vue';

// 创建一个响应式对象来存储 props 数据
const propsData = reactive({
  myProp: 'initial value'
});

// 创建应用实例并传递 props 数据
const app = createApp(MyComponent, propsData);

// 挂载组件实例
const vm = app.mount(document.createElement('div'));
document.body.appendChild(vm.$el);

// 更新 props 数据
setTimeout(() => {
  propsData.myProp = 'updated value';
}, 2000);

```
