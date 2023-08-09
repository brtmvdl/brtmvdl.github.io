import { nElement, nFlex } from '../../../js/nelement/index.js'

export class Valuable extends nElement {
  children = {
    title: new nElement(),
    value: new nElement(),
  }

  onCreate() {
    this.append(this.getFlex())
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getTitle())
    flex.append(this.getValue())
    return flex
  }

  getTitleText() {
    return ''
  }

  getTitle() {
    this.children.title.setText(this.getTitleText())

    return this.children.title
  }

  getValueText(price = 0, coin = 'R$') {
    return `${coin} ${price.toFixed(2).replace('.', ',')}`
  }

  getValue() {
    this.children.value.setText(this.getValueText())

    return this.children.value
  }
}
