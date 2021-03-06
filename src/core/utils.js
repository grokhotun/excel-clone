export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`
}

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end]
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, idx) => start + idx)
}

export function nextSelector(key, {col, row}) {
  /*
    Константы для того чтобы если будет
    попытка перемести ячейку выше или левее
    границы таблицы, то ставим значение константы
  */
  const MIN_VALUE = 0
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break

    case 'Tab':
    case 'ArrowRight':
      col++
      break

    case 'ArrowLeft':
      col = col -1 < MIN_VALUE ? MIN_VALUE : col - 1
      break

    case 'ArrowUp':
      row = row -1 < MIN_VALUE ? MIN_VALUE : row - 1
      break

    default:
      break
  }

  return `[data-id="${row}:${col}"]`
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export function isSame(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    /*
      Небольшой костыль для сравнения двух сложных объектов
    */
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}

export function camelToDashCase(str) {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function stylesStringify(styles = {}) {
  return Object.keys(styles)
      .map(key => `${camelToDashCase(key)}: ${styles[key]}`)
      .join(';')
}

export function debouncer(func, timeout = 200) {
  let isDebouncing
  return function(...args) {
    const later = () => {
      clearTimeout(isDebouncing)
      func(...args)
    }
    clearTimeout(isDebouncing)
    isDebouncing = setTimeout(later, timeout)
  }
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}
