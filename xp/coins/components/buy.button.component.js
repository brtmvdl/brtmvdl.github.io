import { HTML, nButton } from '@brtmvdl/frontend'

export class BuyButtonComponent extends nButton {
  onCreate() {
    super.onCreate()
    this.setStyles()
    this.setText('Buy (BRL 100)')
  }

  setStyles() {
    this.setContainerStyle('text-align', 'center')
    this.setStyle('background-color', '#000000')
    this.setStyle('color', '#ffffff')
    this.setStyle('padding', '1rem')
    this.setStyle('border', 'none')
  }
}
