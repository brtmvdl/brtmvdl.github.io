import { HTML } from './html.js'

export class nImage extends HTML {
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
    return this
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
