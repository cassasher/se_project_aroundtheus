export default class section {
  constructor({ items, renders }, containerSelector) {
    this._items = items;
    this.renders = renders;
    this.container = document.querySelector(containerSelector);
  }

  renderItems() {
    this.items.forEach(this._renders);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
