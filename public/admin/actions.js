var CHANGE_CRUMB = 'CHANGE_CRUMB';

module.exports.changeCrumb = function(crumb){
  return {
    type: CHANGE_CRUMB,
    crumb: crumb
  }
}
