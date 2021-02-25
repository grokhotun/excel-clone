export class Page {
  constructor(params) {
    this.params = params || Date.now().toString()
  }

  getRoot() {
    throw new Error('Метод getRoot должен быть определен!')
  }

  afterMounted() {}

  destroy() {}
}
