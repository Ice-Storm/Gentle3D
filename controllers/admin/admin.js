function *admin (next) {

  this.body = yield this.render('admin');

}

module.exports.admin = admin;