module.exports = function(){
  return function *(next){
    if(this.status == 404){
      this.request.url = '/notFound';
    }
    yield next;
  }
}