var URL         = require('url');
var db          = require('../../model/db.js');
var frontHead   = require('../../public/common/frontHead/headMain.js');
var showPage    = require('../../public/pc/show/show.js');
var tools       = require('../tools/tools.js');
var frontFoot   = require('../../public/common/frontFoot/foot.js');
var frontBanner = require('../../public/common/frontBanner/banner.js');
var API         = require('../../api/api.js');

function *show(next){

  var parm = URL.parse(this.request.url, true).query;

  try {
    var data = yield {
      headParms: API.head.getData(),
      footParms: API.foot.getData(),
      findSlideAndContent: API.productAndSort.getData(),
      bannerParms: API.banner.getData('./show')
    };
  }
  catch(err) {
    error.dbError(err);
  }

  var frontHeadComponent = tools.reactRander(frontHead, data.headParms);

  var frontContentComponent = tools.reactRander(showPage, {
    slideList: data.findSlideAndContent.slideList,
    bannerContent: data.bannerParms,
    contentInfo: data.findSlideAndContent.contentInfo
  })

  var frontFootComponent = tools.reactRander(frontFoot, data.footParms);

  if(parm.ajax == 'true') {
    this.body = {
      slideCon: data.findSlideAndContent.slideList,
      showContent: data.findSlideAndContent.contentInfo,
      bannerTitle: data.bannerParms.bannerTitle,
      bannerContent: data.bannerParms.bannerContent
    }
  } else {
    try {
      this.body = yield this.render('show', {
        frontHeadComponent: frontHeadComponent,
        frontContentComponent: frontContentComponent,
        frontFootComponent: frontFootComponent
      });
    }
    catch(err) {
      error.renderError(err);
    }
  }
}

module.exports.show = show;