var db = require('../../model/db.js');
var nav = require('../../public/mobile/common/head/nav.js');
var foot = require('../../public/mobile/common/foot/foot.js');
var content = require('../../public/mobile/show/content.js');
var tools = require('../tools/tools.js');
var error   = require('../../errors/index.js');

function *show(next){

  try{
    var dataCollection = yield {
      navData: db.Nav.findAllNavTitleAndNavUrl(),
      findWebConfig: db.WebConfig.findById(1)
    }
  }
  catch(err){
    error.dbError(err);
  }
  
  var mobileNav = tools.reactRander(nav, {
    logo: tools.dealFindReuslt(dataCollection.findWebConfig).logo,
    headerMainPills: tools.dealFindReuslt(dataCollection.navData)
  })

  var mobileFoot = tools.reactRander(foot, {
    footList: [
      { title: '电脑版', url: './index' },
      { title: '砖头社区', url: '#' },
      { title: '关于我们', url: '#' }
    ]
  })

  var mobileContent = tools.reactRander(content, {
   imageList: [
      { imgName: '1.jpg', url: './index' },
      { imgName: '2.jpg', url: '#' },
      { imgName: '3.jpg', url: '#' },
      { imgName: '4.jpg', url: '#' }
    ]
  })

  try{
    this.body = yield this.render('/mobile/show', {
      nav: mobileNav,
      content: mobileContent,
      foot: mobileFoot
    });  
  }
  catch(err){
    error.renderError(err);
  }
}

module.exports.show = show;
