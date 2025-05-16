(() => {
  // 内联的 onclick 事件
  document.querySelectorAll("[onclick]").forEach((element) => {
    const onclick = element.getAttribute("onclick");
    if (onclick && onclick.includes("window.location.href")) {
      const url =
        onclick.match(/'([^']+)'|"([^"]+)"/)[1] ||
        onclick.match(/'([^']+)'|"([^"]+)"/)[2];
      element.setAttribute(
        "onclick",
        `window.open('${url}', '_blank', 'noopener,noreferrer')`
      );
    }
  });

  const PROCESSED_MARK = "data-href-processed";

  // 处理脚本的函数
  function processScript(script) {
    if (script.hasAttribute(PROCESSED_MARK)) return;

    const content = script.textContent;
    if (content && content.includes("window.location.href")) {
      const newScript = document.createElement("script");
      const newContent = content.replace(
        /window\.location\.href\s*=\s*(['"])(.*?)\1/g,
        'window.open("$2", "_blank", "noopener,noreferrer")'
      );
      newScript.textContent = newContent;
      newScript.setAttribute(PROCESSED_MARK, "true");

      if (script.parentNode) {
        script.parentNode.replaceChild(newScript, script);
      }
    }
  }

  // 处理现有的脚本
  const inlineScripts = document.querySelectorAll(
    `script:not([src]):not([${PROCESSED_MARK}])`
  );
  inlineScripts.forEach(processScript);

  // 监听新增的脚本
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeName === "SCRIPT" && !node.src) {
          processScript(node);
        }
      });
    });
  });

  // 开始监听
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();
