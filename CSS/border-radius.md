# border-radius

通常我们使用 `border-radius` 来实现圆角效果, 其实 `border-radius` 可以单独指定他的半长轴和半短轴, 只需要用 `/` 分割即可, 可以用这个属性轻松实现半圆, 半椭圆, 四分之一圆等常见图形



`border-radius` 是以下四个属性缩写:

+ border-top-left-radius
+ border-top-right-radius
+ border-bottom-right-radius
+ border-bottom-left-radius

值可以是 `<length>` 和 `<percentage>`

计算公式 (以 `<length>` 举例, `<percentage>` 同理): 

+ ```css
  border-radius: 10px
  ```

  四个值都为 10px

+ ```css
  border-radius: 10px 20px
  ```

  + `border-top-left-radius` 和 `border-bottom-right-radius` 为 10px
  + `border-top-right-radius` 和 `border-bottom-left-radius` 为 20px

+ ```css
  border-radius: 10px 20px 30px
  ```

  + `border-top-left-radius` 为 10px
  + `border-top-right-radius` 和 `border-bottom-left-radius` 为 20px
  + `border-bottom-right-radius` 为 30px  

+ ```css
  border-radius: 10px 20px 30px 40px
  ```

  四个值依次取值



**重点来了**

+ ```css
  border-top-left-radius: 10px 20px
  ```

  长半轴为 10px, 短半轴为 20px

  (水平方向 10px, 垂直方向 20px)

+ ```css
  border-radius: 10px / 10px
  ```

  四个值都为 `10px 20px`

+ ```css
  border-radius: 10px 20px / 30px
  ```

  + `border-top-left-radius` 和 `border-bottom-right-radius` 值为 `10px 30px`
  + `border-top-right-radius` 和 `border-bottom-left-radius` 值为 `20px 30px`

+ ```css
  border-radius: 10px 0 20px / 30px 40px
  ```

  + `border-top-left-radius: 10px 30px`
  + `border-top-right-radius` 和 `border-bottom-left-radius` 值为 `0 40px`
  + `border-bottom-right-radius: 20px 30px`

+ 



我的理解:

`border-top-left-radius: 40px 40px`

就是以左上角为直角坐标系原点, 以 `(40px, 40px)` 为圆心, 用平滑的曲线连接 `(40px, 0)` 和 `(0, 40px)` 两个点

`border-top-right-radius: 40px 20px`

就是以右上角为直角坐标系原点, (向左下为`x`, `y` 正方向), 以 `(40px, 20px)` 为椭圆心画椭圆