import { HTML, TopComponent, CoinsSelect, PriceComponent, DatetimeHTML, BuyButton, HistoryComponent } from './views/index.js'

import { PriceModel } from './models/index.js'

import * as Local from './utils/local.js'

import * as API from './utils/api.js'

export class Page extends HTML {
  children = {
    coins_select: new CoinsSelect(),
    price_html: new PriceComponent(),
    datetime_html: new DatetimeHTML(),
    buy_button: new BuyButton(),
    history_html: new HistoryComponent(),
  }

  state = {
    price: 0,
    pair: ['BTC', 'BRL'],
    diffs: {
      last: 0,
      in120: 0,
      in60: 0,
      in45: 0,
      in15: 0,
    }
  }

  onCreate() {
    this.append(new TopComponent())
    this.append(this.getCoinsSelect())
    this.append(this.getPriceHTML())
    this.append(this.getDatetimeHTML())
    this.append(this.getBuyButton())
    this.append(this.getHistoryHTML())
    // 
    this.updatePrice()
  }

  getCoinsSelect() {
    this.children.coins_select.addOption('BTCBRL', 'BTCBRL')
    this.children.coins_select.addOption('USDTBRL', 'USDTBRL')

    this.children.coins_select.on('change', () => {
      const coin = this.children.coins_select.getValue()
      this.state.pair = [coin.replace('BRL', ''), 'BRL']
    })

    this.children.coins_select.setValue('BTCBRL')
    return this.children.coins_select
  }

  getPriceHTML() {
    return this.children.price_html
  }

  getDatetimeHTML() {
    return this.children.datetime_html
  }

  getBuyButton() {
    return this.children.buy_button
  }

  getHistoryHTML() {
    return this.children.history_html
  }

  getPairString() {
    return this.state.pair.join('')
  }

  savePrice() {
    return Local.add('prices', new PriceModel(
      this.state.price,
      this.children.datetime_html.state.datetime,
    ))
  }

  calcDiffs() {
    return Local.get('prices').then((prices) => {
      const priceArr = Array.from(prices).map(({ value, datetime }) => ({ value: +value, datetime  }))
      priceArr.map(({ value, datetime }) => console.log({ value, datetime }))
    })
  }

  updatePrice() {
    API.getPrice(this.getPairString())
      .then((res) => this.state.price = (res.get('price')))
      .then(() => this.children.price_html.setPrice(this.state.price))
      .then(() => this.children.datetime_html.updateDatetime())
      .then(() => this.savePrice())
      .then(() => this.calcDiffs())
      .then(() => this.updatePrice())
      .catch((err) => {
        console.error(err)
        setTimeout(() => this.updatePrice(), 1e3)
      })
  }
}
