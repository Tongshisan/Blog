# 手动实现 new 

## new 的原理
 + 创建一个新对象
 + 这个新对象会被执行 原型 链接
 + 属性和方法被加入到 this 引用的对象中, 并执行了构造函数中的方法
 + 如果函数没有返回其他函数, 那么 this 指向这个新对象, 否则 this 指向构造函数中返回的对象

```js
    function objectFactor() {
        let obj = {}
        Construct = [].shift.call(arguments)
        obj.__proto__ = Construct.prototype

        let res = Construct.apply(obj, arguments)

        return typeOf res === 'object' ? res : obj
    }
```

使用

```js
    function Person(name, age) {
        this.age = age
        return {
            name: name
        }
    }

    let p1 = new Person('张三', 18)
    let p2 = objectFactor(Person, '李四', 18)
```