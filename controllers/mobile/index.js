var db = require('../../model/db.js');
var nav = require('../../public/mobile/common/head/nav.js');
var foot = require('../../public/mobile/common/foot/foot.js');
var content = require('../../public/mobile/index/index.js');
var tools = require('../tools/tools.js');
var error   = require('../../errors/index.js');
var URL  = require('url');

function *index(next){

  var parm = URL.parse(this.request.url, true).query;

  try{
    var dataCollection = yield {
      navData: db.Nav.findAllNavTitleAndNavUrl(),
      findWebConfig: db.WebConfig.findById(1)
    };  
  }
  catch(err){
    error.dbError(err);
  }
  
  var navList = {
    logo: tools.dealFindReuslt(dataCollection.findWebConfig).logo,
    headerMainPills: tools.dealFindReuslt(dataCollection.navData)
  }

  var contentMes = {
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
  }

  var footList = [
    { title: '电脑版', url: './?pc=true' },
    { title: '砖头社区', url: '#' },
    { title: '关于我们', url: '#' }
  ]

  var mobileNav = tools.reactRander(nav, navList);

  var mobileContent = tools.reactRander(content, contentMes);
  
  var mobileFoot = tools.reactRander(foot, { footList: footList });
 
  try{
    if(!parm.ajax){
      this.body = yield this.render('/mobile/index', {
        nav: mobileNav,
        content: mobileContent,
        foot: mobileFoot
      });
    } else{
      this.body = {
        imageShowList: contentMes.imageShowList,
        imageList: contentMes.imageList,
        footList: footList,
        navListHead: navList,
        navList: contentMes.navList
      }
    }
  }
  catch(err) {
    error.renderError(err);
  }
}

module.exports.index = index;
