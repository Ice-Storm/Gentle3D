require('node-jsx').install();

var React = require('react');
var db = require('../../model/db.js');
var nav = require('../../public/mobile/common/head/nav.js');
var foot = require('../../public/mobile/common/foot/foot.js');
var content = require('../../public/mobile/about/about.js');
var tools = require('../tools/tools.js');

function *about (next) {

  var navData = db.Nav.findAllNavTitleAndNavUrl();
  var findWebConfig = db.WebConfig.findById(1);
  var findConnection = db.About.findById(1);
  var findImg = db.AboutImg.findAllImagesAndIntroduce();

  var dataCollection = yield {
    navData: navData,
    findWebConfig: findWebConfig,
    findConnection: findConnection,
    findImg: findImg
  };
  
  var mobileNav = React.renderToString(
    React.createElement(nav, {
      logo: tools.dealFindReuslt(dataCollection.findWebConfig).logo,
      headerMainPills: tools.dealFindReuslt(dataCollection.navData)
    })
  )
  
  var mobileContent= React.renderToString(
    React.createElement(content, {
      imageList: tools.dealFindReuslt(dataCollection.findImg),
      connectionList: tools.dealFindReuslt(dataCollection.findConnection)
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

  this.body = yield this.render('/mobile/about', {
    nav: mobileNav,
    content: mobileContent,
    foot: mobileFoot
  });

}

module.exports.about = about;
