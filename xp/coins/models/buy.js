import { Coin } from './coin.js'
import { Pair } from './pair.js'

export class Buy {
  coin = null
  pair = null
  datetime = null

  constructor(coin = new Coin(), pair = new Pair()) {
    this.coin = coin
    this.pair = pair
    this.datetime = Date.now()
  }
}
