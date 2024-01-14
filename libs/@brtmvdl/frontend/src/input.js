import { HTML } from './html.js'

export class nInput extends HTML {
  getName() {
    return 'input'
  }

  getTagName() {
    return 'input'
  }

  onCreate() {
    this.setStyles()
  }

  setStyles() {
    this.setStyle('outline', 'none')
  }

  setValue(value = '') {
    this.element.value = value
    return this
  }

  getValue(def = '') {
    return this.element.value || def
  }

  setPlaceholder(value = '') {
    this.element.placeholder = value
    return this
  }

  getPlaceholder(def = '') {
    return this.element.placeholder || def
  }
}
