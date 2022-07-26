
/**
 * Prevent page <body> tag from scrolling
 * @param {Boolean} bool - true to prevent scrolling, false to allow
 */
export function lockScroll (bool) {
  if (bool) {
    document.body.style.top = `-${window.scrollY}px`
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    document.body.style.height = '100%'
    document.body.style.overflowY = 'scroll'
    document.body.style.overscrollBehavior = 'contain'
  } else {
    const scrollY = document.body.style.top
    document.body.style.position = ''
    document.body.style.width = ''
    document.body.style.height = ''
    document.body.style.overflowY = ''
    document.body.style.overscrollBehavior = ''
    document.body.style.top = ''
    window.scrollTo(0, parseInt(scrollY || '0') * -1)
  }
}
