export class TableSelection {
  static className = 'selected'
  constructor() {
    this.group = []
    this.current = null
  }

  get selectedIds() {
    return this.group.map($el => $el.id())
  }

  /*
    $element является сущностью
    класса DOM
  */
  select($element) {
    this.clear()
    $element.focus().addClass(TableSelection.className)
    this.group.push($element)
    this.current = $element
  }

  selectGroup($group) {
    this.clear()
    this.group = $group
    this.group.forEach($el => $el.addClass(TableSelection.className))
  }

  clear() {
    this.group.map($element => $element.removeClass(TableSelection.className))
    this.group = []
  }

  applyStyle(style) {
    this.group.forEach($element => $element.css(style))
  }
}
