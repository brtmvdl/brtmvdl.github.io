import { nImage } from './image.js'

export class nSvg extends nImage {
  getName() {
    return 'svg'
  }

  getTagName() {
    return 'svg'
  }

  href(value = '') {
    this.element.href = value
    return this
  }
}
