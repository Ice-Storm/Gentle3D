var React       = require('react');
var Ajax        = require('@fdaciuk/ajax');
var PageHead    = require('../backPageHead/backPageHead.js');
var UploadModal = require('../../tools/uploadModal.js');

module.exports = React.createClass({
  propTypes: {
    pid: React.PropTypes.String,
    pageHeadString: React.PropTypes.String,
    changeParent: React.PropTypes.Fun,
    pageHeadIsHaveButton: React.PropTypes.Bool
  },
  getInitialState: function(){
    return { 
      renderCompontent: '',
      uploadConfig: '',
      url: ''
    };
  },
  componentWillMount: function(){
    var isNew = true;
    var url = '/admin/uploadConfig?flag=' + this.props.pageHeadString.toLowerCase() + '&isNew=' + isNew;

    this.setState({ url: url });

    Ajax().get(url).then(function(response, xhr){
      this.setState({ uploadConfig: response });
    }.bind(this));
  },
  createAddButton: function(isHaveButton){
    if(!this.props.pageHeadIsHaveButton){
      return '';
    }
    if(isHaveButton == 'Index' || isHaveButton == 'Connection' || isHaveButton == 'Index Control'){
      return '';
    }
    return (
      <span className = 'pageHead-uploadBtn' onClick = { this.handleClick } >
        <i className="fa fa-cloud-upload pageHead-iconPos"></i>
        <span className = 'pageHead-Btnfont'>Add</span>
      </span>
    );
  },
  handleClick: function(event){
    var data = this.state.uploadConfig;
    this.setState({ 
      renderCompontent: <UploadModal uploadModalConfig = { data } source = { this.state.url } changeParent = { this.props.changeParent } />
    });
  },
  render: function(){
  	return (
      <div className = 'indexConfigComponent-position'>
  			<span className = 'pageHead-title'>
          <span className = 'pageHead-font'>{ this.props.pageHeadString }</span>
          { this.createAddButton(this.props.pageHeadString) }
        </span>
        { this.state.renderCompontent }
      </div>
  	);
  }
})

