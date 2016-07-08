/*
eg: React.render( <BackBanner backBannerWhere = { '控制台' } />, document.getElementById('header') );

*/
var React = require('react');

require('./backBanner.css');

module.exports = React.createClass({
  // 根据父组件的的点击更改 backBannerWhere 这个状态
  propTypes: {
    backBannerWhere: React.PropTypes.string
  },
  createDecorationIcon: function(){
    var decorationIcon = ['fa fa-cloud', 'fa fa-cubes', 'fa fa-fighter-jet', 'fa fa-motorcycle']
    var iconList = [];
    for (var i = 0; i < decorationIcon.length; i++) {
      iconList.push(
        <li key = { i }>
          <i className = { decorationIcon[i] }></i>
        </li>
      )
    }
    return iconList;
  },
  render: function(){
    return (
      <div className = 'backBanner-bannerPosition'>
        <ul className = 'backBanner-iconList'>
          { this.createDecorationIcon() }
        </ul>
        <ul className = 'backBanner-breadcrumb'>
          <li>
            <i className = 'fa fa-home'></i>
            <span>首页</span>
          </li>
          <li>
            <i className = 'fa fa-angle-right'></i>
            <span>{ this.props.backBannerWhere }</span>
          </li>
        </ul>
      </div>
    );
  }
})