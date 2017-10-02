'use strict'

const path = require('path')
const gulp = require('gulp')

const build = require('./tasks/build')
const buildPreview = require('./tasks/build-preview')
const format = require('./tasks/format')
const lint = require('./tasks/lint')
const pack = require('./tasks/pack')
const preview = require('./tasks/preview')

const bundleName = 'ui'
const buildDir = 'build'
const previewSiteSrcDir = 'preview-site-src'
const previewSiteDestDir = path.join(buildDir, 'preview-site')
const srcDir = 'src'
const destDir = path.join(previewSiteDestDir, '_')

const jsFiles = [
  'gulpfile.js',
  'tasks/**/*.js',
  path.join(srcDir, '{helpers,js}/**/*.js')
]

gulp.task('lint', () =>
  lint(jsFiles)
)

gulp.task('format', () =>
  format(jsFiles)
)

gulp.task('build', () =>
  build(srcDir, destDir)
)

gulp.task('build:preview', ['build'], () =>
  buildPreview(srcDir, destDir, previewSiteSrcDir, previewSiteDestDir)
)

gulp.task('preview', ['build:preview'], () =>
  preview(previewSiteDestDir, {
    port: 5252,
    watch: {
      src: [srcDir, previewSiteSrcDir],
      onChange: () => gulp.start('build:preview'),
    },
  })
)

gulp.task('pack', ['build', 'lint'], () =>
  pack(destDir, buildDir, bundleName)
)

gulp.task('default', ['build'])
