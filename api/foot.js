var util = require('util');
var db = require('../model/db.js');
var tools = require('../controllers/tools/tools.js');
var error = require('../errors/index.js');

module.exports = {
  getData: function *(){
    var data;
  
    try{
      data = yield db.WebConfig.findById(1)
    }
    catch(err) {
      error.dbError(err);
    }

    return tools.dealResult(data)[0];
  },
  getMobileData: function *(){
    return [
      { title: '电脑版', url: './?pc=true' },
      { title: '砖头社区', url: '#' },
      { title: '关于我们', url: '#' }
    ];
  }
}