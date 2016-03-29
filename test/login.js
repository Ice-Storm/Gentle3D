var superagent = require('superagent');
var agent      = superagent.agent();
var config     = require('../config.default.js');

var theAccount = {
  'userName': config.userName,
  'userPassword': config.userPassword
};

exports.login = function(request, done){
  request
  .post('/login')
  .send(theAccount)
  .end(function (err, res) {
    if(err){
      throw err;
    }
    agent.saveCookies(res);
    done(agent);
  });
};