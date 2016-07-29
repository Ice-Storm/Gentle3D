var superagent = require('supertest');
var should     = require('chai').should();
var app        = require('../index.js');
var config     = require('../config.default.js');
var db         = require('../model/db.js');

function request() {
  return superagent(app.listen());
}

describe('Routes', function () {

  //等待数据库创建完成（写的不好，但是目前还没想出好方法）
  before(function (done) {
    setTimeout(function(){
      done()
    }, 1000);
  });

  it('GET /login', function (done) {
    request()
    .get('/login')
    .expect(200)
    .end(function(err, res){
      done();
    });
  });

  it('Login error', function (done) {
    request()
    .post('/login')
    .send({userName: 'error', userPassword: 'error'})
    .expect(200)
    .end(function(err, res){
      res.body.should.be.all.keys('message', 'state', 'url');
      res.body.state.should.equal(0);
      res.body.url.should.equal('./login');
      done();
    })
  });

  it('Login success', function (done) {
    request()
    .post('/login')                  
    .send({userName: config.userName, userPassword: config.userPassword})
    .expect(200)
    .end(function(err, res){
      res.body.should.be.all.keys('message', 'state', 'url');
      res.body.state.should.equal(1);
      res.body.url.should.equal('./admin');
      done();
    })
  });
});