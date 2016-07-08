var util  = require('util');
var db    = require('../../model/db.js');
var tools = require('../tools/tools.js');

function *frontHead(next){
  
  var findCommonHead = db.Nav.findAllNavTitleAndNavUrl();

  var findWebConfig = db.WebConfig.findAll({ attributes: ['logo'] });

  var findReult = yield {
    findCommonHead: findCommonHead,
    findWebConfig: findWebConfig
  }

  var navList = tools.dealFindReuslt(findReult.findCommonHead);
  var headerMainPills = [];

  if(util.isObject(navList)) {
    headerMainPills.push(navList);
  }

  var logo = tools.dealFindReuslt(findReult.findWebConfig).logo;

  return {
    logoName: logo,
    headerMainPills: navList
  };

}

module.exports.getData = frontHead;