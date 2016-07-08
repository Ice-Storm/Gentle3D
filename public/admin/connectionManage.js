var React     = require('react');
var User      = require('./user/userManage.js');
var PageHead  = require('./backPageHead/backPageHead.js');
var m         = require('../../map.json');

module.exports = React.createClass({
  render: function(){
    return (
      <div>
        <PageHead
          pageHeadString = { 'Connection' }
          pageHeadIsHaveButton = { false } />
        <User
          modalSource = { m.connectionConfigComponent }
          source = { m.connectionConfigComponent }
          imgName = { 'logo.png' }
          imgTitle = { 'Logo' } />
      </div> 
    );
  }
})