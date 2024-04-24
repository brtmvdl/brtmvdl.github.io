import { HTML } from '@brtmvdl/frontend'

export class PriceComponent extends HTML {
  onCreate() {
    super.onCreate()
    this.setStyles()
  }

  setStyles() {
    this.setContainerStyle('text-align', 'center')
    this.setStyle('font-size', '2rem')
    this.setStyle('padding', '1rem')
  }

  update(price) {
    this.setText(price)
  }
}
