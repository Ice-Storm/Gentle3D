require('node-jsx').install();

var React = require('react');
var db = require('../../model/db.js');
var tools = require('../tools/tools.js');
var frontHead = require('../../public/common/frontHead/headMain.js');
var frontBanner = require('../../public/common/frontBanner/banner.js');
var aboutPage = require('../../public/about/about.js');
var frontFoot = require('../../public/common/frontFoot/foot.js');
var API = require('../../api/api.js');
var error = require('../../errors/index.js');

function *about (next) {

  try {
    var data = yield {
      headParms: API.head.getData(),
      footParms: API.foot.getData(),
      connectionParms: API.connection.getData(),
      bannerParms: API.banner.getData('./about'),
      staffParms: API.staffImg.getData()
    }
  }
  catch(err) {
    error.dbError(err);
  }

  var aboutPageParm = {
    bannerContent: data.bannerParms,
    contentInfo: {
      memberList: data.staffParms,
      content: data.connectionParms.introduce
    },
    connection: data.connectionParms.con
  }

  var frontHeadComponent = tools.reactRander(frontHead, data.headParms);
  
  var frontAboutComponent = tools.reactRander(aboutPage.aboutMain, aboutPageParm);
  
  var frontFootComponent = tools.reactRander(frontFoot, data.footParms);

  try {
    this.body = yield this.render('about', {
      frontHeadComponent: frontHeadComponent,
      frontAboutComponent: frontAboutComponent,
      frontFootComponent: frontFootComponent
    });  
  }
  catch(err) {
    error.renderError(err);
  }

}

module.exports.about = about;
