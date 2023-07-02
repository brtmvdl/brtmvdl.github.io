import { nElement } from '../../../js/nElement/index.js'

export class BodyElement extends nElement {
  constructor() {
    super({
      component: { name: 'body-el' }
    })

    this.setText('body')
  }
} 
