var React     = require('react');
var PageHead  = require('./backPageHead/backPageHead.js');
var Table     = require('../common/table.js');
var m         = require('../../map.json');

module.exports = React.createClass({
  render: function(){
    return (
      <div>
        <PageHead pageHeadString = { 'Add Slide' }
          pageHeadIsHaveButton = { false } />
        <Table
          tableName = { '修改展示页导航' }
          source = { m.changSlide }
          modalSource = { m.changSlide } />
      </div>
    );
  }
})