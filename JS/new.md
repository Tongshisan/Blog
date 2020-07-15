# 手动实现 new 

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