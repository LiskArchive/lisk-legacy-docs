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

let themetoggle = document.getElementById("theme-toggle");

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
};

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
