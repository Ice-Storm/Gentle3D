var app             = require('koa')();
var view            = require('co-views');
var staticFs        = require('koa-static');
var session         = require('koa-session');
var gzip            = require('koa-gzip');
var logger          = require('koa-log4js');
var userAgent       = require('koa-useragent');
var path            = require('path');
var co              = require('co');
var config          = require('./config.default.js');
var appRouter       = require('./routes/routes.js');
var auth            = require('./middlewares/auth.js');
var changeMobileUrl = require('./middlewares/changeMobileUrl.js');
var statistics      = require('./middlewares/statistics.js');
var notFound        = require('./middlewares/notFound.js');
var watch           = require('./watch.js');

app.keys = [config.key];

/*app.use(logger({
    type: 'file',
    file: './logs/gentle3d.log',
    size: 10 * 1024 * 1024,
    backups: 15,
    category: 'cheese' 
  })
);
*/
app.use(session(app));

app.use(gzip());

app.use(function *(next){
  this.render = view(__dirname + '/views', {
    map: {
      html: 'ejs',
      viewExt: 'html'
    }
  });
  yield next;
});

app.use(staticFs('./public'));

app.use(auth());

app.use(userAgent()); //判断UA

app.use(changeMobileUrl()); //重写移动端URL

app.use(statistics());  //统计访问量

app.use(appRouter.routes());

var opts = process.argv;
var isListener = 0;

for (var i = 0; i < opts.length; i++){
  if(opts[i].indexOf('-ci') == 0) {
    isListener = 1;
  }
}

if(isListener === 0) {
  app.listen(config.port);
} else {
  process.exit(0);
}

//监控controllers自动生成路径文件
co(function *(){  
  yield watch('controllers');  
}).catch(function(err){
  console.log(err)
})

module.exports = app; 
