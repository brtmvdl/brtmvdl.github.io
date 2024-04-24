import { HTML } from '@brtmvdl/frontend'

export class TextHTML extends HTML {
  text = null
  title = null

  constructor(text, title = null) {
    super()
    this.text = text
    this.title = title
  }

  onCreate() {
    super.onCreate()
    this.setText(this.text)
    this.setAttr('title', this.title)
  }
}
