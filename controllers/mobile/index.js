var db = require('../../model/db.js');
var nav = require('../../public/mobile/common/head/nav.js');
var foot = require('../../public/mobile/common/foot/foot.js');
var content = require('../../public/mobile/index/index.js');
var tools = require('../tools/tools.js');
var error   = require('../../errors/index.js');

function *index(next){

  try{
    var dataCollection = yield {
      navData: db.Nav.findAllNavTitleAndNavUrl(),
      findWebConfig: db.WebConfig.findById(1)
    };  
  }
  catch(err){
    error.dbError(err);
  }
  
  var mobileNav = tools.reactRander(nav, {
    logo: tools.dealFindReuslt(dataCollection.findWebConfig).logo,
    headerMainPills: tools.dealFindReuslt(dataCollection.navData)
  })

  var mobileContent = tools.reactRander(content, {
    imageList: [
      { imgName: '6.jpg' },
      { imgName: '7.jpg' }
    ],
    imageShowList: [
      { imgName: '3.jpg' }
    ],
    navList: [
      { navName: '产品展示', url: './show', iconName: 'fa fa-paper-plane-o' },
      { navName: '关于我们', url: './about', iconName: 'fa fa-fighter-jet' },
      { navName: '关于我们', url: './about', iconName: 'fa fa-pencil' },
      { navName: '产品展示', url: './show', iconName: 'fa fa-bicycle' }
    ]
  })
  
  var mobileFoot = tools.reactRander(foot, {
    footList: [
      { title: '电脑版', url: './index' },
      { title: '砖头社区', url: '#' },
      { title: '关于我们', url: '#' }
    ]
  })

  try{
    this.body = yield this.render('/mobile/index', {
      nav: mobileNav,
      content: mobileContent,
      foot: mobileFoot
    });
  }
  catch(err) {
    error.renderError(err);
  }
}

module.exports.index = index;
