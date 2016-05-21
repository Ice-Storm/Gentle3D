var React        = require('react');
var PageHead     = require('./backPageHead/backPageHead.js');
var Table        = require('../tools/table.js');
var PageHead     = require('./backPageHead/backPageHead.js');

module.exports = React.createClass({
  propTypes: {
    modalSource: React.PropTypes.String,
    tableName: React.PropTypes.String,
    pageHeadString: React.PropTypes.String,
    pageHeadIsHaveButton: React.PropTypes.Bool
  },
  render: function(){
    return (
      <div>
        <PageHead pageHeadString = { 'Add Slide' }
          pageHeadIsHaveButton = { false } />
        <Table
          tableName = { '修改展示页导航' }
          source = { './admin/changSlideCompontent' }
          modalSource = { './admin/changSlideCompontent/' } />
      </div>
    );
  }
})