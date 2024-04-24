
export class Sell {
  buy = null
  pair = null
  datetime = null

  constructor(buy, pair = new Pair()) {
    this.buy = buy
    this.pair = pair
    this.datetime = Date.now()
  }
}
