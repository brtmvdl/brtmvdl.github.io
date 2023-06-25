import { nElement } from '../index.js'

export class nTd extends nElement {
  constructor() {
    super({
      container: { append: false },
      element: { tagName: 'td' },
      component: { name: 'td' }
    })
  }
}
