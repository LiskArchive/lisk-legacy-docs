'use strict'

const chokidar = require('chokidar')
const connect = require('gulp-connect')

module.exports = (serveDir, opts = {}) => (done) => {
  const watch = opts.watch
  delete opts.watch
  opts = Object.assign({ root: serveDir }, opts)
  let onStart
  if (watch && watch.src && watch.onChange) {
    onStart = () =>
      chokidar
        .watch(watch.src, { ignoreInitial: true })
        .on('add', watch.onChange)
        .on('change', watch.onChange)
        .on('unlink', watch.onChange)
  }
  connect.server(opts, function () {
    this.server.on('close', done)
    if (onStart) onStart()
  })
}
