import { HTML } from '@brtmvdl/frontend'
import { HeaderComponent } from './components/header.component.js'
import { FooterComponent } from './components/footer.component.js'
import { BodyComponent } from './components/body.component.js'
import * as Local from '../../assets/js/utils/local.js'

export class Page extends HTML {
  children = {
    header: new HeaderComponent(),
    body: new BodyComponent(),
    footer: new FooterComponent(),
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.append(this.getHeader())
    this.append(this.getBody())
    this.append(this.getFooter())
  }

  setEvents() {
    this.on('update', () => this.children.footer.dispatchEvent('update'))
  }

  getHeader() {
    this.children.header.on('update', ({ value: data }) => this.onHeaderUpdate(data))
    return this.children.header
  }

  onHeaderUpdate(data) {
    this.update({ header: data })
  }

  getBody() {
    this.children.body.on('update', ({ value: data }) => this.onBodyUpdate(data))
    return this.children.body
  }

  onBodyUpdate(data = {}) {
    this.update({ body: data })
  }

  getFooter() {
    this.children.footer.on('buy', () => this.onFooterBuy())
    this.children.footer.on('sell', () => this.onFooterSell())
    this.children.footer.on('update', ({ value: data }) => this.onFooterUpdate(data))
    return this.children.footer
  }

  onFooterBuy() {
    this.saveMove({ side: 'buy' })
  }

  onFooterSell() {
    this.saveMove({ side: 'sell' })
  }

  onFooterUpdate(data = {}) {
    this.update({ footer: data })
  }

  saveMove(params = {}) {
    Local.add(['orders'], {
      symbol: this.children.header.getSymbol(),
      type: 'LIMIT',
      quantity: this.children.header.getQuantity(),
      price: this.children.body.getPrice(),
      timeInForce: 'GTC',
      timestamp: Date.now(),
      ...params
    })
    this.dispatchEvent('update')
  }

  update({ header = {}, body = {}, footer = {} } = {}) {
    this.children.header.dispatchEvent('input', header)
    this.children.body.dispatchEvent('input', body)
    this.children.footer.dispatchEvent('input', footer)
  }
}
