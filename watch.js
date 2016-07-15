var co       = require('co');
var chokidar = require('chokidar');
var fs       = require('fs');
var path     = require('path');
var pathMap  = require('./pathMap');
var thunkify = require('thunkify');

/**
 * 监控指定目录，生成URL路径 map.json
 */
var fsWrite = thunkify(fs.writeFile);

var createMap = function (splitFile){
  return co(function *(){
      var pathList = yield pathMap.createMap(path.join(__filename, '../' + splitFile));
      var s = yield pathMap.traFileName(pathList, splitFile);
      yield fsWrite('map.json', JSON.stringify(s));
    }).catch(function(err){
      console.log(err)
    });
}

module.exports = function *(splitFile){
  var watcher = chokidar.watch('./' + splitFile, { persistent: true });
  watcher.on('add', function (filePath) {
    createMap(splitFile);
  })
  .on('change',function(filePath){
    createMap(splitFile);
  })
  .on('error',function(filePath){
    console.log(filePath)
  })
  .on('unlink', function(filePath){
    createMap(splitFile);
  })  
} 

 