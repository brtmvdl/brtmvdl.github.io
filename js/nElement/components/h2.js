import { nElement } from '../index.js'

export class nH2 extends nElement {
  constructor() {
    super({
      component: { name: 'h1' },
    })

    this.setStyle('font-weight', 'bold')
    this.setStyle('font-size', '2rem')
  }
}
