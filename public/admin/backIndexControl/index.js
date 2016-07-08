var React        = require('react');
var ContentMain  = require('./backIndexControl.js');
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