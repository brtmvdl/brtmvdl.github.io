import { HTML } from './html.js'

export class nLink extends HTML {
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
    this.setStyle('text-decoration', 'none')
  }

  href(value = '') {
    this.element.href = value
    return this
  }

}
