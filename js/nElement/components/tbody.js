import { nElement } from '../index.js'

export class nTbody extends nElement {
  constructor() {
    super({
      container: { append: false },
      element: { tagName: 'tbody' },
      component: { name: 'tbody' }
    })
  }
}
