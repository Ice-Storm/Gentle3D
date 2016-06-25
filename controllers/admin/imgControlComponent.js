var db    = require('../../model/db.js');
var tools = require('../tools/tools.js');
var error = require('../../errors');

function *getData(next){

	var indexImgCol = db.IndexImg.findAll();

	var showImgCol = db.ShowContent.findAll({
		attributes: ['imgName', 'name', 'id', ['foreign_sort', 'sort']]
	})

	var aboutImgCol = db.AboutImg.findAll({
		attributes: ['imgName', 'name', 'id']
	})

	try {
		var dataCollection = yield {
			indexImg: indexImgCol,
			showImg: showImgCol,
			aboutImg: aboutImgCol
		}
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
			imgList: tools.dealResult(dataCollection.indexImg)   
		},
		ShowContent: {
			url: './image/show/',
			imgList: tools.dealResult(dataCollection.showImg)
		},
		AboutImg: {
			url: './image/about/',
			imgList: tools.dealResult(dataCollection.aboutImg)
		}
	}

  return dataList;
}

module.exports.getData = getData;