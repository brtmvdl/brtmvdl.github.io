import { HTML } from '@brtmvdl/frontend'

export class Page extends HTML {
  onCreate() {
    super.onCreate()
    this.setStyles()
    this.setText('Binance WS API')
  }

  setStyles() {
    this.setStyle('text-align', 'center')
  }
}
