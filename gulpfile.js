'use strict';

// Requis
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json

// Variables de chemins
var source = './src/'; // dossier de travail
var destination = './dist/'; // dossier à livrer


const htmlPartial = require('gulp-html-partial');

gulp.task('js', function () {
    return gulp.src([source + "*.js", source + '/**/*.js'])
        .pipe(gulp.dest(destination + '/js/'))
        .pipe(plugins.uglify())
        .pipe(plugins.concat('script.js', {newLine: ';'}))
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(gulp.dest(destination + '/js/'))

        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('html', function () {
    gulp.src(source + "/*.html")
        .pipe(plugins.htmlPartial({
            basePath: source
        }))
        .pipe(plugins.htmlBeautify())
        .pipe(gulp.dest(destination))
        .pipe(browserSync.reload({
            stream: true
        }))
});


gulp.task('sass', function () {
    gulp.src(source+"**/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(plugins.csscomb())
        .pipe(plugins.autoprefixer())
        .pipe(gulp.dest(destination))
        .pipe(plugins.csso())
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(gulp.dest(destination))
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: destination
        }
    })
});

gulp.task('reload', function (done) {
    browserSync.reload();
    done();
});

gulp.task('images', function () {
    gulp.src([source + '/img/*.png', source + '/img/*.jpg', source + '/img/*.svg'])
        .pipe(plugins.cache(plugins.imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
        .pipe(gulp.dest(destination + '/img/'));
});

gulp.task('html', function () {
    gulp.src([source +'*.html'])
        .pipe(htmlPartial({
            basePath: source +'/partials/'
        }))
        .pipe(gulp.dest(destination));
});

gulp.task('watch',['images', 'sass', 'html', 'js', 'browserSync'], function () {
    gulp.watch(destination + '/*.html', ['reload']);
    gulp.watch(source + '/**/*.html', ['html']);

    gulp.watch(source + '/**/*.scss', ['sass']);

    gulp.watch(source + '/**/*.js', ['js']);

    gulp.watch(([source + '/img/*.png', source + '/img/*.jpg', source + '/img/*.svg']), ['images']);

});