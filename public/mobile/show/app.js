var React   = require('react');
var Menu    = require('../common/headMenu/menu.js');
var Nav     = require('../common/head/nav.js');
var Foot    = require('../common/foot/foot.js');
var Content = require('./content.js');

var App = React.createClass({
  propTypes: {
    navListHead: React.PropTypes.object,
    footList: React.PropTypes.Array,
    imageList: React.PropTypes.Array
  },
  componentWillMount: function(){
    var that = this;
    $.ajax({
      url: './show?ajax=true',
      type: 'GET',
      beforeSend: function(xhr){
        xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OSX)' + 
          'AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1')
      },
      success: function(data){
        that.setState({
          imageList: data.imageList,
          footList: data.footList,
          navListHead: data.navListHead
        })
      }
    })
  },
  getInitialState: function() {
    return {
      imageList: '',
      footList: '',
      navListHead: ''
    }
  },
  render: function() {
    return (
      <div>
        <Nav logo = { this.state.navListHead.logo }
         headerMainPills = { this.state.navListHead.headerMainPills } />
        <Content imageList = { this.state.imageList } />
        <Foot footList = { this.state.footList } />
      </div>
    );
  }
})

React.render(<App />,  document.getElementById('body'));