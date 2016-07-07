var db    = require('../model/db.js');
var tools = require('../controllers/tools/tools.js');
var error = require('../errors/index.js');

module.exports = {
  getData: function *() {
   
   try{
      var data = yield {
        findIndexContent: db.Index.findAllLimit(4),
        findCommonHead: db.Nav.findAllNavTitleAndNavUrl(),
        findContentImg: db.IndexImg.findAllImages(),
        findWebConfig: db.WebConfig.findById(1)
      }
    }
    catch(err) {
      error.dbError(err);
    }

    function createButtonList(headArr, buttonStyleList) {
      var buttonList = [];
      var style = buttonStyleList;
      for(var i = 0; i < headArr.length; i++) {
        var tempObj = {};
        tempObj.buttonFont = headArr[i].navTitle || '';
        tempObj.url = headArr[i].navUrl || '#';
        buttonList.push(tempObj);
      }
      return buttonList;
    }

    var mainImg = tools.dealResult(data.findContentImg)[0].imgName;

    var compony = data.findWebConfig.compony ? data.findWebConfig.compony : '';

    var buttonList = createButtonList(tools.dealResult(data.findCommonHead));

    var contentIntroduceData = tools.dealResult(data.findIndexContent);

    var tempArr = [];

    tempArr.push({
      imgName: mainImg,
      contentFont: compony,
      isHaveButton: true,
      buttonList: buttonList
    });

    var resultObj = {
      contentMainList: tempArr,
      introduceContent: contentIntroduceData
    }

    return resultObj;
  }
}