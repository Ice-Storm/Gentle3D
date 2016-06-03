var React       = require('react');
var Ajax        = require('@fdaciuk/ajax');
var UploadModal = require('./uploadModal.js');

module.exports = React.createClass({
  propTypes: {
    changeParent: React.PropTypes.fun,
    controlBlockConfig: React.PropTypes.Object
  },
  getInitialState: function(){
    return { renderCompontent: '' };
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
    if(event.target.getAttribute('data-operator') == 'editor') {
      var flag = this.props.controlBlockConfig.flag;
      var id = this.props.controlBlockConfig.id;
      var isNew = false;

      var url = '/admin/uploadConfig?flag=' + flag + '&id=' + id + '&isNew=' + isNew;
      Ajax().get(url).then(function (response) {
        this.setState({ renderCompontent: <UploadModal
          source = { url }
          changeParent = { this.props.changeParent } />
        });
      }.bind(this))
    }

    if(event.target.getAttribute('data-operator') == 'delete'){
      var flag = this.props.controlBlockConfig.flag;
      var id = this.props.controlBlockConfig.id;
      var url = '/admin/upload/delete?id=' + id + '&flag=' + flag;
      Ajax().get(url).then(function (){
        if(this.props.changeParent){ 
          this.props.changeParent();
        }
      }.bind(this));
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