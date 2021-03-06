# web 安全

## XSS 攻击

XSS (Cross-Site Scripting, 跨站脚本攻击), 是一种代码注入攻击, 攻击者在目标网站注入恶意代码, 当被攻击者登录网站时就会执行这些恶意代码, 这些脚本可以读取 cookie, session, 或者其他网站敏感的信息, 对用户进行钓鱼欺诈, 甚至发起蠕虫攻击

XSS 的本质: 恶意代码未经过滤, 与网站正常的代码混在一起, 浏览器无法分辨哪些脚本是可信的, 导致恶意脚本被执行, 由于直接在用户的终端执行, 恶意代码能够直接获取用户的信息, 利用这些信息冒充用户向网站发起攻击者定义的请求

### XSS 分类
    + 反射型
        当用户点击一个恶意连接, 或者提交一个表单, 或者进入一个恶意网站时, 注入脚本进入被攻击者的网站, web 服务器将注入脚本, 比如一个错误信息, 搜索结果等, 未进行过滤直接返回到用户的浏览器上

        攻击步骤: 
        + 攻击者构造出特殊的 URL, 其中包含恶意代码
        + 用户打开带有恶意代码的 URL 时, 网站服务端将恶意代码从 URL 中取出, 拼接在 HTML 中返回给浏览器
        + 用户浏览器接收到响应后解析执行, 恶意代码也被执行
        + 恶意代码窃取用户数据并发送到攻击者的网站, 或者冒充用户的行为, 调用目标网站接口执行攻击者指定的操作

        解决方法: 
            + 后端设置 httpOnly
            + 对字符串进行编码  (对 url 查询参数进行转义再输出到页面)
    
    + DOM 型

    + 存储型


## CSRF

csrf ( Cross-Site request forgery, 跨站请求伪造 ) : 攻击者诱导受害者进入第三方网站, 在第三方网站中, 向被攻击网站发送跨站请求, 利用受害者在被攻击网站已经获取的注册凭证, 绕过后台的验证, 达到冒充用户对攻击的网站执行某项操作的目的

### 典型的流程
    + 受害者登录 A 站点, 并保留了登录凭证( Cookie )
    + 攻击者诱导受害者访问了站点 B, 
    + 站点 B 向 站点 A 发了一个请求,  浏览器会默认携带站点 A 的 Cookie 信息
    + 当站点 A 接收到请求后, 对请求进行验证, 并确认是受害者的凭证, 误以为时无辜的受害者发送的请求
    + 站点 A 以受害者的名义执行了站点 B 的请求
    + 攻击完成, 攻击者在受害者不知情的情况下, 冒充受害者完成了攻击

### 特点
    + 攻击通常在第三方网站发起
    + 攻击利用受害者在被攻击网站的登录凭证, 冒充受害者提交操作, 并不会获取 cookie 信息
    + 跨站请求伪造可以利用各种方式: 图片 url, 超链接, CORS, form 提交等

### 防御
    + 添加验证码
    + 判断请求的来源: 检测 Referef (不安全, referef可以被更改)
    + 使用 Token
    + samesite cookie