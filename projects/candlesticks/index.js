import { HTML } from '../../assets/js/libs/frontend/index.js'
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
    this.addEventListener('update', () => this.children.footer.dispatch('update'))
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
    this.children.header.addEventListener('update', ({ value: data }) => this.onHeaderUpdate(data))
    return this.children.header
  }

  onHeaderUpdate(data) {
    this.update({ header: data })
  }

  getBody() {
    this.children.body.addEventListener('update', ({ value: data }) => this.onBodyUpdate(data))
    return this.children.body
  }

  onBodyUpdate(data = {}) {
    this.update({ body: data })
  }

  getFooter() {
    this.children.footer.addEventListener('buy', () => this.onFooterBuy())
    this.children.footer.addEventListener('sell', () => this.onFooterSell())
    this.children.footer.addEventListener('update', ({ value: data }) => this.onFooterUpdate(data))
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
    this.dispatch('update')
  }

  update({ header = {}, body = {}, footer = {} } = {}) {
    this.children.header.dispatch('input', header)
    this.children.body.dispatch('input', body)
    this.children.footer.dispatch('input', footer)
  }
}
