import { HTML } from '@brtmvdl/frontend'
import { InputTextGroupComponent } from './input.text.group.component.js'
import { ButtonComponent } from './button.component.js'

export class FormComponent extends HTML {
  children = {
    quote: new InputTextGroupComponent(),
    symbol: new InputTextGroupComponent(),
    button: new ButtonComponent(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getQuoteInput())
    this.append(this.getSymbolInput())
    this.append(this.getButton())
  }

  getQuoteInput() {
    this.children.quote.children.label.setText('quote')
    this.children.quote.children.input.setPlaceholder('quote')
    return this.children.quote
  }

  getSymbolInput() {
    this.children.symbol.children.label.setText('symbol')
    this.children.symbol.children.input.setPlaceholder('symbol')
    this.children.symbol.children.input.on('input', () => this.children.symbol.children.input.setValue(this.children.symbol.children.input.getValue().toUpperCase()))
    return this.children.symbol
  }

  getButton() {
    this.children.button.setText('start')
    this.children.button.on('click', () => this.onButtonClick())
    return this.children.button
  }

  onButtonClick() {
    if (this.children.button.getText() === 'start') {
      this.dispatchEvent('start')
      this.children.button.setText('stop')
    } else {
      this.dispatchEvent('stop')
      this.children.button.setText('start')
    }
  }
}
