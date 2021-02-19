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
  const resize = idx ? '<div class="row-resize" data-resize="row"></div>': ''
  const indexContent = idx ? idx : ''
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${indexContent}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

/*
  Функция создания колонок
*/
function toColumn(col, idx) {
  return `
    <div class="column" data-type="resizable" data-col="${idx}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

/*
  Функция создания ячеек
*/
function toCell(_, idx) {
  return `
    <div class="cell" data-col="${idx}" contenteditable></div>
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
      .map((element, idx) => toColumn(element, idx))
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
