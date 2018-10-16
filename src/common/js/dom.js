export function getData(el, name, val) {
  const prefix = 'data-'
  if (val) {
    el.setAttribute(prefix + name, val)
  } else {
    return el.getAttribute(prefix + name)
  }
}