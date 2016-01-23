var Redux = require('redux');

module.exports.increment = function () {
  return {
    type: 'aa'
  }
}

module.exports.changeCrumb = function (event) {
  //if(event.target.className)
    console.log(event.target.className);
  return {
    type: 'CHANGE_CRUMB',
    text: event.target.innerText
  }
}
