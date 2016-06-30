var React = require('react');
var Ajax  = require('@fdaciuk/ajax');
var Link  = require('react-router').Link;
require('./backSlideBar.css');

module.exports = React.createClass({
  propTypes: {
    source: React.PropTypes.string,
    changeCrumb: React.PropTypes.fun
  },
  getInitialState: function(){
    return {
      renderComponentParm: '', //需要渲染组件的参数
      isMount: 0
    };
  },
  componentWillMount: function(){
    if(!this.props.source) return;
    Ajax().get(this.props.source).then(function (response, xhr){
      if(this.isMounted()){
        this.setState({ slideBar: response, isMount: 1 });
      }
    }.bind(this));
  },
  sendCrumb: function(event){
    var crumb = event.target.getAttribute('data-menu');
    this.props.changeCrumb(crumb);
  },  
  //创建左边导航栏
  createNavList: function(navList, menuList){
    var navListArray = [];
    var that = this;
    var navFlag = 0;
    var menuListPills;
    var tempIcon;
    var defaultIconList = ['fa fa-tachometer', 'fa fa-bullseye', 'fa fa-globe', 'fa fa-copy', 'fa fa-stop'];

    navList.map(function(item, index){
      navFlag++;

      if(defaultIconList[index]){
        tempIcon = item.iconNmae ? item.iconNmae : defaultIconList[index];
      } else {
        tempIcon = 'fa fa-bullseye';
      }

      menuListPills = that.createMenuList(menuList, navFlag);
      
      navListArray.push(
        <li key = { navFlag }
         id = { 'navList' + navFlag }
         data-component = { item.flag }
         data-menu = { item.menuText }
         onClick = { that.sendCrumb }>
         <Link to = { item.flag == 'indexControl' ? '/' : '/' + item.flag }>
            <div className = 'BackSlideBar-navList'
              data-menu = { item.menuText }
              data-component = { item.flag }>
              <i className = { tempIcon } data-menu = { item.menuText } style = {{ 'fontSize': '20px' }} ></i>
               <span
                  data-menu = { item.menuText }
                  className = 'BackSlideBar-menuText' 
                  data-component = { item.flag } >
                { item.menuText }
              </span>
            </div>
          </Link>
          <ul id = { 'navPillsList-' + navFlag } className = 'BackSlideBar-navPillsList'>{ menuListPills }</ul>
        </li>
      )
    })
    return navListArray;
  },
  //创建左边导航栏子选项
  createMenuList: function(menuList, navFlag){
    var menuListArray = [];
    var menuFlag = 0;
    var menuListFlag = 0;
    menuList.map(function(item){
      menuFlag++;
      // 判断子选项属于哪个父导航栏
      if(navFlag == item.sort){   
        item.list.map(function(i){
          menuListFlag++;
          menuListArray.push(
            <li key = { menuListFlag } data-component = { i.flag }>
              <i className = 'fa fa-angle-double-right'></i>
              <span style = {{'padding-left': '20px;'}} data-component = { i.flag }>{ i.title }</span>
            </li>
          )
        })
      }
    })
    return menuListArray;
  },
  //处理左边导航栏 小图标点击情况和根据选项选择渲染组件
  handlerClick: function(event){
    var clickId = event.target.id.split('-');
    var clickFlag = clickId[0];
    var clickNum = clickId[1];
    var navPillsListStyle;

    if(document.getElementById('navPillsList-' + clickNum)){
      navPillsListStyle = document.getElementById('navPillsList-' + clickNum).style;
    }

    if(clickFlag == 'navDownFlag'){
      navPillsListStyle.display == 'block' ? 
      navPillsListStyle.display = 'none' : navPillsListStyle.display = 'block'
    }

    //根据点击的选项选择渲染的按钮
    if(event.target.getAttribute('data-component')){
      this.setState({ renderComponentFlag: event.target.getAttribute('data-component') });
      this.ajaxGetData(event.target.getAttribute('data-component'));
    }
  },
  ajaxGetData: function(flag){
    Ajax().get('./admin/' + flag).then(function (response, xhr){
      this.setState({ renderComponentParm: response });
    }.bind(this));
  },
  render: function(){
    var parm = this.state.slideBar ? this.state.slideBar : '';
    return (
      <div>
        <div className = 'BackSlideBar-position'>
          <ul onClick = { this.handlerClick }>
            { this.state.isMount == 1 ? this.createNavList(parm.navList, parm.menuList) : '' }
          </ul>    
        </div>
        { this.state.renderComponent }    
      </div>
    );
  }
})