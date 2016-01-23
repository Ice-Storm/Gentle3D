var combineReducers = require('redux');
var actions = require('./actions.js');
var store = require('./app.js').store;
var _       = require('lodash');

function counter(state, action) {
  switch (action.type) {
    case 'aa':
      state.st += 1;
      state.userName = '123';
      state.controlInfo[0].infoNum +=1;
      var a = _.extend({}, state);
      a.backBannerWhere = '123';
      return a
    case 'CHANGE_CRUMB':
      var newState = _.extend({}, state);
      newState.backBannerWhere = action.text;
      return newState
    default:
      return state
  }
}
module.exports = counter;