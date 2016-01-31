var db    = require('../../model/db.js');
var tools = require('../tools/tools.js');
var error = require('../../errors/index.js');
var os    = require('os');

module.exports.getData = function *(next) {
  return {
    cpu: os.cpus(),
    memory: process.memoryUsage()
  };
}
