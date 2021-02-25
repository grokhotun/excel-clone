import {Loader} from '../../components/Loader/Loader'
import {$} from '../DOM'
import {ActiveRoute} from './ActiveRoute'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error(`Не предоставлен селектор (${selector}) корневого элемента`)
    }
    this.$placeholder = $(selector)
    this.routes = routes
    this.loader = new Loader()
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

  async changePageHandler() {
    if (this.page) {
      this.page.destroy()
    }
    this.$placeholder.clear().append(this.loader)
    const Page = ActiveRoute.path.includes('excel') ? this.routes.excel : this.routes.dashboard
    this.page = new Page(ActiveRoute.params)

    const root = await this.page.getRoot()

    this.$placeholder.clear().append(root)
    this.page.afterMounted()
  }
}
