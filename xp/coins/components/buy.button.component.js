import { HTML, nButton } from '@brtmvdl/frontend'

export class BuyButtonComponent extends nButton {
  onCreate() {
    super.onCreate()
    this.setText('buy')
  }
}
