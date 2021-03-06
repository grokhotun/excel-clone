import {storage} from '@/core/utils'

export function toHtml(key) {
  const model = storage(key)
  const id = key.split(':')[1]
  return `
    <li class="db__record">
      <a href="#excel/${id}">${model.title}</a>
      <strong>
        ${new Date(model.createdDate).toLocaleDateString()}
        ${new Date(model.createdDate).toLocaleTimeString()}
      </strong>
    </li>
  `
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}


export function createRecordsTable() {
  const keys = getAllKeys()
  if (!keys.length) {
    return `<div class="db__empty">У вас нет ни одной таблицы</div>`
  }
  return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата редактирования</span>
    </div>

    <ul class="db__list">
      ${keys.map(toHtml).join('')}
    </ul>
  `
}
