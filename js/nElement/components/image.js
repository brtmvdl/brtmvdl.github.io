import { nElement } from '../index.js'

export class nImage extends nElement {
  constructor() {
    super({
      element: { tagName: 'img' },
      component: { name: 'image' }
    })

    this.setStyle('width', '100%')

    this.alt()
  }

  src(value) {
    this.element.src = value

    return this
  }

  alt(value = 'image') {
    this.element.alt = value

    return this
  }
}
