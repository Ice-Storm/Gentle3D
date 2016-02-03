var fs    = require('fs');
var error = require('../errors/index.js');

module.exports = {
  uploadImg: function* (uploadObj){
    if(uploadObj.pathDir && uploadObj.part) {
      try {
        var stream = fs.createWriteStream(uploadObj.pathDir);
        uploadObj.part.pipe(stream);
      }
      catch(err) {
        error.uploadError(err);
      }
    }
  }
}