# css3 新单位   vh  和    vw

vh = view height
vw = view width

| 单位 | 解释 |
| ---- | ---- |
| vh  | 1 vh = 视口高度的1% |
| vw  | 1 vw = 视口宽度的1% |
| vmin | 选取 vh 和 vw 中较小的一个 |
| vmax | 选取 vh 和 vw 中较大的一个 |

Q: 什么是视口?
A: Peter-Paul Koch（”PPK大神”）提出视口的解释是：在桌面端，视口指的是在桌面端，指的是浏览器的可视区域；而在移动端，它涉及3个视口：Layout Viewport（布局视口），Visual Viewport（视觉视口），Ideal Viewport（理想视口）

视口单位中的“视口”，桌面端指的是浏览器的可视区域；移动端指的就是Viewport中的Layout Viewport。

![alt 视口](https://github.com/Tongshisan/Blog/blob/master/img/css-%E8%A7%86%E5%8F%A3.jpeg)

vh/vw 与 % 的区别

![alt vh/vw与 % 的区别](https://github.com/Tongshisan/Blog/blob/master/img/css-vh%E5%92%8Cvw%E5%8C%BA%E5%88%AB.jpeg)

*参考连接 https://juejin.im/entry/59b00e46f265da2491513bcc*