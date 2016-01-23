var React   = require('react');
var Menu    = require('../common/headMenu/menu.js');
var Nav     = require('../common/head/nav.js');
var Foot    = require('../common/foot/foot.js');
var Content = require('./index.js');

var imageList = [
  { imgName: '6.jpg' },
  { imgName: '7.jpg' }
] 

var navList = [
  { navName: '产品展示', url: './show', iconName: 'fa fa-paper-plane-o' },
  { navName: '关于我们', url: './about', iconName: 'fa fa-fighter-jet' },
  { navName: '关于我们', url: './about', iconName: 'fa fa-pencil' },
  { navName: '产品展示', url: './show', iconName: 'fa fa-bicycle' }
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

var imageShowList = [
  { imgName: '3.jpg' }
]


var App = React.createClass({
  propTypes: {
    navListHead: React.PropTypes.object,
    navList: React.PropTypes.Array,
    footList: React.PropTypes.Array,
    imageList: React.PropTypes.Array,
    imageShowList: React.PropTypes.Array
  },
  render: function() {
    return (
      <div>
        <Nav logo = { this.props.navListHead.logo }
         headerMainPills = { this.props.navListHead.headerMainPills } />
        <Content navList = { this.props.navList }
          imageList = { this.props.imageList }
          imageShowList = { this.props.imageShowList } />
        <Foot footList = { this.props.footList } />
      </div>
    );
  }
})

React.render(<App 
  navListHead = { navListHead }
  navList = { navList }
  footList = { footList }
  imageShowList = { imageShowList }
  imageList = { imageList }/>,  document.getElementById('body'));