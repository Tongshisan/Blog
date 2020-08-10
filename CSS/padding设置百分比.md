# padding



padding 的值为百分比时, 是以**父元素的 width** 为参照物

因为如果根据 height 计算, 则父元素的高度会改变以容纳子元素, 然后父元素的高度改变又会导致子元素 margin 改变, 进而无限循环

margin / padding 取值为 百分比时都是以 **父元素的 width ** 为参照物



## 用途

**利用 margin / padding 的百分比值实现高度自适应 (多用于占位, 避免闪烁)**

使用 margin / padding 的百分比值解决自适应高度的关键在于: 容器 margin / padding 的百分比参照物是父元素的宽度, 而容器的 width 的百分比的参照物也是父元素的宽度, 两属性参照物一样, 那么想要把两属性的值统一起来就很简单了.

优化方案: 给容器设置 padding-top / padding-bottom 跟 width 一样的百分比值

```css
.containter {
    padding-top: 50%;
    width: 50%;
}

```

