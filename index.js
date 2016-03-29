var app             = require('koa')();
var view            = require('co-views');
var staticFs        = require('koa-static');
var session         = require('koa-session');
var logger          = require('koa-log4js');
var userAgent       = require('koa-useragent');
var path            = require('path');
var config          = require('./config.default.js');
var appRouter       = require('./routes/routes.js');
var auth            = require('./middlewares/auth.js');
var changeMobileUrl = require('./middlewares/changeMobileUrl.js');
var statistics      = require('./middlewares/statistics.js');

app.keys = [config.key];

app.use(session(app));

app.use(function *(next){
  this.render = view(__dirname + '/views', {
    map: {
      html: 'ejs',
      viewExt: 'html'
    }
  });
  yield next;
});

//app.use(logger());

app.use(staticFs('./public'));

app.use(auth());

app.use(userAgent()); //判断UA

app.use(changeMobileUrl()); //重写移动端URL

app.use(statistics());  //统计访问量

app.use(appRouter.routes());

app.listen(config.port);

module.exports = app; 
