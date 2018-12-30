'use strict'

const connect = require('gulp-connect')

module.exports = (serveDir, opts = {}, watch = undefined) => (done) => {
  connect.server({ ...opts, root: serveDir }, function () {
    this.server.on('close', done)
    if (watch) watch()
  })
}
