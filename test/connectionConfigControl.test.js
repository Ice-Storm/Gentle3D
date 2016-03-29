var superagent = require('supertest');
var should     = require('chai').should();
var app        = require('../index.js');
var login      = require('./login.js');

function request() {
  return superagent(app.listen());
}

describe('Routes', function () {
  describe('GET /admin/connectionConfigCompontent', function () {

    var agent;

    before(function (done) {
      login.login(request(), function (loginAgent) {
        agent = loginAgent;
        done();
      });
    });

    it('GET /admin/connectionConfigCompontent', function (done) {
      var req = request().get('/admin/connectionConfigCompontent');
      agent.attachCookies(req);
      req.expect(200)
      .end(function(err, res){
        if (err) return done(err); 
        res.body.should.be.an('object');
        for (var i in res.body) {
          res.body[i].should.to.exist;
        }
        done();
      })
    });
  });
});