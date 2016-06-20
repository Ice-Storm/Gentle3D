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
          modalSource = { '/admin/userManageCompontent/' }
          source = { '/admin/userManageCompontent' }
          imgName = { 'user.jpg' }
          imgTitle = { 'Image' } />
      </div> 
    );
  }
})