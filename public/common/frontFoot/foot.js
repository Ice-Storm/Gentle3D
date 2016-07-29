/**
* 生成页脚信息
*
* @parm logo {String} 网页logo名字
* @parm copyright {String} 网页版权信息
* @parm iconList {Array.<String>=} 可选页脚图标
* 网页页脚的Logo 版权 以及页脚的小图标
*/

var React = require('react');

module.exports = React.createClass({
   propTypes: {
     logo: React.PropTypes.string,
     copyright: React.PropTypes.string,
     iconList: React.PropTypes.array
  },
  getInitialState: function(){
    return { url: './image/' };
  },
  createIncoList: function(arr){
    var arr = arr || ['fa fa-envelope fa-2x', 'fa fa-comments fa-2x', 'fa fa-phone fa-2x', 'fa fa-user fa-2x'];
    var iconList = [];
    var count = 0;
    arr.map(function(item) {
      count > 4 ? count = 0 : count++;
      iconList.push( 
        <li key = { count }>
          <a href = './about' key = { count }>
            <i className = { item } style = {{ color: 'white' }} key = { count }></i>
          </a>
        </li> 
      );
    })
    return iconList;
  },
  render: function(){
    return (
      <div className = 'FootMain-ban'>
        <div className = 'FootMain-copyright'>
          <a href = './'>
            <img src = { this.state.url + this.props.logo } style = {{height: '30px;'}} />
          </a>
          <p>{ this.props.copyright }</p>
        </div>
        <ul className = 'FontMain-iconlist'>
          { this.createIncoList( this.props.incoList ) }
        </ul>
      </div>
    );
  }
})