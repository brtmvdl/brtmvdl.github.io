import { HTML, nFlex, nButton } from '@brtmvdl/frontend'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import * as config from './config.js'

export class Page extends PaddingComponent {
  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(new TextComponent({ text: 'bitcoin' }))
    this.append(this.getTitleHTML())
    this.append(this.getSubtitleHTML())
    this.append(this.getFlex())
  }

  setStyles() {
  }

  getTitleHTML() {
    const title = new HTML()
    title.setText('Compre Bitcoin aqui')
    title.setStyle('font-size', '4rem')
    title.setStyle('text-align', 'center')
    return title
  }

  getSubtitleHTML() {
    const title = new HTML()
    title.setText('COMPRAR CRIPTO NUNCA FOI TÃO FÁCIL')
    title.setStyle('font-size', '2rem')
    title.setStyle('text-align', 'center')
    return title
  }

  getFlex() {
    const flex = new nFlex()
    flex.setStyle('text-align', 'center')
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
    return new TextComponent({ text: title })
  }

  createCardPrice(price = 0) {
    return new TextComponent({ text: `R$ ${Number(price)},00` })
  }

  createCardItem(item) {
    return new TextComponent({ text: item })
  }

  createCardButton(price) {
    return new ButtonComponent({ text: 'comprar', onclick: () => Flow.goTo('checkout.html', { price }) })
  }
}
