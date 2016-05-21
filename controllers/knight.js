function *knight (next){
  this.body = yield this.render('knight');
}

module.exports.knight = knight;