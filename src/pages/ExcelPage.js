import {Page} from '@/core/Page';
import {Excel} from '@/components/Excel/Excel'
import {Header} from '@/components/Header/Header'
import {Toolbar} from '@/components/Toolbar/Toolbar'
import {Table} from '@/components/Table/Table'
import {Formula} from '@/components/Formula/Formula'
import {createStore} from '@/core/store/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {normalizeInitialState} from '@/redux/initialState'
import {debouncer, storage} from '@/core/utils'

function storageName(param) {
  return `excel-state:${param}`
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString()
    const state = storage(storageName(params))
    const store = createStore(rootReducer, normalizeInitialState(state))
    const stateListener = debouncer(state => {
      console.log('App State: ', state)
      storage(storageName(params), state)
    }, 500)

    store.subscribe(stateListener)

    const options = {
      components: [Header, Formula, Toolbar, Table],
      store
    }

    this.excel = new Excel(options)

    return this.excel.getRoot()
  }

  afterMounted() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
