'use strict'

const vfs = require('vinyl-fs')
const zip = require('gulp-vinyl-zip')

module.exports = async (src, dest, bundleName) =>
  new Promise((resolve, reject) =>
    vfs
      .src('**/*', { base: src, cwd: src })
      .pipe(zip.zip(`${bundleName}-bundle.zip`))
      .pipe(vfs.dest(dest))
      .on('error', reject)
      .on('end', resolve)
  )
