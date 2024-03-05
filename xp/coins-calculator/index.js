import { HTML, nFlex, nSpan, nInput } from '@brtmvdl/frontend'

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
    this.setStyle('border-radius', 'calc(1rem / 4)')
    this.setStyle('margin', 'calc(-1rem / 4)')
    this.setStyle('padding', 'calc(1rem / 4)')
    this.setStyle('outline', 'none')
    this.setStyle('border', 'none')
  }
}

export class Page extends HTML {
  children = {
    buy_quantity_input: new nInputComponent('number'),
    buy_price_input: new nInputComponent('number'),
    sell_price_input: new nInputComponent('number'),
    gain_price: new SpanComponent(),
    gain_percent: new SpanComponent(),
  }

  state = {
    buy: { quantity: 0, price: 0 },
    sell: { quantity: 0, price: 0 },
    gain: '',
  }

  onCreate() {
    super.onCreate()
    // this.setStyle('width', '20rem')
    this.setStyle('margin', '0 auto')
    this.appendFlex('When', this.getSymbolInput())
    this.appendFlex('is in', this.getBuyPriceInput())
    this.appendFlex('buy', this.getBuyQuantityInput())
    this.appendFlex('sell', this.getSellPriceInput())
    this.appendFlex('we get', new HTML())
    this.appendFlex('in price', this.getGainPriceHTML())
    this.appendFlex('in percent', this.getGainPercentHTML())
  }


  appendFlex(text = '', component = new HTML()) {
    const flex = new nFlex()
    flex.setStyle('margin', '1rem')
    flex.append(new SpanComponent(text))
    flex.append(component)
    this.append(flex)
  }

  getSymbolInput() {
    const input = new nInputComponent()
    input.setPlaceholder('symbol')
    return input
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
    this.calcGainPrice()
    this.calcGainPercent()
  }

  calcGainPrice() {
    const sell_price = this.children.sell_price_input.getValue()
    const buy_quantity = this.children.buy_quantity_input.getValue()
    const buy_price = this.children.buy_price_input.getValue()
    const price = ((sell_price * buy_quantity / buy_price) - buy_quantity).toFixed(4)
    this.children.gain_price.setText(price)
  }

  calcGainPercent() {
    const sell_price = this.children.sell_price_input.getValue()
    const buy_quantity = this.children.buy_quantity_input.getValue()
    const buy_price = this.children.buy_price_input.getValue()
    const price = ((sell_price * buy_quantity / buy_price) - buy_quantity).toFixed(4)
    const percent = (100 * price / buy_quantity).toFixed(4)
    this.children.gain_percent.setText(percent + '%')
  }
}
