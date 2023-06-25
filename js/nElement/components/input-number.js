import { Valuable } from '../index.js'

export class nInputNumber extends Valuable {
  constructor() {
    super({
      component: { name: 'input-number' },
      element: { tagName: 'input' }
    })

    this.setAttr('type', 'number')
    this.setStyle('font', 'inherit')
    this.setStyle('padding', '0.5rem')
  }
}
