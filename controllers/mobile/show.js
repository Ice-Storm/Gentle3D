var URL     = require('url');
var db      = require('../../model/db.js');
var nav     = require('../../public/mobile/common/head/nav.js');
var foot    = require('../../public/mobile/common/foot/foot.js');
var content = require('../../public/mobile/show/content.js');
var tools   = require('../tools/tools.js');
var error   = require('../../errors/index.js');
var API     = require('../../api/api.js');

function *show(next){

  var parm = URL.parse(this.request.url, true).query;

  try{
    var dataCollection = yield {
      navData: db.Nav.findAllNavTitleAndNavUrl(),
      findWebConfig: db.WebConfig.findById(1),
      imageList: db.ShowContent.findAll({ 
        attributes: ['imgName', ['content', 'url']],
        where: { foreign_sort: 'mobile' }
      })
    }
  }
  catch(err){
    error.dbError(err);
  }

  var navList = {
    logo: tools.dealResult(dataCollection.findWebConfig)[0].logo,
    headerMainPills: tools.dealResult(dataCollection.navData)
  }
  
  var footList = yield API.foot.getMobileData();

  var mobileNav = tools.reactRander(nav, navList);

  var mobileFoot = tools.reactRander(foot, { footList: footList });

  var mobileContent = tools.reactRander(content, { imageList: tools.dealResult(dataCollection.imageList) });

  try{
    if(parm.ajax != 'true'){
      this.body = yield this.render('/mobile/show', {
        nav: mobileNav,
        content: mobileContent,
        foot: mobileFoot
      });  
    } else{
      this.body = {
        imageList: tools.dealResult(dataCollection.imageList),
        footList: footList,
        navListHead: navList
      }
    }
  }
  catch(err){
    error.renderError(err);
  }
}

module.exports.show = show;
