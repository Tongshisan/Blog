# css 文本超出后隐藏并显示省略号



## 单行文本溢出

例: 我有一头小毛驴, 我从来也...

文本超过盒子长度时, 隐藏超出内容并显示为 ...  (只对一行内容有效)
```css
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```



## 多行文本溢出



```txt
我有一头小毛驴, 我从来也不骑,
有一天我心血来潮, 骑着去赶集...
```

实现方式 : `css`

```css
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
```



## 单行省略中间

Garget: 我也不知道这是什么文件.md

Result: 我也不知...文件.md



html

```html
<p class="wrap">
	<span class="left">{fileName.slice(0, -2)}</span>
  <span class="right">{fileName.slice(-2)}</span>
</p>
```

css

```css
.wrap {
  overflow: hidden;
  display: flex;
  max-width: 180px;
}

.left {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}

.right {
  white-space: nowrap;
}
```

