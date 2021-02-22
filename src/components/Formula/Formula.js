import {$} from '@core/DOM';
import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `
  }

  init() {
    super.init()
    this.$formula = this.$root.find('#formula')
    this.$subscribe('table:select', $cell => {
      this.$formula.text($cell.text())
    })
    this.$subscribe('table:input', $cell => {
      this.$formula.text($cell.text())
    })
  }

  onInput(event) {
    this.$dispatch('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab'
    ]
    const {key} = event
    /*
      Если нажата одна из клавиш и не нажат шифт
      отменяет действие по умолчанию, получаем
      нужную ячейку, кидаем на нее фокус и выделяем цветом
    */
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      this.$dispatch('formula:done')
    }
  }
}
