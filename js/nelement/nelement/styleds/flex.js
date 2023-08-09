import { nElement } from '../index.js'

export class nFlex extends nElement {
  getName() {
    return 'flex'
  }

  onCreate() {
    this.setStyles()
    this.spaceBetween()
  }

  setStyles() {
    this.setStyle('display', 'flex')
  }

  spaceBetween() {
    return this.setStyle('justify-content', 'space-between')
  }

}
