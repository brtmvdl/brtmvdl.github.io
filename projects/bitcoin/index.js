import { HTML, nFlex } from '../../assets/js/libs/frontend/index.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import * as config from './config.js'

import { loadScript } from '../../assets/js/libs/paypal/index.js'

export class Page extends PaddingComponent {
  state = {
    amount: 100,
  }

  children = {
    error: new TextComponent({}),
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.append(new TextComponent({ text: 'bitcoin' }))
    this.append(this.getTitleHTML())
    this.append(this.getSubtitleHTML())
    this.append(this.getFlex())
    this.append(this.getErrorComponent())
    this.append(this.children.button)
  }

  setEvents() {
    loadScript({ 'client-id': config.client_id, 'locale': 'pt_BR', 'buyer-country': 'BR', 'currency': 'BRL', 'enable-funding': 'venmo', 'debug': config.debug })
      .then((paypal) => {
        console.log({ paypal })
        paypal
          .Buttons({ message: { amount: this.state.amount } })
          .render('#button')
          .catch((error) => this.setErrorText('failed to render the PayPal Buttons', error))
      })
      .catch((err) => this.setErrorText('failed to load the PayPal JS SDK script', err))
  }

  setErrorText(text, error = new Error()) {
    console.error(error)
    this.children.error.setText(text)
  }

  getErrorComponent() {
    this.children.error.setStyle('color', '#ff0000')
    return this.children.error
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
    card.addEventListener('click', () => this.state.amount = price)
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
