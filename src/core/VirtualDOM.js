export class VirtualDOM {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('Корневой элемент $root не предоставлен')
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    console.log(this.listeners)
  }

  removeDOMListeners() {

  }
}
