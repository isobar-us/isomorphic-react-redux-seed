'use strict';

// needed to run gulp-mocha
require('babel-register');
const gulp        = require('gulp');
const gutil       = require('gulp-util');
const sourcemaps  = require('gulp-sourcemaps');
const sass        = require('gulp-sass');
const webpack     = require('webpack');
const imagemin    = require('gulp-imagemin');
const del         = require('del');
const runSequence = require('run-sequence');
const mocha       = require('gulp-mocha');

const webpackDevConfig  = require('./webpack.dev.js');
const webpackProdConfig = require('./webpack.prod.js');

const APP_SRC     = './app';
const APP_DIST    = './app/public';
const SASS_SRC    = APP_SRC + '/sass/**/*.scss';
const SASS_DIST   = APP_DIST + '/css';
const SCRIPTS_SRC = APP_SRC + '/scripts/**/*.+(js|jsx)';
const IMG_SRC     = APP_SRC + '/images/**/*.+(png|jpg|gif|svg|ico)';
const IMG_DIST    = APP_DIST + '/img';
const FONTS_SRC   = APP_SRC + '/fonts/**/*';
const FONTS_DIST  = APP_DIST + '/fonts';

gulp.task('sass:dev', () => gulp.src(SASS_SRC)
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'expanded', sourceComments: true}).on('error', sass.logError))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(SASS_DIST))
);

gulp.task('sass:prod', () => gulp.src(SASS_SRC)
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(gulp.dest(SASS_DIST))
);

function doWebpack(config, callback) {
  webpack(config, (err, stats) => {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      // output options
    }));
    callback();
  });
}

gulp.task('webpack:dev', (callback) => doWebpack(Object.create(webpackDevConfig), callback));

gulp.task('webpack:prod', (callback) => doWebpack(Object.create(webpackProdConfig), callback));

gulp.task('images:dev', () => gulp.src(IMG_SRC)
  .pipe(gulp.dest(IMG_DIST))
);

gulp.task('images:prod', () => gulp.src(IMG_SRC)
  .pipe(imagemin())
  .pipe(gulp.dest(IMG_DIST))
);

gulp.task('fonts', ()  => gulp.src(FONTS_SRC)
  .pipe(gulp.dest(FONTS_DIST))
);

gulp.task('clean', (callback) => del(APP_DIST, callback));

gulp.task('test', function () {
  return gulp.src('test/**/*.js', {read: false})
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('build', (callback) => runSequence('test', 'clean', ['sass:prod', 'webpack:prod', 'images:prod', 'fonts'], callback));

gulp.task('watch', ['sass:dev', 'webpack:dev', 'images:dev', 'fonts'], () => {
  gulp.watch(SASS_SRC, ['sass:dev']);
  gulp.watch([SCRIPTS_SRC], ['webpack:dev']);
  gulp.watch(IMG_SRC, ['images:dev']);
  gulp.watch(FONTS_SRC, ['fonts']);
});
