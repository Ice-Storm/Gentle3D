var db    = require('../../model/db.js');
var tools = require('../tools/tools.js');
var URL   = require('url');

function *getData(queryParms){
  var modalParm = {};

  if(queryParms.operate == 'add'){
    modalParm = {
      config: {
        title: queryParms.title,
        url: './indexConfigCompontent/add',
        type: 'post', // GET 或者 POST
        num: queryParms.num,
        flag: queryParms.flag
      },
      info: {
        title: 'Title',
        name: 'inputOne',
        placeholder: 'title',
        type: 'text' // input的类型
      },
      content: {
        title: 'Content',
        name: 'inputTwo',
        placeholder: 'content',
        type: 'text' // input的类型
      },
      textName: {
        title: 'textName',
        name: 'inputThree',
        placeholder: 'content',
        type: 'text' // input的类型
      }
    }
    if(queryParms.flag == '3d_navList' && queryParms.num != 0) {
      modalParm.url = {
        title: 'url',
        name: 'inputFour',
        placeholder: 'url',
        type: 'text' // input的类型
      }
    }
  } else {
    modalParm = {
      config: {
        title: queryParms.title,
        url: './indexConfigCompontent/postData',
        type: 'post', // GET 或者 POST
        flag: queryParms.flag,
        id: queryParms.id,
        num: queryParms.num
      },
      info: {
        title: 'Title',
        name: 'inputOne',
        placeholder: 'splitId',
        type: 'text' // input的类型
      },
      url: {
        title: 'Content',
        name: 'inputTwo',
        placeholder: 'url',
        type: 'text' // input的类型
      }
    }
  }

  return modalParm;
}

module.exports.getData = getData;
