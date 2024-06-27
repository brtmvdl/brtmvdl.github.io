import { Model } from '../../../assets/js/models/model.js'
import { Coin } from './coin.js'
import { Pair } from './pair.js'

export class BuyModel extends Model {
  coin = null
  pair = null
  datetime = null

  constructor(coin = new Coin(), pair = new Pair()) {
    this.coin = coin
    this.pair = pair
    this.datetime = Date.now()
  }
}
