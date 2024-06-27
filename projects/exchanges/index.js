import { HTML } from '@brtmvdl/frontend'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { TableComponent } from '../../assets/js/components/table.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { TrComponent } from '../../assets/js/components/tr.component.js'
import { TdComponent } from '../../assets/js/components/td.component.js'
import * as Local from '../../assets/js/utils/local.js'
import { getSymbolsList } from './lists/symbols.list.js'

export class Page extends HTML {
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
    this.append(this.getPricesTable())
    this.append(this.getBuysTable())
    this.append(this.getSellsTable())
    this.updateBinancePrices()
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

    Array.from(this.state.values).map((price) => {
      const tr = new TrComponent({})

      Object.keys(price).map((key) => {
        const td = new TdComponent()
        td.setText(price[key])
        tr.append(td)
      })

      const td = new TdComponent()
      td.append(new ButtonComponent({ text: 'buy', onclick: () => this.buy(price.symbol) }))
      tr.append(td)

      this.children.prices_table.append(tr)
    })
  }

  getValue(symbol = '') {
    return Array.from(this.state.values).find((value) => value.symbol == symbol)
  }

  buy(symbol) {
    const value = this.getValue(symbol)

    Local.add(['buys'], {
      symbol: value.symbol,
      buy_price: value.price,
      buy_datetime: Date.now(),
    })
  }

  updateBuysTable() {
    this.children.buys_table.clear()

    const tr = new TrComponent({})

    Array.from(['symbol', 'buy_price', 'buy_datetime',]).map((key) => {
      const td = new TdComponent({})
      td.setText(key)
      tr.append(td)
    })

    this.children.buys_table.append(tr)

    Array.from(Local.get(['buys'], [])).map((buy) => {
      const tr = new TrComponent({})

      Object.keys(buy).map((key) => {
        const td = new TdComponent({})
        td.setText(buy[key])
        tr.append(td)
      })

      const td = new TdComponent({})
      td.append(new ButtonComponent({ text: 'sell', onclick: () => this.sell(buy.buy_datetime) }))
      tr.append(td)

      this.children.buys_table.append(tr)
    })
  }

  sell(datetime = Date.now()) {
    console.log('sell', { datetime })

    const buys = Array.from(Local.get(['buys'], []))

    const buy_index = buys.findIndex((buy) => buy.buy_datetime == datetime)

    const buy = buys[buy_index]

    const value = this.getValue(buy.symbol)

    buy.sell_price = value.price
    buy.sell_datetime = Date.now()

    Local.set(['buys'], buys.filter((_, index) => index != buy_index ))

    Local.add(['sells'], buy)
  }

  updateSellsTable() {
    this.children.sells_table.clear()

    const tr = new TrComponent({})

    Array.from(['symbol', 'buy_price', 'buy_datetime', 'sell_price', 'sell_datetime',]).map((key) => {
      const td = new TdComponent({})
      td.setText(key)
      tr.append(td)
    })

    this.children.sells_table.append(tr)

    Array.from(Local.get(['sells'], [])).map((buy) => {
      const tr = new TrComponent({})

      Object.keys(buy).map((key) => {
        const td = new TdComponent({})
        td.setText(buy[key])
        tr.append(td)
      })

      this.children.sells_table.append(tr)
    })
  }

  updateValuesHistory() {
    // console.log('updateValuesHistory')
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
      .then(() => this.updateSellsTable())
      .then(() => this.updateValuesHistory())
      .then(() => this.updateBinancePrices())
  }
}
