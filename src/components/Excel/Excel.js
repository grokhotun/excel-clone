import {Observer} from '@/core/Observer'
import {$} from '@/core/DOM'
import {StoreSubscriber} from '@/core/StoreSubscriber'
import {updateDate} from '@/redux/actions'

export class Excel {
  constructor(options) {
    this.components = options.components || []
    this.store = options.store
    this.dispatcher = new Observer()
    this.subscriber = new StoreSubscriber(this.store)
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    const componentOptions = {
      dispatcher: this.dispatcher,
      store: this.store
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

  init() {
    this.store.dispatch(updateDate())
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach(component => component.init())
  }

  destroy() {
    this.subscriber.unsubscribeComponents()
    this.components.forEach(component => component.destroy())
  }
}
