var gulp       = require("gulp");
var browserify = require("browserify");
var source     = require("vinyl-source-stream");
var babelify   = require("babelify");
var uglify     = require("gulp-uglify");
var rename     = require("gulp-rename");
var concat     = require("gulp-concat");                            //- 多个文件合并为一个；
var minifyCss  = require("gulp-minify-css");
var streamify  = require('gulp-streamify')  
var babel      = require("gulp-babel");
var livereload = require('gulp-livereload');

function compile(parm){
  if(parm.path && parm.rename){
    parm.dest = parm.dest ? parm.dest : './public/dist';

    browserify(parm.path)
    .transform('babelify', { presets: ['es2015', 'react'] })
    .bundle()
    .pipe(source(parm.path))
    .pipe(streamify(uglify()))
    .pipe(rename(parm.rename))
    .pipe(gulp.dest(parm.dest));
  }
}

gulp.task('build', function(){

  compile({
    path: './public/pc/show/index.js',
    rename: 'show.min.js'
  });

  compile({
    path: './public/admin/app.js',
    rename: 'admin.min.js'
  });

  compile({
    path: './public/mobile/index/app.js',
    rename: 'mIndex.min.js'
  });

  compile({
    path: './public/mobile/show/app.js',
    rename: 'mShow.min.js'
  });

  compile({
    path: './public/mobile/about/app.js',
    rename: 'mAbout.min.js'
  });

  compile({
    path: './public/pc/login/index.js',
    rename: 'login.min.js'
  });

});

gulp.task('compress', ['build'], function(){

  var adminCssPath = [
    './public/lib/ini.css',
    './public/tools/table.css',
    './public/admin/backBanner/backBanner.css',
    './public/admin/user/userManage.css',
    './public/admin/backHead/backHead.css',
    './public/admin/backImgControl/backImgControl.css',
    './public/admin/backIndexControl/backIndexControl.css',
    './public/admin/backIndexPageControl/backIndexPageControl.css',
    './public/admin/backPageHead/backPageHead.css',
    './public/admin/backSlideBar/backSlideBar.css',
    './public/tools/controlBlock.css',
    './public/tools/modal.css',
    './public/tools/uploadModal.css'
  ]

  gulp.src(adminCssPath)    
  .pipe(concat('admin.min.css'))                          //- 合并后的文件名
  .pipe(minifyCss())                                      //- 压缩处理成一行
  .pipe(gulp.dest('./public/dist/'))

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
  .pipe(concat('about.min.css'))                          //- 合并后的文件名
  .pipe(minifyCss())                                      //- 压缩处理成一行
  .pipe(gulp.dest('./public/dist/'))              
})

gulp.task('watch', function() {
  livereload.listen();
  var path = [
    './public/admin/**',
    './public/common/**',
    './public/mobile/**',
    './public/pc/**',
    './public/tools/**',
  ]
  gulp.watch(path, ['build', 'compress']);
  gulp.watch(['./public/dist/**'], ['build', 'compress']).on('change', livereload.changed);
});