import { HTML, nH1, nFlex } from '@brtmvdl/frontend'
import { SelectComponent } from './select.component.js'
import { getSymbolList } from '../utils/lists/symbol.list.js'
import { getIntervalList } from '../utils/lists/interval.list.js'
import { getQuantityList } from '../utils/lists/quantity.list.js'

export class HeaderComponent extends HTML {
  children = {
    quantity: new SelectComponent(),
    symbol: new SelectComponent(),
    interval: new SelectComponent(),
  }

  onCreate() {
    super.onCreate()
    this.setStyle('padding', '1rem')
    this.append(this.getFlex())
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getTitle())
    flex.append(this.getMenu())
    return flex
  }

  getTitle() {
    const title = new nH1()
    title.setText('candlesticks')
    title.setStyle('margin', '0rem')
    return title
  }

  getSymbol() {
    return this.children.symbol.getValue()
  }

  getMenu() {
    const menu = new nFlex()
    menu.append(this.getQuantitySelect())
    menu.append(this.getSymbolSelect())
    menu.append(this.getIntervalSelect())
    return menu
  }

  getSymbolSelect() {
    getSymbolList().map((symbol) => this.children.symbol.addOption(symbol, symbol))
    this.children.symbol.on('change', () => this.onSymbolUpdate())
    return this.children.symbol
  }

  onSymbolUpdate() {
    this.update()
  }

  getIntervalSelect() {
    getIntervalList().map((interval) => this.children.interval.addOption(interval, interval))
    this.children.interval.on('change', () => this.onIntervalUpdate())
    return this.children.interval
  }

  onIntervalUpdate() {
    this.update()
  }

  getQuantitySelect() {
    getQuantityList().map((quantity) => this.children.quantity.addOption(quantity, quantity))
    this.children.quantity.on('change', () => this.onQuantityUpdate())
    return this.children.quantity
  }

  onQuantityUpdate() {
    this.update()
  }

  getQuantity() {
    return this.children.quantity.getValue()
  }

  update() {
    this.dispatchEvent('update', {
      quantity: this.children.quantity.getValue(),
      symbol: this.children.symbol.getValue(),
      interval: this.children.interval.getValue(),
    })
  }
}
