import { HTML } from '@brtmvdl/frontend'

export class CardComponent extends HTML {
  onCreate() {
    super.onCreate()
    this.setStyles()
  }

  setStyles() {
    this.setStyle('box-shadow', 'inset 0rem 0rem 0rem calc(1rem / 8) rgba(33, 37, 41, 0.03)')
    this.setStyle('border-radius', '1rem')
    this.setStyle('padding', '0rem')
    this.setStyle('margin', '1rem')
  }
}
