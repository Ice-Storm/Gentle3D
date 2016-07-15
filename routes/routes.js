var Router          = require('koa-router'); 
var controllerIndex = require('../controllers/pc/index.js');
var controllerAdmin = require('../controllers/admin/index.js');
var mobileIndex     = require('../controllers/mobile/mindex.js');
var proxy           = require('../proxy.js');

appRouter = new Router();

//后台api
appRouter.all('/admin/:component', controllerAdmin.map);
appRouter.all('/admin/:component/:action', controllerAdmin.map);

appRouter.get('/', controllerIndex.index);
appRouter.all('/:page', proxy.proxy('./controllers'));
appRouter.all('/:page/:m', proxy.proxy('./controllers'));

//移动端首页
appRouter.get('/mobile/', mobileIndex.mindex);

module.exports = appRouter;
