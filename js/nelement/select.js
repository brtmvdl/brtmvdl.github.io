import { nInput } from './input.js'
import { nOption } from './option.js'

export class nSelect extends nInput {
  getName() {
    return 'select'
  }

  getTagName() {
    return 'select'
  }

  addOption(key, value = '') {
    const option = new nOption()
    option.setValue(key)
    option.setText(value)
    this.append(option)

    return this
  }
}
