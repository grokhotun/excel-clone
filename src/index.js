// import {Excel} from '@/components/Excel/Excel'
// import {Header} from '@/components/Header/Header'
// import {Toolbar} from '@/components/Toolbar/Toolbar'
// import {Table} from '@/components/Table/Table'
// import {Formula} from '@/components/Formula/Formula'
// import {createStore} from '@/core/crateStore'
// import {rootReducer} from '@/redux/rootReducer'
// import {initialState} from '@/redux/initialState'
// import {debouncer, storage} from '@/core/utils'
import {Router} from '@/core/router/Router'
import {DashboardPage} from '@/pages/DashboardPage'
import {ExcelPage} from '@/pages/ExcelPage'
import '@/scss/index.scss'

new Router('#root', {
  dashboard: DashboardPage,
  excel: ExcelPage
})
