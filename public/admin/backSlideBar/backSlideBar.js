var React                 = require('react');
var IndexConfigComponent  = require('../backIndexControl/backIndexControl.js');
var ImgControlComponent   = require('../backImgControl/backImgControl.js');
var IndexControlComponent = require('../backIndexPageControl/backIndexPageControl.js');
var AddSlide              = require('../backAddSlide.js');
var UserManage            = require('../userManageCompontent.js');

module.exports = React.createClass({
  propTypes: {
    slideBar: React.PropTypes.Object,
    changeCrumb: React.PropTypes.Func
  },
  getInitialState: function(){
    return {
      // 进入后默认渲染左边导航栏第一个组件 
      renderComponentFlag: this.props.slideBar.navList[0].flag,
      renderComponent: <IndexControlComponent compontentConfig = {''} />,
      renderComponentParm: '', //需要渲染组件的参数
      pid: ''
    };
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
         onClick = { that.props.changeCrumb }>
          <div className = 'BackSlideBar-navList'
           data-component = { item.flag }
           data-pid = { 'navList' + navFlag }>
            <i className = { tempIcon } style = {{ 'fontSize': '20px' }} data-pid = { 'navList' + navFlag }></i>
            <span className = 'BackSlideBar-menuText' data-component = { item.flag } data-pid = { 'navList' + navFlag }>
              { item.menuText }
            </span>
            {
              //如果有子栏目则有下拉按钮
              menuListPills.length ? 
              <i className = 'fa fa-angle-down BackSlideBar-iconDown'
               data-pid = { 'navList' + navFlag }
               id = {'navDownFlag-' + navFlag }></i> : ''
            }
          </div>
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
    var pid = event.target.getAttribute('data-pid');

    if(document.getElementById('navPillsList-' + clickNum))
      navPillsListStyle = document.getElementById('navPillsList-' + clickNum).style;

    if(clickFlag == 'navDownFlag') {
      navPillsListStyle.display == 'block' ? 
      navPillsListStyle.display = 'none' : navPillsListStyle.display = 'block'
    }

    //根据点击的选项选择渲染的按钮
    if(event.target.getAttribute('data-component')) {
      this.setState({
        pid: pid,
        renderComponentFlag: event.target.getAttribute('data-component')
      })
      this.ajaxGetData(event.target.getAttribute('data-component'));
    }
  },
  chooseCompontent: function(flag){
    switch(flag) {
      case 'indexConfigCompontent':
        var compontent = <IndexConfigComponent
          pid = { this.state.pid }
          compontentConfig = { this.state.renderComponentParm } />
        return compontent;
        break;
      case 'imgControlCompontent':
        var compontent = <ImgControlComponent
          pid = { this.state.pid } 
          compontentConfig = { this.state.renderComponentParm } />
        return compontent;
        break;
      case 'connectionConfigCompontent':
        var compontent = <UserManage
          userInfo = { this.state.renderComponentParm }
          pageHeadString = { 'Connection' }
          pageHeadIsHaveButton = { false }
          imgName = { this.state.renderComponentParm.logo }
          imgTitle = { 'Logo' }
          pid = { this.state.pid }
          modalSource = { './admin/connectionConfigCompontent/' } />
        return compontent;
        break; 
      case 'indexControl':
        var compontent = <IndexControlComponent compontentConfig = { this.state.renderComponentParm } />
        return compontent;
        break;
      case 'changSlideCompontent':
        var compontent = <AddSlide 
          tableContent = { this.state.renderComponentParm }
          modalSource = { './admin/changSlideCompontent/' }
          tableName = { '修改展示页导航' }
          pageHeadString = { 'ShowSlide' }
          pid = { this.state.pid }
          pageHeadIsHaveButton = { false } />
        return compontent;
        break;
      case 'userManageCompontent':
        var compontent = <UserManage
         userInfo = { this.state.renderComponentParm.info }
         pageHeadString = { 'UserManage' }
         pageHeadIsHaveButton = { false }
         imgName = { this.state.renderComponentParm.image }
         imgTitle = { 'Image' }
         pid = { this.state.pid }
         modalSource = { './admin/userManageCompontent/' } />
        return compontent;
        break;
    }
  },
  ajaxGetData: function(flag){
    var that = this;
    $.get('./admin/' + flag, function(data) {
      that.setState({ renderComponentParm: data })
      that.setState({ renderComponent: that.chooseCompontent(flag) })
    })
  },
  render: function(){
    var parm = this.props.slideBar;
    return (
      <div>
        <div className = 'BackSlideBar-position'>
          <ul onClick = { this.handlerClick }>{ this.createNavList(parm.navList, parm.menuList) }</ul>    
        </div>
        { this.state.renderComponent }    
      </div>
    );
  }
})