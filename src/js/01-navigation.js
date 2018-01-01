;(function () {
  'use strict'

  var navContainer = document.querySelector('.navigation-container')
  var navToggle = document.querySelector('.navigation-toggle')
  var menuPanel = navContainer.querySelector('[data-panel=menu]')
  var currentPageItem = document.querySelector('.nav-menu .is-current-page')
  var state = getState() || {}

  navContainer.querySelector('.current').addEventListener('click', function () {
    var currentPanel = document.querySelector('.navigation .is-active[data-panel]')
    var selectPanel = currentPanel.dataset.panel === 'menu' ? 'explore' : 'menu'
    currentPanel.classList.toggle('is-active')
    document.querySelector('.navigation [data-panel=' + selectPanel + ']').classList.toggle('is-active')
  })

  navToggle.addEventListener('click', toggleNavigation)
  // don't let click events propagate outside of navigation container
  navContainer.addEventListener('click', concealEvent)

  if (currentPageItem) activateCurrentPath(currentPageItem)

  find('.nav-menu').forEach(function (navTree) {
    var panel = navTree.parentElement.dataset.panel
    find('.nav-item', navTree).forEach(function (item, idx) {
      item.setAttribute('data-id', [panel, item.dataset.depth, idx].join('-'))
    })
  })

  find('.nav-toggle').forEach(function (btn) {
    var li = btn.parentElement
    btn.addEventListener('click', function () {
      li.classList.toggle('is-active')
      state.expandedItems = getExpandedItems()
      saveState()
    })
  })

  if (!state.expandedItems) {
    state.expandedItems = getExpandedItems()
    saveState()
  }

  state.expandedItems.forEach(function (itemId) {
    var item = document.querySelector('.nav-item[data-id="' + itemId + '"]')
    if (item) {
      item.classList.add('is-active')
    }
  })

  saveState()

  scrollItemIntoView(state.scroll || 0, menuPanel, currentPageItem && currentPageItem.querySelector('.nav-link'))

  menuPanel.addEventListener('scroll', function () {
    state.scroll = Math.round(menuPanel.scrollTop)
    saveState()
  })

  function activateCurrentPath (navItem) {
    var ancestorClasses
    var ancestor = navItem.parentNode
    while (!(ancestorClasses = ancestor.classList).contains('nav-menu')) {
      if (ancestor.tagName === 'LI' && ancestorClasses.contains('nav-item')) {
        ancestorClasses.add('is-active', 'is-current-path')
      }
      ancestor = ancestor.parentNode
    }
  }

  function toggleNavigation (e) {
    if (navToggle.classList.contains('is-active')) {
      return closeNavigation(e)
    }
    document.documentElement.classList.add('is-clipped--nav')
    navToggle.classList.add('is-active')
    navContainer.classList.add('is-active')
    window.addEventListener('click', closeNavigation)
    // don't let this event get picked up by window click listener
    concealEvent(e)
  }

  function closeNavigation (e) {
    if (e.which === 3 || e.button === 2) return
    document.documentElement.classList.remove('is-clipped--nav')
    navToggle.classList.remove('is-active')
    navContainer.classList.remove('is-active')
    window.removeEventListener('click', closeNavigation)
    // don't let this event get picked up by window click listener
    concealEvent(e)
  }

  function concealEvent (e) {
    e.stopPropagation()
  }

  function getExpandedItems () {
    return find('.nav-menu .is-active').map(function (item) {
      return item.dataset.id
    })
  }

  function getState (component, version) {
    var data = window.sessionStorage.getItem('nav-state')
    if (data) {
      return JSON.parse(data)
    }
  }

  function saveState () {
    window.sessionStorage.setItem('nav-state', JSON.stringify(state))
  }

  function scrollItemIntoView (scrollPosition, parent, el) {
    if (!el) return (parent.scrollTop = scrollPosition)

    var margin = 10

    var overTheTop = el.offsetTop - scrollPosition < 0
    var belowTheBottom = el.offsetTop - scrollPosition + el.offsetHeight > parent.offsetHeight

    if (overTheTop) {
      parent.scrollTop = el.offsetTop - margin
    } else if (belowTheBottom) {
      parent.scrollTop = el.offsetTop - (parent.offsetHeight - el.offsetHeight) + margin
    } else {
      parent.scrollTop = scrollPosition
    }
  }

  function find (selector, from) {
    from = from || document
    return [].slice.call(from.querySelectorAll(selector))
  }
})()
