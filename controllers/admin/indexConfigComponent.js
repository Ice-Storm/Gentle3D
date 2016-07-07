var util  = require('util');
var URL   = require('url');
var error = require('../../index.js');
var db    = require('../../model/db.js');
var tools = require('../tools/tools.js');

function _selectDBEntity(str){
  var entity;

  if(typeof(str) != 'string'){
    console.log('_selectDBEntity参数类型错误');
    return;
  }

  switch(str){
    case '3d_navList':
      entity = 'Nav';
      break;
    case '3d_index_content':
      entity = 'Index';
      break;
    case '3d_webConfig':
      entity = 'WebConfig';
      break;
    default:
      entity = '';
  }
  return entity;
}

module.exports = {
	add: function *(queryParms){
		var createObj = {};
		
		var entity = _selectDBEntity(queryParms.part.flag);

		if(queryParms.part.flag == '3d_navList') {
			var title = queryParms.part.num == 0 ? 'navTitle' : 'bannerTitle';
			var content = queryParms.part.num == 0 ? 'navUrl' : 'bannerContent';
			var textName = queryParms.part.num == 0 ? 'navName' : 'bannerName';

			createObj[title] = queryParms.part.inputOne;
			createObj[content] = queryParms.part.inputTwo;
			createObj[textName] = queryParms.part.inputThree;

			if(queryParms.part.num == 0){
				var findResult = yield db[entity].findAll({ where: createObj });
				if(findResult[0]) {
					//错误处理
					return;
				}

				createObj[textName] = Math.floor(Math.random() * 1E9);	

				db[entity].build(createObj).save();
			}

			if(queryParms.part.num != 0) {
				createObj.navUrl = queryParms.part.inputFour;
				findResult = yield db[entity].find({ where: { navUrl: createObj.navUrl } });
				findResult.update(createObj);
			}
		}

		if(queryParms.part.flag == '3d_index_content') {
			createObj.iconName = '';
			createObj.title = queryParms.part.inputOne;
			createObj.content = queryParms.part.inputTwo;
			createObj.textName= queryParms.part.inputThree;
		
			var isExistResult = yield db[entity].find({ where: createObj });

			if(isExistResult) {
				return { state: 0, message: '添加记录已经存在！' };
			}
		
			db[entity].build(createObj).save();
		}

		return { state: 1, message: '添加成功' };
	},
	delete: function *(queryParms){
		
		var entity = _selectDBEntity(queryParms.flag);

		if(queryParms.flag == '3d_navList') {
			var fieldAndValue = {};
			var changeField = queryParms.num == 0 ? 'navTitle' : 'bannerTitle';
			var changeFieldOther = queryParms.num == 0 ? 'navUrl' : 'bannerContent';

			fieldAndValue[changeField] = '';
			fieldAndValue[changeFieldOther] = '';

			var findResult = yield db[entity].findById(queryParms.id);

			var updateResult = yield findResult.update(fieldAndValue);

			if(findResult.dataValues) {
				var dValues = findResult.dataValues;
				if( !(dValues.navUrl && dValues.bannerTitle && dValues.navUrl && dValues.bannerContent) ){
					db[entity].destroy({ where: {id : queryParms.id} });
				}
			}
		}

		if(queryParms.flag == '3d_webConfig' || queryParms.flag == '3d_index_content') {
			yield db[entity].findById(queryParms.id);
		  yield db[entity].destroy({ where: {id : queryParms.id} });
		}

		return { state: 1, message: '删除成功' };
	},
	postData: function *(queryParms) {
		var fieldAndValue = {};
		var tempParmsObj = {};

		if(queryParms.part.flag == '3d_navList'){
		  var changeField = queryParms.part.num == 0 ? 'navTitle' : 'bannerTitle';
		  var changeFieldOther = queryParms.part.num == 0 ? 'navUrl' : 'bannerContent';

			fieldAndValue[changeField] = queryParms.part.inputOne;
			fieldAndValue[changeFieldOther] = queryParms.part.inputTwo;

			var findResult = yield db.Nav.findById(queryParms.part.id);
		
			var updateResult = yield findResult.update(fieldAndValue);
		}

		if(queryParms.part.flag == '3d_index_content') {
			
			findResult = yield db.Index.findById(queryParms.part.id);

			yield findResult.update({
				title: queryParms.part.inputOne,
				content: queryParms.part.inputTwo
			});
		}

		if(queryParms.part.flag == '3d_webConfig') {
			findResult = yield db.WebConfig.findById(queryParms.part.id);
			updateResult = findResult.update({ copyright: queryParms.part.inputTwo })
		}

		//处理 Connection 组件的更新操作
		if(queryParms.part.flag == 'connection') {

			for (var i in queryParms.part) {
				if (i != 'flag' && i != 'id') {
					tempParmsObj[i] = queryParms.part[i];
				}
			}

			var entity = tempParmsObj.logo ? 'WebConfig' : 'About';
			var logoId = tempParmsObj.logo ? queryParms.part.id : 1;

			findResult = yield db[entity].findById(logoId);

			updateResult = findResult.update(tempParmsObj);
		}

		return { state: 1, message: '更新成功' };
	},
	getData: function *(queryParms) {
    
    var indexNavAndBanner = yield db.Nav.findAll();

		var footCopyright = yield db.WebConfig.findById(1);

		var indexContent = yield db.Index.findAll({ attributes: ['iconName', 'title', 'content', 'textName', 'id'] });
    
    var indexNavAndBanner = tools.dealResult(indexNavAndBanner);

    var result = {
      menuName: [],
      indexNavPills: [],
      indexIntroList: [],
      footConfig: [],
      bannerConfig: []
    };

    result.menuName = [
      {
        menuNameTitle: '首页菜单设置',
        textName: '3d_navList'
      }, 
      {
        menuNameTitle: '首页介绍内容',
        textName: '3d_index_content'
      },
      {
        menuNameTitle: '页尾设置',
        textName: '3d_webConfig'
      },
      {
        menuNameTitle: 'Banner设置',
        textName: '3d_navList'
      }
    ];
    
    if(util.isArray(indexNavAndBanner)){
      for(var i = 0; i < indexNavAndBanner.length; i++) {
        var tempIndexNavPills = {
          pillName: indexNavAndBanner[i].navTitle,
          pillUrl: indexNavAndBanner[i].navUrl,
          textName: indexNavAndBanner[i].navName,
          id: indexNavAndBanner[i].id
        }
        var tempBannerConfig = {
          title: indexNavAndBanner[i].bannerTitle,
          content: indexNavAndBanner[i].bannerContent,
          textName: indexNavAndBanner[i].bannerName,
          id: indexNavAndBanner[i].id
        }
        result.indexNavPills.push(tempIndexNavPills);
        result.bannerConfig.push(tempBannerConfig);
      }
      for (var j = 0; j < indexContent.length; j++) {
        result.indexIntroList.push(indexContent[j].dataValues)
      }
    }

    result.footConfig = [{
      title: '页尾设置',
      content: tools.dealResult(footCopyright)[0].copyright,
      textName: tools.dealResult(footCopyright)[0].textName,
      id: tools.dealResult(footCopyright)[0].id
    }];
    
	  return result;
	}
}
