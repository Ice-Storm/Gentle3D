var util  = require('util');
var React = require('react');

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

module.exports.reactRander = reactRander;

module.exports.dealResult = dealResult;