import { nElement } from '../../js/nelement/index.js'
import * as COLORS from '../../js/nelement/utils/colors.js'

export class Head extends nElement {

  onCreate() {
    this.setStyles()
    this.setText('Calc')
  }

  setStyles() {
    this.setStyle('background-color', COLORS.BLACK_1)
    this.setStyle('color', COLORS.WHITE_1)
    this.setStyle('text-align', 'center')
    this.setStyle('margin-bottom', '1rem')
    this.setStyle('font-size', '3rem')
    this.setStyle('padding', '1rem')
  }
}
