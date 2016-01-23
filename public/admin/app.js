var _            = require('lodash'),
    React        = require('react'),
    Redux        = require('redux'),
    connect      = require('react-redux').connect,
    render       = require('react-dom').render,  
    adminActions = require('./actions.js'),
    Provider     = require('react-redux').Provider,
    reducers     = require('./reducers.js'),
    ControlIndex = require('../backHead/backHead.js'),
    BackBanner   = require('../backBanner/backBanner.js'),
    ContentMain  = require('../backSlideBar/backSlideBar.js');

var stor;

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
    {menuText: '个人中心'}, //  {menuText: '设置' , iconName: ''} iconName参数可选
    {menuText: '退出'} 
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
  render: function() {
    return (
      <div>
        <ControlIndex backNavBar = { this.props.backNavBar } />
        <BackBanner backBannerWhere = { this.props.backBannerWhere } />
        <ContentMain slideBar = { this.props.slideBar } changeCrumb = { this.props.changeCrumb } />
      </div>
    );
  }
})

var iniState = {}

iniState.controlIndexCon = controlIndexCon;
iniState.backSlideBarCon = backSlideBarCon;
iniState.backBannerWhere = backSlideBarCon.navList[0].menuText;

store = Redux.createStore(reducers, iniState);

function mapStateToProps(state) {
  return {
    backNavBar: state.controlIndexCon,
    slideBar: state.backSlideBarCon,
    backBannerWhere: state.backBannerWhere
  }
}

function mapDispatchToProps(dispatch) {
  var changeCrumb = Redux.bindActionCreators(adminActions.changeCrumb, dispatch);
  return {changeCrumb} 
}

var App = connect(mapStateToProps, mapDispatchToProps)(App);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('body')
)
