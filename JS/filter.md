# 数组的 filter 方法

## 原理

filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所以元素

```js
    const arr = [1, 2, 3, 4, 5]
    const res = arr.filter( item => item > 3 )
    console.log(res)  // [4, 5]
```

## 实现

```js
    Array.prototype.filter = function(arr, filterCallback) {
        // 检测参数是否正确
        if(!Array.isArray(arr) || !arr.length || typeof filterCallback !== 'function') return []

        // 因为 filter()  方法返回一个新数组, 所以每次创建一个新数组
        for(let i = 0, len = arr.length; i < len; i++) {
            if(filterCallback(arr[i], i, arr)) {
                res.push(arr[i])
            }
        }

        return res
    }
```