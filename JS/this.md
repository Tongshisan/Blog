# this

在函数中 this 的取值是函数真正被调用的时候决定的, 函数定义的时候确定不了


## 如何准确判断 this 的指向

 + 函数是否在 new 中调用, 如果是, 那么 this 指向新创建的对象
 + 函数是否通过 call / apply 调用, 或者使用 bind(即硬绑定), 如果是, this 指向指定的对象
 + 函数是否在某个上下文对象中调用(隐式绑定), 如果是, this 指向 那个上下文对象. 一般是 obj.foo()
 + 如果以上都不是, 那么使用默认绑定, 严格模式指向 undefined, 非严格模式指向 window
 + 如果把 null / undefined 作为 this 的绑定对象传入  call / apply / bind, 这些值会被忽略, 实际应用的是默认绑定规则
 + 箭头函数的 this 继承于外层代码块的 this 


---

## this 的绑定规则
    + 默认绑定
    + 隐式绑定
    + 硬绑定
    + new 绑定

## this 绑定规则优先级
    
    **new 绑定 > 显示绑定 > 隐式绑定 > 默认绑定**

## 构造函数

如果函数作为构造函数使用, 指向它即将 new 出来的对象

```js
    function Foo(name, age) {
        this.name = name
        this.age = age
    }

    let f = new Foo('张三', 22)
    console.log(f.name)      //  张三
    console.log(f.age)           // 22
```

## 函数作为对象的一个属性

如果函数作为对象的一个属性, 并且作为这个对象的属性被调用时, 函数的 this 指向该对象

```js
    let obj = {
        x: 10,
        fn: function() {
            console.log(this)                // Object {x: 10, fn: function}
            console.log(this.x)            // 10
        }
    }
    obj.fn()
```

如果 fn 不作为对象的属性被调用, 那么谁调用指向谁

```js
    let obj = {
        x: 10,
        fn: function() {
            console.log(this)                // Window
            console.log(this.x)             // undefined
        }
    }
    let f = obj.fn
    f()
```

## 函数用 call 或 apply 调用

当一个函数被 call 或 apply 调用时, this 的值取决于传入的对象的值

```js
    let obj = {
        x: 10
    }
    let o = {
        x: 100
    }
    let fn = function() {
        console.log(this)
        console.log(this.x)
    }

    fn.call(obj)              //  Object {x: 10}            10
    fn.call(o)        //          Object {x: 100}            100
```

## 全局 & 普通函数

在全局环境下和调用普通函数时, this 永远指向 Window

```js
    // 全局环境
    console.log(this === window)          // true
    
    // 普通函数
    var x = 10
    let fn = function() {
        console.log(this)          // window
        console.log(this.x)         // 10
    }
    fn()
```
以上代码, 如果声明 x 时使用 let, 那么调用 fn 时,  this.x 将会打印 undefined， 因为 let 声明的变量不会挂载到 window 上

需特别注意以下代码

```js
    let obj = {
        x: 10,
        fn: function() {
            function f() {
                console.log(this)           // window
                console.log(this.x)         // undefined
            }
            f()
        }
    }

    obj.fn()
```
函数 f 虽然是在 obj.fn 内部调用的, 但是他仍然是一个普通函数, this 仍然指向 window

## 构造函数的 prototype

不仅仅在构造函数的 prototype 中, 即便在整个原型链中, this 代表的也是当前对象的值

```js
    function Fn() {
        this.name = '张三'
        this.age = 22
    }

    Fn.prototype.getName = function() {
        console.log(this.name)
    }

    let f = new Fn()
    f.getName()             // 张三
```

## setTimeout 和 setInterval 的 this

setTimeout 和 setInterval 的 this 使用默认绑定, 严格模式指向 undefined, 非严格模式指向 window

```js
    setTimeout(() => {
        console.log(this)              // Window
    })
```

## 箭头函数的this

箭头函数中没有 this 的绑定, 必须通过查找作用域链来决定其值, 如果箭头函数被非箭头函数包裹, 则箭头函数的 this 指向最近非箭头函数的 this, 否则 this 为 undefined

**箭头函数没有自己的 this , 箭头函数中的 this 继承于外层代码库中的 this**

```js
    function fn() {
        return () => {
            console.log(this.a)
        }
    }

    let obj1  ={
        a: 2
    }
    let obj2 = {
        a: 3
    }
    
    let bar = fn.call(obj1)
    bar.call(obj2)     //  2

    // fn 内部创建的箭头函数会捕获调用时 fn 的 this, 由于 fn 的 this 绑定到 obj1, bar 的 this 也会绑定到 obj1, 箭头函数的绑定无法被修改

```