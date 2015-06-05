var gulp = require('gulp');
var concat = require('gulp-concat');
var gulpSmartSrc = require('./gulp-smart-src');

gulp.task('foo', function() {
        gulpSmartSrc(['http://code.jquery.com/jquery-2.1.4.min.js','test.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('build/'));
});
