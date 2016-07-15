Gentle3D
[![Build Status](https://travis-ci.org/[YOUR_GITHUB_USERNAME]/[YOUR_PROJECT_NAME].png)](https://travis-ci.org/[YOUR_GITHUB_USERNAME]/[YOUR_PROJECT_NAME])
=====
一个迷你CMS，支持PC，Mobile并且提供Json接口。  
  
* 1G内存单核服务器即可运行  
* 部署方便，一键测试  
* 可以自定义界面  
  
在线演示 → http://www.gentle3d.cn

### 部署
1. Github下载Gentle3D项目代码，并且解压到本地目录
2. 在命令行进入Gentle3D目录，输入`npm install`安装项目依赖
3. 修改config.default.js文件，配置数据库和管理员密码
4. 在命令行输入`gulp compress`生成前端资源
5. 在命令行输入`node --harmony index.js`启动项目,在浏览器输入 http://127.0.0.1:3000/ 即可看到项目首页
