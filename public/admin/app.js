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
var BackUserControl     = require('./userManageCompontent.js');
var BackAddSlideControl = require('./backAddSlide.js');
var BackConControl      = require('./connectionManage.js');

var App = React.createClass({
  propTypes: {
    backNavBar: React.PropTypes.object,
    backBannerWhere: React.PropTypes.string,
    slideBar: React.PropTypes.object
  },
  getInitialState: function(){
    return { crumb: '控制台' };
  },
  changeCrumb: function(crumb){
    this.setState({ crumb: crumb });
  },
  render: function(){
    return (
      <div>
        <ControlIndex
          changeCrumb = { this.changeCrumb } 
          backNavBar = { this.props.backNavBar }
          source = { './admin/backNav' } />
        <BackBanner backBannerWhere = { this.state.crumb } />
        <ContentMain source = { './admin/backSlide' } changeCrumb = { this.changeCrumb } />
        { this.props.children }
      </div>
    );
  }
})

var iniState = {}

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

render(
  <Provider store = { store }>
    <Router>
      <Route path = '/' component = { App }>
        <IndexRoute component = { BackIndexPage }/>
        <Route path = 'imgControlCompontent' component = { BackImgControl }></Route>
        <Route path = 'indexConfigCompontent' component = { BackIndexControl }></Route>
        <Route path = 'userManageCompontent' component = { BackUserControl }></Route>
        <Route path = 'connectionConfigCompontent' component = { BackConControl }></Route>
        <Route path = 'changSlideCompontent' component = { BackAddSlideControl }></Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('body')
)
