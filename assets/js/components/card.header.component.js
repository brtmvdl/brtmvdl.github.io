import { HTML } from '../../../assets/js/libs/frontend/index.js'

export class CardHeaderComponent extends HTML {
  getName() { return 'card-header-component' }

  onCreate() {
    super.onCreate()
    this.setStyles()
  }

  setStyles() {
    this.setContainerStyle('border-bottom', '1px solid rgba(0, 0, 0, 0.176)')
    this.setStyle('padding', 'calc(1rem / 4)')
  }
}
