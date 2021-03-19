# Symbol



作用:

+ 手写 `call`, `apply`, `bind` 函数中用到

  ```js
  function MyCall(ctx = window, ...args) {
    const fnSymbol = Symbol('fn');
    ctx[fnSymbol] = this;
    ctx[fnSymbol](...args);
    
    delete ctx[fnSymbol];
  }
  ```

+ 在 `localStorage` 中保存用户信息时可以使用, 避免变量冲突

  ```js
  const USER_INFO = Symbol('userInfo');
  
  ...
  async () => {
    const res = await fetchUserInfo();
    localStorage.setItem(USER_INFO, res);
  }
  ```

  

