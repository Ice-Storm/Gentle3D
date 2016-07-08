var util = require('util');
var URL  = require('url');

function *getData(queryParms){
  var entity = '',
      isHaveTextarea = '',
      isHaveSelect = '',
      isHaveUpload = '',
      special = 0;
      
  /**
   *  TODO: 根据不同的flag配置不同页面的上传组件值
   *
   *  indeximg: 1
   *  showcontent: 2
   *  aboutimg: 3
   *  connection: 4
   *  user: 5
   */
  var INDEX_IMG = 1,
      SHOW_CONTENT = 2,
      ABOUT_IMG = 3,
      CONNECTION = 4,
      USER = 5;

  switch (queryParms.flag.toLowerCase()){
    case 'indeximg':
      entity = 'IndexImg';
      isHaveSelect = false;
      isHaveTextarea = false;
      isHaveUpload = false;
      isNew = false;
      special = INDEX_IMG;
      break;
    case 'showcontent':
      entity = 'ShowContent';
      isHaveSelect = true;
      isHaveTextarea = true;
      isHaveUpload = true;
      special = SHOW_CONTENT;
      if(queryParms.isNew == 'false'){
        isHaveSelect = false;
      }
      break;
    case 'aboutimg':
      entity = 'AboutImg';
      isHaveSelect = false;
      isHaveTextarea = true;
      isHaveUpload = true;
      special = ABOUT_IMG;
      break;
    case 'connection':
      entity = 'WebConfig';
      isHaveUpload = 'null';
      special = CONNECTION;
      break;
    case 'user':
      entity = 'User';
      isHaveUpload = 'null';
      special = USER;
      break;
    default:
      return entity = '';
  }

  return {
    title: queryParms.title ? queryParms.title : '上传图片',
    url: queryParms.url ? queryParms.url : './upload',
    id: queryParms.id ? queryParms.id : 'null',
    isNew: queryParms.isNew ? queryParms.isNew : 'null',
    content: queryParms.content ? queryParms.content : 'null',
    flag: queryParms.flag ? queryParms.flag : 'null',
    value: queryParms.value ? queryParms.value : 'null',
    entity: entity,
    isHaveSelect: isHaveSelect,
    isHaveTextarea: isHaveTextarea,
    isHaveUpload: isHaveUpload ? isHaveUpload : 'null',
    special: special
  }
}

module.exports.getData = getData; 