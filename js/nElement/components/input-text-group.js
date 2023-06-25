import { nGroup } from './group.js'

export class nInputTextGroup extends nGroup {
  constructor() {
    super({
      component: { name: 'input-text-group' }
    })

    const id = Date.now()

    this.label.setAttr('for', id)
    this.append(this.label)

    this.input.setAttr('id', id)
    this.append(this.input)

    this.append(this.error)
  }
}
