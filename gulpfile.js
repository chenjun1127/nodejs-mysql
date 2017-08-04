var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: 'http://localhost:3000',
        files: ['**'],
        browser: 'chrome',
        notify: false,
        port: 5000
    });
});

gulp.task('nodemon', function(cb) {
    var called = false;
    return nodemon({
        script: 'bin/www/'
    }).on('start', function() {
        if (!called) {
            cb();
            called = true;
        }
    });
});

gulp.task('default', ['browser-sync']);
