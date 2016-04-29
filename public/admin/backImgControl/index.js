var React        = require('react');
var ContentMain  = require('./backImgControl.js');

module.exports = React.createClass({
  render: function(){
    return (
      <div>
        <ContentMain source = { './admin/indexConfigCompontent' } />
      </div>
    );
  }
})