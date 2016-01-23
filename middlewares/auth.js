module.exports = function () {
  return function *(next) {
    if(this.url.indexOf('admin') == '1') {
      if(this.session.isAdmin) {
        yield next;
      }
    } else {
      yield next;
    }
  }
}