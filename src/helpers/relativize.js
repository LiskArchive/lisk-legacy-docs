'use strict'

const path = require('path')

// TODO memoize
module.exports = (from, to) => {
  if (to === '#') {
    return to
  } else if (to.charAt(to.length - 1) === '/') {
    return from === to ? './' : path.relative(path.dirname(from + '.'), to) + '/'
  } else {
    return path.relative(path.dirname(from + '.'), to)
  }
}
