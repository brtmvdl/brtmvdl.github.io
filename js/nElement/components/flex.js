import { nElement } from '../index.js'

export class nFlex extends nElement {

  constructor() {
    super({
      component: { name: 'flex' },
    })

    this.setStyle('display', 'flex')
    this.setStyle('justify-content', 'space-between')
  }

  flexWrap(wrap = 'wrap') {
    this.setStyle('flex-wrap', wrap)

    return this
  }
}
