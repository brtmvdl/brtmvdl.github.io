import { HTML } from '@brtmvdl/frontend'
import { InputComponent } from '../../../assets/js/components/input.component.js'
import { ButtonComponent } from '../../../assets/js/components/button.component.js'

export class FormComponent extends HTML {
  children = {
    quote: new InputComponent('quote'),
    symbol: new InputComponent('symbol'),
    button: new ButtonComponent('start', () => this.onButtonClick()),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getQuoteInput())
    this.append(this.getSymbolInput())
    this.append(this.getButton())
  }

  getQuoteInput() {
    return this.children.quote
  }

  getSymbolInput() {
    this.children.symbol.children.input.on('input', () => this.children.symbol.children.input.setValue(this.children.symbol.children.input.getValue().toUpperCase()))
    return this.children.symbol
  }

  getButton() {
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
