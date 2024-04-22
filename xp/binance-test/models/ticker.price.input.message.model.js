import { InputMessageModel } from './input.message.model.js'

export class TickerPriceInputMessageModel extends InputMessageModel {
  constructor(symbol = 'bnbbrl') {
    super('ticker.price', { input: { symbol } })
  }
}
