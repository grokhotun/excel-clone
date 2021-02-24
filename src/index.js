import {Excel} from '@/components/Excel/Excel'
import {Header} from '@/components/Header/Header'
import {Toolbar} from '@/components/Toolbar/Toolbar'
import {Table} from '@/components/Table/Table'
import {Formula} from '@/components/Formula/Formula'
import {createStore} from '@/core/crateStore'
import {rootReducer} from '@/redux/rootReducer'
import {initialState} from '@/redux/initialState'
import {debouncer, storage} from '@/core/utils'
import '@/scss/index.scss'

const store = createStore(rootReducer, initialState)

const stateListener = debouncer(state => {
  console.log('App State: ', state)
  storage('excel-state', state)
}, 500)

store.subscribe(stateListener)

const options = {
  components: [Header, Formula, Toolbar, Table],
  store
}

const excel = new Excel('#root', options)

excel.render()
