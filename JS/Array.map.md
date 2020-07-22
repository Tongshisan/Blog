# 数组的 map 方法

## 原理
map() 方法创建一个新数组, 其结果是该数组中的每个元素调用一次提供的函数的返回值

```js
    const arr = [1, 2, 3]
    const res = arr.map( item => item * 2)
    console.log(res)   // [2, 4, 6]
```

## 实现

```js
    Array.prototype.map = function(arr, mapCallback) {
        // 检测参数是否正确
        if(!Array.isArray(arr) || !arr.length || typeof mapCallback !== 'function') return []

        // map 方法不会改变原数组, 所以每次创建一个新数组
        let res = []
        for(let i = 0, len = arr.length; i < len; i++) {
            res.push(mapCallback(arr[i], i, arr))
        }

        return res
    }
```