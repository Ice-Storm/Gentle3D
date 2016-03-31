var parse = require('co-body');
var db    = require('../../model/db.js');
var tools = require('../tools/tools.js');
var Login = require('../../public/pc/login/login.js');
var error = require('../../errors/index.js');

function *login(next){
  
  var loginModal = tools.reactRander(Login, { imgName: 'user.jpg' });

  this.body = yield this.render('login', { login: loginModal });
}

function *loginP(next){
  var reqParm = yield parse(this);
 
  try {
    var isUser = yield db.User.findAll({
      attributes: ['id', 'user_name', 'user_password', 'user_is_admin'],
      where: { user_name: reqParm.userName, user_password: reqParm.userPassword }
    }) 
  }
  catch(err) {
    error.dbError(err);
  }

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