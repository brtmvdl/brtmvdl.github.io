import { nElement } from '../index.js'

export class nHR extends nElement {
  constructor() {
    super({
      element: { tagName: 'hr' },
      component: { name: 'hr' }
    })

    this.setStyle('border-bottom', '1px solid #000000')
    this.setStyle('margin', '1rem 0rem 0rem')
  }
}
