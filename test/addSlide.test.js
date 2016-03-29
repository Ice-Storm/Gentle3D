var superagent = require('supertest');
var should     = require('chai').should();
var app        = require('../index.js');
var login      = require('./login.js');
var db         = require('../model/db.js');

function request() {
  return superagent(app.listen());
}

describe('Routes', function () {
  describe('GET /admin/changSlideCompontent', function () {

    var agent;

    before(function (done) {
      var isHaveData = 0;
      db.sequelize.sync().then(function(){
        return db.User.findById(1);
      }).then(function(data){
        if(data && data.dataValues){
          return isHaveData = 1;
        }
      }).then(function(){
        if(isHaveData == 0){
          db.bulkData();
        }
      }).then(function(){
        login.login(request(), function (loginAgent) {
          agent = loginAgent;
          done();
        })
      })
      .catch(function (err){
        console.error('数据库初始化失败！');
        console.error(err);
        process.exit(1);
      });
    })
    
    after(function (done) {
      var data = db.defaultData.showSlide[0];
      data.id = 1;
      db.ShowSlide.build(data).save();
      done();
    });

    it('Get show page showSlide data ', function (done) {
      var req = request().get('/admin/changSlideCompontent');
      agent.attachCookies(req);
      req.expect(200)
      .end(function(err, res){
        if (err) return done(err);
        res.body.should.be.an('array');
        for (var i = 0; i < res.body.length; i++) {
          res.body[i].should.be.a('object');
          res.body[i].should.to.have.all.keys('id', 'sort', 'point', 'flag');
        }
        done();
      })
    });

    it('Update success show page showSlide data', function (done) {
      var id = 1;
      var url = '/admin/changSlideCompontent/update?id=' + id;
      var req = request().post(url);
      agent.attachCookies(req);
      req.send({
        sort: '3D打印',
        flag2: '1',
        point: '0'
      })
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done();
      })
    });

    it('Update error show page showSlide data', function (done) {
      var id = 1;
      var url = '/admin/changSlideCompontent/update?id=' + id;
      var req = request().post(url);
      agent.attachCookies(req);
      req.send({
        sort: '3D打印',
        XXXXXX: '1',
        point: '0'
      })
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done();
      })
    });

    it('Delete success show page showSlide data', function (done) {
      var id = 1;
      var url = '/admin/changSlideCompontent/delete?id=' + id;
      var req = request().get(url);
      agent.attachCookies(req);
      req.expect(200)
      .end(function(err, res){
        if (err) return done(err);
        res.body.should.be.an('object');
        res.body.state.should.equal(1);
        res.body.should.to.have.all.keys('message', 'state');
        done();
      })
    });

    it('Delete error show page showSlide data', function (done) {
      var id = 99999;
      var url = '/admin/changSlideCompontent/delete?id=' + id;
      var req = request().get(url);
      agent.attachCookies(req);
      req.expect(200)
      .end(function(err, res){
        if (err) return done(err);
        res.body.should.be.an('object');
        res.body.state.should.equal(0);
        res.body.should.to.have.all.keys('message', 'state');
        done();
      })
    });

    it('Get modal data success show page showSlide', function (done) {
      var url = '/admin/changSlideCompontent/create';
      var req = request().get(url);
      agent.attachCookies(req);
      req.expect(200)
      .end(function(err, res){
        if (err) return done(err);
        res.body.should.be.an('object');
        for(var i in res.body) {
           res.body[i].should.be.an('object');
          if(i == 'config') {
            res.body[i].should.to.have.all.keys('title', 'url', 'type');
          } else {
            res.body[i].should.to.have.all.keys('title', 'name', 'placeholder', 'type');
          } 
        }
        done();
      })
    });

    it('Get editor modal data success show page showSlide', function (done) {
      var url = '/admin/changSlideCompontent/addModal';
      var req = request().get(url);
      agent.attachCookies(req);
      req.expect(200)
      .end(function(err, res){
        if (err) return done(err);
        res.body.should.be.an('object');
        for(var i in res.body) {
           res.body[i].should.be.an('object');
          if(i == 'config') {
            res.body[i].should.to.have.all.keys('title', 'url', 'type');
          } else {
            res.body[i].should.to.have.all.keys('title', 'name', 'placeholder', 'type');
          } 
        }
        done();
      })
    });
  });
});


