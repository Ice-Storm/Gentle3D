var Sequelize = require('sequelize');
var path = require('path');
var databaseConfig = require('../config.default.js').database;

var sequelize = new Sequelize(databaseConfig.database, databaseConfig.user, databaseConfig.password, {
  host: databaseConfig.host,
  dialect: databaseConfig.dialect,
  charset: databaseConfig.charset,
  collate: databaseConfig.collate, //排序时根据utf8变码格式来排序
  pool: databaseConfig.pool,
  logging: false
});

function load(name) {
  return sequelize.import(path.join(__dirname, name));
}

module.exports = {
  sequelize: sequelize,
  Index: load('index'),
  IndexImg: load('indexImg'),
  Nav: load('nav'),
  About: load('about'),
  AboutImg: load('aboutImg'),
  ShowSlide: load('showSlide'),
  ShowContent: load('showContent'),
  User: load('user'),
  WebConfig: load('webConfig'),
  Statistics: load('statistics'),
  Visite: load('everyDayVisite')
}

//CREATE DATABASE `3dtest1` CHARACTER SET utf8 COLLATE utf8_general_ci;
sequelize.sync({ force: 'false' }).then(function() {
  load('user').bulkCreate([
    {
     user_name: 'admin',
     user_password: 'admin',
     user_is_admin: '1',
     user_img: 'user.jpg'
    }
  ])

  load('webConfig').bulkCreate([
    {
     logo: 'logo.png',
     copyright: 'Copyright ? 2012 Adobe Systems Incorporated. All rights reserved',
     textName: '123Name',
     compony: "砖 头 科 技"
    }
  ])

  load('nav').bulkCreate([
     {
      navTitle: '产品展示',
      navUrl: './show',
      navName: '321',
      bannerTitle: '产品展示',
      bannerContent: '海涵出品必属精品',
      bannerName: 321
    },
    {
      navTitle: '关于我们',
      navUrl: './about',
      navName: '3d_navList1',
      bannerTitle: '关于我们',
      bannerContent: '湛江一流科技公司哦',
      bannerName: 3211
    },
    {
      navTitle: '后台管理',
      navUrl: './login',
      navName: '5621',
      bannerTitle: '1',
      bannerContent: '1',
      bannerName: 323
    }
  ])

  load('index').bulkCreate([
    {
      iconName: '',
      title: '简单',
      content: "降低3D打印的技术门槛，连接线上线下，使3D打印模型更容易获取，格式更容易转换，支持更多文件类型转换成3D打印文件。",
      textName: 444
    },
    {
      iconName: '',
      title: '易用',
      content: "为用户提供完整的产品解决方案，帮助用户选择最合适的设备，以及材料，免去客户对材料和设备的顾虑，更加专注产品本身的设计。",
      textName: 42
    },
    {
      iconName: '',
      title: 'DIY',
      content: "用户可以更具自己的Idear用建模软件制作任意的模型，并且可以用3D打印机产出成品。",
      textName: 4414
    },
    {
      iconName: '',
      title: '创意',
      content: "自主研发了新一代的3D建模软件“3D-Build“，融教育和创新于一体，匹配孩子认知水平，激发孩子创造力。",
      textName: 4244
    }
  ])

  load('indexImg').bulkCreate([
    {
      imgName: '1446202185198.jpg',
      name: '11.jpg'
    }
  ])

  load('showSlide').bulkCreate([
    {
      sort: '产品展示',
      flag: 0,
      point: 0
    },
    {
      sort: '3d',
      flag: 1,
      point: "产品展示"
    },
    {
      sort: '3D打印机',
      flag: 0,
      point: "3d"
    },
    {
      sort: 'mobile',
      flag: 1,
      point: 'mobile'
    }
  ])

  load('showContent').bulkCreate([
    {
      imgName: '1446469057148.jpg',
      content: "风景",
      name: "1446469057148",
      foreign_sort: "3d"
    },
    {
      imgName: '1446469878907.jpg',
      content: "风景",
      name: "1446469878907",
      foreign_sort: "3d"
    },
    {
      imgName: '1.jpg',
      content: '#',
      name: "1",
      foreign_sort: "mobile"
    },
    {
      imgName: '2.jpg',
      content: '#',
      name: "2",
      foreign_sort: "mobile"
    },
    {
      imgName: '3.jpg',
      content: '#',
      name: "3",
      foreign_sort: "mobile"
    },
    {
      imgName: '4.jpg',
      content: '#',
      name: "4",
      foreign_sort: "mobile"
    }
  ])

  load('about').bulkCreate([
    {
      title: '联系方式',
      qq: '523003801',
      wechat: '111',
      address: '湛江市广东海洋大学',
      aboutCompony: '222',
      tel: '222',
      email: '523003801@qq.com',
      introduce: "在使用React.js开发web应用时，我们除了可以在浏览器端渲染组" +
       "件，还可以在服务器进行组件渲染。一般来说，在服务器端渲染组件的好处有以下几个：页面加载更快。通" +
       "过在服务器端渲染组件，服务器端返回的内容就是一个完整的页面，而无需在浏览器端再进行一次渲染；"
    }
  ])

  load('aboutImg').bulkCreate([
    {
      imgName: '1.jpg',
      name: "1",
      title: "据说是念念"
    },
    {
      imgName: '2.jpg',
      name: "2",
      title: "黑客?!"
    },
    {
      imgName: '3.jpg',
      name: "3",
      title: "宝妈在卖萌"
    },
    {
      imgName: '4.jpg',
      name: "4",
      title: "什么!嘉荣？"
    },
    {
      imgName: '5.jpg',
      name: "5",
      title: "未来的财务"
    },
    {
      imgName: '6.jpg',
      name: "6",
      title: "文都就是酷"
    },
    {
      imgName: '7.jpg',
      name: "7",
      title: "源·旋转屁股"
    }
  ]),

  load('everyDayVisite').bulkCreate([
    {
      id: 1,
      date: new Date().getTime(),
      count: 1
    }
  ])

})
.catch(function (err) {
  console.error('数据库初始化失败！');
  console.error(err);
  process.exit(1);
});
