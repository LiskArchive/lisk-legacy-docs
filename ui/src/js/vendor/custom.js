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
checkBox.checked = theme == 'dark' ? true : false;

function toggleTheme() {
  // Obtains an array of all <link>
  // elements.
  // Select your element using indexing.
  let theme = document.getElementById('theme');


  // Change the value of href attribute
  // to change the css sheet.
  if (theme.getAttribute('href') == uiRootPath+'/css/site.css') {
    theme.setAttribute('href', uiRootPath+'/css/dark-site.css');
    window.localStorage.setItem('data-theme', 'dark');
  } else {
    theme.setAttribute('href', uiRootPath+'/css/site.css');
    window.localStorage.setItem('data-theme', 'light');
  }
}

/*let themetoggle = document.getElementById("theme-toggle");

document
  .querySelector(`link[title="Dark"]`)
  .setAttribute("disabled", "disabled");

themetoggle.onclick = function(){
  console.log("clicked!");
  themetoggle.classList.toggle("dark");

  if (themetoggle.classList.contains("dark")) {
    console.log("if!");
    document
      .querySelector(`link[title="Dark"]`)
      .removeAttribute("disabled");
    document
      .querySelector(`link[title="Default"]`)
      .setAttribute("disabled", "disabled");
  } else {
    console.log("else!");
    document
      .querySelector(`link[title="Default"]`)
      .removeAttribute("disabled");
    document
      .querySelector(`link[title="Dark"]`)
      .setAttribute("disabled", "disabled");
  }
};*/

/*
console.log(themetoggle);

themetoggle.click(function () {
  console.log("clicked!");
  $(this).classList.toggle("dark");

  console.log($(this).classList);
  if ($(this).classList.contains("dark")) {
    document
      .querySelector(`link[title="Default"]`)
      .removeAttribute("disabled");
    document
      .querySelector(`link[title="Dark"]`)
      .setAttribute("disabled", "disabled");
  } else {
    document
      .querySelector(`link[title="Dark"]`)
      .removeAttribute("disabled");
    document
      .querySelector(`link[title="Default"]`)
      .setAttribute("disabled", "disabled");
  }
});
*/
