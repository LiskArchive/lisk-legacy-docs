;(function () {
  'use strict'

  var toggle = document.querySelector('.toolbar-versions .version-menu-toggle')
  if (!toggle) return

  var selector = document.querySelector('.toolbar-versions')

  toggle.addEventListener('click', function (e) {
    selector.classList.toggle('is-active')
    // don't let this event get smothered
    e.stopPropagation()
  })

  document.documentElement.addEventListener('click', function () {
    selector.classList.remove('is-active')
  })
})()
