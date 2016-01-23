var superagent = require('supertest');
var should = require('chai').should();
var app = require('../index.js');
var login = require('./login.js');

function request() {
  return superagent(app.listen());
}

describe('Routes', function () {
  describe('GET /admin/indexConfigCompontent', function () {

    var agent;

    before(function (done) {
      login.login(request(), function (loginAgent) {
        agent = loginAgent;
        done();
      });
    });

    it('should return 200', function (done) {
      var req = request().get('/admin/indexConfigCompontent');
      agent.attachCookies(req);
      req.expect(200)
      .end(function(err, res){
        if (err) return done(err);
        res.body.should.be.an('object');
        for (var i in res.body) {
          res.body[i].should.be.a('array');
        }
        res.body.should.to.have.all.keys('menuName', 'indexNavPills', 'indexIntroList', 'footConfig', 'bannerConfig');
        done();
      })
    });
  });
});

describe('Routes', function () {
  describe('Post /indexConfigCompontent', function () {
    it('should return 200', function (done) {
      request()     
      .post('/indexConfigCompontent')
      .send({
        inputOne: 'data1',
        inputTwo: 'data2',
        flag: '3d_navlist',
        num: 0,
        id: '1'
      })
      .send({
        inputOne: 'data1',
        inputTwo: 'data2',
        flag: '3d_navlist',
        num: 5,
        id: '1'
      })
      .send({
        inputOne: 'data1',
        inputTwo: 'data2',
        flag: '3d_index_content',
        id: '1'
      })
       .send({
        inputOne: 'data1',
        inputTwo: 'data2',
        flag: '3d_webconfig',
        id: '1'
      })
      .end(function(err, res){
        if (err) return done(err);
        done();
      })
    });
  });
});


describe('Routes', function () {
  describe('GET Delete /admin/indexConfigCompontent/delete', function () {
     var agent;

    before(function (done) {
      login.login(request(), function (loginAgent) {
        agent = loginAgent;
        done();
      });
    });
    
    it('should return 200', function (done) {
      var req = request().get('/admin/indexConfigCompontent/delete?flag=0&id=1&num=0');
      agent.attachCookies(req);
      req.expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done();
      })
    });
  });
});

describe('Routes', function () {
  describe('Post /indexConfigCompontent/add', function () {
    it('should return 200', function (done) {
      request()     
      .post('/indexConfigCompontent')
      .send({
        inputOne: 'data1',
        inputTwo: 'data2',
        inputThree: 'data3',
        flag: '3d_navlist',
        num: 1,
        id: '1'
      })
      .end(function(err, res){
        if (err) return done(err);
        done();
      })
    });
  });
});