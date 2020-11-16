# 打造个性 github 首页

![github 个性首页](https://raw.githubusercontent.com/Tongshisan/Blog/master/img/%E4%B8%AA%E6%80%A7github%E9%A6%96%E9%A1%B5.png)



## 新建 github 同名仓库

新建 github 同名仓库

在 README 里面使用 markdown 语法设计创造主页内容



## 展示 star 

利用 github 官方提供的 API 展示自己的 `star`, `commit` 等情况

```markdown
![](https://github-readme-stats.vercel.app/api?username=Tongshisan&theme=dark)
```

`username` 换成自己的 username, `theme`设置主题 



## 展示徽标

制作自己喜爱的徽标



## 统计代码

统计代码时常

### 第一步

登录 `Waka Time` 官网, 注册一个 `Waka Time ` 账号, [传送门](https://wakatime.com/plugins/status?onboarding=true) (可以直接使用 `github` 账号登录)

### 第二步

将自己的 API Key 存储到 `github` 同名仓库的 `secrets`

在刚才新建的仓库里点击   setting --> secrets --> new secret 创建一个, name 填写 `WAKATIME_API_KEY` value 就把 `Waka Time` 官网里生成的 `Api Key` 粘贴进去



### 第三步

需要一个 `waka-readme` 项目, 请将 [https://github.com/athul/waka-readme][https://github.com/athul/waka-readme] 中的项目 `fork` 到自己的仓库就行

### 第四步

配置 github 仓库的 action

接着在项目配置里配置 `action`, 点击 `actions` -->  `workflow`

然后删除全部默认代码, 粘贴以下内容:

```shell

name: Waka Readme
 
on:
  push:
    branches:
      - main
  workflow_dispatch:
  schedule:
    # Runs at 12am UTC
    - cron: '0 0 * * *'
 
jobs:
  update-readme:
    name: Update this repo's README 
    runs-on: ubuntu-latest
    steps:
      - uses: Tongshisan/waka-readme@master
        with:
          WAKATIME_API_KEY: ${{ secrets.WAKATIME_API_KEY }}

```

**注意  `branches` 以前默认都是 `master`, 现在默认 `main`** （2020 年 10 月 1 日起, 新建的仓库默认分支都为 `main`, 以前的则不受影响）, 2020 年年底将使现有的存储裤无缝重命名其默认分支

**`uses` 中替换成你自己的路径 **



### 第五步

在 `Actions` 里 点击 `waka readme`, 再点击 `run workflow`



### 第六步

在 README 里添加一下内容

```markdown
  <!--START_SECTION:waka-->
  <!--END_SECTION:waka-->
```



完了再次 `commit` 返回到主页会看到一下内容, 说明已经关联成功了, 需要等待一天就 ok 了

```
No Activity tracked this Week
```





(后续补图...)