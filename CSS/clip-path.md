# clip-path

使用裁剪方式创建元素的可显示区域, 区域内的部分显示, 区域外的隐藏



## inset()

inset() 函数用来定义一个矩形

它的参数为四个偏移值, 用于指定矩形 4 条边在参考盒模型各个方向上的偏移

除了四个偏移值, `inset()` 函数还有一个可选的 `<border-radius>` 参数, 用于指定矩形的圆角, 语法格式和 `border-radius` 相同, 如果要指定圆角, 必须带上 `round` 关键字



```css
/* 四条边各裁剪 10px  */
inset(10px)

/* top 裁剪 */
inset(10px 20px 30px)
```





## circle()

circle() 函数用来定义一个圆形

接受两个参数, 都可以省略

+ 半径 (可以为 `length` 和 `percentage` 如果缺省, 则由浏览器来决定它的默认值)
  + 除了使用长度和百分比指定圆的半径也可以使用 `closest-side` 和 `farthest-side`
  + `closeet-side` 表示如果没有指定半径, 则浏览器将使用元素最接近圆心的边到圆心的距离为半径
  + `farthest-side` 表示如果没有指定半径, 则浏览器使用元素距离圆心最远的边到圆心的距离为半径
+ 圆心 (必须带有 position 关键字, 如果缺省, 那么圆心位于使用该函数的元素的中心位置)

```css
/* 圆的半径为 20px, 圆心位于水平 100px 垂直 100px 处 */
clip-path: circle(20px at 100px 100px)

/* 圆的半径为 50%, 圆心位于水平 50% 垂直 50% 处 */
clip-path: circle(50% at 50% 50%)

/* 圆的半径为 cloest-side, 圆心位于水平 30% 垂直 50% 处 */
clip-path: circle(closest-side at 30% 50%)
```



## ellipse()

ellipse() 函数用来定义一个椭圆

它的参数和 `circle()` 函数相同, 但他可以定义两个半径: `rx` 和 `ry`, 分别表示椭圆的 `x` 轴半径和 `y` 轴半径 

```css
/* 使用默认值 */
clip-path: ellipse()

/* 椭圆的 x 轴半径为 100px, y 轴半径为 50px, 椭圆心位于水平 50%, 垂直 70% 处 */
ellipse(100px 50px at 50% 70%)

/* 椭圆的 x 轴半径为 farthest-side, y 轴半径为 closest-side, 椭圆心位于水平 100px, 垂直 200px 处 */
ellipse(farthest-side closest-side at 100px 200px)
```



## polygon()

polygon() 函数用来定义一个多边形

它的参数是一组坐标对, 每一个坐标对代表多边形的一个顶点坐标, 浏览器会依次连接这些顶点得到一个封闭的多边形, 坐标对使用逗号 `,` 分隔, 可以使用绝对单位和百分比

下面都是有效的 `polygon()` 函数声明:

```css
/* 没猜错的话应该是一个直角三角形 */
polygon(0 0, 100% 100%, 0 100%)

/* 仍然是一个三角形 */
polygon(50px 0, 100px 100px, 0 100px)

```





后话:

突然发现: 如果 `clip-path` 默认状态和 `hover` 状态下使用了不同的函数, 那么 `transition` 属性会无效