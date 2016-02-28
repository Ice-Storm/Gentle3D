var URL = require('url');

module.exports = function(){
  return function *(next) {
    var ua = this.state.userAgent;
    var queryParm = URL.parse(this.url, true).query;

    if(ua.isMobile && queryParm.pc != 'true' && ua.platform == 'iPhone' || ua.platform == 'Android'){
      this.request.url = '/mobile' + this.request.url; 
      yield next;
    } else {
      yield next;
    }
  }
}