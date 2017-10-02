'use strict'

const browserSync = require('browser-sync')
const debounce = require('lodash.debounce')
const chokidar = require('chokidar')

module.exports = (dest, opts) => {
  opts = opts || {}

  browserSync({
    files: dest,
    ghostMode: false,
    notify: false,
    open: false,
    port: opts.port,
    reloadDelay: 200,
    reloadDebounce: 200,
    ui: false,
    server: {
      baseDir: dest,
    },
  })

  const watch = opts.watch
  if (watch && watch.src && watch.onChange) {
    const onChangeThrottled = debounce(watch.onChange, 300)
    const watcher = chokidar.watch(watch.src, { ignoreInitial: true })
    watcher.on('all', () => onChangeThrottled())
  }
}
