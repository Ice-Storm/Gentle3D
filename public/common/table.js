var React    = require('react');
var Ajax     = require('@fdaciuk/ajax');
var PopModal = require('./modal.js');
var PageHead = require('../admin/backPageHead/backPageHead.js');

module.exports = React.createClass({
  propTypes: {
    tableContent: React.PropTypes.Array,
    modalSource: React.PropTypes.String,
    source: React.PropTypes.String,
    tableName: React.PropTypes.String
  },
  getInitialState: function(){
    return { 
      renderCompontent: '',
      tableContent: this.props.tableContent,
      tableName: this.props.tableName || '',
      isMount: 0,
      isRefresh: 0
    }
  },
  componentWillMount: function(){
    this.fresh();
  },
  fresh: function(){
    Ajax().get(this.props.source).then(function(response, xhr){
      this.setState({ 
        tableContent: response,
        isMount: 1,
        isRefresh: 0
      });
    }.bind(this));
  },
  cententChange: function(){
    this.setState({ isRefresh: 1 });
  },
  createList: function(messageObj, count){
    var tempPills = [];
  
    for(var i in messageObj){    
      tempPills.push( <td>{ messageObj[i] }</td> );
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
      tempList.push( <tr key = { i }>{ this.createList(arr[i], i) }</tr> )
    }
    
    return tempList;
  },
  handleClick: function(event){
    var that = this;
    var id = event.target.getAttribute('data-id');
    var operate = event.target.getAttribute('data-operate');
    
    if(operate == 'editor') {
      var url = this.props.modalSource + 'addModal';
      Ajax().get(url).then(function(data, xhr){
        data.config.url = data.config.url + '?id=' + id;
        that.setState({ renderCompontent: <PopModal popSelectList = { data } changeParent = { this.cententChange } /> })  
      }.bind(this));
    }
    
    if(operate == 'delete'){
      var url = this.props.modalSource + 'delete?id=' + id;
      Ajax().get(url).then(function(data, xhr){
        this.fresh();
      }.bind(this));
    }
    
    if(operate == 'create'){
      var url = this.props.modalSource + 'create';
      Ajax().get(url).then(function(data, xhr){
        data.config.url = data.config.url + '?id=' + id;
        that.setState({ renderCompontent: <PopModal popSelectList = { data } changeParent = { this.cententChange } /> })  
      }.bind(this));
    }
  },
  render: function(){
    this.state.isRefresh == 1 ? this.fresh() : '';
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
              { this.state.isMount == 1 ? this.createTable(this.state.tableContent) : '' }
            </tbody>
          </table>
        </div>
        { this.state.renderCompontent }
      </div>
    );
  }
})
