var util = require('util');

var errors = {
  throwError: function(err) {
    if(!err) {
      err = new Error('An error occurred');
    }

    if (util.isString(err)) {
      throw new Error(err);
    }

    throw err;
  },

  renderError: function(err) {
    console.log(err);
  },

  dbError: function(err) {
    console.log(err);
    console.log('-----------------');
  },

  uploadError: function(err) {console.log(err);},

  error500: function() {},

  error404: function() {}

}

module.exports = errors;