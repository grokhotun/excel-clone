import {$} from '@/core/DOM'

export function resizeHandler(event, $root) {
  return new Promise(resolve => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    const sideProp = type === 'col' ? 'bottom' : 'right'
    let value = 0

    $resizer.css({
      opacity: 1,
      [sideProp]: '-5000px'
    })

    document.onmousemove = e => {
      if (type === 'col') {
        const delta = e.pageX - coords.right
        value = coords.width + delta
        $resizer.css({
          right: `${-delta}px`
        })
      } else {
        const delta = e.pageY - coords.bottom
        value = coords.height + delta
        $resizer.css({
          bottom: `${-delta}px`
        })
      }
    }

    document.onmouseup = () => {
      document.onmouseup = null
      document.onmousemove = null
      if (type === 'col') {
        $parent.css({width: `${value}px`})
        $root.findAll(`[data-col="${$parent.data.col}"]`).forEach(el => (el.style.width = `${value}px`))
      } else {
        $parent.css({height: `${value}px`})
        $root.findAll(`[data-row="${$parent.data.row}"]`).forEach(el => (el.style.height = `${value}px`))
      }

      resolve({
        value,
        type,
        // id: type === 'col' ? $parent.data.col : $parent.data.row
        id: $parent.data[type]
      })

      $resizer.css({
        opacity: 0,
        right: 0,
        bottom: 0
      })
    }
  })
}
