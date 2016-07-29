var util = require('util');

var errors = {
  throwError: function(err) {
    if(!err) { err = new Error('An error occurred'); }
    if (util.isString(err)) { throw new Error(err); }
    throw err;
  },

  renderError: function(err) {
    console.log(err);
  },

  dbError: function(err) {
    console.log(err);
  },

  uploadError: function(err) {console.log(err);}
}

module.exports = errors;