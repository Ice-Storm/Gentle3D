var superagent = require('supertest');
var should = require('chai').should();
var app = require('../index.js');

function request() {
  return superagent(app.listen());
}

describe('Routes', function () {
  describe('GET /login', function () {
    it('should return 200', function (done) {
      request()
      .get('/login')
      .expect(200)
      .end(function(err, res){
        done();
      })
    });
  });
});

describe('Routes', function () {
  describe('POST /login', function () {
    it('Login error', function (done) {
      request()
      .post('/login')
      .send({userName: 'error', userPassword: 'error'})
      .expect(200)
      .end(function(err, res){
        res.res.body.should.be.all.keys('message', 'state', 'url');
        res.res.body.state.should.equal(0);
        res.res.body.url.should.equal('./login');
        done();
      })
    });

    it('Login success', function (done) {
      request()
      .post('/login')
      .send({userName: 'admin', userPassword: 'admin'})
      .expect(200)
      .end(function(err, res){
        //console.log(res.res.headers['set-cookie']);
        res.res.body.should.be.all.keys('message', 'state', 'url');
        res.res.body.state.should.equal(1);
        res.res.body.url.should.equal('./admin');
        done();
      })
    });
  });
});