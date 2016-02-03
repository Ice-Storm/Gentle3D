var util  = require('util');
var URL   = require('url');
var path  = require('path');
var error = require('../../index.js');
var db    = require('../../model/db.js');
var tools = require('../tools/tools.js');
var API   = require('../../api/api.js');

module.exports.getData = function *(parms) {

  var data = yield db.User.findById(parms.adminId);

  return {
    image: tools.dealResult(data)[0].user_img,
    info: tools.dealResult(data)[0]
  };
}

module.exports.getModal = function *(){
  return {
    title: '修改个人信息',
    url: 'userManageCompontent/postData',
    type: 'post',
    flag: 'user'
  }
}

module.exports.postData = function *(queryParms){
  
  findResult = yield db.User.findById(queryParms.adminId);
  var updateObj = queryParms.part;

  delete updateObj.id;
  delete updateObj.flag;
  
  try{
    updateResult = yield findResult.update(updateObj);
  } catch(e){
    console.log(e);
  }
  return { state: 1, message: '更新成功' }
}

module.exports.getUpload = function *(){
  return { 
    title: '修改头像',
    url: './userManageCompontent/upload',
    nameArr: ['logo'],
    flag: 'connection',
    entity: 'WebConfig',
    id: '',
    isNew: '',
    content: '',
    value: ''
  }
};

module.exports.upload = function *(queryParms){
  var obj = {}

  if(queryParms.part.mimeType && queryParms.part.mimeType == 'image/jpeg') {
    obj.ext = '.jpg';
  }

  if(queryParms.part.mimeType && queryParms.part.mimeType == 'image/png') {
    obj.ext = '.png';
  }

  obj.part = queryParms.part;
  obj.imgName = new Date().getTime();
  obj.pathDir = path.join(__dirname, '../../public/image/' + obj.imgName + obj.ext);

  yield API.upload.uploadImg(obj);

  var data = yield db.User.findById(queryParms.adminId);

  yield data.update({ user_img: obj.imgName + obj.ext })

  return { state: 1, message: '上传成功' }

}

