import { HTML } from '@brtmvdl/frontend'

export class CardBodyComponent extends HTML {
  hasContainer() {
    return false
  }

  onCreate() {
    super.onCreate()
    this.setStyle('padding', '0.5rem 1rem')
    // this.setStyle('', '')
  }
}
