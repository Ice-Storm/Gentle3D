var React        = require('react');
var PageHead     = require('./backPageHead/backPageHead.js');
var Table        = require('../tools/table.js');

module.exports = React.createClass({
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