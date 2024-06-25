import { HTML, nH1, nLink, nButton, nFlex, nSpan, nInput } from '@brtmvdl/frontend'

class SpanComponent extends nSpan {
  text = ''

  constructor(text = '') {
    super()
    this.text = text
  }

  onCreate() {
    super.onCreate()
    this.setText(this.text)
  }
}

class nInputComponent extends nInput {
  type = 'text'

  constructor(type = 'text') {
    super()
    this.type = type
  }

  hasContainer() {
    return false
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.setAttr('type', this.type)
  }

  setStyles() {
    this.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) rgba(0, 0, 0, 0.5)')
    this.setStyle('margin', 'calc(-1rem / 4)')
    this.setStyle('padding', 'calc(1rem / 4)')
    this.setStyle('outline', 'none')
    this.setStyle('border', 'none')
  }
}

export class Page extends HTML {
  children = {
    symbol: new nInputComponent(),
    buy_quantity_input: new nInputComponent('number'),
    buy_price_input: new nInputComponent('number'),
    sell_price_input: new nInputComponent('number'),
    gain_price: new SpanComponent(),
    gain_percent: new SpanComponent(),
    links: new HTML(),
  }

  state = {
    buy: { quantity: 0, price: 0 },
    sell: { quantity: 0, price: 0 },
    gain: '',
  }

  onCreate() {
    super.onCreate()
    this.setStyle('padding', '1rem')
    this.setStyle('margin', '0 auto')
    this.append(this.getTitleH1())
    this.appendFlex('When', this.getSymbolInput())
    this.appendFlex('is in', this.getBuyPriceInput())
    this.appendFlex('buy', this.getBuyQuantityInput())
    this.appendFlex('sell', this.getSellPriceInput())
    this.appendFlex('we get', new HTML())
    this.appendFlex('in price', this.getGainPriceHTML())
    this.appendFlex('in percent', this.getGainPercentHTML())
    this.append(this.getExportButton())
    this.append(this.children.links)
  }

  getTitleH1() {
    const h1 = new nH1()
    h1.setText('Coins Calculator')
    h1.setStyle('margin', '0rem')
    return h1
  }

  appendFlex(text = '', component = new HTML()) {
    const flex = new nFlex()
    flex.setStyle('margin', '1rem 0rem')
    flex.append(new SpanComponent(text))
    flex.append(component)
    this.append(flex)
  }

  getSymbolInput() {
    this.children.symbol.setPlaceholder('symbol')
    return this.children.symbol
  }

  getBuyQuantityInput() {
    this.children.buy_quantity_input.setPlaceholder('quantity')
    this.children.buy_quantity_input.on('keyup', () => this.calcGains())
    return this.children.buy_quantity_input
  }

  getBuyPriceInput() {
    this.children.buy_price_input.setPlaceholder('price')
    this.children.buy_price_input.on('keyup', () => this.calcGains())
    return this.children.buy_price_input
  }

  getSellPriceInput() {
    this.children.sell_price_input.setPlaceholder('price')
    this.children.sell_price_input.on('keyup', () => this.calcGains())
    return this.children.sell_price_input
  }

  getGainPriceHTML() {
    return this.children.gain_price
  }

  getGainPercentHTML() {
    return this.children.gain_percent
  }

  calcGains() {
    this.children.gain_price.setText(this.getPrice())
    this.children.gain_percent.setText(this.getPercent() + '%')
  }

  getPrice() {
    const sell_price = this.children.sell_price_input.getValue()
    const buy_quantity = this.children.buy_quantity_input.getValue()
    const buy_price = this.children.buy_price_input.getValue()
    return ((sell_price * buy_quantity / buy_price) - buy_quantity).toFixed(4)
  }

  getPercent() {
    const price = this.getPrice()
    const buy_quantity = this.children.buy_quantity_input.getValue()
    return (100 * price / buy_quantity).toFixed(4)
  }

  getExportButton() {
    const button = new nButton()
    button.setText('export')
    button.on('click', () => this.children.links.append(this.createDownloadLink(
      this.children.symbol.getValue(),
      this.children.sell_price_input.getValue(),
      this.children.buy_quantity_input.getValue(),
      this.children.buy_price_input.getValue(),
      this.getPrice(),
      this.getPercent(),
    )))
    button.setContainerStyle('width', '100%')
    button.setStyle('box-sizing', 'border-box')
    button.setStyle('display', 'inline-block')
    button.setStyle('text-align', 'center')
    button.setStyle('padding', '1rem')
    button.setStyle('border', 'none')
    button.setStyle('width', '100%')
    return button
  }

  createDownloadLink(symbol, sell_price, buy_quantity, buy_price, price, percent, filename = `${Date.now()}.json`) {
    const type = 'application/json'
    const lastModified = Date.now()
    const link = new nLink()
    link.setAttr('download', filename)
    link.href(URL.createObjectURL(new File([new Blob([JSON.stringify({ symbol, sell_price, buy_quantity, buy_price, price, percent })], { type })], filename, { type, lastModified })))
    link.setText(filename)
    link.setStyle('box-sizing', 'border-box')
    link.setStyle('display', 'inline-block')
    link.setStyle('padding', '1rem 0rem')
    link.setStyle('width', '100%')
    return link
  }
}
