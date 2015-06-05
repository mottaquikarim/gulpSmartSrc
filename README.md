### Gulp Smart Src Plugin

Allows concatenation of both local files and urls into bundle.js

Ideal use case: for creating a libs-bundle.js file for external dependencies such as jquery, jquery plugins, etc.

#### Usage

```javascript
var gulp = require('gulp');
var concat = require('gulp-concat');
...
var gulpSmartSrc = require('./gulp-smart-src');

gulp.task('foo', function() {
    gulpSmartSrc([
        './dep/1/local'
        , 'http://cdn.something-external-dep.com/'
        , './dep/2/local'
        , ...
        , '//some-other-external.dep.source.org/'
    ]).pipe(
        concat( 'all.js' ) 
    ).pipe(
        gulp.dest('build/')
    );
});

```

Inspired by: https://github.com/Metrime/gulp-download/blob/master/index.js
