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

  //只计算单核情况

  cpuInfo.push(cpuList[0].speed);
  cpuInfo.push(cpuList[0].times.user);
  cpuInfo.push(cpuList[0].times.sys);
  cpuInfo.push(cpuList[0].times.idle);
  cpuInfo.push(cpuList[0].times.irq);
  cpuInfo.push(cpuList[0].times.nice);


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
