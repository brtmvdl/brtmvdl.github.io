import { nElement } from '../index.js'

export class nCenter extends nElement {
  constructor() {
    super({ component: { name: 'center' } })

    this.setStyle('margin', '0 auto')
    this.setStyle('width', '42rem')
  }
}
