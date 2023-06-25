import { Valuable } from '../index.js'

export class nInputText extends Valuable {
  constructor() {
    super({
      component: { name: 'input-text' },
      element: { tagName: 'input' }
    })

    this.setAttr('type', 'text')

    this.setContainerStyle('display', 'inline-block')
    this.setContainerStyle('width', '100%')

    this.setStyle('font', 'inherit')
    this.setStyle('padding', '0.5rem 0rem')
    this.setStyle('width', '100%')
  }
}