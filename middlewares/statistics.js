var moment = require('moment');
var db     = require('../model/db.js');

module.exports = function () {
  return function *(next) {
    //统计访问的ip 该ip访问次数 和是否拒绝此IP访问（拒绝部分尚未实现）
    var ip = this.ip.split(':')[3] ? this.ip.split(':')[3] : 0;
    var time = new Date().getTime();

    var isHaveIp = yield db.Statistics.findByIp(ip);
    
    if(!isHaveIp.length && this.url.indexOf('admin') == -1){
      //如果没有这个ip
      db.Statistics.build({
        ip: ip,
        date: time,
        count: 1,
        isRefuse: 0
      }).save();
    } else if(isHaveIp.length && this.url.indexOf('admin') == -1){
      //如果有
      findResult = yield db.Statistics.find({ where: { ip: ip } });
      var newCount = findResult.dataValues.count + 1;
      findResult.update({
        ip: ip,
        data: time,
        count: newCount,
      });
    }

    //统计每天访问量
    var dbNowDate = yield db.Visite.find({
      attributes: ['id', 'date', 'count'],
      order: [['id', 'DESC']]
    })

    if(dbNowDate && dbNowDate.dataValues.date && this.url.indexOf('admin') == -1){
      
      var dbTimeStr = moment(dbNowDate.dataValues.date).format('DD-MM-YYYY').split('-')[0];
      var nowTimeStr = moment(new Date().getTime()).format('DD-MM-YYYY').split('-')[0];
      
      if(dbTimeStr == nowTimeStr){
        //当日
        dbNowDate.update({
          id: dbNowDate.dataValues.id,
          date: dbNowDate.dataValues.date,
          count: dbNowDate.dataValues.count + 1
        })
      } else {
        //不是当日
        db.Visite.build({
          date: new Date().getTime(),
          count: 1,
        }).save();
      }
    }

    yield next;
  }
}