var _           = require('lodash');
var URL         = require('url');
var parseBody   = require('co-body');
var parseUpload = require('co-busboy');
var path        = require('path');
var mapJson     = require('./map.json');

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
          dFun = yield function *(){ return require('./' + filePath + '.js')[mapFile]; }
        } catch(err) {
          dFun = yield function *(){ 
            return require('./' + path.join(dir, mapJson['notFound']) + '.js')['notFound'];
          }
        }
        yield dFun;
      }

      if(this.method == 'POST'){
        try {
          dFun = yield function *(){ return require('./' + filePath + '.js')[mapFile + 'Post']; }
        } catch(err) {
          console.log(err)
          dFun = yield function *(){ 
            return { state: 0, message: '服务器错误' };
          }
        }
        yield dFun;
      } 
    }
  }
}

module.exports.proxy = proxy;
