var Sequelize      = require('sequelize');
var path           = require('path');
var config         = require('../config.default.js');
var databaseConfig = require('../config.default.js').database;

var sequelize = new Sequelize(databaseConfig.database, databaseConfig.user, databaseConfig.password, {
  host: databaseConfig.host,
  dialect: databaseConfig.dialect,
  charset: databaseConfig.charset,
  collate: databaseConfig.collate, //排序时根据utf8变码格式来排序
  pool: databaseConfig.pool,
  logging: databaseConfig.log
});

var isHaveData = 0;

function load(name){
  return sequelize.import(path.join(__dirname, name));
}

var defaultData = {
  user: {
   user_name: config.userName,
   user_password: config.userPassword,
   user_is_admin: '1',
   user_img: 'user.jpg'
  },
  webConfig: {
   logo: 'logo.png',
   copyright: 'Copyright ? 2012 Adobe Systems Incorporated. All rights reserved',
   textName: '123Name',
   compony: "砖 头 科 技"
  },
  nav: [
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
    }
  ],
  index: [
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
  ],
  indexImg: {
    imgName: '1446202185198.jpg',
    name: '11.jpg'
  },
  showSlide: [
    {
      sort: '产品展示',
      flag: 0,
      point: 0
    },
    {
      sort: '3D打印机',
      flag: 1,
      point: "产品展示"
    },
    {
      sort: '3D打印实物',
      flag: 0,
      point: 0
    },
    {
      sort: '实物',
      flag: 1,
      point: '3D打印实物'
    },
    {
      sort: 'mobile',
      flag: 1,
      point: 'mobile'
    }
  ],
  showContent: [
    {
      imgName: '1446469057148.jpg',
      content: "砖头科技改良的桌面级FDM打印机",
      name: "1446469057148",
      foreign_sort: "3D打印机"
    },
    {
      imgName: '11.jpg',
      content: "叶校长与欧局长一同参观砖头科技海博会展位",
      name: "1446469057888",
      foreign_sort: "3D打印机"
    },
    {
      imgName: '3d.jpg',
      content: "3D打印游戏周边产品",
      name: "1446469808907",
      foreign_sort: "实物"
    },
    {
      imgName: '909947814395160908.jpg',
      content: "3D打印游戏周边产品",
      name: "909947814395160908",
      foreign_sort: "实物"
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
      imgName: '6.png',
      content: '#',
      name: 'mobile6',
      foreign_sort: 'mobileIndex'
    },
    {
      imgName: '7.png',
      content: '#',
      name: 'mobile7',
      foreign_sort: 'mobileIndex'
    }
  ],
  about: [
    {
      title: '联系方式',
      qq: '523003801',
      wechat: 'XXXX',
      address: '湛江市广东海洋大学',
      aboutCompony: '222',
      tel: '12345678',
      email: '523003801@qq.com',
      introduce: '砖头科技创是一家以线下体验和开源技术为基础，集个性化3D打印' +
        '定制、线下体验、开源技术研究等的高新科技公司，公司位于湛江市霞山区。'
    }
  ],
  aboutImg: [
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
    },
    {
      imgName: '8.jpg',
      name: "8",
      title: "零咕咕"
    }
  ],
  everyDayVisite: [
    {
      id: 1,
      date: new Date().getTime(),
      count: 1
    }
  ],
  statistics: [
    {
      id: 1,
      ip: '127.0.0.1',
      date: new Date().getTime(),
      count: 1,
      isRefuse: 0
    }
  ]
}

var bulkData = function (){
  load('user').bulkCreate([defaultData.user])
  .then(function () {
    return load('webConfig').bulkCreate([defaultData.webConfig]);
  })
  .then(function (){
    return load('nav').bulkCreate(defaultData.nav);
  })
  .then(function (){
    return load('index').bulkCreate(defaultData.index);
  })
  .then(function (){
    return load('indexImg').bulkCreate([defaultData.indexImg]);
  })
  .then(function (){
    return load('showSlide').bulkCreate(defaultData.showSlide);
  })
  .then(function (){
    return load('showContent').bulkCreate(defaultData.showContent);
  })
  .then(function (){
    return load('about').bulkCreate(defaultData.about);
  })
  .then(function (){
    return load('aboutImg').bulkCreate(defaultData.aboutImg);
  })
  .then(function (){
    return load('everyDayVisite').bulkCreate(defaultData.everyDayVisite);
  })
  .then(function (){
    return load('statistics').bulkCreate(defaultData.statistics);
  })
  .catch(function (err) {
    console.log(err);
  })        
}

//CREATE DATABASE `ghost` CHARACTER SET utf8 COLLATE utf8_general_ci;
sequelize.sync({ force: databaseConfig.resetDB }).then(function(){
  return load('user').findById(1);
}).then(function(data){
  if(data && data.dataValues){
    return isHaveData = 1;
  }
}).then(function(){
  if(isHaveData == 0){
    bulkData();
  }
})
.catch(function (err){
  console.error('数据库初始化失败！');
  console.error(err);
  process.exit(1);
});

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
  Visite: load('everyDayVisite'),
  defaultData:　defaultData,
  bulkData: bulkData
}
