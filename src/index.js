import {Excel} from '@/components/Excel/Excel'
import {Header} from '@/components/Header/Header'
import {Toolbar} from '@/components/Toolbar/Toolbar'
import {Table} from '@/components/Table/Table'
import {Formula} from '@/components/Formula/Formula'
import '@/scss/index.scss'


const options = {
  components: [Header, Formula, Toolbar, Table]
}

const excel = new Excel('#root', options)

excel.render()
