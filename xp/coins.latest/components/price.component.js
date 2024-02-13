import { HTML } from '@brtmvdl/frontend'

export class PriceComponent extends HTML {
  children = {
    text: new HTML(),
  }

  state = {
    price: 0,
  }

  onCreate() {
    this.append(this.getText())
  }

  setPrice(price) {
    console.log('setPrice', { price })

    this.state.price = +price
    this.update()
    return this
  }

  getText() {
    this.children.text.setStyle('padding', '1rem 0rem')
    this.children.text.setStyle('text-align', 'center')
    this.children.text.setStyle('font-size', '2rem')
    return this.children.text
  }

  getPriceString() {
    return this.state.price
  }

  update() {
    this.children.text.setText(this.getPriceString())
    return this
  }
}
