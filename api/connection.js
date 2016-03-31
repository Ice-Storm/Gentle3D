var db    = require('../model/db.js');
var tools = require('../controllers/tools/tools.js');
var error = require('../errors/index.js');

module.exports = {
  getData: function *(){

    try{
      var data = yield db.About.findById(1);
      var logo = yield db.WebConfig.findById(1);
    }
    catch(err) {
      error.dbError(err);
    }

    return {
      logo: tools.dealResult(logo)[0], 
      con: tools.dealResult(data)[0]
    };
  }
}