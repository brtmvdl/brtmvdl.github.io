import { HTML } from '@brtmvdl/frontend'

export class TextHTML extends HTML {
  text = ''

  constructor(text = '') {
    super()
    this.text = text
  }

  onCreate() {
    super.onCreate()
    this.setText(this.text)
  }
}
