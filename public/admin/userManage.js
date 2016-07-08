var React     = require('react');
var User      = require('./user/userManage.js');
var PageHead  = require('./backPageHead/backPageHead.js');
var m         = require('../../map.json');

module.exports = React.createClass({
  render: function(){
    return (
      <div>
        <PageHead
          pageHeadString = { 'User Manage' }
          pageHeadIsHaveButton = { false } />
        <User
          modalSource = { m.userManageComponent }
          source = { m.userManageComponent }
          imgName = { 'user.jpg' }
          imgTitle = { 'Image' } />
      </div> 
    );
  }
})