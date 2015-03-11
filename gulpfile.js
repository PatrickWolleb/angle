var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");



gulp.task('default', function() {	
 	
 	gulp.src('src/angle.js')
    .pipe(browserify({
    	standalone : 'angle',
    }))
    .pipe(uglify())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('./bin'));

});


gulp.task('watch', function() {

	gulp.watch('src/*.js', ['default']);

});	