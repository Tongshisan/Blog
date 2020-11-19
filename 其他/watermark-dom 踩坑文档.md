# watermark-dom 踩坑文档

因项目需求, 需要在几个页面添加水印效果, 于是找上了 `watermark-dom` 这个包, 以下记录使用过程中踩过的坑:

Github 地址: [https://github.com/saucxs/watermark-dom](https://github.com/saucxs/watermark-dom)

## watermark_parent_node

水印挂载的父元素 Element, 默认挂载在 `body` 上

因为只需要在某个 `div` 内嵌入, 所以用到了这个属性, 先是给这个 `div` 添加了 `id="test"`

```js
watermark.init({
  ...
  watermark_parent_node: document.getElementById('test')
})
```

然而发现并没有什么卵用, :question:

试了 `class` 还是没什么用...

仔细研究文档中的话, Element, body, 忽然联想到写 `css ` 的时候 

```css
body {
  ...
}
#test {
  ...
}
```

用 `#` 肯定是不行的, 直接上 `id`

```js
watermark.init({
  ...
  watermark_parent_node: 'test'
})
```

额, 成功了...  :man_facepalming: :clap:

