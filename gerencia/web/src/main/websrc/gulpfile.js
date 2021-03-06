'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var es = require('event-stream');
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
var runSequence = require('run-sequence');
var rename = require('gulp-rename');
var ngAnnotate = require('gulp-ng-annotate');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', function () {
  return gulp.src('./../resources/*')
    .pipe(clean({force: true}));
});

gulp.task('jshint', function () {
  return gulp.src('./src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('uglifyProd', function () {
  return es.merge([
      gulp.src([
        "./node_modules/jquery/dist/jquery.min.js",
        "./node_modules/bootstrap/dist/js/bootstrap.min.js",
        "./node_modules/bootstrap-switch/dist/js/bootstrap-switch.min.js",
        "./node_modules/moment/min/moment.min.js",
        "./node_modules/moment/locale/pt-br.js",
        "./node_modules/angular/angular.min.js",
        "./node_modules/angular-cookies/angular-cookies.min.js",
        "./node_modules/angular-route/angular-route.min.js",
        "./node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js",
        "./node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",
        "./node_modules/sugarloaf-cli/dist/sugarloaf.js",
        "./node_modules/angular-bootstrap3-datepicker/dist/ng-bs3-datepicker.min.js",
        "./node_modules/angular-bootstrap-switch/dist/angular-bootstrap-switch.min.js",
        "./node_modules/angular-ui-mask/dist/mask.min.js",
        "./node_modules/angular-block-ui/dist/angular-block-ui.min.js"
      ]),
      gulp.src('./src/**/*.js')
        .pipe(concat('scripts.js'))
        .pipe(ngAnnotate())
        .pipe(uglify({mangle: false}))
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('gerencia.min.js'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./../resources/dist/js'));
});

gulp.task('uglifyDev', function () {
  return gulp.src('./src/**/*.js', {base:'./'})
    .pipe(sourcemaps.init())
    .pipe(concat("gerencia.js"))
    .pipe(rename({suffix: '.min'}))
    .pipe(ngAnnotate())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./../resources/dist/js'));
});

gulp.task('htmlmin', function () {
  return gulp.src('./src/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./../resources/dist/view'))
});

gulp.task('cssProd', function () {
  return es.merge([
      gulp.src([
        "./node_modules/bootstrap/dist/css/bootstrap.min.css",
        "./node_modules/bootstrap/dist/css/bootstrap-theme.min.css",
        "./node_modules/sugarloaf-cli/dist/sugarloaf.min.css",
        "./node_modules/angular-bootstrap3-datepicker/dist/ng-bs3-datepicker.css",
        "./node_modules/font-awesome/css/font-awesome.min.css",
        "./node_modules/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css",
        "./src/style/sidebar.css",
        "./node_modules/angular-block-ui/dist/angular-block-ui.min.css"
      ]),
      gulp.src('./src/**/*.scss').pipe(concat('sass.scss')).pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    ])
    .pipe(cleanCSS())
    .pipe(sourcemaps.init())
    .pipe(concat('gerencia.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./../resources/dist/css'));
});

gulp.task('cssDev', function () {
  return gulp.src('./src/**/*.scss')
    .pipe(concat('sass.scss'))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(concat('gerencia.min.css'))
    .pipe(gulp.dest('./../resources/dist/css'));
});

gulp.task('copyDevDepJS', function(){
  return gulp.src([
    "./node_modules/jquery/dist/jquery.min.js",
    "./node_modules/bootstrap/dist/js/bootstrap.min.js",
    "./node_modules/bootstrap-switch/dist/js/bootstrap-switch.min.js",
    "./node_modules/moment/min/moment.min.js",
    "./node_modules/moment/locale/pt-br.js",
    "./node_modules/angular/angular.min.js",
    "./node_modules/angular-cookies/angular-cookies.min.js",
    "./node_modules/angular-route/angular-route.min.js",
    "./node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js",
    "./node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",
    "./node_modules/sugarloaf-cli/dist/sugarloaf.js",
    "./node_modules/angular-bootstrap3-datepicker/dist/ng-bs3-datepicker.min.js",
    "./node_modules/angular-bootstrap-switch/dist/angular-bootstrap-switch.min.js",
    "./node_modules/angular-ui-mask/dist/mask.min.js",
    "./node_modules/angular-block-ui/dist/angular-block-ui.min.js"
  ])
    .pipe(gulp.dest('./../resources/dist/js'));
});

gulp.task('copyDevDepCSS', function(){
  return gulp.src([
      "./node_modules/bootstrap/dist/css/bootstrap.min.css",
      "./node_modules/bootstrap/dist/css/bootstrap-theme.min.css",
      "./node_modules/sugarloaf-cli/dist/sugarloaf.min.css",
      "./node_modules/angular-bootstrap3-datepicker/dist/ng-bs3-datepicker.css",
      "./node_modules/font-awesome/css/font-awesome.min.css",
      "./node_modules/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css",
      "./src/style/sidebar.css",
      "./node_modules/angular-block-ui/dist/angular-block-ui.min.css"
    ])
    .pipe(gulp.dest('./../resources/dist/css'));
});

gulp.task('copyImg',function(){
  return gulp.src([
      'src/**/*.png',
      'src/**/*.jpeg'
    ])
    .pipe(gulp.dest('./../resources/dist/img'));
});

gulp.task('copyBSFonts', function(){
  return gulp.src(['node_modules/bootstrap/dist/fonts/*','node_modules/font-awesome/fonts/*']).pipe(gulp.dest('./../resources/dist/fonts'));
});

gulp.task('copyIndexProd', function(){
  return gulp.src('template/indexProd.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./../resources/templates'));
});

gulp.task('copyIndexDev', function(){
  return gulp.src('template/indexDev.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./../resources/templates'));
});

gulp.task('default', function (cb) {
  return runSequence('clean', ['jshint', 'uglifyDev', 'htmlmin', 'cssDev', 'copyImg', 'copyBSFonts', 'copyDevDepCSS', 'copyDevDepJS', 'copyIndexDev'], cb)
});

gulp.task('prod', function (cb) {
  return runSequence('clean', ['jshint', 'uglifyProd', 'htmlmin', 'cssProd', 'copyImg', 'copyBSFonts', 'copyIndexProd'], cb)
});
