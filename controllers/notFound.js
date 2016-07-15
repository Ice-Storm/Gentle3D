function *notFound (next){
  this.body = '404页面还没写好'//yield this.render('notFound');
}

module.exports.notFound = notFound;