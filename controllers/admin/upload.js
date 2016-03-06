var fs       = require('fs');
var path     = require('path');
var URL      = require('url');
var Imagemin = require('imagemin');
var thunkify = require('thunkify');
var db       = require('../../model/db.js');
var API      = require('../../api/api.js');

function *_deleteImg(path){
  /**
   * @param { string } path 删除文件路径
   */
  var fileStat = thunkify(fs.stat);
  var deleteFile = thunkify(fs.unlink);
  
  try{
    yield fileStat(path);
  }
  catch(err){
    if(err.code === 'ENOENT'){
      console.log(err);
      return { state: 0, message: '文件路径错误' };
    }
  }

  try{
    yield deleteFile(path);  
  }
  catch(err){
    console.log(err);
    return { state: 0, message: '删除失败' };
  }
    
  return { state: 1, message: '文件删除成功' };
}

function _selectDir(entity){
  var tempDir = '';
  switch(entity) {
    case 'AboutImg':
      tempDir = 'about';
      break;
    case 'IndexImg':
      tempDir = 'index';
      break;
    case 'ShowContent':
      tempDir = 'show';
      break;
    default:
      tempDir = '';
  }
  return tempDir;
}

module.exports = {
  postData: function *(queryParms){
    
    if(!(queryParms.flag && 
         queryParms.entity &&
         queryParms.isNew &&
         queryParms.id &&
         queryParms.content &&
         queryParms.special &&
         queryParms.value)
      ){
      return '';
    }

    //判断文件后缀
    if(queryParms.part.mimeType){
      switch(queryParms.part.mimeType){
        case 'image/jpeg':
          queryParms.ext = '.jpg';
          break;
        case 'image/png':
          queryParms.ext = '.png';
          break;
        default:
          break;
      }
    }

    var uploadParm = {}; //  保存文件对象 文件路径， 名称 后缀 等
    var basePath = '../../public/image/';

    queryParms.imgName = new Date().getTime();
    queryParms.dir = _selectDir(queryParms.entity);

    var realPath = basePath + queryParms.dir;
    var realImgName = queryParms.imgName + queryParms.ext;
    
    //更新logo
    if(queryParms.special == 4){
      queryParms.pathDir = path.join(__dirname, basePath + 'logo' + queryParms.ext);

      var findResult = yield db[queryParms.entity].findById(1);

      var oldPath = path.join(__dirname, basePath + findResult.dataValues.logo);

      yield _deleteImg(oldPath);

      findResult.update({ logo: 'logo' + queryParms.ext });
    } 

    //更新图片页面图片
    if(queryParms.isNew == 'false' && 
        (queryParms.special == 1 ||
         queryParms.special == 2 ||
         queryParms.special == 3)){

      var findResult = yield db[queryParms.entity].findById(queryParms.id);

      var sort = findResult.dataValues.foreign_sort ? findResult.dataValues.foreign_sort : '';
 
      if(sort == 'mobileIndex'){
        realPath = basePath + 'mobile/index/'
      }
      
      var oldFile = path.join(__dirname, realPath + '/' + findResult.dataValues.imgName);

      queryParms.pathDir = path.join(__dirname, realPath + '/' + realImgName);

      yield _deleteImg(oldFile);

      findResult.update({ imgName: realImgName })
    }

    //添加图片
    if(queryParms.isNew == 'true' && (queryParms.special == 2 || queryParms.special == 3)){
      var createObj = {
        imgName: realImgName,
        name: '\"'+ queryParms.imgName + '\"'
      }

      //移动端产品介绍上传图片
      if(queryParms.value == 'mobile'){
        createObj.content = queryParms.content;
        createObj.foreign_sort = 'mobile';
      }
      
      if(queryParms.dir == 'about' && queryParms.value != 'mobile') {
        createObj.title = queryParms.content;
      }

      if(queryParms.dir == 'show' && queryParms.value != 'mobile') {
        createObj.foreign_sort = queryParms.value;
        createObj.content = queryParms.content;
      }

      queryParms.pathDir = path.join(__dirname, realPath + '/' + realImgName);
      
      yield db[queryParms.entity].build(createObj).save();
    }

    //个人中心上传图片
    if(queryParms.special == 5){
      queryParms.pathDir = path.join(__dirname, basePath + realImgName);

      var data = yield db.User.findById(queryParms.id);

      var oldPath = path.join(__dirname, basePath + data.dataValues.user_img);

      yield _deleteImg(oldPath);

      yield data.update({ user_img: realImgName })
    }
    
    yield API.upload.uploadImg(queryParms);

    /* new Imagemin()
      .src(path.join(__dirname, '../public/image/' + dir + '/') + '*.{jpg,png}')
      .dest(path.join(__dirname, '../public/image/' + dir))
      .use(Imagemin.jpegtran({progressive: true}))
      .run((err, files) => {
          //=> {path: 'build/images/foo.jpg', contents: <Buffer 89 50 4e ...>}
      });*/

    return { state: 1, message: '上传成功' };
  },
  delete: function *(queryParms){

    var basePath = '../../public/image/';

    var dir = _selectDir(queryParms.flag);

    var fileName = yield db[queryParms.flag].find({
      attributes: ['imgName'],
      where: { id: queryParms.id }
    })

    db[queryParms.flag].destroy({ where: {id : queryParms.id} });

    var pathDir = path.join(__dirname, basePath + dir + '/' + fileName.dataValues.imgName);

    return yield _deleteImg(pathDir);
  }
}
