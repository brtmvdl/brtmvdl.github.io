import { nElement } from '../../../js/nElement/index.js'
import * as COLORS from '../../../libs/colors.js'

export class HeadComponent extends nElement {
  getName() {
    return 'head-component'
  }

  onCreate() {
    this.setText('CALC')

    this.setStyle('background-color', COLORS.BLACK_1)
    this.setStyle('color', COLORS.WHITE_1)
    this.setStyle('margin-bottom', '1rem')
    this.setStyle('text-align', 'center')
    this.setStyle('padding', '1rem')
  }
}