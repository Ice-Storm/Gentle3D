var Redux = require('redux');

module.exports.imgControlState = function(actionType){
  return {
    type: 'CHANGE_IMG_CONTROL',
    action: actionType
  }
}

module.exports.changeCrumb = function(event){
  return {
    type: 'CHANGE_CRUMB',
    text: event.target.innerText
  }
}
