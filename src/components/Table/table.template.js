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
// function toCell(row, col) {
//   return `
//     <div contenteditable class="cell" data-col="${col}" data-row="${row}"></div>
//   `
// }

/*
  Функция создания ячеек с помощью замыкания
*/
function toCell(row) {
  return function(_, col) {
    return `
      <div
        contenteditable
        class="cell"
        data-col="${col}"
        data-id="${row}:${col}">
      </div>
    `
  }
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

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row))
        .join('')

    rows.push(createRow(row + 1, cells))
  }

  return rows.join('')
}
