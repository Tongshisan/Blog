# git 初始化本地仓库



有一个本地项目 `test`, 想上传到 `git `

1. 在 `github` 上创建项目, 为了避免错误, 不要初始化 `README`, `license`, `gitignore` 文件, 并复制仓库地址 `url`

2. 在`test` 根目录打开终端

3. 初始化本地仓库

   ```sh
   git init
   ```

4. 添加文件到本地仓库

   ```sh
   git add .
   ```

5. 提交文件

   ```sh
   git commit -m "init: ---"
   ```

6. 添加远程仓库地址到本地仓库

   ```sh
   git remote add origin {url}
   git remote -v
   ```

7. `push` 到远程仓库

   ```sh
   git push -u origin main
   ```

   