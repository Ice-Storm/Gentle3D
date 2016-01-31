var combineReducers = require('redux');
var actions = require('./actions.js');
var store = require('./app.js').store;
var _       = require('lodash');

function counter(state, action) {
  switch (action.type) {
    case 'CHANGE_IMG_CONTROL':
      var cState = 0;
      if(action.actionType == 'mouseOn'){
        cState = 1;
      } else if(action.actionType == 'mouseOver'){
        cSatet = 0;
      }
      var newState = _.extend({}, state);
      newState.isExistsImgConBlock = cSate;
      return newState
    case 'CHANGE_CRUMB':
      var newState = _.extend({}, state);
      newState.backBannerWhere = action.text;
      return newState
    default:
      return state
  }
}
module.exports = counter;