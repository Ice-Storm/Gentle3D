/*var superagent = require('supertest');
var should = require('chai').should();
var app = require('../index.js');
var login = require('./login.js');

function request() {
  return superagent(app.listen());
}


describe('POST /admin/upload', function () {
  var agent;

  before(function (done) {
    login.login(request(), function (loginAgent) {
      agent = loginAgent;
      done();
    });
  });

  it('should return 200', function (done) {
    var req = request().post('/admin/upload?id=1&entity=3d_webConfig&isNew=true&content=111&value=111&flag=index')
    agent.attachCookies(req);
    req.expect(200)
    .send({name: '1'})
    .end(function(err, res){
      if (err) return done(err);
      done();
    })
  });
});
*/