var db    = require('../model/db.js');
var tools = require('../controllers/tools/tools.js');
var error = require('../errors/index.js');

module.exports = {
  getData: function *(){
  
    try{
      var data = yield db.AboutImg.findAllImagesAndIntroduce();
    }
    catch(err) {
      error.dbError(err);
    }

    return tools.dealResult(data);
  }
}