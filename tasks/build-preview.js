'use strict'

const fs = require('fs')
const handlebars = require('handlebars')
const map = require('map-stream')
const path = require('path')
const requireFromString = require('require-from-string')
const vfs = require('vinyl-fs')
const yaml = require('js-yaml')

module.exports = async (src, dest, siteSrc, siteDest) => {
  const [layouts] = await Promise.all([
    compileLayouts(src),
    registerPartials(src),
    registerHelpers(src),
  ])

  const mockUIModel = loadSampleUIModel(siteSrc)

  vfs
    .src('**/*.html', { base: siteSrc, cwd: siteSrc })
    .pipe(
      map((file, next) => {
        const compiledLayout = layouts['default.hbs']
        const siteRootPath = path.relative(
          path.dirname(file.path),
          path.resolve(siteSrc)
        )
        mockUIModel['siteRootPath'] = siteRootPath
        mockUIModel['siteRootUrl'] = path.join(siteRootPath, 'index.html')
        mockUIModel['uiRootPath'] = path.join(siteRootPath, '_')
        mockUIModel['contents'] = file.contents.toString().trimRight()
        file.contents = Buffer.from(compiledLayout(mockUIModel))
        next(null, file)
      })
    )
    .pipe(vfs.dest(siteDest))
}

function registerPartials (src) {
  return new Promise((resolve, reject) => {
    vfs
      .src(['partials/*.hbs'], { base: src, cwd: src })
      .pipe(
        map((file, next) => {
          handlebars.registerPartial(file.stem, file.contents.toString())
          next(null, file)
        })
      )
      .on('error', reject)
      .on('end', resolve)
  })
}

function registerHelpers (src) {
  return new Promise((resolve, reject) => {
    vfs
      .src(['helpers/*.js'], { base: src, cwd: src })
      .pipe(
        map((file, next) => {
          const helperFunction = requireFromString(file.contents.toString())
          handlebars.registerHelper(file.stem, helperFunction)
          next(null, file)
        })
      )
      .on('error', reject)
      .on('end', resolve)
  })
}

function compileLayouts (src) {
  const layouts = {}
  return new Promise((resolve, reject) => {
    vfs
      .src('layouts/*.hbs', { base: src, cwd: src })
      .pipe(
        map((file, next) => {
          layouts[file.basename] = handlebars.compile(
            file.contents.toString(),
            { preventIndent: true }
          )
          next(null, file)
        })
      )
      .on('error', reject)
      .on('end', () => resolve(layouts))
  })
}

function loadSampleUIModel (siteSrc) {
  return yaml.safeLoad(
    fs.readFileSync(path.join(siteSrc, 'ui-model.yml'), 'utf8')
  )
}
