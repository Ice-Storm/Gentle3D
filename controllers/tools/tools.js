var util = require('util');
var React = require('react');

var getObjVal = function(obj, item) {
  if(item && obj[item]) {
    return obj[item];
  } else{
    return '';
  } 
}

var dealFindReuslt = function (arr) {
  var resultArr = [];

  if(!util.isArray(arr) && util.isObject(arr) && arr.dataValues) {
    return arr.dataValues;
  }

  if(!util.isArray(arr)) {
    return arr;
  }

  if(arr.length == 1) {
    return arr[0].dataValues;
  }

  for (var i = 0; i < arr.length; i++) {
    if(arr[i].dataValues) {
      resultArr.push(arr[i].dataValues);  
    }
  }

  return resultArr;
}

var reactRander = function(component, parmObj) {
  var parmObj = parmObj || {};
  if(!arguments[0]) {
    console.log('tool - reactRander component not found!');
    return;
  }
  return React.renderToString(React.createElement(component, parmObj));
}

var dealResult = function(arr) {
  var resultArr = [];

  if(util.isArray(arr)) {
    for (var i = 0; i < arr.length; i++) {
      if(arr[i].dataValues) {
        resultArr.push(arr[i].dataValues);  
      }
    }    
  }

  if(arr && arr.dataValues) {
    resultArr.push(arr.dataValues);
  }

  return resultArr;
}

module.exports.dealFindReuslt = dealFindReuslt;

module.exports.getObjVal = getObjVal;

module.exports.reactRander = reactRander;

module.exports.dealResult = dealResult;