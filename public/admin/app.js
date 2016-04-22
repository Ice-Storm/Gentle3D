var _            = require('lodash');
var React        = require('react');
var Redux        = require('redux');
var connect      = require('react-redux').connect;
var render       = require('react-dom').render;
var Provider     = require('react-redux').Provider;
var Router       = require('react-router').Router;
var Route        = require('react-router').Route;
var history      = require('history');
var adminActions = require('./actions.js');
var reducers     = require('./reducers.js');
var ControlIndex = require('./backHead/backHead.js');
var BackBanner   = require('./backBanner/backBanner.js');
var ContentMain  = require('./backSlideBar/backSlideBar.js');

var BackIndexControl = require('./backIndexControl/index.js');

var controlIndexCon = {
  controlIndexName: '砖头科技',
  controlInfo: [
    //对应渲染的组件， 任务未处理个数，小图标
    { renderComponent: '1', infoNum: '3' },
    { renderComponent: '2', infoNum: '5' }, // { renderComponent: '3', infoNum: '3', iconName: ''}
    { renderComponent: '3', infoNum: '3' }  // iconName参数可选
  ],
  userImg: 'user.jpg',
  userName: '贝克汉姆',
  userMenu: [
    {menuText: '设置'},
    {menuText: '个人中心', targetId: 'navList3'}, //  {menuText: '设置' , iconName: ''} iconName参数可选
    {menuText: '退出', targetId: 'return'} 
  ]
}

var backSlideBarCon = {
  navList: [
    {
      menuText: '控制台',
      flag: 'indexControl' //选择渲染的子组件的名字
    },
    {
      menuText: '首页配置',
      flag: 'indexConfigCompontent'
    },
    {
      menuText: '用户管理',
      flag: 'userManageCompontent'
    },
    {
      menuText: '图片',
      flag: 'imgControlCompontent'
    },
    {
      menuText: '关于我们',
      flag: 'connectionConfigCompontent'
    },
    {
      menuText: '产品展示',
      flag: 'changSlideCompontent'
    }
  ],
  menuList: [
    {
      sort: '1', //标识属于哪个nav列表
      list: [
        {
          // iconName: 'fa fa-bullseye' 可选参数
          title: '测试', 
          flag: '1'  //选择渲染的子组件的名字
        },
        {
          title: 'Test',
          flag: '2'
        },
        {
          title: 'TTTTest',
          flag: '3'
        },
        {
          title: 'Test',
          flag: '5'
        }
      ],
    },
    {
      sort: '3', //标识属于哪个nav列表
      list: [
        {
          title: '测试',
          flag: '1'  
        },
        {
          title: 'Test',
          flag: '2'
        }
      ],
    }
  ]
}

var App = React.createClass({
  propTypes: {
    backNavBar: React.PropTypes.object,
    backBannerWhere: React.PropTypes.string,
    slideBar: React.PropTypes.object
  },
  render: function(){
    return (
      <div>
        <ControlIndex backNavBar = { this.props.backNavBar } source = { './admin/backNav' } />
        <BackBanner backBannerWhere = { this.props.backBannerWhere } />
        <ContentMain 
          slideBar = { this.props.slideBar }
          changeCrumb = { this.props.changeCrumb } />
      </div>
    );
  }
})

var iniState = {}

iniState.controlIndexCon = controlIndexCon;
iniState.backSlideBarCon = backSlideBarCon;
iniState.backBannerWhere = backSlideBarCon.navList[0].menuText;

var store = Redux.createStore(reducers, iniState);

function mapStateToProps(state){
  return {
    backNavBar: state.controlIndexCon,
    slideBar: state.backSlideBarCon,
    backBannerWhere: state.backBannerWhere
  }
}

function mapDispatchToProps(dispatch){ 
  return Redux.bindActionCreators(adminActions, dispatch)
}

var App = connect(mapStateToProps, mapDispatchToProps)(App);

var IndexRoute = Router.IndexRoute;

render(
  <Provider store = { store }>
    <Router>
      <Route path = "/" component = { App }></Route>
      <Route path = "/backIndexControl" component = { BackIndexControl }></Route>
    </Router>
  </Provider>,
  document.getElementById('body')
)
