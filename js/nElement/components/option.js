import { Valuable } from '../index.js'

export class nOption extends Valuable {
  constructor() {
    super({
      container: { append: false },
      element: { tagName: 'option' },
      component: { name: 'option' }
    })

    this.setStyle('font', 'inherit')
  }
}
