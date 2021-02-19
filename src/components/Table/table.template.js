/*
  Константы codechar букв от A до Z
*/
const CODES = {
  A: 65,
  Z: 90
}

/*
  Функция создания строчек
*/
function createRow(idx, content) {
  return `
    <div class="row">
      <div class="row-info">${idx ? idx : ''}</div>
      <div class="row-data">${content}</div>
    </div>
  `
}

/*
  Функция создания колонок
*/
function toColumn(col) {
  return `
    <div class="column">
      ${col}
    </div>
  `
}

/*
  Функция создания ячеек
*/
function toCell() {
  return `
    <div class="cell" contenteditable></div>
  `
}

function toChar(_, idx) {
  return String.fromCharCode(CODES.A + idx)
}

/*
  Функция создания шаблна всей таблицы
*/
export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map((_, idx) => toChar(_, idx))
      .map(element => toColumn(element))
      .join('')

  rows.push(createRow(null, cols))

  for (let idx = 0; idx < rowsCount; idx++) {
    const cells = new Array(colsCount)
        .fill('')
        .map((_, idx) => toCell(_, idx))
        .join('')
    rows.push(createRow(idx + 1, cells))
  }

  return rows.join('')
}
