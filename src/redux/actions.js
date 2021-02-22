import {TABLE_RESIZE} from '@/redux/types.js'

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data
  }
}
