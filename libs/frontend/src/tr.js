import { HTML } from './html.js'

export class nTr extends HTML {
  getName() {
    return 'tr'
  }

  getTagName() {
    return 'tr'
  }

  hasContainer() {
    return false
  }
}
