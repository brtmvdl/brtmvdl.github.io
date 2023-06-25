import { nElement } from '../index.js'

export class nError extends nElement {
  constructor() {
    super({
      component: { name: 'error' },
    })

    this.setStyle('color', 'red')
    this.setStyle('padding-top', '0.5rem')
    this.setStyle('padding-botton', '0.5rem')
  }
}
