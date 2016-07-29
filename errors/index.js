var util = require('util');

var errors = {
  throwError: function(err) {
    if(!err) { err = new Error('An error occurred'); }
    if (util.isString(err)) { throw new Error(err); }
    throw err;
  },

  renderError: function(err) {
    console.error(err);
  },

  dbError: function(err) {
    console.error(err);
  },

  uploadError: function(err) {
    console.log(err);
  },

  console: function(err) {
    console.error(err);
  }
}

module.exports = errors;