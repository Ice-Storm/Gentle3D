var _           = require('lodash');
var URL         = require('url');
var parseBody   = require('co-body');
var parseUpload = require('co-busboy');
var errors      = require('../../errors/index.js');

function *map(next){
  /**
   *  TODO: 将不同的动作映射到不同的文件
   */
  var component = this.params.component;
  var action = this.params.action;
  var queryParms = URL.parse(this.request.url, true).query;
  var body = {};
  
  if(this.method == 'POST'){
    //判断post类型
    if(this.request.header['content-type']){
      var postType = this.request.header['content-type'].split(';')[0];
    }

    body.part = postType == 'multipart/form-data' ? parseUpload(this) : parseBody(this);
    
    body = yield body;
  }
  
  var options = _.extend({}, queryParms, body, this.session);

  try{
    if(action){
      var exeComponent = yield function *(){ return require('./' + component)[action]; }
    } else{
      action = this.method == 'POST' ? 'postData' : 'getData';
      var exeComponent = yield function *(){ return require('./' + component)[action]; } 
    }

    this.body = yield exeComponent(options);
  }
  catch(err) {
    errors.console(err);
    this.body = { state: 0, message: '服务器错误' }
  }
}

module.exports.map = map;