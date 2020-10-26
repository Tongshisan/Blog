# overflow 属性对 after, before 伪元素的影响



可以利用 `div ` 的伪元素 `::after,` `::before` 来给 `div` 上下左右添加箭头, 作出类似箭头气泡的效果

可是, 如果给 `div` 元素添加纵向滚动条时, 伪元素效果就会消失

```css
.test {
  max-height: 200px;
  overflow: auto;
}
```

例如以上例子, 给 `div` 设置最大高度 200px, overflow: auto 时, 如果内容超出了 200px, 就会产生纵向的滚动条, 那么, `div` 的小箭头就会消失



因为, `scroll`, 使得 `div` 的内容被裁剪了, 作为 `div` 子元素的 `::before, ::after` 也就被裁剪了



**解决方案**

给 `div` 元素内嵌一个 `div` 元素, 在内嵌的 `div` 上设置最大高度以及 `overflow` 效果