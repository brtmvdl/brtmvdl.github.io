import { nElement } from '../index.js'

export class nButton extends nElement {
  constructor() {
    super({
      element: { tagName: 'button' },
      component: { name: 'button' },
    })

    this.setStyle('border', 'none')
    this.setStyle('font', 'inherit')
    this.setStyle('outline', 'none')
    this.setStyle('padding', '1rem')
    this.setStyle('cursor', 'pointer')
    this.setStyle('font-weight', 'bold')
  }
}
