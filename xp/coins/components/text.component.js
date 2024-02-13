import { HTML } from '@brtmvdl/frontend'

export class TextComponent extends HTML {
  text = null

  constructor(text = '') {
    super()
    this.text = text
  }

  onCreate() {
    super.onCreate()
    this.setStyle('padding', '1rem')
    this.setText(this.text)
  }
}
