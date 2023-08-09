import { nElement } from './nElement.js'

export class nImage extends nElement {
  getName() {
    return 'image'
  }

  getTagName() {
    return 'img'
  }

  onCreate() {
    this.setStyles()
    return this
  }

  setStyles() {
    this.setStyle('width', '100%')
  }

  src(value = '') {
    this.element.src = value
    return this
  }

  alt(value = '') {
    this.element.alt = value
    return this
  }
}
