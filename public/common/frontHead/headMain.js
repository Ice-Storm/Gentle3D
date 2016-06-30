/**
* 生成导航栏内容
*
* @parm logo {String} logo的名字
* @parm headerMainPills: {Array} 导航栏菜单的名字和URL
* 
* @return result {HTML String}
*/

var React = require('react');
require('./backMain.css');

module.exports = React.createClass({
  propTypes:{
    logo: React.PropTypes.String,
    headerMainPills: React.PropTypes.Array
  },
  getInitialState: function(){
    return { url: './image/' };
  },
  createHeaderMainPills: function(arr){
    var headerMainPills = [];
    arr.map(function(item){
      headerMainPills.push(
        <a href = { item.navUrl }>
          <li className = 'HeaderMain-pills'>{ item.navTitle }</li>
        </a>
      )
    })
    return headerMainPills;
  },
  render: function(){
    return (
      <div className = 'HeaderMain-nav'>
        <div style = {{ float: 'left' }}>
          <a href = '/'>
            <img src = { this.state.url + this.props.logo } className = 'HeaderMain-navLogo' />
          </a>
        </div>
        <ul>
          { this.createHeaderMainPills( this.props.headerMainPills ) }
        </ul>
      </div>
    );
  }
})
