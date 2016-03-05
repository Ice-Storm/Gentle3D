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

  switch (queryParms.flag.toLowerCase()){
    case 'indeximg':
      entity = 'IndexImg';
      isHaveSelect = false;
      isHaveTextarea = false;
      isHaveUpload = false;
      isNew = false;
      special = 1;
      break;
    case 'showcontent':
      entity = 'ShowContent';
      isHaveSelect = true;
      isHaveTextarea = true;
      isHaveUpload = true;
      special = 2;
      if(queryParms.isNew == 'false'){
        isHaveSelect = false;
      }
      break;
    case 'aboutimg':
      entity = 'AboutImg';
      isHaveSelect = false;
      isHaveTextarea = true;
      isHaveUpload = true;
      special = 3;
      break;
    case 'connection':
      entity = 'WebConfig';
      isHaveUpload = 'null';
      special = 4;
      break;
    case 'user':
      entity = 'User';
      isHaveUpload = 'null';
      special = 5;
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