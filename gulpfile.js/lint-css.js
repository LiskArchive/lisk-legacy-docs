'use strict'

const stylelint = require('gulp-stylelint')
const vfs = require('vinyl-fs')

module.exports = (files) => () =>
  vfs.src(files).pipe(stylelint({ reporters: [{ formatter: 'string', console: true }] }))
