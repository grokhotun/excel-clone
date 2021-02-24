import {createStore} from './createStore'

const initialState = {
  count: 0,
}

const reducer = (state = initialState, action) => {
  if (action.type === 'ADD') {
    return {
      ...state,
      count: state.count + 1
    }
  }
  return state
}

describe('createStore', () => {
  let store
  let handler
  beforeEach(() => {
    store = createStore(reducer, initialState)
    handler = jest.fn()
  })
  test('should return store object', () => {
    expect(store.dispatch).toBeDefined()
    expect(store.subscribe).toBeDefined()
    expect(store.getState).not.toBeUndefined()
  })

  test('should return object as state', () => {
    expect(store.getState).toBeInstanceOf(Object)
  })

  test('should return default state', () => {
    expect(store.getState()).toEqual(initialState)
  })

  test('should change state if action exits', () => {
    store.dispatch({type: 'ADD'})
    expect(store.getState().count).toBe(1)
  })

  test('should NOT change state if action doesnt exits', () => {
    store.dispatch({type: 'RANDOM_ACTION'})
    expect(store.getState().count).toBe(0)
  })

  test('should call subsriber', () => {
    store.subscribe(handler)
    store.dispatch({type: 'ADD'})
    expect(handler).toHaveBeenCalled()
    expect(handler).toHaveBeenCalledWith(store.getState())
  })

  test('should not call sub if unsubscribe', () => {
    const unsub = store.subscribe(handler)
    unsub.unsubscribe()
    store.dispatch({type: 'ADD'})
    expect(handler).not.toHaveBeenCalled()
  })

  test('should dispatch in async await', () => {
    return new Promise(resolve => {
      setTimeout(() => {
        store.dispatch({type: 'ADD'})
      }, 500)

      setTimeout(() => {
        expect(store.getState().count).toBe(1)
        resolve()
      }, 1000)
    })
  })
})
