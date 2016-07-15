var fs = require('fs');
var path = require('path');
var util = require('util');
var thunkify = require('thunkify');

var fsStat = thunkify(fs.stat);
var fsReaddir = thunkify(fs.readdir);

/**
 * TODO 生成指定文件夹下所有文件
 */
function *createMap(fsPath, defineList) {
  var pathList = [];
  yield pathMap(fsPath, pathList, defineList);
  return pathList;
}

/**
 * TODO: 递归生成目录下的文件和文件路径映射
 * @fsPath {String} 文件夹名
 * @pathList {Array} 生成路径存放的数组
 * @defineList {Array} 目录下不遍历的文件夹名
 */
function *pathMap(fsPath, pathList, defineList){
  var define = defineList || ['lib', 'dist'];
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

module.exports.createMap = createMap;
