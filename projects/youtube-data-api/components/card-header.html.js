import { HTML } from '../../../assets/js/libs/frontend/index.js'

export class CardHeaderHTML extends HTML {
  getName() { return 'card-header' }

  onCreate() {
    super.onCreate()
    this.setStyles()
  }

  setStyles() {
    this.setContainerStyle('border-bottom', '1px solid rgba(0, 0, 0, 0.176)')
    this.setStyle('padding', 'calc(1rem / 4)')
  }
}
