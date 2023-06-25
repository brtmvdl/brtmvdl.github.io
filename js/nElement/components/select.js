import { Valuable } from '../index.js'
import { nOption } from './option.js'

export class nSelect extends Valuable {
  constructor() {
    super({
      element: { tagName: 'select' },
      component: { name: 'select' }
    })

    this.setStyle('font', 'inherit')
  }

  addOption(key, value = '') {
    const options = new nOption()
    options.setValue(key)
    options.setText(value)
    return this.append(options)
  }
}

