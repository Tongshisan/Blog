# XMLSerializer & outerHTML

 XMLSerializer.serializeToString 和 outerHTML 区别


 ## XMLSerializer.serializeToString:

 + **用途: **主要用于序列化 XML 文档或 DOM 节点。它可以处理任意类型的 XML 节点，包括元素、文本节点、注释等。
 + **返回值: **返回一个字符串，表示序列化后的 XML 文档或节点。
 + **参数: **
   - **node: **要序列化的 XML 节点或 DOM 树的根节点。
   - **options: **可选的序列化选项，包括编码格式、缩进等。
 

 ## outerHTML:

 + **用途: **用于获取指定节点的 HTML 表示形式。它可以返回包含节点及其所有子节点的完整 HTML 代码。
 + **返回值: **返回一个字符串，表示指定节点的 HTML 表示形式。
 + **参数: **
   - **node: **要获取 HTML 表示形式的节点。



## 区别总结

用途和适用场景：

XMLSerializer.serializeToString 更通用，适用于任何类型的 DOM 节点，特别是需要处理 XML 文档时。
DOM.outerHTML 专门用于获取 HTML 元素及其子元素的字符串表示，更适合处理 HTML 文档。
支持的节点类型：

XMLSerializer.serializeToString 可以处理任意类型的 DOM 节点（元素、文本、注释等）。
DOM.outerHTML 只适用于元素节点，不适用于文本节点或注释节点。
返回的字符串内容：

XMLSerializer.serializeToString 返回的是 XML 格式的字符串。
DOM.outerHTML 返回的是 HTML 格式的字符串。
