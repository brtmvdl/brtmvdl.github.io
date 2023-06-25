
export class nElement {
  container = document.createElement('div')
  element = document.createElement('div')

  options = {
    element: {
      tagName: 'div',
    },
    container: {
      tagName: 'div',
      append: true,
    },
    component: {
      name: 'component',
    }
  }

  constructor(options) {
    this.options = {
      ...this.options,
      ...options,
    }

    this.build()
  }

  build() {
    if (this.options.element.tagName) {
      this.element = document.createElement(this.options.element.tagName)
    }

    if (this.options.container.tagName) {
      this.container = document.createElement(this.options.container.tagName)
    }

    if (this.options.component.name) {
      this.element.classList.add(`el-${this.options.component.name}`)
      this.container.classList.add(`ct-${this.options.component.name}`)
    }

    this.setStyle('margin', '0')
    this.setStyle('padding', '0')
    this.setStyle('outline', 'none')
    this.setStyle('border', 'none')
    this.setStyle('box-sizing', 'border-box')
  }

  static fromElement(el = document.createElement('')) {
    const component = new nElement()
    component.element = el
    return component
  }

  static fromId(id) {
    return nElement.fromElement(document.getElementById(id))
  }

  addContainerClass(value) {
    this.container.classList.add(value)
    return this
  }

  addClass(value) {
    this.element.classList.add(value)
    return this
  }

  removeClass(value) {
    this.element.classList.remove(value)
    return this
  }

  toggleClass(value) {
    if (this.element.classList.contains(value)) {
      this.removeClass(value)
    } else {
      this.addClass(value)
    }

    return this
  }

  setId(value = '') {
    this.element.id = value

    return this
  }

  setContainerStyle(name, value) {
    this.container.style[name] = value
    return this
  }

  getContainerStyle(name) {
    return this.container.style[name]
  }

  setStyle(name, value) {
    this.element.style[name] = value
    return this
  }

  getStyle(name) {
    return this.element.style[name]
  }

  setAttr(name, value) {
    this.element.setAttribute(name, value)
    return this
  }

  getAttr(name) {
    return this.element.getAttribute(name)
  }

  setText(value) {
    this.element.innerText = value
    return this
  }

  getText() {
    return this.element.innerText
  }

  dispatchEvent(key, value = {}) {
    const ev = new Event(key)
    Object.keys(value).map((_key) => ev[_key] = value[_key])
    this.element.dispatchEvent(ev)

    return this
  }

  on(name, value) {
    this.element.addEventListener(name, value.bind(this))
    return this
  }

  once(name, value) {
    this.element.addEventListener(name, value.bind(this), { once: true })
    return this
  }

  setData(name, value) {
    this.element.dataset[name] = value
    return this
  }

  getData(name) {
    return this.element.dataset[name]
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

  append(el = new nElement()) {
    this.element.append(el.render())
    return this
  }

  render() {
    if (this.options.container.append) {
      this.container.append(this.element)
      return this.container
    } else {
      return this.element
    }
  }
}

export class Valuable extends nElement {
  maxlength = undefined

  setMaxLength(value) {
    this.element.maxlength = this.maxlength = value
    return this
  }

  setName(value) {
    this.element.name = value
    return this
  }

  getName() {
    return this.element.name || ''
  }

  getValue() {
    return this.element.value
  }

  setValue(value) {
    this.element.value = value
    return this
  }

  setPlaceholder(value) {
    this.element.placeholder = value
    return this
  }

  getPlaceholder() {
    return this.element.placeholder || ''
  }

  focus() {
    this.element.focus()
    return this
  }

}
