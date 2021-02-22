import {capitalize} from '@/core/utils'
export class VirtualDOM {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('Корневой элемент $root не предоставлен')
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        throw new Error(`Метод ${method} не определен в  компоненте ${this.name}`)
      }
      /*
        Связываем контекст this с методом навсегда
        чтобы потом можно было обратиться к тому же
        самому методу для очистки слушателей
      */
      this[method] = this[method].bind(this)
      /*
        Тоже самое что и addEventListener
        bind нужен чтобы связать this с контекстом DOM сущности
        чтобы иметь доступ до this.$root
      */
      this.$root.on(listener, this[method])
    })
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        throw new Error(`Метод ${method} не определен в  компоненте ${this.name}`)
      }
      this.$root.off(listener, this[method])
    })
  }
}

function getMethodName(eventName) {
  return `on${capitalize(eventName)}`
}
