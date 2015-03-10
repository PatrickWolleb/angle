var gulp = require('gulp');
var defineModule = require('gulp-define-module');


gulp.task('default', function() {
 	gulp.src(['src/test.js'])
 		.pipe(defineModule('hybrid'))
 		.pipe(gulp.dest('build/'));
});