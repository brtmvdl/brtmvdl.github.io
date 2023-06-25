import { nGroup } from './group.js'
import { nCounter } from './counter.js'

export class nCounterGroup extends nGroup {
  input = new nCounter

  constructor() {
    super({
      component: { name: 'counter-group' }
    })

    this.append(this.label)

    this.append(this.input)

    this.append(this.error)
  }

  getValue() {
    return this.input.getValue()
  }

}
