import {$} from '@/core/DOM';
import {ExcelComponent} from '@/core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
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
    this.$on('table:select', $cell => {
      this.$formula.text($cell.text())
    })
    // this.$on('table:input', $cell => {
    //   this.$formula.text($cell.text())
    // })
    // this.$subscribe(state => {
    //   console.log('Formula is update', state.currentText)
    //   this.$formula.text(state.currentText)
    // })
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
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
      this.$emit('formula:done')
    }
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText)
  }
}
