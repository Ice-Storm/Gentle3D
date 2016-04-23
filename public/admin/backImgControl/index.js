var React        = require('react');
var ContentMain  = require('./backImgControl.js');
var ControlIndex = require('../backHead/backHead.js');
var BackBanner   = require('../backBanner/backBanner.js');
var SlideBar     = require('../backSlideBar/backSlideBar.js');

module.exports = React.createClass({
  propTypes: {
    backNavBar: React.PropTypes.object,
    backBannerWhere: React.PropTypes.string,
    slideBar: React.PropTypes.object
  },
  render: function(){
    return (
      <div>
        <ControlIndex source = { './admin/backNav' } />
        <BackBanner />
        <SlideBar source = { './admin/backSlide' } />
        <ContentMain source = { './admin/indexConfigCompontent' } />
      </div>
    );
  }
})