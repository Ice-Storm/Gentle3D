var error        = require('../../index.js');
var db           = require('../../model/db.js');
var tools        = require('../tools/tools.js');
var uploadConfig = require('./uploadConfig.js');

module.exports.getData = function *(parms){

  var data = yield db.User.findById(parms.adminId);

  return {
    image: tools.dealResult(data)[0].user_img,
    info: tools.dealResult(data)[0]
  };
}

module.exports.getModal = function *(){
  return {
    title: '修改个人信息',
    url: 'userManageComponent/postData',
    type: 'post',
    flag: 'user'
  }
}

module.exports.postData = function *(queryParms){
  
  var findResult = yield db.User.findById(queryParms.adminId);
  
  var updateObj = queryParms.part;

  delete updateObj.id;
  delete updateObj.flag;
  
  try{
    updateResult = yield findResult.update(updateObj);
  }
  catch(err) {
    console.log(err);
  }
  return { state: 1, message: '更新成功' }
}

module.exports.getUpload = function *(queryParms){
  var parms = { 
    title: '修改头像',
    url: './upload',
    flag: 'user',
    entity: 'User',
    id: queryParms.adminId,
    isNew: '',
    content: '',
    value: ''
  }

  return yield uploadConfig.getData(parms);
};
