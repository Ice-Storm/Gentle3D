var _               = require('lodash');
var combineReducers = require('redux');
var actions         = require('./actions.js');

function counter(state, action) {
  switch (action.type) {
    case 'CHANGE_CRUMB':
      var newState = _.extend({}, state);
      newState.crumb = action.crumb;
      return newState
    default:
      return state
  }
}

module.exports = counter;