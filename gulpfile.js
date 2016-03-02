var gulp       = require("gulp");
var browserify = require("browserify");
var reactify   = require('reactify');
var source     = require("vinyl-source-stream");
var uglify     = require('gulp-uglify');
var rename     = require('gulp-rename');
var concat     = require('gulp-concat');                            //- 多个文件合并为一个；
var minifyCss  = require('gulp-minify-css');  

gulp.task('build', function(){
  browserify('./public/pc/show/index.js')
  .transform(reactify)
  .bundle()
  .pipe(source('show.bundle.js'))
  .pipe(gulp.dest('./public/dist'));

  browserify('./public/admin/app.js')
  .transform(reactify)
  .bundle()
  .pipe(source('admin.bundle.js'))
  .pipe(gulp.dest('./public/dist'));

  browserify('./public/mobile/index/app.js')
  .transform(reactify)
  .bundle()
  .pipe(source('mIndex.bundle.js'))
  .pipe(gulp.dest('./public/dist'));

  browserify('./public/mobile/show/app.js')
  .transform(reactify)
  .bundle()
  .pipe(source('mShow.bundle.js'))
  .pipe(gulp.dest('./public/dist'));

  browserify('./public/mobile/about/app.js')
  .transform(reactify)
  .bundle()
  .pipe(source('mAbout.bundle.js'))
  .pipe(gulp.dest('./public/dist'));

});

gulp.task('compress', ['build'], function(){
  //PC show
  gulp.src('./public/dist/show.bundle.js')
 .pipe(uglify())
 .pipe(rename('show.min.js'))
 .pipe(gulp.dest('./public/dist/'));

 //admin
  gulp.src('./public/dist/admin.bundle.js')
  .pipe(uglify())
  .pipe(rename('admin.min.js'))
  .pipe(gulp.dest('./public/dist/'));

 //mobile index
  gulp.src('./public/dist/mIndex.bundle.js')
  .pipe(uglify())
  .pipe(rename('mIndex.min.js'))
  .pipe(gulp.dest('./public/dist'));

 //mobile show
  gulp.src('./public/dist/mShow.bundle.js')
  .pipe(uglify())
  .pipe(rename('mShow.min.js'))
  .pipe(gulp.dest('./public/dist'));

 //mobile about
  gulp.src('./public/mobile/about/bundle.js')
  .pipe(uglify())
  .pipe(rename('mAbout.min.js'))
  .pipe(gulp.dest('./public/dist'));

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