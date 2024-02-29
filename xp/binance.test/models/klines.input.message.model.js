import { InputMessageModel } from './input.message.model.js'

export class KlinesInputMessageModel extends InputMessageModel {
  constructor(symbol = 'bnbbrl', interval = '1m', startTime = Date.now() - (1000 * 60 * 20), limit = 20) {
    super('klines', { input: { symbol, interval, startTime, limit } })
  }
}
