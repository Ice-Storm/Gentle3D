var React        = require('react');
var ContentMain  = require('./backImgControl.js');
var m            = require('../../../map.json');

module.exports = React.createClass({
  render: function(){
    return (
      <div>
        <ContentMain source = { m.indexConfigComponent } />
      </div>
    );
  }
})