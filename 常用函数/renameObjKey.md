# 重命名对象的键



```js
function renameObjKey (obj, map) {
  const res = {};
  for (const [o, n] of Object.entries(map)) {
    if (o in obj) {
      res[n] = obj[o];
    }
  }
  
  return res;
}
```

