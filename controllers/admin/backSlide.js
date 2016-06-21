module.exports = {
  getData: function *(){
    return {
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
          flag: 'changSlide'
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
  }
}
