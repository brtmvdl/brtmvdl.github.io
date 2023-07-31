import { nElement, nFlex } from '../../../js/nelement/index.js'

export class Total extends nElement {
  state = {
    yearly: 1000,
    unique: 100,
  }

  children = {
    yearly: new nFlex(),
    unique: new nFlex(),
  }

  onCreate() {
    this.append(this.getYearly())
    this.append(this.getUnique())
  }

  parsePrice(price = 0, coin = 'R$') {
    return `${coin} ${price.toFixed(2).replace('.', ',')}`
  }

  getYearly() {
    this.children.yearly.append(new nElement('Total (yearly): '))
    this.children.yearly.append(new nElement(this.parsePrice(this.state.yearly)))

    return this.children.yearly
  }

  getUnique() {
    this.children.unique.append(new nElement('Total (unique): '))
    this.children.unique.append(new nElement(this.parsePrice(this.state.unique)))

    return this.children.unique
  }
}
