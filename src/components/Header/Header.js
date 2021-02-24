import {defaultTitle} from '@/constants';
import {$} from '@/core/DOM';
import {ExcelComponent} from '@/core/ExcelComponent';
import {ActiveRoute} from '@/core/router/ActiveRoute';
import {changeTitle} from '@/redux/actions';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
      <input type="text" class="input" value="${title}" />
      <div>
        <div class="button" data-button="remove">
          <i class="material-icons" data-button="remove">delete</i>
        </div>
        <div class="button" data-button="exit">
          <i class="material-icons" data-button="exit">exit_to_app</i>
        </div>
      </div>
    `
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.button === 'remove') {
      const confirmation = confirm('Вы точно хотите удалить данную таблицу?')
      if (confirmation) {
        localStorage.removeItem(`excel-state:${ActiveRoute.params}`)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }
}
