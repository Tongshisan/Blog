<!--
 * @Author: your name
 * @Date: 2020-10-19 14:15:36
 * @LastEditTime: 2020-10-19 14:36:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Blog/问题/document.getElementsByClassName 的问题.md
-->
# document.getElementsByClassName

今天在使用 document.getElementsByClassName 的时候碰到了一个问题

![document.getElementsByClassName()](https://raw.githubusercontent.com/Tongshisan/Blog/master/img/document.getElementsByClassName0.png)

结果

![document.getElementsByClassName()](https://raw.githubusercontent.com/Tongshisan/Blog/master/img/document.getElementsByClassName1.png)

查阅后是因为在 dom 未加载完成就调用了 js 

![document.getElementsByClassName()](https://raw.githubusercontent.com/Tongshisan/Blog/master/img/document.getElementsByClassName2.png)
![document.getElementsByClassName()](https://raw.githubusercontent.com/Tongshisan/Blog/master/img/document.getElementsByClassName3.png)