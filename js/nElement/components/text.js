import { nElement } from '../index.js'

export class nText extends nElement {
  constructor() {
    super({
      element: { tagName: 'p' },
      component: { name: 'text' },
    })
  }
}
