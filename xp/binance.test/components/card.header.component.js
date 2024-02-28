import { HTML } from '@brtmvdl/frontend'

export class CardHeaderComponent extends HTML {
  hasContainer() {
    return false
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
  }

  setStyles() {
    this.setStyle('padding', '0.5rem 1rem')
    // this.setStyle('margin', '1rem')
    this.setStyle('border-bottom', 'calc(1rem / 8) solid rgba(33, 37, 41, 0.03)')
    this.setStyle('color', '')
  }
}
