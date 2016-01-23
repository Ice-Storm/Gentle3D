var React   = require('react');
var Menu    = require('../common/headMenu/menu.js');
var Nav     = require('../common/head/nav.js');
var Foot    = require('../common/foot/foot.js');
var Content = require('./content.js');

var imageList = [
  { imgName: '1.jpg', url: './index' },
  { imgName: '2.jpg', url: '#' },
  { imgName: '3.jpg', url: '#' },
  { imgName: '4.jpg', url: '#' }
]

var footList = [
  { title: '电脑版', url: './index' },
  { title: '砖头社区', url: '#' },
  { title: '关于我们', url: '#' }
]

var navListHead = { 
  logo: '1446179518553.png',
  headerMainPills:[ 
    { navTitle: '产品展示', navUrl: './show' },
    { navTitle: '关于我们', navUrl: './about' },
    { navTitle: '后台管理', navUrl: './login' }
  ]
}

var App = React.createClass({
  propTypes: {
    navListHead: React.PropTypes.object,
    footList: React.PropTypes.Array,
    imageList: React.PropTypes.Array
  },
  render: function() {
    return (
      <div>
        <Nav logo = { this.props.navListHead.logo }
         headerMainPills = { this.props.navListHead.headerMainPills } />
        <Content imageList = { this.props.imageList } />
        <Foot footList = { this.props.footList } />
      </div>
    );
  }
})


React.render(<App 
  navListHead = { navListHead }
  footList = { footList }
  imageList = { imageList }/>,  document.getElementById('body'));