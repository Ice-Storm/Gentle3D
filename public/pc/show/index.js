var React       = require('react');
var ContentMain = require('./show.js');

$.get('/show?ajax=true', function (data) {
  React.render(<ContentMain
    slideList = { data.slideCon }
    bannerContent = { data }
    contentInfo = { data.showContent }/>,
    document.getElementById('content'))
})