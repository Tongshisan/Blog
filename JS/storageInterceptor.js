(function () {
  // 存储这个页面添加的 storage 的 key
  const localStorageKeys = new Set();
  const sessionStorageKeys = new Set();
  const originalLocalStorageSetItem = localStorage.setItem;
  const originalSessionStorageSetItem = sessionStorage.setItem;

  localStorage.setItem = function (key, value) {
    localStorageKeys.add(key);
    return originalLocalStorageSetItem.call(localStorage, key, value);
  };

  sessionStorage.setItem = function (key, value) {
    sessionStorageKeys.add(key);
    return originalSessionStorageSetItem.call(sessionStorage, key, value);
  };

  function clearStorage() {
    localStorageKeys.forEach((key) => {
      localStorage.removeItem(key);
    });
    sessionStorageKeys.forEach((key) => {
      sessionStorage.removeItem(key);
    });
    localStorageKeys.clear();
    sessionStorageKeys.clear();
  }

  window.addEventListener("beforeunload", clearStorage);
})();
