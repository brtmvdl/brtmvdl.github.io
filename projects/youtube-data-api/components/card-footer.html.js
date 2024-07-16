import { HTML } from '../../../assets/js/libs/frontend/index.js'

export class CardFooterHTML extends HTML {
  getName() { return 'card-footer' }

  onCreate() {
    super.onCreate()
    this.setStyles()
  }

  setStyles() {
    this.setStyle('padding', 'calc(1rem / 4)')
  }
}
