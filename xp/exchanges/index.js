import { HTML, nH1, nH2, nTable, nTr, nTd } from '@brtmvdl/frontend'
import * as Local from './utils/local.js'
import { price2string } from './utils/str.js'
import { percent } from './utils/math.js'

class nTd2 extends nTd {
  onCreate() {
    this.setStyle('padding-bottom', '1rem')
  }
}

const createTdText = (text = '') => {
  const td = new nTd2()
  td.setText(text)
  return td
}

const createTdHTML = (html = new HTML()) => {
  const td = new nTd2()
  td.append(html)
  return td
}

export class Page extends HTML {
  state = {
    enabled: {
      binance: [
        'BTCBRL',
        'USDTBRL',
        'ETHBRL',
        'XRPBRL',
        'BNBBRL',
        'MATICBRL',
        'SOLBRL',
        'LINKBRL',
        'LTCBRL',
        'AVAXBRL',
        'DOGEBRL',
        'ADABRL',
        'DOTBRL',
        'BUSDBRL',
        'CHZBRL'
      ],
    },
    values: {
      binance: [],
    },
    symbols: [],
  }

  children = {
    prices_table: new nTable(),
    buys_table: new nTable(),
    sells_table: new nTable(),
  }

  onCreate() {
    this.updateBinancePrices()
    Local.set(['history'], [])
    const container = new HTML()
    container.append(this.getPricesTable())
    container.append(this.getBuysTable())
    // container.append(this.getSellsTable())
    this.append(container)
  }

  getPricesTable() {
    const prices_table = new HTML()
    const title = new nH1()
    title.setText('Prices')
    prices_table.append(title)
    this.children.prices_table.setStyle('width', '100%')
    prices_table.append(this.children.prices_table)
    return prices_table
  }

  getBuysTable() {
    const buys_table = new HTML()
    const title = new nH1()
    title.setText('Buys')
    buys_table.append(title)
    this.children.buys_table.setStyle('width', '100%')
    buys_table.append(this.children.buys_table)
    return buys_table
  }

  getSellsTable() {
    const sells_table = new HTML()
    const title = new nH1()
    title.setText('Sells')
    sells_table.append(title)
    this.children.sells_table.setStyle('width', '100%')
    sells_table.append(this.children.sells_table)
    return sells_table
  }

  updateValuesHistory() {
    const datetime = Date.now()

    this.state.values.binance.map(({ symbol, price }) => {
      Local.add(['history'], { symbol, price, datetime })
    })

    const history = Local.get(['history'])

    if (history.length > 2e3) {
      Local.set(['history'], history.filter((_, ix) => ix > 1e3))
    }
  }

  getPrice(symbol, interval = 0) {
    const now = Date.now()
    const sec = interval * 1000
    const history = Local.get(['history'], [])
      .filter(({ symbol: s }) => symbol === s)
      .filter(({ datetime }) => datetime > now - sec)
      .find(() => true)

    return history?.price || 0
  }

  buy(amount = 0, symbol = '', price = 0) {
    const datetime = Date.now()
    Local.add(['buys'], { amount, symbol, price, datetime })
  }

  updatePricesTable() {
    this.children.prices_table.clear()

    const value = new nTr()
    value.setStyle('margin-bottom', '1rem')

    value.append(createTdText('symbol'))

    value.append(createTdText('price'))

    value.append(createTdText('price10'))
    value.append(createTdText('diff10'))
    value.append(createTdText('percent10'))

    value.append(createTdText('price30'))
    value.append(createTdText('diff30'))
    value.append(createTdText('percent30'))

    value.append(createTdText('price60'))
    value.append(createTdText('diff60'))
    value.append(createTdText('percent60'))

    value.append(createTdText(''))

    this.children.prices_table.append(value)

    this.state.values.binance.map(({ symbol, price }) => {
      const value = new nTr()
      value.setStyle('margin', '1rem')

      value.append(createTdText(symbol))

      value.append(createTdText(`${price2string(price)}`))

      const price10 = this.getPrice(symbol, 10)
      value.append(createTdText(price2string(price10)))
      value.append(createTdText(price2string(price - price10)))
      value.append(createTdText(percent(price, price10)))

      const price30 = this.getPrice(symbol, 30)
      value.append(createTdText(price2string(price30)))
      value.append(createTdText(price2string(price - price30)))
      value.append(createTdText(percent(price, price30)))

      const price60 = this.getPrice(symbol, 60)
      value.append(createTdText(price2string(price60)))
      value.append(createTdText(price2string(price - price60)))
      value.append(createTdText(percent(price, price60)))

      const buy_button = new HTML()
      buy_button.setText('Buy BRL 100')
      buy_button.on('click', () => this.buy(100, symbol, price))
      value.append(createTdHTML(buy_button))

      this.children.prices_table.append(value)
    })
  }

  sell(datetime) {
    //
  }

  getSymbolPrice(s) {
    const { price = 0 } = this.state.values.binance.find(({ symbol }) => symbol == s)
    return price
  }

  updateBuysTable() {
    this.children.buys_table.clear()

    const value = new nTr()
    value.setStyle('margin-bottom', '1rem')

    value.append(createTdText('symbol'))

    value.append(createTdText('price'))

    value.append(createTdText('diff'))

    value.append(createTdText(''))

    this.children.buys_table.append(value)

    const buys = Array.from(Local.get(['buys'], []))

    console.log({ buys })

    buys.map(({ symbol, price }) => {
      const value = new nTr()
      value.setStyle('margin', '1rem')

      value.append(createTdText(symbol))

      value.append(createTdText(price))

      value.append(createTdText(price2string(this.getSymbolPrice(symbol) - price)))

      const buy_button = new HTML()
      buy_button.setText('Sell')
      buy_button.on('click', () => this.sell(datetime))
      value.append(createTdHTML(buy_button))

      this.children.buys_table.append(value)
    })
  }

  updateBinancePrices() {
    const symbols = this.state.enabled.binance.map((s) => `"${s}"`).join(',')

    fetch(`https://api2.binance.com/api/v3/ticker/price?symbols=[${symbols}]`)
      .then((res) => res.json())
      .then((values) => this.state.values.binance = values.map(({ symbol, price }) => ({ symbol, price: +price, exchange: 'binance' })))
      .then(() => this.updatePricesTable())
      .then(() => this.updateBuysTable())
      .then(() => this.updateValuesHistory())
      .then(() => this.updateBinancePrices())
  }
}
