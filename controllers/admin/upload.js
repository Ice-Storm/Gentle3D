var fs       = require('fs');
var path     = require('path');
var URL      = require('url');
var Imagemin = require('imagemin');
var thunkify = require('thunkify');
var db       = require('../../model/db.js');
var API      = require('../../api/api.js');


function _selectDir (entity) {
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
  postData: function *(queryParms) {

    var uploadParm = {}; //  保存文件对象 文件路径， 名称 后缀 等

    if(!(queryParms.flag && 
         queryParms.entity &&
         queryParms.isNew &&
         queryParms.id &&
         queryParms.content &&
         queryParms.value)
      ){
      return '';
    }

    queryParms.imgName = new Date().getTime();

    queryParms.dir = _selectDir(queryParms.entity);

    if(queryParms.part.mimeType && queryParms.part.mimeType == 'image/jpeg') {
      queryParms.ext = '.jpg';
    }

    if(queryParms.part.mimeType && queryParms.part.mimeType == 'image/png') {
      queryParms.ext = '.png';
    }

    //更新logo
    if(queryParms.flag == 'connection' && queryParms.entity == 'WebConfig' && queryParms.isNew == 'null') {
      queryParms.pathDir = path.join(__dirname, '../../public/image/' + queryParms.imgName + queryParms.ext);
      queryParms.where = 'connection';

      var findResult = yield db[queryParms.entity].find({where: { id: 1 }})

      findResult.update({ logo: queryParms.imgName + queryParms.ext });
    } 

    //更新图片页面图片
    if(queryParms.isNew == 'false') {

      var findResult = yield db[queryParms.entity].findById(queryParms.id);

      var oldFile = path.join(__dirname, '../../public/image/' + queryParms.dir + '/' + findResult.dataValues.imgName);

      queryParms.pathDir = path.join(__dirname, '../../public/image/' + queryParms.dir + '/' + queryParms.imgName + queryParms.ext);

      var fileStat = thunkify(fs.stat);

      var deleteFile = thunkify(fs.unlink);

      try {
        var fileStatObj = yield fileStat(oldFile);  
      } catch(error) {
        console.log(error);
      }
      
      if(fileStatObj && fileStatObj.isFile()) {
        var isDelete = yield deleteFile(oldFile);   
      }

      if(!!isDelete) {
        throw new Error('文件不存在');
      } 

      findResult.update({ imgName: queryParms.imgName + queryParms.ext })
    }

    //添加图片
    if(queryParms.isNew == 'true' && (queryParms.flag == 'showcontent' || queryParms.flag == 'aboutimg')) {

      var createObj = {
        imgName: queryParms.imgName + queryParms.ext,
        name: '\"'+ queryParms.imgName + '\"'
      }

      if(queryParms.dir == 'about') {
        createObj.title = queryParms.content;
      }

      if(queryParms.dir == 'show') {
        createObj.foreign_sort = queryParms.value;
        createObj.content = queryParms.content;
      }
   
      queryParms.pathDir = path.join(__dirname, '../../public/image/' + queryParms.dir + '/' + queryParms.imgName + queryParms.ext);

      yield db[queryParms.entity].build(createObj).save();

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
  delete: function *(queryParms) {

    var dir = _selectDir(queryParms.flag);

    var fileName = yield db[queryParms.flag].find({
      attributes: ['imgName'],
      where: { id: queryParms.id }
    })

    db[queryParms.flag].destroy({ where: {id : queryParms.id} });

    var pathDir = path.join(__dirname, '../../public/image/' + dir + '/' + fileName.dataValues.imgName);
    
    var fileStat = thunkify(fs.stat);

    var deleteFile = thunkify(fs.unlink);

    var fileStatObj = yield fileStat(pathDir);

    if(fileStatObj && fileStatObj.isFile()) {
      var isDelete = yield deleteFile(pathDir);   
    }

    if(isDelete) {
      return { state: 1, message: '删除成功' };  
    } else {
      return { state: 0, message: '删除失败' };
    }
  }
}
