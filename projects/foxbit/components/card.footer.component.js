import { HTML } from '@brtmvdl/frontend'

export class CardFooterComponent extends HTML {
  getName() { return 'card-footer' }

  onCreate() {
    super.onCreate()
    this.setStyles()
  }

  setStyles() {
    this.setStyle('padding', 'calc(1rem / 2)')
  }
}
