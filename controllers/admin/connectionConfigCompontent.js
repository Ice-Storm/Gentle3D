var db           = require('../../model/db.js');
var tools        = require('../tools/tools.js');
var error        = require('../../errors/index.js');
var uploadConfig = require('./uploadConfig.js');

module.exports.getData = function *(next) {
  var dataCollection,
      connection,
      logoObj;

  try{
     dataCollection = yield {
      connectionInfo: db.About.findById(1),
      logo: db.WebConfig.findById(1)
    }
  }
  catch(err) {
    error.dbError(err);
  }

  connection = tools.dealFindReuslt(dataCollection.connectionInfo);
  logoObj = tools.dealFindReuslt(dataCollection.logo);
  
  connection.logo = logoObj.logo ? logoObj.logo : '';
  connection.id = logoObj.id ? logoObj.logo.id : 1;
  
  return connection;
}

module.exports.getModal = function *(){
  return {
    title: '修改联系方式',
    url: 'indexConfigCompontent',
    type: 'post',
    flag: 'connection'
  }
};

module.exports.getUpload = function *(){
  var parms = { 
    title: '修改LOGO',
    url: './upload',
    flag: 'connection',
    entity: 'WebConfig',
    id: '',
    isNew: '',
    content: '',
    value: ''
  }

  return yield uploadConfig.getData(parms);
};