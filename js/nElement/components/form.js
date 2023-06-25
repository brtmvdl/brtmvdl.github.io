import { nElement } from '../index.js'

export class nForm extends nElement {
  constructor() {
    super({
      element: { tagName: 'form' },
      component: { name: 'form' }
    })
  }

  setAction(value = '?#') {
    this.element.action = value
    return this
  }

  getAction() {
    return this.element.action || ''
  }
}
