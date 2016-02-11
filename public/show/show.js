var React = require('react');
var Banner = require('../common/frontBanner/banner.js');
var SlideBar = require('./slideBar.js');

module.exports = React.createClass({
  propTypes: {
    bannerContent: React.PropTypes.object,
    slideList: React.PropTypes.array,
    contentInfo: React.PropTypes.array
  },
  render: function(){
    return (
      <div>
        <Banner bannerContent = { this.props.bannerContent } />      
        <SlideBar slideList = { this.props.slideList } contentInfo = { this.props.contentInfo }/>
      </div>
    );
  }
})


