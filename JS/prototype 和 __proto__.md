# prototype 和 __proto__

## __proto__ 

对象的隐式原型, 每个对象都有一个 __proto__, 指向创建该对象的函数的 prototype

## prototype 

每个函数都有一个 prototype , 即原型

## 举个栗子

```js
    function A(name) {
        this.name = name
    }

    let a = new A('张三')

    a.__proto__ === A.prototype
```



![原型链](https://raw.githubusercontent.com/Tongshisan/Blog/master/img/%E5%8E%9F%E5%9E%8B%E9%93%BE.png)