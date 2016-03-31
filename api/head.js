var util  = require('util');
var db    = require('../model/db.js');
var tools = require('../controllers/tools/tools.js');
var error = require('../errors/index.js');

module.exports = {
  getData: function *(){
  
    try{
      var data = yield {
        findCommonHead: db.Nav.findAllNavTitleAndNavUrl(),
        findWebConfig: db.WebConfig.findById(1)
      }
    }
    catch(err) {
      error.dbError(err);
    }
  
    var webConfig = tools.dealResult(data.findWebConfig)[0];

    var logo = webConfig.logo ? webConfig.logo : '';

    var headerMainPills = tools.dealResult(data.findCommonHead);

    var resultObj = {
      logo: logo,
      headerMainPills: headerMainPills
    }

    return resultObj;
  }
}