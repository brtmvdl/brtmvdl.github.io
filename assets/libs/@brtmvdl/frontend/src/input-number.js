import { nInput } from './input.js'

export class nInputNumber extends nInput {
  getName() {
    return 'input-number'
  }

  onCreate() {
    this.setAttr('type', 'number')
  }
}
