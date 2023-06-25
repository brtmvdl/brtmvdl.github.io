import { nElement } from '../index.js'

export class nThead extends nElement {
  constructor() {
    super({
      container: { append: false },
      element: { tagName: 'thead' },
      component: { name: 'thead' }
    })
  }
}
