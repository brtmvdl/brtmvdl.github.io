import { HTML, nButton } from '@brtmvdl/frontend'
import * as Local from '../../../assets/js/utils/local.js'

export class SellButtonComponent extends nButton {
  move = null
  price = 0

  constructor(move = {}, price = 0) {
    super()
    this.move = move
    this.price = price
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.setText('Sell')
    this.on('click', () => this.onClick())
  }

  setStyles() {
    this.setStyle('', '')
  }

  onClick() {
    console.log(`sell ${this.move.buy_datetime}`)
    Local.set(['moves'], Array.from(Local.get(['moves'], [])).map((move) => {
      if (move.buy_datetime === this.move.buy_datetime) {
        move['sell_datetime'] = Date.now()
        move['sell_price'] = this.price
      }
      return move
    }))
  }
}
