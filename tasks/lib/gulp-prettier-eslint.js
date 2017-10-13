'use strict'

const { PluginError } = require('gulp-util')
const prettierEslint = require('prettier-eslint')
const through = require('through2')

module.exports = () => {
  const report = { changed: 0, unchanged: 0 }
  return through.obj(format).on('end', () => {
    if (report.changed > 0) {
      const changed = 'formatted '
        .concat(report.changed)
        .concat(' file')
        .concat(report.changed === 1 ? '' : 's')
      const unchanged = 'left '
        .concat(report.unchanged)
        .concat(' file')
        .concat(report.unchanged === 1 ? '' : 's')
        .concat(' unchanged')
      console.log(`prettier-eslint: ${changed}; ${unchanged}`)
    }
  })

  function format (file, encoding, callback) {
    if (file.isNull()) {
      return callback(null, file)
    }

    if (file.isStream()) {
      return callback(new PluginError('gulp-prettier-eslint', 'Streaming not supported'))
    }

    const input = file.contents.toString()
    const output = prettierEslint({ text: input })

    if (input === output) {
      report.unchanged += 1
    } else {
      report.changed += 1
      file.contents = Buffer.from(output, encoding)
    }

    return callback(null, file)
  }
}
