/* eslint-disable */
;(function () {
  'use strict'
  var images = document.querySelectorAll('img')

  for (var i = 0; i < images.length; i++) {
    images[i].setAttribute('data-zoomable', 'true')
  }

  mediumZoom('[data-zoomable]')
})()
