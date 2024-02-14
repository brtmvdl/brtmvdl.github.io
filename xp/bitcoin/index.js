import { HTML, nButton } from '@brtmvdl/frontend'

export class Page extends HTML {
  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(this.getTitleHTML())
    this.append(this.getBuyButton())
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

  getBuyButton() {
    const button = new nButton()
    button.setText('comprar')
    button.setStyle('background-color', '#000000')
    button.setStyle('color', '#ffffff')
    button.setStyle('padding', '1rem')
    button.setStyle('border', 'none')
    return button
  }
}
