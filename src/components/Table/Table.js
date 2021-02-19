import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/Table/table.template'
import {resizeHandler} from '@/components/Table/table.resize'
import {shouldResize} from '@/components/Table/table.functions'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable()
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root)
    }
  }
}
