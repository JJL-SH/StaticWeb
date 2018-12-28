const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const sassGlob = require('gulp-sass-glob');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const merge = require('merge-stream');
const fileInclude = require('gulp-file-include');
const imagemin = require('gulp-imagemin');
const del = require('del');
const concat = require('gulp-concat');
const zip = require('gulp-zip');

const paths = {
  src: './src/',
  build: './build/'
}

const clean = () => {
  return del(paths.build)
}

const css = () => {
  return gulp.src(paths.src + 'sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.build + 'css/'))
}

const javascript = () => {
  return gulp.src(paths.src + 'js/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.build + 'js/'))
}

const html = () => {
  return gulp.src(paths.src + 'html/*.html')
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(paths.build))
}

const images = () => {
  return gulp.src(paths.src + 'images/*.{jpg,jpeg,png,gif,svg}')
    .pipe(imagemin())
    .pipe(gulp.dest(paths.build + 'images/'))
}

const watch = () => {
  gulp.watch(paths.src + 'sass/*.scss', css)
  gulp.watch(paths.src + 'js/*.js', javascript)
  gulp.watch(paths.src + 'html/*.html', html)
  gulp.watch(paths.src + 'images/*.{jpg,jpeg,png,gif,svg}', images)
}

const serve = () => {
  browserSync.init({
    server: {
      baseDir: paths.build
    }
  });
  browserSync.watch(paths.src + '**/*.*', browserSync.reload);
}

const zipFile = () => {
  del('./build.zip')

  return gulp.src(paths.build + '**/*')
    .pipe(zip('build.zip'))
    .pipe(gulp.dest('./'))
}

const javascriptPlugin = () => {
  return gulp.src([
      'node_modules/jquery/dist/jquery.min.js'
    ])
    .pipe(concat('vendors.min.js'))
    .pipe(gulp.dest(paths.build + 'js/'))
}

const static = () => {
  return gulp.src(paths.src + 'fonts/font-awesome-4.7.0/fonts/**/*.*')
    .pipe(gulp.dest(paths.build + 'fonts/'))
}

gulp.task('default', gulp.series(
  clean,
  gulp.parallel(css, javascript, javascriptPlugin, html, images, static),
  gulp.parallel(watch, serve)
))

gulp.task('build', gulp.series(
  clean,
  gulp.parallel(css, javascript, javascriptPlugin, html, images, static),
  gulp.parallel(zipFile)
))