
export class HTML {
  container = document.createElement('div')
  element = document.createElement('div')

  constructor() {
    // element
    this.element = document.createElement(this.getTagName())
    this.element.classList.add(`el-${this.getName()}`)

    // container
    this.container = document.createElement(this.getContainerName())
    this.container.classList.add(`ct-${this.getName()}`)

    this.on('create', () => this.onCreate())
  }

  onCreate() { }

  static fromElement(el = document.createElement('')) {
    const component = new HTML()
    component.element = el
    return component
  }

  static fromId(id) {
    return HTML.fromElement(document.getElementById(id))
  }

  getName() {
    return 'element'
  }

  getTagName() {
    return 'div'
  }

  getContainerName() {
    return 'div'
  }

  hasContainer() {
    return true
  }

  addContainerClass(value = '') {
    this.container.classList.add(value)
    return this
  }

  addClass(value = '') {
    this.element.classList.add(value)
    return this
  }

  removeClass(value = '') {
    this.element.classList.remove(value)
    return this
  }

  toggleClass(value = '') {
    return this.element.classList.contains(value)
      ? this.removeClass(value)
      : this.addClass(value)
  }

  hide() {
    const displayStyle = this.getStyle('display')
    this.setData('display', displayStyle)
    this.setStyle('display', 'none')
    return this
  }

  show() {
    const displayData = this.getData('display', 'inline-block')
    this.setStyle('display', displayData)
    this.setData('display', displayData)
    return this
  }

  setId(value = '') {
    this.element.id = value
    return this
  }

  setContainerStyle(key, value = '') {
    this.container.style[key] = value
    return this
  }

  getContainerStyle(key) {
    return this.container.style[key]
  }

  setStyle(key, value = '') {
    this.element.style[key] = value
    return this
  }

  getStyle(key, def = '') {
    return this.element.style[key] || def
  }

  setAttr(key, value = '') {
    this.element.setAttribute(key, value)
    return this
  }

  getAttr(key, def = '') {
    return this.element.getAttribute(key) || def
  }

  setText(value = '') {
    this.element.innerText = value
    return this
  }

  getText(def = null) {
    return this.element.innerText || def
  }

  select() {
    this.element.select()
    return this
  }

  on(key, value = (() => { })) {
    this.element.addEventListener(key, value.bind(this))
    return this
  }

  once(key, value = (() => { })) {
    this.element.addEventListener(key, value.bind(this), { once: true })
    return this
  }

  dispatch(ev = new Event('')) {
    this.element.dispatchEvent(ev)
    return this
  }

  dispatchEvent(key, value = {}) {
    const ev = new Event(key)
    ev.value = value
    return this.dispatch(ev)
  }

  setData(key, value = '') {
    this.element.dataset[key] = value
    return this
  }

  getData(key, def = '') {
    return this.element.dataset[key] || def
  }

  clear() {
    while (this.element.children.length > 0) {
      this.element.children.item(0).remove()
    }

    return this
  }

  addData(key, value = '') {
    this.element.dataset[key] = value
    return this
  }

  append(el = new HTML()) {
    el.dispatchEvent('create')

    this.element.append(el.render())
    return this
  }

  render() {
    if (this.hasContainer()) {
      this.container.append(this.element)
      return this.container
    }

    return this.element
  }
}
