var fs    = require('fs');
var error = require('../errors/index.js');

module.exports = {
  /**
   * @param { object } uploadObj 上传所需属性
   * @param { object } uploadObj.part 上传文件对象  
   * @param { string } uploadParms.pathDir 上传文件路径
   */
  uploadImg: function *(uploadObj){
    if(uploadObj.pathDir && uploadObj.part){
      try{
        var stream = fs.createWriteStream(uploadObj.pathDir);
        uploadObj.part.pipe(stream);
      }
      catch(err) {
        error.uploadError(err);
      }
    }
  }
}