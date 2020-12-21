;(function () {
  'use strict'

  var navbarBurger = document.querySelector('.navbar-burger')
  if (!navbarBurger) return
  navbarBurger.addEventListener('click', toggleNavbarMenu.bind(navbarBurger))

  function toggleNavbarMenu (e) {
    e.stopPropagation() // trap event
    this.classList.toggle('is-active')
    document.getElementById(this.dataset.target).classList.toggle('is-active')
    document.documentElement.classList.toggle('is-clipped--navbar')
  }
})()
