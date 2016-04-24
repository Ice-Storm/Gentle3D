/*
eg: var controlIndexCon = {
  controlIndexName: '砖头科技',
  controlInfo: [
    //对应渲染的组件， 任务未处理个数，小图标
    {
      renderComponent: '1', infoNum: '3', iconName: 'fa fa-tasks'
    },
    {
      renderComponent: '2', infoNum: '5', iconName: 'fa fa-bell'
    },
    {
      renderComponent: '3', infoNum: '1', iconName: 'fa fa-envelope'
    }
  ],
  userImg: 'user.jpg',
  userName: '贝克汉姆',
  userMenu: [
    {menuText: '设置', url: navList6, iconName: 'fa fa-cog'},
    {menuText: '个人中心', url: navList6, iconName: 'fa fa-user'},
    {menuText: '退出', url: navList6, iconName: 'fa fa-power-off'}
  ]
}

React.render( <ControlIndex backNavBar = { controlIndexCon } />, document.getElementById('header') );

*/

var React = require('react');
var Ajax  = require('@fdaciuk/ajax');
var Link  = require('react-router').Link;

module.exports = React.createClass({
  propTypes: {
    source: React.PropTypes.string,
    backNavBar: React.PropTypes.object
  },
  getInitialState: function(){
    return {
      url: '../admin/backHead/img/',
      renderComponent: '',
      backNavBar: this.props.backNavBar,
      isMount: 0
    };
  },
  componentWillMount: function(){
    if(!this.props.source) return;
    Ajax().get(this.props.source).then(function (response, xhr){
      if(this.isMounted()){
        this.setState({ backNavBar: response, isMount: 1 });
      }
    }.bind(this));
  },
  createNavPills: function(arr){
    var navPills = [];
    var defaultNavIconList = ['fa fa-tasks', 'fa fa-bell', 'fa fa-envelope'];
    var tempIcon;
    arr.map(function(item, index){
      if (defaultNavIconList[index]) {
        tempIcon = arr[index].iconName ? arr[index].iconName : defaultNavIconList[index];
      } else {
        tempIcon = 'fa fa-tasks';
      }
      // 因为向右浮动 所以unshift
      navPills.unshift(
        <li className = { 'controlIndex-navIconBg' + index } data-component = { arr[index].renderComponent }>
          <i className = { tempIcon + ' controlIndex-navIcon'}
            data-component = { arr[index].renderComponent }></i>
          <span className = 'controlIndex-navIconNum'>
            <center data-component = { arr[index].renderComponent }>{ arr[index].infoNum }</center>
          </span>
        </li>
      )
    })
    //用户头像和用户信息
    navPills.unshift(
      <li className = 'controlIndex-navUser'>
        <img src = { this.state.url + this.state.backNavBar.userImg } className = 'controlIndex-navUserImg'/>
        <span>{ this.state.backNavBar.userName }</span>
        <i className = 'fa fa-angle-down' id = 'controlIndex-navSlideDown'></i>
      </li>
    )
    return navPills;
  },
  createNavSlideMneu: function(arr){
    var menuList = [];
    var defaultUserIconList = ['fa fa-cog', 'fa fa-user', 'fa fa-power-off'];
    var flag = 0;
    var tempIcon;
    arr.map(function(item, index) {
      flag++;
      if(defaultUserIconList[index]) {
        tempIcon = item.iconName ? item.iconName : defaultUserIconList[index];
      } else {
        tempIcon = 'fa fa-user';
      }
      menuList.push(
        <Link to = { item.url }>
          <li key = { flag }>
            <i className = { tempIcon }></i>
            <span>{ item.menuText }</span>
          </li>
        </Link>
      )
    })
    return menuList;
  },
  handleClick: function(event) {
    if(event.target.getAttribute('data-component')){
      this.setState({
        renderComponent:  event.target.getAttribute('data-component')}
      );
    }
    //点击下拉按钮
    if(event.target.id == 'controlIndex-navSlideDown') {
      var userMenuStyle = document.getElementById('controlIndex-userMenu').style;
      userMenuStyle.display == 'block' ? userMenuStyle.display = 'none' : userMenuStyle.display = 'block';
    }
  },
  render: function(){
    return (
      <div className = 'controlIndex-nav'>
        <div className = 'controlIndex-navFont'>
          <i className = 'fa fa-tree'></i>
          <span>{ this.state.isMount == 1 ? this.state.backNavBar.controlIndexName : '' }</span>
        </div>
        <ul className = 'controlIndex-navIconList' onClick = { this.handleClick }>
          { this.state.isMount == 1 ? this.createNavPills(this.state.backNavBar.controlInfo) : '' }
        </ul>
        <ul className = 'controlIndex-userMenu' id = 'controlIndex-userMenu'>
          { this.state.isMount == 1 ? this.createNavSlideMneu(this.state.backNavBar.userMenu) : ''}
        </ul>
      </div>
    );
  }
})