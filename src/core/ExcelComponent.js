import {VirtualDOM} from '@/core/VirtualDOM'

export class ExcelComponent extends VirtualDOM {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || 'Имя не определено'
    // Массив ключей из store для подписки
    this.subscribe = options.subscribe || []
    this.dispatcher = options.dispatcher
    this.store = options.store
    this.unsubscribers = []
    // this.storeSub = null
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
  $emit(event, ...args) {
    this.dispatcher.dispatch(event, ...args)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  /*
    Сюда будут приходить изменения
    только по тем данным, на которые
    подписались компоненты
  */
  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  $state() {
    return this.store.getState()
  }

  // $subscribe(func) {
  //   this.storeSub = this.store.subscribe(func)
  // }

  /*
    Метод осуществляет подписку на событие
  */
  $on(event, func) {
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
    // this.storeSub.unsubscribe()
  }
}
