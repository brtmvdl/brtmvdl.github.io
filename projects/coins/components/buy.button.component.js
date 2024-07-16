import { HTML, nButton } from '../../../assets/js/libs/frontend/index.js'

export class BuyButtonComponent extends nButton {
  onCreate() {
    super.onCreate()
    this.setStyles()
    // this.setText()
  }

  setStyles() {
    this.setContainerStyle('text-align', 'center')
    this.setStyle('padding', '1rem')
    this.setStyle('border', 'none')
  }
}
