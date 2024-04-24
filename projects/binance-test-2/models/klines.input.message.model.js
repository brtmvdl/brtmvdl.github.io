import { InputMessageModel } from './input.message.model.js'

export class KlinesInputMessageModel extends InputMessageModel {
  constructor(symbol, interval = '1s', limit = 10) {
    super('klines', { input: { symbol, interval, limit } })
  }
}
