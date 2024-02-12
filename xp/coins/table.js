import { HTML } from '@brtmvdl/frontend'

import * as Local from './local.js'
import { PAIRS } from './constants.js'

import { DatetimeHTML } from './datetime.js'
import { TopHTML } from './top.js'

import { Pair } from './models/pair.js'
import { Coin } from './models/coin.js'
import { Buy } from './models/buy.js'
import { Sell } from './models/sell.js'

export class Page extends HTML {
  children = {
    datetime: new DatetimeHTML(),
  }

  state = {
    moves: [],
    pairs: PAIRS,
  }

  onCreate() {
    this.setStyles()
    this.append(new TopHTML())
    //
    this.updatePrices()
  }

  buy(coin = new Coin(), pair = new Pair()) {
    Local.add(['move'], { buy: new Buy(coin, pair), sell: null, })
  }

  sell(buy = new Buy()) {
    const moves = Array.from(Local.get(['move'], []))

    const move_index = moves.findIndex((move) => move.buy.datetime === buy.datetime)

    if (moves[move_index]) {
      moves[move_index].sell = new Sell(buy)
    }

    Local.set(['move'], moves)
  }

  getPriceURL() {
    return `https://api4.binance.com/api/v3/ticker/price?symbol=${this.state.pairs.toString()}`
  }

  updatePrices() {
    fetch(this.getPriceURL())
      .then(() => this.updateDatetime())
      .then(() => this.updateHistory())
      .then(() => this.updatePrices())
      .catch((err) => {
        console.error(err)
        setTimeout(() => this.updatePrices(), 2000)
      })
  }
}
