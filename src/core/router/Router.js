import {$} from '@/core/DOM'
import {ActiveRoute} from '@/core/router/ActiveRoute'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error(`Не предоставлен селектор (${selector}) корневого элемента`)
    }
    this.$placeholder = $(selector)
    this.routes = routes
    this.page = null
    this.changePageHandler = this.changePageHandler.bind(this)
    this.prepare()
    this.init()
  }

  prepare() {}

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }

  changePageHandler() {
    if (this.page) {
      this.page.destroy()
    }
    this.$placeholder.clear()
    const Page = ActiveRoute.path.includes('excel') ? this.routes.excel : this.routes.dashboard
    this.page = new Page(ActiveRoute.params)
    this.$placeholder.append(this.page.getRoot())
    this.page.afterMounted()
  }
}
