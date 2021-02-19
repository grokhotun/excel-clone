// import {VirtualDOM} from '@core/VirtualDOM'

import {VirtualDOM} from '@core/VirtualDOM'

export class ExcelComponent extends VirtualDOM {
  constructor($root, options = {}) {
    super($root, options.listeners)
  }
  /**
   * @return {strong} Возвращает строку с HTML разметкой компонента}
   */
  toHTML() {
    return ''
  }

  init() {
    this.initDOMListeners()
  }
}
