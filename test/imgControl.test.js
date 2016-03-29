var superagent = require('supertest');
var agent      = superagent.agent();
var should     = require('chai').should();
var app        = require('../index.js');
var login      = require('./login.js');

function request() {
  return superagent(app.listen());
}

describe('Routes', function () {
  describe('GET /admin/imgControlCompontent', function () {

    var agent;

    before(function (done) {
      login.login(request(), function (loginAgent) {
        agent = loginAgent;
        done();
      });
    });

    it('GET /admin/imgControlCompontent', function (done) {
      var req = request().get('/admin/imgControlCompontent');
      agent.attachCookies(req);
      req.expect(200)
      .end(function(err, res){
        if (err) return done(err);
        res.body.should.be.an('object');
        for (var i in res.body) {
          res.body[i].should.be.a('object');
          res.body[i].should.to.have.all.keys('url', 'imgList');
          res.body[i].imgList.should.be.an('array');
          for(var j = 0; j < res.body[i].imgList.length; j++) {
            res.body[i].imgList[j].should.have.any.keys('imgName', 'name', 'id');
          }
        }
        done();
      })
    });
  });
});