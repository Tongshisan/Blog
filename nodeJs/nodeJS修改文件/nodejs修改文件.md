# nodejs 修改文件内容

```
const express = require('express')
const fs = require('fs')

const app = express()

app.get('*', function (req, res) {
    fs.readFile('../index.html', 'utf8', function (err, data) {
        if(err) {
            console.log(err)
        }
        let result = data.replace(/你/g, '您')
        fs.writeFile('../index.html', result, 'utf8', function (err) {
            if (err) {
                console.log(err)
            }
        })
    })
    res.sendFile(path.join(__dirname, '../index.html'))
})
```