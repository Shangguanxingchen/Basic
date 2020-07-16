var gulp = require('gulp'),

    cssmin = require('gulp-minify-css'),
    cssver = require('gulp-make-css-url-version'),

    uglify = require('gulp-uglify'),

    concat = require('gulp-concat'),

    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),

    htmlreplace = require('gulp-html-replace'),

    rev = require('gulp-rev-append'),

    browserSync = require("browser-sync").create();

/*var browserSync = require("browser-sync").create();*/
var crypto = require('crypto');

gulp.task('autoBuild', function() {
    gulp.watch('src/**/*.js', ['testBulidJs']);
    gulp.watch('src/**/*.css', ['testBulidCss']);
    gulp.watch('src/index.html', ['testBuildHtml']);

});


/*移动不需要构建的文件*/
gulp.task('copy', function() {
    gulp.src('src/lib/*')
        .pipe(gulp.dest('dist/lib'));
        
    gulp.src('src/img/*')
        .pipe(gulp.dest('dist/img'));
});


/*构建*/
gulp.task('build', ['testCssMin', 'testJsMin', 'testRev', 'copy'], function() {
    
});

/*给页面引入文件添加版本号*/
gulp.task('testRev', function() {
    gulp.src('src/gulp.html')
        .pipe(rev())
        .pipe(gulp.dest('dist/'));
});

/*浏览器自动同步*/
gulp.task('textbsync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("src/gulp.html").on("change", browserSync.reload);
    gulp.watch("src/**/*.css").on("change", browserSync.reload);
    gulp.watch("src/**/*.js").on("change", browserSync.reload);
});

/*替换html页面中的css/js路径与加版本号*/

/*替换html页面中的css/js路径与加版本号*/
gulp.task('testBuildHtml', function() {
    var hash = crypto.createHash('md5');
    var r = hash.digest('hex');

    gulp.src('src/gulp.html')
        .pipe(htmlreplace({
            'css': 'css/build.css?rev=' + r,
            'js' : 'js/build.js?rev=' + r
        }))
        .pipe(rev())
        .pipe(gulp.dest('dist/'));

});

/*压缩并合并JS*/
gulp.task('testBulidJs', function() {
    gulp.src('src/**/*.js')
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(concat('build.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

/*压缩并合并CSS*/
gulp.task('testBulidCss', function() {
    gulp.src('src/**/*.css')
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(cssver())
        .pipe(concat('build.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
});

/*压缩JS文件*/
gulp.task('testJsMin', function() {
    gulp.src('src/js/*.js')
        .pipe(uglify({
            mangle:{except:['require', 'exports', 'module', '$']}
        }))
        .pipe(gulp.dest('dist/js/'));
});

/*合并js文件*/
gulp.task('testJsConcat', function() {
    gulp.src('src/js/*.js')
        .pipe(concat('build.js'))
        .pipe(gulp.dest('dist/js/'));
});

/*css压缩与Url加版本号*/
gulp.task('testCssMin', function() {
    gulp.src('src/**/*.css')
        .pipe(cssver())
        .pipe(cssmin())
        .pipe(gulp.dest('dist/'));
});