import {VirtualDOM} from '@core/VirtualDOM'

export class ExcelComponent extends VirtualDOM {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || 'Имя не определено'
    this.dispatcher = options.dispatcher
    this.unsubscribers = []
    this.prepare()
  }

  /*
   * Метод для настройки компонента до вызова init
   */
  prepare() {}

  /**
   * @return {string} Возвращает строку с HTML разметкой компонента
   */
  toHTML() {
    return ''
  }

  /*
    Метод является интерфейсом на class Observer.
    Уведомляет слушателей про событие
  */
  $dispatch(event, ...args) {
    this.dispatcher.dispatch(event, ...args)
  }

  /*
    Метод осуществляет подписку на событие
  */
  $subscribe(event, func) {
    const unsubscriber = this.dispatcher.subscribe(event, func)
    this.unsubscribers.push(unsubscriber)
  }

  /*
    Инициализирует дом слушателей
  */
  init() {
    this.initDOMListeners()
  }

  /*
    Метод уничтожаент компонент, очищает слушаетелей
  */
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsubscriber => unsubscriber())
  }
}
