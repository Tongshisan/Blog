# click 和 blur 冲突



话不多说, 上代码

```html
...
	<input type="text" onblur="inputBlur()" />
	<button onclick="handleClick()"></button>

	<script>
		function inputBlur() {
      console.log('inputBlur')
    }
    
    function handleClick() {
      console.log('handleClick')
    }
	</script>
...
```

上面代码会在 `input` 失去焦点时打印 `inputBlur`, 点击 `button` 时打印 `handleClick`

那么当在输入框输入完后, 直接点击 `button `会发送什么?

答案是:

```js
inputBlur
handleClick
```

先打印了 `inputBlur`, 然后才打印 `handleClick`

是因为 `input` 的 `onblur` 事件会优先于 `button` 的 `click` 事件触发, 这在开发中可能会引出某些 bug, 

怎么让 `button` 的 `click` 事件优先触发呢?

就是将 `button` 的 `click` 事件替换为 `mousedown` 事件

```html
...
	<input type="text" onblur="inputBlur()"/>
	<button onmousedown="handleClick()"></button>
...
```

此外还有 `mouseup` 事件

| 事件      | 说明                                       |
| --------- | ------------------------------------------ |
| mousedown | 鼠标指针移到元素上方并按下鼠标按键时触发   |
| mouseup   | 鼠标指针移到元素上方按下鼠标然后松开时触发 |

测试 `mousedown`, `mouseup`, `click` 三个事件的执行顺序

```html
...
	<input onblur="inputBlur()" />
	<button onmousedown="mouseDown()" onmouseup="mouseUp()" onclick="handleClick()"><button>
  
  <script>
    function inputBlur() {
      console.log('inputBlur')
    }
    
  	function mouseDown() {
      console.log('mousedown')
    }  
    
    function mouseUp() {
      console.log('mouseup')
    }
    
    function handleClick() {
      console.log('click')
    }
  </script>
...
```



打印结果

```js
mousedown
inputBlur
mouseup
click
```

