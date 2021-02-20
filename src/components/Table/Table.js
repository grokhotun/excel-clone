import {$} from '@/core/DOM'
import {range} from '@/core/utils'
import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/Table/table.template'
import {resizeHandler} from '@/components/Table/table.resize'
import {shouldResize, isCell} from '@/components/Table/table.functions'
import {TableSelection} from '@/components/Table/TableSelection'

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

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const target = $target.id(true)
        const current = this.selection.current.id(true)
        const colsRange = range(current.col, target.col)
        const rowRange = range(current.row, target.row)
        const ids = colsRange.reduce((acc, col) => {
          rowRange.forEach(row => acc.push(`${row}:${col}`))
          return acc
        }, [])
        const $cells = ids.map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
  }
}
