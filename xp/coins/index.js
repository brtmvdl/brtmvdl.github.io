import { HTML, nSelect, nSpan, nButton } from '@brtmvdl/frontend'
import { Pair, Coin, Buy, Sell } from './models/index.js'
import { DatetimeHTML } from './components/index.js'
import * as UTILS from './utils/str.js'
import * as Local from './local.js'
import { CLOCK } from './constants.js'

export class Page extends HTML {
  children = {
    pair: new nSelect(),
    price: new HTML(),
    datetime: new DatetimeHTML(),
    buy_button: new nButton(),
    history: new HTML(),
  }

  state = {
    pair: new Pair(0, 'BTCBRL'),
    order: 'desc',
    moves: [],
    pairs: [
      ['BTC', 'BRL'],
      ['USDT', 'BRL'],
      ['ETH', 'BRL'],
      ['XRP', 'BRL'],
      ['BNB', 'BRL'],
      ['MATIC', 'BRL'],
      ['SOL', 'BRL'],
      ['LINK', 'BRL'],
      ['LTC', 'BRL'],
      ['AVAX', 'BRL'],
      ['DOGE', 'BRL'],
      ['ADA', 'BRL'],
      // ['SHIB', 'BRL'],
      ['DOT', 'BRL'],
      ['BUSD', 'BRL'],
      ['CHZ', 'BRL'],
      // ['GALA', 'BRL'],
      // ['WIN', 'BRL'],
    ],
  }

  onCreate() {
    this.setStyles()
    // this.append(new TopHTML())
    this.append(this.getPairHTML())
    this.append(this.getPriceHTML())
    this.append(this.getDatetimeHTML())
    this.append(this.getBuyButtonHTML())
    this.append(this.getHistoryHTML())
    //
    this.updatePrice()
  }

  createDatetimeText(now = Date.now()) {
    const datetime = new Date(now)

    const date = [
      datetime.getFullYear(),
      datetime.getMonth() + 1,
      datetime.getDate(),
    ].map((text) => UTILS.padLeft(text, 2, '0')).join('-')

    const time = [
      datetime.getHours(),
      datetime.getMinutes(),
      datetime.getSeconds(),
    ].map((text) => UTILS.padLeft(text, 2, '0')).join(':')

    return this.createText(`${date} ${time}`)
  }

  buy(coin = new Coin(), pair = new Pair()) {
    Local.add(['move'], { buy: new Buy(coin, pair), sell: null, })
  }

  sell(buy = new Buy()) {
    const moves = Array.from(Local.get(['move'], []))

    const move_index = moves.findIndex((move) => move.buy.datetime === buy.datetime)

    if (moves[move_index]) {
      moves[move_index].sell = new Sell(buy, this.state.pair)
    }

    Local.set(['move'], moves)
  }

  setStyles() {
    this.setStyle('font-family', 'sans-serif')
  }

  getPairHTML() {
    this.state.pairs
      .map((pair) => pair.join(''))
      .map((pair) => this.children.pair.addOption(pair, pair))

    this.children.pair.setContainerStyle('text-align', 'center')

    this.children.pair.setStyle('background-color', '#ffffff')
    this.children.pair.setStyle('padding', 'calc(1rem / 2)')
    this.children.pair.setStyle('text-align', 'center')
    this.children.pair.setStyle('font-size', '2rem')
    this.children.pair.setStyle('border', 'none')

    this.children.pair.on('change', () => this.state.pair.symbol = this.children.pair.getValue())

    return this.children.pair
  }

  getPriceHTML() {
    this.children.price.setContainerStyle('text-align', 'center')

    this.children.price.setStyle('font-size', 'calc(3rem / 2)')
    this.children.price.setStyle('background-color', '#ffffff')
    this.children.price.setStyle('padding', 'calc(1rem / 2)')
    this.children.price.setStyle('text-align', 'center')
    this.children.price.setStyle('border', 'none')

    return this.children.price
  }

  getDatetimeHTML() {
    return this.children.datetime
  }

  getBuyButtonHTML() {
    this.children.buy_button.setText('Buy (BRL 100)')
    this.children.buy_button.setContainerStyle('text-align', 'center')
    this.children.buy_button.on('click', () => this.buy(new Coin(100, 'BRL'), this.state.pair))
    return this.children.buy_button
  }

  getHistoryHTML() {
    return this.children.history
  }

  getPriceValue(price = 0) {
    return (+price).toFixed(4).replace('.', ',')
  }

  getPriceText(price = 0, symbol = '') {
    return `${symbol} ${this.getPriceValue(+price)}`
  }

  parseDiffPrice(value = 1, latest = 1, now = 0) {
    return this.getPriceValue((value * now / latest) - value)
  }

  parseDiffDatetime(latest = 0, now = 0) {
    return Math.floor((now - latest) / 1000)
  }

