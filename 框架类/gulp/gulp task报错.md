# gulp task 报错: The following tasks did not complete

在 gulp 中执行 task 时 报错 : The following tasks did not complete

```js
const gulp = require('gulp')

gulp.task('test', () => {
    console.log('test')
})
```

## 解决方法

### 返回一个 stream
```js
const gulp = require('gulp')
const print = require('gulp-print')

gulp.task('test', () => {
    return gulp.src('package.json')
        .pipe(print(function() {
            return console.log('test')
        }))
})
```

### 返回一个 promise
```js
...
gulp.task('test', () => {
    return new Promise((resolve, reject) => {
        console.log('test')
        resolve()
    })
})
```

### 返回一个回调函数
```js
gulp.task('default', gulp.series('test', (done) => done()))
```

### 返回一个子进程
当我们只是执行一段纯 js 代码, 没有用到 node 相关的方法时用这个
```js
const spawn = require('child_process').spawn

gulp.task('test', () => {
    return spawn('echo', ['test', 'start'], {stdio: 'inherit'})
})
```