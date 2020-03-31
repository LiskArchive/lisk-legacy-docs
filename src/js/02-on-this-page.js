;(function () {
  'use strict'

  var sidebar = document.querySelector('aside.toc.sidebar')
  if (!sidebar) return
  if (document.querySelector('body.-toc')) return sidebar.parentNode.removeChild(sidebar) && undefined
  var levels = parseInt(sidebar.dataset.levels || 2)
  if (levels < 0) return
  var article = document.querySelector('article.doc')
  var headings
  var headingSelector = []
  for (var l = 0; l <= levels; l++) headingSelector.push(l ? '.sect' + l + ' > h' + (l + 1) + '[id]' : 'h1[id].sect0')
  if (!(headings = find(headingSelector.join(', '), article)).length) {
    return sidebar.parentNode.removeChild(sidebar) && undefined
  }

  var lastActiveFragment
  var links = {}
  var list = headings.reduce(function (accum, heading) {
    var link = toArray(heading.childNodes).reduce(function (target, child) {
      if (child.nodeName !== 'A') target.appendChild(child.cloneNode(true))
      return target
    }, document.createElement('a'))
    links[(link.href = '#' + heading.id)] = link
    var listItem = document.createElement('li')
    listItem.dataset.level = parseInt(heading.nodeName.slice(1)) - 1
    listItem.appendChild(link)
    accum.appendChild(listItem)
    return accum
  }, document.createElement('ul'))

  var menu = sidebar.querySelector('.toc-menu')
  if (!menu) {
    menu = document.createElement('div')
    menu.className = 'toc-menu'
  }

  var title = document.createElement('h3')
  title.textContent = sidebar.dataset.title || 'Contents'
  menu.appendChild(title)
  menu.appendChild(list)

  var startOfContent = !document.getElementById('toc') && article.querySelector('h1.page ~ :not(.is-before-toc)')
  if (startOfContent) {
    var embeddedToc = document.createElement('aside')
    embeddedToc.className = 'toc embedded'
    embeddedToc.appendChild(menu.cloneNode(true))
    startOfContent.parentNode.insertBefore(embeddedToc, startOfContent)
  }

  window.addEventListener('load', function () {
    onScroll()
    window.addEventListener('scroll', onScroll)
  })

  function onScroll () {
    var activeFragment
    var scrolledBy = window.pageYOffset
    var buffer = getStyleValueAsInt(document.documentElement, 'fontSize')
    if (scrolledBy && window.innerHeight + scrolledBy + 2 >= document.documentElement.scrollHeight) {
      activeFragment = '#' + headings[headings.length - 1].id
    } else {
      var targetPosition = article.offsetTop
      headings.some(function (heading) {
        var headingTop = heading.getBoundingClientRect().top + getStyleValueAsInt(heading, 'paddingTop')
        if (targetPosition < headingTop - buffer) return true
        activeFragment = '#' + heading.id
      })
    }
    if (activeFragment) {
      if (activeFragment !== lastActiveFragment) {
        if (lastActiveFragment) {
          links[lastActiveFragment].classList.remove('is-active')
        }
        var activeLink = links[activeFragment]
        activeLink.classList.add('is-active')
        if (list.scrollHeight > list.offsetHeight) {
          list.scrollTop = Math.max(0, activeLink.offsetTop + activeLink.offsetHeight - list.offsetHeight)
        }
        lastActiveFragment = activeFragment
      }
    } else if (lastActiveFragment) {
      links[lastActiveFragment].classList.remove('is-active')
      lastActiveFragment = undefined
    }
  }

  function find (selector, from) {
    return toArray((from || document).querySelectorAll(selector))
  }

  function toArray (collection) {
    return [].slice.call(collection)
  }

  function getStyleValueAsInt (el, prop) {
    return parseInt(window.getComputedStyle(el)[prop])
  }
})()
