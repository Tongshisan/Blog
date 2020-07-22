# 数组的 reduce 方法

## 原理

reduce() 方法对数组中的每个元素执行一个提供的 reducer 函数, 将其结果汇总为单个返回值

```js
    const arr = [1, 2, 3, 4]
    console.log(arr.reduce((acc, current) => acc + current))    // 10
    console.log(arr.reduce((acc, current) => acc + current, 5)) // 15
```

reducer 函数接收四个参数
 + Accumulator (acc): 
    累计器, 累计器累计回调的返回值, 它是上一次调用回调时返回的累积值, 或 initialValue
 + Current Value (cur): 当前值, 数组正在处理的元素
 + Current Index (idx): 当前索引, 如果提供了 initialValue, 则起始索引为0, 否则为 1
 + Source Array (src): 源数组

initialValue
    作为第一次调用 callback 函数时的第一个参数值, 如果没有提供初始值, 则将使用数组中的第一个值, 在没有初始值的控数组上调用 reduce 会报错

你的 reducer 函数的返回值分配给累加器, 该返回值在数组的每个迭代中被记住, 并最后成为最终的单个结果值

## 实现

```js
    Array.prototype.reduce = function(arr, reduceCallback, initialValue) {
        // 检查参数合法性
        if(!Array.isArray(arr) || !arr.length || typeof reduceCallback !== 'function') return []

        // 判断是否传递初始值, 若有则 value 为 initialValue, 否则为 arr[0]
        let hasInitialValue = initialValue !== undefined
        let value = hasInitialValue ? initialValue : arr[0]

        // 若有 initialValue 则索引从0开始, 否则从 1 开始
        for(let i = hasInitialValue ? 0 : 1, len = arr.length; i < len; i++) {
            value = reduceCallback(value, arr[i], i, arr)
        }

        return value
    }

```