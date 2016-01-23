var React = require('react');
var PageHead = require('./backPageHead/backPageHead.js');
var BackSlideBar = require('./backSlideBar/backSlideBar.js');
var PopModal = require('./tools/modal.js');
var UploadModal = require('./tools/uploadModal.js');
var User = require('./user/userManage.js');

module.exports = React.createClass({
  propTypes: {
    pageHeadString: React.PropTypes.String,
    pageHeadIsHaveButton: React.PropTypes.String,
    imgTitle: React.PropTypes.String,
    imgName: React.PropTypes.String,
    userInfo: React.PropTypes.object,
    modalSource: React.PropTypes.String
  },
  render: function() {
    return (
      <div>
        <div>
          <PageHead pageHeadString = { this.props.pageHeadString }
             pageHeadIsHaveButton = { this.props.pageHeadIsHaveButton }/>  
        </div>
        <User imgTitle = { this.props.imgTitle }
          imgName = { this.props.imgName }
          userInfo = { this.props.userInfo }
          modalSource = { this.props.modalSource } />
      </div> 
    );
  }
})