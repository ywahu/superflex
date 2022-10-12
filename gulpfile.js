"use strict";
const { src, dest, series, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const del = require("del");
const beautify = require("gulp-beautify");
const autoprefixer = require("gulp-autoprefixer");
const minify = require("gulp-minify");

function defaultTask(cb) {
  // place code for your default taskhere
  cb();
}

function clean() {
  return del(["./dist/css", "./dist/*.html", "./dist/scripts"]);
}

function minJs() {
  return src("./src/scripts/*.js").pipe(minify()).pipe(dest("./dist/scripts"));
}

function styles() {
  return src("./src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write("."))
    .pipe(dest("./dist/css"))
    .pipe(browserSync.stream());
}

function watchFiles() {
  browserSync.init({
    server: {
      baseDir: "./",
      serveStaticOptions: {
        extensions: ["html"],
      },
    },
  });
  watch("./**/*.scss", styles);
  watch("./**/*.js", minJs);
  watch("./*.html").on("change", browserSync.reload);
}

exports.minJs = minJs;
exports.watchFiles = watchFiles;
exports.styles = styles;
exports.default = defaultTask;
exports.clean = clean;
exports.build = series(clean, minJs, styles);
exports.default = series(clean, minJs, styles, watchFiles);
