# Promise

1. new Promise\(\) 时, 需要传递一个 executor 执行器, 执行器立刻执行
2. executor 接收两个参数, resolve 和 reject
3. promise 只能从 pending 到 fulfilled, 或从 pending 到 rejected
4. promise 的状态一旦确定就不会改变
5. promise 都有 then 方法, 接收两个参数, 分别是 promise 成功的回调 onFulfilled 和 promise 失败的回调 onRejected
6. 如果调用 then 时, promise 已经成功, 则执行 onFulfilled, 并将 promise 的值作为参数传递进去, 如果 promise 失败, 那么执行 onRejected, 并将 promise 失败的原因作为参数传递进去, 如果 promise 的状态是 pending, 需要将 onFulfilled 和 onRejected 函数存起来, 等待状态确定后, 再依次将对应的函数执行 \(发布订阅\)
7. then 的参数 onFulfilled 和 onRejected 可以缺省
8. promise 可以 then 多次, promise 的 then 方法返回一个 promise
9. 如果 then 返回的是一个结果, 那么就会把这个结果作为参数, 传递给下一个 then 的成功的回调\(onFulfilled\)

10. 如果 then 中抛出了异常, 那么就会把这个异常作为参数, 传递给下一个 then 的失败的回调(onRejected)
11. 如果 then 返回的是一个 promise, 那么需要等待这个 promise 执行完成, promise 如果成功, 就走下一个 then 的 onFulfilled, 如果失败就走下一个 then 的 onRejected

## promise 源码

``` js
    const PENDING = 'pending'
    const FULFILLED = 'fulfilled'
    const REJECTED = 'rejected'

    function Promise(executor) {
        let self = this
        self.onFulfilled = [] // 成功的回调
        self.onRejected = [] // 失败的回调

        function resolve(value) {
            if (self.status === PENDING) {
                self.status = FULFILLED
                self.value = value
                self.onFulfilled.forEach(fn => fn())
            }
        }

        function reject(reason) {
            if (self.status === PENDING) {
                self.status === REJECTED
                self.reason = reason
                self.onRejected.forEach(fn => fn())
            }
        }

        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

    Promise.prototype.then = function(onFulfilled, onRejected) {
        // onFulfilled 和 onRejected 必须是函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {
            throw reason
        }

        let self = this
        let promise2 = new Promise((resolve, reject) => {
            if (self.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(self.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            } else if (self.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(self.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            } else if (self.status === PENDING) {
                self.onFulfilled.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(self.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                })
                self.onRejected.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(self.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                })
            }
        })

        return promise2
    }

    function resolvePromise(promise2, x, resolve, reject) {
        let self = this
        if (promise2 === x) {
            reject(new TypeError('Chaining cycle'))
        }
        if (x && typeof x === 'object' || typeof x === 'function') {
            let used // 只能调用一次
            try {
                let then = x.then
                if (typeof then === 'function') {
                    then.call(x, (y) => {
                        if (used) return
                        used = true
                        resolvePromise(promise2, y, resolve, reject)
                    }, (r) => {
                        if (used) return
                        used = true
                        reject(r)
                    })
                } else {
                    if (used) return
                    used = true
                    resolve(x)
                }
            } catch (e) {
                if (used) return
                used = true
                reject(e)
            }
        } else {
            resolve(x)
        }
    }

    module.exports = Promise
```

## Promise 的其他方法

### Promise. resolve
Promise. resolve(value) 返回一个以给定值解析后的 Promise 对象

1\. 如果 value 是个 thenable 对象, 返回的 promise 会跟随这个 thenable 对象, 采用他的最终状态
2\. 如果传入的 value 本身就是 promise 对象, 那么 Promise\. resolve 将不做任何修改, 原封不动的返回这个 promise 对象
3\. 其他情况, 直接返回以该值为成功状态的 promise 对象

``` js
    Promise.resolve = function(params) {
        if (params instanceof Promise) return params

        return new Promise((resolve, reject) => {
            if (params && params.then && typeof params.then === 'function') {
                setTimeout(() => {
                    params.then(resolve, reject)
                })
            } else {
                resolve(params)
            }
        })
    }
```

### Promise. reject

Promise. reject 和 Promise. resolve 不同, Promise. reject 的参数会原封不动的作为 reject 的理由, 变成后续方法的参数

``` js
    Promise.reject = function(reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }
```

### Promise. prototype. catch

Promise. prototype. catch 用于执行出错时的回调, 是特殊的 then 方法, . catch之后, 可以继续 . then

``` js
    Promise.prototype.catch = function(onRejected) {
        return this.then(null, onRejected)
    }
```

### Promise. prototype. finally

不管成功还是失败, 都会走到 finally 中, 并且 finally 之后还可以继续 then, 并且会将值原封不动的传递给后面的 then

``` js
    Promise.prototype.finally = function(callback) {
        return this.then((value) => {
            return Promise.resolve(callback()).then(() => {
                return value
            })
        }, (err) => {
            return Promise.resolve(callback()).then(() => {
                throw err
            })
        })
    }
```

### Promise. all

Promise. all(promises) 返回一个 promise 对象
 1. 如果传入的是一个空的可迭代对象, 那么此 promise 对象回调完成(resolve), 只有此情况是同步执行的, 其他都是异步返回的
 2. 如果传入的参数不包含任何 promise, 返回一个异步完成
 3. promises 中所有 promise 都完成 或者 参数中不包含 promise 时 回调完成
 4. promises 中有一个被 rejected, Promise. all的状态就变为 rejected, 此时第一个被 reject 的实例的返回值, 会传递给 Promise. all 的回调函数
 5. 在任何情况下, promise. all(promise) 返回每个 promise 的返回值组成的数组

 

