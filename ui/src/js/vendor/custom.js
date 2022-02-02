/* eslint-disable */
;(function () {
  'use strict'
  var images = document.querySelectorAll('img')

  for (var i = 0; i < images.length; i++) {
    if (!images[i].classList.contains('copy-icon')){
      images[i].setAttribute('data-zoomable', 'true')
    }
  }

  mediumZoom('[data-zoomable]')
})()

console.log(uiRootPath)

let themetoggle = document.getElementById("theme-toggle");
let themelink = document.getElementById('theme');
let theme = window.localStorage.getItem('data-theme');
if(theme && theme == 'dark') {
  themelink.setAttribute('href', uiRootPath+'/css/dark-site.css');
  themetoggle.classList.add("dark");
} else if ( theme && theme == 'light') {
  themelink.setAttribute('href', uiRootPath+'/css/site.css');
  themetoggle.classList.remove("dark");
} else {
  themelink.setAttribute('href', uiRootPath+'/css/site.css');
  themetoggle.classList.remove("dark");
}

function toggleTheme() {
  let theme = document.getElementById('theme');

  if (theme.getAttribute('href') == uiRootPath+'/css/site.css') {
    theme.setAttribute('href', uiRootPath+'/css/dark-site.css');
    window.localStorage.setItem('data-theme', 'dark');
    themetoggle.classList.add("dark");
  } else {
    theme.setAttribute('href', uiRootPath+'/css/site.css');
    window.localStorage.setItem('data-theme', 'light');
    themetoggle.classList.remove("dark");
  }
};
