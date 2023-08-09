import { nInput } from './input.js'

export class nOption extends nInput {
  getName() {
    return 'option'
  }

  getTagName() {
    return 'option'
  }

  hasContainer() {
    return false
  }
}
