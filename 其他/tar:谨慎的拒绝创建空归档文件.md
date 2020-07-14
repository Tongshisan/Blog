# tar: 谨慎的拒绝创建空归档文件

今天在 linux 上压缩文件时使用以下命令

```shell
tar -czf test
```
*test 要压缩的文件夹* 

报错: tar: 谨慎的拒绝创建空归档文件

正确的写法应该时先写压缩生成的文件名
```shell
tar -czf test.tar.gz test
```