var gulp       = require("gulp");
var browserify = require("browserify");
var reactify   = require("reactify");
var source     = require("vinyl-source-stream");
var uglify     = require("gulp-uglify");
var rename     = require("gulp-rename");
var concat     = require("gulp-concat");                            //- 多个文件合并为一个；
var minifyCss  = require("gulp-minify-css");  
var babel      = require("gulp-babel");

function reactifyJs(parm){
  if(parm.path && parm.rename){
    parm.dest = parm.dest ? parm.dest : './public/dist';

    browserify(parm.path)
   .transform(reactify)
   .bundle()
   .pipe(source(parm.rename))
   .pipe(gulp.dest(parm.dest));
  }
}

function compress(parm){
  if(parm.path && parm.rename){
    parm.dest = parm.dest ? parm.dest : './public/dist';

    gulp.src(parm.path)
   .pipe(uglify())
   .pipe(rename(parm.rename))
   .pipe(gulp.dest(parm.dest));
  }
}

gulp.task('build', function(){

  reactifyJs({
    path: './public/pc/show/index.js',
    rename: 'show.bundle.js'
  });

  reactifyJs({
    path: './public/admin/app.js',
    rename: 'admin.bundle.js'
  });

  reactifyJs({
    path: './public/mobile/index/app.js',
    rename: 'mIndex.bundle.js'
  });

  reactifyJs({
    path: './public/mobile/show/app.js',
    rename: 'mShow.bundle.js'
  });

  reactifyJs({
    path: './public/mobile/about/app.js',
    rename: 'mAbout.bundle.js'
  });

  reactifyJs({
    path: './public/pc/login/index.js',
    rename: 'login.bundle.js'
  });

});

gulp.task('compress', ['build'], function(){
  //PC show
  compress({
    path: './public/dist/show.bundle.js',
    rename: 'show.min.js'
  })

  //admin
  compress({
    path: './public/dist/admin.bundle.js',
    rename: 'admin.min.js'
  })

  //mobile index
  compress({
    path: './public/dist/mIndex.bundle.js',
    rename: 'mIndex.min.js'
  })

  //mobile show
  compress({
    path: './public/dist/mShow.bundle.js',
    rename: 'mShow.min.js'
  })

  //mobile about
  compress({
    path: './public/dist/mAbout.bundle.js',
    rename: 'mAbout.min.js'
  })

  //login
  compress({
    path: './public/dist/login.bundle.js',
    rename: 'login.min.js'
  })

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