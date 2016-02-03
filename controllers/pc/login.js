require('node-jsx').install();

var React = require('react');
var parse = require('co-body');
var db = require('../../model/db.js');
var tools = require('../tools/tools.js');

function* login(next) {
  this.body = yield this.render('login');
}

function* loginP(next) {
  var reqParm = yield parse(this);
  
  var isUser = yield db.User.findAll({
    attributes: ['id', 'user_name', 'user_password', 'user_is_admin'],
    where: { user_name: reqParm.userName, user_password: reqParm.userPassword }
  })

  if(isUser.length == 0) {
    this.body = {
      message: '账号或密码错误',
      state: 0,
      url: './login'
    };
  } else {
    this.body = {
      message: '登录成功',
      state: 1,
      url: './admin'
    };
    this.session.adminId = isUser[0].dataValues.id;
    this.session.isAdmin = 1;
  }

}

module.exports.login = login;

module.exports.loginP = loginP;