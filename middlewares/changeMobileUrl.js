module.exports = function () {
  return function *(next) {
    if(this.state.userAgent.isMobile
       && this.state.userAgent.platform == 'iPhone'
       || this.state.userAgent.platform == 'Android') {
      this.request.url = '/mobile' + this.request.url; 
      yield next;
    } else {
      yield next;
    }
  }
}