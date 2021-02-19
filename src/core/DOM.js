class DOM {
  constructor(selector) {
    this.$element = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  get data() {
    return this.$element.dataset
  }

  html(template) {
    if (typeof template === 'string') {
      this.$element.innerHTML = template
      return this
    }
    return this.$element.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  on(eventType, callback) {
    this.$element.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$element.removeEventListener(eventType, callback)
  }

  append(node) {
    if (node instanceof DOM) {
      node = node.$element
    }
    if (Element.prototype.append) {
      this.$element.append(node)
    } else {
      this.appendChild(node.$element)
    }
    return this
  }

  closest(selector) {
    return $(this.$element.closest(selector))
  }

  getCoords() {
    return this.$element.getBoundingClientRect()
  }

  findAll(selector) {
    return this.$element.querySelectorAll(selector)
  }

  css(styles = {}) {
    Object
        .keys(styles)
        .forEach(key => {
          this.$element.style[key] = styles[key]
        })
  }
}

export function $(selector) {
  return new DOM(selector)
}

$.create = (tagName, classes = '') => {
  const element = document.createElement(tagName)
  if (classes) {
    element.classList.add(classes)
  }
  return $(element)
}
