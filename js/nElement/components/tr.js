import { nElement } from '../index.js'

export class nTr extends nElement {
  constructor() {
    super({
      container: { append: false },
      element: { tagName: 'tr' },
      component: { name: 'tr' }
    })
  }
}
