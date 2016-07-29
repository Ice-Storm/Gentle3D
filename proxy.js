var _           = require('lodash');
var URL         = require('url');
var parseBody   = require('co-body');
var parseUpload = require('co-busboy');
var path        = require('path');
var mapJson     = require('./map.json');
var errors      = require('./errors/index.js');

function proxy(dir){

  function eleNum(obj){
    var count = 0;
    for(var i in obj){
      count++;
    }
    return count;
  }

  return function *deal(next){
    if(this.params.page && 1 <= eleNum(this.params) <= 2){
      if(this.params.page == 'mobile' && eleNum(this.params) == 2) {
        this.params.page = 'm' + this.params.m;
      }

      var dFun = '';
      var mapFile = this.params.page;
      var filePath = mapJson[mapFile] ? path.join(dir, mapJson[mapFile]) : '';

      if(this.method == 'GET'){
        try {
          dFun = yield function *(){ return require('./' + filePath + '.js')[mapFile]; };
        } catch(err) {
          dFun = yield function *(){ 
            return require('./' + path.join(dir, mapJson['notFound']) + '.js')['notFound'];
          }
        }
        yield dFun;
      }

      if(this.method == 'POST'){
        try {
          dFun = yield function *(){ return require('./' + filePath + '.js')[mapFile + 'Post']; };
        } catch(err) {
          errors.console(err);
          dFun = yield function *(){ 
            return { state: 0, message: '服务器错误' };
          }
        }
        yield dFun;
      } 
    }
  }
}

function listen(app, port){
  var opts = process.argv;
  var isListener = 0;

  if(!app && !port){
    errors.throwError('app or port is not found!');
  }

  for (var i = 0; i < opts.length; i++){
    if(opts[i].indexOf('-ci') == 0) {
      isListener = 1;
    }
  }

  if(isListener === 0) {
    console.log('Welcome use Gentle3D ！');
    console.log('App is listening port ' + port + ' ......');
    return app.listen(port);
  } else {
    process.exit(0);
  }
}

module.exports.proxy = proxy;

module.exports.listen = listen;
