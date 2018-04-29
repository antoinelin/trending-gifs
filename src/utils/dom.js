export default {
  id(id, node = document) {
    return node.getElementById(id)
  },
  el(el, node = document) {
    return node.querySelector(el)
  },
  className(elClass, node = document) {
    return node.getElementsByClassName(elClass)
  },
  tag(tag, node = document) {
    return node.getElementsByTagName(tag)
  },
  all(els, node = document) {
    return [...node.querySelectorAll(els)]
  },
}
