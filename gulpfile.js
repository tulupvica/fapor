const gulp = require('gulp'),
      del = require('del'),
      browserSync = require('browser-sync').create(),
      cssunit = require('gulp-css-unit'),
      gp = require('gulp-load-plugins')();


gulp.task('clean', function () {
    return del([
        'dist'
    ]);
});

gulp.task('server', ['pug', 'sass', 'js'], function () {
    browserSync.init ({
        server: './dist'
    }) ;
    browserSync.watch('./dist', browserSync.reload);
    gulp.watch("./dist/*.html").on('change', browserSync.reload);
    gulp.watch("./dist/js/*.js").on('change', browserSync.reload);
    gulp.watch("./app/styles/**/*.scss", ['sass']);
    gulp.watch("./app/pug/**/*.pug", ['pug']);
    gulp.watch("./app/js/*.js", ['js']);

});


gulp.task('pug', function () {
    return gulp.src('./app/pug/*.pug')
        .pipe(gp.pug ({pretty: true}))
        .on('error', gp.notify.onError(function
            (error) {
            return {
                title: 'Pug',
                message: error.message
            }
        }))
        .pipe(browserSync.stream())
        .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function () {
    return gulp.src('./app/styles/*.scss')
        .pipe(gp.sourcemaps.init())
        .pipe(gp.sassGlob())
        .pipe(gp.sass())
        .on('error', gp.notify.onError({
            title: 'style'
        }))
        .pipe(gp.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        // .pipe(cssunit({
        //     type     :    'px-to-rem',
        //     rootSize :    10
        // }))
        .pipe(gp.csso())
        .pipe(gp.sourcemaps.write())
        .pipe(browserSync.stream())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('css-libs', function() {
    return gulp.src(['./node_modules/slick-carousel/slick/slick.css'])
        .pipe(gp.concat('libs.min.css'))
        .pipe(gp.autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gp.csso())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', function() {
    return gulp.src('./app/js/main.js')
        .pipe(gp.uglifyjs())
        .pipe(gp.rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('js-libs', function() {
    return gulp.src(['./node_modules/jquery/dist/jquery.js',
                    './node_modules/slick-carousel/slick/slick.js'])
        .pipe(gp.sourcemaps.init())
        .pipe(gp.concat('libs.min.js'))
        .pipe(gp.uglifyjs())
        .pipe(gp.sourcemaps.write())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('img', function() {
    return gulp.src('./app/img/**/*')
        .pipe(gp.imagemin())
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('fonts', function() {
    return gulp.src('./app/webfonts/**/*')
        .pipe(gulp.dest('./dist/webfonts'));
});



gulp.task('transfer', ['img', 'fonts', 'js-libs', 'css-libs']);

gulp.task('default', ['clean', 'server', 'transfer' ]);



