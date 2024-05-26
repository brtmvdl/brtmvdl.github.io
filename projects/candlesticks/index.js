import { HTML } from '@brtmvdl/frontend'
import { HeaderComponent } from './components/header.component.js'
import { FooterComponent } from './components/footer.component.js'
import { BodyComponent } from './components/body.component.js'
import { OrderModel } from './models/order.model.js'
import * as Local from '../../assets/js/utils/local.js'

class BuyModel extends OrderModel {
  constructor(symbol, quoteOrderQty = 100) {
    super('buy', symbol, quoteOrderQty)
  }
}

class SellModel extends OrderModel {
  constructor(symbol, quoteOrderQty = 100) {
    super('sell', symbol, quoteOrderQty)
  }
}

export class Page extends HTML {
  children = {
    header: new HeaderComponent(),
    body: new BodyComponent(),
    footer: new FooterComponent(),
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.setEvents()
    this.append(this.getHeader())
    this.append(this.getBody())
    this.append(this.getFooter())
  }

  setStyles() {
    this.setStyle('background-color', '#003399')
    this.setStyle('color', '#ffffff')
  }

  setEvents() {
    this.on('update', () => this.children.footer.dispatchEvent('update'))
  }

  getHeader() {
    return this.children.header
  }

  getBody() {
    return this.children.body
  }

  getFooter() {
    this.children.footer.on('buy', () => this.buy())
    this.children.footer.on('sell', () => this.sell())
    return this.children.footer
  }

  buy() {
    this.saveMove({ side: 'buy' })
  }

  sell() {
    this.saveMove({ side: 'sell' })
  }

  saveMove(params = {}) {
    Local.add(['orders'], {
      symbol: this.children.header.children.symbol.getValue(),
      type: 'MARKET',
      quoteOrderQty: 100,
      timestamp: Date.now(),
      ...params
    })
    this.dispatchEvent('update')
  }
}
