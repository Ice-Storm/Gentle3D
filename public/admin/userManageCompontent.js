var React        = require('react');
var User         = require('./user/userManage.js');
var ControlIndex = require('./backHead/backHead.js');
var BackBanner   = require('./backBanner/backBanner.js');
var SlideBar     = require('./backSlideBar/backSlideBar.js');
var PageHead     = require('./backPageHead/backPageHead.js');

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
        <PageHead
          pageHeadString = { 'User Manage' }
          pageHeadIsHaveButton = { false } />
        <User
          modalSource = { '/admin/userManageCompontent/' }
          source = { '/admin/userManageCompontent' }
          imgName = { 'user.jpg' }
          imgTitle = { 'Image' } />
      </div> 
    );
  }
})