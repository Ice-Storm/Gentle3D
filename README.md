Gentle3D
=====
一个迷你CMS，支持PC，Mobile并且提供Json接口。  
  
* 1G内存单核服务器即可运行  
* 部署方便，一键部署，一键测试  
* 可以自定义界面  
  
在线演示 → http://www.gentle3d.cn

### 部署
. Github下载Gentle3D项目代码，并且解压到本地目录
. 在命令行进入Gentle3D目录，输入npm install安装项目依赖
. 修改config.default.js文件，配置数据库和管理员密码
. 在命令行输入gulp compress生成前端资源
. 在命令行输入node --harmony index.js启动项目,在浏览器输入 http://127.0.0.1:3000/ 即可看到项目首页
