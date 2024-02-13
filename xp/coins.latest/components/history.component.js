import { HTML } from '@brtmvdl/frontend'
import { SpanHTML } from './span.html.js'
import { TitleHTML } from './title.html.js'
import { TextHTML } from './text.html.js'
import { DatetimeHTML } from './datetime.html.js'
import { ButtonHTML } from './button.component.js'

import { Buy } from '../models/buy.js'
import { Pair } from '../models/pair.js'

import * as Local from '../local.js'

export class HistoryComponent extends HTML {
  state = {
    order: 'desc',
    pair: new Pair()
  }

  constructor(pair = new Pair() ) {
    super()
    this.state.pair = pair
  }

  createTitle() {
    const history_title = new HTML()
    history_title.append(new SpanHTML('History', { 'font-size': '2rem', 'padding': '1rem' }))
    history_title.append(new SpanHTML('clear', { 'padding-left': '1rem' }, () => Local.set(['move'], [])))
    const history_order_link = new SpanHTML(this.state.order, { 'padding-left': '1rem' }, () => history_order_link.setText(this.state.order = history_order_link.getText() === 'desc' ? 'asc' : 'desc'))
    history_title.append(history_order_link)
    return history_title
  }

  update() {
    this.clear()

    const moves = Local.get(['move'], [])

    if (moves) {
      const moves_filtered = moves.filter(({ buy = new Buy(), sell = null }) => buy.pair.symbol === this.state.pair.symbol)

      if (moves_filtered.length === 0) return

      this.append(this.createTitle())

      moves_filtered
        .sort((a, b) => this.state.order === 'desc' ? (b.buy.datetime - a.buy.datetime) : (a.buy.datetime - b.buy.datetime))
        .map(({ buy = new Buy(), sell = null }) => {
          const html = new HTML()
          html.setStyle('margin', '1rem')
          html.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 4) #000000')
          html.append(new TitleHTML('Buy'))
          html.append(new TextHTML(`${buy.pair.symbol} ${this.getPriceValue(buy.pair.price)}`))
          html.append(new TextHTML(`${buy.coin.symbol} ${this.getPriceValue(buy.coin.price)}`))
          html.append(this.createDatetimeText(buy.datetime))
          if (sell) {
            html.append(new TitleHTML('Sell'))
            html.append(new TextHTML(`${sell.pair.symbol} ${this.getPriceValue(sell.pair.price)}`))
            html.append(new TextHTML(`${sell.buy.coin.symbol} ${this.getPriceValue(buy.coin.price * sell.pair.price / buy.pair.price)}`))
            html.append(this.createDatetimeText(sell.datetime))
            html.append(new TitleHTML('Now'))
            html.append(new TextHTML(`${buy.pair.symbol} ${this.getPriceValue(sell.pair.price - buy.pair.price)}`))
            html.append(new TextHTML(`${buy.coin.symbol} ${this.parseDiffPrice(buy.coin.price, buy.pair.price, sell.pair.price)}`))
            html.append(this.createDiffDatetime(buy.datetime, sell.datetime))
          } else {
            html.append(new TitleHTML('Now'))
            html.append(new TextHTML(`${buy.pair.symbol} ${this.getPriceValue(this.state.pair.price - buy.pair.price)}`))
            html.append(new TextHTML(`${buy.coin.symbol} ${this.parseDiffPrice(buy.coin.price, buy.pair.price, this.state.pair.price)}`))
            html.append(this.createDiffDatetime(buy.datetime, this.children.datetime.state.datetime))
            html.append(new ButtonHTML('Sell', {}, () => this.sell(buy)))
          }

          this.append(html)
        })
    }
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
    return new TextHTML(`${h}h ${m}m ${s}s`)
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

  getPriceValue(price = 0) {
    return (+price).toFixed(4).replace('.', ',')
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
}
