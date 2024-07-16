import { HTML, nButton } from '../../../assets/js/libs/frontend/index.js'
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
    this.addEventListener('click', () => this.onClick())
  }

  setStyles() {
    this.setContainerStyle('margin', '1rem')
    this.setStyle('padding', '1rem')
    this.setStyle('border', 'none')
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
