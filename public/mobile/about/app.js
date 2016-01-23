var React   = require('react');
var Menu    = require('../common/headMenu/menu.js');
var Nav     = require('../common/head/nav.js');
var Foot    = require('../common/foot/foot.js');
var Content = require('./about.js');

var imageList = [
  { imgName: '1.jpg', introduce: '据说是念念' },
  { imgName: '2.jpg', introduce: '黑客?!' },
  { imgName: '3.jpg', introduce: '宝妈在卖萌' },
  { imgName: '4.jpg', introduce: '什么!嘉荣？' },
  { imgName: '5.jpg', introduce: '未来的财务' },
  { imgName: '6.jpg', introduce: '文都就是酷' },
  { imgName: '7.jpg', introduce: '源·旋转屁股' }
]

var connectionList = {
   id: 1,
   title: '联系方式',
   qq: 523003801,
   wechat: '111',
   address: '湛江市广东海洋大学',
   tel: 222,
   email: '523003801@qq.com',
   introduce: '在使用React.js开发web应用时，我们除了可以在浏览器端渲染组件，还可以在服务器进行组件渲染。一般来说，在服'+
'务器端渲染组件的好处有以下几个：页面加载更快。通过在服务器端渲染组件，服务器端返回的内容就是一个完整的页面，而无需在浏览'+
'端再进行一次渲染；'
} 

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
    imageList: React.PropTypes.Array,
    connectionList: React.PropTypes.object
  },
  render: function() {
    return (
      <div>
        <Nav logo = { this.props.navListHead.logo }
         headerMainPills = { this.props.navListHead.headerMainPills } />
        <Content imageList = { this.props.imageList }
          connectionList = { this.props.connectionList } />
        <Foot footList = { this.props.footList } />
      </div>
    );
  }
})


React.render(<App 
  navListHead = { navListHead }
  footList = { footList }
  connectionList = { connectionList }
  imageList = { imageList }/>,  document.getElementById('body'));