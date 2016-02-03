var _           = require('lodash'),
    URL         = require('url'),
    parseBody   = require('co-body'),
    parseUpload = require('co-busboy');

function *map(next) {
  var exeComponent,
      component = this.params.component,
      action = this.params.action,
      queryParms = URL.parse(this.request.url, true).query,
      body = {},
      postType = '';

  if(this.method == 'POST') {
    //判断post类型
    if(this.request.header['content-type']) {
      postType = this.request.header['content-type'].split(';')[0];
    }
    
    body.part = postType == 'multipart/form-data' ? parseUpload(this) : parseBody(this);

    body = yield body;
  }
  
  options = _.extend({}, queryParms, body, this.session);
  
  try {
    if(action) {
      exeComponent = yield function *() { return require('./' + component)[action]; }
    } else {
      action = this.method == 'POST' ? 'postData' : 'getData';
      exeComponent = yield function *() { return require('./' + component)[action]; } 
    }

    this.body = yield exeComponent(options);
  }
  catch(err) { 
    this.body = { state: 0, message: '服务器错误' }
  }

}

module.exports.map = map;