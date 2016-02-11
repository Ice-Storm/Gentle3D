var db    = require('../../model/db.js');
var tools = require('../tools/tools.js');
var error = require('../../errors/index.js');
var os    = require('os');

module.exports.getData = function *(next){

  var visiteCount = yield db.Visite.findAll({
    arrtibute: ['id', 'count'],
    order: [['id', 'DESC']],
    limit: 7
  })
  
  var visiteArr = tools.dealResult(visiteCount);
  var temp = [];

  for(var i = 0; i < 7; i++){
    if(visiteArr[i] && visiteArr[i].count){
      temp.unshift(visiteArr[i].count);
    } else {
      temp.unshift(0);
    }
  }
  
  var memInfo = process.memoryUsage()
  var cpuList = os.cpus();
  var cpuInfo = [];
  var cpuSpeed = 0;
  var cpuUser = 0;
  var cpuSys = 0;
  var cpuIdle = 0;
  var cpuIrq = 0;
  var cpuNice = 0;

  for(var i = 0; i < cpuList.length; i++){
    cpuSpeed += cpuList[i].speed;
    cpuUser += cpuList[i].times.user;
    cpuSys += cpuList[i].times.sys;
    cpuIdle += cpuList[i].times.idle;
    cpuIrq += cpuList[i].times.irq;
    cpuNice += cpuList[i].times.nice;
  }

  cpuInfo.push(cpuSpeed);
  cpuInfo.push(cpuUser);
  cpuInfo.push(cpuSys);
  cpuInfo.push(cpuIdle);
  cpuInfo.push(cpuIrq);
  cpuInfo.push(cpuNice);


  return {
    visite: {
      labels : ["6 day ago","5 day ago","4 day ago","3 day ago","2 day ago","1 day ago","Now"],
      datasets : [
        {
          fillColor : "rgba(151,187,205,0.5)",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor : "#fff",
          data : temp
        }
      ]
    },
    mem: [
      {
        value: memInfo.rss,
        color:"#d15b47"
      },
      {
        value : memInfo.heapTotal,
        color : "#87b87f"
      }
    ],
    cpu: {
      labels : ["speed","user","sys","idle","irq","nice"],
      datasets : [
        {
          fillColor : "rgba(220,220,220,0.5)",
          strokeColor : "rgba(220,220,220,1)",
          pointColor : "rgba(220,220,220,1)",
          pointStrokeColor : "#fff",
          data : cpuInfo
        }
      ]
    }
  };
}
