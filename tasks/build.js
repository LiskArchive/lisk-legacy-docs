'use strict'

const autoprefixer = require('autoprefixer')
const browserify = require('browserify')
const buffer = require('vinyl-buffer')
const concat = require('gulp-concat')
const cssnano = require('cssnano')
const imagemin = require('gulp-imagemin')
const merge = require('merge-stream')
const postcss = require('gulp-postcss')
const postcssCalc = require('postcss-calc')
const postcssImport = require('postcss-import')
const postcssVar = require('postcss-custom-properties')
const tap = require('gulp-tap')
const uglify = require('gulp-uglify')
const vfs = require('vinyl-fs')

const postcssPlugins = [
  postcssImport(),
  postcssVar(),
  postcssCalc(),
  autoprefixer({ browsers: ['last 2 versions'] }),
  cssnano({ preset: 'default' }),
]

module.exports = (src, dest) => {
  const opts = { base: src, cwd: src }

  return merge([
    vfs.src('img/**/*.{jpg,png,svg}', opts).pipe(imagemin()),

    vfs
      .src('js/+([0-9])-*.js', opts)
      .pipe(uglify())
      .pipe(concat('js/site.js')),

    vfs
      .src('js/vendor/*.js', Object.assign({ read: false }, opts))
      .pipe(tap((file) => {
        file.contents = browserify(file.relative, { basedir: src, detectGlobals: false }).bundle()
      }))
      .pipe(buffer())
      .pipe(uglify()),

    vfs.src('fonts/*.woff*(2)', opts),

    vfs.src('css/site.css', opts).pipe(postcss(postcssPlugins)),

    vfs.src('helpers/*.js', opts),

    vfs.src('layouts/*.hbs', opts),

    vfs.src('partials/*.hbs', opts),
  ]).pipe(vfs.dest(dest))
}
