import {debouncer} from '@/core/utils'

export class StateProcessor {
  constructor(client, delay = 300) {
    this.client = client
    this.watch = debouncer(this.watch.bind(this), delay)
  }

  watch(state) {
    this.client.save(state)
  }

  get() {
    return this.client.get()
  }
}
