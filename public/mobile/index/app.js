var React   = require('react');
var Ajax    = require('@fdaciuk/ajax');
var Menu    = require('../common/headMenu/menu.js');
var Nav     = require('../common/head/nav.js');
var Foot    = require('../common/foot/foot.js');
var Content = require('./index.js');

var App = React.createClass({
  propTypes: {
    navListHead: React.PropTypes.object,
    navList: React.PropTypes.Array,
    footList: React.PropTypes.Array,
    imageList: React.PropTypes.Array,
    imageShowList: React.PropTypes.Array
  },
  componentWillMount: function(){
    var that = this;
    Ajax({
      url: './?ajax=true',
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OSX) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
      }
    }).then(function (response, xhr){
      that.setState({
        imageShowList: response.imageShowList,
        imageList: response.imageList,
        footList: response.footList,
        navListHead: response.navListHead,
        navList: response.navList
      })
    })
  },
  getInitialState: function() {
    return {
      imageShowList: '',
      imageList: '',
      navList: '',
      footList: '',
      navListHead: ''
    }
  },
  render: function() {
    return (
      <div>
        <Nav logo = { this.state.navListHead.logo }
         headerMainPills = { this.state.navListHead.headerMainPills } />
        <Content navList = { this.state.navList }
          imageList = { this.state.imageList }
          imageShowList = { this.state.imageShowList } />
        <Foot footList = { this.state.footList } />
      </div>
    );
  }
})

React.render(<App />,  document.getElementById('body'));