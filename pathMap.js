var fs = require('fs');
var path = require('path');
var util = require('util');
var thunkify = require('thunkify');

//定义目录下不需要被访问的文件夹名
var define = ['lib', 'dist'];

var fsStat = thunkify(fs.stat);
var fsReaddir = thunkify(fs.readdir);

/**
 * TODO 生成指定文件夹下所有文件
 */
function *map(fsPath) {
  var pathList = [];
  yield pathMap(fsPath, pathList)
  return pathList;
}

function *pathMap(fsPath, pathList){
  var e = yield fsStat(fsPath);
  
  if(e.isDirectory()){
    var dir = yield fsReaddir(fsPath);
  }
  
  for(var i = 0; i < dir.length; i++){
    
    for (var j = 0; j < define.length; j++){
      if(path.join(fsPath, '/' + dir[i]) == path.join(fsPath, '/' + define[j])) return;  
    }
    
    var stat = yield fsStat(path.join(fsPath, '/' + dir[i]));
    
    if(stat.isDirectory()){
      yield pathMap(path.join(fsPath, '/' + dir[i]), pathList);
    } else {
      pathList.push(path.join(fsPath, dir[i]))  
    }
  }
  return pathList;
}

var traFileName = function *(pathList, char){
  if(!util.isArray(pathList)){
    console.log('pathList is not array');
    return 0;
  }
  
  var map = {};
  
  for(var i = 0; i < pathList.length; i++){
    var file = pathList[i].split(char)[1];
    var jsonPath = file.split('.')[0];
    var fileName = file.split('\\')[file.split('\\').length - 1].split('.')[0];
    map[fileName] = jsonPath;
  }
  
  return map;
}

module.exports.traFileName = traFileName;

module.exports.map = map;
