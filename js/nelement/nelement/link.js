import { nElement } from './nElement.js'

export class nLink extends nElement {
  getName() {
    return 'link'
  }

  getTagName() {
    return 'a'
  }

  onCreate() {
    this.setStyles()
  }

  setStyles() {
    this.setStyle('color', 'inherit')
    this.setStyle('text-decoration', 'none')
  }

  href(value = '') {
    this.element.href = value
    return this
  }

}
