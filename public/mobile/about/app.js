var React   = require('react');
var Ajax    = require('@fdaciuk/ajax');
var Menu    = require('../common/headMenu/menu.js');
var Nav     = require('../common/head/nav.js');
var Foot    = require('../common/foot/foot.js');
var Content = require('./about.js');

var App = React.createClass({
  propTypes: {
    navListHead: React.PropTypes.Object,
    footList: React.PropTypes.Array,
    imageList: React.PropTypes.Array,
    connectionList: React.PropTypes.Object
  },
  componentWillMount: function(){
    Ajax({
      url: './about?ajax=true',
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OSX) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
      }
    }).then(function (response, xhr){
      this.setState({
        connectionList: response.content.connectionList,
        imageList: response.content.imageList,
        footList: response.footList,
        navListHead: response.navList
      })
    }.bind(this));
  },
  getInitialState: function() {
    return {
      connectionList: '',
      imageList: '',
      navListHead: '',
      footList: ''
    }
  },
  render: function() {
    return (
      <div>
        <Nav logo = { this.state.navListHead.logo }
         headerMainPills = { this.state.navListHead.headerMainPills } />
        <Content imageList = { this.state.imageList }
          connectionList = { this.state.connectionList } />
        <Foot footList = { this.state.footList } />
      </div>
    );
  }
})

React.render(<App />,  document.getElementById('body'));