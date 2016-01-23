var util = require('util');
var URL  = require('url');

function *uploadConfig(queryParms) {
  var entity = '',
      isHaveTextarea,
      isHaveSelect;
  
  switch (queryParms.flag.toLowerCase()) {
    case 'indeximg':
      entity = 'IndexImg';
      isHaveSelect = 'false';
      isHaveTextarea = 'false';
      isHaveUpload = 'false';
      isNew = 'false';
      break;
    case 'showcontent':
      entity = 'ShowContent';
      isHaveSelect = 'true';
      isHaveTextarea = 'true';
      isHaveUpload = 'true';
      break;
    case 'aboutimg':
      entity = 'AboutImg';
      isHaveSelect = 'false';
      isHaveTextarea = 'true';
      isHaveUpload = 'true';
      break;
    default:
      return entity = '';
  }

  return {
    title: '上传图片',
    url: './upload',
    name: '',
    id: queryParms.id ? queryParms.id : 'null',
    isNew: queryParms.isNew ? queryParms.isNew : 'null',
    entity: entity,
    content: queryParms.content ? queryParms.content : 'null',
    flag: queryParms.flag ? queryParms.flag : 'null',
    value: queryParms.value ? queryParms.value : 'null',
    isHaveSelect: isHaveSelect,
    isHaveTextarea: isHaveTextarea,
    isHaveUpload: isHaveUpload
  }
}

module.exports.getData = uploadConfig; 