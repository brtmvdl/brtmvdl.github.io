import { HTML, nSelect, nSpan, nButton } from '@brtmvdl/frontend'
import { DatetimeHTML, TextHTML, TitleHTML, PriceHTML, PairsSelectComponent, SpanHTML, HistoryComponent, ButtonHTML, } from './components/index.js'
import { Pair, Coin, Buy, Sell } from './models/index.js'
import { getPairsList } from './utils/lists.js'
import * as Local from './local.js'

export class Page extends HTML {
  children = {
    price: new PriceHTML(),
    datetime: new DatetimeHTML(),
    history: new HistoryComponent(),
  }

  state = {
    pair: new Pair(0, 'BTCBRL'),
    moves: [],
  }

  onCreate() {
    this.setStyles()
    this.append(this.getPairHTML())
    this.append(this.getPriceHTML())
    this.append(this.getDatetimeHTML())
    this.append(this.getBuyButtonHTML())
    this.append(this.getHistoryHTML())
    this.updatePrice()
  }

  buy(coin = new Coin(), pair = new Pair()) {
    Local.add(['move'], { buy: new Buy(coin, pair), sell: null, })
  }

  sell(buy = new Buy()) {
    const moves = Array.from(Local.get(['move'], []))

    const move_index = moves.findIndex((move) => move.buy.datetime === buy.datetime)

    if (moves[move_index]) moves[move_index].sell = new Sell(buy, this.state.pair)

    Local.set(['move'], moves)
  }

  setStyles() {
    this.setStyle('font-family', 'sans-serif')
  }

  getPairHTML() {
    const pair = new nSelect()

    getPairsList().map((pair) => pair.addOption(pair, pair))

    pair.on('change', () => this.state.pair.symbol = pair.getValue())

    return pair
  }

  getPriceHTML() {
    return this.children.price
  }

  getDatetimeHTML() {
    return this.children.datetime
  }

  getBuyButtonHTML() {
    return new ButtonHTML('Buy (BRL 100)', { 'text-align': 'center' }, () => this.buy(new Coin(100, 'BRL'), this.state.pair))
  }

  getHistoryHTML() {
    return this.children.history
  }

  getPriceValue(price = 0) {
    return (+price).toFixed(4).replace('.', ',')
  }

  updatePrice() {
    fetch(`https://api4.binance.com/api/v3/ticker/price?symbol=${this.state.pair.symbol}`)
      .then((res) => res.json())
      .then(({ price }) => this.state.pair.price = +price)
      .then(() => this.children.price.setText(this.getPriceValue(this.state.pair.price)))
      .then(() => this.children.datetime.updateDatetime())
      .then(() => this.children.history.update())
      .then(() => this.updatePrice())
      .catch((err) => {
        console.error(err)
        setTimeout(() => this.updatePrice(), 2000)
      })
  }
}
