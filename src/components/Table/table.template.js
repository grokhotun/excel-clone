import {defaultStyles} from '@/constants'
import {parse} from '@/core/parse'
import {stylesStringify} from '@/core/utils'
/*
  Константы codechar букв от A до Z
*/
const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state = {}, idx) {
  return (state[idx] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state = {}, idx) {
  return (state[idx] || DEFAULT_HEIGHT) + 'px'
}

function withWidth(state) {
  return function(col, idx) {
    return {
      col, idx, width: getWidth(state.colState, idx)
    }
  }
}

/*
  Функция создания строчек
*/
function createRow(idx, content, rowState) {
  const resize = idx ? '<div class="row-resize" data-resize="row"></div>': ''
  const indexContent = idx ? idx : ''
  const height = getHeight(rowState, idx)
  return `
    <div
      class="row"
      data-type="resizable"
      data-row="${idx}"
      style="height: ${height} ">
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
function toColumn({col, idx, width}) {
  return `
    <div
      class="column"
      data-type="resizable"
      data-col="${idx}"
      style="width: ${width}">
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
function toCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`
    const width = getWidth(state.colState, col)
    const content = state.dataState[id] || ''
    const styles = stylesStringify({
      ...defaultStyles,
      ...state.stylesState[id]
    })
    return `
      <div
        contenteditable
        class="cell"
        data-col="${col}"
        data-id="${id}"
        data-value="${content}"
        style="${styles}; width: ${width}">
        ${parse(content)}
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
export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map((_, idx) => toChar(_, idx))
      .map(withWidth(state))
      .map((element, idx) => toColumn(element, idx))
      // .map((element, idx) => {
      //   const width = getWidth(state.colState, idx)
      //   return toColumn(element, idx, width)
      // })
      .join('')

  rows.push(createRow(null, cols, {} ))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('')

    rows.push(createRow(row + 1, cells, state.rowState))
  }

  return rows.join('')
}
