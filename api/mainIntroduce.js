var util  = require('util');
var db    = require('../model/db.js');
var tools = require('../controllers/tools/tools.js');
var error = require('../errors/index.js');

module.exports = {
  getData: function *() {
    var data,
        buttonList,
        resultObj,
        compony,
        contentIntroduceData,
        mainImg,
        tempArr;
  
    try{
      data = yield {
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

    mainImg = tools.dealResult(data.findContentImg)[0].imgName;

    compony = data.findWebConfig.compony ? data.findWebConfig.compony : '';

    buttonList = createButtonList(tools.dealResult(data.findCommonHead));

    contentIntroduceData = tools.dealResult(data.findIndexContent);

    tempArr = [];
    tempArr.push({
      imgName: mainImg,
      contentFont: compony,
      isHaveButton: true,
      buttonList: buttonList
    })

    resultObj = {
      contentMainList: tempArr,
      introduceContent: contentIntroduceData
    }

    return resultObj;
  }
}