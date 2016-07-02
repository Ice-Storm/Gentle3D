var gulp              = require("gulp");
var rename            = require("gulp-rename");
var concat            = require("gulp-concat");                            //- 多个文件合并为一个；
var minifyCss         = require("gulp-minify-css");
var babel             = require("gulp-babel");
var webpack           = require('webpack');
var gutil             = require('gulp-util');
var del               = require('del');
var path              = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

require("babel-polyfill");

var CWD = process.cwd();
var PATH = { BUILD: './public/dist' }

var webpackConfig = {
  entry: {
    admin: './public/admin/app.js',
    login: './public/pc/login/index.js',
    show: './public/pc/show/index.js',
    mIndex: './public/mobile/index/app.js',
    mShow: './public/mobile/show/app.js',
    mAbout: './public/mobile/about/app.js'
  },
  output: {
    path: PATH.BUILD,
    filename: '[name].min.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  babel: {
    'presets': ['es2015', 'react']
  },
  module: {
    //检查js语法，因为是jsx 混 ES6 so... 不需要
    //preLoaders: [ { test: /\.(js|jsx)$/i, loaders: ['jshint-loader'] } ],
    loaders: [
      { test: /\.js$/, loaders: ['babel?presets[]=es2015', 'babel?presets[]=react'], include: [path.join(CWD, './public')] },
      { test: /\.(png|gif|jpe?g|svg)$/i, loader: 'url', query: { limit: 10000 }, include: [path.join(CWD, './public')] },
      { test: /\.scss$/i, loaders: ExtractTextPlugin.extract('style-loader', 'css-loader', 'scss-loader'), include: [path.join(CWD, './public')] },
      { test: /\.css$/i, loader: ExtractTextPlugin.extract('style-loader', 'css-loader'), include: [path.join(CWD, './public')] }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].min.css')
  ],
  watch: true
}

gulp.task('build:webpack', ['compress'], function(){
   webpack(webpackConfig, function(err, state) {
     if(err) throw new gutil.PluginError('webpack', err);
     gutil.log('[webpack]', state.toString());
   });
});

gulp.task('compress', function(){
  //服务器渲染的页面只能把CSS单独打包，因为require不能识别require('css')和图片
  var mobileIndexCss = [
    './public/lib/ini.css',
    './public/mobile/index/index.css',
    './public/mobile/common/head/nav.css',
    './public/mobile/common/headMenu/menu.css',
    './public/mobile/common/foot/foot.css'
  ]

   gulp.src(mobileIndexCss)    
  .pipe(concat('mIndex.min.css'))                          
  .pipe(minifyCss())                                      
  .pipe(gulp.dest('./public/dist/'))       

  var mobileShowCss = [
    './public/lib/ini.css',
    './public/mobile/show/content.css',
    './public/mobile/common/head/nav.css',
    './public/mobile/common/headMenu/menu.css',
    './public/mobile/common/foot/foot.css'
  ]

   gulp.src(mobileShowCss)    
  .pipe(concat('mShow.min.css'))                          
  .pipe(minifyCss())                                      
  .pipe(gulp.dest('./public/dist/'))   

  var mobileAboutCss = [
    './public/lib/ini.css',  
    './public/mobile/about/about.css',
    './public/mobile/common/head/nav.css',
    './public/mobile/common/headMenu/menu.css',
    './public/mobile/common/foot/foot.css'
   ]

   gulp.src(mobileAboutCss)    
  .pipe(concat('mAbout.min.css'))                          
  .pipe(minifyCss())                                      
  .pipe(gulp.dest('./public/dist/'));

  var indexCssPath = [
    './public/lib/ini.css',
    './public/lib/comBtn.css',
    './public/common/frontFoot/foot.css',
    './public/common/frontHead/headMain.css',
    './public/pc/index/content/content.css'
  ] 

  gulp.src(indexCssPath)    
  .pipe(concat('index.min.css'))                          //- 合并后的文件名
  .pipe(minifyCss())                                      //- 压缩处理成一行
  .pipe(gulp.dest('./public/dist/')) 


  var showCssPath = [
    './public/lib/ini.css',
    './public/common/frontFoot/foot.css',
    './public/common/frontBanner/banner.css',
    './public/common/frontHead/headMain.css',
    './public/pc/show/show.css'
  ]

  gulp.src(showCssPath)    
  .pipe(concat('show.min.css'))                          //- 合并后的文件名
  .pipe(minifyCss())                                      //- 压缩处理成一行
  .pipe(gulp.dest('./public/dist/')) 

  var aboutCssPath = [
    './public/lib/ini.css',
    './public/common/frontFoot/foot.css',
    './public/common/frontBanner/banner.css',
    './public/common/frontHead/headMain.css',
    './public/pc/about/about.css'
  ]

  gulp.src(aboutCssPath)    
  .pipe(concat('about.min.css'))                          
  .pipe(minifyCss())                                      
  .pipe(gulp.dest('./public/dist/'))              
})

gulp.task('build', ['build:webpack'], function(){});

gulp.task('watch', function() {
  gulp.watch(path.join(CWD, 'public/**/*.js'), ['build']);
  gulp.watch(path.join(CWD, 'public/**/*.css'), ['build']);
});

gulp.task('clean', function() {
  var PATH_BUILD = path.join(CWD, PATH.BUILD);
  del.sync([PATH_BUILD + '/**']);
});