# localStorage 存储对象后, 取出来的值却是 string



今天在使用 localStorage 的时候, 遇到一点问题

将一个对象存储到 `localStorage` 后, 拿出来却成了 `string` 类型

```js
let obj = {
  name: '张三',
  age: 23
}

localStorage.setItem('person', obj)

let p = localStorage.getItem('person')
console.log(p)		// "[object, object]"
typeof p	// string
```

 

**解决方法**

存储对象的时候使用 `JSON.Stringify()`, 取值时再使用 `JSON.parse()` 序列化



```js
let obj = {
  name: '张三',
  age: 22
}

localStorage.setItem('person', JSON.stringify(obj))

// 使用 JSON.parse() 时要判空, 否则 JSON.parse() 会挂
let p = JSON.parse(localStorage.getItem('person') || '{}')

typeof p 		// object
```

