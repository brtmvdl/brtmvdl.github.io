import { HTML } from './html.js'
import * as COLORS from './utils/colors.js'

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
    this.setStyle('color', COLORS.WHITE_1)
    this.setStyle('text-decoration', 'none')
  }

  href(value = '') {
    this.element.href = value
    return this
  }

}
