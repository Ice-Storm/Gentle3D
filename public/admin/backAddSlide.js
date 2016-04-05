var React    = require('react');
var PageHead = require('./backPageHead/backPageHead.js');
var Table    = require('../tools/table.js');

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
        <PageHead pageHeadString = { this.props.pageHeadString }
         pageHeadIsHaveButton = { this.props.pageHeadIsHaveButton } />  
        <Table tableContent = { this.props.tableContent }
          tableName = { this.props.tableName }
          pid = { this.props.pid } 
          modalSource = { this.props.modalSource } />
      </div>
    );
  }
})