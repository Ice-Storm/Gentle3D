var React     = require('react');
var User      = require('./user/userManage.js');
var PageHead  = require('./backPageHead/backPageHead.js');

module.exports = React.createClass({
  render: function(){
    return (
      <div>
        <PageHead
          pageHeadString = { 'Connection' }
          pageHeadIsHaveButton = { false } />
        <User
          modalSource = { '/admin/connectionConfigComponent/' }
          source = { '/admin/connectionConfigComponent' }
          imgName = { 'logo.png' }
          imgTitle = { 'Logo' } />
      </div> 
    );
  }
})