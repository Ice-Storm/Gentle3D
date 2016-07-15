var URL     = require('url');
var db      = require('../../model/db.js');
var nav     = require('../../public/mobile/common/head/nav.js');
var foot    = require('../../public/mobile/common/foot/foot.js');
var content = require('../../public/mobile/index/index.js');
var tools   = require('../tools/tools.js');
var error   = require('../../errors/index.js');
var API     = require('../../api/api.js');

function *mindex(next){

  var parm = URL.parse(this.request.url, true).query;

  try{
    var dataCollection = yield {
      navData: db.Nav.findAllNavTitleAndNavUrl(),
      findWebConfig: db.WebConfig.findById(1),
      conImg: db.ShowContent.findAll({
        where: { 'foreign_sort': 'mobileIndex' },
        attributes: ['imgName']
      })
    };  
  }
  catch(err){
    error.dbError(err);
  }
  
  var navList = {
    logo: tools.dealResult(dataCollection.findWebConfig)[0].logo,
    headerMainPills: tools.dealResult(dataCollection.navData)
  }

  var contentMes = {
    imageList: tools.dealResult(dataCollection.conImg),
    imageShowList: [ { imgName: '3.jpg' } ],
    navList: tools.dealResult(dataCollection.navData)
  }

  var footList = yield API.foot.getMobileData();

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

module.exports.mindex = mindex;
