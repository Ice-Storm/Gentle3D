var React       = require('react');
var Ajax        = require('@fdaciuk/ajax');
var ContentMain = require('./show.js');

Ajax().get('/show?ajax=true').then(function (data){
  React.render(<ContentMain
    slideList = { data.slideCon }
    bannerContent = { data }
    contentInfo = { data.showContent }/>,
    document.getElementById('content'))
})