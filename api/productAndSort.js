var db    = require('../model/db.js');
var tools = require('../controllers/tools/tools.js');
var error = require('../errors/index.js');

module.exports = {
  getData: function *(){
    
    var sql = 'select sort, flag, imgName, content, point, name from 3d_show_slide left join 3d_show_content on 3d_show_slide.sort = 3d_show_content.foreign_sort';
  
    try{
      var data = yield db.sequelize.query(sql);
    }
    catch(err) {
      error.dbError(err);
    }
    
    var cDate = data[0];
    var mainSort = [];
    var slideCon = [];
    var showContent = [];

    function unique(array) {
      var n = [];
      for(var i = 0; i < array.length; i++){
          if(n.indexOf(array[i]) == -1) n.push(array[i]);
      }
      return n;
    }

    for(var i = 0; i < cDate.length; i++) {
      if(cDate[i].flag == 0) {
        mainSort.push(cDate[i].sort);
      }
      mainSort = unique(mainSort);
    }

    for(var j = 0; j < mainSort.length; j++) {
      var showCon = {
        slideSort: mainSort[j],
        sortList: []
      };
      for(var k = 0; k < cDate.length; k++) {
        if(cDate[k].point == mainSort[j]) {
          showCon.sortList.push(cDate[k].sort);    
        }
      }
      showCon.sortList = unique(showCon.sortList)
      slideCon.push(showCon);
    }

    for (var i = 0; i < cDate.length; i++) {
      var obj = {}
      if(cDate[i].flag != 0) {
        obj.sort = cDate[i].sort;
        obj.imgSrc = cDate[i].imgName;
        obj.content = cDate[i].content;
        showContent.push(obj);
      }
    }

    var resultObj = {
      slideList: slideCon,
      contentInfo: showContent
    }

    return resultObj;
  }
}