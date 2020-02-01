const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');

const sourceFile = [
    'js/registration.js', 'js/soundtracks_library.js',
    'js/upload.js', 'js/genre_filter.js', 'js/search.js',
    'js/library_back_btn.js', 'js/albums.js',
    'js/rate.js', 'js/pageload_code.js', 'js/sort.js'
]
const destFolder = './js/';
const destFile = 'script.bundle.js';

gulp.task('sass-compile', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('style'))
});

gulp.task('concat', function () {
    return gulp.src(sourceFile)
        .pipe(concat(destFile))
        .pipe(gulp.dest(destFolder))
});

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', gulp.series('sass-compile'));
    gulp.watch(['./js/*.js', '!./js/script.bundle.js'], gulp.series('concat'));
})