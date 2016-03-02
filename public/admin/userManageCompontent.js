var React        = require('react');
var PageHead     = require('./backPageHead/backPageHead.js');
var BackSlideBar = require('./backSlideBar/backSlideBar.js');
var User         = require('./user/userManage.js');
var PopModal     = require('../tools/modal.js');
var UploadModal  = require('../tools/uploadModal.js');

module.exports = React.createClass({
  propTypes: {
    pid: React.PropTypes.String,
    pageHeadString: React.PropTypes.String,
    pageHeadIsHaveButton: React.PropTypes.Bool,
    imgTitle: React.PropTypes.String,
    imgName: React.PropTypes.String,
    userInfo: React.PropTypes.Object,
    modalSource: React.PropTypes.String
  },
  render: function(){
    return (
      <div>
        <div>
          <PageHead pageHeadString = { this.props.pageHeadString }
             pageHeadIsHaveButton = { this.props.pageHeadIsHaveButton }/>  
        </div>
        <User imgTitle = { this.props.imgTitle }
          imgName = { this.props.imgName }
          userInfo = { this.props.userInfo }
          pid = { this.props.pid }
          modalSource = { this.props.modalSource } />
      </div> 
    );
  }
})