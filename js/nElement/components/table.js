import { nElement } from '../index.js'

export class nTable extends nElement {
  thead = new nThead()
  tbody = new nTbody()

  constructor() {
    super({
      element: { tagName: 'table' },
      component: { name: 'table' }
    })

    this.append(this.thead)
    this.append(this.tbody)
  }

  addInHead(element = new nElement) {
    this.thead.append(element)
    return this
  }

  addInHead(element = new nElement) {
    this.tbody.append(element)
    return this
  }
}

