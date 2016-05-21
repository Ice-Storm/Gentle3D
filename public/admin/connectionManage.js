var React        = require('react');
var User         = require('./user/userManage.js');
var BackBanner   = require('./backBanner/backBanner.js');
var PageHead     = require('./backPageHead/backPageHead.js');

module.exports = React.createClass({
  propTypes: {
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
          pageHeadString = { 'Connection' }
          pageHeadIsHaveButton = { false } />
        <User
          modalSource = { '/admin/connectionConfigCompontent/' }
          source = { '/admin/connectionConfigCompontent' }
          imgName = { 'logo.png' }
          imgTitle = { 'Logo' } />
      </div> 
    );
  }
})