import { HTML, nFlex } from '../../assets/js/libs/frontend/index.js'

import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { TableComponent } from '../../assets/js/components/table.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { TrComponent } from '../../assets/js/components/tr.component.js'
import { TdComponent } from '../../assets/js/components/td.component.js'

import { datetime2str, price2string } from '../../assets/js/utils/str.js'
import { getWidth, getHeight } from '../../assets/js/utils/window.js'
import * as Local from '../../assets/js/utils/local.js'

import { getSymbolsList } from './lists/symbols.list.js'

export class Page extends PaddingComponent {
  state = {
    symbols: getSymbolsList(),
    values: [],
  }

  children = {
    prices_table: new TableComponent(),
    buys_table: new TableComponent(),
    sells_table: new TableComponent(),
  }

  onCreate() {
    super.onCreate()
    Local.set(['history'], [])
    this.append(new TextComponent({ text: 'exchanges' }))
    this.append(this.getFlex())
    this.updateBinancePrices()
    this.updateBuysTable()
    this.updateSellsTable()
  }

  getFlex() {
    const flex = (getHeight() < getWidth()) ? new nFlex() : new HTML()
    flex.append(this.getPricesTable())
    flex.append(this.getBuysTable())
    flex.append(this.getSellsTable())
    return flex
  }

  getPricesTable() {
    const html = new HTML()
    html.append(new TextComponent({ text: 'prices' }))
    html.append(this.children.prices_table)
    return html
  }

  getBuysTable() {
    const html = new HTML()
    html.append(new TextComponent({ text: 'buys' }))
    html.append(this.children.buys_table)
    return html
  }

  getSellsTable() {
    const html = new HTML()
    html.append(new TextComponent({ text: 'sells' }))
    html.append(this.children.sells_table)
    return html
  }

  updatePricesTable() {
    this.children.prices_table.clear()

    const tr = new TrComponent({})

    Array.from(['price', 'symbol']).map((key) => {
      const td = new TdComponent({})
      td.setText(key)
      tr.append(td)
    })

    this.children.prices_table.append(tr)

    Array.from(this.state.values).map((value) => {
      const tr = new TrComponent({})

      tr.append(this.createTdText(value['symbol']))

      tr.append(this.createTdText(price2string(value['price'], 'R$')))

      const button = new TdComponent()
      button.append(new ButtonComponent({ text: 'buy', onclick: () => this.buy(value['symbol']) }))
      tr.append(button)

      this.children.prices_table.append(tr)
    })
  }

  getValue(symbol = '') {
    return Array.from(this.state.values).find((value) => value.symbol == symbol)
  }

  buy(symbol) {
    const value = this.getValue(symbol)

    if (value) Local.add(['buys'], {
      symbol: value.symbol,
      buy_price: value.price,
      buy_datetime: Date.now(),
    })
  }

  updateBuysTable() {
    this.children.buys_table.clear()

    const buys = Local.get(['buys'], [])

    if (buys.length == 0) return

    const tr = new TrComponent({})

    Array.from(['symbol', 'price', 'datetime', 'price_diff', 'percent_diff']).map((key) => tr.append(this.createTdText(key)))

    this.children.buys_table.append(tr)

    Array.from(buys).map((buy) => {
      const tr = new TrComponent({})
      tr.append(this.createTdText(buy['symbol']))
      tr.append(this.createTdText(price2string(buy['buy_price'], 'R$')))
      tr.append(this.createTdText(datetime2str(buy['buy_datetime'])))
      const price = this.getPrice(buy['symbol'])
      const price_diff = price - buy['buy_price']
      tr.append(this.createTdText(price2string(price_diff, 'R$')))
      const percent_diff = (((100 * price) / buy['buy_price']) - 100).toFixed(4)
      tr.append(this.createTdText(`${percent_diff}%`))
      const button = new TdComponent({})
      button.append(new ButtonComponent({ text: 'sell', onclick: () => this.sell(buy.buy_datetime) }))
      tr.append(button)
      this.children.buys_table.append(tr)
    })
  }

  getPrice(symbol) {
    return Array.from(this.state.values).find((value) => value.symbol == symbol)?.price
  }

  createTdText(text = '') {
    const td = new TdComponent({})
    td.setText(text)
    td.setStyle('padding', 'calc(1rem / 4)')
    return td
  }

  sell(datetime = Date.now()) {
    const buys = Array.from(Local.get(['buys'], []))

    const buy_index = buys.findIndex((buy) => buy.buy_datetime == datetime)

    const buy = buys[buy_index]

    buy.sell_price = this.getValue(buy.symbol)?.price
    buy.sell_datetime = Date.now()

    Local.set(['buys'], buys.filter((_, index) => index != buy_index))

    Local.add(['sells'], buy)

    this.updateSellsTable()
  }

  updateSellsTable() {
    this.children.sells_table.clear()

    const sells = Array.from(Local.get(['sells'], []))

    if (sells.length == 0) return

    const tr = new TrComponent({})

    Array.from(['symbol', 'buy_price', 'buy_datetime', 'sell_price', 'sell_datetime']).map((key) => tr.append(this.createTdText(key)))

    this.children.sells_table.append(tr)

    Array.from(sells).map((sell) => {
      const tr = new TrComponent({})
      tr.append(this.createTdText(sell['symbol']))
      tr.append(this.createTdText(price2string(sell['buy_price'], 'R$')))
      tr.append(this.createTdText(datetime2str(sell['buy_datetime'])))
      tr.append(this.createTdText(price2string(sell['sell_price'], 'R$')))
      tr.append(this.createTdText(datetime2str(sell['sell_datetime'])))
      this.children.sells_table.append(tr)
    })
  }

  getSymbolsList() {
    return this.state.symbols.map((s) => `"${s}"`).join(',')
  }

  updateBinancePrices() {
    fetch(`https://api4.binance.com/api/v3/ticker/price?symbols=[${this.getSymbolsList()}]`)
      .then((res) => res.json())
      .then((values) => this.state.values = values.map(({ symbol, price }) => ({ symbol, price: +price })))
      .then(() => this.updatePricesTable())
      .then(() => this.updateBuysTable())
      .then(() => this.updateBinancePrices())
  }
}
