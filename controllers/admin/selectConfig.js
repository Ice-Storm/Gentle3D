var util  = require('util');
var tools = require('../tools/tools.js');
var db    = require('../../model/db.js');
var error = require('../../errors/index.js');

function *selectConfig(){
  var resultArr = [],
      findResult;

  try {
    findResult = yield db.ShowSlide.findAll({
      attributes: ['sort', 'flag', 'point'],
      group: ['sort'],
      where: { flag: "1" }
    })
  }
  catch(err){
    error.dbError(err);
  }
  
  util.isArray(findResult) ? resultArr = findResult : resultArr.push(findResult);

  return resultArr;
}

module.exports.getData = selectConfig; 