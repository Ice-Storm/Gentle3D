var React        = require('react');
var ContentMain  = require('./backIndexControl.js');

module.exports = React.createClass({
  render: function(){
    return (
      <div>
        <ContentMain source = { './admin/indexConfigComponent' } />
      </div>
    );
  }
})