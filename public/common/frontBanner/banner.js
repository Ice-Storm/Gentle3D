var React = require('react');
require('./banner.css');

module.exports = React.createClass({
  //生成导航栏下的页面介绍
  propTypes: {
    bannerContent: React.PropTypes.Object
  },
  render: function() {
    return (
      <div className = 'bannerContent-background'>
        <div className = 'bannerContent-position'>
          <span className = 'bannerContent-title'>{ this.props.bannerContent.bannerTitle }</span>
          <span className = 'bannerContent-content'>{ this.props.bannerContent.bannerContent }</span>
        </div>
      </div>
    );
  }
})