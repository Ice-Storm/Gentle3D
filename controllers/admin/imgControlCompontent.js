var db    = require('../../model/db.js');
var tools = require('../tools/tools.js');
var error = require('../../errors');

function  *imgControlCompontent (next) {
	var indexImgCol,
			showImgCol,
			aboutImgCol,
			dataCollection,
			dataList;

	indexImgCol = db.IndexImg.findAll();

	showImgCol = db.ShowContent.findAll({
		 attributes: ['imgName', 'name', 'id']
	})

	aboutImgCol = db.AboutImg.findAll({
		attributes: ['imgName', 'name', 'id']
	})

	try {
		dataCollection = yield {
			indexImg: indexImgCol,
			showImg: showImgCol,
			aboutImg: aboutImgCol
		}
	}
	catch(err) {
		error.dbError(err);
	}

	dataList = {
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

module.exports.getData = imgControlCompontent;