import { HTML, nFlex, nButton } from '@brtmvdl/frontend'

import * as config from './config.js'

export class Page extends HTML {
  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(this.getTitleHTML())
    this.append(this.getSubtitleHTML())
    this.append(this.getFlex())
  }

  setStyles() {
    this.setStyle('text-align', 'center')
  }

  getTitleHTML() {
    const title = new HTML()
    title.setText('Compre Bitcoin aqui')
    title.setStyle('font-size', '4rem')
    return title
  }

  getSubtitleHTML() {
    const title = new HTML()
    title.setText('COMPRAR CRIPTO NUNCA FOI TÃO FÁCIL')
    title.setStyle('font-size', '2rem')
    return title
  }

  getFlex() {
    const flex = new nFlex()
    flex.setContainerStyle('width', '40rem')
    flex.setContainerStyle('margin', '0 auto')
    flex.append(this.getG())
    flex.append(this.getM())
    flex.append(this.getP())
    return flex
  }

  getG() {
    return this.createCardHTML('G', config.price / 1, [])
  }

  getM() {
    return this.createCardHTML('M', config.price / 10, [])
  }

  getP() {
    return this.createCardHTML('P', config.price / 100, [])
  }

  createCardHTML(title, price, items = []) {
    const card = new HTML()
    card.append(this.createCardTitle(title))
    card.append(this.createCardPrice(price))
    Array.from(items).map((item) => card.append(this.createCardItem(item)))
    card.append(this.createCardButton(price))
    return card
  }

  createCardTitle(title = '') {
    const html = new HTML()
    html.setText(title)
    return html
  }

  createCardPrice(price = 0) {
    const html = new HTML()
    html.setText(`R$ ${Number(price)},00`)
    return html
  }

  createCardItem(item) {
    const html = new HTML()
    html.setText(item)
    return html
  }

  createCardButton(price) {
    const button = new nButton()
    button.setText('COMPRAR')
    button.on('click', () => Flow.goTo('checkout.html', { price }))
    return button
  }
}
