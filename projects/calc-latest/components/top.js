import { nElement } from '../../../js/nElement/index.js'

import * as COLORS from '../utils/colors.js'

export class TopBar extends nElement {
  constructor() {
    super({
      component: { name: 'top-bar' }
    })

    this.setText('Calc')
    this.setStyle('padding', '1rem')
    this.setStyle('font-size', '2rem')
    this.setStyle('color', COLORS.WHITE)
    this.setStyle('text-align', 'center')
    this.setStyle('margin-bottom', '1rem')
    this.setStyle('background-color', COLORS.BLACK)
  }
}
