import { nElement } from './nElement.js'

export class nSpan extends nElement {
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
