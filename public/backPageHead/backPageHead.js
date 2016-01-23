var React = require('react');
var PageHead = require('../backPageHead/backPageHead.js');
var UploadModal = require('../tools/uploadModal.js');

module.exports = React.createClass({
  propTypes: {
    pageHeadString: React.PropTypes.string,
    pageHeadIsHaveButton: React.PropTypes.string
  },
  getInitialState: function() {
    return { 
      renderCompontent: '',
      uploadConfig: ''
    };
  },
  componentWillMount: function () {
    var that = this;
    var isNew = 'true';
    var url = '/admin/uploadConfig?flag=' + this.props.pageHeadString.toLowerCase() + '&isNew=' + isNew;
    $.get(url, function (data) {
      that.setState({ uploadConfig: data })
    })
  },
  createAddButton: function(isHaveButton) {
    if(this.props.pageHeadIsHaveButton == 'false') {
      return '';
    }
    if(isHaveButton == 'Index' || isHaveButton == 'Connection' || isHaveButton == 'Index Control') {
      return '';
    }
    return (
      <span className = 'pageHead-uploadBtn' onClick = { this.handleClick } >
        <i className="fa fa-cloud-upload pageHead-iconPos"></i>
        <span className = 'pageHead-Btnfont'>Add</span>
      </span>
    );
  },
  handleClick: function (event) {
    var data = this.state.uploadConfig;
    this.setState({ renderCompontent: <UploadModal uploadModalConfig = { data } /> });
  },
  render: function() {
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

