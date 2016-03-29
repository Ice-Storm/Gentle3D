var URL   = require('url');
var parse = require('co-body');
var db    = require('../../model/db.js');
var tools = require('../tools/tools.js');
var util  = require('util');

var modal = {
  config: {
    title: '更新导航栏',
    url: './changSlideCompontent/update',
    type: 'post' // GET 或者 POST
  },
  sort: {
    title: 'sort',
    name: 'sort',
    placeholder: 'sort',
    type: 'text' // input的类型
  },
  flag: {
    title: 'flag',
    name: 'flag2',
    placeholder: 'flag',
    type: 'text' // input的类型
  },
  point: {
    title: 'point',
    name: 'point',
    placeholder: 'point',
    type: 'text' // input的类型
  }
}

module.exports = {
  getData: function *(options){
    var resultArr = [],
        findResult;

    findResult = yield db.ShowSlide.findAll({
      attributes: ['id', 'sort', 'point', 'flag']
    });

    resultArr = tools.dealResult(findResult);

    resultArr.unshift({
      id: 'id',
      sort: 'sort',
      point: 'point',
      flag: 'flag'
    })

    return resultArr;
  },
  create: function *addModal(options){
    modal.config = {
      title: '添加导航栏',
      url: './changSlideCompontent/update',
      type: 'post' // GET 或者 POST
    }
    return modal;
  },
  update: function *(options){
    var flag = options.part.flag2 || 1,
        updateObj = {},
        findResult;

    updateObj.flag = flag;
    updateObj.point = options.part.point;
    updateObj.sort = options.part.sort;

    findResult = yield db.ShowSlide.findById(options.id);

    //如果查询得到就更新 否则 新建
    try{
      if(findResult){
        findResult.update(updateObj);
      } else {
        db.ShowSlide.build(updateObj).save();
      }
    }
    catch(err){
      return { state: 0, message: '更新失败' };
    }

    return { state: 1, message: '更新成功' }
  },
  delete: function *(options){
    var info = {},
        findResult,
        sort;

    findResult = yield db.ShowSlide.findById(options.id);

    try{
      if(!!findResult){
        if(findResult.flag == 0){
          sort = findResult.dataValues.sort;
          yield db.ShowSlide.destroy({ where: { point: sort } });
        }

        yield db.ShowSlide.destroy({ where: {id : options.id} });

        yield db.ShowContent.destroy({ 
          where: { 'foreign_sort': findResult.dataValues.sort } 
        });

        info = { state: 1, message: '删除成功' };
      } else {
        info = { state: 0, message: '删除失败' };
      } 
    }
    catch(err) {
      info = { state: 0, message: '删除失败' };
    }

    return info;
  },
  addModal: function *(){
    modal.config = {
      title: '更新导航栏',
      url: './changSlideCompontent/update',
      type: 'post' // GET 或者 POST
    }
    return modal;
  }
}
