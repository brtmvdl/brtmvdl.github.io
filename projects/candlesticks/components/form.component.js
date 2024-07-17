import { HTML, nH1, nFlex } from '../../../assets/js/libs/frontend/index.js'
import { SelectComponent } from '../../../assets/js/components/select.component.js'
import { TextComponent } from '../../../assets/js/components/text.component.js'
import { getIntervalList } from '../utils/lists/interval.list.js'
import { getQuantityList } from '../utils/lists/quantity.list.js'
import { getSymbolList } from '../utils/lists/symbol.list.js'

export class FormComponent extends HTML {
  children = {
    quantity: new SelectComponent({ label: 'quantity' }),
    symbol: new SelectComponent({ label: 'symbol' }),
    interval: new SelectComponent({ label: 'interval' }),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getMenu())
  }

  getSymbol() {
    return this.children.symbol.getValue()
  }

  getMenu() {
    const menu = new HTML()
    menu.append(this.getSymbolSelect())
    menu.append(this.getIntervalSelect())
    menu.append(this.getQuantitySelect())
    return menu
  }

  getSymbolSelect() {
    getSymbolList().map((symbol) => this.children.symbol.addOption(symbol, symbol))
    this.children.symbol.addEventListener('change', () => this.update())
    return this.children.symbol
  }

  getIntervalSelect() {
    getIntervalList().map((interval) => this.children.interval.addOption(interval, interval))
    this.children.interval.addEventListener('change', () => this.update())
    return this.children.interval
  }

  getQuantitySelect() {
    getQuantityList().map((quantity) => this.children.quantity.addOption(quantity, quantity))
    this.children.quantity.addEventListener('change', () => this.update())
    return this.children.quantity
  }

  getQuantity() {
    return this.children.quantity.getValue()
  }

  update() {
    this.dispatch('update', {
      quantity: this.children.quantity.getValue(),
      symbol: this.children.symbol.getValue(),
      interval: this.children.interval.getValue(),
    })
  }
}
