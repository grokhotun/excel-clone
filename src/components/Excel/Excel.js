import {Observer} from '@/core/Observer'
import {$} from '@/core/DOM'

export class Excel {
  constructor(selector, options) {
    this.$element = $(selector)
    this.components = options.components || []
    this.dispatcher = new Observer()
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    const componentOptions = {
      dispatcher: this.dispatcher
    }

    this.components = this.components.map(Component => {
      const $element = $.create('div', Component.className)
      const component = new Component($element, componentOptions)
      $element.html(component.toHTML())
      $root.append($element)
      return component
    })
    return $root
  }

  render() {
    this.$element.append(this.getRoot())
    this.components.forEach(component => component.init())
  }

  desctroy() {
    this.components.forEach(component => component.desctroy())
  }
}
