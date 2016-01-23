var gulp = require("gulp");
var browserify = require("browserify");
var reactify = require('reactify');
var source = require("vinyl-source-stream");
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');                            //- 多个文件合并为一个；
var minifyCss = require('gulp-minify-css');  


gulp.task('default', function() {
  browserify('./public/show/index.js')
 .transform(reactify)
 .bundle()
 .pipe(source('bundle.js'))
 .pipe(gulp.dest('./public/show'));

  browserify('./public/admin/app.js')
 .transform(reactify)
 .bundle()
 .pipe(source('bundle.js'))
 .pipe(gulp.dest('./public/admin'));

 browserify('./public/mobile/index/app.js')
 .transform(reactify)
 .bundle()
 .pipe(source('bundle.js'))
 .pipe(gulp.dest('./public/mobile/index'));

 browserify('./public/mobile/show/app.js')
 .transform(reactify)
 .bundle()
 .pipe(source('bundle.js'))
 .pipe(gulp.dest('./public/mobile/show'));

 browserify('./public/mobile/about/app.js')
 .transform(reactify)
 .bundle()
 .pipe(source('bundle.js'))
 .pipe(gulp.dest('./public/mobile/about'));

});

gulp.task('compress', function() {
  //PC show
  gulp.src('./public/show/bundle.js')
 .pipe(uglify())
 .pipe(rename('bundle.min.js'))
 .pipe(gulp.dest('./public/show/'));

 //admin
 /*gulp.src('./public/admin/bundle.js')
 .pipe(uglify())
 .pipe(rename('bundle.min.js'))
 .pipe(gulp.dest('./public/admin/'));*/

 //mobile index
 gulp.src('./public/mobile/index/bundle.js')
 .pipe(uglify())
 .pipe(rename('bundle.min.js'))
 .pipe(gulp.dest('./public/mobile/index'));

 //mobile show
 gulp.src('./public/mobile/show/bundle.js')
 .pipe(uglify())
 .pipe(rename('bundle.min.js'))
 .pipe(gulp.dest('./public/mobile/show'));

 //mobile about
 gulp.src('./public/mobile/about/bundle.js')
 .pipe(uglify())
 .pipe(rename('bundle.min.js'))
 .pipe(gulp.dest('./public/mobile/about'));

 var adminCssPath = [
    './public/lib/ini.css',
    './public/tools/table.css',
    './public/backBanner/backBanner.css',
    './public/user/userManage.css',
    './public/backHead/backHead.css',
    './public/backImgControl/backImgControl.css',
    './public/backIndexControl/backIndexControl.css',
    './public/backIndexPageControl/backIndexPageControl.css',
    './public/backPageHead/backPageHead.css',
    './public/backSlideBar/backSlideBar.css',
    './public/tools/controlBlock.css',
    './public/tools/modal.css',
    './public/tools/uploadModal.css'
 ]

 gulp.src(adminCssPath)    
 .pipe(concat('admin.min.css'))                          //- 合并后的文件名
 .pipe(minifyCss())                                      //- 压缩处理成一行
 .pipe(gulp.dest('./public/admin/'))


  var mobileIndexCss = [
    './public/lib/ini.css',
    './public/mobile/index/index.css',
    './public/mobile/common/head/nav.css',
    './public/mobile/common/headMenu/menu.css',
    './public/mobile/common/foot/foot.css'
  ]

  gulp.src(mobileIndexCss)    
 .pipe(concat('index.min.css'))                          
 .pipe(minifyCss())                                      
 .pipe(gulp.dest('./public/mobile/index/'))       

 var mobileShowCss = [
    './public/lib/ini.css',
    './public/mobile/show/content.css',
    './public/mobile/common/head/nav.css',
    './public/mobile/common/headMenu/menu.css',
    './public/mobile/common/foot/foot.css'
  ]

  gulp.src(mobileShowCss)    
 .pipe(concat('show.min.css'))                          
 .pipe(minifyCss())                                      
 .pipe(gulp.dest('./public/mobile/show/'))   

 var mobileAboutCss = [
    './public/lib/ini.css',  
    './public/mobile/about/about.css',
    './public/mobile/common/head/nav.css',
    './public/mobile/common/headMenu/menu.css',
    './public/mobile/common/foot/foot.css'
  ]

  gulp.src(mobileAboutCss)    
 .pipe(concat('about.min.css'))                          
 .pipe(minifyCss())                                      
 .pipe(gulp.dest('./public/mobile/about/'))                

})