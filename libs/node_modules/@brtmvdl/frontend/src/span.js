import { HTML } from './html.js'

export class nSpan extends HTML {
  getName() {
    return 'span'
  }

  getTagName() {
    return 'span'
  }

  hasContainer() {
    return false
  }
}
