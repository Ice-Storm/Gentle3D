![image](https://github.com/Ice-Storm/Gentle3D/blob/master/logos/logo.png)
[![Build Status](https://travis-ci.org/Ice-Storm/Gentle3D.png)](https://travis-ci.org/Ice-Storm/Gentle3D.png)
[![Build Status](https://david-dm.org/Ice-storm/Gentle3d/dev-status.svg)](https://david-dm.org/Ice-storm/Gentle3d/dev-status.svg)
[![Build Status](https://codeship.com/projects/79da7240-5481-0132-ea32-42ab35009c21/status)](https://codeship.com/projects/79da7240-5481-0132-ea32-42ab35009c21/status)

一个迷你CMS，支持PC，Mobile并且提供Json接口。  
  
* 1G内存单核服务器即可运行  
* 部署方便，一键测试  
* 可以自定义界面  

### 部署
1. Github下载Gentle3D项目代码，并且解压到本地目录
2. 在命令行进入Gentle3D目录，输入`npm install`安装项目依赖
3. 修改config.default.js文件，配置数据库和管理员密码
4. 在命令行输入`npm run build`生成前端资源
5. 在命令行输入`npm run start`启动项目,在浏览器输入 http://127.0.0.1:3000/ 即可看到项目首页
