var React        = require('react');
var PageHead     = require('./backPageHead/backPageHead.js');
var Table        = require('../tools/table.js');
var BackBanner   = require('./backBanner/backBanner.js');
var SlideBar     = require('./backSlideBar/backSlideBar.js');
var PageHead     = require('./backPageHead/backPageHead.js');
var ControlIndex = require('./backHead/backHead.js');

module.exports = React.createClass({
  propTypes: {
    pid: React.PropTypes.String,
    tableContent: React.PropTypes.Array,
    modalSource: React.PropTypes.String,
    tableName: React.PropTypes.String,
    pageHeadString: React.PropTypes.String,
    pageHeadIsHaveButton: React.PropTypes.Bool
  },
  render: function(){
    return (
      <div>
      <ControlIndex source = { './admin/backNav' } />
        <BackBanner />
        <PageHead pageHeadString = { 'Add Slide' }
          pageHeadIsHaveButton = { false } />
        <SlideBar source = { './admin/backSlide' } />
        <Table
          tableName = { '修改展示页导航' }
          source = { './admin/changSlideCompontent' }
          modalSource = { './admin/changSlideCompontent/' } />
      </div>
    );
  }
})