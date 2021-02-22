import {$} from '@/core/DOM'
import {range, nextSelector} from '@/core/utils'
import {ExcelComponent} from '@/core/ExcelComponent'
import {createTable} from '@/components/Table/table.template'
import {resizeHandler} from '@/components/Table/table.resize'
import {shouldResize, isCell} from '@/components/Table/table.functions'
import {TableSelection} from '@/components/Table/TableSelection'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
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
    this.selectCell($cell)
    this.$subscribe('formula:input', text => {
      this.selection.current.text(text)
    })
    this.$subscribe('formula:done', () => {
      this.selection.current.focus()
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$dispatch('table:select', $cell)
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

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown'
    ]
    const {key} = event
    /*
      Если нажата одна из клавиш и не нажат шифт
      отменяет действие по умолчанию, получаем
      нужную ячейку, кидаем на нее фокус и выделяем цветом
    */
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  onInput(event) {
    this.$dispatch('table:input', $(event.target))
  }
}
