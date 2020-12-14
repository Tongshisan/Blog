# fileList



**向 fileList 中添加 file**

```html
...
<input type="file" multipe>
...

<script>
  const input = document.querySelector("input[type='file']")
	const file1 = new File(['x'], 'x.txt')
  const file2 = new File(['y'], 'y.png')
  
	const data = new DataTransfer()
  data.items.add(file1)
  data.items.add(file2)
  input.files = data.files
</script>
```

