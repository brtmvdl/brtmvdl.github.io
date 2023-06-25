import { nElement } from '../index.js'

export class nLabel extends nElement {
  constructor() {
    super({
      component: { name: 'label' },
    })

    this.setStyle('margin-bottom', '0.5rem')
    this.setStyle('padding-top', '0.5rem')
    this.setStyle('padding-botton', '0.5rem')
  }
}