  parseDatetime(time) {
    const hours = Math.floor(time / CLOCK.HOURS)
    const minutes = Math.floor((time - (hours * CLOCK.HOURS)) / CLOCK.MINUTES)
    const seconds = Math.floor((time - (hours * CLOCK.HOURS) - (minutes * CLOCK.MINUTES)) / CLOCK.SECONDS)

    return [hours, minutes, seconds].map((t) => UTILS.padLeft(t, 2, '0'))
  }

  createDiffDatetime(latest = 0, now = 0) {
    const [h, m, s] = this.parseDatetime(this.parseDiffDatetime(latest, now))

    return this.createText(`${h}h ${m}m ${s}s`)
  }

  updateDatetime() {
    this.children.datetime.updateDatetime()
  }

  createText(text = '') {
    const text_html = new HTML()
    text_html.setText(text)
    text_html.setStyle('padding', 'calc(1rem / 2)')
    return text_html
  }

  createTitle(title = '') {
    const text_html = new HTML()
    text_html.setText(title)
    text_html.setStyle('background-color', '#000000')
    text_html.setStyle('padding', 'calc(1rem / 2)')
    text_html.setStyle('color', '#ffffff')
    return text_html
  }

  updateHistory() {
    this.children.history.clear()

    const moves = Local.get(['move'], [])

    if (moves) {
      const moves_filtered = moves.filter(({ buy = new Buy(), sell = null }) => {
        return buy.pair.symbol === this.state.pair.symbol
      })

      if (moves_filtered.length === 0) return

      const history_title = new HTML()
      this.children.history.append(history_title)

      const history_title_text = new nSpan()
      history_title_text.setText('History')
      history_title_text.setStyle('font-size', '2rem')
      history_title_text.setStyle('padding', '1rem')
      history_title.append(history_title_text)

      const history_title_link = new nSpan()
      history_title_link.setText('clear')
      history_title_link.setStyle('padding-left', '1rem')
      history_title_link.on('click', () => Local.set(['move'], []))
      history_title.append(history_title_link)

      const history_order_link = new nSpan()
      history_order_link.setText(this.state.order)
      history_order_link.setStyle('padding-left', '1rem')
      history_order_link.on('click', () => history_order_link.setText(this.state.order = history_order_link.getText() === 'desc' ? 'asc' : 'desc'))
      history_title.append(history_order_link)

      moves_filtered
        .sort((a, b) => this.state.order === 'desc' ? (b.buy.datetime - a.buy.datetime) : (a.buy.datetime - b.buy.datetime))
        .map(({ buy = new Buy(), sell = null }) => {
          const html = new HTML()
          html.setStyle('margin', '1rem')
          html.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 4) #000000')

          html.append(this.createTitle('Buy'))

          html.append(this.createText(`${buy.pair.symbol} ${this.getPriceValue(buy.pair.price)}`))

          html.append(this.createText(`${buy.coin.symbol} ${this.getPriceValue(buy.coin.price)}`))

          html.append(this.createDatetimeText(buy.datetime))

          if (sell) {
            html.append(this.createTitle('Sell'))

            html.append(this.createText(`${sell.pair.symbol} ${this.getPriceValue(sell.pair.price)}`))

            html.append(this.createText(`${sell.buy.coin.symbol} ${this.getPriceValue(buy.coin.price * sell.pair.price / buy.pair.price)}`))

            html.append(this.createDatetimeText(sell.datetime))

            html.append(this.createTitle('Now'))

            html.append(this.createText(`${buy.pair.symbol} ${this.getPriceValue(sell.pair.price - buy.pair.price)}`))

            html.append(this.createText(`${buy.coin.symbol} ${this.parseDiffPrice(buy.coin.price, buy.pair.price, sell.pair.price)}`))

            html.append(this.createDiffDatetime(buy.datetime, sell.datetime))

          } else {
            html.append(this.createTitle('Now'))

            html.append(this.createText(`${buy.pair.symbol} ${this.getPriceValue(this.state.pair.price - buy.pair.price)}`))

            html.append(this.createText(`${buy.coin.symbol} ${this.parseDiffPrice(buy.coin.price, buy.pair.price, this.state.pair.price)}`))

            html.append(this.createDiffDatetime(buy.datetime, this.children.datetime.state.datetime))

            const sell_button = new nButton()
            sell_button.setText('Sell')
            sell_button.on('click', () => this.sell(buy))
            html.append(sell_button)
          }

          this.children.history.append(html)
        })
    }
  }

  updatePrice() {
    fetch(`https://api4.binance.com/api/v3/ticker/price?symbol=${this.state.pair.symbol}`)
      .then((res) => res.json())
      .then(({ price }) => this.state.pair.price = +price)
      .then(() => this.children.price.setText(this.getPriceValue(this.state.pair.price)))
      .then(() => this.updateDatetime())
      .then(() => this.updateHistory())
      .then(() => this.updatePrice())
      .catch((err) => {
        console.error(err)
        setTimeout(() => this.updatePrice(), 2000)
      })
  }

}
