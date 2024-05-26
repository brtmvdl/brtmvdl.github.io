import { HTML, nH1, nFlex } from '@brtmvdl/frontend'
import { SelectComponent } from './select.component.js'
import { getSymbolList } from '../utils/lists/symbol.list.js'
import { getIntervalList } from '../utils/lists/interval.list.js'

export class HeaderComponent extends HTML {
  children = {
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

  getMenu() {
    const menu = new nFlex()
    menu.append(this.getSymbolSelect())
    menu.append(this.getIntervalSelect())
    return menu
  }

  getSymbolSelect() {
    getSymbolList().map((symbol) => this.children.symbol.addOption(symbol, symbol))
    return this.children.symbol
  }

  getIntervalSelect() {
    getIntervalList().map((interval) => this.children.interval.addOption(interval, interval))
    return this.children.interval
  }
}
