# 使用 document.createDocumentFragment 操作 DOM

```html
    <body>
        <ul></ul>
    </body>

    <script>
        let ul = document.querySelector('ul')
        let fragment = document.createDocumentFragment()

        for(let i = 0; i < 10; i++) {
            let li = document.createElement('li')
            li.innerHTML = i
            fragment.appendChild(li)
        }

        ul.appendChild(fragment)

        ul.addEventlistener('click', (event) => {
            let e = event || window.event
            let target = e.target || e.srcElement
            console.log(target.innerHTML)
        })
    </script>
```