# gitlab CI/CD

## 安装 gitlab runner

添加 gitlab 官方存储库

``` shell
curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh | sudo   bash
```

安装最新版本的 gitlab runner

``` shell
sudo apt-get install gitlab-runner
```

注册 runner

``` shell
gitlab-runner register
...
```

*注册 runner 时的 tags 需与 . gitlab-ci. yml  job 中的 tags 一致*

## 碰到的问题

### tags 问题

刚开始没有在 job 中添加 tags, 而注册的 runner 默认只运行带有相同 tags 的任务

``` shell
stages:

  + build
  + deploy

# 定义 job - build 项目
job1 - build 阶段:
  # 开始之前需要安装依赖
  stage: build
  script:

    - echo "finish build stage"

# 添加 tags
  tags:
   - test

```

## 没有活跃的运行器

 提交代码后, jobs 一直 pending, 提示说没有活跃的运行器, 跳转到运行器页面后, 发现运行器前面时灰色的三角符号, 
 提示 : New runner. Has not connected yet

 解决方法:
 运行命令
 

``` shell
gitlab-runner verify
 ```

运行之后, 运行器前面变为绿色圆形符号

 ## 任务一直 pending 
 运行命令
 

``` shell
gitlab-runner run &
 ```

 ## 栗子
 

``` shell
variables:
  VER: "6.13.4"
# 定义阶段 stages
stages:

  + pre_build
  + build
  + deploy

cache:
  paths:

    - node_modules/

job1:
  stage: pre_build
  tags:

    - dana-doms-web

  script:

    - npm install

  only:

    - tags

# 定义 job - build 项目
job2 - build 阶段:
  stage: build
  tags:

    - dana-doms-web

  script:

    - cd fe
    - gulp cdn
    - tar -czf views.tar.gz cdn-dist/${VER}/views
    - echo "finish build stage!!"

  only:

    - tags

# 定义 job
job3 - 发布到线上环境:
  stage: deploy
  tags:

    - dana-doms-web

  script:

    - cd fe
    - gulp oss -ak ${AccessKeyId} -aks ${AccessKeySecret} -region ${REGION} -bucket ${BUCKET} -prefix ${PREFIX}
    - pandora -pd web@dana-doms-web views.tar.gz
    - echo "finish deploy stage"

  only:

    - tags

 ```
