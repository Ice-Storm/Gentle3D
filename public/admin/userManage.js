var React     = require('react');
var User      = require('./user/userManage.js');
var PageHead  = require('./backPageHead/backPageHead.js');

module.exports = React.createClass({
  render: function(){
    return (
      <div>
        <PageHead
          pageHeadString = { 'User Manage' }
          pageHeadIsHaveButton = { false } />
        <User
          modalSource = { '/admin/userManageComponent/' }
          source = { '/admin/userManageComponent' }
          imgName = { 'user.jpg' }
          imgTitle = { 'Image' } />
      </div> 
    );
  }
})