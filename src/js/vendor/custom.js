;(function () {
  'use strict'
if (document.querySelector(".nav-container").getAttribute('data-component') === 'lisk') {
  var navList = document.querySelectorAll('.nav-item:not(.single-page)');

  /*if (navList[1].childNodes[3].textContent === "Explanations") {
    navList[2].classList.add("is-active")
  } else {
    navList[1].classList.add("is-active");
  }*/

  navList[3].classList.add("is-active");
}

  var navList2 = document.querySelectorAll('.nav-item:not(.single-page)');

  navList2[1].classList.add("is-active");

  var images = document.querySelectorAll('img');

  for (var i = 0; i < images.length; i++) {
    images[i].setAttribute('data-zoomable','true');
  }
  mediumZoom('[data-zoomable]');

})()

