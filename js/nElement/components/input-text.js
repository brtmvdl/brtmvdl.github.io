import { Valuable } from '../index.js'

export class nInputText extends Valuable {
  constructor() {
    super({
      component: { name: 'input-text' },
      element: { tagName: 'input' }
    })

    this.setAttr('type', 'text')
    this.setStyle('font', 'inherit')
    this.setStyle('padding', '0.5rem')
  }
}