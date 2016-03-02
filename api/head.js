var util  = require('util');
var db    = require('../model/db.js');
var tools = require('../controllers/tools/tools.js');
var error = require('../errors/index.js');

module.exports = {
  getData: function *(){
    var logo,
        webConfig,
        headerMainPills,
        resultObj,
        data;
  
    try{
      data = yield {
        findCommonHead: db.Nav.findAllNavTitleAndNavUrl(),
        findWebConfig: db.WebConfig.findById(1)
      }
    }
    catch(err) {
      error.dbError(err);
    }
  
    webConfig = tools.dealResult(data.findWebConfig)[0];

    logo = webConfig.logo ? webConfig.logo : '';

    headerMainPills = tools.dealResult(data.findCommonHead);

    resultObj = {
      logo: logo,
      headerMainPills: headerMainPills
    }

    return resultObj;
  }
}