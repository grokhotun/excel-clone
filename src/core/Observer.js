export class Observer {
  constructor() {
    this.subscribers = {}
  }

  /*
    Метод для уведомления слушателей если они есть
  */
  dispatch(action = '', payload) {
    if (Array.isArray(this.subscribers[action])) {
      this.subscribers[action].forEach(listener => {
        listener(payload)
      })
    }
  }

  /*
    Метод для подписки на события
  */
  subscribe(action, func) {
    this.subscribers[action] = this.subscribers[action] || []
    this.subscribers[action].push(func)
    return () => {
      this.subscribers[action] =
        this.subscribers[action].filter(listener => listener !== func)
    }
  }
}
