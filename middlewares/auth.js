/**
 * TODO: 根据URL以及session判断是否有访问后台的权限
 */
module.exports = function(){
  return function *(next) {
    if(this.url.indexOf('admin') == 1){
      if(this.session.isAdmin) {
        yield next;
      }
    } else {
      yield next;
    }
  }
}