import {Page} from '@/core/Page';
import {Excel} from '@/components/Excel/Excel'
import {Header} from '@/components/Header/Header'
import {Toolbar} from '@/components/Toolbar/Toolbar'
import {Table} from '@/components/Table/Table'
import {Formula} from '@/components/Formula/Formula'
import {createStore} from '@/core/store/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {normalizeInitialState} from '@/redux/initialState'
import {LocalStorageClient} from '@/core/LocalStorageClient';
import {StateProcessor} from '@/core/StateProcessor';

export class ExcelPage extends Page {
  constructor(param) {
    super(param)
    this.storeSub = null
    this.processor = new StateProcessor(
        new LocalStorageClient(this.params)
    )
  }

  async getRoot() {
    const initialState = await this.processor.get()
    const store = createStore(rootReducer, normalizeInitialState(initialState))
    this.storeSub = store.subscribe(this.processor.watch)
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
    this.storeSub.unsubscribe()
    this.excel.destroy()
  }
}
