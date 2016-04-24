module.exports = {
  getData: function *(){
    return {
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
        { menuText: '设置', url: '/indexConfigCompontent' },
        { menuText: '个人中心', url: '/userManageCompontent' }, //  {menuText: '设置' , iconName: ''} iconName参数可选
        { menuText: '退出', url: '/' } 
      ]
    }
  }
}