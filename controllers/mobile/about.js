var URL     = require('url');
var db      = require('../../model/db.js');
var nav     = require('../../public/mobile/common/head/nav.js');
var foot    = require('../../public/mobile/common/foot/foot.js');
var content = require('../../public/mobile/about/about.js');
var tools   = require('../tools/tools.js');
var error   = require('../../errors/index.js');

function *about(next){

  var parm = URL.parse(this.request.url, true).query;

  try{
    var dataCollection = yield {
      navData: db.Nav.findAllNavTitleAndNavUrl(),
      findWebConfig: db.WebConfig.findById(1),
      findConnection: db.About.findById(1),
      findImg: db.AboutImg.findAllImagesAndIntroduce()
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
    imageList: tools.dealFindReuslt(dataCollection.findImg),
    connectionList: tools.dealFindReuslt(dataCollection.findConnection)
  }

  var footList = [
    { title: '电脑版', url: './index' },
    { title: '砖头社区', url: '#' },
    { title: '关于我们', url: '#' }
  ]
  
  var mobileNav = tools.reactRander(nav, navList);
  
  var mobileContent = tools.reactRander(content, contentMes);
  
  var mobileFoot = tools.reactRander(foot, { footList: footList });

  try{
    if(!parm.ajax){
      this.body = yield this.render('/mobile/about', {
        nav: mobileNav,
        content: mobileContent,
        foot: mobileFoot
      });  
    } else{
      this.body = {
        navList: navList,
        footList: footList,
        content: contentMes
      }
    } 
  }
  catch(err){
    error.renderError(err);
  }
}

module.exports.about = about;
