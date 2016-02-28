require('node-jsx').install();

var React     = require('react');
var db        = require('../../model/db.js');
var tools     = require('../tools/tools.js');
var frontHead = require('../../public/common/frontHead/headMain.js');
var content   = require('../../public/index/content/content.js');
var frontFoot = require('../../public/common/frontFoot/foot.js');
var API       = require('../../api/api.js');

function *index(next){

  try{
    var data = yield {
      findCommonHead: API.head.getData(),
      findMainIntroduce: API.mainIntroduce.getData(),
      findWebConfig: API.foot.getData()
    };
  }
  catch(err){
    error.dbError(err);
  }
  
  var frontHeadComponent = tools.reactRander(frontHead, data.findCommonHead);

  var contentMainComponent = tools.reactRander(content.contentMain, data.findMainIntroduce );

  var frontFootComponent = tools.reactRander(frontFoot, data.findWebConfig);

  try {
    this.body = yield this.render('index', {
      frontHeadComponent: frontHeadComponent,
      contentMainComponent: contentMainComponent,
      frontFootComponent: frontFootComponent
    });
  }
  catch(err) {
    error.renderError(err);
  }
}

module.exports.index = index;
