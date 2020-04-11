'use strict'

const vfs = require('vinyl-fs')
const zip = require('gulp-vinyl-zip')
const path = require('path')

module.exports = (src, dest, bundleName) => () =>
  vfs
    .src('**/*', { base: src, cwd: src })
    .pipe(zip.dest(path.join(dest, `${bundleName}-bundle.zip`)))
