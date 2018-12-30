'use strict'

const connect = require('gulp-connect')
const { watch } = require('gulp')

module.exports = (serveDir, opts = {}) => (done) => {
  const { glob: watchGlob, call: watchCall } = opts.watch || {}
  opts = { ...opts, root: serveDir }
  delete opts.watch
  connect.server(opts, function () {
    this.server.on('close', done)
    if (watchGlob && watchCall) watch(watchGlob, watchCall)
  })
}
