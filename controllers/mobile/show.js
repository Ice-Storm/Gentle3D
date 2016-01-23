require('node-jsx').install();

var React = require('react');
var db = require('../../model/db.js');
var nav = require('../../public/mobile/common/head/nav.js');
var foot = require('../../public/mobile/common/foot/foot.js');
var content = require('../../public/mobile/show/content.js');
var tools = require('../tools/tools.js');

function *show (next) {

  var navData = db.Nav.findAllNavTitleAndNavUrl();
  var findWebConfig = db.WebConfig.findById(1);

  var dataCollection = yield {
    navData: navData,
    findWebConfig: findWebConfig
  };
  
  var mobileNav = React.renderToString(
    React.createElement(nav, {
      logo: tools.dealFindReuslt(dataCollection.findWebConfig).logo,
      headerMainPills: tools.dealFindReuslt(dataCollection.navData)
    })
  )

  var mobileFoot = React.renderToString(
    React.createElement(foot, {
      footList: [
        { title: '电脑版', url: './index' },
        { title: '砖头社区', url: '#' },
        { title: '关于我们', url: '#' }
      ]
    })
  )

  var mobileContent = React.renderToString(
    React.createElement(content, {
     imageList: [
        { imgName: '1.jpg', url: './index' },
        { imgName: '2.jpg', url: '#' },
        { imgName: '3.jpg', url: '#' },
        { imgName: '4.jpg', url: '#' }
      ]
    })
  )

  this.body = yield this.render('/mobile/show', {
    nav: mobileNav,
    content: mobileContent,
    foot: mobileFoot
  });

}

module.exports.show = show;
