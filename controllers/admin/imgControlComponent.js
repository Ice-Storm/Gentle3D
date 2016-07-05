var db    = require('../../model/db.js');
var tools = require('../tools/tools.js');
var error = require('../../errors');

function *getData(next){
  
  try {
    var indexImgCol = yield db.IndexImg.findAll();

    var showImgCol = yield db.ShowContent.findAll({
      attributes: ['imgName', 'name', 'id', ['foreign_sort', 'sort']]
    });

    var aboutImgCol = yield db.AboutImg.findAll({
      attributes: ['imgName', 'name', 'id']
    });
  }
	catch(err) {
		error.dbError(err);
	}
	
	var dataList = {
	/**
	 *	IndexImg 表示图片所在的表的关系对象模型，即实体 
	 */
		IndexImg: {
			url: './image/index/',
			imgList: tools.dealResult(indexImgCol)   
		},
		ShowContent: {
			url: './image/show/',
			imgList: tools.dealResult(showImgCol)
		},
		AboutImg: {
			url: './image/about/',
			imgList: tools.dealResult(aboutImgCol)
		}
	}

  return dataList;
}

module.exports.getData = getData;