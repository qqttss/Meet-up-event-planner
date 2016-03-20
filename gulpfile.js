var gulp = require('gulp');

var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssnano');
var browserSync = require('browser-sync');

// lint task
gulp.task('lint', function() {
    return gulp.src('./js/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('scripts-dist', function() {
    gulp.src('./js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('css-min', function () {
    gulp.src('./css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('copy-html', function() {
    gulp.src('./index.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('copy-bootstrapCSS', function() {
    gulp.src('./bower_components/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('./dist/css/lib'));
});

gulp.task('copy-jsFiles', function() {
    gulp.src(['./bower_components/jquery/dist/jquery.min.js',
        './bower_components/bootstrap/dist/js/bootstrap.min.js',
        './bower_components/handlebars/handlebars.min.js'
        ])
        .pipe(gulp.dest('./dist/js/lib'));
});

gulp.task('copy-images', function() {
    gulp.src('./images/**')
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('browser-sync', function() {
    browserSync({
        files: "**",
        server: {
            baseDir: "./"
        }
    });
});

//default task
gulp.task('default', ['lint', 'scripts-dist', 'css-min', 'copy-bootstrapCSS', 'copy-jsFiles', 'copy-images']);
