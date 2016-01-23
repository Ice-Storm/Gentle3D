var superagent = require('supertest');
var should = require('chai').should();
var app = require('../index.js');
var login = require('./login.js');

function request() {
  return superagent(app.listen());
}

describe('Routes', function () {
  describe('GET uploadImg sort seccuss', function () {

   var agent;

    before(function (done) {
      login.login(request(), function (loginAgent) {
        agent = loginAgent;
        done();
      });
    });

    it('should return 200', function (done) {
      var req = request().get('/admin/selectConfig');
      agent.attachCookies(req);
      req.expect(200)
      .end(function(err, res){
        if (err) return done(err); 
        res.body.should.be.an('array');
        for (var i in res.body) {
          res.body.should.to.have.all.keys('sort', 'point', 'flag');
        }
        done();
      })
    });
  });
});