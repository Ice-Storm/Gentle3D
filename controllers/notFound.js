function *notFound (next){
  this.body = yield this.render('notFound');
}

module.exports.notFound = notFound;