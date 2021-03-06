import {$} from '@/core/DOM'
import {range, nextSelector} from '@/core/utils'
import {ExcelComponent} from '@/core/ExcelComponent'
import {createTable} from '@/components/Table/table.template'
import {resizeHandler} from '@/components/Table/table.resize'
import {shouldResize, isCell} from '@/components/Table/table.functions'
import {TableSelection} from '@/components/Table/TableSelection'
import * as actions from '@/redux/actions'
import {defaultStyles} from '@/constants'
import {parse} from '@/core/parse'

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
    return createTable(15, this.$state())
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)
    this.$on('formula:input', text => {
      this.selection.current
          .attr('data-value', text)
          .text(parse(text))
      this.updateTextInStore(text)
    })
    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value)
      this.$dispatch(actions.applyStyle({
        value: value,
        ids: this.selection.selectedIds
      }))
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
  }

  async resizeTable(event, $root) {
    const data = await resizeHandler(event, $root)
    this.$dispatch({type: 'TABLE_RESIZE', data})
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event, this.$root)
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
        this.selectCell($target)
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

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  onInput(event) {
    const text = $(event.target).text()
    this.selection.current.attr('data-value', text).text(parse(text))
    this.updateTextInStore(text)
  }
}