``` js
    Promise.all = function(promises) {
        return new Promise((resolve, reject) => {
            let index = 0
            let result = []
            if (promises.length === 0) {
                resolve(result)
            } else {
                function processValue(i, data) {
                    result[i] = data
                    if (++index === promises.length) {
                        resolve(result)
                    }
                }
                for (let i = 0, len = promises.length; i < len; i++) {
                    // promises[i] 可能是普通值
                    Promise.resolve(promises[i]).then((data) => {
                        processValue(i, data)
                    }, (err) => {
                        reject(err)
                        return
                    })
                }
            }
        })
    }
```

### Promise. race

 Promise. race(promises) 返回一个 promise, 他的状态可以是 resolve, 也可以是 reject, 取决于 promises 中第一个返回的是 resolve 还是 reject
 如果传入的参数数组是空, 则返回的 promise 将永远等待
 如果迭代包含一个或多个 非承诺值/ 已解决 / 已拒绝 的承诺, 则 Promise. race 将解析为迭代中找到的第一个值

 

``` js
    Promise.race = function(promises) {
        return new Promise((resolve, reject) => {
            if (promises.length === 0) return
            for (let i = 0, len = promises.length; i < len; i++) {
                Promise.resolve(promises[i]).then((data) => {
                    resolve(data)
                    return
                }, (err) => {
                    reject(err)
                    return
                })
            }
        })
    }
```

 ## Promise A+ 规范

 ### 术语

  1\. promise 是一个具有 then 方法的对象或函数
  2\. thenable 是一个有 then 方法的对象或函数
  3\. value 是 promise 状态成功时的值, 可以是 undefined/ thenable / promise
  4\. reason 是 promise 状态失败时的值
  5\. exception 是一个使用 throw 抛出的异常值

### 要求

#### Promise Status

    Promise 必须处于以下三种状态之一: pending, fulfilled, rejected
    
    - 如果 Promise 处于 pending 状态
        + 可以变成 fulfilled 或 rejected
    - 如果 Promise 处于 fulfilled 状态
        + 不会变成其他状态
        + 必须有一个 value 值
    - 如果 Promise 在 rejected 状态
        + 不会变成其他状态
        + 必须有一个 promise 被 reject 的 reason
    
    概括就是 Promise 的状态只能从 pending 到 fulfilled 或从 pending 到 rejected.若 Promise 成功, 则有成功的 value, 若 Promise 失败, 则有失败的 reason



#### then 方法

Promise 必须提供一个 then 方法来访问最终的结果  
Promise 的then 方法接收两个参数
```js
Promise.then(onFulfilled, onRejected)
```
 + onFulfilled 和 onRejected 都是可选参数, 且必须都是函数类型

    

 + 如果 onFulfilled 是函数
    ```js
    - 必须在 Promise 变成 fulfilled 时调用, 参数是 Promise 的 value
    - 在 Promise 状态不是 fulfilled 之前不能调用
    - onFulfilled 只能调用一次
    ```
    
    
    
+ 如果 onRejected 是函数
    ```
    - 必须在 Promise 状态变成 rejected 时调用, 参数是 Promise 的 reason
    - 在 Promise 状态变为 rejected 之前不能调用
    - onRejected 只能调用一次
    ```
    
    
    
+ onFulfilled 和 onRejected 是微任务

    

+ onFulfilled 和 onRejected 必须作为函数被调用

    

+ then 方法可能被多次调用
    ```
    - 如果 Promise 变为了 fulfilled 状态, 所有的 onFulfilled 回调都需要按照 then 的顺序执行
    - 如果 Promise 变为了 rejected 状态, 所有的 onRejected 回调都需要按照 then 的顺序执行
    ```
    
    
    
+ then 必须返回一个 Promise
    ```js
        promise2 = promise1.then(onFulfilled, onRejected)
    ```
    
    ```
    - onFulfilled 或 onRejected 执行结果为 x , 调用 resolvePromise
    - 如果 onFulfilled 或 onRejected 执行时抛出异常 e, promises 需要被 reject
    - 如果 onFulfilled 不是一个函数, promise2 以 promise1 的值 fulfilled
    - 如果 onRejected 不是一个函数, promise2 以 promise1 的 reason rejected
    ```
    
    
    
 #### resolvePromise

    resolvePromise(promise2, x, resolve, reject)
  + 如果 promise2 和 x 相等, 那么 reject promise with a TypeError
    
  + 如果 x 是一个 promise
    
    ```
    - 如果 x 是 pending 状态, 那么 promise 必须要在 penging , 直到 x 变成 fulfilled 或 rejected
    - 如果 x 被 fulfilled, fulfill promise with a same value
    - 如果 x 被 rejected, reject promise with a same reason  
    ```

+ 如果 x 是一个 object 或 function

  ```
  - let then = x.then
  - 如果 x.then 这步出错, 那么 reject promise with e as the reason
  - 如果 then 是一个函数, then.call(x, resolvePromise, rejectPromise)
  		- resolvePromise 的入参是 y, 执行 resolvePromise(promise2, y, resolve, reject)
  		- rejectPromise 的入参是 r, reject promise with r
  		- 如果 resolvePromise 和 rejectPromise 都调用了, 那么第一个调用优先, 后面的调用忽略
  		- 如果调用 then 抛出异常 e
  				- 如果 resolvePromise 或 rejectPromise 已经被调用, 则忽略
  				- 否则, reject promise with e as the reason
  - 如果 then 不是一个 function. fulfill promise with x
  ```

+ 如果 x 不是一个 object 或 function .   fulfill promise with x