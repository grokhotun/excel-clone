import {isSame} from '@/core/utils'

export class StoreSubscriber {
  constructor(store) {
    this.store = store
    this.prevState = {}
    this.sub = null
  }

  subscribeComponents(components) {
    this.prevState = this.store.getState()
    this.sub = this.store.subscribe(state => {
      Object.keys(state).forEach(key => {
        if (!isSame(this.prevState[key], state[key])) {
          components.forEach(component => {
            if (component.isWatching(key)) {
              const changes = {[key]: state[key]}
              component.storeChanged(changes)
            }
          })
        }
      })
      this.prevState = this.store.getState()
    })
  }
  unsubscribeComponents() {
    this.sub.unsubscribe()
  }
}
