var Router               = require('koa-router'); 
var controllerIndex      = require('../controllers/pc/index.js');
var controllerShow       = require('../controllers/pc/show.js');
var controllerAbout      = require('../controllers/pc/about.js');
var controllerLogin      = require('../controllers/pc/login.js');
var controllerAdmin      = require('../controllers/admin/admin.js');
var controllerAdminIndex = require('../controllers/admin/index.js');

//移动端
var mobileIndex = require('../controllers/mobile/index.js');
var mobileShow = require('../controllers/mobile/show.js');
var mobileAbout = require('../controllers/mobile/about.js');


appRouter = new Router();

appRouter.get('/', controllerIndex.index);

appRouter.get('/show', controllerShow.show);

appRouter.get('/about', controllerAbout.about);

appRouter.get('/admin', controllerAdmin.admin);

appRouter.get('/login', controllerLogin.login);

appRouter.post('/login', controllerLogin.loginP);

//后台api
appRouter.all('/admin/:component', controllerAdminIndex.map);
appRouter.all('/admin/:component/:action', controllerAdminIndex.map);

//移动端api
appRouter.get('/mobile/', mobileIndex.index);

appRouter.get('/mobile/show', mobileShow.show);

appRouter.get('/mobile/about', mobileAbout.about);


module.exports = appRouter;