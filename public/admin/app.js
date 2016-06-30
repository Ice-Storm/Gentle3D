var React               =  require('react');
var Redux               =  require('redux');
var connect             =  require('react-redux').connect;
var render              =  require('react-dom').render;
var Provider            =  require('react-redux').Provider;
var Router              =  require('react-router').Router;
var Route               =  require('react-router').Route;
var IndexRoute          = require('react-router').IndexRoute;
var history             =  require('history');
var adminActions        =  require('./actions.js');
var reducers            =  require('./reducers.js');

var ControlIndex        =  require('./backHead/backHead.js');
var BackBanner          =  require('./backBanner/backBanner.js');
var ContentMain         =  require('./backSlideBar/backSlideBar.js');
var BackIndexPage       = require('./backIndexPageControl/backIndexPageControl.js');
var BackIndexControl    = require('./backIndexControl/index.js');
var BackImgControl      = require('./backImgControl/index.js');
var BackUserControl     = require('./userManage.js');
var BackAddSlideControl = require('./backAddSlide.js');
var BackConControl      = require('./connectionManage.js');

require('../lib/ini.css');

var App = React.createClass({
  propTypes: {
    changeCrumb: React.PropTypes.fun,
    crumb: React.PropTypes.string
  },
  render: function(){
    return (
      <div>
        <ControlIndex
          changeCrumb = { this.changeCrumb }
          source = { './admin/backNav' } />
        <BackBanner backBannerWhere = { this.props.crumb } />
        <ContentMain source = { './admin/backSlide' } changeCrumb = { this.props.changeCrumb } />
        { this.props.children }
      </div>
    );
  }
})

var iniState = {
  //当前面包屑
  crumb: '控制台'
}

var store = Redux.createStore(reducers, iniState);

function mapStateToProps(state){
  return { crumb: state.crumb }
}

function mapDispatchToProps(dispatch){ 
  return Redux.bindActionCreators(adminActions, dispatch)
}

var App = connect(mapStateToProps, mapDispatchToProps)(App);

render(
  <Provider store = { store }>
    <Router>
      <Route path = '/' component = { App }>
        <IndexRoute component = { BackIndexPage }/>
        <Route path = 'imgControlComponent' component = { BackImgControl }></Route>
        <Route path = 'indexConfigComponent' component = { BackIndexControl }></Route>
        <Route path = 'userManageComponent' component = { BackUserControl }></Route>
        <Route path = 'connectionConfigComponent' component = { BackConControl }></Route>
        <Route path = 'changSlide' component = { BackAddSlideControl }></Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
