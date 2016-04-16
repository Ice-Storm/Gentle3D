var React    = require('react');
var Ajax     = require('@fdaciuk/ajax');
var PopModal = require('../tools/modal.js');
var PageHead = require('../admin/backPageHead/backPageHead.js');

module.exports = React.createClass({
  propTypes: {
    pid: React.PropTypes.String,
    tableContent: React.PropTypes.Array,
    modalSource: React.PropTypes.String,
    tableName: React.PropTypes.String
  },
  getInitialState: function(){
    return { 
      pid: this.props.pid || '',
      renderCompontent: ''
    }
  },
  createList: function(messageObj, count){
    var tempPills = [];
  
    for(var i in messageObj){    
      tempPills.push(
        <td>{ messageObj[i] }</td>
      );
    }
  
    if(count != 0){
      tempPills.push(
        <td>
          <i className = 'fa fa-pencil-square-o addSlide-icon'
             data-id = { messageObj.id }
             data-operate = 'editor'></i>
          <i className = 'fa fa-times addSlide-icon'
             data-id = { messageObj.id }
             data-operate = 'delete'></i>
        </td>
      )  
    } else {
      tempPills.push(<td></td>);
    }
    
    return tempPills;
  },
  createTable: function(arr){
    var tempList = [];

    for(var i = 0; i < arr.length; i++){
      tempList.push(
        <tr key = { i }>
          { this.createList(arr[i], i) }
        </tr>
      )
    }
    return tempList;
  },
  handleClick: function(event){
    var that = this;
    var id = event.target.getAttribute('data-id');
    var operate = event.target.getAttribute('data-operate');
    
    if(operate == 'editor') {
      var url = this.props.modalSource + 'addModal';
      Ajax().get(url).then(function(data) {
        data.config.url = data.config.url + '?id=' + id;
        that.setState({ renderCompontent: <PopModal popSelectList = { data } pid = { that.state.pid }/> })  
      }.bind(this));
    }
    
    if(operate == 'delete'){
      var url = this.props.modalSource + 'delete?id=' + id;
      $.get(url, function(data) {
        if(that.state.pid){
          $('#' + that.state.pid).click();
        }
      })
    }

    if(operate == 'create'){
      var url = this.props.modalSource + 'create';
      $.get(url, function(data) {
        data.config.url = data.config.url;
        that.setState({ renderCompontent: <PopModal popSelectList = { data } pid = { that.state.pid }/> })  
      })
    }
  },
  render: function(){
    return (
      <div onClick = { this.handleClick }>
        <div className = 'addSlide-tablePos'>
          <div className = 'addSlide-tableBanner'>
            <span className = 'addSlide-title'>{ this.props.tableName }</span>
            <i className = 'fa fa-plus addSlide-addIcon'
              data-operate = 'create'></i>
          </div>
          <table className = 'addSlide-table'>
            <tbody>
              { this.createTable(this.props.tableContent) }
            </tbody>
          </table>
        </div>
        { this.state.renderCompontent }
      </div>
    );
  }
})