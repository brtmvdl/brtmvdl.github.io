import { HTML } from './html.js'

export class nTd extends HTML {
  getName() {
    return 'td'
  }

  getTagName() {
    return 'td'
  }

  hasContainer() {
    return false
  }
}
