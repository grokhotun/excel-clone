export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({...initialState}, {type: '__INIT__'})
  let subscribers = []
  return {
    subscribe(func) {
      subscribers.push(func)
      return {
        unsubscsribe() {
          subscribers = subscribers.filter(subscriber => subscriber !== func)
        }
      }
    },
    dispatch(action) {
      state = rootReducer(state, action)
      subscribers.forEach(subscriber => subscriber(state))
    },
    getState() {
      return state
    }
  }
}
