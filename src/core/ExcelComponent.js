import {VirtualDOM} from '@core/VirtualDOM'

export class ExcelComponent extends VirtualDOM {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || 'Имя не определено'
  }
  /**
   * @return {string} Возвращает строку с HTML разметкой компонента
   */
  toHTML() {
    return ''
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
  }
}
