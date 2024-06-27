import { Model } from '../../../assets/js/models/model.js'

export class OrderModel extends Model {
  side = null
  symbol = null
  type = 'MARKET'
  quoteOrderQty = 0
  timestamp = Date.now()

  constructor(side, symbol, quoteOrderQty = 100) {
    super()
    this.side = side
    this.symbol = symbol
    this.quoteOrderQty = quoteOrderQty
  }

  get signature() {
    return ''
  }

  toJSON() {
    const { symbol, side, type, quoteOrderQty, timestamp, signature } = this
    return { symbol, side, type, quoteOrderQty, timestamp, signature }
  }
}
