import { HTML } from '../index.js'

export class nFlex extends HTML {
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
