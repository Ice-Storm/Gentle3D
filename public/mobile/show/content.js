var React = require('react');

module.exports = React.createClass({
  propTypes: {
    imageList: React.PropTypes.array
  },
  getInitialState: function() {
    return { url: '../image/show/' }
  },
  createImgList: function(arr) {
    var temp = [];
    for(var i = 0; i < arr.length; i++) {
      temp.push(
        <li><img src = { this.state.url + arr[i].imgName } className = 'show-contentImg' /></li>
      )
    }
    return temp;
  },
  render: function(){
    return (
      <div className = 'show-content'>
        <ul>{ this.createImgList(this.props.imageList) }</ul>
      </div>
    );
  }
})