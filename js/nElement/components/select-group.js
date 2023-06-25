import { nGroup } from './group.js'
import {nSelect} from './select.js'

export class nSelectGroup extends nGroup {
  input = new nSelect

  constructor() {
    super({
      component: { name: 'select-group' }
    })

    this.setStyle('font', 'inherit')

    const id = Date.now()

    this.label.setAttr('for', id)
    this.append(this.label)

    this.input.setAttr('id', id)
    this.append(this.input)

    this.append(this.error)
  }
}

