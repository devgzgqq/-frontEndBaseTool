var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;


var paths = {
    sass: ['./src/stylesheets/**']
};

gulp.task('default', ['sass']);

gulp.task('sass', function () {
    return gulp.src('./src/stylesheets/ourui.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./www/public/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./www/public/css/'))
        .pipe(reload({stream: true}));
});

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['sass'], function() {
    browserSync.init({
    	port: 8080,
        server: "./www"
    });
    gulp.watch(paths.sass, ['sass']);
    gulp.watch("www/*.html").on('change', reload);
});


gulp.task('default', ['serve']);