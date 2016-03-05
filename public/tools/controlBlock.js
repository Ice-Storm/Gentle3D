var React       = require('react');
var UploadModal = require('./uploadModal.js');

module.exports = React.createClass({
  propTypes: {
    pid: React.PropTypes.String,
    controlBlockConfig: React.PropTypes.Object
  },
  getInitialState: function(){
    return {
      pid: this.props.pid || '', 
      renderCompontent: ''
    };
  },
  createControlClock: function(){
    return (
      <ul className = 'controlBlock-iconList' onClick = { this.handleClick }>
        <li data-operator = 'editor'>
          <i data-operator = 'editor' className = 'fa fa-pencil-square-o'></i>
        </li>
        <li data-operator = 'delete'>
          <i data-operator = 'delete' className = 'fa fa-times'></i>
        </li>
      </ul>
    );
  },
  handleClick: function(event){
    var that = this;
    if(event.target.getAttribute('data-operator') == 'editor') {
      var flag = this.props.controlBlockConfig.flag;
      var id = this.props.controlBlockConfig.id;
      var isNew = false;

      var url = '/admin/uploadConfig?flag=' + flag + '&id=' + id + '&isNew=' + isNew;
      $.get(url, function (data){
        that.setState({ renderCompontent: <UploadModal
          pid = { that.state.pid }
          uploadModalConfig = { data } /> });
      })
    }

    if(event.target.getAttribute('data-operator') == 'delete'){
      var flag = this.props.controlBlockConfig.flag;
      var id = this.props.controlBlockConfig.id;
      var url = '/admin/upload/delete?id=' + id + '&flag=' + flag;
      $.get(url, function (data) {
        if(that.state.pid){
          $('#' + that.state.pid).click();
        }
      })
    }
  },
  render: function(){
    return (  
      <div className = 'controlBlock-block'>
        { this.createControlClock() }
        { this.state.renderCompontent }
      </div>
    );
  }
})