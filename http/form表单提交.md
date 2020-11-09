# form 表单提交



## application/x-www-form-urlencoded

数据被编码成以 `&` 分离的键值对, 同时以 `=` 分离键和值, 非字母或数字的字符会被 `percent-encoding`: 这也是为什么这种类型不支持二进制数据 (应使用 `multipart/form-data` 代替)



## multipart/form-data

一个 `multipart/form-data` 消息体, 由多个块组成, 每个块代表一个有效的表单控件, 并使用 `boundary` 的字符串分割

+ 第一部分: `Content-Disposition: form-data` 参数名称, 如: `name='张三'`
+ 第二部分: `Content-Type: text/plain`, `Content-Type: image/png`
+ 第三部分: 消息内容

