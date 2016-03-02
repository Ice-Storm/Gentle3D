var util  = require('util');
var db    = require('../model/db.js');
var tools = require('../controllers/tools/tools.js');
var error = require('../errors/index.js');

module.exports = {
  getData: function *(url){
    var data;
  
    try{
      data = yield db.Nav.findBannerByUrl(url);
    }
    catch(err) {
      error.dbError(err);
    }

    return tools.dealResult(data)[0];
  }
}