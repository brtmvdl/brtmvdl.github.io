import { nElement } from '../index.js'

export class nLink extends nElement {
  constructor() {
    super({
      element: { tagName: 'a' },
      component: { name: 'link' },
    })

    this.setStyle('text-decoration', 'none')
    this.setStyle('color', 'inherit')
  }

  href(href) {
    this.setAttr('href', href)
    return this
  }
}
