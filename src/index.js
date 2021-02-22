import {Excel} from '@/components/Excel/Excel'
import {Header} from '@/components/Header/Header'
import {Toolbar} from '@/components/Toolbar/Toolbar'
import {Table} from '@/components/Table/Table'
import {Formula} from '@/components/Formula/Formula'
import {createStore} from '@/core/crateStore'
import {rootReducer} from '@/redux/rootReducer'
import '@/scss/index.scss'
import {storage} from '@/core/utils'

const store = createStore(rootReducer, storage('excel-state'))

store.subscribe(state => {
  console.log('App State: ', state)
  storage('excel-state', state)
})

const options = {
  components: [Header, Formula, Toolbar, Table],
  store
}

const excel = new Excel('#root', options)

excel.render()
