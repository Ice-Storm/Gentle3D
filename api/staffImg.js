var util  = require('util');
var db    = require('../model/db.js');
var tools = require('../controllers/tools/tools.js');
var error = require('../errors/index.js');

module.exports = {
  getData: function *(){
    var data;
  
    try{
      data = yield db.AboutImg.findAllImagesAndIntroduce();
    }
    catch(err) {
      error.dbError(err);
    }

    return tools.dealResult(data);
  }
}