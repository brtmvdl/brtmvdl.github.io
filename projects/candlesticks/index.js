import { HTML } from '@brtmvdl/frontend'
import { TwoColumnsComponent } from '../../assets/js/components/two.columns.component.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { HeaderComponent } from './components/header.component.js'
import { FooterComponent } from './components/footer.component.js'
import { BodyComponent } from './components/body.component.js'
import * as Local from '../../assets/js/utils/local.js'

export class Page extends PaddingComponent {
  children = {
    header: new HeaderComponent(),
    body: new BodyComponent(),
    footer: new FooterComponent(),
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.append(new TextComponent({ text: 'candlesticks' }))
    this.append(this.getTwoColumns())
  }

  setEvents() {
    this.on('update', () => this.children.footer.dispatchEvent('update'))
  }

  getTwoColumns() {
    return new TwoColumnsComponent({
      html1: this.getLeft(),
      html2: this.getRight(),
    })
  }

  getLeft() {
    return this.getHeader()
  }

  getRight() {
    const html = new HTML()
    html.append(this.getBody())
    html.append(this.getFooter())
    return html
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
