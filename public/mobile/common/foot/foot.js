/**
 * 生成移动端页脚
 * @param {Array} footList 页脚信息
 * @param {String} footList[i].title 页脚导航标题
 * @param {String} footList[i].title 页脚导航URL
 */

var React = require('react');

module.exports = React.createClass({
  propTypes: {
    footList: React.PropTypes.Array
  },
  getInitialState: function(){
    return  { url: '../image/mobile/index/' }
  },
  createFootList: function(footList){
    var tempList = [];
    for(var i = 0; i < footList.length; i++) {
      tempList.push(
        <li><a href = { footList[i].url }>{ footList[i].title }</a></li>
      )
    }
    return tempList;
  },
  render: function(){
    return (
      <div className = 'foot-pos'>
        <ul className = 'foot-list'>
          { this.createFootList(this.props.footList) }
        </ul>
        <span className = 'foot-copyright'>All rights reserved</span>
      </div>
    )
  }
})